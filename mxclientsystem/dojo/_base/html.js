define(["./kernel","../dom","../dom-style","../dom-attr","../dom-prop","../dom-class","../dom-construct","../dom-geometry"],(function(e,t,o,n,r,s,g,i){return e.byId=t.byId,e.isDescendant=t.isDescendant,e.setSelectable=t.setSelectable,e.getAttr=n.get,e.setAttr=n.set,e.hasAttr=n.has,e.removeAttr=n.remove,e.getNodeProp=n.getNodeProp,e.attr=function(e,t,o){return 2==arguments.length?n["string"==typeof t?"get":"set"](e,t):n.set(e,t,o)},e.hasClass=s.contains,e.addClass=s.add,e.removeClass=s.remove,e.toggleClass=s.toggle,e.replaceClass=s.replace,e._toDom=e.toDom=g.toDom,e.place=g.place,e.create=g.create,e.empty=function(e){g.empty(e)},e._destroyElement=e.destroy=function(e){g.destroy(e)},e._getPadExtents=e.getPadExtents=i.getPadExtents,e._getBorderExtents=e.getBorderExtents=i.getBorderExtents,e._getPadBorderExtents=e.getPadBorderExtents=i.getPadBorderExtents,e._getMarginExtents=e.getMarginExtents=i.getMarginExtents,e._getMarginSize=e.getMarginSize=i.getMarginSize,e._getMarginBox=e.getMarginBox=i.getMarginBox,e.setMarginBox=i.setMarginBox,e._getContentBox=e.getContentBox=i.getContentBox,e.setContentSize=i.setContentSize,e._isBodyLtr=e.isBodyLtr=i.isBodyLtr,e._docScroll=e.docScroll=i.docScroll,e._getIeDocumentElementOffset=e.getIeDocumentElementOffset=i.getIeDocumentElementOffset,e._fixIeBiDiScrollLeft=e.fixIeBiDiScrollLeft=i.fixIeBiDiScrollLeft,e.position=i.position,e.marginBox=function(e,t){return t?i.setMarginBox(e,t):i.getMarginBox(e)},e.contentBox=function(e,t){return t?i.setContentSize(e,t):i.getContentBox(e)},e.coords=function(n,r){e.deprecated("dojo.coords()","Use dojo.position() or dojo.marginBox()."),n=t.byId(n);var s=o.getComputedStyle(n),g=i.getMarginBox(n,s),a=i.position(n,r);return g.x=a.x,g.y=a.y,g},e.getProp=r.get,e.setProp=r.set,e.prop=function(e,t,o){return 2==arguments.length?r["string"==typeof t?"get":"set"](e,t):r.set(e,t,o)},e.getStyle=o.get,e.setStyle=o.set,e.getComputedStyle=o.getComputedStyle,e.__toPixelValue=e.toPixelValue=o.toPixelValue,e.style=function(e,t,n){switch(arguments.length){case 1:return o.get(e);case 2:return o["string"==typeof t?"get":"set"](e,t)}return o.set(e,t,n)},e}));