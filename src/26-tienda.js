!function(){var d=document,B=d.body;if(!B.classList.contains('template-category')||!/^\/productos(\/page\/\d+)?\/?$/.test(location.pathname)||B.classList.contains('dn-shop'))return;
B.classList.add('dn-shop');
var st=d.createElement('style');st.textContent='body.dn-shop #dn-lep,body.dn-shop #dn-ig,body.dn-shop #dn-o100{display:none!important}'+
'body.dn-shop #dn-ex.top{margin-top:0;padding-top:4px}body.dn-shop #dn-ex.top h3{font-size:19px}'+
'body.dn-shop .dn-hero .eb{display:block;font-size:11px;font-weight:800;letter-spacing:.18em;color:#f4c95d;margin:0 0 4px;text-transform:none}'+
'#dn-wa2{display:flex;align-items:center;gap:12px;margin:8px 12px 26px;padding:14px 16px;border-radius:18px;background:#f3faf1;border:1.5px solid #bfe3c4;text-decoration:none!important;color:#16261b!important}#dn-wa2 b{display:block;font-size:14.5px}#dn-wa2 small{display:block;color:#53624f;font-size:12.5px}#dn-wa2 em{margin-left:auto;flex:0 0 auto;font-style:normal;background:#25d366;color:#fff;font-weight:900;font-size:13px;border-radius:999px;padding:9px 13px}'+
'@media(min-width:768px){#dn-wa2{max-width:1116px;margin-left:auto;margin-right:auto}}';d.head.appendChild(st);
var h1=d.querySelector('.category-banner .page-header h1, .page-header h1');
if(h1){[].forEach.call(h1.childNodes,function(n){if(n.nodeType===3&&n.textContent.trim())n.textContent='Tienda'});if(!/tienda/i.test(h1.textContent))h1.appendChild(d.createTextNode('Tienda'));
var ph=h1.closest('.page-header');if(ph&&!ph.querySelector('.eb')){var e=d.createElement('span');e.className='eb';e.textContent='DIETÉTICAS NATURALMENTE';ph.insertBefore(e,ph.firstChild)}}
if(/\/page\/\d/.test(location.pathname))return;
var tries=0;(function mv(){var ex=d.getElementById('dn-ex'),tb=d.querySelector('.js-product-table');if(!ex||!tb){if(++tries<20)setTimeout(mv,250);return}
if(ex.classList.contains('top'))return;var wa=ex.querySelector('.wa');if(wa){wa.id='dn-wa2';wa.className='';ex.parentNode.insertBefore(wa,ex.nextSibling)}
var h=ex.querySelector('h3');if(h)h.textContent='Comprá por categoría';ex.classList.add('top');
var hr=d.querySelector('.dn-hero'),hs=hr&&(hr.closest('section')||hr.parentNode);if(hs)hs.parentNode.insertBefore(ex,hs.nextSibling);else{var ref=d.querySelector('.dn-gh')||(tb.closest('.container')||tb);ref.parentNode.insertBefore(ex,ref)}})();
}();
