/* ── BUILD 14 CERT CARDS ── */
const CERTS = [
  {ic:'🏆', name:'Problem Solving (Intermediate)',         org:'HackerRank',                       yr:'January 2026', img:'one.jpeg'},
  {ic:'🤖', name:'Claude Code in Action',                 org:'Anthropic',                         yr:'February 2026', img:'two.jpeg'},
  {ic:'🤖', name:'Claude 101',                            org:'Anthropic',                         yr:'2026', img:'three.jpeg'},
  {ic:'📊', name:'Acquiring Data',                        org:'FutureSkills Prime — Nasscom (MeitY)', yr:'March 2026', img:'four.jpeg'},
  {ic:'💡', name:'1 Day AI Vibe Coding Workshop',         org:'EMC — Error Makes Clever',          yr:'February 2026', img:'five.jpeg'},
  {ic:'🧩', name:'Problem Solving (Basic)',               org:'HackerRank',                        yr:'December 2025', img:'six.jpeg'},
  {ic:'🌐', name:'Networking Basics',                     org:'Cisco Networking Academy',          yr:'December 2025', img:'seven.jpeg'},
  {ic:'🔌', name:'Networking Devices & Initial Config',   org:'Cisco Networking Academy',          yr:'December 2025', img:'eight.jpeg'},
  {ic:'📝', name:'C Programming For Beginners',           org:'ScholarHat',                        yr:'November 2025', img:'nine.jpeg'},
  {ic:'🐍', name:'Python (Basic)',                        org:'HackerRank',                        yr:'November 2025', img:'ten.jpeg'},
  {ic:'☁️', name:'Cloud Trio — Docker, Kubernetes & AWS', org:'CloudWeld & AWS',                   yr:'November 2025', img:'11.jpeg'},
  {ic:'💻', name:'C & C++ Programming Language',          org:'ITronix Solutions (ISO 9001:2015)', yr:'October 2025', img:'12.jpeg'},
  {ic:'📈', name:'Microsoft Advanced Excel',              org:'ITronix Solutions (ISO 9001:2015)', yr:'October 2025', img:'13.jpeg'},
  {ic:'🖥️', name:'Basic Computer Course',                 org:'BasicComputerCourse.in',            yr:'Score: 47 / 50', img:'14.jpeg'}
];
const stags = ['s1','s2','s3','s4','s5','s6'];
const grid = document.querySelector('#certifications .certs-grid');
CERTS.forEach((c, i) => {
  const s = stags[i % 6];
  const n = String(i+1).padStart(2,'0');
  grid.innerHTML += `
  <div class="cert-card ax from-zoom ${s}">
    <div class="cert-photo-slot" onclick="triggerUp(${i})">
      <div class="cert-num-badge">${n}</div>
      <img class="cert-photo-img loaded" id="ci${i}" src="${c.img || `cert${i+1}.jpeg`}" alt="${c.name}">
      <div class="upload-icon" style="display:none">${c.ic}</div>
      <div class="upload-hint" style="display:none">Click to upload<br>certificate photo</div>
      <div class="photo-overlay"><div class="overlay-lbl">🔄 Change Photo</div></div>
    </div>
    <input type="file" class="cert-file-input" id="cf${i}" accept="image/*" onchange="loadCert(${i})">
    <div class="cert-details">
      <span class="cert-ic">${c.ic}</span>
      <div>
        <div class="cert-name">${c.name}</div>
        <div class="cert-org">${c.org}</div>
        <div class="cert-yr">${c.yr}</div>
      </div>
    </div>
  </div>`;
});

/* ── PARTICLES ── */
const cv = document.getElementById('pc'), cx = cv.getContext('2d');
let W, H;
function rsz(){ W = cv.width = window.innerWidth; H = cv.height = window.innerHeight; }
rsz(); window.addEventListener('resize', rsz);
const pts = Array.from({length:70}, () => ({
  x: Math.random()*window.innerWidth, y: Math.random()*window.innerHeight,
  r: Math.random()*1.5+.3, dx: (Math.random()-.5)*.4, dy: -Math.random()*.5-.1, o: Math.random()*.5+.1
}));
(function draw(){
  cx.clearRect(0,0,W,H);
  pts.forEach(p => {
    cx.beginPath(); cx.arc(p.x,p.y,p.r,0,Math.PI*2);
    cx.fillStyle=`rgba(255,192,0,${p.o})`; cx.fill();
    p.x+=p.dx; p.y+=p.dy;
    if(p.y<-5){p.y=H+5;p.x=Math.random()*W;}
    if(p.x<0||p.x>W) p.dx*=-1;
  });
  requestAnimationFrame(draw);
})();

/* ── SCROLL PROGRESS ── */
const spb = document.getElementById('spb');

/* ── NAV ── */
const mainNav = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id], div[id="contact"]');

/* ── BIDIRECTIONAL ANIMATION ENGINE ── */
// Collect every .ax element with its initial position
const els = [];
document.querySelectorAll('.ax').forEach(el => {
  els.push({ el, visible: false, cgpaDone: false, countDone: false });
});
const secLines = document.querySelectorAll('.sec-line');

let prevScrollY = window.scrollY;
let rafPending = false;

function inView(el, enterMargin) {
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight;
  // Enter when top crosses 85% of viewport, exit when bottom goes above 5%
  return r.top < vh * (enterMargin || 0.88) && r.bottom > vh * 0.05;
}

function tick() {
  const sy = window.scrollY;
  const dh = document.documentElement.scrollHeight - window.innerHeight;

  // Scroll progress
  spb.style.width = (dh > 0 ? sy/dh*100 : 0) + '%';

  // Nav hide/show
  if (sy > prevScrollY + 4 && sy > 80) {
    mainNav.style.transform = 'translateY(-100%)';
  } else if (sy < prevScrollY - 4) {
    mainNav.style.transform = 'translateY(0)';
  }

  // Active nav link
  let cur = '';
  sections.forEach(s => { if (sy >= s.offsetTop - 160) cur = s.id; });
  navLinks.forEach(a => {
    if (a.getAttribute('href') === '#' + cur) a.classList.add('active');
    else a.classList.remove('active');
  });

  // Section gold lines
  secLines.forEach(sl => {
    const r = sl.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.8 && r.bottom > 0) sl.classList.add('line-on');
    else sl.classList.remove('line-on');
  });

  // Animate elements
  els.forEach(item => {
    const { el } = item;
    const inVP = inView(el);

    if (inVP && !item.visible) {
      // ENTER
      el.classList.remove('exit-top');
      void el.offsetWidth; // force reflow
      el.classList.add('in');
      item.visible = true;

      // CGPA bar
      if (!item.cgpaDone && el.id === 'eduCard') {
        item.cgpaDone = true;
        setTimeout(() => { document.getElementById('cgpaFill').style.width = '80%'; }, 400);
      }
      // Count-up
      if (!item.countDone) {
        el.querySelectorAll('[data-count]').forEach(ce => {
          item.countDone = true;
          countUp(ce);
        });
      }

    } else if (!inVP && item.visible) {
      // EXIT
      el.classList.remove('in');
      el.classList.add('exit-top');
      item.visible = false;

    } else if (!inVP && !item.visible) {
      // Reset below viewport — remove exit class so element is back in initial hidden state
      const r = el.getBoundingClientRect();
      if (r.top > window.innerHeight) {
        el.classList.remove('exit-top');
      }
    }
  });

  prevScrollY = sy;
  rafPending = false;
}

window.addEventListener('scroll', () => {
  if (!rafPending) { rafPending = true; requestAnimationFrame(tick); }
}, { passive: true });

// Fire on load to show hero + anything already in view
window.addEventListener('load', () => { tick(); });
tick();

/* ── COUNT UP ── */
function countUp(el) {
  const target = +el.dataset.count;
  let n = 0;
  const step = Math.max(1, Math.ceil(target/40));
  const t = setInterval(() => {
    n = Math.min(n+step, target);
    el.textContent = n;
    if (n >= target) clearInterval(t);
  }, 38);
}

/* ── DOMAIN TICKER ── */
const DOMAINS = ["Frontend Developer","AI / ML Engineer","Cloud Engineer","Full Stack Developer",
  "Data Analyst","Cybersecurity Analyst","DevOps Engineer","Game Developer","Prompt Engineer","IT Support Engineer"];
let di = 0;
const dw = document.getElementById('dWord');
setInterval(() => {
  di = (di+1) % DOMAINS.length;
  dw.style.animation = 'none'; void dw.offsetWidth;
  dw.textContent = DOMAINS[di]; dw.style.animation = 'slideUp .45s ease';
}, 1800);

/* ── PROFILE PHOTO ── */
document.getElementById('profInput').addEventListener('change', e => {
  const f = e.target.files[0]; if(!f) return;
  const r = new FileReader();
  r.onload = ev => {
    const img = document.getElementById('myPhoto'), fb = document.getElementById('fallback');
    img.src = ev.target.result; img.style.display = 'block'; fb.style.display = 'none';
  };
  r.readAsDataURL(f);
});

/* ── CERT PHOTO UPLOAD ── */
function triggerUp(n) { document.getElementById('cf'+n).click(); }
function loadCert(n) {
  const f = document.getElementById('cf'+n).files[0]; if(!f) return;
  const r = new FileReader();
  r.onload = ev => {
    const img = document.getElementById('ci'+n);
    img.src = ev.target.result; img.classList.add('loaded');
    const slot = img.parentElement;
    slot.querySelector('.upload-icon').style.display = 'none';
    slot.querySelector('.upload-hint').style.display = 'none';
    slot.querySelector('.photo-overlay').style.display = 'flex';
  };
  r.readAsDataURL(f);
}

/* ── CUSTOM CURSOR ── */
const cd=document.querySelector('[data-cursor-dot]'), co=document.querySelector('[data-cursor-outline]');
let magnetEl = null;

window.addEventListener('mousemove', e=>{
  const x=e.clientX, y=e.clientY;
  cd.style.left=`${x}px`; cd.style.top=`${y}px`;
  if(magnetEl){
    const r = magnetEl.getBoundingClientRect();
    const cx = r.left + r.width/2, cy = r.top + r.height/2;
    co.style.left = `${cx + (x-cx)*0.3}px`; co.style.top = `${cy + (y-cy)*0.3}px`;
  } else {
    co.style.left=`${x}px`; co.style.top=`${y}px`;
  }
});
document.querySelectorAll('a,button,input,textarea,.cert-photo-slot,.c-row,.sk-cat,.proj-card,.stat,.dom-card,.edu-card,.str-card,.c-chip').forEach(el=>{
  el.addEventListener('mouseenter', ()=>{
    document.body.classList.add('hover-active');
    if(el.matches('a,button,.cert-photo-slot,.c-chip,.btn-p,.btn-o')){
      magnetEl = el;
      const r = el.getBoundingClientRect();
      co.style.width=`${r.width}px`; co.style.height=`${r.height}px`; co.style.borderRadius=getComputedStyle(el).borderRadius;
    }
  });
  el.addEventListener('mouseleave', ()=>{
    document.body.classList.remove('hover-active');
    if(el===magnetEl){
      magnetEl=null; co.style.width=''; co.style.height=''; co.style.borderRadius='';
    }
  });
});