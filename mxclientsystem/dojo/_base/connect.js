define(["./kernel","../on","../topic","../aspect","./event","../mouse","./sniff","./lang","../keys"],(function(e,n,r,t,c,o,i,a){function u(r,c,i,u,f){if(u=a.hitch(i,u),!r||!r.addEventListener&&!r.attachEvent)return t.after(r||e.global,c,u,!0);if("string"==typeof c&&"on"==c.substring(0,2)&&(c=c.substring(2)),r||(r=e.global),!f)switch(c){case"keypress":c=s;break;case"mouseenter":c=o.enter;break;case"mouseleave":c=o.leave}return n(r,c,u,f)}i.add("events-keypress-typed",(function(){var e={charCode:0};try{((e=document.createEvent("KeyboardEvent")).initKeyboardEvent||e.initKeyEvent).call(e,"keypress",!0,!0,null,!1,!1,!1,!1,9,3)}catch(e){}return 0==e.charCode&&!i("opera")}));var s,f={106:42,111:47,186:59,187:43,188:44,189:45,190:46,191:47,192:96,219:91,220:92,221:93,222:39,229:113},y=i("mac")?"metaKey":"ctrlKey",l=function(e,n){var r=a.mixin({},e,n);return h(r),r.preventDefault=function(){e.preventDefault()},r.stopPropagation=function(){e.stopPropagation()},r};function h(e){e.keyChar=e.charCode?String.fromCharCode(e.charCode):"",e.charOrCode=e.keyChar||e.keyCode}var p={_keypress:s=i("events-keypress-typed")?function(e,r){var t=n(e,"keydown",(function(e){var n=e.keyCode,t=13!=n&&32!=n&&(27!=n||!i("ie"))&&(n<48||n>90)&&(n<96||n>111)&&(n<186||n>192)&&(n<219||n>222)&&229!=n;if(t||e.ctrlKey){var c=t?0:n;if(e.ctrlKey){if(3==n||13==n)return r.call(e.currentTarget,e);c>95&&c<106?c-=48:!e.shiftKey&&c>=65&&c<=90?c+=32:c=f[c]||c}var o=l(e,{type:"keypress",faux:!0,charCode:c});r.call(e.currentTarget,o),i("ie")&&function(e,n){try{return e.keyCode=n}catch(e){return 0}}(e,o.keyCode)}})),c=n(e,"keypress",(function(e){var n=e.charCode;return e=l(e,{charCode:n=n>=32?n:0,faux:!0}),r.call(this,e)}));return{remove:function(){t.remove(),c.remove()}}}:i("opera")?function(e,r){return n(e,"keypress",(function(e){var n=e.which;return 3==n&&(n=99),n=n<32&&!e.shiftKey?0:n,e.ctrlKey&&!e.shiftKey&&n>=65&&n<=90&&(n+=32),r.call(this,l(e,{charCode:n}))}))}:function(e,r){return n(e,"keypress",(function(e){return h(e),r.call(this,e)}))},connect:function(e,n,r,t,c){var o=arguments,i=[],a=0;i.push("string"==typeof o[0]?null:o[a++],o[a++]);var s=o[a+1];i.push("string"==typeof s||"function"==typeof s?o[a++]:null,o[a++]);for(var f=o.length;a<f;a++)i.push(o[a]);return u.apply(this,i)},disconnect:function(e){e&&e.remove()},subscribe:function(e,n,t){return r.subscribe(e,a.hitch(n,t))},publish:function(e,n){return r.publish.apply(r,[e].concat(n))},connectPublisher:function(e,n,r){var t=function(){p.publish(e,arguments)};return r?p.connect(n,r,t):p.connect(n,t)},isCopyKey:function(e){return e[y]}};return p.unsubscribe=p.disconnect,i("extend-dojo")&&a.mixin(e,p),p}));