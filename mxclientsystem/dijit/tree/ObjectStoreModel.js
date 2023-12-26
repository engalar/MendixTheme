define(["dojo/_base/array","dojo/aspect","dojo/_base/declare","dojo/Deferred","dojo/_base/lang","dojo/when","../Destroyable"],(function(e,t,n,r,o,i,h){return n("dijit.tree.ObjectStoreModel",h,{store:null,labelAttr:"name",labelType:"text",root:null,query:null,constructor:function(e){o.mixin(this,e),this.childrenCache={}},getRoot:function(e,t){if(this.root)e(this.root);else{var n=this.store.query(this.query);n.then&&this.own(n),i(n,o.hitch(this,(function(t){if(1!=t.length)throw new Error("dijit.tree.ObjectStoreModel: root query returned "+t.length+" items, but must return exactly one");this.root=t[0],e(this.root),n.observe&&n.observe(o.hitch(this,(function(e){this.onChange(e)})),!0)})),t)}},mayHaveChildren:function(){return!0},getChildren:function(e,t,n){var r=this.store.getIdentity(e);if(this.childrenCache[r])i(this.childrenCache[r],t,n);else{var h=this.childrenCache[r]=this.store.getChildren(e);h.then&&this.own(h),h.observe&&this.own(h.observe(o.hitch(this,(function(t,n,r){this.onChange(t),n!=r&&i(h,o.hitch(this,"onChildrenChange",e))})),!0)),i(h,t,n)}},isItem:function(){return!0},getIdentity:function(e){return this.store.getIdentity(e)},getLabel:function(e){return e[this.labelAttr]},newItem:function(e,t,n,r){return this.store.put(e,{parent:t,before:r})},pasteItem:function(t,n,i,h,s,l){var c=new r;return n!==i||h||l?(n&&!h?this.getChildren(n,o.hitch(this,(function(r){r=[].concat(r);var o=e.indexOf(r,t);r.splice(o,1),this.onChildrenChange(n,r),c.resolve(this.store.put(t,{overwrite:!0,parent:i,oldParent:n,before:l,isCopy:!1}))}))):c.resolve(this.store.put(t,{overwrite:!0,parent:i,oldParent:n,before:l,isCopy:!0})),c):(c.resolve(!0),c)},onChange:function(){},onChildrenChange:function(){},onDelete:function(){}})}));