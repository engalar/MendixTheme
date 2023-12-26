define(["./has","./_base/lang"],(function(e,a){var t={getDaysInMonth:function(e){var a=e.getMonth();return 1==a&&t.isLeapYear(e)?29:[31,28,31,30,31,30,31,31,30,31,30,31][a]},isLeapYear:function(e){var a=e.getFullYear();return!(a%400&&(a%4||!(a%100)))},getTimezoneName:function(e){var a,t=e.toString(),r="",n=t.indexOf("(");if(n>-1)r=t.substring(++n,t.indexOf(")"));else{var s=/([A-Z\/]+) \d{4}$/;(a=t.match(s))?r=a[1]:(s=/ ([A-Z\/]+)$/,(a=(t=e.toLocaleString()).match(s))&&(r=a[1]))}return"AM"==r||"PM"==r?"":r},compare:function(e,a,t){return e=new Date(+e),a=new Date(+(a||new Date)),"date"==t?(e.setHours(0,0,0,0),a.setHours(0,0,0,0)):"time"==t&&(e.setFullYear(0,0,0),a.setFullYear(0,0,0)),e>a?1:e<a?-1:0},add:function(e,a,t){var r=new Date(+e),n=!1,s="Date";switch(a){case"day":break;case"weekday":var c,i,o=t%5;o?(c=o,i=parseInt(t/5)):(c=t>0?5:-5,i=t>0?(t-5)/5:(t+5)/5);var u=e.getDay(),d=0;6==u&&t>0?d=1:0==u&&t<0&&(d=-1);var g=u+c;0!=g&&6!=g||(d=t>0?2:-2),t=7*i+c+d;break;case"year":s="FullYear",n=!0;break;case"week":t*=7;break;case"quarter":t*=3;case"month":n=!0,s="Month";break;default:s="UTC"+a.charAt(0).toUpperCase()+a.substring(1)+"s"}return s&&r["set"+s](r["get"+s]()+t),n&&r.getDate()<e.getDate()&&r.setDate(0),r},difference:function(e,a,r){r=r||"day";var n=(a=a||new Date).getFullYear()-e.getFullYear(),s=1;switch(r){case"quarter":var c=e.getMonth(),i=a.getMonth(),o=Math.floor(c/3)+1,u=Math.floor(i/3)+1;s=(u+=4*n)-o;break;case"weekday":var d=Math.round(t.difference(e,a,"day")),g=parseInt(t.difference(e,a,"week")),f=d%7;if(0==f)d=5*g;else{var h=0,k=e.getDay(),l=a.getDay();g=parseInt(d/7),f=d%7;var b=new Date(e);b.setDate(b.getDate()+7*g);var D=b.getDay();if(d>0)switch(!0){case 6==k:h=-1;break;case 0==k:h=0;break;case 6==l:h=-1;break;case 0==l:case D+f>5:h=-2}else if(d<0)switch(!0){case 6==k:h=0;break;case 0==k:h=1;break;case 6==l:h=2;break;case 0==l:h=1;break;case D+f<0:h=2}d+=h,d-=2*g}s=d;break;case"year":s=n;break;case"month":s=a.getMonth()-e.getMonth()+12*n;break;case"week":s=parseInt(t.difference(e,a,"day")/7);break;case"day":s/=24;case"hour":s/=60;case"minute":s/=60;case"second":s/=1e3;case"millisecond":s*=a.getTime()-e.getTime()}return Math.round(s)}};return e("extend-dojo")&&a.mixin(a.getObject("dojo.date",!0),t),t}));