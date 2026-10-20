/* Naturalmente Media con menos adornos: títulos con tipografía editorial (Fraunces), sin etiquetas en mayúsculas
   espaciadas, y el dorado reservado para lo que vende (botones de compra) y la marca MEDIA. */
!function(){var d=document;if(!d.querySelector('.dn-media')||d.getElementById('dn-mx-css'))return;
var l1=d.createElement('link');l1.rel='preconnect';l1.href='https://fonts.gstatic.com';l1.crossOrigin='anonymous';d.head.appendChild(l1);
var lf=d.createElement('link');lf.rel='stylesheet';lf.href='https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&display=swap';d.head.appendChild(lf);
var S='html body ',M=S+'.dn-media ',F='Fraunces,Georgia,"Times New Roman",serif';
var css=
/* tipografía de títulos */
M+'h1,'+M+'h2,'+M+'h3,'+M+'#dmx-mast .lg,'+M+'.nvk b,'+M+'.dmx-c b,'+M+'.dm-ep-tt,'+M+'.dm-ep-tt a,'+M+'.dmx-n b,'+M+'.dm-art-t,'+M+'.dm-prog-t,'+S+'.dn-mvb h2,'+S+'.dn-kit h3{font-family:'+F+'!important;font-weight:600!important;letter-spacing:-.012em!important;font-optical-sizing:auto}'+
M+'.nt-hd h1,'+M+'.dx-hero h1,'+M+'.dmx-tt h1{font-weight:700!important;letter-spacing:-.02em!important;line-height:1.08!important}'+M+'.nt-bd h2,'+M+'.nt-bd h3{font-weight:600!important;letter-spacing:-.01em!important}'+
/* sin mayúsculas espaciadas */
M+'.dmx-hd i,'+M+'.dmx-tt i,'+M+'.dw-hd i{display:none!important}'+
M+'.nvk em,'+M+'.dm-ep-tag,'+M+'.nt-k b,'+M+'.dx-eye,'+M+'.dx-badge,'+M+'.dx-live,'+M+'.dx-pl-lbl,'+M+'.dx-bc,'+M+'.dx-ep2,'+M+'.dx-brand,'+M+'.dm-badge,'+M+'.dm-logo,'+M+'.dmx-hd.sm h2,'+M+'.dmx-c small,'+M+'.dmx-n em,'+M+'em,'+M+'small,'+M+'.dn-gc i,'+S+'.dn-kit small,'+S+'.dn-mvi small{text-transform:none!important;letter-spacing:0!important}'+
M+'.dmx-hd.sm h2{font-family:'+F+'!important;font-size:19px!important;color:#fff!important}'+
/* etiquetas como texto, no como pastilla dorada */
M+'.nvk em,'+M+'.nt-k b,'+M+'.dx-badge{background:none!important;border:0!important;padding:0!important;color:rgba(255,255,255,.62)!important;font-weight:700!important;box-shadow:none!important}'+
M+'.dm-ep-tag{background:rgba(0,0,0,.55)!important;color:#fff!important;border:0!important}'+
M+'.nvk em,'+M+'.dmx-c small,'+M+'.dmx-n em,'+M+'.nt-k span,'+M+'.dx-eye,'+M+'.dx-src{color:rgba(255,255,255,.6)!important}'+S+'.dn-kit small,'+S+'.dn-mvi small{color:rgba(255,255,255,.62)!important;font-weight:700!important}'+
/* adornos fuera */
M+'#dmx-mast .gl,'+M+'.dx-aur,'+M+'.dx-quote{display:none!important}'+M+'.nt-bd h2:before,'+M+'.nt-bd h3:before{display:none!important}'+M+'.dm-prog-head>div{border-left:0!important;padding-left:0!important}'+
/* dorado solo en lo que vende: selección y navegación en blanco */
M+'#dmx-tabs .ind{background:#fff!important;box-shadow:none!important}'+M+'.dmx-ch button.on{background:#fff!important;border-color:#fff!important;color:#10281a!important}'+
M+'.dmx-more,'+M+'.dmx-pa,'+M+'.dmx-n .tg,'+M+'.nt-toc summary,'+M+'.dx-r b,'+M+'.dx-acc-h i,'+M+'.dx-brand b,'+M+'.dmx-c u,'+M+'.dmx-n u{color:#fff!important}'+
M+'.dmx-pa,'+M+'.dmx-n .tg,'+M+'.dx-cta{background:rgba(255,255,255,.07)!important;border-color:rgba(255,255,255,.2)!important}'+M+'.dmx-n .tg{color:#fff!important}'+
M+'.nvk,'+M+'.dm-wa2,'+M+'.nt-wa,'+M+'.dx-dot{border-color:rgba(255,255,255,.12)!important}'+M+'.nvk .pl,'+M+'.dx-play,'+M+'.dx-av{background:rgba(255,255,255,.9)!important;color:#10281a!important}'+
M+'.dx-btn{background:rgba(255,255,255,.1)!important;color:#fff!important;border:1px solid rgba(255,255,255,.22)!important}'+M+'.dx-btn:first-child{background:#fff!important;color:#10281a!important}'+
M+'.dx-r b,'+M+'.dx-acc-h i{background:rgba(255,255,255,.1)!important}'+
S+'.dn-rmore button{border-color:rgba(255,255,255,.35)!important;background:rgba(255,255,255,.06)!important;color:#fff!important}'+
S+'.dn-kit{border-color:rgba(255,255,255,.14)!important}'+S+'.dn-kit .tg{background:rgba(255,255,255,.12)!important;color:#fff!important}'+S+'.dn-kit .p,'+S+'.dn-mvc u,'+S+'.dn-mvi u{color:#fff!important}'+S+'.dn-mvi{background:rgba(255,255,255,.05)!important;border-color:rgba(255,255,255,.14)!important}'+
/* compartir neutro (no verde WhatsApp) */
M+'a.dn-shr{background:rgba(255,255,255,.1)!important;color:#fff!important;border:1px solid rgba(255,255,255,.22)!important}'+
/* barra de secciones de Media: activo en blanco */
S+'#dnh .r3 nav a.on{background:#fff!important;color:#10281a!important;box-shadow:none!important}'+S+'#dn-sbar.mdx .mt a.on{background:#fff!important;color:#10281a!important}';
var st=d.createElement('style');st.id='dn-mx-css';st.textContent=css;d.head.appendChild(st);
}();
