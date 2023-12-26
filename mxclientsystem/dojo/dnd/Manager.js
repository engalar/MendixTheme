define(["../_base/array","../_base/declare","../_base/lang","../_base/window","../dom-class","../Evented","../has","../keys","../on","../topic","../touch","./common","./autoscroll","./Avatar"],(function(t,a,o,e,s,n,i,r,h,c,u,d,p,l){var v=a("dojo.dnd.Manager",[n],{constructor:function(){this.avatar=null,this.source=null,this.nodes=[],this.copy=!0,this.target=null,this.canDropFlag=!1,this.events=[]},OFFSET_X:i("touch")?4:16,OFFSET_Y:i("touch")?4:16,overSource:function(t){this.avatar&&(this.target=t&&"Disabled"!=t.targetState?t:null,this.canDropFlag=Boolean(this.target),this.avatar.update()),c.publish("/dnd/source/over",t)},outSource:function(t){this.avatar?this.target==t&&(this.target=null,this.canDropFlag=!1,this.avatar.update(),c.publish("/dnd/source/over",null)):c.publish("/dnd/source/over",null)},startDrag:function(t,a,n){function i(t){t.preventDefault(),t.stopPropagation()}p.autoScrollStart(e.doc),this.source=t,this.nodes=a,this.copy=Boolean(n),this.avatar=this.makeAvatar(),e.body().appendChild(this.avatar.node),c.publish("/dnd/start",t,a,this.copy),this.events=[h(e.doc,u.move,o.hitch(this,"onMouseMove")),h(e.doc,u.release,o.hitch(this,"onMouseUp")),h(e.doc,"keydown",o.hitch(this,"onKeyDown")),h(e.doc,"keyup",o.hitch(this,"onKeyUp")),h(e.doc,"dragstart",i),h(e.body(),"selectstart",i)];var r="dojoDnd"+(n?"Copy":"Move");s.add(e.body(),r)},canDrop:function(t){var a=Boolean(this.target&&t);this.canDropFlag!=a&&(this.canDropFlag=a,this.avatar.update())},stopDrag:function(){s.remove(e.body(),["dojoDndCopy","dojoDndMove"]),t.forEach(this.events,(function(t){t.remove()})),this.events=[],this.avatar.destroy(),this.avatar=null,this.source=this.target=null,this.nodes=[]},makeAvatar:function(){return new l(this)},updateAvatar:function(){this.avatar.update()},onMouseMove:function(t){var a=this.avatar;if(a){p.autoScrollNodes(t);var o=a.node.style;o.left=t.pageX+this.OFFSET_X+"px",o.top=t.pageY+this.OFFSET_Y+"px";var e=Boolean(this.source.copyState(d.getCopyKeyState(t)));this.copy!=e&&this._setCopyStatus(e)}i("touch")&&t.preventDefault()},onMouseUp:function(t){if(this.avatar){if(this.target&&this.canDropFlag){var a=Boolean(this.source.copyState(d.getCopyKeyState(t)));c.publish("/dnd/drop/before",this.source,this.nodes,a,this.target,t),c.publish("/dnd/drop",this.source,this.nodes,a,this.target,t)}else c.publish("/dnd/cancel");this.stopDrag()}},onKeyDown:function(t){if(this.avatar)switch(t.keyCode){case r.CTRL:var a=Boolean(this.source.copyState(!0));this.copy!=a&&this._setCopyStatus(a);break;case r.ESCAPE:c.publish("/dnd/cancel"),this.stopDrag()}},onKeyUp:function(t){if(this.avatar&&t.keyCode==r.CTRL){var a=Boolean(this.source.copyState(!1));this.copy!=a&&this._setCopyStatus(a)}},_setCopyStatus:function(t){this.copy=t,this.source._markDndStatus(this.copy),this.updateAvatar(),s.replace(e.body(),"dojoDnd"+(this.copy?"Copy":"Move"),"dojoDnd"+(this.copy?"Move":"Copy"))}});return d._manager=null,v.manager=d.manager=function(){return d._manager||(d._manager=new v),d._manager},v}));