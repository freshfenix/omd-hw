(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`ebc5cc8c`,t=4,n=`./assets/no-img.jpg`,r=`
  :root {
    font-family: Arial, Helvetica, sans-serif;
    color: #1f2933;
    background: #f5f7fb;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;
  }

  .app {
    min-height: 100vh;
    padding: 40px 16px;
  }

  .container {
    width: min(1100px, 100%);
    margin: 0 auto;
  }

  h1 {
    margin: 0 0 24px;
    text-align: center;
    font-size: 40px;
    color: #111827;
  }

  .controls {
    display: grid;
    gap: 14px;
    width: min(560px, 100%);
    margin: 0 auto 32px;
  }

  .search-input {
    display: block;
    width: 100%;
    padding: 14px 18px;
    border: 1px solid #d5dce8;
    border-radius: 8px;
    background: #ffffff;
    color: #111827;
    font-size: 18px;
    outline: none;
    box-shadow: 0 8px 20px rgba(31, 41, 55, 0.08);
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  }

  .search-input:hover {
    border-color: #8aa4d6;
    transform: translateY(-1px);
  }

  .search-input:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.14);
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 8px;
    width: fit-content;
    color: #4b5563;
    font-size: 14px;
    cursor: pointer;
    user-select: none;
  }

  .checkbox-label input {
    width: 16px;
    height: 16px;
    accent-color: #2563eb;
    cursor: pointer;
  }

  .message {
    margin: 0 0 18px;
    text-align: center;
    color: #596575;
    font-size: 15px;
  }

  .results {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
    gap: 20px;
  }

  .movie-card {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 14px;
    border: 1px solid #e1e6ef;
    border-radius: 8px;
    background: #ffffff;
    box-shadow: 0 10px 24px rgba(31, 41, 55, 0.08);
    overflow: hidden;
    transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
  }

  .movie-card:hover {
    border-color: #b7c7e3;
    box-shadow: 0 16px 34px rgba(31, 41, 55, 0.16);
    transform: translateY(-6px);
  }

  .movie-card h2 {
    margin: 0;
    font-size: 18px;
    line-height: 1.25;
    color: #111827;
  }

  .movie-card p {
    margin: 0;
    color: #596575;
    font-size: 14px;
  }

  .movie-poster {
    width: 100%;
    aspect-ratio: 2 / 3;
    margin-top: auto;
    border-radius: 6px;
    object-fit: cover;
    background: #e8edf5;
    transition: transform 0.25s, filter 0.25s;
  }

  .movie-card:hover .movie-poster {
    filter: saturate(1.08) contrast(1.04);
    transform: scale(1.03);
  }

  .load-more {
    display: block;
    margin: 28px auto 0;
    padding: 12px 22px;
    border: 0;
    border-radius: 8px;
    background: #2563eb;
    color: #ffffff;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 10px 24px rgba(37, 99, 235, 0.22);
    transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
  }

  .load-more:hover {
    background: #1d4ed8;
    box-shadow: 0 14px 30px rgba(37, 99, 235, 0.3);
    transform: translateY(-2px);
  }

  .load-more:disabled {
    background: #9ca3af;
    box-shadow: none;
    cursor: not-allowed;
    transform: none;
  }

  .load-more.is-hidden {
    display: none;
  }

  @media (max-width: 560px) {
    .app {
      padding: 28px 12px;
    }

    h1 {
      font-size: 32px;
    }

    .results {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 14px;
    }
  }
`,i=document.createElement(`div`),a=document.createElement(`div`),o=document.createElement(`div`),s=document.createElement(`h1`),c=document.createElement(`input`),l=document.createElement(`label`),u=document.createElement(`input`),d=document.createElement(`p`),f=document.createElement(`div`),p=document.createElement(`button`),m=!0,h=``,g=``,_=1,v=0,y=0,b=!1,x=(()=>{let e=null;return(t,n)=>{e&&clearTimeout(e),e=setTimeout(t,n)}})();function S(){let e=document.createElement(`style`);e.textContent=r,document.head.append(e)}function C(){s.textContent=`Movie Search`,c.type=`text`,c.classList.add(`search-input`),c.placeholder=`Enter movie title`,u.type=`checkbox`,u.checked=m,l.classList.add(`checkbox-label`),l.append(u,`Clear previous results`),i.classList.add(`app`),a.classList.add(`container`),o.classList.add(`controls`),d.classList.add(`message`),f.classList.add(`results`),f.id=`results`,p.type=`button`,p.textContent=`Load more`,p.classList.add(`load-more`,`is-hidden`),i.append(a),o.append(c,l),a.append(s,o,d,f,p),document.body.append(i)}function w(){f.innerHTML=``}function T(e=``){d.textContent=e}function E(){let e=y<v;p.classList.toggle(`is-hidden`,!e||!g),p.disabled=b}async function D(t,n=1){let r=`https://www.omdbapi.com/?apikey=${e}&s=${encodeURIComponent(t)}&page=${n}`,i=await(await fetch(r)).json();if(i.Response!==`True`||!i.Search)throw Error(i.Error||`Movies not found`);return{movies:i.Search,totalResults:Number(i.totalResults)||i.Search.length}}function O({Poster:e,Title:t,Year:r,Type:i}){let a=document.createElement(`div`),o=document.createElement(`h2`),s=document.createElement(`p`),c=document.createElement(`p`),l=document.createElement(`img`),u=/^https?:\/\//.test(e);a.classList.add(`movie-card`),l.classList.add(`movie-poster`),o.textContent=t,s.textContent=`Year: ${r}`,c.textContent=`Type: ${i}`,l.src=u?e:n,l.alt=`${t} ${r}`,l.title=`${t} ${r}`,l.onerror=()=>{l.onerror=null,l.src=n},a.append(o,s,c,l),f.append(a)}function k(e){x(async()=>{let n=e.target.value.trim();if(!n){w(),T(``),h=``,g=``,_=1,v=0,y=0,E();return}if(n.length<t){T(`Type at least ${t} characters`),g=``,v=0,y=0,E();return}if(h!==n){m&&w(),g=n,_=1,v=0,y=0,b=!0,E(),T(`Searching...`);try{let e=await D(n,_),t=e.movies;v=e.totalResults,y=t.length,t.forEach(O),T(``)}catch(e){w(),g=``,v=0,y=0,T(e.message)}finally{b=!1,E()}h=n}},1e3)}async function A(){if(!(!g||b)){b=!0,_+=1,p.textContent=`Loading...`,E(),T(``);try{let e=await D(g,_);v=e.totalResults,y+=e.movies.length,e.movies.forEach(O)}catch(e){--_,T(e.message)}finally{b=!1,p.textContent=`Load more`,E()}}}c.addEventListener(`input`,k),u.addEventListener(`change`,e=>{m=e.target.checked}),p.addEventListener(`click`,A),S(),C();