require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var s=e[n]=new t.Module(n);r[n][0].call(s.exports,i,s,s.exports)}return e[n].exports}function o(r){this.id=r,this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.isParcelRequire=!0,t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({13:[function(require,module,exports) {
"use strict";function t(t){if(this.size=0|t,this.size<=1||0!=(this.size&this.size-1))throw new Error("FFT size must be a power of two and bigger than 1");this._csize=t<<1;for(var r=new Array(2*this.size),i=0;i<r.length;i+=2){const t=Math.PI*i/this.size;r[i]=Math.cos(t),r[i+1]=-Math.sin(t)}this.table=r;for(var s=0,o=1;this.size>o;o<<=1)s++;this._width=s%2==0?s-1:s,this._bitrev=new Array(1<<this._width);for(var n=0;n<this._bitrev.length;n++){this._bitrev[n]=0;for(var e=0;e<this._width;e+=2){var h=this._width-e-2;this._bitrev[n]|=(n>>>e&3)<<h}}this._out=null,this._data=null,this._inv=0}module.exports=t,t.prototype.fromComplexArray=function(t,r){for(var i=r||new Array(t.length>>>1),s=0;s<t.length;s+=2)i[s>>>1]=t[s];return i},t.prototype.createComplexArray=function(){const t=new Array(this._csize);for(var r=0;r<t.length;r++)t[r]=0;return t},t.prototype.toComplexArray=function(t,r){for(var i=r||this.createComplexArray(),s=0;s<i.length;s+=2)i[s]=t[s>>>1],i[s+1]=0;return i},t.prototype.completeSpectrum=function(t){for(var r=this._csize,i=r>>>1,s=2;s<i;s+=2)t[r-s]=t[s],t[r-s+1]=-t[s+1]},t.prototype.transform=function(t,r){if(t===r)throw new Error("Input and output buffers must be different");this._out=t,this._data=r,this._inv=0,this._transform4(),this._out=null,this._data=null},t.prototype.realTransform=function(t,r){if(t===r)throw new Error("Input and output buffers must be different");this._out=t,this._data=r,this._inv=0,this._realTransform4(),this._out=null,this._data=null},t.prototype.inverseTransform=function(t,r){if(t===r)throw new Error("Input and output buffers must be different");this._out=t,this._data=r,this._inv=1,this._transform4();for(var i=0;i<t.length;i++)t[i]/=this.size;this._out=null,this._data=null},t.prototype._transform4=function(){var t,r,i=this._out,s=this._csize,o=1<<this._width,n=s/o<<1,e=this._bitrev;if(4===n)for(t=0,r=0;t<s;t+=n,r++){const i=e[r];this._singleTransform2(t,i,o)}else for(t=0,r=0;t<s;t+=n,r++){const i=e[r];this._singleTransform4(t,i,o)}var h=this._inv?-1:1,a=this.table;for(o>>=2;o>=2;o>>=2){var f=(n=s/o<<1)>>>2;for(t=0;t<s;t+=n)for(var _=t+f,u=t,l=0;u<_;u+=2,l+=o){const t=u,r=t+f,s=r+f,o=s+f,n=i[t],e=i[t+1],_=i[r],p=i[r+1],c=i[s],v=i[s+1],m=i[o],d=i[o+1],y=n,w=e,b=a[l],g=h*a[l+1],z=_*b-p*g,T=_*g+p*b,A=a[2*l],x=h*a[2*l+1],C=c*A-v*x,E=c*x+v*A,I=a[3*l],R=h*a[3*l+1],M=m*I-d*R,F=m*R+d*I,P=y+C,S=w+E,j=y-C,k=w-E,q=z+M,B=T+F,D=h*(z-M),G=h*(T-F),H=P+q,J=S+B,K=P-q,L=S-B,N=j+G,O=k-D,Q=j-G,U=k+D;i[t]=H,i[t+1]=J,i[r]=N,i[r+1]=O,i[s]=K,i[s+1]=L,i[o]=Q,i[o+1]=U}}},t.prototype._singleTransform2=function(t,r,i){const s=this._out,o=this._data,n=o[r],e=o[r+1],h=o[r+i],a=o[r+i+1],f=n+h,_=e+a,u=n-h,l=e-a;s[t]=f,s[t+1]=_,s[t+2]=u,s[t+3]=l},t.prototype._singleTransform4=function(t,r,i){const s=this._out,o=this._data,n=this._inv?-1:1,e=2*i,h=3*i,a=o[r],f=o[r+1],_=o[r+i],u=o[r+i+1],l=o[r+e],p=o[r+e+1],c=o[r+h],v=o[r+h+1],m=a+l,d=f+p,y=a-l,w=f-p,b=_+c,g=u+v,z=n*(_-c),T=n*(u-v),A=m+b,x=d+g,C=y+T,E=w-z,I=m-b,R=d-g,M=y-T,F=w+z;s[t]=A,s[t+1]=x,s[t+2]=C,s[t+3]=E,s[t+4]=I,s[t+5]=R,s[t+6]=M,s[t+7]=F},t.prototype._realTransform4=function(){var t,r,i=this._out,s=this._csize,o=1<<this._width,n=s/o<<1,e=this._bitrev;if(4===n)for(t=0,r=0;t<s;t+=n,r++){const i=e[r];this._singleRealTransform2(t,i>>>1,o>>>1)}else for(t=0,r=0;t<s;t+=n,r++){const i=e[r];this._singleRealTransform4(t,i>>>1,o>>>1)}var h=this._inv?-1:1,a=this.table;for(o>>=2;o>=2;o>>=2){var f=(n=s/o<<1)>>>1,_=f>>>1,u=_>>>1;for(t=0;t<s;t+=n)for(var l=0,p=0;l<=u;l+=2,p+=o){var c=t+l,v=c+_,m=v+_,d=m+_,y=i[c],w=i[c+1],b=i[v],g=i[v+1],z=i[m],T=i[m+1],A=i[d],x=i[d+1],C=y,E=w,I=a[p],R=h*a[p+1],M=b*I-g*R,F=b*R+g*I,P=a[2*p],S=h*a[2*p+1],j=z*P-T*S,k=z*S+T*P,q=a[3*p],B=h*a[3*p+1],D=A*q-x*B,G=A*B+x*q,H=C+j,J=E+k,K=C-j,L=E-k,N=M+D,O=F+G,Q=h*(M-D),U=h*(F-G),V=H+N,W=J+O,X=K+U,Y=L-Q;if(i[c]=V,i[c+1]=W,i[v]=X,i[v+1]=Y,0!==l){if(l!==u){var Z=K+-h*U,$=-L+-h*Q,tt=H+-h*N,rt=-J- -h*O,it=t+_-l,st=t+f-l;i[it]=Z,i[it+1]=$,i[st]=tt,i[st+1]=rt}}else{var ot=H-N,nt=J-O;i[m]=ot,i[m+1]=nt}}}},t.prototype._singleRealTransform2=function(t,r,i){const s=this._out,o=this._data,n=o[r],e=o[r+i],h=n+e,a=n-e;s[t]=h,s[t+1]=0,s[t+2]=a,s[t+3]=0},t.prototype._singleRealTransform4=function(t,r,i){const s=this._out,o=this._data,n=this._inv?-1:1,e=2*i,h=3*i,a=o[r],f=o[r+i],_=o[r+e],u=o[r+h],l=a+_,p=a-_,c=f+u,v=n*(f-u),m=l+c,d=p,y=-v,w=l-c,b=p,g=v;s[t]=m,s[t+1]=0,s[t+2]=d,s[t+3]=y,s[t+4]=w,s[t+5]=0,s[t+6]=b,s[t+7]=g};
},{}],14:[function(require,module,exports) {
module.exports=function(e){return e+=0===e,--e,e|=e>>>1,e|=e>>>2,e|=e>>>4,e|=e>>>8,(e|=e>>>16)+1};
},{}],12:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.findPitch=exports.autocorrelate=void 0;var r=require("fft.js"),e=a(r),t=require("next-pow-2"),n=a(t);function a(r){return r&&r.__esModule?r:{default:r}}var o=function(r){if(Array.isArray(r)){for(var e=0,t=Array(r.length);e<r.length;e++)t[e]=r[e];return t}return Array.from(r)};function u(r){var t=new e.default((0,n.default)(2*r.length)),a=new Array(t.size);r.forEach(function(r,e){a[e]=r}),a.fill(0,r.length);var o=t.createComplexArray();t.realTransform(o,a),t.completeSpectrum(o);for(var u=0;u<o.length;u+=2)o[u]=o[u]*o[u]+o[u+1]*o[u+1],o[u+1]=0;var f=t.createComplexArray();t.inverseTransform(f,o);for(var i=new Array(r.length),l=0;l<r.length;l++)i[l]=f[2*l];return i}function f(r){var e=u(r),t=2*e[0];if(0===t){var n=new Array(e.length);return n.fill(0),n}return e.map(function(e,n){var a=t,o=r.length-n-1;return t-=r[n]*r[n]+r[o]*r[o],2*e/a})}function i(r){for(var e=[],t=!1,n=void 0,a=-1,o=1;o<r.length;o++)r[o-1]<0&&r[o]>0?(t=!0,a=o,n=r[o]):r[o-1]>0&&r[o]<0?(t=!1,-1!==a&&e.push(a)):t&&r[o]>n&&(n=r[o],a=o);return e}function l(r,e){var t=f(r),n=i(t);if(0===n.length)return[0,0];var a=Math.max.apply(Math,o(n.map(function(r){return t[r]}))),u=n.find(function(r){return t[r]>=.9*a});return[e/u,t[u]]}exports.autocorrelate=u,exports.findPitch=l;
},{"fft.js":13,"next-pow-2":14}],11:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],e=440,r=t.length,o={min:27.5,max:1318.5},n=exports.getPitchFromNote=function(o){var n=0;t.some(function(t,e){return t===o.name&&(n=e,!0)});var a=(n-9-r*(4-o.octave))/r;return Math.round(Math.pow(2,a)*e*100)/100},a=exports.getNoteFromPitch=function(n){if(n<o.min||n>o.max)return!1;var a=r*Math.log2(n/e)+(4*r+9),u=Math.abs(Math.round(a)%r),h=t[u],c=Math.round(100*(a-Math.round(a)));return{name:h,cents:c,octave:Math.floor(a/r)+(0===u&&c<0?1:0)}};
},{}],9:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ukulele=exports.dropC=exports.dropD=exports.openG=exports.openD=exports.openC=exports.standard=exports.chromatic=void 0;var e=Object.assign||function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},a=require("./сonverters"),t=function(t){return e({},t,{pitch:(0,a.getPitchFromNote)(t)})},n=function(e){var t=(0,a.getNoteFromPitch)(e);if(!t)return!1;if(this.strings.some(function(e){var a=e.name,n=e.octave;return t.name===a&&t.octave===n}))return t;var n=-1/0,o=this.strings.reduce(function(a,t){var o=e-t.pitch;return Math.abs(o)<Math.abs(n)?(n=o,t):a},{});return{name:o.name,octave:o.octave,cents:n<0?-50:50}},o=exports.chromatic={name:"Chromatic",parse:function(e){return(0,a.getNoteFromPitch)(e)}},r=exports.standard={name:"Standard",strings:[{name:"E",octave:2},{name:"A",octave:2},{name:"D",octave:3},{name:"G",octave:3},{name:"B",octave:3},{name:"E",octave:4}].map(t),parse:n},c=exports.openC={name:"Open C",strings:[{name:"C",octave:2},{name:"G",octave:2},{name:"C",octave:3},{name:"G",octave:3},{name:"C",octave:4},{name:"E",octave:4}].map(t),parse:n},m=exports.openD={name:"Open D",strings:[{name:"D",octave:2},{name:"A",octave:2},{name:"D",octave:3},{name:"F#",octave:3},{name:"A",octave:3},{name:"D",octave:4}].map(t),parse:n},s=exports.openG={name:"Open G",strings:[{name:"D",octave:2},{name:"G",octave:2},{name:"D",octave:3},{name:"G",octave:3},{name:"B",octave:3},{name:"D",octave:4}].map(t),parse:n},v=exports.dropD={name:"Drop D",strings:[{name:"D",octave:2},{name:"A",octave:2},{name:"D",octave:3},{name:"G",octave:3},{name:"B",octave:3},{name:"E",octave:4}].map(t),parse:n},p=exports.dropC={name:"Drop C",strings:[{name:"C",octave:2},{name:"G",octave:2},{name:"C",octave:3},{name:"F",octave:3},{name:"A",octave:3},{name:"D",octave:4}].map(t),parse:n},i=exports.ukulele={name:"Ukulele",strings:[{name:"G",octave:4},{name:"C",octave:4},{name:"E",octave:4},{name:"A",octave:4}].map(t),parse:n};
},{"./сonverters":11}],10:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=document.getElementById("canvas"),e=t.getContext("2d"),n=t.width/2,o=t.height,a=t.width/2,i=3,r=1.2,l=1.8,c=(r+l)/2,s=(l-r)/100,d=r*Math.PI,h=l*Math.PI,u=[-50,-40,-30,-20,-10,0,10,20,30,40,50],f=(l-r)/(u.length-1),m=20,g=8,v=2,x=u.map(function(t,e){return(r+f*e)*Math.PI}),M=u.map(function(t,e){return{x:n+(a+m)*Math.cos(x[e]),y:o+(a+m)*Math.sin(x[e])}}),A=u.map(function(t,e){return{fromX:n+a*Math.cos(x[e]),fromY:o+a*Math.sin(x[e]),toX:n+(a-g)*Math.cos(x[e]),toY:o+(a-g)*Math.sin(x[e])}}),I=3,b=50,w=50,y=o-a+b+w/2,p=15,P=document.querySelectorAll(".lightbulb"),T=document.querySelector(".strings"),S={arrowAngleIndex:r,lastAnimationId:null},k=function(t){var e="";e=t>=-5&&t<=5?"normal":t>5?"dies":"bemole",P.forEach(function(t){var n=t.classList;n.contains("lightbulb-"+e)?n.add("active"):n.remove("active")})},E=function(t){T.childNodes.forEach(function(e){e.dataset.note===t?e.classList.add("active"):e.classList.remove("active")})},q=function(){e.beginPath(),e.arc(n,o,a,d,h,!1),e.lineWidth=i,e.strokeStyle="#000000",e.stroke()},X=function(t){e.font="bold "+w+"px Tahoma",e.fillStyle="#161616",e.textAlign="center",e.textBaseline="middle",e.fillText(t,a,y)},Y=function(){u.forEach(function(t,n){var o=M[n],a=o.x,i=o.y;e.font="16px Tahoma",e.fillStyle="#000000",e.textAlign="center",e.textBaseline="middle",e.fillText(t,a,i)})},B=function(){u.forEach(function(t,n){var o=A[n],a=o.fromX,i=o.fromY,r=o.toX,l=o.toY;e.beginPath(),e.moveTo(a,i),e.lineTo(r,l),e.lineWidth=v,e.lineCap="butt",e.strokeStyle="#000000",e.stroke()})},C=function(t){var i=t*Math.PI,r=n+(a-b)*Math.cos(i),l=o+(a-b)*Math.sin(i),c=n+a*Math.cos(i),s=o+a*Math.sin(i);e.beginPath(),e.moveTo(r,l),e.lineTo(c,s),e.lineWidth=I,e.lineCap="round",e.strokeStyle="#c41f09",e.stroke()},F=function(n,o){e.clearRect(0,0,t.width,t.height),q(),Y(),B(),X(n),C(o)};exports.default=function(t){if(t){var e=t.name,n=t.octave,o=t.cents,a=e?""+e+n:"",i=c+o*s,r=(i-S.arrowAngleIndex)/p;k(o),E(a),cancelAnimationFrame(S.lastAnimationId),S.lastAnimationId=window.requestAnimationFrame(function t(){if(Math.abs(i-S.arrowAngleIndex)<=Math.abs(r))return F(a,i),void(S.arrowAngleIndex=i);S.arrowAngleIndex+=r,F(a,S.arrowAngleIndex),S.lastAnimationId=window.requestAnimationFrame(t)})}};
},{}],6:[function(require,module,exports) {
"use strict";var e=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],r=!0,a=!1,i=void 0;try{for(var o,u=e[Symbol.iterator]();!(r=(o=u.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){a=!0,i=e}finally{try{!r&&u.return&&u.return()}finally{if(a)throw i}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),t=require("pitchy"),n=require("./tunings"),r=u(n),a=require("./render"),i=o(a);function o(e){return e&&e.__esModule?e:{default:e}}function u(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}var c=document.querySelector(".tunings-list"),s=document.querySelector(".strings"),l=document.querySelector(".overlay"),d=document.querySelector(".tuner-show-btn"),f="standard",v=r[f];c.innerHTML=Object.keys(r).map(function(e){return"<option value="+e+" "+(e===f&&"selected")+">"+r[e].name+"</option>"}).join("");var y=function(){(v=r[c.value]).strings?s.innerHTML=v.strings.map(function(e){var t=e.name,n=e.octave;return'<div class="strings-item" data-note="'+(t+n)+'">\n        <div class="string-lightbulb"></div>\n        <span class="string-name">'+(t+n)+"</span>\n      </div>"}).join(""):s.innerHTML=""},m=function(n){var r=new AudioContext,a=r.createMediaStreamSource(n),o=r.createAnalyser();o.fftSize=2048;var u=new Float32Array(o.fftSize),c=r.createMediaStreamDestination();a.connect(o).connect(c),setInterval(function(){o.getFloatTimeDomainData(u);var n=(0,t.findPitch)(u,r.sampleRate),a=e(n,2),c=a[0];a[1]>.9&&(0,i.default)(v.parse(c))},100)};d.addEventListener("click",function(){l.classList.add("closed"),window.navigator.mediaDevices.getUserMedia({audio:!0}).then(m)}),y(),c.addEventListener("change",y),(0,i.default)({cents:-50});
},{"pitchy":12,"./tunings":9,"./render":10}]},{},[6])