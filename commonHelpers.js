import{i as c,a as b,S as L}from"./assets/vendor-5401a4b0.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const w=document.querySelector("form"),d=document.querySelector("ul"),i=document.querySelector(".button-load-more");let l=1,f=15,u,m,p;const v='<div class="loader"></div>';d.insertAdjacentHTML("afterend",v);const y=document.querySelector(".loader");w.addEventListener("submit",P);async function P(t){try{if(t.preventDefault(),l=1,d.innerHTML="",i.style.display="none",y.style.display="block",u=t.currentTarget.text.value.trim(),u==="")return c.info({title:"Attention",message:"Please enter a request"});const s=await g();h(s),i.addEventListener("click",q)}catch(s){console.log(s)}}const g=async()=>(await b.get("https://pixabay.com/api/",{params:{key:"42277642-5b5e0c3e2383e813180f7c1aa",q:u,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:f,page:l}})).data;function h(t){const s=t.hits.map(o=>`
        <li class="gallery-item">
          <a href="${o.largeImageURL}">
          <img src="${o.webformatURL}" alt="${o.tags}">
          <ul class="photo-info">
            <li>
                <h3>Likes</h3>
                <p>${o.likes}</p>
            </li>
            <li>
                <h3>Views</h3>
                <p>${o.views}</p>
            </li>
            <li>
                <h3>Comments</h3>
                <p>${o.comments}</p>
            </li>
            <li>
                <h3>Downloads</h3>
                <p>${o.downloads}</p>
            </li>
          </ul>
          </a>
        </li>
      `).join("");setTimeout(()=>{if(y.style.display="none",t.totalHits===0){c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}d.insertAdjacentHTML("beforeend",s);let a=document.querySelector(".gallery-item").getBoundingClientRect();if(window.scrollBy({top:a.width*2,behavior:"smooth"}),i.style.display="inline-block",new L(".gallery-list a",{captionsData:"alt",captionDelay:250}).refresh(),m=t.totalHits,p=Math.ceil(m/f),l>=p)return i.style.display="none",c.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})},1e3)}async function q(){try{l+=1,i.style.display="none",y.style.display="block";const t=await g();h(t)}catch(t){console.log(t)}}
//# sourceMappingURL=commonHelpers.js.map
