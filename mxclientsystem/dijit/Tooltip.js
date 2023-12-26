define(["dojo/_base/array","dojo/_base/declare","dojo/_base/fx","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang","dojo/mouse","dojo/on","dojo/sniff","./_base/manager","./place","./_Widget","./_TemplatedMixin","./BackgroundIframe","dojo/text!./templates/Tooltip.html","./main"],(function(t,e,o,i,n,s,h,d,r,c,a,f,l,u,T,_,m,p){var N=e("dijit._MasterTooltip",[u,T],{duration:f.defaultDuration,templateString:m,postCreate:function(){this.ownerDocumentBody.appendChild(this.domNode),this.bgIframe=new _(this.domNode),this.fadeIn=o.fadeIn({node:this.domNode,duration:this.duration,onEnd:d.hitch(this,"_onShow")}),this.fadeOut=o.fadeOut({node:this.domNode,duration:this.duration,onEnd:d.hitch(this,"_onHide")})},show:function(t,e,o,i,n,s,r){if(!this.aroundNode||this.aroundNode!==e||this.containerNode.innerHTML!=t)if("playing"!=this.fadeOut.status()){this.containerNode.innerHTML=t,n&&this.set("textDir",n),this.containerNode.align=i?"right":"left";var c=l.around(this.domNode,e,o&&o.length?o:g.defaultPosition,!i,d.hitch(this,"orient")),a=c.aroundNodePos;"M"==c.corner.charAt(0)&&"M"==c.aroundCorner.charAt(0)?(this.connectorNode.style.top=a.y+(a.h-this.connectorNode.offsetHeight>>1)-c.y+"px",this.connectorNode.style.left=""):"M"==c.corner.charAt(1)&&"M"==c.aroundCorner.charAt(1)?this.connectorNode.style.left=a.x+(a.w-this.connectorNode.offsetWidth>>1)-c.x+"px":(this.connectorNode.style.left="",this.connectorNode.style.top=""),h.set(this.domNode,"opacity",0),this.fadeIn.play(),this.isShowingNow=!0,this.aroundNode=e,this.onMouseEnter=s||v,this.onMouseLeave=r||v}else this._onDeck=arguments},orient:function(t,e,o,i,n){this.connectorNode.style.top="";var h=i.h,d=i.w;t.className="dijitTooltip "+{"MR-ML":"dijitTooltipRight","ML-MR":"dijitTooltipLeft","TM-BM":"dijitTooltipAbove","BM-TM":"dijitTooltipBelow","BL-TL":"dijitTooltipBelow dijitTooltipABLeft","TL-BL":"dijitTooltipAbove dijitTooltipABLeft","BR-TR":"dijitTooltipBelow dijitTooltipABRight","TR-BR":"dijitTooltipAbove dijitTooltipABRight","BR-BL":"dijitTooltipRight","BL-BR":"dijitTooltipLeft"}[e+"-"+o],this.domNode.style.width="auto";var r=s.position(this.domNode);(a("ie")||a("trident"))&&(r.w+=2);var c=Math.min(Math.max(d,1),r.w);if(s.setMarginBox(this.domNode,{w:c}),"B"==o.charAt(0)&&"B"==e.charAt(0)){var f=s.position(t),l=this.connectorNode.offsetHeight;if(f.h>h){var u=h-(n.h+l>>1);this.connectorNode.style.top=u+"px",this.connectorNode.style.bottom=""}else this.connectorNode.style.bottom=Math.min(Math.max(n.h/2-l/2,0),f.h-l)+"px",this.connectorNode.style.top=""}else this.connectorNode.style.top="",this.connectorNode.style.bottom="";return Math.max(0,r.w-d)},_onShow:function(){a("ie")&&(this.domNode.style.filter="")},hide:function(t){this._onDeck&&this._onDeck[1]==t?this._onDeck=null:this.aroundNode===t&&(this.fadeIn.stop(),this.isShowingNow=!1,this.aroundNode=null,this.fadeOut.play()),this.onMouseEnter=this.onMouseLeave=v},_onHide:function(){this.domNode.style.cssText="",this.containerNode.innerHTML="",this._onDeck&&(this.show.apply(this,this._onDeck),this._onDeck=null)}});a("dojo-bidi")&&N.extend({_setAutoTextDir:function(e){this.applyTextDir(e),t.forEach(e.children,(function(t){this._setAutoTextDir(t)}),this)},_setTextDirAttr:function(t){this._set("textDir",t),"auto"==t?this._setAutoTextDir(this.containerNode):this.containerNode.dir=this.textDir}}),p.showTooltip=function(e,o,i,n,s,h,d){return i&&(i=t.map(i,(function(t){return{after:"after-centered",before:"before-centered"}[t]||t}))),g._masterTT||(p._masterTT=g._masterTT=new N),g._masterTT.show(e,o,i,n,s,h,d)},p.hideTooltip=function(t){return g._masterTT&&g._masterTT.hide(t)};var w="DORMANT",y="SHOW TIMER",M="SHOWING",j="HIDE TIMER";function v(){}var g=e("dijit.Tooltip",u,{label:"",showDelay:400,hideDelay:400,connectId:[],position:[],selector:"",_setConnectIdAttr:function(e){t.forEach(this._connections||[],(function(e){t.forEach(e,(function(t){t.remove()}))}),this),this._connectIds=t.filter(d.isArrayLike(e)?e:e?[e]:[],(function(t){return i.byId(t,this.ownerDocument)}),this),this._connections=t.map(this._connectIds,(function(t){var e=i.byId(t,this.ownerDocument),o=this.selector,n=o?function(t){return c.selector(o,t)}:function(t){return t},s=this;return[c(e,n(r.enter),(function(){s._onHover(this)})),c(e,n("focusin"),(function(){s._onHover(this)})),c(e,n(r.leave),d.hitch(s,"_onUnHover")),c(e,n("focusout"),d.hitch(s,"set","state",w))]}),this),this._set("connectId",e)},addTarget:function(e){var o=e.id||e;-1==t.indexOf(this._connectIds,o)&&this.set("connectId",this._connectIds.concat(o))},removeTarget:function(e){var o=e.id||e,i=t.indexOf(this._connectIds,o);i>=0&&(this._connectIds.splice(i,1),this.set("connectId",this._connectIds))},buildRendering:function(){this.inherited(arguments),n.add(this.domNode,"dijitTooltipData")},startup:function(){this.inherited(arguments);var e=this.connectId;t.forEach(d.isArrayLike(e)?e:[e],this.addTarget,this)},getContent:function(t){return this.label||this.domNode.innerHTML},state:w,_setStateAttr:function(t){if(!(this.state==t||t==y&&this.state==M||t==j&&this.state==w)){switch(this._hideTimer&&(this._hideTimer.remove(),delete this._hideTimer),this._showTimer&&(this._showTimer.remove(),delete this._showTimer),t){case w:this._connectNode&&(g.hide(this._connectNode),delete this._connectNode,this.onHide());break;case y:this.state!=M&&(this._showTimer=this.defer((function(){this.set("state",M)}),this.showDelay));break;case M:var e=this.getContent(this._connectNode);if(!e)return void this.set("state",w);g.show(e,this._connectNode,this.position,!this.isLeftToRight(),this.textDir,d.hitch(this,"set","state",M),d.hitch(this,"set","state",j)),this.onShow(this._connectNode,this.position);break;case j:this._hideTimer=this.defer((function(){this.set("state",w)}),this.hideDelay)}this._set("state",t)}},_onHover:function(t){this._connectNode&&t!=this._connectNode&&this.set("state",w),this._connectNode=t,this.set("state",y)},_onUnHover:function(t){this.set("state",j)},open:function(t){this.set("state",w),this._connectNode=t,this.set("state",M)},close:function(){this.set("state",w)},onShow:function(){},onHide:function(){},destroy:function(){this.set("state",w),t.forEach(this._connections||[],(function(e){t.forEach(e,(function(t){t.remove()}))}),this),this.inherited(arguments)}});return g._MasterTooltip=N,g.show=p.showTooltip,g.hide=p.hideTooltip,g.defaultPosition=["after-centered","before-centered"],g}));