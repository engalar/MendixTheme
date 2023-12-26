define(["module","./watch","./util","../_base/kernel","../_base/array","../_base/lang","../on","../dom","../dom-construct","../has","../_base/window"],(function(module,watch,util,kernel,array,lang,on,dom,domConstruct,has,win){has.add("script-readystatechange",(function(e,t){return void 0!==t.createElement("script").onreadystatechange&&(void 0===e.opera||"[object Opera]"!==e.opera.toString())}));var mid=module.id.replace(/[\/\.\-]/g,"_"),counter=0,loadEvent=has("script-readystatechange")?"readystatechange":"load",readyRegExp=/complete|loaded/,callbacks=kernel.global[mid+"_callbacks"]={},deadScripts=[];function attach(e,t,a,r){var c=a||win.doc,n=c.createElement("script");r&&on.once(n,"error",r),n.type="text/javascript";try{n.src=t}catch(e){r&&r(n)}return n.id=e,n.async=!0,n.charset="utf-8",c.getElementsByTagName("head")[0].appendChild(n)}function remove(e,t,a){domConstruct.destroy(dom.byId(e,t)),callbacks[e]&&(a?callbacks[e]=function(){delete callbacks[e]}:delete callbacks[e])}function _addDeadScript(e){var t=e.response.options,a=t.ioArgs?t.ioArgs.frameDoc:t.frameDoc;deadScripts.push({id:e.id,frameDoc:a}),t.ioArgs&&(t.ioArgs.frameDoc=null),t.frameDoc=null}function canceler(e,t){e.canDelete&&script._remove(e.id,t.options.frameDoc,!0)}function isValid(e){return deadScripts&&deadScripts.length&&(array.forEach(deadScripts,(function(e){script._remove(e.id,e.frameDoc),e.frameDoc=null})),deadScripts=[]),!e.options.jsonp||!e.data}function isReadyScript(e){return!!this.scriptLoaded}function isReadyCheckString(response){var checkString=response.options.checkString;return checkString&&eval("typeof("+checkString+') !== "undefined"')}function handleResponse(e,t){this.canDelete&&_addDeadScript(this),t?this.reject(t):this.resolve(e)}function script(e,t,a){var r=util.parseArgs(e,util.deepCopy({},t));e=r.url,t=r.options;var c=util.deferred(r,canceler,isValid,t.jsonp?null:t.checkString?isReadyCheckString:isReadyScript,handleResponse);if(lang.mixin(c,{id:mid+counter++,canDelete:!1}),t.jsonp&&(new RegExp("[?&]"+t.jsonp+"=").test(e)||(e+=(~e.indexOf("?")?"&":"?")+t.jsonp+"="+(t.frameDoc?"parent.":"")+mid+"_callbacks."+c.id),c.canDelete=!0,callbacks[c.id]=function(e){r.data=e,c.handleResponse(r)}),util.notify&&util.notify.emit("send",r,c.promise.cancel),!t.canAttach||t.canAttach(c)){var n=script._attach(c.id,e,t.frameDoc,(function(e){if(!(e instanceof Error)){var a=new Error("Error loading "+(e.target?e.target.src:"script"));a.source=e,e=a}c.reject(e),script._remove(c.id,t.frameDoc,!0)}));if(!t.jsonp&&!t.checkString)var i=on(n,loadEvent,(function(e){("load"===e.type||readyRegExp.test(n.readyState))&&(i.remove(),c.scriptLoaded=e)}))}return watch(c),a?c:c.promise}return script.get=script,script._attach=attach,script._remove=remove,script._callbacksProperty=mid+"_callbacks",script}));