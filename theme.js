// CASH BACK — unified theme persistence across all admin pages
(function initTheme(){
  const saved = localStorage.getItem('cashback-theme') || localStorage.getItem('app_theme');
  const dark = saved === 'dark' || (!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark-mode', dark);
})();

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  function updateIcon(){
    if(themeIcon) themeIcon.textContent = document.documentElement.classList.contains('dark-mode') ? '☀️' : '🌙';
  }
  updateIcon();
  if(toggleBtn && !toggleBtn.dataset.themeBound){
    toggleBtn.dataset.themeBound = '1';
    toggleBtn.addEventListener('click', () => {
      const dark = !document.documentElement.classList.contains('dark-mode');
      document.documentElement.classList.toggle('dark-mode', dark);
      localStorage.setItem('cashback-theme', dark ? 'dark' : 'light');
      localStorage.setItem('app_theme', dark ? 'dark' : 'light');
      updateIcon();
    });
  }
});

// CASH BACK thermal invoice printing — print the existing invoice in-place.
// The invoice overlay lives outside #app, so it must be explicitly preserved in print mode.
(function installThermalPrint(){
  function add(){
    if(document.getElementById('cashback-thermal-print-style')) return;
    const style=document.createElement('style');
    style.id='cashback-thermal-print-style';
    style.textContent=`
      @page{size:80mm auto;margin:0!important}
      @media print{
        html,body{width:80mm!important;min-width:80mm!important;margin:0!important;padding:0!important;background:#fff!important;overflow:visible!important}
        body > *:not(#invoiceOverlay){display:none!important}
        #invoiceOverlay{display:flex!important;position:static!important;width:80mm!important;height:auto!important;min-height:0!important;margin:0!important;padding:0!important;background:#fff!important;overflow:visible!important}
        #invoiceOverlay .invoice-modal{display:block!important;width:80mm!important;max-width:80mm!important;max-height:none!important;height:auto!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;box-shadow:none!important;overflow:visible!important;background:#fff!important}
        #invoiceOverlay .invoice-topbar,#invoiceOverlay .invoice-actions,#invoiceOverlay .invoice-close{display:none!important}
        #invoiceOverlay .invoice-paper{display:block!important;width:80mm!important;max-width:80mm!important;height:auto!important;min-height:0!important;margin:0!important;padding:4mm 3mm!important;border:0!important;border-radius:0!important;background:#fff!important;color:#000!important;box-shadow:none!important;overflow:visible!important}
        #invoiceOverlay .invoice-paper *{max-width:100%!important;box-shadow:none!important}
        #invoiceOverlay .invoice-brand img{width:52mm!important;height:auto!important;max-height:24mm!important;object-fit:contain!important;margin:0 auto 2mm!important}
        #invoiceOverlay .invoice-title{font-size:18px!important;line-height:1.2!important;margin:2mm 0 4mm!important}
        #invoiceOverlay .invoice-meta{font-size:11px!important;gap:2mm!important;margin-bottom:3mm!important}
        #invoiceOverlay .invoice-section{border:1px solid #bbb!important;border-radius:0!important;padding:2.5mm!important;margin-bottom:2.5mm!important}
        #invoiceOverlay .invoice-row{font-size:11px!important;padding:1.7mm 0!important;border-bottom:1px dashed #aaa!important}
        #invoiceOverlay .invoice-label,#invoiceOverlay .invoice-value{font-size:11px!important}
        #invoiceOverlay .invoice-total{border-radius:0!important;padding:3mm!important;margin-top:3mm!important;font-size:14px!important;background:#000!important;color:#fff!important}
        #invoiceOverlay .invoice-total strong{font-size:18px!important;color:#fff!important}
        #invoiceOverlay .invoice-footer{margin-top:4mm!important;padding-top:3mm!important;font-size:10px!important}
        #invoiceOverlay .invoice-contact{font-size:12px!important}
      }
    `;
    document.head.appendChild(style);
  }

  // Intercept the old print button before its inline printInvoice() handler can open a new tab.
  document.addEventListener('click',function(e){
    const btn=e.target.closest && e.target.closest('.invoice-print');
    if(!btn) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    add();
    const overlay=document.getElementById('invoiceOverlay');
    if(!overlay) return;
    overlay.classList.add('show');
    setTimeout(()=>window.print(),80);
  },true);

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',add,{once:true});
  else add();
})();