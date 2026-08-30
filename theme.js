// CASH BACK — unified admin theme + navigation
(function(){
  const key = 'cashback-theme';
  const saved = localStorage.getItem(key) || localStorage.getItem('app_theme');
  const dark = saved === 'dark';

  document.documentElement.classList.toggle('dark-mode', dark);

  function setup(){
    let button = document.getElementById('theme-toggle');
    const hasOwnButton = !!button;

    if(!button){
      button = document.createElement('button');
      button.id = 'theme-toggle';
      button.type = 'button';
      button.setAttribute('aria-label','تغيير المظهر');
      button.className = 'theme-btn';
      button.innerHTML = '<span id="theme-icon">🌙</span>';
      document.body.appendChild(button);
    }

    const icon = document.getElementById('theme-icon');

    function sync(){
      const isDark = document.documentElement.classList.contains('dark-mode');
      document.body.classList.toggle('dark-mode', isDark);
      if(icon) icon.textContent = isDark ? '☀️' : '🌙';
    }

    sync();

    if(!button.dataset.themeBound){
      button.dataset.themeBound = '1';
      button.addEventListener('click', function(){
        const isDark = !document.documentElement.classList.contains('dark-mode');
        document.documentElement.classList.toggle('dark-mode', isDark);
        document.body.classList.toggle('dark-mode', isDark);
        localStorage.setItem(key, isDark ? 'dark' : 'light');
        localStorage.setItem('app_theme', isDark ? 'dark' : 'light');
        sync();
      });
    }

    /* IMPORTANT:
       customers.html is the admin home.
       The old admin Packages shortcut is now the Invoices page.
       admin.html remains the Codes page only. */
    document.querySelectorAll('a[href]').forEach(function(a){
      const raw = a.getAttribute('href') || '';
      const clean = raw.split('?')[0].split('#')[0].toLowerCase();
      const text = (a.textContent || '').trim();

      // In the admin navigation, packages.html is replaced by invoices.html.
      if(clean === 'packages.html'){
        a.setAttribute('href','invoices.html');
        const span = a.querySelector('span');
        if(span) span.textContent = 'الفواتير';
        else if(/الباقات/.test(text)) a.textContent = text.replace('الباقات','الفواتير');
      }

      // Any explicit Administration/Home link must always return to customers.
      if(clean === 'admin.html' && /الإدارة|الرئيسية|home|admin/i.test(text)){
        a.setAttribute('href','customers.html');
      }
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', setup, {once:true});
  }else{
    setup();
  }
})();

// Thermal printing — keep printing inside the existing invoice overlay.
(function(){
  function addPrintStyle(){
    if(document.getElementById('cashback-thermal-print-style')) return;
    const s = document.createElement('style');
    s.id = 'cashback-thermal-print-style';
    s.textContent = '@page{size:80mm auto;margin:0!important}@media print{html,body{width:80mm!important;min-width:80mm!important;margin:0!important;padding:0!important;background:#fff!important;overflow:visible!important}body>*:not(#invoiceOverlay){display:none!important}#invoiceOverlay{display:flex!important;position:static!important;width:80mm!important;height:auto!important;margin:0!important;padding:0!important;background:#fff!important}#invoiceOverlay .invoice-modal,#invoiceOverlay .invoice-paper{width:80mm!important;max-width:80mm!important;height:auto!important;margin:0!important;padding:4mm 3mm!important;border:0!important;border-radius:0!important;box-shadow:none!important;background:#fff!important;color:#000!important}#invoiceOverlay .invoice-topbar,#invoiceOverlay .invoice-actions,#invoiceOverlay .invoice-close{display:none!important}}';
    document.head.appendChild(s);
  }

  document.addEventListener('click', function(e){
    const button = e.target.closest && e.target.closest('.invoice-print');
    if(!button) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    addPrintStyle();
    const overlay = document.getElementById('invoiceOverlay');
    if(overlay){
      overlay.classList.add('show');
      window.print();
    }
  }, true);
})();