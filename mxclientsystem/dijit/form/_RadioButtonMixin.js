define(["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/_base/lang","dojo/query!css2","../registry"],(function(e,t,i,o,n,c){return t("dijit.form._RadioButtonMixin",null,{type:"radio",_getRelatedWidgets:function(){var e=[];return n("input[type=radio]",this.focusNode.form||this.ownerDocument).forEach(o.hitch(this,(function(t){if(t.name==this.name&&t.form==this.focusNode.form){var i=c.getEnclosingWidget(t);i&&e.push(i)}}))),e},_setCheckedAttr:function(t){this.inherited(arguments),this._created&&t&&e.forEach(this._getRelatedWidgets(),o.hitch(this,(function(e){e!=this&&e.checked&&e.set("checked",!1)})))},_getSubmitValue:function(e){return null==e?"on":e},_onClick:function(t){if(this.checked||this.disabled)return t.stopPropagation(),t.preventDefault(),!1;if(this.readOnly)return t.stopPropagation(),t.preventDefault(),e.forEach(this._getRelatedWidgets(),o.hitch(this,(function(e){i.set(this.focusNode||this.domNode,"checked",e.checked)}))),!1;var n,c=!1;return e.some(this._getRelatedWidgets(),(function(e){return!!e.checked&&(n=e,!0)})),this.checked=!0,n&&(n.checked=!1),(!1===this.onClick(t)||t.defaultPrevented)&&(c=!0),this.checked=!1,n&&(n.checked=!0),c?t.preventDefault():this.set("checked",!0),!c}})}));