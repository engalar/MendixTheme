define(["dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","dojo/query","../registry","../popup","./Button","../_Container","../_HasDropDown","dojo/text!./templates/DropDownButton.html","../a11yclick"],(function(t,o,e,n,i,r,s,d,a,h){return t("dijit.form.DropDownButton",[s,d,a],{baseClass:"dijitDropDownButton",templateString:h,_fillContent:function(){var t=this.srcNodeRef,e=this.containerNode;if(t&&e)for(;t.hasChildNodes();){var n=t.firstChild;n.hasAttribute&&(n.hasAttribute("data-dojo-type")||n.hasAttribute("dojoType")||n.hasAttribute("data-"+o._scopeName+"-type")||n.hasAttribute(o._scopeName+"Type"))?(this.dropDownContainer=this.ownerDocument.createElement("div"),this.dropDownContainer.appendChild(n)):e.appendChild(n)}},startup:function(){this._started||(!this.dropDown&&this.dropDownContainer&&(this.dropDown=i.byNode(this.dropDownContainer.firstChild),delete this.dropDownContainer),this.dropDown&&r.hide(this.dropDown),this.inherited(arguments))},isLoaded:function(){var t=this.dropDown;return!!t&&(!t.href||t.isLoaded)},loadDropDown:function(t){var o=this.dropDown,n=o.on("load",e.hitch(this,(function(){n.remove(),t()})));o.refresh()},isFocusable:function(){return this.inherited(arguments)&&!this._mouseDown}})}));