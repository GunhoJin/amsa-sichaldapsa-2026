// 2026 중고등부 여름캠프 큐시트 — 공용 렌더 헬퍼
function esc(s){return (s||"").replace(/&(?!\w+;|#)/g,"&amp;")}

function renderRail(arr, elId){
  const html = arr.map(d=>`
    <div class="row">
      <div class="t">${esc(d.t)}</div>
      <div>
        ${d.place?`<p class="place">${esc(d.place)}</p>`:""}
        <p class="desc">${esc(d.desc)}</p>
        ${d.owner?`<p class="owner">${esc(d.owner)}</p>`:""}
      </div>
    </div>`).join("");
  document.getElementById(elId).innerHTML = html;
}

const CHECK_STORE_KEY = "camp2026-master-checklist";
function ckLoad(){ try{ return JSON.parse(localStorage.getItem(CHECK_STORE_KEY))||{}; }catch(e){ return {}; } }
function ckSave(s){ try{ localStorage.setItem(CHECK_STORE_KEY, JSON.stringify(s)); }catch(e){} }
function renderChecklist(items, elId){
  const state = ckLoad();
  const html = items.map((txt,i)=>{
    const id="chk"+i, on=!!state[i];
    return `<div class="check-row ${on?'done':''}" id="row${i}">
      <input type="checkbox" id="${id}" ${on?"checked":""} onchange="toggleCheck(${i})">
      <label class="box" for="${id}"></label>
      <label for="${id}">${esc(txt)}</label>
    </div>`;
  }).join("");
  document.getElementById(elId).innerHTML = html;
}
function toggleCheck(i){
  const state = ckLoad();
  state[i] = !state[i];
  ckSave(state);
  document.getElementById("row"+i).classList.toggle("done", !!state[i]);
}
function resetChecks(items, elId){ ckSave({}); renderChecklist(items, elId); }
