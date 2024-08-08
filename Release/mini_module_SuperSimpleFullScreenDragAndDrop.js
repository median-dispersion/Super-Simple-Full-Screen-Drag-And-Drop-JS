// https://github.com/median-dispersion/Super-Simple-Full-Screen-Drag-And-Drop-JS
export default class SuperSimpleFullScreenDragAndDropJS extends EventTarget{text="Drag and Drop";icon="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512' fill='%23fff'%3E%3Cpath d='m80 32c-26.315 0-48 21.685-48 48v192c0 26.315 21.685 48 48 48h172.12l-110.06-110.06c-18.48-18.477-18.48-49.409 0-67.887 5.9579-5.9567 13.383-10.243 21.521-12.422 4.1269-1.1054 8.3314-1.6376 12.506-1.625 12.529 0.0378 24.786 4.9798 33.854 14.047a32.003 32.003 0 0 0 0 2e-3l110.06 110.06v-172.12c0-26.315-21.685-48-48-48zm97.395 128.06a16 16 0 0 0-5.5352 0.48437 16 16 0 0 0-7.1738 4.1406 16 16 0 0 0 0 22.629l140.11 140.11-12.111 12.111a16.002 16.002 0 0 0 7.1719 26.77l64.002 17.148a16.002 16.002 0 0 0 19.596-19.596l-17.148-64a16.002 16.002 0 0 0-16.053-11.848 16.002 16.002 0 0 0-3.543 0.53516 16.002 16.002 0 0 0-7.1738 4.1387l-12.111 12.111-140.11-140.11a16 16 0 0 0-9.9199-4.625zm174.61 31.939v32h48v-32zm80 0v32c9.1407 0 16 6.8593 16 16h32c0-26.315-21.685-48-48-48zm16 80v48h32v-48zm-256 80v48h32v-48zm256 0v48h32v-48zm-256 80c0 26.315 21.685 48 48 48v-32c-9.1407 0-16-6.8593-16-16zm256 0c0 9.1407-6.8593 16-16 16v32c26.315 0 48-21.685 48-48zm-176 16v32h48v-32zm80 0v32h48v-32z'/%3E%3C/svg%3E";type="text";zIndex=1e3;eventName="dropped";style={window:{padding:"50px"},background:{color:"rgba(0, 0, 0, 0.5)",blur:"50px"},border:{size:"5px",color:"rgba(255, 255, 255, 1)",style:"dashed",radius:"50px",padding:"50px"},icon:{size:"150px"},text:{family:"Arial, Helvetica, sans-serif",size:"30px",color:"rgba(255, 255, 255, 1)",weight:"normal",style:"normal"}};#suffix=this.#getRandomString(16);#timer=null;#element={window:null,info:null,input:null,style:null};#css(){return`<style id="ssfsdadjs-style-${this.#suffix}">#ssfsdadjs-${this.#suffix}{display:none;position:fixed;box-sizing:border-box;width:100%;height:100%;left:0;top:0;padding:${this.style.window.padding};background-color:${this.style.background.color};backdrop-filter:blur(${this.style.background.blur});opacity:0;z-index:${this.zIndex};} #ssfsdadjs-border-${this.#suffix}{box-sizing:border-box;width:100%;height:100%;transform:scale(0.9);padding:${this.style.border.padding};border:${this.style.border.size};border-color:${this.style.border.color};border-style:${this.style.border.style};border-radius:${this.style.border.radius};} #ssfsdadjs-info-${this.#suffix}{position:relative;top:50%;transform:translateY(-50%);} #ssfsdadjs-icon-${this.#suffix}{width:100%;height:${this.style.icon.size};background-image:url("${this.icon}");background-position:center;background-repeat:no-repeat;background-size:contain;} #ssfsdadjs-text-${this.#suffix}{width:100%;font-family:${this.style.text.family};font-size:${this.style.text.size};color:${this.style.text.color};font-weight:${this.style.text.weight};font-style:${this.style.text.style};text-align:center;} #ssfsdadjs-input-${this.#suffix}{all:unset;position:absolute;width:100%;height:100%;left:0;top:0;font-size:10px;opacity:0;} .ssfsdadjs-scale-${this.#suffix}{animation:ssfsdadjs-animation-scale-${this.#suffix} 0.1s ease forwards;} @keyframes ssfsdadjs-animation-scale-${this.#suffix}{0%{transform:scale(0.9);}100%{transform:scale(1.0);}} .ssfsdadjs-fade-in-${this.#suffix}{animation:ssfsdadjs-animation-fade-in-${this.#suffix} 0.1s ease forwards;} @keyframes ssfsdadjs-animation-fade-in-${this.#suffix}{0%{opacity:0;}100%{opacity:1;}} .ssfsdadjs-fade-out-${this.#suffix}{animation:ssfsdadjs-animation-fade-out-${this.#suffix} 0.1s ease forwards;} @keyframes ssfsdadjs-animation-fade-out-${this.#suffix} {0%{opacity:1;}100%{opacity:0;}}</style>`}#html(){return`<div id="ssfsdadjs-${this.#suffix}"><div id="ssfsdadjs-border-${this.#suffix}"><div id="ssfsdadjs-info-${this.#suffix}"><div id="ssfsdadjs-icon-${this.#suffix}"></div><div id="ssfsdadjs-text-${this.#suffix}">${this.text}</div></div></div><input type="text" id="ssfsdadjs-input-${this.#suffix}"></div>`}#getRandomString(length=8){const characterSet="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";let result="";for(let i=0;i<length;i++){result+=characterSet.charAt(Math.floor(Math.random()*characterSet.length))}return result}#show(){clearTimeout(this.#timer);this.#element.window.removeAttribute("class");this.#element.info.removeAttribute("class");this.#element.window.style.display="block";this.#element.window.setAttribute("class",`ssfsdadjs-fade-in-${this.#suffix}`);this.#element.info.setAttribute("class",`ssfsdadjs-scale-${this.#suffix}`)}#hide(){this.#element.window.setAttribute("class",`ssfsdadjs-fade-out-${this.#suffix}`);this.#timer=setTimeout(()=>{this.#element.window.style.display="none";this.#element.window.removeAttribute("class");this.#element.info.removeAttribute("class")},101)}#dispatchDropEvent(){const dropEvent=new CustomEvent(this.eventName,{detail:{value:this.#element.input.value}});this.dispatchEvent(dropEvent);this.#element.input.value="";this.#hide()}enable(){document.head.insertAdjacentHTML("beforeend",this.#css());document.body.insertAdjacentHTML("beforeend",this.#html());this.#element.window=document.getElementById(`ssfsdadjs-${this.#suffix}`);this.#element.info=document.getElementById(`ssfsdadjs-border-${this.#suffix}`);this.#element.input=document.getElementById(`ssfsdadjs-input-${this.#suffix}`);this.#element.style=document.getElementById(`ssfsdadjs-style-${this.#suffix}`);window.addEventListener("dragenter",()=>this.#show());this.#element.window.addEventListener("dragleave",()=>this.#hide());this.#element.input.addEventListener("input",()=>this.#dispatchDropEvent())}disable(){window.removeEventListener("dragenter",()=>this.#show());this.#element.window.removeEventListener("dragleave",()=>this.#hide());this.#element.input.removeEventListener("input",()=>this.#dispatchDropEvent());this.#element.window.remove();this.#element.style.remove()}}