import{a as p,S as L,i as m}from"./assets/vendor-3b56a289.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const w=15,S="45505943-42661f72ea61112ff146e0896",q="https://pixabay.com/api/";async function f(r,t=1){const s=`${q}?key=${S}&q=${encodeURIComponent(r)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${w}&page=${t}`;try{const n=await p.get(s);return{images:n.data.hits,totalHits:n.data.totalHits}}catch{throw new Error("Error fetching images")}}let I=new L(".gallery a");function d(r,t=!0){const s=document.querySelector(".gallery");t&&(s.innerHTML="");const n=r.map(e=>`
            <a href="${e.largeImageURL}" class="gallery-item">
                <img src="${e.webformatURL}" alt="${e.tags}" />
                <ul class="info">
                    <li class="gallery-info-item">
                        <strong>Likes</strong>
                        <span>${e.likes}</span>
                    </li>
                    <li class="gallery-info-item">
                        <strong>Views</strong>
                        <span>${e.views}</span>
                    </li>
                    <li class="gallery-info-item">
                        <strong>Comments</strong>
                        <span>${e.comments}</span>
                    </li>
                    <li class="gallery-info-item">
                        <strong>Downloads</strong>
                        <span>${e.downloads}</span>
                    </li>
                </ul>
            </a>
        `).join("");s.insertAdjacentHTML("beforeend",n),I.refresh()}function a(r){m.error({title:"Error",message:r,position:"topRight"})}function P(){m.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}function h(){document.querySelector(".loading-indicator").classList.remove("hidden")}function c(){document.querySelector(".loading-indicator").classList.add("hidden")}function $(){document.querySelector(".load-more").classList.remove("hidden")}function y(){document.querySelector(".load-more").classList.add("hidden")}const b=document.querySelector("#search-form"),v=document.querySelector("#search-input"),E=document.querySelector(".load-more");let l=1,i="",g=0;b.addEventListener("submit",async r=>{if(r.preventDefault(),i=v.value.trim(),l=1,!i){a("Please enter a search query.");return}y(),h();try{const{images:t,totalHits:s}=await f(i,l);g=s,c(),t.length===0?(d([]),P()):(d(t),t.length<g&&$())}catch{c(),a("An error occurred while fetching images. Please try again later.")}});E.addEventListener("click",async()=>{l+=1,h();try{const{images:r}=await f(i,l);c(),d(r,!1);const t=document.querySelectorAll(".gallery-item"),s=t.length,e=t[t.length-1].getBoundingClientRect().height;setTimeout(()=>{window.scrollBy({top:e*2,behavior:"smooth"})},100),s>=g&&(y(),a("We're sorry, but you've reached the end of search results."))}catch{c(),a("An error occurred while fetching more images. Please try again later.")}});
//# sourceMappingURL=commonHelpers.js.map
