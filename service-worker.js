'use strict';
// Bump this version whenever any shell asset changes. Never cache financial data.
const CACHE_PREFIX='pocketflow-shell-';
const CACHE_NAME=CACHE_PREFIX+'v6';
const SHELL=['./','./index.html','./style.css','./app.js','./manifest.webmanifest','./fonts/noto-sans-thai-thai.woff2','./fonts/noto-sans-thai-latin.woff2','./fonts/noto-sans-thai-latin-ext.woff2','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png','./icons/apple-touch-icon.png'];
const urls=SHELL.map(path=>new URL(path,self.registration.scope).href);
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(urls.map(url=>new Request(url,{cache:'reload'}))))));
self.addEventListener('activate',event=>event.waitUntil((async()=>{await Promise.all((await caches.keys()).filter(key=>key.startsWith(CACHE_PREFIX)&&key!==CACHE_NAME).map(key=>caches.delete(key)));await self.clients.claim()})()));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);url.search='';
  if(!urls.includes(url.href))return;
  event.respondWith((async()=>{const cache=await caches.open(CACHE_NAME);return await cache.match(url.href)||fetch(event.request)})());
});
