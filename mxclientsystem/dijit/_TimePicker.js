define(["dojo/_base/array","dojo/date","dojo/date/locale","dojo/date/stamp","dojo/_base/declare","dojo/dom-class","dojo/dom-construct","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/sniff","dojo/query","dojo/mouse","dojo/on","./_WidgetBase","./form/_ListMouseMixin"],(function(e,t,i,s,n,o,a,r,h,l,c,d,_,g,u,m){var p=n("dijit._TimePicker",[u,m],{baseClass:"dijitTimePicker",pickerMin:"T00:00:00",pickerMax:"T23:59:59",clickableIncrement:"T00:15:00",visibleIncrement:"T01:00:00",value:new Date,_visibleIncrement:2,_clickableIncrement:1,_totalIncrements:10,constraints:{},serialize:s.toISOString,buildRendering:function(){this.inherited(arguments),this.containerNode=this.domNode,this.timeMenu=this.domNode},setValue:function(e){r.deprecated("dijit._TimePicker:setValue() is deprecated.  Use set('value', ...) instead.","","2.0"),this.set("value",e)},_setValueAttr:function(e){this._set("value",e),this._showText()},_setFilterStringAttr:function(e){this._set("filterString",e),this._showText()},isDisabledDate:function(){return!1},_getFilteredNodes:function(e,t,i,s){for(var n=this.ownerDocument.createDocumentFragment(),o=0;o<this._maxIncrement;o++){var a=this._createOption(o);a&&n.appendChild(a)}return n},_showText:function(){var e=s.fromISOString;this.domNode.innerHTML="",this._clickableIncrementDate=e(this.clickableIncrement),this._visibleIncrementDate=e(this.visibleIncrement);var t=function(e){return 60*e.getHours()*60+60*e.getMinutes()+e.getSeconds()},i=t(this._clickableIncrementDate),n=t(this._visibleIncrementDate);(this.value||this.currentFocus).getTime(),this._refDate=e(this.pickerMin),this._refDate.setFullYear(1970,0,1),this._clickableIncrement=1,this._visibleIncrement=n/i;var o=e(this.pickerMax);o.setFullYear(1970,0,1);var a=.001*(o.getTime()-this._refDate.getTime());this._maxIncrement=Math.ceil((a+1)/i);var r=this._getFilteredNodes();!r.firstChild&&this.filterString?(this.filterString="",this._showText()):this.domNode.appendChild(r)},constructor:function(){this.constraints={}},postMixInProperties:function(){this.inherited(arguments),this._setConstraintsAttr(this.constraints)},_setConstraintsAttr:function(e){for(var t in{clickableIncrement:1,visibleIncrement:1,pickerMin:1,pickerMax:1})t in e&&(this[t]=e[t]);e.locale||(e.locale=this.lang)},_createOption:function(e){var s=new Date(this._refDate),n=this._clickableIncrementDate;s.setHours(s.getHours()+n.getHours()*e,s.getMinutes()+n.getMinutes()*e,s.getSeconds()+n.getSeconds()*e),"time"==this.constraints.selector&&s.setFullYear(1970,0,1);var o=i.format(s,this.constraints);if(this.filterString&&0!==o.toLowerCase().indexOf(this.filterString))return null;var r=this.ownerDocument.createElement("div");r.className=this.baseClass+"Item",r.date=s,r.idx=e,a.create("div",{class:this.baseClass+"ItemInner",innerHTML:o},r);var h=e%this._visibleIncrement<1&&e%this._visibleIncrement>-1,l=!(h||e%this._clickableIncrement);return h?r.className+=" "+this.baseClass+"Marker":l&&(r.className+=" "+this.baseClass+"Tick"),this.isDisabledDate(s)&&(r.className+=" "+this.baseClass+"ItemDisabled"),this.value&&!t.compare(this.value,s,this.constraints.selector)&&(r.selected=!0,r.className+=" "+this.baseClass+"ItemSelected",this._selectedDiv=r,h?r.className+=" "+this.baseClass+"MarkerSelected":l&&(r.className+=" "+this.baseClass+"TickSelected"),this._highlightOption(r,!0)),r},onOpen:function(){this.inherited(arguments),this.set("selected",this._selectedDiv)},_onOptionSelected:function(e,t){var i=e.target.date||e.target.parentNode.date;i&&!this.isDisabledDate(i)&&(this._set("value",i),this.emit("input"),t&&(this._highlighted_option=null,this.set("value",i),this.onChange(i)))},onChange:function(){},_highlightOption:function(e,t){if(e){if(t)this._highlighted_option&&this._highlightOption(this._highlighted_option,!1),this._highlighted_option=e;else{if(this._highlighted_option!==e)return;this._highlighted_option=null}o.toggle(e,this.baseClass+"ItemHover",t),o.contains(e,this.baseClass+"Marker")?o.toggle(e,this.baseClass+"MarkerHover",t):o.toggle(e,this.baseClass+"TickHover",t)}},handleKey:function(e){return e.keyCode==h.DOWN_ARROW?(this.selectNextNode(),this._onOptionSelected({target:this._highlighted_option},!1),e.stopPropagation(),e.preventDefault(),!1):e.keyCode==h.UP_ARROW?(this.selectPreviousNode(),this._onOptionSelected({target:this._highlighted_option},!1),e.stopPropagation(),e.preventDefault(),!1):e.keyCode==h.ENTER||e.keyCode===h.TAB?!this._keyboardSelected&&e.keyCode===h.TAB||(this._highlighted_option&&this._onOptionSelected({target:this._highlighted_option},!0),e.keyCode===h.TAB):void 0},onHover:function(e){this._highlightOption(e,!0)},onUnhover:function(e){this._highlightOption(e,!1)},onSelect:function(e){this._highlightOption(e,!0)},onDeselect:function(e){this._highlightOption(e,!1)},onClick:function(e){this._onOptionSelected({target:e},!0)}});return p}));