function mobToggle(){var s=document.querySelector('.sidebar'),o=document.getElementById('mobOv');s.classList.toggle('mob-open');o.classList.toggle('mob-open');}
function mobClose(){var s=document.querySelector('.sidebar'),o=document.getElementById('mobOv');if(s)s.classList.remove('mob-open');if(o)o.classList.remove('mob-open');}
function checkPin(){var v=document.getElementById('lock-pin').value;if(v==='1234'){document.getElementById('lock-err').textContent='';document.getElementById('lock-step1').classList.add('lock-fade');document.getElementById('lock-step2').classList.remove('lock-fade');setTimeout
const onboardingSteps=[
  {page:'dashboard',title:'Welkom op uw dashboard',body:'Hier ziet u direct de belangrijkste KPI’s, deadlines en meldingen. Start elke werkdag in dit overzicht.'},
  {page:'rapport',title:'1. Rapport Schrijver',body:'Vul projectcontext in en laat automatisch een eerste rapportversie genereren. Ideaal als start voor intern review.'},
  {page:'excel',title:'2. Excel Assistent',body:'Upload of plak een berekening. Het platform detecteert ontbrekende waarden en stelt direct een compleet resultaat voor.'},
  {page:'beng',title:'3. BENG Checker',body:'Controleer binnen enkele seconden of het ontwerp voldoet aan BENG 1, 2 en 3 en zie waar nog ruimte voor optimalisatie zit.'},
  {page:'kennis',title:'4. Kennisbank',body:'Zoek in eerdere projecten en hergebruik beproefde oplossingen. Zo werkt u sneller en consistenter over teams heen.'}
];
let onboardingIndex=0;
function onboardingStorageKey(){return 'platform_intro_seen_'+location.pathname;}
function openOnboarding(force){
  const seen=localStorage.getItem(onboardingStorageKey())==='1';
  if(!force&&seen)return;
  onboardingIndex=0;
  renderOnboardingStep();
  document.getElementById('introOv').classList.add('show');
  document.getElementById('introOv').setAttribute('aria-hidden','false');
}
function closeOnboarding(markSeen){
  const ov=document.getElementById('introOv');
  if(!ov)return;
  ov.classList.remove('show');
  ov.setAttribute('aria-hidden','true');
  if(markSeen)localStorage.setItem(onboardingStorageKey(),'1');
}
function onboardingPrev(){if(onboardingIndex>0){onboardingIndex--;renderOnboardingStep();}}
function onboardingNext(){
  if(onboardingIndex>=onboardingSteps.length-1){closeOnboarding(true);return;}
  onboardingIndex++;
  renderOnboardingStep();
}
function renderOnboardingStep(){
  const step=onboardingSteps[onboardingIndex];
  const title=document.getElementById('introTitle');
  const body=document.getElementById('introBody');
  const stepLabel=document.getElementById('introStepLabel');
  const prev=document.getElementById('introPrev');
  const next=document.getElementById('introNext');
  const dots=document.getElementById('introDots');
  const bar=document.getElementById('introProgressBar');
  if(!title||!body)return;
  title.textContent=step.title;
  body.textContent=step.body;
  stepLabel.textContent='Stap '+(onboardingIndex+1)+' van '+onboardingSteps.length;
  prev.disabled=onboardingIndex===0;
  prev.style.opacity=onboardingIndex===0?'.45':'1';
  next.textContent=onboardingIndex===onboardingSteps.length-1?'Afronden ✓':'Volgende →';
  bar.style.width=((onboardingIndex+1)/onboardingSteps.length*100)+'%';
  dots.innerHTML=onboardingSteps.map((_,i)=>'<span class="intro-dot '+(i===onboardingIndex?'active':'')+'"></span>').join('');
  const nav=document.querySelector(`.nav-item[onclick*="'${step.page}'"]`);
  show(step.page,nav);
}
window.addEventListener('DOMContentLoaded',function(){
  const ov=document.getElementById('introOv');
  if(ov){ov.addEventListener('click',function(e){if(e.target===ov)closeOnboarding(false);});}
  setTimeout(function(){openOnboarding(false);},550);
});

(function(){document.getElementById('lock-otp').focus();},100);}else{document.getElementById('lock-err').textContent='Onjuiste code. Probeer opnieuw.';document.getElementById('lock-pin').value='';}}
function checkOtp(){var v=document.getElementById('lock-otp').value.replace(/\D/g,'');if(v.length>=6){var e=document.getElementById('lock-otp-err');e.style.color='#2A9D5C';e.textContent='Verificatie geslaagd...';setTimeout(function(){var ls=document.getElementById('lockScreen');ls.classList.add('ls-out');setTimeout(function(){ls.style.display='none';},420);},900);}else{document.getElementById('lock-otp-err').textContent='Voer 6 cijfers in.';}}
var _demoTimer;function demoNotice(){var t=document.getElementById('demoToast');t.classList.add('dt-show');clearTimeout(_demoTimer);_demoTimer=setTimeout(function(){t.classList.remove('dt-show');},3500);}
document.addEventListener('click',function(e){var b=e.target.closest('button');if(b&&!b.getAttribute('onclick')&&!b.closest('.lock-card')&&!b.classList.contains('mob-toggle')){demoNotice();}});
const titles={dashboard:'Dashboard',rapport:'Rapport Schrijver',excel:'Excel Assistent',beng:'BENG Checker',normen:'Norm Monitor',kennis:'Kennisbank',concept:'Concept Generator',variant:'Variant Vergelijker',wkb:'WKB Dossier Builder'};

function show(id,el){
  mobClose();
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  if(el)el.classList.add('active');
  document.getElementById('ptitle').textContent=titles[id]||id;
  if(id==='kennis')searchKB();
}

function selRT(el){
  document.querySelectorAll('.rt-btn').forEach(b=>b.classList.remove('sel'));
  el.classList.add('sel');
}

function exportRapportPdf(){
  const out=document.getElementById('rp-out');
  if(!out)return;
  const logoMain=(document.querySelector('.logo-text')||{}).textContent||'MEP';
  const logoSub=(document.querySelector('.logo-sub')||{}).textContent||'Digitaal Platform';
  const reportType=((document.querySelector('.rt-btn.sel .rt-title')||{}).textContent||'Rapport').trim();
  const projectField=document.querySelector('#page-rapport input.inp');
  const projectName=projectField&&projectField.value?projectField.value.trim():'Project';
  const today=new Date().toLocaleDateString('nl-NL',{day:'2-digit',month:'long',year:'numeric'});
  const pdfWindow=window.open('','_blank');
  if(!pdfWindow){alert('Sta pop-ups toe om PDF export te starten.');return;}
  pdfWindow.document.write(`<!doctype html><html lang="nl"><head><meta charset="utf-8"><title>${reportType} - ${projectName}</title><link rel="stylesheet" href="styles.css"><style>body{font-family:inherit;background:#fff;margin:0;color:#1f2937}.pdf-shell{max-width:860px;margin:24px auto;border:1px solid var(--border,#d8dde5);border-radius:14px;overflow:hidden}.pdf-head{padding:24px 28px;background:var(--teal-light,var(--bg,#f4f7fb));border-bottom:1px solid var(--border,#d8dde5)}.pdf-brand{font-size:12px;color:var(--soft,#6b7280);text-transform:uppercase;letter-spacing:.08em}.pdf-title{font-size:26px;margin:8px 0 4px;font-weight:700;color:var(--text,#111827)}.pdf-meta{font-size:12px;color:var(--mid,#4b5563)}.pdf-body{padding:24px 28px;font-size:13px;line-height:1.7}.pdf-foot{padding:14px 28px;border-top:1px solid var(--border,#d8dde5);font-size:11px;color:var(--soft,#6b7280)}@media print{body{background:#fff}.pdf-shell{border:none;margin:0;max-width:none;border-radius:0}.pdf-body{font-size:12px}button{display:none}}</style></head><body><article class="pdf-shell"><header class="pdf-head"><div class="pdf-brand">${logoMain} ${logoSub ? '· '+logoSub : ''}</div><h1 class="pdf-title">${reportType} — ${projectName}</h1><div class="pdf-meta">Gegenereerd op ${today} via ${logoMain} Digitaal Platform</div></header><section class="pdf-body">${out.innerHTML}</section><footer class="pdf-foot">Dit rapport is automatisch gegenereerd op basis van de geselecteerde template en actuele projectgegevens.</footer></article></body></html>`);
  pdfWindow.document.close();
  pdfWindow.focus();
  setTimeout(()=>pdfWindow.print(),280);
}
function genRapport(){
  const bar=document.getElementById('rpbar'),lbl=document.getElementById('rp-lbl'),prog=document.getElementById('rp-prog'),out=document.getElementById('rp-out'),acts=document.getElementById('rp-acts');
  prog.style.display='block';acts.style.display='none';
  out.innerHTML='<span style="color:var(--soft)">Rapport wordt opgesteld...</span>';
  const steps=[
    [12,'Projectgegevens verwerken...'],
    [28,'DVTadvies-templates laden...'],
    [45,'NTA 8800 normen toepassen...'],
    [62,'CO₂-berekening uitvoeren...'],
    [78,'DUMAVA haalbaarheid analyseren...'],
    [92,'Rapport opmaken in Dutch...'],
    [100,'Rapport gereed!']
  ];
  let i=0;
  const run=()=>{
    if(i<steps.length){
      bar.style.width=steps[i][0]+'%';
      lbl.textContent=steps[i][1];
      i++;
      setTimeout(run,420);
    } else {
      prog.style.display='none';
      acts.style.display='flex';
      acts.innerHTML='<button class="btn btn-primary btn-sm">⬇ Download .docx</button><button class="btn btn-outline btn-sm" onclick="exportRapportPdf()">⬇ Download PDF</button><button class="btn btn-outline btn-sm">✏ Bewerk</button><button class="btn btn-outline btn-sm">📤 Verstuur naar klant</button>';
      out.innerHTML=`<strong style="color:var(--forest);font-family:'Raleway',sans-serif;font-size:14px;">Duurzaamheidsscan — Papendorp-Noord</strong><br><br><strong>Opdrachtgever:</strong> Amvest Vastgoed BV<br><strong>Adviseur:</strong> D. van Tienen · DVTadvies · 21 april 2026<br><br><strong>1. Gebouwomschrijving</strong><br>Kantoorcomplex Papendorp-Noord, bouwjaar 1997, 4.200 m² BVO verdeeld over 3 bouwlagen. Huidig energielabel C. Gasgestookte HR-ketels, geen hernieuwbare energie aanwezig.<br><br><strong>2. Energieprestatie nulmeting</strong><br>Huidig primair energiegebruik: <strong>187 kWh/m²/jr</strong>. CO₂-emissie gebouwgebonden: 38,4 ton/jr. Paris Proof target 2030: 55 kWh/m²/jr — <span style="color:var(--red)">niet gehaald</span>.<br><br><strong>3. Maatregelplan naar label A</strong><br>• Lucht-water warmtepomp (COP 3,9) — vervanging gasketels<br>• PV installatie 64 kWp dakoppervlak<br>• Gevelisolatie Rc 4,5 m²K/W<br>• WTW ventilatie η=88%<br><br><strong>4. CO₂-reductie &amp; financieel</strong><br>Verwachte CO₂-reductie: <strong style="color:var(--green)">74%</strong> · van 38,4 t naar 10,1 t/jr.<br>Energielabel na maatregelen: <strong style="color:var(--green)">A+</strong><br>Investeringskosten: ca. €485.000 · Terugverdientijd: 7,2 jaar.<br><br><strong>5. DUMAVA subsidie</strong><br>Geschatte DUMAVA subsidie: <strong style="color:var(--green)">€112.000</strong> (23% van subsidiabele kosten).<br><br><em style="color:var(--soft);font-size:11px;">Gegenereerd door DVTadvies Digitaal Platform · NTA 8800:2026 · DUMAVA 2026 · Paris Proof 2030</em>
<button class="expl-btn" onclick="toggleExplain('ep-rapport')">▶ Waarom is dit correct?</button>
<div class="expl-pan" id="ep-rapport"><strong>Normen &amp; bronnen:</strong><br>• <strong>NTA 8800:2026</strong> — Bepalingsmethode energieprestatie gebouwen, bijlage C: standaardwaarden installaties<br>• <strong>DUMAVA 2026</strong> — Subsidieregeling verduurzaming utiliteitsbouw, art. 4.1: subsidiabele maatregelen en percentages<br>• <strong>Paris Proof 2030</strong> (DGBC) — Sectorale doelstelling kantoren 55 kWh/m²/jr<br>• <strong>Bbl art. 5.2</strong> — Energieprestatie-eis bij renovatie, formule Rc ≥ 3,5 m²K/W<br><br><strong>Formule EP-reductie:</strong> EP_nieuw = EP_huidig × (1 − η_wp × f_wp) − E_pv/A<br><strong>Aannames:</strong> COP warmtepomp 3,9 conform fabrieksspec, PV-opbrengst 900 kWh/kWp/jr Utrecht, η WTW = 88%.</div>`;
    }
  };
  run();
}

function loadXLS(){
  document.getElementById('xls-body').innerHTML=`<div style="margin-bottom:10px;font-size:12px;color:var(--soft);">📂 energielabel_berekening.xlsx geladen</div>
  <div class="xls-preview">
    <div class="xrow xhead"><div class="xcell">Onderdeel</div><div class="xcell">Opp. m²</div><div class="xcell">EP-waarde</div><div class="xcell">Weging</div><div class="xcell">Bijdrage EP</div></div>
    <div class="xrow"><div class="xcell">Verwarming</div><div class="xcell">4200</div><div class="xcell">0.82</div><div class="xcell">0.30</div><div class="xcell">0.246</div></div>
    <div class="xrow"><div class="xcell">Koeling</div><div class="xcell">4200</div><div class="xcell">0.14</div><div class="xcell">0.15</div><div class="xcell">0.021</div></div>
    <div class="xrow"><div class="xcell">Warm tapwater</div><div class="xcell">4200</div><div class="xcell" style="color:var(--amber);font-weight:700;">?</div><div class="xcell">0.10</div><div class="xcell" style="color:var(--amber);">—</div></div>
    <div class="xrow"><div class="xcell">Verlichting</div><div class="xcell">4200</div><div class="xcell" style="color:var(--amber);font-weight:700;">?</div><div class="xcell">0.20</div><div class="xcell" style="color:var(--amber);">—</div></div>
    <div class="xrow"><div class="xcell">Hulpenergie</div><div class="xcell">4200</div><div class="xcell">0.05</div><div class="xcell">0.10</div><div class="xcell">0.005</div></div>
  </div>
  <div style="margin-bottom:10px;"><span class="ai-chip">🌿 Gedetecteerd: 2 ontbrekende EP-waarden</span></div>
  <button class="btn btn-primary btn-sm" onclick="procXLS()">🌿 Verwerk automatisch</button>`;
}

function procXLS(){
  const b=document.getElementById('xls-body');
  b.innerHTML='<div class="prog-wrap"><div class="prog-bar" id="xpbar" style="width:0%"></div></div><div style="font-size:11px;color:var(--mid);margin-top:4px;">NTA 8800 standaardwaarden opzoeken...</div>';
  let w=0;
  const iv=setInterval(()=>{
    w+=8;
    const bar=document.getElementById('xpbar');
    if(bar)bar.style.width=w+'%';
    if(w>=100){
      clearInterval(iv);
      b.innerHTML=`<div style="margin-bottom:8px;"><span class="ai-chip">🌿 2 waarden ingevuld · EP-totaal berekend</span></div>
      <div class="xls-preview">
        <div class="xrow xhead"><div class="xcell">Onderdeel</div><div class="xcell">Opp. m²</div><div class="xcell">EP-waarde</div><div class="xcell">Weging</div><div class="xcell">Bijdrage EP</div></div>
        <div class="xrow"><div class="xcell">Verwarming</div><div class="xcell">4200</div><div class="xcell">0.82</div><div class="xcell">0.30</div><div class="xcell">0.246</div></div>
        <div class="xrow"><div class="xcell">Koeling</div><div class="xcell">4200</div><div class="xcell">0.14</div><div class="xcell">0.15</div><div class="xcell">0.021</div></div>
        <div class="xrow"><div class="xcell">Warm tapwater</div><div class="xcell">4200</div><div class="xcell xai">0.17 🌿</div><div class="xcell">0.10</div><div class="xcell xai">0.017 🌿</div></div>
        <div class="xrow"><div class="xcell">Verlichting</div><div class="xcell">4200</div><div class="xcell xai">0.28 🌿</div><div class="xcell">0.20</div><div class="xcell xai">0.056 🌿</div></div>
        <div class="xrow"><div class="xcell">Hulpenergie</div><div class="xcell">4200</div><div class="xcell">0.05</div><div class="xcell">0.10</div><div class="xcell">0.005</div></div>
        <div class="xrow" style="background:var(--forest-light);font-weight:700;"><div class="xcell">EP-TOTAAL</div><div class="xcell">—</div><div class="xcell">—</div><div class="xcell">—</div><div class="xcell xai">1.345 🌿</div></div>
      </div>
      <div style="background:var(--forest-light);border-radius:8px;padding:12px;font-size:12px;color:var(--forest);margin-top:8px;">
        <strong>Conclusie:</strong> EP-waarde 1,345 correspondeert met <strong>Energielabel C</strong>. Na geplande maatregelen (warmtepomp + PV + isolatie) daalt de EP naar <strong style="color:var(--green);">0,61 → Label A</strong>. CO₂-reductie: geschat <strong>74%</strong>.
      </div>
      <div style="margin-top:10px;display:flex;gap:8px;">
        <button class="btn btn-primary btn-sm">⬇ Download Excel</button>
        <button class="btn btn-outline btn-sm">📄 Naar rapport</button>
      </div>
      <button class="expl-btn" onclick="toggleExplain('ep-excel')">▶ Waarom is dit correct?</button>
      <div class="expl-pan" id="ep-excel"><strong>Normen &amp; bronnen:</strong><br>• <strong>NTA 8800:2026 tabel 9</strong> — Standaardwaarden EP per functie (warm tapwater kantoor: 0,17; verlichting: 0,28)<br>• <strong>NEN 2916:2004</strong> — Energieprestatienorm utiliteitsbouw, weegfactoren per functie<br>• <strong>Bbl art. 5.3</strong> — Berekening energieprestatie bestaande bouw via EP-methode<br><br><strong>Formule EP-totaal:</strong> EP = Σ(EP_i × w_i) waarbij w_i de weegfactor per deelfunctie is conform NTA 8800 bijlage A.<br><strong>Aanname:</strong> ontbrekende waarden vervangen door NTA 8800 standaardwaarden voor kantoorgebouwen bouwjaar 1990–2005.</div>`;
    }
  },100);
}

function checkBENG(){
  const b=document.getElementById('beng-body');
  b.innerHTML='<div class="prog-wrap"><div class="prog-bar" id="bpbar" style="width:0%"></div></div><div style="font-size:11px;color:var(--mid);margin-top:4px;">NTA 8800 berekening uitvoeren...</div>';
  let w=0;
  const iv=setInterval(()=>{
    w+=10;
    const bar=document.getElementById('bpbar');
    if(bar)bar.style.width=w+'%';
    if(w>=100){
      clearInterval(iv);
      b.innerHTML=`<div class="brc">
        <div class="brow"><div style="font-size:12px;color:var(--mid)">BENG 1 — Energiebehoefte</div><div style="font-size:13px;font-weight:700;color:var(--green)">48 kWh/m²/jr ✓</div></div>
        <div class="brow"><div style="font-size:11px;color:var(--soft)">Eis bestaande bouw (kantoor)</div><div style="font-size:11px;color:var(--mid)">≤ 50 kWh/m²/jr</div></div>
        <div class="brow" style="padding-top:4px;"><div style="font-size:11px;color:var(--mid)">Huidig (voor maatregelen)</div><div style="font-size:11px;color:var(--red);font-weight:700;">187 kWh/m²/jr ✗</div></div>
      </div>
      <div class="brc">
        <div class="brow"><div style="font-size:12px;color:var(--mid)">BENG 2 — Primair fossiel</div><div style="font-size:13px;font-weight:700;color:var(--green)">29 kWh/m²/jr ✓</div></div>
        <div class="brow"><div style="font-size:11px;color:var(--soft)">Eis (2027 kantoren)</div><div style="font-size:11px;color:var(--mid)">≤ 30 kWh/m²/jr</div></div>
      </div>
      <div class="brc">
        <div class="brow"><div style="font-size:12px;color:var(--mid)">BENG 3 — Hernieuwbaar aandeel</div><div style="font-size:13px;font-weight:700;color:var(--green)">71% ✓</div></div>
        <div class="brow"><div style="font-size:11px;color:var(--soft)">Eis</div><div style="font-size:11px;color:var(--mid)">≥ 50%</div></div>
      </div>
      <div style="background:var(--forest-light);border-radius:8px;padding:12px;margin-top:4px;">
        <div style="font-size:13px;font-weight:700;color:var(--forest);">✓ Alle BENG indicatoren gehaald na renovatie</div>
        <div style="font-size:11px;color:var(--mid);margin-top:4px;">Verwacht energielabel na maatregelen: <strong style="color:var(--green)">A+</strong>. DUMAVA subsidiabel. Kwalificeert voor Paris Proof 2030 traject.</div>
      </div>
      <div style="margin-top:10px;display:flex;gap:8px;">
        <button class="btn btn-primary btn-sm">📄 Genereer Energielabel Rapport</button>
        <button class="btn btn-outline btn-sm">⬇ PDF</button>
      </div>
      <button class="expl-btn" onclick="toggleExplain('ep-beng')">▶ Waarom is dit correct?</button>
      <div class="expl-pan" id="ep-beng"><strong>Normen &amp; bronnen:</strong><br>• <strong>BENG 1</strong> — Energiebehoefte: NTA 8800:2026 §6.3, eis bestaande kantoren ≤ 50 kWh/m²/jr (Bbl bijlage I)<br>• <strong>BENG 2</strong> — Primair fossiel energiegebruik: NTA 8800 §6.4, eis kantoren 2027 ≤ 30 kWh/m²/jr<br>• <strong>BENG 3</strong> — Hernieuwbaar aandeel: berekend als E_hernieuwbaar / E_totaal_primair × 100%, eis ≥ 50%<br><br><strong>Formule BENG 1:</strong> Q_netto = (Q_trans + Q_vent − Q_intern − Q_zon) × f_gc conform NEN-EN ISO 13790<br><strong>Aanname:</strong> WP COP 3,9 jaargemiddeld, PV-opbrengst 875 kWh/kWp/jr, η WTW = 88% conform NTA 8800 tabel B.12.</div>`;
    }
  },100);
}

const kbData=[
  {title:'Energielabel A+ traject wooncomplex Overvecht Utrecht',meta:'Woningbouw · 2024 · 8.200 m² · Utrecht',snip:'NTA 8800 berekening, warmtepomp, PV 88 kWp, gevelisolatie Rc 4,5. Energielabel van D naar A+. DUMAVA subsidie €94.000 verkregen.',score:98,
   cmp:{type:'Wooncomplex',m2:'8.200',tech:'Warmtepomp + PV 88 kWp + Rc 4,5',beng2:'26 kWh/m²/jr',saving:'71%',reuse:'Gevelisolatie aanpak + DUMAVA dossier herbruikbaar'}},
  {title:'DUMAVA subsidieaanvraag kantoor Leidsche Rijn',meta:'Kantoor · 2025 · 3.600 m² · Utrecht',snip:'Complete DUMAVA dossier: subsidiabele kosten €380.000, toegekend €87.400. Warmtepomp + PV + bouwkundige maatregelen. Paris Proof 2030 gehaald.',score:94,
   cmp:{type:'Kantoor',m2:'3.600',tech:'Warmtepomp + PV 48 kWp + WTW',beng2:'29 kWh/m²/jr',saving:'68%',reuse:'DUMAVA aanvraagstructuur volledig herbruikbaar'}},
  {title:'CO₂-routekaart wijk Hoograven Den Haag',meta:'Gemengd wonen · 2023 · 340 woningen · Den Haag',snip:'Wijkgerichte aanpak klimaatneutraliteit 2035. Warmtenet aansluiting, hybride warmtepomp, collectieve PV. CO₂-reductie 68% gerealiseerd.',score:89,
   cmp:{type:'Woonwijk',m2:'28.900 (340 won.)',tech:'Warmtenet + hybride WP + collectieve PV',beng2:'31 kWh/m²/jr',saving:'68%',reuse:'Wijkmaatwerk aanpak en monitoring KPI\'s herbruikbaar'}},
  {title:'Circulaire renovatie schoolgebouw Amersfoort',meta:'Onderwijs · 2024 · 2.800 m² · Amersfoort',snip:'Materiaalpasspoort opgesteld, 74% materiaalhergebruik, energielabel G naar A. Bbl circulaire sloopmelding toegepast. Frisse Scholen klasse B behaald.',score:85,
   cmp:{type:'School',m2:'2.800',tech:'HR++ glas + PV 32 kWp + WTW Frisse Scholen',beng2:'34 kWh/m²/jr',saving:'62%',reuse:'Materiaalpasspoort template + Frisse Scholen checklist herbruikbaar'}},
];

function searchKB(){
  const q=document.getElementById('kb-q').value;
  document.getElementById('kb-meta').textContent=kbData.length+` resultaten voor "${q}" — gesorteerd op relevantie`;
  document.getElementById('kb-results').innerHTML=kbData.map((k,i)=>`<div class="kb-item"><span class="match">${k.score}% match</span><div class="kb-title">${k.title}</div><div class="kb-meta">${k.meta}</div><div class="kb-snip">${k.snip}</div>
<button class="cmp-btn" onclick="showCompare(${i})">◎ Vergelijk met huidig project</button>
<div class="cmp-pan" id="cmp-${i}">
  <div class="cmp-row"><span class="cmp-key">Type</span><span class="cmp-val">${k.cmp.type}</span></div>
  <div class="cmp-row"><span class="cmp-key">Projectomvang</span><span class="cmp-val">${k.cmp.m2} m²</span></div>
  <div class="cmp-row"><span class="cmp-key">Techniek</span><span class="cmp-val">${k.cmp.tech}</span></div>
  <div class="cmp-row"><span class="cmp-key">BENG 2 uitkomst</span><span class="cmp-val">${k.cmp.beng2}</span></div>
  <div class="cmp-row"><span class="cmp-key">CO₂-besparing</span><span class="cmp-val">${k.cmp.saving}</span></div>
  <div class="cmp-row"><span class="cmp-key">Herbruikbare aanpak</span><span class="cmp-val" style="font-size:11px;">${k.cmp.reuse}</span></div>
</div></div>`).join('');
}

function qaAnalyse(){
  const issues=[
    {level:'h',title:'Papendorp-Noord: EP-invoer onvolledig',sub:'Verlichtingsvermogen (W/m²) ontbreekt — NTA 8800 standaardwaarde toegepast. Valideer met actuele installatielijst.'},
    {level:'h',title:'DUMAVA deadline Leidsche Rijn: 9 dagen resterend',sub:'Aanvraagdeadline 30 apr 2026 nadert. Dossier is nog in review-status. Actie vereist voor indiening.'},
    {level:'m',title:'Overvecht: COP-aanname warmtepomp niet gedocumenteerd',sub:'COP 3,9 toegepast als gemiddelde, maar geen meting of fabricagespec aanwezig in projectdossier.'},
    {level:'m',title:'Lombok: bouwjaargegevens niet geverifieerd',sub:'Bouwjaar 1973 uit kadaster — EPcalculatie gevoelig voor jaar. Advies: verifieer via originele omgevingsvergunning.'},
    {level:'l',title:'Transwijk: materiaalpasspoort nog niet gestart',sub:'Circulaire sloopmelding deadline juli 2026. Materiaalpasspoort fase 0 aanbevolen vóór 1 juni voor buffer.'},
    {level:'l',title:'Papendorp-Noord: PV-opbrengst aanname conservatief',sub:'900 kWh/kWp/jr gebruikt. PVGIS 2024 toont 952 kWh/kWp/jr voor Utrecht. Kleine positieve marge beschikbaar.'},
  ];
  const score=62;
  const sc=score<60?'qa-score-err':score<80?'qa-score-warn':'qa-score-ok';
  document.getElementById('qa-badge-wrap').innerHTML=`<div class="qa-badge ${sc}">QA Score: ${score}/100 — ${score<60?'Kritieke aandachtspunten':score<80?'Verbeteringen aanbevolen':'Goed'}</div>`;
  document.getElementById('qa-list').innerHTML=issues.map(it=>`<div class="qa-item qa-item-${it.level}"><div class="qa-risk qa-risk-${it.level}">${it.level==='h'?'● Hoog':it.level==='m'?'● Middel':'● Laag'}</div><div class="qa-ititle">${it.title}</div><div class="qa-isub">${it.sub}</div></div>`).join('');
  document.getElementById('qaOv').classList.add('show');
}

function closeQA(){document.getElementById('qaOv').classList.remove('show');}

function toggleExplain(id){
  const el=document.getElementById(id);if(!el)return;
  el.classList.toggle('show');
  const btn=el.previousElementSibling;
  if(btn&&btn.classList.contains('expl-btn'))btn.innerHTML=el.classList.contains('show')?'▲ Verberg uitleg':'▶ Waarom is dit correct?';
}

function showCompare(idx){const el=document.getElementById('cmp-'+idx);if(el)el.classList.toggle('show');}

const cgConcepts={
  'Kantoor':[
    {name:'All-electric kantoor — WKO + WP + PV',desc:'Warmte-koudeopslag gekoppeld aan reversibele warmtepomp. Dak volledig benut met PV. Toekomstbestendig en DUMAVA-subsidiabel.',pros:['BENG 2 ruim onder 30 kWh/m²/jr','Hoge DUMAVA subsidie (tot 30%)','Paris Proof 2030 haalbaar'],cons:['Hoge investeringskosten (€120–180/m²)','WKO vereist grondwatervergunning']},
    {name:'Hybride systeem — HR-ketel + WP + PV',desc:'Overgangsoplossing met hybride warmtepomp als aanvulling op bestaande ketel. Lagere investering, snelle terugverdientijd.',pros:['Lage instapkosten (€55–85/m²)','Snel uitvoerbaar','Gedeeltelijk DUMAVA subsidiabel'],cons:['BENG 2 grens 30 kWh/m²/jr lastiger haalbaar','Fossiele afhankelijkheid blijft deels']}
  ],
  'Woning':[
    {name:'Warmtepomp (bodem) + PV + triple glas',desc:'Bodemwarmtepomp als primaire warmtebron, aangevuld met PV-systeem. Hoge comfortniveau en toekomstbestendige installatie.',pros:['Energielabel A++ haalbaar','Lage energierekening gebruiker','Goed voor verhuurverplichting 2030'],cons:['Hoge initiële investering','Voldoende dakoppervlak nodig voor PV']},
    {name:'Hybride warmtepomp + zonnecollector',desc:'Lucht-water hybride warmtepomp gecombineerd met zonnecollector voor tapwater. Flexibele en kostenefficiënte aanpak.',pros:['Lagere investering dan volledig elektrisch','Bruikbaar bij gaskookpunt-omgeving','Subsidie via ISDE mogelijk'],cons:['Iets lagere CO₂-reductie dan all-electric','Onderhoud twee systemen']}
  ],
  'Zorggebouw':[
    {name:'Warmtenet aansluiting + PV + WTW',desc:'Collectieve warmtelevering via stadsnet of buurt-WKO. Ideaal voor zorggebouwen met 24/7 warmtebehoefte en hoog tapwaterverbruik.',pros:['Geen onderhoud eigen installatie','Stabiele energiekosten','BENG 2 goed haalbaar'],cons:['Afhankelijk van netbeschikbaarheid','Lagere eigen sturing energieverbruik']},
    {name:'WKO + absorptiewarmtepomp + PV',desc:'Eigen WKO-systeem met absorptiewarmtepomp geschikt voor hoog warmtapwaterverbruik in zorgfuncties. Maximale duurzaamheidsscore.',pros:['Maximale CO₂-reductie','Onafhankelijk van warmtenet','GPR Gebouw score > 8 haalbaar'],cons:['Complexe installatie, hoge CAPEX','Grondwatervergunning verplicht']}
  ],
  'School':[
    {name:'Frisse Scholen klasse A — WTW + WP + PV',desc:'Volledig elektrisch concept met hoog-rendement WTW-ventilatie voor Frisse Scholen klasse A. PV op schooldak, warmtepomp voor verwarming.',pros:['Frisse Scholen klasse A haalbaar','Gezond binnenklimaat leerlingen','DUMAVA + IKC subsidie combineerbaar'],cons:['Dakoppervlak intensief gebruik','Inregeling ventilatie vraagt expertise']},
    {name:'Hybride aanpak — bestaande bouw',desc:'Renovatie-eerste aanpak: isolatie upgraden, HR++ glas, hybride warmtepomp en WTW. Gefaseerd uitvoerbaar per schoolvakantie.',pros:['Minimale schoolonderbreking','Lagere kosten per fase','Energielabel C → A in 2 fasen'],cons:['Langere terugverdientijd totaal','Frisse Scholen klasse B maximaal in fase 1']}
  ],
  'Logistiek':[
    {name:'PV-dak + luchtbehandeling + LED',desc:'Grootschalig PV-systeem op logistiek dak (groot dakoppervlak beschikbaar), efficiënte luchtbehandeling en LED-armaturen.',pros:['PV-opbrengst zeer hoog door groot dakoppervlak','Energieneutraal of leverend haalbaar','SDE++ subsidie combineerbaar'],cons:['Dak moet verstevigd worden bij grote PV-last','Weinig warmtebehoefte in hal']},
    {name:'WKO + vloerverwarming (kantoorvleugel) + PV',desc:'Hybride concept: WKO voor kantoorvleugel, luchtcurtains en PV voor de loods. Maatwerk voor gemengd gebruik.',pros:['Optimale verduurzaming per zone','Goed scorend bij energielabel kantoor+loods','DUMAVA subsidiabel voor kantoorvleugel'],cons:['Twee systemen verhogen complexiteit','WKO economisch alleen bij > 500 m² kantoor']}
  ],
  'Horeca / Hotel':[
    {name:'WKO + absorptiewarmtepomp + PV + zonnecollector',desc:'Maximaal duurzaam concept voor hotels met hoog warmtapwaterverbruik. WKO levert basis, zonnecollector piekt tapwater, PV compenseert elektra.',pros:['Energielabel A+ haalbaar','Minimale fossiele afhankelijkheid','Zichtbaar duurzaam voor gasten'],cons:['Hoge investering (€150–220/m²)','WKO vergunningstraject']},
    {name:'Warmteterugwinning keuken + WP + PV',desc:'Warmteterugwinning uit keukenafzuiging gekoppeld aan warmtepomp en PV. Praktisch en haalbaar voor bestaande horecapanden.',pros:['Goede ROI door hoge keukenafvalwarmte','Minder invasief dan WKO','Relatief korte terugverdientijd'],cons:['Minder geschikt voor grote hotels','WTR installatie vraagt aanpassing keuken']}
  ]
};

function genConcept(){
  const type=document.getElementById('cg-type').value;
  const m2=document.getElementById('cg-m2').value;
  const state=document.getElementById('cg-state').value;
  const opts=cgConcepts[type]||cgConcepts['Kantoor'];
  document.getElementById('cg-out').innerHTML=`<div style="font-size:12px;color:var(--mid);margin-bottom:12px;">Concepten voor <strong>${type}</strong> · ${m2} m² · ${state}</div><div class="cg-grid">${opts.map(o=>`<div class="cg-card"><div class="cg-name">💡 ${o.name}</div><div class="cg-desc">${o.desc}</div><div class="pc-box"><div class="cg-pros"><strong>+ Voordelen</strong><br>${o.pros.map(p=>'• '+p).join('<br>')}</div><div class="cg-cons" style="margin-top:8px;"><strong>− Aandachtspunten</strong><br>${o.cons.map(c=>'• '+c).join('<br>')}</div></div></div>`).join('')}</div>`;
}

(function(){
var _open=false,_init=false;
var _faq=[
  {keys:['beng','indicator','energieprestatie'],ans:'<strong>BENG</strong> staat voor Bijna Energie Neutraal Gebouw. Drie indicatoren:<br>• <strong>BENG 1</strong>: Energiebehoefte (kWh/m²/jr)<br>• <strong>BENG 2</strong>: Primair fossiel energiegebruik<br>• <strong>BENG 3</strong>: Aandeel hernieuwbare energie<br><br>DVTadvies werkt veelal met bestaande gebouwen — wilt u de checker gebruiken?',chips:['⟁ BENG Checker']},
  {keys:['dumava','subsidie'],ans:'<strong>DUMAVA</strong> is de subsidieregeling voor verduurzaming van utiliteitsgebouwen. DVTadvies begeleidt de aanvraag. De Rapport Schrijver stelt automatisch een DUMAVA-subsidieadvies op conform de actuele voorwaarden.',chips:['📝 Rapport Schrijver']},
  {keys:['energielabel','label','nta 8800','ep-waarde'],ans:'De <strong>Excel Assistent</strong> berekent op basis van NTA 8800 het huidige energielabel én de prognose na verduurzamingsmaatregelen — inclusief een inschatting van de DUMAVA-subsidiabiliteit.',chips:['⊞ Excel Assistent','📝 Rapport Schrijver']},
  {keys:['paris proof','klimaatneutraal','co2','co₂'],ans:'Paris Proof houdt in dat een gebouw richting 2050 klimaatneutraal opereert. Voor kantoren: <strong>55 kWh/m²/jr</strong> in 2030. DVTadvies stelt CO₂-routekaarten op voor de weg daar naartoe.',chips:['📝 Rapport Schrijver']},
  {keys:['circul','duurzaam'],ans:'DVTadvies heeft een sterke focus op <strong>duurzaamheid en circulariteit</strong>: materiaalstromen, sloopadvies en hergebruik van installatiecomponenten. Wilt u de Kennisbank doorzoeken op referentieprojecten?',chips:['◎ Kennisbank']},
  {keys:['rapport','rapportage','document'],ans:'Met de <strong>Rapport Schrijver</strong> stelt u energielabelrapporten, DUMAVA-subsidieadviezen en CO₂-routekaarten op — gebaseerd op DVTadvies-templates, NTA 8800 en DUMAVA 2026.',chips:['📝 Rapport Schrijver']},
  {keys:['norm','nen','bbl','update','regelgev'],ans:'De <strong>Norm Monitor</strong> houdt wijzigingen in DUMAVA-regels, energielabelverplichtingen en Paris Proof-doelstellingen bij — zodat uw adviezen altijd actueel zijn.',chips:['⚖ Norm Monitor']},
  {keys:['kennis','archief','zoek','project'],ans:'De <strong>Kennisbank</strong> maakt uw projectarchief doorzoekbaar op gebouwtype, bouwjaar, label en locatie.',chips:['◎ Kennisbank']},
  {keys:['meer','vraag','help','wat kan'],ans:'U kunt mij vragen naar:',chips:['📊 Dashboard','📝 Rapport Schrijver','⊞ Excel Assistent','⟁ BENG Checker','⚖ Norm Monitor','◎ Kennisbank','💶 DUMAVA subsidie','🏷 Energielabel','🌍 Paris Proof']}
];
function toggleChat(){
  _open=!_open;
  document.getElementById('chatWin').classList.toggle('open',_open);
  if(_open&&!_init){_init=true;setTimeout(function(){_botMsg('Goedemiddag! Ik ben de assistent van <strong>DVTadvies</strong>. Waarmee kan ik u helpen?');_chips(['🗂 Naar een app','📝 Rapport schrijven','⟁ BENG uitleg','📋 Norm updates','❓ Meer vragen']);},350);}
  if(_open)document.getElementById('chatInp').focus();
}
window.toggleChat=toggleChat;
function _botMsg(html){
  var m=document.getElementById('chatMsgs');
  var t=document.createElement('div');t.className='cmsg-typing';
  t.innerHTML='<span class="cdot"></span><span class="cdot"></span><span class="cdot"></span>';
  m.appendChild(t);m.scrollTop=m.scrollHeight;
  setTimeout(function(){
    t.className='cmsg cmsg-bot';t.innerHTML=html;m.scrollTop=m.scrollHeight;
  },650);
}
function _userMsg(txt){
  var m=document.getElementById('chatMsgs');
  var d=document.createElement('div');d.className='cmsg cmsg-user';d.textContent=txt;
  m.appendChild(d);m.scrollTop=m.scrollHeight;
}
function _chips(arr){
  document.getElementById('chatChips').innerHTML=arr.map(function(c){
    return '<button class="chip" onclick="_chip('+JSON.stringify(c)+')">'+ c +'</button>';
  }).join('');
}
function _clearChips(){document.getElementById('chatChips').innerHTML='';}
window._chip=function(t){_userMsg(t);_clearChips();_process(t);};
window.sendChat=function(){
  var i=document.getElementById('chatInp'),v=i.value.trim();
  if(!v)return;_userMsg(v);i.value='';_clearChips();_process(v);
};
function _navTo(id,label){
  var nav=document.querySelector(".nav-item[onclick*=\"'"+id+"'\"]");
  show(id,nav);
  setTimeout(function(){
    _botMsg('U bent doorgestuurd naar <strong>'+label+'</strong>. Nog iets anders?');
    _chips(['🗂 Naar een app','❓ Meer vragen']);
  },200);
}
function _process(t){
  var l=t.toLowerCase();
  if(l.includes('app')||l.includes('navigeer')||l.includes('naar een')){
    setTimeout(function(){_botMsg('Naar welke app wilt u?');_chips(['📊 Dashboard','📝 Rapport Schrijver','⊞ Excel Assistent','⟁ BENG Checker','⚖ Norm Monitor','◎ Kennisbank']);},500);
  }else if(l.includes('dashboard')){setTimeout(function(){_navTo('dashboard','Dashboard');},500);
  }else if(l.includes('rapport schrijver')||l.includes('rapport schrijv')){setTimeout(function(){_navTo('rapport','Rapport Schrijver');},500);
  }else if(l.includes('excel')){setTimeout(function(){_navTo('excel','Excel Assistent');},500);
  }else if(l.includes('beng checker')||l.includes('beng check')){setTimeout(function(){_navTo('beng','BENG Checker');},500);
  }else if(l.includes('norm monitor')||l.includes('norm update')){setTimeout(function(){_navTo('normen','Norm Monitor');},500);
  }else if(l.includes('kennisbank')||l.includes('kennis bank')){setTimeout(function(){_navTo('kennis','Kennisbank');},500);
  }else{
    var match=null;
    for(var i=0;i<_faq.length;i++){
      var f=_faq[i];
      for(var j=0;j<f.keys.length;j++){if(l.includes(f.keys[j])){match=f;break;}}
      if(match)break;
    }
    if(match){
      setTimeout(function(){_botMsg(match.ans);if(match.chips)_chips(match.chips);},500);
    }else{
      setTimeout(function(){_botMsg('Dat weet ik helaas niet direct. Kan ik u ergens naartoe sturen?');_chips(['🗂 Naar een app','❓ Meer vragen']);},500);
    }
  }
}
})();
function normImpact(n,btn){
  const el=document.getElementById('ni-'+n);if(!el)return;
  if(el.innerHTML){el.innerHTML='';btn.textContent=n===0?'Bekijk impact voor mijn projecten':'Check mijn kantorenportefeuille';return;}
  const data=[
    {title:'DUMAVA 2026 — Impact projecten DVTadvies',items:[
      {p:'DUMAVA subsidie kantoor Leidsche Rijn',i:'Uitbreiding subsidie tot €7,5 mln — hogere claim mogelijk, herbereken aanvraagbedrag',lvl:'ok'},
      {p:'Klimaatneutrale renovatie Overvecht',i:'Nieuwe categorie warmtenetten van toepassing — DUMAVA aanvraag uitbreiden met warmtenet component',lvl:'ok'},
      {p:'Duurzaamheidsscan Papendorp-Noord',i:'Circulaire sloopcomponent subsidiabel onder nieuwe regeling — meenemen in advies',lvl:'warn'}
    ]},
    {title:'Energielabel C kantoren 2027 — Impact kantorenportefeuille',items:[
      {p:'DUMAVA subsidie kantoor Leidsche Rijn',i:'Kantoorgebouw ≥100 m² — label C vereist per 1 jan 2027. Huidige status controleren.',lvl:'warn'},
      {p:'Duurzaamheidsscan Papendorp-Noord',i:'Papendorp kantoorzone: label C audit inplannen. Amvest verwacht label B — voldoet ruim.',lvl:'ok'},
      {p:'Circulaire sloopmelding Transwijk',i:'Sloopbestemming — energielabelverplichting niet van toepassing op te slopen gebouwen',lvl:'ok'}
    ]}
  ];
  const d=data[n];
  btn.textContent='▲ Verberg impact';
  el.innerHTML=`<div style="margin-top:10px;background:var(--forest-light);border-radius:8px;padding:14px;animation:fi .22s ease;"><div style="font-size:12px;font-weight:700;color:var(--forest);margin-bottom:8px;">${d.title}</div>${d.items.map(i=>`<div style="display:flex;gap:8px;padding:6px 0;border-bottom:1px solid var(--border);font-size:12px;align-items:flex-start;"><div style="width:8px;height:8px;border-radius:50%;background:${i.lvl==='ok'?'var(--green)':i.lvl==='warn'?'var(--amber)':'var(--red)'};margin-top:4px;flex-shrink:0;"></div><div><strong>${i.p}</strong><br><span style="color:var(--mid)">${i.i}</span></div></div>`).join('')}</div>`;
}
function variantAnalyse(){
  const proj=document.getElementById('vc-proj').value;
  const r=document.getElementById('vc-result');
  r.innerHTML='<div class="panel"><div class="panel-body"><div class="prog-wrap"><div class="prog-bar" id="vcpbar" style="width:0%"></div></div><div style="font-size:11px;color:var(--mid);margin-top:4px;" id="vc-lbl">BENG indicatoren berekenen per variant...</div></div></div>';
  const steps=[[20,'BENG 1 berekenen...'],[45,'BENG 2 fossiel energiegebruik...'],[65,'BENG 3 hernieuwbaar...'],[82,'GPR indicaties...'],[95,'DUMAVA subsidiecheck...'],[100,'Analyse gereed!']];
  let i=0;const run=()=>{if(i<steps.length){const el=document.getElementById('vcpbar');const lb=document.getElementById('vc-lbl');if(el)el.style.width=steps[i][0]+'%';if(lb)lb.textContent=steps[i][1];i++;setTimeout(run,380);}else{
    r.innerHTML=`<div class="panel"><div class="panel-head"><div class="panel-icon">✅</div><div class="panel-title">Vergelijkingsresultaten — ${proj}</div></div><div class="panel-body"><div class="vc-grid">
      <div class="vc-card"><div class="vc-title">Variant A — PV 80 kWp</div>
        <div class="vc-row"><span class="vc-lbl">BENG 1</span><span class="vc-ok">35 kWh/m²/jr ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">BENG 2</span><span class="vc-ok">25 kWh/m²/jr ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">BENG 3</span><span class="vc-ok">71% ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">GPR</span><span class="vc-v">7,8</span></div>
        <div class="vc-row"><span class="vc-lbl">Meerkosten</span><span class="vc-v">€ 0</span></div>
        <div class="vc-row"><span class="vc-lbl">DUMAVA</span><span style="font-weight:700;color:var(--red);">✗ Nee</span></div>
        <div style="margin-top:8px;font-size:11px;color:var(--mid);">Voldoet aan normen maar beperkte verbetering. Geen subsidiekans.</div>
      </div>
      <div class="vc-card winner"><div class="vc-badge">★ Aanbevolen</div>
        <div class="vc-title">Variant B — PV uitbreiding 160 kWp</div>
        <div class="vc-row"><span class="vc-lbl">BENG 1</span><span class="vc-ok">32 kWh/m²/jr ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">BENG 2</span><span class="vc-ok">18 kWh/m²/jr ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">BENG 3</span><span class="vc-ok">84% ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">GPR</span><span class="vc-v">8,6</span></div>
        <div class="vc-row"><span class="vc-lbl">Meerkosten</span><span class="vc-v">€ 62.000</span></div>
        <div class="vc-row"><span class="vc-lbl">DUMAVA</span><span class="vc-ok">✓ Subsidiabel</span></div>
        <div style="margin-top:8px;font-size:11px;color:var(--mid);">Beste kosten-baten. DUMAVA ~72%. Netto ca. €17.000. BENG 2 ruim onder 2027 eis.</div>
        <button class="btn btn-primary btn-sm" style="width:100%;margin-top:8px;">✓ Selecteer Variant B</button>
      </div>
      <div class="vc-card"><div class="vc-title">Variant C — PV 160 kWp + WKO</div>
        <div class="vc-row"><span class="vc-lbl">BENG 1</span><span class="vc-ok">29 kWh/m²/jr ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">BENG 2</span><span class="vc-ok">14 kWh/m²/jr ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">BENG 3</span><span class="vc-ok">91% ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">GPR</span><span class="vc-v">9,1</span></div>
        <div class="vc-row"><span class="vc-lbl">Meerkosten</span><span class="vc-v">€ 185.000</span></div>
        <div class="vc-row"><span class="vc-lbl">DUMAVA</span><span style="font-weight:700;color:var(--red);">✗ Niet subsidiabel</span></div>
        <div style="margin-top:8px;font-size:11px;color:var(--mid);">Maximale prestatie. WKO vereist bodemonderzoek. Langere terugverdientijd.</div>
      </div>
    </div>
    <div style="background:var(--forest-light);border-radius:8px;padding:12px;font-size:12px;color:var(--mid);"><strong style="color:var(--forest);">Advies:</strong> Variant B beste kosten-baten. BENG 2: 25 → 18. DUMAVA ~72% meerkosten. Paris Proof 2030 ruim gehaald.</div>
    <div style="display:flex;gap:8px;margin-top:12px;"><button class="btn btn-primary btn-sm">📄 Exporteer vergelijking</button><button class="btn btn-outline btn-sm">✦ Naar Rapport Schrijver</button></div>
    </div></div>`;}};run();
}
function wkbBuild(){
  const b=document.getElementById('wkb-body');
  b.innerHTML='<div class="prog-wrap"><div class="prog-bar" id="wkbpbar" style="width:0%"></div></div><div style="font-size:11px;color:var(--mid);margin-top:4px;">WKB vereisten ophalen voor GK1 woonfunctie...</div>';
  let w=0;const iv=setInterval(()=>{w+=7;const el=document.getElementById('wkbpbar');if(el)el.style.width=w+'%';if(w>=100){clearInterval(iv);
  b.innerHTML=`<div style="background:var(--forest-light);border-radius:8px;padding:14px;margin-bottom:14px;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;"><div style="font-size:12px;font-weight:600;color:var(--forest);">Dossier compleetheid</div><div style="font-size:14px;font-weight:700;color:var(--amber);">69%</div></div>
    <div class="prog-wrap" style="margin:0 0 6px;"><div class="prog-bar" style="width:69%;background:var(--amber);"></div></div>
    <div style="font-size:11px;color:var(--mid);">5 items aanwezig · 2 incompleet · 2 ontbreekt</div></div>
  <div class="wkb-item wkb-ok"><div class="wkb-ic">✓</div><div><div class="wkb-lbl">Borgingsplan ingediend</div><div class="wkb-sub">GK1 borgingsplan · ref. BP-2026-058</div></div></div>
  <div class="wkb-item wkb-ok"><div class="wkb-ic">✓</div><div><div class="wkb-lbl">Kwaliteitsborger aangesteld</div><div class="wkb-sub">DVT Kwaliteitsborging · WKB niveau 1</div></div></div>
  <div class="wkb-item wkb-ok"><div class="wkb-ic">✓</div><div><div class="wkb-lbl">Voormelding Bevoegd Gezag</div><div class="wkb-sub">Gemeente Utrecht · ontvangen 20 feb 2026</div></div></div>
  <div class="wkb-item wkb-ok"><div class="wkb-ic">✓</div><div><div class="wkb-lbl">Constructieve veiligheid VO</div><div class="wkb-sub">Constructierapport goedgekeurd · Adviesburo Structa</div></div></div>
  <div class="wkb-item wkb-ok"><div class="wkb-ic">✓</div><div><div class="wkb-lbl">BENG berekening DO</div><div class="wkb-sub">NTA 8800 · BENG 1/2/3 conform eis · 20 apr 2026</div></div></div>
  <div class="wkb-item wkb-warn"><div class="wkb-ic">⚠</div><div><div class="wkb-lbl">Ventilatie- en luchtdichtheidsrapport — incompleet</div><div class="wkb-sub">Infiltratiemeting (NEN 2686) nog niet uitgevoerd. Actie vóór 10 mei.</div></div></div>
  <div class="wkb-item wkb-warn"><div class="wkb-ic">⚠</div><div><div class="wkb-lbl">EPC-berekening eindcontrole — incompleet</div><div class="wkb-sub">Definitieve EPC na PV-installatie nog niet aangeleverd.</div></div></div>
  <div class="wkb-item wkb-miss"><div class="wkb-ic">✗</div><div><div class="wkb-lbl">Dossier Bevoegd Gezag</div><div class="wkb-sub">Nog te compileren na afronding ventilatie en EPC.</div></div></div>
  <div class="wkb-item wkb-miss"><div class="wkb-ic">✗</div><div><div class="wkb-lbl">Opleverdossier bewoners</div><div class="wkb-sub">Fase: DO. Wordt aangemaakt bij oplevering.</div></div></div>
  <div style="display:flex;gap:8px;margin-top:12px;"><button class="btn btn-primary btn-sm">⬇ Export WKB dossier PDF</button><button class="btn btn-outline btn-sm">📧 Stuur naar kwaliteitsborger</button></div>`;}},80);
}
