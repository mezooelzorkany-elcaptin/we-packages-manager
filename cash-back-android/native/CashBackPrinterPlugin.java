package com.cashback.admin;

import android.Manifest;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.PermissionState;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;
import java.io.ByteArrayOutputStream;
import java.io.OutputStream;
import java.util.Set;
import java.util.UUID;

@CapacitorPlugin(name = "CashBackPrinter", permissions = {
    @Permission(alias = "bluetooth", strings = { Manifest.permission.BLUETOOTH_CONNECT })
})
public class CashBackPrinterPlugin extends Plugin {
    private static final UUID SPP_UUID = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
    @PluginMethod public void list(PluginCall call) {
        if (getPermissionState("bluetooth") != PermissionState.GRANTED) { requestPermissionForAlias("bluetooth", call, "listPermissionCallback"); return; }
        listDevices(call);
    }
    @PermissionCallback private void listPermissionCallback(PluginCall call) { if (getPermissionState("bluetooth") == PermissionState.GRANTED) listDevices(call); else call.reject("اسمح للتطبيق بالوصول إلى Bluetooth أولاً"); }
    private void listDevices(PluginCall call) {
        BluetoothAdapter adapter = BluetoothAdapter.getDefaultAdapter();
        if (adapter == null) { call.reject("Bluetooth غير متاح على الجهاز"); return; }
        JSArray arr = new JSArray(); Set<BluetoothDevice> devices = adapter.getBondedDevices();
        for (BluetoothDevice d : devices) { JSObject o = new JSObject(); o.put("name", d.getName() == null ? "Bluetooth Printer" : d.getName()); o.put("address", d.getAddress()); arr.put(o); }
        JSObject ret = new JSObject(); ret.put("devices", arr); call.resolve(ret);
    }
    @PluginMethod public void printImage(PluginCall call) {
        if (getPermissionState("bluetooth") != PermissionState.GRANTED) { requestPermissionForAlias("bluetooth", call, "printPermissionCallback"); return; }
        printImageNow(call);
    }
    @PermissionCallback private void printPermissionCallback(PluginCall call) { if (getPermissionState("bluetooth") == PermissionState.GRANTED) printImageNow(call); else call.reject("اسمح للتطبيق بالوصول إلى Bluetooth أولاً"); }
    private void printImageNow(PluginCall call) {
        String address = call.getString("address"), base64 = call.getString("base64");
        if (address == null || base64 == null) { call.reject("بيانات الطابعة ناقصة"); return; }
        getBridge().executeOnMainThread(() -> { try {
            byte[] imageBytes = Base64.decode(base64, Base64.DEFAULT); Bitmap src = BitmapFactory.decodeByteArray(imageBytes, 0, imageBytes.length);
            if (src == null) throw new Exception("تعذر قراءة الفاتورة");
            int width = 576, height = Math.max(1, Math.round(src.getHeight() * (width / (float) src.getWidth()))); Bitmap bmp = Bitmap.createScaledBitmap(src, width, height, true);
            BluetoothDevice device = BluetoothAdapter.getDefaultAdapter().getRemoteDevice(address); BluetoothSocket socket = device.createRfcommSocketToServiceRecord(SPP_UUID); socket.connect(); OutputStream out = socket.getOutputStream(); out.write(new byte[]{0x1B,0x40}); out.write(raster(bmp)); out.write(new byte[]{0x1D,0x56,0x00}); out.flush(); out.close(); socket.close(); bmp.recycle(); src.recycle(); call.resolve();
        } catch (Exception e) { call.reject("فشل الطباعة: " + e.getMessage()); }});
    }
    private byte[] raster(Bitmap bmp) throws Exception {
        int w=bmp.getWidth(), h=bmp.getHeight(), bytesPerLine=(w+7)/8; ByteArrayOutputStream out=new ByteArrayOutputStream();
        out.write(new byte[]{0x1D,0x76,0x30,0x00,(byte)(bytesPerLine&255),(byte)((bytesPerLine>>8)&255),(byte)(h&255),(byte)((h>>8)&255)});
        for(int y=0;y<h;y++) for(int xb=0;xb<bytesPerLine;xb++){ int value=0; for(int bit=0;bit<8;bit++){int x=xb*8+bit;if(x<w){int p=bmp.getPixel(x,y),r=(p>>16)&255,g=(p>>8)&255,b=p&255,gray=(r*299+g*587+b*114)/1000;if(gray<170)value|=1<<(7-bit);}} out.write(value);}
        return out.toByteArray();
    }
}
