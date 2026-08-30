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

// Thermal invoice printing — Xprinter / 80mm rolls.
// Injected globally so the existing invoice component prints as a receipt,
// never as an A4 document. Screen layout remains unchanged.
(function installThermalPrintStyle(){
  function add(){
    if(document.getElementById('cashback-thermal-print-style')) return;
    const style=document.createElement('style');
    style.id='cashback-thermal-print-style';
    style.textContent=`
      @page{size:80mm auto;margin:0!important}
      @media print{
        html,body{width:80mm!important;min-width:80mm!important;margin:0!important;padding:0!important;background:#fff!important}
        body>*{display:none!important}
        .invoice-overlay{display:flex!important;position:static!important;width:80mm!important;height:auto!important;min-height:0!important;padding:0!important;margin:0!important;background:#fff!important;overflow:visible!important}
        .invoice-overlay .invoice-modal{display:block!important;width:80mm!important;max-width:80mm!important;max-height:none!important;height:auto!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;box-shadow:none!important;overflow:visible!important;background:#fff!important}
        .invoice-overlay .invoice-topbar,.invoice-overlay .invoice-actions,.invoice-overlay .invoice-close{display:none!important}
        .invoice-overlay .invoice-paper{display:block!important;width:80mm!important;max-width:80mm!important;margin:0!important;padding:4mm 3mm!important;border:0!important;border-radius:0!important;background:#fff!important;color:#000!important;box-shadow:none!important;overflow:visible!important}
        .invoice-paper *{max-width:100%!important;box-shadow:none!important}
        .invoice-brand img{width:52mm!important;height:auto!important;max-height:24mm!important;object-fit:contain!important;margin:0 auto 2mm!important}
        .invoice-title{font-size:18px!important;margin:2mm 0 4mm!important}
        .invoice-meta{font-size:11px!important;gap:2mm!important;margin-bottom:3mm!important}
        .invoice-section{border:1px solid #bbb!important;border-radius:0!important;padding:2.5mm!important;margin-bottom:2.5mm!important}
        .invoice-row{font-size:11px!important;padding:1.7mm 0!important;border-bottom:1px dashed #aaa!important}
        .invoice-label,.invoice-value{font-size:11px!important}
        .invoice-total{border-radius:0!important;padding:3mm!important;margin-top:3mm!important;font-size:14px!important;background:#000!important;color:#fff!important}
        .invoice-total strong{font-size:18px!important;color:#fff!important}
        .invoice-footer{margin-top:4mm!important;padding-top:3mm!important;font-size:10px!important}
        .invoice-contact{font-size:12px!important}
        .invoice-overlay~*{display:none!important}
      }
    `;
    document.head.appendChild(style);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',add,{once:true});
  else add();
})();
