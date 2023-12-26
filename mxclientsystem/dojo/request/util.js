define(["exports","../errors/RequestError","../errors/CancelError","../Deferred","../io-query","../_base/array","../_base/lang","../promise/Promise","../has"],(function(e,t,n,r,o,a,i,c,f){function u(e){return f("native-arraybuffer")&&e instanceof ArrayBuffer}function p(e){return f("native-blob")&&e instanceof Blob}e.deepCopy=function(t,n){for(var r in n){var o=t[r],a=n[r];"__proto__"!==r&&o!==a&&(!(c=a)||"object"!=typeof c||function(e){return f("native-formdata")&&e instanceof FormData}(c)||function(e){return"undefined"!=typeof Element?e instanceof Element:1===e.nodeType}(c)||p(c)||u(c)?t[r]=a:"[object Date]"===Object.prototype.toString.call(a)?t[r]=new Date(a):i.isArray(a)?t[r]=e.deepCopyArray(a):o&&"object"==typeof o?e.deepCopy(o,a):t[r]=e.deepCopy({},a))}var c;return t},e.deepCopyArray=function(t){for(var n=[],r=0,o=t.length;r<o;r++){var a=t[r];"object"==typeof a?n.push(e.deepCopy({},a)):n.push(a)}return n},e.deepCreate=function(t,n){n=n||{};var r,o,a=i.delegate(t);for(r in t)(o=t[r])&&"object"==typeof o&&(a[r]=e.deepCreate(o,n[r]));return e.deepCopy(a,n)};var s=Object.freeze||function(e){return e};function d(e){return s(e)}function y(e){return void 0!==e.data?e.data:e.text}e.deferred=function(o,a,f,u,p,h){var l=new r((function(e){return a&&a(l,o),e&&(e instanceof t||e instanceof n)?e:new n("Request canceled",o)}));l.response=o,l.isValid=f,l.isReady=u,l.handleResponse=p;var v=l.then(d).otherwise((function(e){throw e.response=o,e}));e.notify&&v.then(i.hitch(e.notify,"emit","load"),i.hitch(e.notify,"emit","error"));var b=v.then(y),C=new c;for(var E in b)b.hasOwnProperty(E)&&(C[E]=b[E]);return C.response=v,s(C),h&&l.then((function(e){h.call(l,e)}),(function(e){h.call(l,o,e)})),l.promise=C,l.then=C.then,l},e.addCommonMethods=function(e,t){a.forEach(t||["GET","POST","PUT","DELETE"],(function(t){e[("DELETE"===t?"DEL":t).toLowerCase()]=function(n,r){return(r=i.delegate(r||{})).method=t,e(n,r)}}))},e.parseArgs=function(e,t,n){var r=t.data,a=t.query;return r&&!n&&("object"!=typeof r||f("native-xhr2")&&(u(r)||p(r))||(t.data=o.objectToQuery(r))),a?("object"==typeof a&&(a=o.objectToQuery(a)),t.preventCache&&(a+=(a?"&":"")+"request.preventCache="+ +new Date)):t.preventCache&&(a="request.preventCache="+ +new Date),e&&a&&(e+=(~e.indexOf("?")?"&":"?")+a),{url:e,options:t,getHeader:function(e){return null}}},e.checkStatus=function(e){return(e=e||0)>=200&&e<300||304===e||1223===e||!e}}));