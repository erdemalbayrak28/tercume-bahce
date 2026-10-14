const {chromium}=require('C:/Users/Monster/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const express=require('../node_modules/express');
const fs=require('fs');
const path=require('path');
const app=express(); app.use(express.static(path.resolve(__dirname,'..')));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const server=app.listen(4177,'127.0.0.1');
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 try {for(const site of ['tercume','bahce']) for(const device of ['desktop','mobile']){
  const size=device==='desktop'?{width:1440,height:900}:{width:390,height:844};
  const context=await browser.newContext({viewport:size,deviceScaleFactor:1,isMobile:device==='mobile',recordVideo:{dir:path.join(__dirname,'captures'),size}});
  await context.addInitScript(()=>{
   const sanitize=()=>{
    for(const el of document.querySelectorAll('img,svg,[aria-label],[title]')){
     const label=[el.getAttribute('src'),el.getAttribute('alt'),el.getAttribute('aria-label'),el.getAttribute('title'),el.getAttribute('class')].join(' ');
     if(/nazay|logo|wordmark|brand/i.test(label))el.style.setProperty('visibility','hidden','important');
    }
    const walk=document.createTreeWalker(document.body||document.documentElement,NodeFilter.SHOW_TEXT);
    while(walk.nextNode()){const node=walk.currentNode;if(/nazay/i.test(node.nodeValue))node.nodeValue='';}
   };
   new MutationObserver(sanitize).observe(document.documentElement,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['src','alt','aria-label','title']});
   document.addEventListener('DOMContentLoaded',sanitize,{once:true});
  });
  const page=await context.newPage();
  await page.goto('http://127.0.0.1:4177/nazay'+site+'/?lang=tr',{waitUntil:'networkidle'});
  await page.evaluate(()=>{
   const sanitize=()=>{
    document.querySelectorAll('img,svg,[aria-label],[title]').forEach(el=>{
     const value=['src','alt','aria-label','title','class'].map(k=>el.getAttribute(k)||'').join(' ');
     if(/nazay|logo|wordmark|brand/i.test(value))el.style.setProperty('display','none','important');
    });
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    while(walker.nextNode()){const node=walker.currentNode;if(/nazay/i.test(node.nodeValue))node.nodeValue='';}
   };
   sanitize();new MutationObserver(sanitize).observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['src','alt','aria-label','title']});
  });
  await page.evaluate(()=>document.fonts.ready);
  await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
  await sleep(1200);
  await page.screenshot({path:path.join(__dirname,'captures',site+'-'+device+'.png')});
  const start=Date.now();
  await sleep(2200);
  const scroll=async(sel)=>{await page.locator(sel).evaluate(el=>window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-110,behavior:'smooth'})); await sleep(1700)};
  if(site==='tercume'){
   await scroll('#teklif');
   await page.locator('#qf-doctype').selectOption('Diploma / Transkript'); await sleep(1000);
   await page.locator('#qf-target').selectOption('Almanca'); await sleep(1000);
   await page.locator('#qf-pages').fill('3'); await sleep(1000);
   await scroll('#qf-notary'); await page.locator('#qf-notary').check(); await sleep(1000);
   await scroll('#qf-submit'); await sleep(1600);
  }else{
   await scroll('#galeri'); await sleep(1200);
   await page.locator('.filter-btn[data-filter="bride"]').click(); await sleep(1600);
   await scroll('#teklif-formu');
   await page.locator('#eventType').selectOption('Butik Nişan'); await sleep(900);
   await page.locator('#guestCount').selectOption('60 - 80 Kişi'); await sleep(900);
   await page.locator('#eventDate').fill('2026-12-19'); await sleep(900);
   await scroll('#sendWhatsappBtn'); await sleep(1000);
  }
  await sleep(Math.max(500,18000-(Date.now()-start)));
  const video=page.video(); await context.close(); await video.saveAs(path.join(__dirname,'captures',site+'-'+device+'.webm'));
  console.log(site,device,'recorded');
 }}finally{await browser.close();server.close()}
})().catch(e=>{console.error(e);process.exit(1)});

