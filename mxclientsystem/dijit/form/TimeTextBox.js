define(["dojo/_base/declare","dojo/keys","dojo/query","dojo/_base/lang","../_TimePicker","./_DateTimeTextBox"],(function(e,t,o,i,n,s){var r=e("dijit.form.TimeTextBox",s,{baseClass:"dijitTextBox dijitComboBox dijitTimeTextBox",popupClass:n,_selector:"time",value:new Date(""),maxHeight:-1,openDropDown:function(e){this.inherited(arguments);var t=o(".dijitTimePickerItemSelected",this.dropDown.domNode),n=this.dropDown.domNode.parentNode;t[0]?n.scrollTop=t[0].offsetTop-(n.clientHeight-t[0].clientHeight)/2:n.scrollTop=(n.scrollHeight-n.clientHeight)/2,this.dropDown.on("input",i.hitch(this,(function(){this.set("value",this.dropDown.get("value"),!1)})))},_onInput:function(){this.inherited(arguments);var e=this.get("displayedValue");this.filterString=e&&!this.parse(e,this.constraints)?e.toLowerCase():"",this._opened&&this.closeDropDown(),this.openDropDown()}});return r}));