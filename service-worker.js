if(!self.define){let e,n={};const i=(i,r)=>(i=new URL(i+".js",r).href,n[i]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=n,document.head.appendChild(e)}else e=i,importScripts(i),n()})).then((()=>{let e=n[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,c)=>{const b=e||("document"in self?document.currentScript.src:"")||location.href;if(n[b])return;let o={};const u=e=>i(e,b),a={module:{uri:b},exports:o,require:u};n[b]=Promise.all(r.map((e=>a[e]||u(e)))).then((e=>(c(...e),o)))}}define(["./workbox-db5fc017"],(function(e){"use strict";e.setCacheNameDetails({prefix:"number"}),self.skipWaiting(),e.precacheAndRoute([{url:"/number/android-chrome-192x192.png",revision:"8b2d1a0b589569ced5b814535d8fb980"},{url:"/number/android-chrome-maskable-192x192.png",revision:"8b2d1a0b589569ced5b814535d8fb980"},{url:"/number/android-chrome-maskable-512x512.png",revision:"a145049318a2c00088567896bee96d11"},{url:"/number/apple-touch-icon-120x120.png",revision:"f383b212d5b36dc757571e522790b1e2"},{url:"/number/apple-touch-icon-152x152.png",revision:"c3c7683eafd3b089b4c2be95b43a2032"},{url:"/number/apple-touch-icon-180x180.png",revision:"d78cba7832f9e9d84e6ff5cf5e016dac"},{url:"/number/apple-touch-icon-60x60.png",revision:"81ba1ba77ab1ce9761810259cc37a286"},{url:"/number/apple-touch-icon-76x76.png",revision:"849b89d35356883ebc53292c2453a975"},{url:"/number/apple-touch-icon.png",revision:"d78cba7832f9e9d84e6ff5cf5e016dac"},{url:"/number/browserconfig.xml",revision:"03e3cf7ee39219c3fa13008ecc811284"},{url:"/number/css/about.05982805.css",revision:null},{url:"/number/css/app.d9a27caa.css",revision:null},{url:"/number/data/data-2023-03.json",revision:"eb7cdf6604afe5a5f0d0e6292d8c8182"},{url:"/number/favicon-16x16.png",revision:"d53390dccda31fa360a8d106ffcf65ff"},{url:"/number/favicon-32x32.png",revision:"fd90eb0d07dbe6944f586546d81e170c"},{url:"/number/favicon.ico",revision:"e20bf56592477b0f5605081b74b9182c"},{url:"/number/img/fuo.0140bf4a.jpg",revision:null},{url:"/number/img/fuo.jpg",revision:"2c00dbd596e0505f4ff5e8d36a0b4d36"},{url:"/number/img/fuo3.d5477af2.jpg",revision:null},{url:"/number/img/fuo4.85ed137a.jpg",revision:null},{url:"/number/img/icons/android-chrome-192x192.png",revision:"8b2d1a0b589569ced5b814535d8fb980"},{url:"/number/img/icons/android-chrome-maskable-192x192.png",revision:"8b2d1a0b589569ced5b814535d8fb980"},{url:"/number/img/icons/android-chrome-maskable-512x512.png",revision:"a145049318a2c00088567896bee96d11"},{url:"/number/img/icons/apple-touch-icon-120x120.png",revision:"f383b212d5b36dc757571e522790b1e2"},{url:"/number/img/icons/apple-touch-icon-152x152.png",revision:"c3c7683eafd3b089b4c2be95b43a2032"},{url:"/number/img/icons/apple-touch-icon-180x180.png",revision:"d78cba7832f9e9d84e6ff5cf5e016dac"},{url:"/number/img/icons/apple-touch-icon-60x60.png",revision:"81ba1ba77ab1ce9761810259cc37a286"},{url:"/number/img/icons/apple-touch-icon-76x76.png",revision:"849b89d35356883ebc53292c2453a975"},{url:"/number/img/icons/apple-touch-icon.png",revision:"d78cba7832f9e9d84e6ff5cf5e016dac"},{url:"/number/img/icons/browserconfig.xml",revision:"03e3cf7ee39219c3fa13008ecc811284"},{url:"/number/img/icons/favicon-16x16.png",revision:"d53390dccda31fa360a8d106ffcf65ff"},{url:"/number/img/icons/favicon-32x32.png",revision:"fd90eb0d07dbe6944f586546d81e170c"},{url:"/number/img/icons/favicon.ico",revision:"e20bf56592477b0f5605081b74b9182c"},{url:"/number/img/icons/msapplication-icon-144x144.png",revision:"a0e2a944c141d0320b9bbc34d157184b"},{url:"/number/img/icons/mstile-150x150.png",revision:"744e3c13a2f2403d9f2ca0ab3fefc1e9"},{url:"/number/img/icons/safari-pinned-tab.svg",revision:"d57afb4883a42c6c236a6a065cf69e97"},{url:"/number/img/number.jpg",revision:"2c00dbd596e0505f4ff5e8d36a0b4d36"},{url:"/number/index.html",revision:"3258e71afb720a77a8957fceb0b43b34"},{url:"/number/js/about.a412d419.js",revision:null},{url:"/number/js/about.a412d419.js.map",revision:"c59fdb2f9be7d95a0848f26b8b75efe9"},{url:"/number/js/app.3f708aa3.js",revision:null},{url:"/number/js/app.3f708aa3.js.map",revision:"4907e9952b7e5bb565d1bff37c63d98b"},{url:"/number/js/chunk-vendors.3f528122.js",revision:null},{url:"/number/manifest.json",revision:"b264cd2824cfb46f77d5d61d6686893d"},{url:"/number/manifest.webmanifest",revision:"5a60de75ed8e31e45f831b755683084c"},{url:"/number/msapplication-icon-144x144.png",revision:"a0e2a944c141d0320b9bbc34d157184b"},{url:"/number/mstile-150x150.png",revision:"27a3307d23477f09469fd60dae430cfe"},{url:"/number/privacy_policy.html",revision:"4c56d1e3b584217fbb5b6cf4b5869e3f"},{url:"/number/robots.txt",revision:"9226e8a7e884feacfbcd7932d2d02efc"},{url:"/number/safari-pinned-tab.svg",revision:"d57afb4883a42c6c236a6a065cf69e97"}],{})}));
//# sourceMappingURL=service-worker.js.map
