define(["dojo/_base/declare","dojo/dom-construct","dojo/has","dojo/_base/lang","dojo/on","dojo/_base/window","../Viewport"],(function(e,i,t,o,s,r,n){return t.add("textarea-needs-help-shrinking",(function(){var e=r.body(),t=i.create("textarea",{rows:"5",cols:"20",value:" ",style:{zoom:1,fontSize:"12px",height:"96px",overflow:"hidden",visibility:"hidden",position:"absolute",border:"5px solid white",margin:"0",padding:"0",boxSizing:"border-box",MsBoxSizing:"border-box",WebkitBoxSizing:"border-box",MozBoxSizing:"border-box"}},e,"last"),o=t.scrollHeight>=t.clientHeight;return e.removeChild(t),o})),e("dijit.form._ExpandingTextAreaMixin",null,{_setValueAttr:function(){this.inherited(arguments),this.resize()},postCreate:function(){this.inherited(arguments);var e=this.textbox;e.style.overflowY="hidden",this.own(s(e,"focus, resize",o.hitch(this,"_resizeLater")))},startup:function(){this.inherited(arguments),this.own(n.on("resize",o.hitch(this,"_resizeLater"))),this._resizeLater()},_onInput:function(e){this.inherited(arguments),this.resize()},_estimateHeight:function(){var e=this.textbox;e.rows=(e.value.match(/\n/g)||[]).length+1},_resizeLater:function(){this.defer("resize")},resize:function(){var e=this.textbox;function i(){var i=!1;""===e.value&&(e.value=" ",i=!0);var t=e.scrollHeight;return i&&(e.value=""),t}if("hidden"==e.style.overflowY&&(e.scrollTop=0),!this.busyResizing){if(this.busyResizing=!0,i()||e.offsetHeight){var o=i()+Math.max(e.offsetHeight-e.clientHeight,0),s=o+"px";if(s!=e.style.height&&(e.style.height=s,e.rows=1),t("textarea-needs-help-shrinking")){var r,n=i(),h=e.style.minHeight,l=4,a=e.scrollTop;for(e.style.minHeight=s,e.style.height="auto";o>0;){e.style.minHeight=Math.max(o-l,4)+"px";var d=n-(r=i());if(o-=d,d<l)break;n=r,l<<=1}e.style.height=o+"px",e.style.minHeight=h,e.scrollTop=a}e.style.overflowY=i()>e.clientHeight?"auto":"hidden","hidden"==e.style.overflowY&&(e.scrollTop=0)}else this._estimateHeight();this.busyResizing=!1}}})}));