define(["./kernel","./lang","../on"],(function(n,d,o){var a=window,i={addOnWindowUnload:function(i,l){n.windowUnloaded||o(a,"unload",n.windowUnloaded=function(){}),o(a,"unload",d.hitch(i,l))},addOnUnload:function(n,i){o(a,"beforeunload",d.hitch(n,i))}};return n.addOnWindowUnload=i.addOnWindowUnload,n.addOnUnload=i.addOnUnload,i}));