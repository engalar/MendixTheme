define(["dojo/_base/array","dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","./TreeStoreModel"],(function(t,o,e,i,n){return o("dijit.tree.ForestStoreModel",n,{rootId:"$root$",rootLabel:"ROOT",query:null,constructor:function(t){this.root={store:this,root:!0,id:t.rootId,label:t.rootLabel,children:t.rootChildren}},mayHaveChildren:function(t){return t===this.root||this.inherited(arguments)},getChildren:function(t,o,e){t===this.root?this.root.children?o(this.root.children):this.store.fetch({query:this.query,onComplete:i.hitch(this,(function(t){this.root.children=t,o(t)})),onError:e}):this.inherited(arguments)},isItem:function(t){return t===this.root||this.inherited(arguments)},fetchItemByIdentity:function(t){if(t.identity==this.root.id){var o=t.scope||e.global;t.onItem&&t.onItem.call(o,this.root)}else this.inherited(arguments)},getIdentity:function(t){return t===this.root?this.root.id:this.inherited(arguments)},getLabel:function(t){return t===this.root?this.root.label:this.inherited(arguments)},newItem:function(t,o,e){return o===this.root?(this.onNewRootItem(t),this.store.newItem(t)):this.inherited(arguments)},onNewRootItem:function(){},pasteItem:function(t,o,e,i,n){o===this.root&&(i||this.onLeaveRoot(t)),this.inherited(arguments,[t,o===this.root?null:o,e===this.root?null:e,i,n]),e===this.root&&this.onAddToRoot(t)},onAddToRoot:function(t){console.log(this,": item ",t," added to root")},onLeaveRoot:function(t){console.log(this,": item ",t," removed from root")},_requeryTop:function(){var o=this.root.children||[];this.store.fetch({query:this.query,onComplete:i.hitch(this,(function(e){this.root.children=e,(o.length!=e.length||t.some(o,(function(t,o){return e[o]!=t})))&&this.onChildrenChange(this.root,e)}))})},onNewItem:function(t,o){this._requeryTop(),this.inherited(arguments)},onDeleteItem:function(o){-1!=t.indexOf(this.root.children,o)&&this._requeryTop(),this.inherited(arguments)},onSetItem:function(t,o,e,i){this._requeryTop(),this.inherited(arguments)}})}));