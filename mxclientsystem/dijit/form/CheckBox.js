define(["require","dojo/_base/declare","dojo/dom-attr","dojo/has","dojo/query","dojo/ready","./ToggleButton","./_CheckBoxMixin","dojo/text!./templates/CheckBox.html","dojo/NodeList-dom","../a11yclick"],(function(t,e,i,o,s,d,n,r,c){return o("dijit-legacy-requires")&&d(0,(function(){t(["dijit/form/RadioButton"])})),e("dijit.form.CheckBox",[n,r],{templateString:c,baseClass:"dijitCheckBox",_setValueAttr:function(t,e){"string"==typeof t&&(this.inherited(arguments),t=!0),this._created&&this.set("checked",t,e)},_getValueAttr:function(){return this.checked&&this._get("value")},_setIconClassAttr:null,_setNameAttr:"focusNode",postMixInProperties:function(){this.inherited(arguments),this.checkedAttrSetting=""},_fillContent:function(){},_onFocus:function(){this.id&&s("label[for='"+this.id+"']").addClass("dijitFocusedLabel"),this.inherited(arguments)},_onBlur:function(){this.id&&s("label[for='"+this.id+"']").removeClass("dijitFocusedLabel"),this.inherited(arguments)}})}));