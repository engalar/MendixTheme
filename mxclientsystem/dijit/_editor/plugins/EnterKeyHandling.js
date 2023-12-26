define(["dojo/_base/declare","dojo/dom-construct","dojo/keys","dojo/_base/lang","dojo/on","dojo/sniff","dojo/_base/window","dojo/window","../_Plugin","../RichText","../range"],(function(e,t,o,n,i,r,s,d,a,l,c){return e("dijit._editor.plugins.EnterKeyHandling",a,{blockNodeForEnter:"BR",constructor:function(e){e&&("blockNodeForEnter"in e&&(e.blockNodeForEnter=e.blockNodeForEnter.toUpperCase()),n.mixin(this,e))},setEditor:function(e){if(this.editor!==e)if(this.editor=e,"BR"==this.blockNodeForEnter)this.editor.customUndo=!0,e.onLoadDeferred.then(n.hitch(this,(function(t){return this.own(i(e.document,"keydown",n.hitch(this,(function(e){if(e.keyCode==o.ENTER){var t=n.mixin({},e);t.shiftKey=!0,this.handleEnterKey(t)||(e.stopPropagation(),e.preventDefault())}})))),r("ie")>=9&&r("ie")<=10&&this.own(i(e.document,"paste",n.hitch(this,(function(e){setTimeout(n.hitch(this,(function(){var e=this.editor.document.selection.createRange();e.move("character",-1),e.select(),e.move("character",1),e.select()})),0)})))),t})));else if(this.blockNodeForEnter){var t=n.hitch(this,"handleEnterKey");e.addKeyHandler(13,0,0,t),e.addKeyHandler(13,0,1,t),this.own(this.editor.on("KeyPressed",n.hitch(this,"onKeyPressed")))}},onKeyPressed:function(){if(this._checkListLater){if(this.editor.selection.isCollapsed()){var e=this.editor.selection.getAncestorElement("LI");if(e){r("mozilla")&&"LI"==e.parentNode.parentNode.nodeName&&(e=e.parentNode.parentNode);var t=e.firstChild;if(t&&1==t.nodeType&&("UL"==t.nodeName||"OL"==t.nodeName)){e.insertBefore(t.ownerDocument.createTextNode(" "),t);var o=c.create(this.editor.window);o.setStart(e.firstChild,0);var n=c.getSelection(this.editor.window,!0);n.removeAllRanges(),n.addRange(o)}}else{l.prototype.execCommand.call(this.editor,"formatblock",this.blockNodeForEnter);var i=this.editor.selection.getAncestorElement(this.blockNodeForEnter);if(i){if(i.innerHTML=this.bogusHtmlContent,r("ie")<=9){var s=this.editor.document.selection.createRange();s.move("character",-1),s.select()}}else console.error("onKeyPressed: Cannot find the new block node")}}this._checkListLater=!1}this._pressedEnterInBlock&&(this._pressedEnterInBlock.previousSibling&&this.removeTrailingBr(this._pressedEnterInBlock.previousSibling),delete this._pressedEnterInBlock)},bogusHtmlContent:"&#160;",blockNodes:/^(?:P|H1|H2|H3|H4|H5|H6|LI)$/,handleEnterKey:function(e){var o,n,i,s,a,h,f,g=this.editor.document;if(e.shiftKey){var b=this.editor.selection.getParentElement(),N=c.getAncestor(b,this.blockNodes);if(N){if("LI"==N.tagName)return!0;if((n=(o=c.getSelection(this.editor.window)).getRangeAt(0)).collapsed||(n.deleteContents(),n=(o=c.getSelection(this.editor.window)).getRangeAt(0)),c.atBeginningOfContainer(N,n.startContainer,n.startOffset))a=g.createElement("br"),i=c.create(this.editor.window),N.insertBefore(a,N.firstChild),i.setStartAfter(a),o.removeAllRanges(),o.addRange(i);else{if(!c.atEndOfContainer(N,n.startContainer,n.startOffset))return!(h=n.startContainer)||3!=h.nodeType||(f=h.nodeValue,s=g.createTextNode(f.substring(0,n.startOffset)),u=g.createTextNode(f.substring(n.startOffset)),k=g.createElement("br"),""==u.nodeValue&&r("webkit")&&(u=g.createTextNode(" ")),t.place(s,h,"after"),t.place(k,s,"after"),t.place(u,k,"after"),t.destroy(h),(i=c.create(this.editor.window)).setStart(u,0),o.removeAllRanges(),o.addRange(i),!1);i=c.create(this.editor.window),a=g.createElement("br"),N.appendChild(a),N.appendChild(g.createTextNode(" ")),i.setStart(N.lastChild,0),o.removeAllRanges(),o.addRange(i)}}else if((o=c.getSelection(this.editor.window)).rangeCount){if((n=o.getRangeAt(0))&&n.startContainer)if(n.collapsed||(n.deleteContents(),n=(o=c.getSelection(this.editor.window)).getRangeAt(0)),(h=n.startContainer)&&3==h.nodeType){var p=n.startOffset;h.length<p&&(h=(R=this._adjustNodeAndOffset(h,p)).node,p=R.offset),f=h.nodeValue,s=g.createTextNode(f.substring(0,p)),u=g.createTextNode(f.substring(p)),k=g.createElement("br"),u.length||(u=g.createTextNode(" ")),s.length?t.place(s,h,"after"):s=h,t.place(k,s,"after"),t.place(u,k,"after"),t.destroy(h),(i=c.create(this.editor.window)).setStart(u,0),i.setEnd(u,u.length),o.removeAllRanges(),o.addRange(i),this.editor.selection.collapse(!0)}else{var m;n.startOffset>=0&&(m=h.childNodes[n.startOffset]);var k=g.createElement("br"),u=g.createTextNode(" ");m?(t.place(k,m,"before"),t.place(u,k,"after")):(h.appendChild(k),h.appendChild(u)),(i=c.create(this.editor.window)).setStart(u,0),i.setEnd(u,u.length),o.removeAllRanges(),o.addRange(i),this.editor.selection.collapse(!0)}}else l.prototype.execCommand.call(this.editor,"inserthtml","<br>");return!1}var w=!0;(n=(o=c.getSelection(this.editor.window)).getRangeAt(0)).collapsed||(n.deleteContents(),n=(o=c.getSelection(this.editor.window)).getRangeAt(0));var C=c.getBlockAncestor(n.endContainer,null,this.editor.editNode),v=C.blockNode;if(this._checkListLater=v&&("LI"==v.nodeName||"LI"==v.parentNode.nodeName))return r("mozilla")&&(this._pressedEnterInBlock=v),/^(\s|&nbsp;|&#160;|\xA0|<span\b[^>]*\bclass=['"]Apple-style-span['"][^>]*>(\s|&nbsp;|&#160;|\xA0)<\/span>)?(<br>)?$/.test(v.innerHTML)&&(v.innerHTML="",r("webkit")&&((i=c.create(this.editor.window)).setStart(v,0),o.removeAllRanges(),o.addRange(i)),this._checkListLater=!1),!0;if(!C.blockNode||C.blockNode===this.editor.editNode){try{l.prototype.execCommand.call(this.editor,"formatblock",this.blockNodeForEnter)}catch(e){}if((C={blockNode:this.editor.selection.getAncestorElement(this.blockNodeForEnter),blockContainer:this.editor.editNode}).blockNode){if(C.blockNode!=this.editor.editNode&&!(C.blockNode.textContent||C.blockNode.innerHTML).replace(/^\s+|\s+$/g,"").length)return this.removeTrailingBr(C.blockNode),!1}else C.blockNode=this.editor.editNode;n=(o=c.getSelection(this.editor.window)).getRangeAt(0)}var y=g.createElement(this.blockNodeForEnter);y.innerHTML=this.bogusHtmlContent,this.removeTrailingBr(C.blockNode);var E=n.endOffset,T=n.endContainer;if(T.length<E){var R=this._adjustNodeAndOffset(T,E);T=R.node,E=R.offset}if(c.atEndOfContainer(C.blockNode,T,E))C.blockNode===C.blockContainer?C.blockNode.appendChild(y):t.place(y,C.blockNode,"after"),w=!1,(i=c.create(this.editor.window)).setStart(y,0),o.removeAllRanges(),o.addRange(i),this.editor.height&&d.scrollIntoView(y);else if(c.atBeginningOfContainer(C.blockNode,n.startContainer,n.startOffset))t.place(y,C.blockNode,C.blockNode===C.blockContainer?"first":"before"),y.nextSibling&&this.editor.height&&((i=c.create(this.editor.window)).setStart(y.nextSibling,0),o.removeAllRanges(),o.addRange(i),d.scrollIntoView(y.nextSibling)),w=!1;else{var x,A;if(C.blockNode===C.blockContainer?C.blockNode.appendChild(y):t.place(y,C.blockNode,"after"),w=!1,C.blockNode.style&&y.style&&C.blockNode.style.cssText&&(y.style.cssText=C.blockNode.style.cssText),(h=n.startContainer)&&3==h.nodeType){var S,L;E=n.endOffset,h.length<E&&(h=(R=this._adjustNodeAndOffset(h,E)).node,E=R.offset),f=h.nodeValue,s=g.createTextNode(f.substring(0,E)),u=g.createTextNode(f.substring(E,f.length)),t.place(s,h,"before"),t.place(u,h,"after"),t.destroy(h);for(var I=s.parentNode;I!==C.blockNode;){var O=I.tagName,B=g.createElement(O);for(I.style&&B.style&&I.style.cssText&&(B.style.cssText=I.style.cssText),"FONT"===I.tagName&&(I.color&&(B.color=I.color),I.face&&(B.face=I.face),I.size&&(B.size=I.size)),S=u;S;)L=S.nextSibling,B.appendChild(S),S=L;t.place(B,I,"after"),s=I,u=B,I=I.parentNode}for((1==(S=u).nodeType||3==S.nodeType&&S.nodeValue)&&(y.innerHTML=""),x=S;S;)L=S.nextSibling,y.appendChild(S),S=L}i=c.create(this.editor.window);var H=x;if("BR"!==this.blockNodeForEnter){for(;H;)A=H,H=L=H.firstChild;A&&A.parentNode?(y=A.parentNode,i.setStart(y,0),o.removeAllRanges(),o.addRange(i),this.editor.height&&d.scrollIntoView(y),r("mozilla")&&(this._pressedEnterInBlock=C.blockNode)):w=!0}else i.setStart(y,0),o.removeAllRanges(),o.addRange(i),this.editor.height&&d.scrollIntoView(y),r("mozilla")&&(this._pressedEnterInBlock=C.blockNode)}return w},_adjustNodeAndOffset:function(e,t){for(;e.length<t&&e.nextSibling&&3==e.nextSibling.nodeType;)t-=e.length,e=e.nextSibling;return{node:e,offset:t}},removeTrailingBr:function(e){var o=/P|DIV|LI/i.test(e.tagName)?e:this.editor.selection.getParentOfType(e,["P","DIV","LI"]);o&&(o.lastChild&&(o.childNodes.length>1&&3==o.lastChild.nodeType&&/^[\s\xAD]*$/.test(o.lastChild.nodeValue)||"BR"==o.lastChild.tagName)&&t.destroy(o.lastChild),o.childNodes.length||(o.innerHTML=this.bogusHtmlContent))}})}));