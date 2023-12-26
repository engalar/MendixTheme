define(["dojo/_base/declare","dojo/keys","dojo/_base/lang","dojo/query","dojo/string","dojo/when","../registry"],(function(e,t,r,i,s,n,a){return e("dijit.form._SearchMixin",null,{pageSize:1/0,store:null,fetchProperties:{},query:{},list:"",_setListAttr:function(e){this._set("list",e)},searchDelay:200,searchAttr:"name",queryExpr:"${0}*",ignoreCase:!0,_patternToRegExp:function(e){return new RegExp("^"+e.replace(/(\\.)|(\*)|(\?)|\W/g,(function(e,t,r,i){return r?".*":i?".":t||"\\"+e}))+"$",this.ignoreCase?"mi":"m")},_abortQuery:function(){this.searchTimer&&(this.searchTimer=this.searchTimer.remove()),this._queryDeferHandle&&(this._queryDeferHandle=this._queryDeferHandle.remove()),this._fetchHandle&&(this._fetchHandle.abort&&(this._cancelingQuery=!0,this._fetchHandle.abort(),this._cancelingQuery=!1),this._fetchHandle.cancel&&(this._cancelingQuery=!0,this._fetchHandle.cancel(),this._cancelingQuery=!1),this._fetchHandle=null)},_processInput:function(e){if(!this.disabled&&!this.readOnly){var r=e.charOrCode;this._prev_key_backspace=!1,r!==t.DELETE&&r!==t.BACKSPACE||(this._prev_key_backspace=!0,this._maskValidSubsetError=!0),this.store?this.searchTimer=this.defer("_startSearchFromInput",1):this.onSearch()}},onSearch:function(){},_startSearchFromInput:function(){this._startSearch(this.focusNode.value)},_startSearch:function(e){this._abortQuery();var t,i=this,a=r.clone(this.query),o={start:0,count:this.pageSize,queryOptions:{ignoreCase:this.ignoreCase,deep:!0}},h=s.substitute(this.queryExpr,[e.replace(/([\\\*\?])/g,"\\$1")]),c=function(){var e=i._fetchHandle=i.store.query(a,o);i.disabled||i.readOnly||t!==i._lastQuery||n(e,(function(r){i._fetchHandle=null,i.disabled||i.readOnly||t!==i._lastQuery||n(e.total,(function(e){r.total=e;var t=i.pageSize;(isNaN(t)||t>r.total)&&(t=r.total),r.nextPage=function(e){o.direction=e=!1!==e,o.count=t,e?(o.start+=r.length,o.start>=r.total&&(o.count=0)):(o.start-=t,o.start<0&&(o.count=Math.max(t+o.start,0),o.start=0)),o.count<=0?(r.length=0,i.onSearch(r,a,o)):c()},i.onSearch(r,a,o)}))}),(function(e){i._fetchHandle=null,i._cancelingQuery||console.error(i.declaredClass+" "+e.toString())}))};r.mixin(o,this.fetchProperties),this.store._oldAPI?t=h:(t=this._patternToRegExp(h)).toString=function(){return h},this._lastQuery=a[this.searchAttr]=t,this._queryDeferHandle=this.defer(c,this.searchDelay)},constructor:function(){this.query={},this.fetchProperties={}},postMixInProperties:function(){if(!this.store){var e=this.list;e&&(this.store=a.byId(e))}this.inherited(arguments)}})}));