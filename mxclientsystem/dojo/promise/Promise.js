define(["../_base/lang"],(function(n){"use strict";function t(){throw new TypeError("abstract")}return n.extend((function(){}),{then:function(n,e,i){t()},cancel:function(n,e){t()},isResolved:function(){t()},isRejected:function(){t()},isFulfilled:function(){t()},isCanceled:function(){t()},finally:function(n){return this.then((function(t){var e=n();return e&&"function"==typeof e.then?e.then((function(){return t})):t}),(function(t){var e=n();if(e&&"function"==typeof e.then)return e.then((function(){throw t}));throw t}))},always:function(n){return this.then(n,n)},catch:function(n){return this.then(null,n)},otherwise:function(n){return this.then(null,n)},trace:function(){return this},traceRejected:function(){return this},toString:function(){return"[object Promise]"}})}));