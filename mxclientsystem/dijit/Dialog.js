define(["require","dojo/_base/array","dojo/aspect","dojo/_base/declare","dojo/Deferred","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/fx","dojo/i18n","dojo/keys","dojo/_base/lang","dojo/on","dojo/ready","dojo/sniff","dojo/touch","dojo/window","dojo/dnd/Moveable","dojo/dnd/TimedMoveable","./focus","./_base/manager","./_Widget","./_TemplatedMixin","./_CssStateMixin","./form/_FormMixin","./_DialogMixin","./DialogUnderlay","./layout/ContentPane","./layout/utils","dojo/text!./templates/Dialog.html","./a11yclick","dojo/i18n!./nls/common"],(function(t,e,i,o,s,n,h,d,a,r,l,c,u,f,_,m,g,p,D,y,v,w,N,x,I,j,b,B,C,M,F){var z=new s;function O(){}z.resolve(!0);var T=o("dijit._DialogBase"+(m("dojo-bidi")?"_NoBidi":""),[x,j,b,I],{templateString:F,baseClass:"dijitDialog",cssStateNodes:{closeButtonNode:"dijitDialogCloseIcon"},_setTitleAttr:{node:"titleNode",type:"innerHTML"},open:!1,duration:w.defaultDuration,refocus:!0,autofocus:!0,_firstFocusItem:null,_lastFocusItem:null,draggable:!0,_setDraggableAttr:function(t){this._set("draggable",t)},maxRatio:.9,closable:!0,_setClosableAttr:function(t){this.closeButtonNode.style.display=t?"":"none",this._set("closable",t)},postMixInProperties:function(){var t=l.getLocalization("dijit","common");u.mixin(this,t),this.inherited(arguments)},postCreate:function(){a.set(this.domNode,{display:"none",position:"absolute"}),this.ownerDocumentBody.appendChild(this.domNode),this.inherited(arguments),i.after(this,"onExecute",u.hitch(this,"hide"),!0),i.after(this,"onCancel",u.hitch(this,"hide"),!0),f(this.closeButtonNode,g.press,(function(t){t.stopPropagation()})),this._modalconnects=[]},onLoad:function(){this.resize(),this._position(),this.autofocus&&A.isTop(this)&&(this._getFocusItems(),v.focus(this._firstFocusItem)),this.inherited(arguments)},focus:function(){this._getFocusItems(),v.focus(this._firstFocusItem)},_endDrag:function(){var t=d.position(this.domNode),e=p.getBox(this.ownerDocument);t.y=Math.min(Math.max(t.y,0),e.h-t.h),t.x=Math.min(Math.max(t.x,0),e.w-t.w),this._relativePosition=t,this._position()},_setup:function(){var t=this.domNode;this.titleBar&&this.draggable?(this._moveable=new(6==m("ie")?y:D)(t,{handle:this.titleBar}),i.after(this._moveable,"onMoveStop",u.hitch(this,"_endDrag"),!0)):h.add(t,"dijitDialogFixed"),this.underlayAttrs={dialogId:this.id,class:e.map(this.class.split(/\s/),(function(t){return t+"_underlay"})).join(" "),_onKeyDown:u.hitch(this,"_onKey"),ownerDocument:this.ownerDocument}},_size:function(){this.resize()},_position:function(){if(!h.contains(this.ownerDocumentBody,"dojoMove")){var t=this.domNode,e=p.getBox(this.ownerDocument),i=this._relativePosition,o=d.position(t),s=Math.floor(e.l+(i?Math.min(i.x,e.w-o.w):(e.w-o.w)/2)),n=Math.floor(e.t+(i?Math.min(i.y,e.h-o.h):(e.h-o.h)/2));a.set(t,{left:s+"px",top:n+"px"})}},_onKey:function(t){if(t.keyCode==c.TAB){this._getFocusItems();var e=t.target;this._firstFocusItem==this._lastFocusItem?(t.stopPropagation(),t.preventDefault()):e==this._firstFocusItem&&t.shiftKey?(v.focus(this._lastFocusItem),t.stopPropagation(),t.preventDefault()):e!=this._lastFocusItem||t.shiftKey||(v.focus(this._firstFocusItem),t.stopPropagation(),t.preventDefault())}else this.closable&&t.keyCode==c.ESCAPE&&(this.onCancel(),t.stopPropagation(),t.preventDefault())},show:function(){if(this.open)return z.promise;this._started||this.startup(),this._alreadyInitialized||(this._setup(),this._alreadyInitialized=!0),this._fadeOutDeferred&&(this._fadeOutDeferred.cancel(),A.hide(this));var t,e=p.get(this.ownerDocument);this._modalconnects.push(f(e,"scroll",u.hitch(this,"resize",null))),this._modalconnects.push(f(this.domNode,"keydown",u.hitch(this,"_onKey"))),a.set(this.domNode,{opacity:0,display:""}),this._set("open",!0),this._onShow(),this.resize(),this._position(),this._fadeInDeferred=new s(u.hitch(this,(function(){t.stop(),delete this._fadeInDeferred}))),this._fadeInDeferred.then(void 0,O);var i=this._fadeInDeferred.promise;return t=r.fadeIn({node:this.domNode,duration:this.duration,beforeBegin:u.hitch(this,(function(){A.show(this,this.underlayAttrs)})),onEnd:u.hitch(this,(function(){this.autofocus&&A.isTop(this)&&(this._getFocusItems(),v.focus(this._firstFocusItem)),this._fadeInDeferred.resolve(!0),delete this._fadeInDeferred}))}).play(),i},hide:function(){if(!this._alreadyInitialized||!this.open)return z.promise;var t;this._fadeInDeferred&&this._fadeInDeferred.cancel(),this._fadeOutDeferred=new s(u.hitch(this,(function(){t.stop(),delete this._fadeOutDeferred}))),this._fadeOutDeferred.then(void 0,O),this._fadeOutDeferred.then(u.hitch(this,"onHide"));var e,i=this._fadeOutDeferred.promise;for(t=r.fadeOut({node:this.domNode,duration:this.duration,onEnd:u.hitch(this,(function(){this.domNode.style.display="none",A.hide(this),this._fadeOutDeferred.resolve(!0),delete this._fadeOutDeferred}))}).play(),this._scrollConnected&&(this._scrollConnected=!1);e=this._modalconnects.pop();)e.remove();return this._relativePosition&&delete this._relativePosition,this._set("open",!1),i},resize:function(t){if("none"!=this.domNode.style.display){if(this._checkIfSingleChild(),!t){this._shrunk&&(this._singleChild&&void 0!==this._singleChildOriginalStyle&&(this._singleChild.domNode.style.cssText=this._singleChildOriginalStyle,delete this._singleChildOriginalStyle),e.forEach([this.domNode,this.containerNode,this.titleBar,this.actionBarNode],(function(t){t&&a.set(t,{position:"static",width:"auto",height:"auto"})})),this.domNode.style.position="absolute");var i=p.getBox(this.ownerDocument);i.w*=this.maxRatio,i.h*=this.maxRatio;var o=d.position(this.domNode);this._shrunk=!1,o.w>=i.w&&(t={w:i.w},d.setMarginBox(this.domNode,t),o=d.position(this.domNode),this._shrunk=!0),o.h>=i.h&&(t||(t={w:o.w}),t.h=i.h,this._shrunk=!0),t&&(t.w||(t.w=o.w),t.h||(t.h=o.h))}if(t){d.setMarginBox(this.domNode,t);var s=[];this.titleBar&&s.push({domNode:this.titleBar,region:"top"}),this.actionBarNode&&s.push({domNode:this.actionBarNode,region:"bottom"});var n={domNode:this.containerNode,region:"center"};s.push(n);var h=M.marginBox2contentBox(this.domNode,t);if(M.layoutChildren(this.domNode,h,s),this._singleChild){var r=M.marginBox2contentBox(this.containerNode,n);this._singleChild.resize({w:r.w,h:r.h})}else this.containerNode.style.overflow="auto",this._layoutChildren()}else this._layoutChildren();m("touch")||t||this._position()}},_layoutChildren:function(){e.forEach(this.getChildren(),(function(t){t.resize&&t.resize()}))},destroy:function(){var t;for(this._fadeInDeferred&&this._fadeInDeferred.cancel(),this._fadeOutDeferred&&this._fadeOutDeferred.cancel(),this._moveable&&this._moveable.destroy();t=this._modalconnects.pop();)t.remove();A.hide(this),this.inherited(arguments)}});m("dojo-bidi")&&(T=o("dijit._DialogBase",T,{_setTitleAttr:function(t){this._set("title",t),this.titleNode.innerHTML=t,this.applyTextDir(this.titleNode)},_setTextDirAttr:function(t){this._created&&this.textDir!=t&&(this._set("textDir",t),this.set("title",this.title))}}));var P=o("dijit.Dialog",[C,T],{});P._DialogBase=T;var A=P._DialogLevelManager={_beginZIndex:950,show:function(t,e){k[k.length-1].focus=v.curNode;var i=k[k.length-1].dialog?k[k.length-1].zIndex+2:P._DialogLevelManager._beginZIndex;a.set(t.domNode,"zIndex",i),B.show(e,i-1),k.push({dialog:t,underlayAttrs:e,zIndex:i})},hide:function(t){if(k[k.length-1].dialog==t){k.pop();var i=k[k.length-1];if(1==k.length?B.hide():B.show(i.underlayAttrs,i.zIndex-1),t.refocus){var o=i.focus;if(!i.dialog||o&&n.isDescendant(o,i.dialog.domNode)||(i.dialog._getFocusItems(),o=i.dialog._firstFocusItem),o)try{o.focus()}catch(t){}}}else{var s=e.indexOf(e.map(k,(function(t){return t.dialog})),t);-1!=s&&k.splice(s,1)}},isTop:function(t){return k[k.length-1].dialog==t}},k=P._dialogStack=[{dialog:null,focus:null,underlayAttrs:null}];return v.watch("curNode",(function(t,e,i){var o=k[k.length-1].dialog;if(i&&o&&!o._fadeOutDeferred&&i.ownerDocument==o.ownerDocument){do{if(i==o.domNode||h.contains(i,"dijitPopup"))return}while(i=i.parentNode);o.focus()}})),m("dijit-legacy-requires")&&_(0,(function(){t(["dijit/TooltipDialog"])})),P}));