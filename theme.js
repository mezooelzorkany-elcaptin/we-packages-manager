// CASH BACK — unified theme across all admin pages
(function(){
 const key='cashback-theme';
 const saved=localStorage.getItem(key)||localStorage.getItem('app_theme');
 const dark=saved==='dark';
 document.documentElement.classList.toggle('dark-mode',dark);
 document.addEventListener('DOMContentLoaded',()=>{
  let b=document.getElementById('theme-toggle');
  const pageHasOwnThemeButton=!!b;
  if(!b){b=document.createElement('button');b.id='theme-toggle';b.type='button';b.setAttribute('aria-label','تغيير المظهر');b.style.cssText='position:fixed;top:16px;left:16px;z-index:99999;border:0;border-radius:14px;padding:10px 13px;background:#5420b8;color:#fff;font-size:18px;cursor:pointer;box-shadow:0 5px 18px #0003';b.innerHTML='<span id="theme-icon"></span>';document.body.appendChild(b)}
  const i=document.getElementById('theme-icon');
  const sync=()=>{const d=document.documentElement.classList.contains('dark-mode');if(i)i.textContent=d?'☀️':'🌙';document.body.classList.toggle('dark-mode',d)};
  sync();
  // customers.html already has its own theme handler. Do not bind a second click handler.
  if(!pageHasOwnThemeButton && !b.dataset.themeBound){b.dataset.themeBound='1';b.addEventListener('click',()=>{const d=!document.documentElement.classList.contains('dark-mode');document.documentElement.classList.toggle('dark-mode',d);document.body.classList.toggle('dark-mode',d);localStorage.setItem(key,d?'dark':'light');localStorage.setItem('app_theme',d?'dark':'light');sync()})}
  // Keep customers.html as the administration home. Never redirect its navigation to the codes page.
  if(!/customers\.html$/i.test(location.pathname)) document.querySelectorAll('a[href]').forEach(a=>{const h=(a.getAttribute('href')||'').split('?')[0].split('#')[0].toLowerCase();if(h==='admin.html'&&/الإدارة|admin|الرئيسية/i.test(a.textContent||'')) a.href='customers.html';});
 });
})();
// Thermal printing: use the existing invoice overlay, never open another window.
(function(){
 function add(){if(document.getElementById('cashback-thermal-print-style'))return;const s=document.createElement('style');s.id='cashback-thermal-print-style';s.textContent='@page{size:80mm auto;margin:0!important}@media print{html,body{width:80mm!important;min-width:80mm!important;margin:0!important;padding:0!important;background:#fff!important;overflow:visible!important}body>*:not(#invoiceOverlay){display:none!important}#invoiceOverlay{display:flex!important;position:static!important;width:80mm!important;height:auto!important;margin:0!important;padding:0!important;background:#fff!important}#invoiceOverlay .invoice-modal,#invoiceOverlay .invoice-paper{width:80mm!important;max-width:80mm!important;height:auto!important;margin:0!important;padding:4mm 3mm!important;border:0!important;border-radius:0!important;box-shadow:none!important;background:#fff!important;color:#000!important}#invoiceOverlay .invoice-topbar,#invoiceOverlay .invoice-actions,#invoiceOverlay .invoice-close{display:none!important}}';document.head.appendChild(s)}
 document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('.invoice-print');if(!b)return;e.preventDefault();e.stopImmediatePropagation();add();const o=document.getElementById('invoiceOverlay');if(o){o.classList.add('show');window.print()}},true);
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',add,{once:true});else add();
})();