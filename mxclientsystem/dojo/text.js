define(["./_base/kernel","require","./has","./has!host-browser?./request"],(function(e,t,n,r){var o;n("host-browser")?o=function(e,t,n){r(e,{sync:!!t,headers:{"X-Requested-With":null}}).then(n)}:t.getText?o=t.getText:console.error("dojo/text plugin failed to load because loader does not support getText");var s={},i=function(e){if(e){var t=(e=e.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"")).match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);t&&(e=t[1])}else e="";return e},l={},a={};return e.cache=function(e,n,r){var l;"string"==typeof e?/\//.test(e)?(l=e,r=n):l=t.toUrl(e.replace(/\./g,"/")+(n?"/"+n:"")):(l=e+"",r=n);var a=null!=r&&"string"!=typeof r?r.value:r,u=r&&r.sanitize;return"string"==typeof a?(s[l]=a,u?i(a):a):null===a?(delete s[l],null):(l in s||o(l,!0,(function(e){s[l]=e})),u?i(s[l]):s[l])},{dynamic:!0,normalize:function(e,t){var n=e.split("!"),r=n[0];return(/^\./.test(r)?t(r):r)+(n[1]?"!"+n[1]:"")},load:function(e,t,n){var r=e.split("!"),u=r.length>1,c=r[0],f=t.toUrl(r[0]),d="url:"+f,h=l,p=function(e){n(u?i(e):e)};if(c in s?h=s[c]:t.cache&&d in t.cache?h=t.cache[d]:f in s&&(h=s[f]),h===l)if(a[f])a[f].push(p);else{var v=a[f]=[p];o(f,!t.async,(function(e){s[c]=s[f]=e;for(var t=0;t<v.length;)v[t++](e);delete a[f]}))}else p(h)}}}));