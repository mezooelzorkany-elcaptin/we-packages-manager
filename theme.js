// CASH BACK — unified admin theme + navigation
(function(){
  const key = 'cashback-theme';
  const saved = localStorage.getItem(key) || localStorage.getItem('app_theme');
  const dark = saved === 'dark';
  document.documentElement.classList.toggle('dark-mode', dark);
  function setup(){
    let button = document.getElementById('theme-toggle');
    if(!button){button=document.createElement('button');button.id='theme-toggle';button.type='button';button.setAttribute('aria-label','تغيير المظهر');button.className='theme-btn';button.innerHTML='<span id="theme-icon">🌙</span>';document.body.appendChild(button);}
    const icon=document.getElementById('theme-icon');
    function sync(){const isDark=document.documentElement.classList.contains('dark-mode');document.body.classList.toggle('dark-mode',isDark);if(icon)icon.textContent=isDark?'☀️':'🌙';}
    sync();
    if(!button.dataset.themeBound){button.dataset.themeBound='1';button.addEventListener('click',function(){const isDark=!document.documentElement.classList.contains('dark-mode');document.documentElement.classList.toggle('dark-mode',isDark);document.body.classList.toggle('dark-mode',isDark);localStorage.setItem(key,isDark?'dark':'light');localStorage.setItem('app_theme',isDark?'dark':'light');sync();});}
    document.querySelectorAll('a[href]').forEach(function(a){const raw=a.getAttribute('href')||'',clean=raw.split('?')[0].split('#')[0].toLowerCase(),text=(a.textContent||'').trim();if(clean==='packages.html'){a.setAttribute('href','invoices.html');const span=a.querySelector('span');if(span)span.textContent='الفواتير';else if(/الباقات/.test(text))a.textContent=text.replace('الباقات','الفواتير');}if(clean==='admin.html'&&/الإدارة|الرئيسية|home|admin/i.test(text))a.setAttribute('href','customers.html');});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup,{once:true});else setup();
})();

(function(){
  function addPrintStyle(){if(document.getElementById('cashback-thermal-print-style'))return;const s=document.createElement('style');s.id='cashback-thermal-print-style';s.textContent='@page{size:80mm auto;margin:0!important}@media print{html,body{width:80mm!important;min-width:80mm!important;margin:0!important;padding:0!important;background:#fff!important;overflow:visible!important}body>*:not(#invoiceOverlay){display:none!important}#invoiceOverlay{display:flex!important;position:static!important;width:80mm!important;height:auto!important;margin:0!important;padding:0!important;background:#fff!important}#invoiceOverlay .invoice-modal,#invoiceOverlay .invoice-paper{width:80mm!important;max-width:80mm!important;height:auto!important;margin:0!important;padding:4mm 3mm!important;border:0!important;border-radius:0!important;box-shadow:none!important;background:#fff!important;color:#000!important}#invoiceOverlay .invoice-topbar,#invoiceOverlay .invoice-actions,#invoiceOverlay .invoice-close{display:none!important}}';document.head.appendChild(s);}
  document.addEventListener('click',function(e){const button=e.target.closest&&e.target.closest('.invoice-print');if(!button)return;e.preventDefault();e.stopImmediatePropagation();addPrintStyle();const overlay=document.getElementById('invoiceOverlay');if(overlay){overlay.classList.add('show');window.print();}},true);
})();

/* CASH BACK — customers UI only: compact list + accordion */
(function(){
  const style=document.createElement('style');style.id='cashback-customers-accordion-style';style.textContent=`
    .cb-total-customers{cursor:pointer;position:relative;transition:.2s ease}.cb-total-customers:hover{transform:translateY(-2px)}
    .cb-total-customers::after{content:'‹';position:absolute;left:18px;top:50%;transform:translateY(-50%);font-size:30px;color:#8b5cf6;font-weight:900}.cb-total-customers.open::after{transform:translateY(-50%) rotate(-90deg)}
    .cb-customer-panel{display:none!important}.cb-customer-panel.cb-open{display:block!important}
    .cb-customer-panel .list{gap:9px!important}.cb-customer-panel .card{padding:0!important;overflow:hidden;border-radius:16px!important;box-shadow:none!important}
    .cb-customer-panel .card .ch{min-height:64px;padding:12px 16px 12px 48px!important;align-items:center!important;cursor:pointer;position:relative}
    .cb-customer-panel .card .ch::after{content:'⌄';position:absolute;left:15px;top:50%;transform:translateY(-50%);width:26px;height:26px;display:grid;place-items:center;border-radius:50%;background:#eee4ff;color:#5420b8;font-size:18px;font-weight:900;transition:.2s}
    .cb-customer-panel .card.cb-expanded .ch::after{transform:translateY(-50%) rotate(180deg);background:#5420b8;color:#fff}
    .cb-customer-panel .card .name{font-size:17px!important}.cb-customer-panel .card .phone{font-size:13px!important;margin-top:3px!important}.cb-customer-panel .card .internal{font-size:11px!important;margin-top:3px!important}.cb-customer-panel .card .badge{font-size:10px!important;padding:6px 9px!important}
    .cb-customer-panel .card .grid{display:none;margin:0!important;padding:12px 16px 15px!important;grid-template-columns:repeat(2,1fr)!important;border-top:1px solid var(--border)!important}.cb-customer-panel .card.cb-expanded .grid{display:grid!important}
    .cb-customer-panel .card .actions{display:none}.cb-customer-panel .card.cb-expanded .actions{display:flex!important;padding:0 16px 15px!important}
    @media(max-width:650px){.cb-customer-panel .card .ch{min-height:62px;padding-left:45px!important}.cb-customer-panel .card .grid{grid-template-columns:1fr 1fr!important}}
  `;document.head.appendChild(style);
  function init(){
    if(!/customers\.html$/i.test(location.pathname))return;
    const stats=document.querySelector('.stats');if(!stats)return;
    const cards=Array.from(stats.querySelectorAll('.stat'));const total=cards.find(c=>/إجمالي\s*العملاء/.test(c.textContent||''))||cards[0];if(!total)return;
    total.classList.add('cb-total-customers');total.setAttribute('role','button');total.setAttribute('tabindex','0');total.setAttribute('aria-expanded','false');total.title='عرض العملاء';
    const panels=Array.from(document.querySelectorAll('.panel'));const customerPanel=panels.find(p=>p.querySelector('.list'))||panels.find(p=>/العملاء/.test(p.textContent||''));if(!customerPanel)return;
    customerPanel.classList.add('cb-customer-panel');
    function toggle(){const open=customerPanel.classList.toggle('cb-open');total.classList.toggle('open',open);total.setAttribute('aria-expanded',String(open));if(open)setTimeout(()=>customerPanel.scrollIntoView({behavior:'smooth',block:'start'}),40);}
    if(!total.dataset.cbBound){total.dataset.cbBound='1';total.addEventListener('click',toggle);total.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();}});}
    function bindCards(){customerPanel.querySelectorAll('.list .card').forEach(card=>{if(card.dataset.cbAccordion)return;card.dataset.cbAccordion='1';const header=card.querySelector('.ch');if(!header)return;header.addEventListener('click',e=>{if(e.target.closest('button,a,input,select'))return;const was=card.classList.contains('cb-expanded');customerPanel.querySelectorAll('.list .card.cb-expanded').forEach(x=>{if(x!==card)x.classList.remove('cb-expanded');});card.classList.toggle('cb-expanded',!was);});});}
    bindCards();const list=customerPanel.querySelector('.list');if(list)new MutationObserver(bindCards).observe(list,{childList:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
