define(["dojo/_base/declare","./registry"],(function(i,t){return i("dijit._Contained",null,{_getSibling:function(i){var t=this.getParent();return t&&t._getSiblingOfChild&&t._getSiblingOfChild(this,"previous"==i?-1:1)||null},getPreviousSibling:function(){return this._getSibling("previous")},getNextSibling:function(){return this._getSibling("next")},getIndexInParent:function(){var i=this.getParent();return i&&i.getIndexOfChild?i.getIndexOfChild(this):-1}})}));