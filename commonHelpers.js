import"./assets/modulepreload-polyfill-3cfb730f.js";import{f as p,i as C}from"./assets/vendor-77e16229.js";/* empty css                      */const r=document.querySelector("#datetime-picker"),a=document.querySelector("button[data-start]"),s=document.querySelector("[data-days]"),d=document.querySelector("[data-hours]"),u=document.querySelector("[data-minutes]"),c=document.querySelector("[data-seconds]");let i=null,l=null;function b(t){const m=Math.floor(t/864e5),f=Math.floor(t%864e5/36e5),h=Math.floor(t%864e5%36e5/6e4),y=Math.floor(t%864e5%36e5%6e4/1e3);return{days:m,hours:f,minutes:h,seconds:y}}function n(t){return String(t).padStart(2,"0")}function D(){const o=i-new Date,e=b(o);s.textContent=n(e.days),d.textContent=n(e.hours),u.textContent=n(e.minutes),c.textContent=n(e.seconds),o<=0&&(s.textContent=n(0),d.textContent=n(0),u.textContent=n(0),c.textContent=n(0),clearInterval(l),r.disabled=!1)}document.addEventListener("DOMContentLoaded",()=>{p(r,{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(o){const e=o[0];e<=new Date?(C.error({title:"Error",message:"Please choose a date in the future",position:"topRight"}),a.disabled=!0):(i=e,a.disabled=!1)}}),a.disabled=!0,a.addEventListener("click",()=>{a.disabled=!0,r.disabled=!0,l=setInterval(D,1e3)})});
//# sourceMappingURL=commonHelpers.js.map