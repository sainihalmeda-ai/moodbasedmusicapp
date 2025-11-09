// Init icons
document.addEventListener('DOMContentLoaded', ()=> lucide.createIcons());

/* ===== Dummy catalogs / data ===== */
const CATALOG = {
  telugu: ["Samajavaragamana","Butta Bomma","Ayyayo"],
  tamil:  ["Arabic Kuthu","Vaathi Coming","Why This Kolaveri Di"],
  hindi:  ["Kesariya","Tum Hi Ho","Channa Mereya"],
  podcastsAll: ["Tech Talk Daily","History Hour","Mindful Minutes","Code Cafe"]
};
const SINGER_SONGS = {
  "Arijit Singh": ["Kesariya","Channa Mereya","Tum Hi Ho"],
  "Anirudh": ["Arabic Kuthu","Vaathi Coming"],
  "Sid Sriram": ["Samajavaragamana","Ayyayo"]
};
const preferredLanguages = JSON.parse(localStorage.getItem('preferredLanguages') || '["telugu","tamil","hindi"]');
const preferredSingers   = JSON.parse(localStorage.getItem('preferredSingers')   || '["Arijit Singh","Anirudh"]');
const userPodcasts       = JSON.parse(localStorage.getItem('userPodcasts')       || '["Mindful Minutes"]');

/* ===== Flip Navigation (LEFT NAV ONLY) ===== */
const flipBox   = document.getElementById('flipBox');
const backTitle = document.getElementById('backTitle');
const backBody  = document.getElementById('backBody');
const backTools = document.getElementById('backTools');

document.getElementById('backBtn').addEventListener('click', ()=> {
  flipBox.style.transform='rotateY(0deg)';
  backTools.innerHTML = '';
  backBody.scrollTop = 0;
});

const pageMap = {
  home:       null,            // no flip
  search:     'tpl-search',
  songs:      'tpl-songs',
  podcasts:   'tpl-podcasts',
  merge:      'tpl-merge'
};

// LEFT NAV
document.getElementById('vnav').addEventListener('click', (e)=>{
  const btn = e.target.closest('.vbtn');
  if(!btn) return;
  const key = btn.dataset.target;

  if(key === 'home'){
    // Return to front side (Home)
    flipBox.style.transform='rotateY(0deg)';
    return;
  }

  const tplId = pageMap[key];
  if(!tplId) return;

  openBackPageFromTemplate(tplId, key[0].toUpperCase()+key.slice(1));

  // Attach feature behavior per page
  if(key === 'search')   initSearch();
  if(key === 'songs')    loadRecentSongs();
  if(key === 'podcasts') loadRecentPodcasts();
  if(key === 'merge')    initMerge();
});

/* ===== Helper to open template with flip (left nav only) ===== */
function openBackPageFromTemplate(tplId, title){
  const tpl = document.getElementById(tplId);
  backBody.innerHTML = '';
  backTools.innerHTML = '';
  backTitle.textContent = title;
  backBody.appendChild(tpl.content.cloneNode(true));
  lucide.createIcons();
  flipBox.style.transform = 'rotateY(180deg)';
}

/* ============================================================
   HOME — dynamic sections (NO FLIP)
   ============================================================ */

const homeSections = document.getElementById('homeSections');

// Card clicks (All / Mood / Podcast)
document.querySelectorAll('.col-card').forEach(card=>{
  card.addEventListener('click', ()=>{
    document.querySelectorAll('.col-card').forEach(c=>c.classList.remove('active'));
    card.classList.add('active');
    const view = card.dataset.homeview;
    if(view === 'all')      renderHomeAll();
    if(view === 'mood')     renderHomeMood();
    if(view === 'podcast')  renderHomePodcast();
  });
});

// Render: ALL (default)
function renderHomeAll(){
  // Languages + Preferred Singers
  const defs = [
    { key:'telugu',  name:'Latest Telugu Songs',  cover:'https://source.unsplash.com/collection/94734566/600x600?sig=1', items:CATALOG.telugu },
    { key:'tamil',   name:'Latest Tamil Songs',   cover:'https://source.unsplash.com/collection/94734566/600x600?sig=2', items:CATALOG.tamil },
    { key:'hindi',   name:'Latest Hindi Songs',   cover:'https://source.unsplash.com/collection/94734566/600x600?sig=3', items:CATALOG.hindi },
    { key:'podcasts',name:'Podcast',              cover:'https://source.unsplash.com/collection/362496/600x600?sig=4', items:CATALOG.podcastsAll }
  ];

  const langTiles = defs
    .filter(d => d.key==='podcasts' || preferredLanguages.includes(d.key))
    .map(d => `
      <div class="pl-card" data-pl="${d.key}">
        <img class="pl-cover" src="${d.cover}" alt="${d.name}">
        <div class="pl-title">${d.name}</div>
        <div class="pl-sub">${d.items.length} items</div>
      </div>
    `).join('');

  const singerTiles = preferredSingers.map(name=>{
    const songs = (SINGER_SONGS[name]||[]);
    if(!songs.length) return '';
    const cover = `https://source.unsplash.com/collection/1346951/600x600?sig=${encodeURIComponent(name)}`;
    return `
      <div class="pl-card" data-singer="${name}">
        <img class="pl-cover" src="${cover}" alt="${name}">
        <div class="pl-title">${name}</div>
        <div class="pl-sub">${songs.length} songs</div>
      </div>
    `;
  }).join('');

  homeSections.innerHTML = `
    <div class="fall-container">
      <h3 class="section-title small">Languages & Podcasts</h3>
      <div class="playlist-grid" id="languageGrid">${langTiles}</div>

      <h3 class="section-title small">Preferred Singers</h3>
      <div class="playlist-grid" id="singerGrid">${singerTiles || '<div class="pl-sub">No preferred singers yet</div>'}</div>
    </div>
  `;

  // Click handlers to open playlist detail INSIDE HOME (still no flip)
  const languageGrid = document.getElementById('languageGrid');
  if(languageGrid){
    languageGrid.addEventListener('click', (e)=>{
      const card = e.target.closest('.pl-card'); if(!card) return;
      const key = card.dataset.pl;
      const meta = defs.find(d=>d.key===key);
      if(!meta) return;
      renderHomePlaylistDetail(meta.name, meta.cover, meta.items);
    });
  }

  const singerGrid = document.getElementById('singerGrid');
  if(singerGrid){
    singerGrid.addEventListener('click', (e)=>{
      const card = e.target.closest('.pl-card'); if(!card) return;
      const singer = card.dataset.singer;
      renderHomePlaylistDetail(`${singer} — Picks`, card.querySelector('.pl-cover').src, SINGER_SONGS[singer]||[]);
    });
  }
}

// Render: Mood Based Music
function renderHomeMood(){
  const list = JSON.parse(localStorage.getItem('mood_suggestions') || '[]');
  const final = list.length ? list : ["Lo-fi Chill","Night Drive","Rain Ambience"];

  homeSections.innerHTML = `
    <div class="fall-container">
      <div class="backTools" style="margin:0 0 10px 0">
        <button class="mini-btn" id="homeRescan"><i data-lucide="scan-face"></i> Rescan</button>
      </div>
      <h3 class="section-title small">Your Mood Picks</h3>
      <div id="moodTracks" class="track-list">
        ${final.map((name,i)=>`
          <div class="track">
            <div class="num">${i+1}</div>
            <div class="name">${name}</div>
            <div class="meta">Mood • 3:${String(5+i).padStart(2,'0')}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  lucide.createIcons();
  document.getElementById('homeRescan').addEventListener('click', openCameraAndScan);
}

// Render: Podcast (all)
function renderHomePodcast(){
  const list = (JSON.parse(localStorage.getItem('userPodcasts')||'null')) || userPodcasts || [];
  const final = list.length ? list : ["Mindful Minutes","Tech Talk Daily"];

  homeSections.innerHTML = `
    <div class="fall-container">
      <h3 class="section-title small">All Podcasts</h3>
      <div id="podcastGrid" class="podcast-grid">
        ${final.map((title,i)=>`
          <div class="pod-card">
            <img class="pl-cover" src="https://source.unsplash.com/collection/362496/600x600?sig=${i+11}" alt="${title}">
            <div class="pod-title">${title}</div>
            <div class="pl-sub">Podcast • ${20+i} episodes</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Render a playlist detail INSIDE HOME (no flip)
function renderHomePlaylistDetail(title, cover, items){
  homeSections.innerHTML = `
    <div class="fall-container">
      <div class="playlist-hero">
        <img src="${cover}" alt="">
        <div class="pl-meta">
          <div class="pl-type">Playlist</div>
          <h2>${title}</h2>
          <div class="pl-sub">${items.length} tracks • updated now</div>
        </div>
      </div>
      <div class="track-list">
        ${items.map((name,i)=>`
          <div class="track">
            <div class="num">${i+1}</div>
            <div class="name">${name}</div>
            <div class="meta">3:${String(10+i).padStart(2,'0')}</div>
          </div>
        `).join('')}
      </div>
      <div style="margin-top:12px">
        <button class="mini-btn" id="homeBackToAll"><i data-lucide="arrow-left"></i> Back</button>
      </div>
    </div>
  `;
  lucide.createIcons();
  document.getElementById('homeBackToAll').addEventListener('click', renderHomeAll);
}

/* ===== INIT HOME DEFAULT ===== */
renderHomeAll();

/* ============================================================
   Existing back pages support (left nav)
   ============================================================ */
function initSearch(){
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  if(!searchInput || !searchResults) return;
  const flat = [...CATALOG.telugu, ...CATALOG.tamil, ...CATALOG.hindi];
  searchInput.addEventListener('input', ()=>{
    const q = searchInput.value.toLowerCase();
    const list = flat.filter(s=>s.toLowerCase().includes(q));
    searchResults.innerHTML = list.map((s,i)=>`
      <div class="track"><div class="num">${i+1}</div><div class="name">${s}</div><div class="meta">Search</div></div>
    `).join('');
  });
}
function loadRecentSongs(){
  const el = document.getElementById('recentSongs'); if(!el) return;
  const list = JSON.parse(localStorage.getItem('recentSongs')||'[]');
  el.innerHTML = (list.length?list:["No songs yet"]).map((x,i)=>`
    <div class="track"><div class="num">${i+1}</div><div class="name">${x}</div><div class="meta">Recent</div></div>
  `).join('');
}
function loadRecentPodcasts(){
  const el = document.getElementById('recentPodcast'); if(!el) return;
  el.innerHTML = `<div class="track"><div class="num">🎙</div><div class="name">No podcasts played yet</div><div class="meta">—</div></div>`;
}

/* ===== Merge (Invite) ===== */
function initMerge(){
  const input = document.getElementById('inviteLink');
  const copyBtn = document.getElementById('copyInvite');
  const shareBtn = document.getElementById('shareInvite');
  if(!input) return;

  // generate simple room link
  const id = (Math.random().toString(36).slice(2,8) + Date.now().toString(36)).toUpperCase();
  const link = `${location.origin}${location.pathname}?merge=${id}`;
  input.value = link;

  copyBtn?.addEventListener('click', async ()=>{
    try{ await navigator.clipboard.writeText(link); copyBtn.textContent = "Copied ✔"; }
    catch{ alert("Copy failed. Long-press to copy."); }
  });

  shareBtn?.addEventListener('click', async ()=>{
    if(navigator.share){
      try{ await navigator.share({title:"Join my MoodTune room", text:"Listen with me on MoodTune", url:link}); }
      catch{}
    }else{
      alert("Sharing not supported. Copy the link instead.");
    }
  });
}

/* ============================================================
   Camera / Face Scan (updates mood suggestions)
   ============================================================ */
const MODEL_URL = "https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/models";
const cameraModal = document.getElementById('cameraModal');
const camera      = document.getElementById('camera');
const camStatus   = document.getElementById('camStatus');
let stream;
let modelsLoaded = false;

const moodsMap = {
  happy:["Jimikki Ponnu","Arabic Kuthu","Butta Bomma"],
  sad:["Kesariya","Tum Hi Ho","Channa Mereya"],
  angry:["Hukum","Beast Mode","Believer"],
  neutral:["Lo-fi Chill","Night Drive","Rain Ambience"],
  smartSleep:["Soft Piano","Rain Sleep","Deep Relaxing"]
};

document.getElementById('scanBtn').onclick = openCameraAndScan;
document.getElementById('closeCam').onclick = stopCam;

async function openCameraAndScan(){
  cameraModal.style.display="flex";
  camStatus.textContent = "Opening camera…";
  try{
    stream = await navigator.mediaDevices.getUserMedia({video:true});
    camera.srcObject = stream;
  }catch(err){
    camStatus.textContent = "Camera blocked. Allow permissions.";
    return;
  }

  // Wait for video to be ready
  await new Promise(resolve => {
    if (camera.readyState >= 2) return resolve();
    camera.onloadedmetadata = ()=> resolve();
  });

  try{
    if(!modelsLoaded){
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      modelsLoaded = true;
    }
  }catch{
    camStatus.textContent = "Model load error.";
    return;
  }

  // small delay to ensure frame
  await new Promise(r => setTimeout(r, 200));
  scanOnce();
}

async function scanOnce(){
  camStatus.textContent = "Scanning expression…";
  try{
    const res = await faceapi
      .detectSingleFace(camera, new faceapi.TinyFaceDetectorOptions({inputSize:320, scoreThreshold:.5}))
      .withFaceExpressions();

    if(!res){ camStatus.textContent="No face detected. Come closer."; return; }

    let mood = Object.entries(res.expressions).sort((a,b)=>b[1]-a[1])[0][0];
    if(new Date().getHours() >= 23) mood = 'smartSleep';

    camStatus.textContent = `Mood: ${mood.toUpperCase()}`;

    const list = moodsMap[mood] || moodsMap.neutral;
    localStorage.setItem('mood_suggestions', JSON.stringify(list));

    // also seed recent
    const prev = JSON.parse(localStorage.getItem("recentSongs")||"[]");
    const merged = [...list, ...prev].slice(0,20);
    localStorage.setItem("recentSongs", JSON.stringify(merged));

    // If currently showing the Home Mood section, refresh it
    const activeCard = document.querySelector('.col-card.active');
    if(activeCard && activeCard.dataset.homeview === 'mood'){
      renderHomeMood();
    }

    stopCam();
  }catch{
    camStatus.textContent = "Scan failed.";
  }
}

function stopCam(){
  cameraModal.style.display = "none";
  if(stream){ stream.getTracks().forEach(t=>t.stop()); stream=null; }
}

/* ===== Profile ===== */
const profilePanel = document.getElementById('profilePanel');
document.getElementById('profileBtn').onclick = ()=> profilePanel.classList.add('open');
document.querySelector('.closeProfile').onclick = ()=> profilePanel.classList.remove('open');
const dpBox = document.getElementById('dpBox');
const dpUpload = document.getElementById('dpUpload');
dpBox.onclick=()=> dpUpload.click();
dpUpload.onchange = ()=> dpBox.innerHTML = `<img src="${URL.createObjectURL(dpUpload.files[0])}" style="width:100%;height:100%;border-radius:50%;">`;
document.getElementById('saveProfile').onclick = ()=>{
  const url = document.getElementById('bgInput').value.trim();
  if(url) document.getElementById('bgLayer').style.backgroundImage = `url("${url}")`;
  profilePanel.classList.remove('open');
};

/* ===== Seed: show neutral in Recent (left nav -> Songs) if nothing yet ===== */
if(!localStorage.getItem('recentSongs')){
  localStorage.setItem('recentSongs', JSON.stringify(["Lo-fi Chill","Night Drive","Rain Ambience"]));
}
