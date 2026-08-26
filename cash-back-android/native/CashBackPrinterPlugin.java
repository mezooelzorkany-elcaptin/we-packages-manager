package com.cashback.admin;

import android.Manifest;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.ByteArrayOutputStream;
import java.io.OutputStream;
import java.util.Set;
import java.util.UUID;

@CapacitorPlugin(name = "CashBackPrinter")
public class CashBackPrinterPlugin extends Plugin {
    private static final int REQ_BT = 7001;
    private static final UUID SPP_UUID = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");

    @PluginMethod
    public void list(PluginCall call) {
        if (android.os.Build.VERSION.SDK_INT >= 31 && getContext().checkSelfPermission(Manifest.permission.BLUETOOTH_CONNECT) != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(call, new String[]{Manifest.permission.BLUETOOTH_CONNECT}, REQ_BT);
            return;
        }
        BluetoothAdapter adapter = BluetoothAdapter.getDefaultAdapter();
        if (adapter == null) { call.reject("Bluetooth غير متاح على الجهاز"); return; }
        JSArray arr = new JSArray();
        Set<BluetoothDevice> devices = adapter.getBondedDevices();
        for (BluetoothDevice d : devices) {
            JSObject o = new JSObject();
            o.put("name", d.getName() == null ? "Bluetooth Printer" : d.getName());
            o.put("address", d.getAddress());
            arr.put(o);
        }
        JSObject ret = new JSObject(); ret.put("devices", arr); call.resolve(ret);
    }

    @PluginMethod
    public void printImage(PluginCall call) {
        String address = call.getString("address");
        String base64 = call.getString("base64");
        if (address == null || base64 == null) { call.reject("بيانات الطابعة ناقصة"); return; }
        if (android.os.Build.VERSION.SDK_INT >= 31 && getContext().checkSelfPermission(Manifest.permission.BLUETOOTH_CONNECT) != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(call, new String[]{Manifest.permission.BLUETOOTH_CONNECT}, REQ_BT); return;
        }
        getBridge().executeOnMainThread(() -> {
            try {
                byte[] imageBytes = Base64.decode(base64, Base64.DEFAULT);
                Bitmap src = BitmapFactory.decodeByteArray(imageBytes, 0, imageBytes.length);
                if (src == null) throw new Exception("تعذر قراءة الفاتورة");
                int width = 576;
                int height = Math.max(1, Math.round(src.getHeight() * (width / (float) src.getWidth())));
                Bitmap bmp = Bitmap.createScaledBitmap(src, width, height, true);
                byte[] esc = raster(bmp);
                BluetoothDevice device = BluetoothAdapter.getDefaultAdapter().getRemoteDevice(address);
                BluetoothSocket socket = device.createRfcommSocketToServiceRecord(SPP_UUID);
                socket.connect();
                OutputStream out = socket.getOutputStream();
                out.write(new byte[]{0x1B,0x40});
                out.write(esc);
                out.write(new byte[]{0x1D,0x56,0x00});
                out.flush(); out.close(); socket.close();
                bmp.recycle(); src.recycle(); call.resolve();
            } catch (Exception e) { call.reject("فشل الطباعة: " + e.getMessage()); }
        });
    }

    private byte[] raster(Bitmap bmp) throws Exception {
        int w = bmp.getWidth(), h = bmp.getHeight();
        int bytesPerLine = (w + 7) / 8;
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        out.write(new byte[]{0x1D,0x76,0x30,0x00,(byte)(bytesPerLine & 0xFF),(byte)((bytesPerLine >> 8)&0xFF),(byte)(h & 0xFF),(byte)((h>>8)&0xFF)});
        for (int y=0;y<h;y++) {
            for (int xByte=0;xByte<bytesPerLine;xByte++) {
                int value=0;
                for (int bit=0;bit<8;bit++) {
                    int x=xByte*8+bit;
                    if (x<w) {
                        int p=bmp.getPixel(x,y);
                        int r=(p>>16)&255,g=(p>>8)&255,b=(p)&255;
                        int gray=(r*299+g*587+b*114)/1000;
                        if (gray<170) value |= (1 << (7-bit));
                    }
                }
                out.write(value);
            }
        }
        return out.toByteArray();
    }
}
