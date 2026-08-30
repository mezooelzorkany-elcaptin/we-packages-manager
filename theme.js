// CASH BACK — unified theme + navigation + compact customers dashboard
(function(){
  const SUPABASE_URL='https://pgvbynefhqmyzjtccttl.supabase.co';
  const SUPABASE_KEY='sb_publishable_RMNG3j5xrijQx3HcbfEkbQ_wZkoJGrY';
  const themeKey='cashback-theme';

  function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));}
  function money(v){return Number(v||0).toLocaleString('ar-EG',{maximumFractionDigits:2});}

  function setupTheme(){
    const saved=localStorage.getItem(themeKey)||localStorage.getItem('app_theme');
    document.documentElement.classList.toggle('dark-mode',saved==='dark');
    const button=document.getElementById('theme-toggle');
    if(!button)return;
    const icon=document.getElementById('theme-icon');
    const sync=()=>{const dark=document.documentElement.classList.contains('dark-mode');document.body.classList.toggle('dark-mode',dark);if(icon)icon.textContent=dark?'☀️':'🌙';};
    sync();
    if(button.dataset.themeBound)return;
    button.dataset.themeBound='1';
    button.addEventListener('click',()=>{
      const dark=!document.documentElement.classList.contains('dark-mode');
      document.documentElement.classList.toggle('dark-mode',dark);
      document.body.classList.toggle('dark-mode',dark);
      localStorage.setItem(themeKey,dark?'dark':'light');
      localStorage.setItem('app_theme',dark?'dark':'light');
      sync();
    });
  }

  function setupNavigation(){
    document.querySelectorAll('a[href]').forEach(a=>{
      const raw=(a.getAttribute('href')||'').split('?')[0].split('#')[0].toLowerCase();
      const text=(a.textContent||'').trim();
      if(raw==='packages.html'){
        a.setAttribute('href','invoices.html');
        const span=a.querySelector('span');
        if(span)span.textContent='الفواتير';
        else if(/الباقات/.test(text))a.textContent=text.replace('الباقات','الفواتير');
      }
      if(raw==='admin.html'&&/الإدارة|الرئيسية|home|admin/i.test(text))a.setAttribute('href','customers.html');
    });
  }

  function setupPrint(){
    if(!document.getElementById('cashback-thermal-print-style')){
      const s=document.createElement('style');s.id='cashback-thermal-print-style';
      s.textContent='@page{size:80mm auto;margin:0!important}@media print{html,body{width:80mm!important;min-width:80mm!important;margin:0!important;padding:0!important;background:#fff!important;overflow:visible!important}body>*:not(#invoiceOverlay){display:none!important}#invoiceOverlay{display:flex!important;position:static!important;width:80mm!important;height:auto!important;margin:0!important;padding:0!important;background:#fff!important}#invoiceOverlay .invoice-modal,#invoiceOverlay .invoice-paper{width:80mm!important;max-width:80mm!important;height:auto!important;margin:0!important;padding:4mm 3mm!important;border:0!important;border-radius:0!important;box-shadow:none!important;background:#fff!important;color:#000!important}#invoiceOverlay .invoice-topbar,#invoiceOverlay .invoice-actions,#invoiceOverlay .invoice-close{display:none!important}}';
      document.head.appendChild(s);
    }
    document.addEventListener('click',e=>{
      const b=e.target.closest&&e.target.closest('.invoice-print');
      if(!b)return;
      e.preventDefault();e.stopImmediatePropagation();
      const o=document.getElementById('invoiceOverlay');
      if(o){o.classList.add('show');window.print();}
    },true);
  }

  function setupCustomers(){
    if(!/customers\.html$/i.test(location.pathname))return;

    const styleId='cashback-customers-v2-style';
    if(!document.getElementById(styleId)){
      const s=document.createElement('style');s.id=styleId;
      s.textContent=`
        .cb-filter-stat{cursor:pointer;position:relative;transition:.18s ease}
        .cb-filter-stat:hover{transform:translateY(-2px)}
        .cb-filter-stat::after{content:'‹';position:absolute;left:17px;top:50%;transform:translateY(-50%);font-size:28px;color:#8b5cf6;font-weight:900;transition:.2s}
        .cb-filter-stat.open::after{transform:translateY(-50%) rotate(-90deg)}
        #cbCustomerArea{display:none;margin-top:20px}
        #cbCustomerArea.open{display:block}
        #cbCustomerArea .card{padding:0!important;overflow:hidden;border-radius:16px!important;box-shadow:none!important}
        #cbCustomerArea .card .ch{min-height:64px;padding:12px 16px 12px 55px!important;align-items:center!important;cursor:pointer;position:relative}
        #cbCustomerArea .card .ch::after{content:'⌄';position:absolute;left:15px;top:50%;transform:translateY(-50%);width:28px;height:28px;display:grid;place-items:center;border-radius:50%;background:#eee4ff;color:#5420b8;font-weight:900}
        #cbCustomerArea .card.open .ch::after{transform:translateY(-50%) rotate(180deg);background:#5420b8;color:#fff}
        #cbCustomerArea .card .grid,#cbCustomerArea .card .actions{display:none}
        #cbCustomerArea .card.open .grid{display:grid!important;margin:0!important;padding:12px 16px 15px!important;border-top:1px solid var(--border)!important;grid-template-columns:repeat(2,1fr)!important}
        #cbCustomerArea .card.open .actions{display:flex!important;padding:0 16px 15px!important}
        #cbCustomerArea .cb-filter-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}
        #cbCustomerArea .cb-filter-title{font-size:19px;font-weight:900;color:#5420b8}
        #cbCustomerArea .cb-clear{border:0;border-radius:10px;padding:8px 12px;background:#eee4ff;color:#5420b8;font-weight:bold}
        #cbOrdersArea{display:none;margin-top:20px}.cb-orders-open{display:block!important}
        #cbOrdersArea .cb-orders-box{background:var(--bg-card);border:1px solid var(--border);border-radius:20px;padding:18px}
        #cbOrdersArea .cb-orders-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px}
        #cbOrdersArea .cb-orders-title{font-size:19px;font-weight:900;color:#5420b8}
        #cbOrdersArea .cb-order{border:1px solid var(--border);border-radius:14px;margin:8px 0;background:var(--soft);overflow:hidden}
        #cbOrdersArea .cb-order-head{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:13px 14px;cursor:pointer;position:relative;padding-left:45px}
        #cbOrdersArea .cb-order-head:after{content:'⌄';position:absolute;left:13px;top:50%;transform:translateY(-50%);width:25px;height:25px;border-radius:50%;display:grid;place-items:center;background:#eee4ff;color:#5420b8;font-weight:900}
        #cbOrdersArea .cb-order.open .cb-order-head:after{transform:translateY(-50%) rotate(180deg);background:#5420b8;color:#fff}
        #cbOrdersArea .cb-order-details{display:none;padding:12px 14px;border-top:1px solid var(--border);font-size:13px;line-height:1.9}
        #cbOrdersArea .cb-order.open .cb-order-details{display:block}
        @media(max-width:650px){#cbCustomerArea .card .ch{padding-left:50px!important}#cbCustomerArea .card.open .grid{grid-template-columns:1fr 1fr!important}}
      `;
      document.head.appendChild(s);
    }

    const stats=document.querySelector('.stats');
    const list=document.getElementById('list');
    if(!stats||!list)return;

    const cards=()=>Array.from(stats.querySelectorAll('.stat'));
    const find=t=>cards().find(c=>new RegExp(t).test(c.textContent||''));
    const total=find('إجمالي\\s*العملاء')||cards()[0];
    const soon=find('تجديد\\s*قريب');
    if(!total)return;

    function makeStat(id,label,icon){
      let c=document.getElementById(id);if(c)return c;
      c=document.createElement('div');c.id=id;c.className='stat cb-filter-stat';
      c.innerHTML='<div class="st">'+label+'<span class="ico">'+icon+'</span></div><div class="num" id="'+id+'Num">0</div><div class="label">اضغط لعرض القائمة</div>';
      stats.appendChild(c);return c;
    }

    const day1=makeStat('cbDay1Stat','تجديد يوم 1','1️⃣');
    const day16=makeStat('cbDay16Stat','تجديد يوم 16','1️⃣6️⃣');
    const newOrders=makeStat('cbNewOrdersStat','طلبات جديدة','🆕');

    if(!document.getElementById('cbCustomerArea')){
      const area=document.createElement('div');area.id='cbCustomerArea';
      area.innerHTML='<div class="cb-filter-head"><div class="cb-filter-title" id="cbFilterTitle">👥 العملاء</div><button type="button" class="cb-clear">عرض الكل</button></div>';
      const searchPanel=Array.from(document.querySelectorAll('.panel')).find(p=>p.querySelector('#search'));
      if(searchPanel)area.appendChild(searchPanel);
      area.appendChild(list);
      total.parentElement.insertAdjacentElement('afterend',area);
      total.classList.add('cb-filter-stat');
      total.title='اضغط لعرض كل العملاء';
      total.addEventListener('click',()=>toggleCustomers('all','👥 كل العملاء',total));
      area.querySelector('.cb-clear').addEventListener('click',()=>toggleCustomers('all','👥 كل العملاء',total));
    }

    function toggleCustomers(type,title,stat){
      const area=document.getElementById('cbCustomerArea');if(!area)return;
      const search=document.getElementById('search'),renewal=document.getElementById('renewalFilter'),status=document.getElementById('statusFilter');
      if(search)search.value='';
      if(renewal)renewal.value=type==='day1'?'1':type==='day16'?'16':'all';
      if(status)status.value=type==='soon'?'soon':'all';
      const opening=!area.classList.contains('open')||stat.dataset.filter!==type;
      if(!opening){area.classList.remove('open');stat.classList.remove('open');stat.dataset.filter='';return;}
      document.querySelectorAll('.cb-filter-stat.open').forEach(x=>x.classList.remove('open'));
      document.querySelectorAll('.cb-filter-stat').forEach(x=>{if(x!==stat)x.dataset.filter='';});
      area.classList.add('open');stat.classList.add('open');stat.dataset.filter=type;
      const titleEl=document.getElementById('cbFilterTitle');if(titleEl)titleEl.textContent=title;
      if(typeof window.render==='function')window.render();
      setTimeout(()=>area.scrollIntoView({behavior:'smooth',block:'start'}),50);
    }

    if(!day1.dataset.bound){
      day1.dataset.bound='1';day1.addEventListener('click',()=>toggleCustomers('day1','📅 عملاء تجديد يوم 1',day1));
      day16.dataset.bound='1';day16.addEventListener('click',()=>toggleCustomers('day16','📅 عملاء تجديد يوم 16',day16));
      if(soon&&!soon.dataset.bound){soon.dataset.bound='1';soon.classList.add('cb-filter-stat');soon.addEventListener('click',()=>toggleCustomers('soon','🕐 التجديدات القريبة — خلال 7 أيام',soon));}
      newOrders.dataset.bound='1';newOrders.addEventListener('click',async()=>{const a=document.getElementById('cbOrdersArea');if(a){a.classList.toggle('cb-orders-open');if(a.classList.contains('cb-orders-open')){a.scrollIntoView({behavior:'smooth',block:'start'});await loadOrders();}}});
    }

    if(!document.getElementById('cbOrdersArea')){
      const a=document.createElement('div');a.id='cbOrdersArea';
      a.innerHTML='<div class="cb-orders-box"><div class="cb-orders-head"><div class="cb-orders-title">🆕 طلبات الباقات الجديدة</div><button type="button" class="cb-clear">إغلاق</button></div><div id="cbOrdersList" class="loading">⏳ جاري تحميل الطلبات...</div></div>';
      stats.insertAdjacentElement('afterend',a);a.querySelector('.cb-clear').addEventListener('click',()=>a.classList.remove('cb-orders-open'));
    }

    function bindCustomerCards(){
      list.querySelectorAll('.card').forEach(card=>{
        if(card.dataset.cbBound)return;card.dataset.cbBound='1';
        const h=card.querySelector('.ch');if(!h)return;
        h.addEventListener('click',e=>{if(e.target.closest('button,a,input,select'))return;list.querySelectorAll('.card.open').forEach(x=>{if(x!==card)x.classList.remove('open')});card.classList.toggle('open');});
      });
    }
    bindCustomerCards();new MutationObserver(bindCustomerCards).observe(list,{childList:true});

    async function refreshCounts(){
      try{
        const r=await fetch(SUPABASE_URL+'/rest/v1/customers?select=renewal_day,deleted_at&deleted_at=is.null',{headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+SUPABASE_KEY}});
        if(r.ok){const rows=await r.json();const n1=document.getElementById('cbDay1StatNum'),n16=document.getElementById('cbDay16StatNum');if(n1)n1.textContent=rows.filter(c=>Number(c.renewal_day)===1).length;if(n16)n16.textContent=rows.filter(c=>Number(c.renewal_day)===16).length;}
      }catch(e){}
    }

    async function loadOrders(){
      const box=document.getElementById('cbOrdersList');if(!box)return;box.innerHTML='<div class="loading">⏳ جاري تحميل الطلبات...</div>';
      try{
        const r=await fetch(SUPABASE_URL+'/rest/v1/orders?select=*&status=in.(pending,payment_submitted)&order=order_number.desc',{headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+SUPABASE_KEY}});
        if(!r.ok)throw new Error('تعذر تحميل الطلبات الجديدة');
        const rows=await r.json();const listRows=Array.isArray(rows)?rows:[];const num=document.getElementById('cbNewOrdersStatNum');if(num)num.textContent=listRows.length;
        if(!listRows.length){box.innerHTML='<div class="empty">لا توجد طلبات جديدة حاليًا ✅</div>';return;}
        box.innerHTML=listRows.map(o=>{const st=o.status==='payment_submitted'?'💳 تم إرسال الدفع':'⏳ في انتظار الدفع';const pkg=o.package_name||((o.package_gb||'-')+' جيجا');const price=o.final_price??o.original_price??0;return '<div class="cb-order"><div class="cb-order-head"><div><b>'+esc(o.subscriber_name||'بدون اسم')+'</b><div style="font-size:12px;color:var(--text-muted);margin-top:3px">#'+esc(o.order_number||'-')+' · '+esc(pkg)+' · '+st+'</div></div><strong>'+money(price)+' ج</strong></div><div class="cb-order-details">📱 الرقم: <b>'+esc(o.phone||'-')+'</b><br>📦 الباقة: <b>'+esc(pkg)+'</b><br>💰 السعر: <b>'+money(price)+' جنيه</b><br>🎁 الكود: <b>'+esc(o.promo_code||'لا يوجد')+'</b><br>🕒 الحالة: <b>'+st+'</b></div></div>';}).join('');
        box.querySelectorAll('.cb-order-head').forEach(h=>h.addEventListener('click',()=>h.parentElement.classList.toggle('open')));
      }catch(e){box.innerHTML='<div class="error">❌ '+esc(e.message||'تعذر تحميل الطلبات')+'</div>';}
    }

    refreshCounts();
    let refreshes=0;const t=setInterval(()=>{refreshCounts();if(++refreshes>=10)clearInterval(t)},1500);
  }

  function init(){setupTheme();setupNavigation();setupPrint();setupCustomers();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
