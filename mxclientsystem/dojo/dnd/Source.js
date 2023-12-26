define(["../_base/array","../_base/declare","../_base/kernel","../_base/lang","../dom-class","../dom-geometry","../mouse","../ready","../topic","./common","./Selector","./Manager"],(function(t,e,i,r,n,s,o,a,h,c,u,d){i.isAsync||a(0,(function(){require(["dojo/dnd/AutoSource","dojo/dnd/Target"])}));var g=e("dojo.dnd.Source",u,{isSource:!0,horizontal:!1,copyOnly:!1,selfCopy:!1,selfAccept:!0,skipForm:!1,withHandles:!1,autoSync:!1,delay:0,accept:["text"],generateText:!0,constructor:function(t,e){r.mixin(this,r.mixin({},e));var i=this.accept;if(i.length){this.accept={};for(var s=0;s<i.length;++s)this.accept[i[s]]=1}this.isDragging=!1,this.mouseDown=!1,this.targetAnchor=null,this.targetBox=null,this.before=!0,this._lastX=0,this._lastY=0,this.sourceState="",this.isSource&&n.add(this.node,"dojoDndSource"),this.targetState="",this.accept&&n.add(this.node,"dojoDndTarget"),this.horizontal&&n.add(this.node,"dojoDndHorizontal"),this.topics=[h.subscribe("/dnd/source/over",r.hitch(this,"onDndSourceOver")),h.subscribe("/dnd/start",r.hitch(this,"onDndStart")),h.subscribe("/dnd/drop",r.hitch(this,"onDndDrop")),h.subscribe("/dnd/cancel",r.hitch(this,"onDndCancel"))]},checkAcceptance:function(t,e){if(this==t)return!this.copyOnly||this.selfAccept;for(var i=0;i<e.length;++i){for(var r=t.getItem(e[i].id).type,n=!1,s=0;s<r.length;++s)if(r[s]in this.accept){n=!0;break}if(!n)return!1}return!0},copyState:function(t,e){return!!t||(arguments.length<2&&(e=this==d.manager().target),e?!!this.copyOnly&&this.selfCopy:this.copyOnly)},destroy:function(){g.superclass.destroy.call(this),t.forEach(this.topics,(function(t){t.remove()})),this.targetAnchor=null},onMouseMove:function(t){if(!this.isDragging||"Disabled"!=this.targetState){g.superclass.onMouseMove.call(this,t);var e=d.manager();if(!this.isDragging&&this.mouseDown&&this.isSource&&(Math.abs(t.pageX-this._lastX)>this.delay||Math.abs(t.pageY-this._lastY)>this.delay)){var i=this.getSelectedNodes();i.length&&e.startDrag(this,i,this.copyState(c.getCopyKeyState(t),!0))}if(this.isDragging){var r=!1;this.current&&(this.targetBox&&this.targetAnchor==this.current||(this.targetBox=s.position(this.current,!0)),r=this.horizontal?t.pageX-this.targetBox.x<this.targetBox.w/2==s.isBodyLtr(this.current.ownerDocument):t.pageY-this.targetBox.y<this.targetBox.h/2),this.current==this.targetAnchor&&r==this.before||(this._markTargetAnchor(r),e.canDrop(!this.current||e.source!=this||!(this.current.id in this.selection)))}}},onMouseDown:function(t){this.mouseDown||!this._legalMouseDown(t)||this.skipForm&&c.isFormElement(t)||(this.mouseDown=!0,this._lastX=t.pageX,this._lastY=t.pageY,g.superclass.onMouseDown.call(this,t))},onMouseUp:function(t){this.mouseDown&&(this.mouseDown=!1,g.superclass.onMouseUp.call(this,t))},onDndSourceOver:function(t){if(this!==t)this.mouseDown=!1,this.targetAnchor&&this._unmarkTargetAnchor();else if(this.isDragging){var e=d.manager();e.canDrop(!("Disabled"==this.targetState||this.current&&e.source==this&&this.current.id in this.selection))}},onDndStart:function(t,e,i){this.autoSync&&this.sync(),this.isSource&&this._changeState("Source",this==t?i?"Copied":"Moved":"");var r=this.accept&&this.checkAcceptance(t,e);this._changeState("Target",r?"":"Disabled"),this==t&&d.manager().overSource(this),this.isDragging=!0},onDndDrop:function(t,e,i,r){this==r&&this.onDrop(t,e,i),this.onDndCancel()},onDndCancel:function(){this.targetAnchor&&(this._unmarkTargetAnchor(),this.targetAnchor=null),this.before=!0,this.isDragging=!1,this.mouseDown=!1,this._changeState("Source",""),this._changeState("Target","")},onDrop:function(t,e,i){this!=t?this.onDropExternal(t,e,i):this.onDropInternal(e,i)},onDropExternal:function(t,e,i){var r=this._normalizedCreator;this.creator?this._normalizedCreator=function(e,i){return r.call(this,t.getItem(e.id).data,i)}:this._normalizedCreator=i?function(e){var i=t.getItem(e.id),r=e.cloneNode(!0);return r.id=c.getUniqueId(),{node:r,data:i.data,type:i.type}}:function(e){var i=t.getItem(e.id);return t.delItem(e.id),{node:e,data:i.data,type:i.type}},this.selectNone(),i||this.creator||t.selectNone(),this.insertNodes(!0,e,this.before,this.current),!i&&this.creator&&t.deleteSelectedNodes(),this._normalizedCreator=r},onDropInternal:function(t,e){var i=this._normalizedCreator;if(!this.current||!(this.current.id in this.selection)){if(e)this.creator?this._normalizedCreator=function(t,e){return i.call(this,this.getItem(t.id).data,e)}:this._normalizedCreator=function(t){var e=this.getItem(t.id),i=t.cloneNode(!0);return i.id=c.getUniqueId(),{node:i,data:e.data,type:e.type}};else{if(!this.current)return;this._normalizedCreator=function(t){var e=this.getItem(t.id);return{node:t,data:e.data,type:e.type}}}this._removeSelection(),this.insertNodes(!0,t,this.before,this.current),this._normalizedCreator=i}},onDraggingOver:function(){},onDraggingOut:function(){},onOverEvent:function(){g.superclass.onOverEvent.call(this),d.manager().overSource(this),this.isDragging&&"Disabled"!=this.targetState&&this.onDraggingOver()},onOutEvent:function(){g.superclass.onOutEvent.call(this),d.manager().outSource(this),this.isDragging&&"Disabled"!=this.targetState&&this.onDraggingOut()},_markTargetAnchor:function(t){this.current==this.targetAnchor&&this.before==t||(this.targetAnchor&&this._removeItemClass(this.targetAnchor,this.before?"Before":"After"),this.targetAnchor=this.current,this.targetBox=null,this.before=t,this.targetAnchor&&this._addItemClass(this.targetAnchor,this.before?"Before":"After"))},_unmarkTargetAnchor:function(){this.targetAnchor&&(this._removeItemClass(this.targetAnchor,this.before?"Before":"After"),this.targetAnchor=null,this.targetBox=null,this.before=!0)},_markDndStatus:function(t){this._changeState("Source",t?"Copied":"Moved")},_legalMouseDown:function(t){if("touchstart"!=t.type&&!o.isLeft(t))return!1;if(!this.withHandles)return!0;for(var e=t.target;e&&e!==this.node;e=e.parentNode){if(n.contains(e,"dojoDndHandle"))return!0;if(n.contains(e,"dojoDndItem")||n.contains(e,"dojoDndIgnore"))break}return!1}});return g}));