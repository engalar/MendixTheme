define(["./has"],(function(d){if(d("host-browser")){var e=navigator,a=e.userAgent,i=e.appVersion,o=parseFloat(i);if(d.add("air",a.indexOf("AdobeAIR")>=0),d.add("wp",parseFloat(a.split("Windows Phone")[1])||void 0),d.add("msapp",parseFloat(a.split("MSAppHost/")[1])||void 0),d.add("khtml",i.indexOf("Konqueror")>=0?o:void 0),d.add("edge",parseFloat(a.split("Edge/")[1])||void 0),d.add("opr",parseFloat(a.split("OPR/")[1])||void 0),d.add("webkit",!d("wp")&&!d("edge")&&parseFloat(a.split("WebKit/")[1])||void 0),d.add("chrome",!d("edge")&&!d("opr")&&parseFloat(a.split("Chrome/")[1])||void 0),d.add("android",!d("wp")&&parseFloat(a.split("Android ")[1])||void 0),d.add("safari",!(i.indexOf("Safari")>=0)||d("wp")||d("chrome")||d("android")||d("edge")||d("opr")?void 0:parseFloat(i.split("Version/")[1])),d.add("mac",i.indexOf("Macintosh")>=0),d.add("quirks","BackCompat"==document.compatMode),!d("wp")&&a.match(/(iPhone|iPod|iPad)/)){var p=RegExp.$1.replace(/P/,"p"),r=a.match(/OS ([\d_]+)/)?RegExp.$1:"1",t=parseFloat(r.replace(/_/,".").replace(/_/g,""));d.add(p,t),d.add("ios",t)}if(d.add("bb",(a.indexOf("BlackBerry")>=0||a.indexOf("BB10")>=0)&&parseFloat(a.split("Version/")[1])||void 0),d.add("trident",parseFloat(i.split("Trident/")[1])||void 0),d.add("svg","undefined"!=typeof SVGAngle),!d("webkit")){if(a.indexOf("Opera")>=0&&d.add("opera",o>=9.8&&parseFloat(a.split("Version/")[1])||o),!(a.indexOf("Gecko")>=0)||d("wp")||d("khtml")||d("trident")||d("edge")||d.add("mozilla",o),d("mozilla")&&d.add("ff",parseFloat(a.split("Firefox/")[1]||a.split("Minefield/")[1])||void 0),document.all&&!d("opera")){var s=parseFloat(i.split("MSIE ")[1])||void 0,l=document.documentMode;l&&5!=l&&Math.floor(s)!=l&&(s=l),d.add("ie",s)}d.add("wii","undefined"!=typeof opera&&opera.wiiremote)}}return d}));