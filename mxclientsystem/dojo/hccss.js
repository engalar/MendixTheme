define(["require","./_base/config","./dom-class","./dom-style","./has","./domReady","./_base/window"],(function(e,o,r,t,d,n,i){return d.add("highcontrast",(function(){var r=i.doc.createElement("div");try{r.style.cssText='border: 1px solid; border-color:red green; position: absolute; height: 5px; top: -999px;background-image: url("'+(o.blankGif||e.toUrl("./resources/blank.gif"))+'");',i.body().appendChild(r);var n=t.getComputedStyle(r),a=n.backgroundImage;return n.borderTopColor==n.borderRightColor||a&&("none"==a||"url(invalid-url:)"==a)}catch(e){return console.warn("hccss: exception detecting high-contrast mode, document is likely hidden: "+e.toString()),!1}finally{d("ie")<=8?r.outerHTML="":i.body().removeChild(r)}})),n((function(){d("highcontrast")&&r.add(i.body(),"dj_a11y")})),d}));