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

function genRapport(){
  const bar=document.getElementById('rpbar'),
        lbl=document.getElementById('rp-lbl'),
        prog=document.getElementById('rp-prog'),
        out=document.getElementById('rp-out'),
        acts=document.getElementById('rp-acts');
  prog.style.display='block';
  acts.style.display='none';
  out.innerHTML='<span style="color:var(--soft)">Rapport wordt opgesteld...</span>';
  const steps=[
    [12,'Projectgegevens verwerken...'],
    [28,'DIA-templates laden...'],
    [46,'NEN-normen en Paris Proof eisen toepassen...'],
    [62,'Exploitatieanalyse uitvoeren...'],
    [80,'Aanbevelingen formuleren...'],
    [95,'Rapport opmaken...'],
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
      acts.innerHTML='<button class="btn btn-primary btn-sm">⬇ Download .docx</button><button class="btn btn-outline btn-sm">✏ Bewerk</button>';
      out.innerHTML=`<strong style="font-family:'Barlow Condensed',sans-serif;color:var(--teal-accent);font-size:15px;letter-spacing:.5px;text-transform:uppercase;">Exploitatieadvies — TivoliVredenburg Utrecht</strong><br><br><strong style="color:var(--text);">Opdrachtgever:</strong> <span style="color:var(--mid)">TivoliVredenburg Stichting</span><br><strong style="color:var(--text);">Adviseur:</strong> <span style="color:var(--mid)">DIA Groep Zeist · 21 april 2026</span><br><br><strong style="color:var(--text);">1. Projectomschrijving</strong><br><span style="color:var(--mid)">TivoliVredenburg is een toonaangevend muziek- en evenementengebouw in het hart van Utrecht (BVO: 11.400 m², 5 zalen). Dit exploitatieadvies richt zich op reductie van energiekosten, verlenging van installatietechnische levensduur en aansluiting op Paris Proof 2030-doelstellingen.</span><br><br><strong style="color:var(--text);">2. Exploitatiebevindingen</strong><br><span style="color:var(--mid)">Huidig energieverbruik: 1.320 MWh/jr (116 kWh/m²/jr). Benchmark bijeenkomstfunctie: 90 kWh/m²/jr. Grootste verliezen: HVAC ongeplande stops (23%), verlichtingsbeheer (18%), koelinstallatie zaalklimaat (31%).</span><br><br><strong style="color:var(--text);">3. Aanbevelingen</strong><br><span style="color:var(--mid)">• BMS-upgrade met slimme zaaloccupatie koppeling <strong style="color:var(--green)">↓ 14%</strong><br>• LED-retrofit algemene ruimten + dimregeling <strong style="color:var(--green)">↓ 18%</strong><br>• WKO-voorstudie voor basiskoeling/-verwarming<br>• Exploitatieplan 5-jaar incl. onderhoudsmomenten</span><br><br><strong style="color:var(--text);">4. BENG Indicatoren (prognose)</strong><br><span style="color:var(--mid)">• BENG 1: <strong style="color:var(--green)">61 kWh/m²/jr ✓</strong> (eis bijeenkomst ≤75)<br>• BENG 2: <strong style="color:var(--green)">38 kWh/m²/jr ✓</strong> (eis ≤40)<br>• BENG 3: <strong style="color:var(--green)">54% ✓</strong> (eis ≥50%)</span><br><br><em style="color:var(--soft);font-size:11px;">Gegenereerd door DIA Groep Digitaal Platform · NEN 7120 + Paris Proof 2030 · Eerst denken, dan doen.</em><div style="margin-top:12px;padding-top:10px;border-top:1px solid var(--border);"><button class="expl-btn" onclick="toggleExplain('ep-rapport')">▶ Waarom is dit correct?</button><div class="expl-pan" id="ep-rapport"><strong style="color:var(--text);">Gebaseerd op:</strong><br>• <strong>NEN 7120:2011</strong> — Energieprestatie van gebouwen (bepalingsmethode BENG)<br>• <strong>Bbl bijlage A</strong> — BENG-eisen bijeenkomstfunctie, eis BENG 2 ≤ 40 kWh/m²/jr (2027)<br>• <strong>Paris Proof 2030</strong> — DGBC doelstelling bijeenkomstfuncties: 60 kWh/m²/jr<br><br><strong style="color:var(--text);">Aannames exploitatiebenchmarks:</strong><br>• HVAC referentieverbruik: NEN-EN 15232 gebouwautomatisering klasse B<br>• Verlichtingsbenchmark: ISSO-77 publicatie kantoor/cultuur<br>• Besparingspotentie gebaseerd op DIA-referentieprojecten 2020–2025<br><div class="expl-src">📚 Bronnen: NEN 7120:2011, Bbl 2024 bijlage A, DGBC Paris Proof 2030, NEN-EN 15232, ISSO-77</div></div></div>`;
    }
  };
  run();
}

function loadXLS(){
  document.getElementById('xls-body').innerHTML=`
    <div style="margin-bottom:10px;"><span class="ai-chip">⊞ exploitatie_optimalisatie.xlsx geladen</span></div>
    <div class="xls-preview">
      <div class="xrow xhead"><div class="xcell">Systeem</div><div class="xcell">Verbruik MWh</div><div class="xcell">Benchmark</div><div class="xcell">Afwijking</div><div class="xcell">Besparing €</div></div>
      <div class="xrow"><div class="xcell">HVAC zalen</div><div class="xcell">412</div><div class="xcell">340</div><div class="xcell" style="color:var(--red);">+21%</div><div class="xcell" style="color:var(--amber);">?</div></div>
      <div class="xrow"><div class="xcell">Verlichting</div><div class="xcell">198</div><div class="xcell">160</div><div class="xcell" style="color:var(--red);">+24%</div><div class="xcell" style="color:var(--amber);">?</div></div>
      <div class="xrow"><div class="xcell">Koeling</div><div class="xcell">387</div><div class="xcell" style="color:var(--amber);font-weight:600;">?</div><div class="xcell" style="color:var(--amber);">—</div><div class="xcell" style="color:var(--amber);">?</div></div>
      <div class="xrow"><div class="xcell">Liften & transport</div><div class="xcell">54</div><div class="xcell">48</div><div class="xcell" style="color:var(--amber);">+13%</div><div class="xcell" style="color:var(--amber);">?</div></div>
      <div class="xrow"><div class="xcell">Overig</div><div class="xcell">269</div><div class="xcell" style="color:var(--amber);font-weight:600;">?</div><div class="xcell">—</div><div class="xcell" style="color:var(--amber);">?</div></div>
    </div>
    <div style="margin-bottom:10px;"><span class="ai-chip">▸ Gedetecteerd: 4 ontbrekende waarden + 4 besparingspotenties</span></div>
    <button class="btn btn-primary btn-sm" onclick="procXLS()">▸ Verwerk automatisch</button>`;
}

function procXLS(){
  const b=document.getElementById('xls-body');
  b.innerHTML='<div class="prog-wrap"><div class="prog-bar" id="xpbar" style="width:0%"></div></div><div style="font-family:\'Barlow Condensed\',sans-serif;font-size:11px;color:var(--mid);margin-top:5px;text-transform:uppercase;letter-spacing:.8px;">NEN-benchmarks opzoeken en besparingen berekenen...</div>';
  let w=0;
  const iv=setInterval(()=>{
    w+=7;
    const el=document.getElementById('xpbar');
    if(el)el.style.width=w+'%';
    if(w>=100){
      clearInterval(iv);
      b.innerHTML=`
        <div style="margin-bottom:8px;"><span class="ai-chip">▸ 4 waarden ingevuld · besparingen berekend</span></div>
        <div class="xls-preview">
          <div class="xrow xhead"><div class="xcell">Systeem</div><div class="xcell">Verbruik MWh</div><div class="xcell">Benchmark</div><div class="xcell">Afwijking</div><div class="xcell">Besparing €</div></div>
          <div class="xrow"><div class="xcell">HVAC zalen</div><div class="xcell">412</div><div class="xcell">340</div><div class="xcell" style="color:var(--red);">+21%</div><div class="xcell xai">€8.640 ✦</div></div>
          <div class="xrow"><div class="xcell">Verlichting</div><div class="xcell">198</div><div class="xcell">160</div><div class="xcell" style="color:var(--red);">+24%</div><div class="xcell xai">€4.560 ✦</div></div>
          <div class="xrow"><div class="xcell">Koeling</div><div class="xcell">387</div><div class="xcell xai">310 ✦</div><div class="xcell" style="color:var(--red);">+25%</div><div class="xcell xai">€9.240 ✦</div></div>
          <div class="xrow"><div class="xcell">Liften & transport</div><div class="xcell">54</div><div class="xcell">48</div><div class="xcell" style="color:var(--amber);">+13%</div><div class="xcell xai">€720 ✦</div></div>
          <div class="xrow"><div class="xcell">Overig</div><div class="xcell">269</div><div class="xcell xai">240 ✦</div><div class="xcell" style="color:var(--amber);">+12%</div><div class="xcell xai">€3.480 ✦</div></div>
          <div class="xrow" style="background:rgba(255,107,43,.08);font-weight:700;"><div class="xcell">TOTAAL</div><div class="xcell">1.320</div><div class="xcell xai">1.098 ✦</div><div class="xcell" style="color:var(--red);">+20%</div><div class="xcell xai">€26.640/jr ✦</div></div>
        </div>
        <div style="background:var(--teal-glow);border:1px solid rgba(255,107,43,.25);border-radius:3px;padding:12px;font-size:12px;color:var(--teal-accent);margin-top:8px;">
          <strong style="font-family:'Barlow Condensed',sans-serif;text-transform:uppercase;letter-spacing:.5px;">Conclusie:</strong>
          <span style="color:var(--mid);"> Totale besparingspotentie: <strong style="color:var(--green);">€26.640/jr</strong> bij implementatie aanbevelingen. Terugverdientijd maatregelen: 2,8 jaar. <strong style="color:var(--green);">Voldoet aan Paris Proof 2030 na uitvoering.</strong></span>
        </div>
        <div style="margin-top:10px;display:flex;gap:8px;">
          <button class="btn btn-primary btn-sm">⬇ Download Excel</button>
          <button class="btn btn-outline btn-sm">📄 Naar rapport</button>
        </div>
        <button class="expl-btn" onclick="toggleExplain('ep-excel')">▶ Waarom is dit correct?</button><div class="expl-pan" id="ep-excel"><strong style="color:var(--text);">Gebruikte benchmarkmethode:</strong><br>• Verbruiksbenchmarks conform <strong>NEN-EN 15232</strong> gebouwautomatisering en ISSO-77<br>• Besparingen berekend op basis van gemeten delta verbruik vs. sector-benchmark<br>• Energieprijs aangenomen: €0,28/kWh elektra, €0,90/m³ gas (Q1 2026 gemiddelde)<br><br><strong style="color:var(--text);">Afwijkingen:</strong><br>• Koeling benchmark: 310 MWh/jr per NEN-EN 14825 voor vergelijkbare functies<br>• Overig: ISSO-publicatie 28 (beheerskosten gebouwen) als referentie<br><div class="expl-src">📚 Bronnen: NEN-EN 15232, ISSO-77, ISSO-28, NEN-EN 14825, Paris Proof sector 2030</div></div>`;
    }
  },90);
}

function checkBENG(){
  const b=document.getElementById('beng-body');
  b.innerHTML='<div class="prog-wrap"><div class="prog-bar" id="bpbar" style="width:0%"></div></div>';
  let w=0;
  const iv=setInterval(()=>{
    w+=9;
    const el=document.getElementById('bpbar');
    if(el)el.style.width=w+'%';
    if(w>=100){
      clearInterval(iv);
      b.innerHTML=`
        <div class="brc">
          <div class="brow"><div style="font-size:12px;color:var(--mid);">BENG 1 — Energiebehoefte</div><div style="font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:700;color:var(--green);">61 kWh/m²/jr ✓</div></div>
          <div class="brow"><div style="font-size:11px;color:var(--soft);">Eis (bijeenkomstfunctie)</div><div style="font-size:11px;color:var(--mid);">≤ 75 kWh/m²/jr</div></div>
        </div>
        <div class="brc">
          <div class="brow"><div style="font-size:12px;color:var(--mid);">BENG 2 — Primair fossiel</div><div style="font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:700;color:var(--green);">38 kWh/m²/jr ✓</div></div>
          <div class="brow"><div style="font-size:11px;color:var(--soft);">Eis (na 2027)</div><div style="font-size:11px;color:var(--mid);">≤ 40 kWh/m²/jr</div></div>
        </div>
        <div class="brc">
          <div class="brow"><div style="font-size:12px;color:var(--mid);">BENG 3 — Hernieuwbaar aandeel</div><div style="font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:700;color:var(--amber);">47% ⚠</div></div>
          <div class="brow"><div style="font-size:11px;color:var(--soft);">Eis</div><div style="font-size:11px;color:var(--mid);">≥ 50%</div></div>
        </div>
        <div style="background:var(--amber-bg);border-left:3px solid var(--amber);border-radius:3px;padding:12px;margin-top:4px;">
          <div style="font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:700;color:var(--amber);">⚠ BENG 3 net niet gehaald — actie vereist</div>
          <div style="font-size:11px;color:var(--mid);margin-top:5px;">BENG 1 en 2 voldoen ruimschoots. Verhoog PV-capaciteit met ca. 85 kWp of voeg WKO toe om BENG 3 te halen (min. 50%). Alternatief: Daglichtregeling toevoegen verlaagt BENG 2 verder.</div>
        </div>
        <div style="margin-top:10px;display:flex;gap:8px;">
          <button class="btn btn-primary btn-sm">📄 Genereer BENG rapport</button>
          <button class="btn btn-outline btn-sm">⬇ PDF</button>
        </div>
        <button class="expl-btn" onclick="toggleExplain('ep-beng')">▶ Waarom is dit correct?</button><div class="expl-pan" id="ep-beng"><strong style="color:var(--text);">Berekeningswijze BENG indicatoren (NEN 7120):</strong><br>• <strong>BENG 1</strong>: Energiebehoefte op basis van bouwschil + gebruiksprofiel bijeenkomst. Zaaloccupantie 1 persoon/4 m² aangenomen<br>• <strong>BENG 2</strong>: Primair fossiel verlaagd door warmtepomp COP 3,8 en PV aandeel<br>• <strong>BENG 3</strong>: Hernieuwbaar aandeel 47% — 3% onder de eis. Verhoging PV met 85 kWp lost dit op<br><br><strong style="color:var(--text);">Eis conform Bbl bijlage A (bijeenkomstfunctie):</strong><br>• BENG 1 ≤ 75 | BENG 2 ≤ 40 (2027) | BENG 3 ≥ 50%<br><div class="expl-src">📚 Bronnen: NEN 7120:2011, Bbl bijlage A (2024), ISSO-75.1, NEN-EN ISO 52000-1</div></div>`;
    }
  },95);
}

const kbData=[
  {title:'Exploitatieadvies TivoliVredenburg — HVAC optimalisatie',meta:'Cultuur · 2024 · 11.400 m² · Utrecht',snip:'Volledige exploitatiedoorlichting muziekgebouw. BMS-upgrade bespaarde 22% op HVAC. Paris Proof strategie 2030 opgesteld. Terugverdientijd 2,4 jaar.',score:98,
   cmp:{type:'Bijeenkomstfunctie renovatie',m2:'11.400 m²',tech:'BMS-upgrade + LED + WP voorstudie',beng2:'38 kWh/m²/jr',saving:'Energiekosten −22%',reuse:'BMS-aanpak, benchmarkmethode, exploitatieplan structuur'}},
  {title:'Sportcampus Leidsche Rijn — W/E installatieontwerp',meta:'Sport · 2023 · 8.200 m² · Utrecht',snip:'Nieuwbouw indoor sportcomplex. Warmtepomp + PV 140 kWp + WTW ventilatie η=92%. BENG 3: 71%. Aardgasvrij ontwerp, oplevering on-time binnen budget.',score:93,
   cmp:{type:'Sportfunctie nieuwbouw',m2:'8.200 m²',tech:'Lucht-water WP + PV 140 kWp + WTW 92%',beng2:'29 kWh/m²/jr',saving:'CO₂ −68%',reuse:'WP-selectie, PV-dimensionering, aardgasvrij concept'}},
  {title:'Kovelswade Rijksmonument — Installatierenovatie',meta:'Monument · 2022 · 2.800 m² · Utrecht',snip:'Installatierenovatie in beschermd Rijksmonument. Maatwerk HVAC zonder aanpassing monumentale gevel. Energielabel C → A. Alle vergunningen eerste ronde verleend.',score:89,
   cmp:{type:'Monument renovatie',m2:'2.800 m²',tech:'Maatwerk HVAC, onzichtbare installaties',beng2:'44 kWh/m²/jr',saving:'Energielabel C → A',reuse:'Monumentenstrategie, vergunningsaanpak, maatwerk HVAC'}},
  {title:'Windpark Zeewolde — Infra- en E-installaties',meta:'Energie · 2025 · Zeewolde · Flevoland',snip:'Elektrotechnische infrastructuur voor het grootste windpark van Nederland (241 turbines). Transformatorstations, kabelroutering, monitoring systeem. On-time opgeleverd.',score:84,
   cmp:{type:'Energie-infrastructuur',m2:'Windpark 241 turbines',tech:'Transformatorstations + kabelroutering + SCADA',beng2:'N.v.t.',saving:'241 MW opgesteld vermogen',reuse:'E-infrastructuur aanpak, monitoring-architectuur'}},
];

function searchKB(){
  const q=(document.getElementById('kb-q')||{}).value||'';
  document.getElementById('kb-meta').textContent=kbData.length+` resultaten voor "${q}" — gesorteerd op relevantie`;
  document.getElementById('kb-results').innerHTML=kbData.map((k,idx)=>`
    <div class="kb-item">
      <span class="match">${k.score}% match</span>
      <div class="kb-title">${k.title}</div>
      <div class="kb-meta">${k.meta}</div>
      <div class="kb-snip">${k.snip}</div>
      <div style="margin-top:8px;"><button class="expl-btn" style="margin-top:0;" onclick="showCompare(${idx})">◎ Vergelijk met huidig project</button></div>
      <div class="cmp-pan" id="cmp-${idx}"><div class="cmp-title">▸ Dit project vs. huidige scope</div><div class="cmp-row"><span class="cmp-lbl">Type</span><span class="cmp-val">${k.cmp.type}</span></div><div class="cmp-row"><span class="cmp-lbl">Projectgrootte</span><span class="cmp-val">${k.cmp.m2}</span></div><div class="cmp-row"><span class="cmp-lbl">Techniek</span><span class="cmp-val">${k.cmp.tech}</span></div><div class="cmp-row"><span class="cmp-lbl">BENG 2 resultaat</span><span class="cmp-val">${k.cmp.beng2}</span></div><div class="cmp-row"><span class="cmp-lbl">Besparing</span><span class="cmp-val">${k.cmp.saving}</span></div><div class="cmp-row"><span class="cmp-lbl">Hergebruikbare aanpak</span><span class="cmp-val">${k.cmp.reuse}</span></div></div>
    </div>`).join('');
}
function qaAnalyse(){
  document.getElementById('qaOv').classList.add('show');
  const bd=document.getElementById('qaBody');
  bd.innerHTML='<div class="prog-wrap"><div class="prog-bar" id="qapbar" style="width:0%"></div></div><div style="font-family:\'Barlow Condensed\',sans-serif;font-size:11px;color:var(--mid);margin-top:6px;text-transform:uppercase;letter-spacing:.8px;">Projecten scannen...</div>';
  let w=0;const iv=setInterval(()=>{w+=5;const el=document.getElementById('qapbar');if(el)el.style.width=w+'%';if(w>=100){clearInterval(iv);bd.innerHTML=`<div style="margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;"><div style="font-size:12px;color:var(--mid);">5 projecten gescand · <strong style="color:var(--red);">2 hoog risico</strong></div><span class="ai-chip">▸ QA Score: 76/100</span></div><div class="iss-row"><div class="iss-r r-h">Hoog</div><div><div class="iss-txt"><strong style="color:var(--text);">Hotel Figi Zeist</strong> — Deadline morgen, energieaudit incompleet</div><div class="iss-sub">Sectie verbruiksanalyse ontbreekt · Benchmark niet ingevuld</div></div></div><div class="iss-row"><div class="iss-r r-h">Hoog</div><div><div class="iss-txt"><strong style="color:var(--text);">TivoliVredenburg</strong> — BENG 3 net niet gehaald (47% vs eis 50%)</div><div class="iss-sub">PV-capaciteit moet +85 kWp of WKO toevoegen</div></div></div><div class="iss-row"><div class="iss-r r-m">Middel</div><div><div class="iss-txt"><strong style="color:var(--text);">Kovelswade Monument</strong> — Vergunningsstrategie niet vastgelegd</div><div class="iss-sub">Monument HVAC vereist vooroverleg RCE · Nog niet gepland</div></div></div><div class="iss-row"><div class="iss-r r-m">Middel</div><div><div class="iss-txt"><strong style="color:var(--text);">Windpark Zeewolde</strong> — Kabelroutering tekening ontbreekt</div><div class="iss-sub">Rev B tekening verwacht · Nog niet ontvangen</div></div></div><div class="iss-row"><div class="iss-r r-l">Laag</div><div><div class="iss-txt"><strong style="color:var(--text);">Sportcampus Leidsche Rijn</strong> — PV-opbrengst niet gevalideerd</div><div class="iss-sub">140 kWp aangenomen · Schaduwanalyse nog te doen</div></div></div><div style="margin-top:14px;padding-top:12px;border-top:1px solid var(--border);display:flex;gap:8px;"><button class="btn btn-primary btn-sm">📄 Exporteer QA rapport</button><button class="btn btn-outline btn-sm" onclick="closeQA()">Sluiten</button></div>`;}},60);
}
function closeQA(){document.getElementById('qaOv').classList.remove('show');}
function toggleExplain(id){const el=document.getElementById(id);if(!el)return;el.classList.toggle('show');const btn=el.previousElementSibling;if(btn&&btn.classList.contains('expl-btn'))btn.innerHTML=el.classList.contains('show')?'▲ Verberg uitleg':'▶ Waarom is dit correct?';}
function showCompare(idx){const el=document.getElementById('cmp-'+idx);if(el)el.classList.toggle('show');}
const cgConcepts={
  'Kantoor':[{name:'Lucht-water WP + PV',desc:'Eenvoudig en betrouwbaar voor kantoren tot 5.000 m². Gasvrij, BENG 2 haalbaar binnen 30 kWh/m²/jr.',pros:['Lage investeringskosten','Breed toepasbaar','Snel installeerbaar'],cons:['Hogere elektriciteitsvraag bij koude piek','Buitenruimte nodig']},{name:'WKO-systeem + warmtepomp',desc:'Optimaal voor grotere kantoren. Laagste energiekosten op lange termijn.',pros:['BENG 2 < 20 kWh/m²/jr','Gratis koeling','Lage operationele kosten'],cons:['Hoge initiële investering','Bodemonderzoek vereist','Vergunning nodig']}],
  'Woning (appartementen)':[{name:'Lucht-water WP per appartement',desc:'Individuele installatie per woning. Geschikt voor nieuwbouw en grote renovaties.',pros:['Bewoner individueel verantwoordelijk','BENG 2 ≤ 20 haalbaar','Eenvoudige service'],cons:['Ruimtebehoefte per unit','Geluidsisolatie nodig']},{name:'Collectief WKO + afleverset',desc:'Collectieve warmtelevering voor gebouwen > 30 appartementen.',pros:['Laagste energiekosten VvE','Bewonerstevredenheid','Paris Proof'],cons:['Complexe aansturing','Hogere projectkosten','VvE-besluit vereist']}],
  'Zorggebouw':[{name:'WKO + absorptiekoeling',desc:'Stabiele 24/7 levering. Koeling en warmte simultaan.',pros:['Hoge betrouwbaarheid','Simultane koeling/warmte','Lage emissie'],cons:['Complex','Specialist onderhoud','Hoge aanleg']},{name:'Lucht-water WP + redundantie',desc:'Eenvoudiger systeem met back-up voor zorgcontinuïteit.',pros:['Redundantie','Lager risico','Snellere oplevering'],cons:['Minder efficiënt dan WKO','Hogere energiekosten']}],
  'School / Onderwijs':[{name:'Lucht-water WP + Frisse Scholen C',desc:'Voldoet aan Bbl Frisse Scholen klasse C eis.',pros:['Wettelijk niveau','Gezond klimaat','Bekende techniek'],cons:['Hogere elektriciteitsvraag','Buitenunits']},{name:'WKO + vraaggestuurd ventileren',desc:'Frisse Scholen klasse B haalbaar.',pros:['Klasse B','Laagste kosten','RVO subsidiabel'],cons:['Duurder aanleg','Bodemonderzoek']}],
  'Logistiek / Bedrijfshal':[{name:'Infrarood + LED + PV',desc:'Kosteneffectief voor grote bedrijfshallen.',pros:['Lage aanlegkosten','PV op dak','Snel terugverdiend'],cons:['Geen koeling','Minder voor kantoorzone']},{name:'Lucht-water WP + ventilatieunit',desc:'Warmte/koeling voor kantoor + hal combinatie.',pros:['Comfortabele kantoorzone','BENG haalbaar','Flexibel'],cons:['Hogere investering','Meer onderhoud']}],
  'Horeca / Hotel':[{name:'WKO + stadsverwarming hybride',desc:'Optimaal voor hotels met hoge warmte/koelvraag.',pros:['Comfort','Lage emissie','Paris Proof'],cons:['Stadsverwarming afhankelijk','Hoge aanleg']},{name:'Lucht-water WP + warmteterugwinning',desc:'Standalone voor kleinere horeca.',pros:['Onafhankelijk','Standaard techniek','Onderhoudbaar'],cons:['Hogere elektriciteitskosten','Ruimtebehoefte']}]
};
function genConcept(){
  const type=document.getElementById('cg-type').value;
  const m2=parseInt(document.getElementById('cg-m2').value)||2500;
  const state=document.getElementById('cg-state').value;
  const out=document.getElementById('cg-result');
  out.innerHTML='<div class="prog-wrap"><div class="prog-bar" id="cgpbar" style="width:0%"></div></div><div style="font-family:\'Barlow Condensed\',sans-serif;font-size:11px;color:var(--mid);margin-top:6px;text-transform:uppercase;letter-spacing:.8px;">Systeemconcepten genereren...</div>';
  let w=0;const iv=setInterval(()=>{w+=10;const el=document.getElementById('cgpbar');if(el)el.style.width=w+'%';if(w>=100){clearInterval(iv);const concepts=cgConcepts[type]||cgConcepts['Kantoor'];out.innerHTML=`<div style="font-family:'Barlow Condensed',sans-serif;font-size:11px;color:var(--soft);margin-bottom:10px;text-transform:uppercase;letter-spacing:.5px;">${type} · ${m2.toLocaleString()} m² · ${state}</div><div class="cg-out-grid">${concepts.map((c,i)=>`<div class="cg-card"><div style="font-family:'Barlow Condensed',sans-serif;font-size:9px;font-weight:700;color:var(--soft);text-transform:uppercase;letter-spacing:.8px;margin-bottom:4px;">Optie ${i+1}</div><div class="cg-name">${c.name}</div><div class="cg-desc">${c.desc}</div><div class="pc-grid"><div class="pc-box"><div class="pc-lbl pro">Voordelen</div>${c.pros.map(p=>`<div class="pc-li">✓ ${p}</div>`).join('')}</div><div class="pc-box"><div class="pc-lbl con">Aandachtspunten</div>${c.cons.map(p=>`<div class="pc-li">△ ${p}</div>`).join('')}</div></div></div>`).join('')}</div><div style="background:var(--teal-glow);border:1px solid rgba(0,200,150,.2);border-radius:3px;padding:10px 12px;margin-top:12px;font-size:11.5px;color:var(--mid);">▸ Globale concepten ter oriëntatie — altijd een haalbaarheidsanalyse laten uitvoeren.</div>`;}},80);
}

(function(){
var _open=false,_init=false;
var _faq=[
  {keys:['beng','indicator','energieprestatie'],ans:'<strong>BENG</strong> staat voor Bijna Energie Neutraal Gebouw. Drie indicatoren:<br>• <strong>BENG 1</strong>: Energiebehoefte (kWh/m²/jr)<br>• <strong>BENG 2</strong>: Primair fossiel energiegebruik<br>• <strong>BENG 3</strong>: Aandeel hernieuwbare energie<br><br>Voor bijeenkomst- en logiesfuncties — zoals culturele gebouwen — gelden specifieke BENG-eisen.',chips:['⟁ BENG Checker']},
  {keys:['exploitatie','exploitatieadvies','beheer','operations'],ans:'<strong>Exploitatieadvies</strong> is een specialiteit van DIA Groep: het optimaliseren van gebouwbeheer, energieverbruik en installatieonderhoud over de levensduur. De Rapport Schrijver kan automatisch een volledig exploitatieadvies opstellen.',chips:['📝 Rapport Schrijver']},
  {keys:['wkb','kwaliteitsborg','wet kwalit'],ans:'De <strong>WKB</strong> (Wet Kwaliteitsborging) verhoogt de documentatieverplichtingen per project. Het platform genereert WKB-conforme rapportage automatisch — ook voor culturele gebouwen en monumenten.',chips:['📝 Rapport Schrijver']},
  {keys:['tivoli','sportcampus','kovelswade','windpark'],ans:'DIA Groep werkt aan uiteenlopende projecten: van <strong>TivoliVredenburg</strong> en de <strong>Sportcampus Leidsche Rijn</strong> tot het <strong>Kovelswade Rijksmonument</strong> en <strong>Windpark Zeewolde</strong>. Wilt u de Kennisbank doorzoeken?',chips:['◎ Kennisbank']},
  {keys:['rapport','rapportage','document'],ans:'Met de <strong>Rapport Schrijver</strong> stelt u exploitatieadviezen, installatieontwerpen en energieaudits op — automatisch gebaseerd op DIA-templates en actuele NEN-normen.',chips:['📝 Rapport Schrijver']},
  {keys:['excel','berekening','sheet','energieverbruik'],ans:'Upload een energieverbruikssheet in de <strong>Excel Assistent</strong>. Het platform analyseert verbruikspatronen en berekent besparingspotenties per installatie-onderdeel.',chips:['⊞ Excel Assistent']},
  {keys:['norm','nen','bbl','update','regelgev'],ans:'De <strong>Norm Monitor</strong> houdt alle wijzigingen in Bbl, NEN en Paris Proof bij — direct relevant voor uw actieve DIA-projecten.',chips:['⚖ Norm Monitor']},
  {keys:['kennis','archief','zoek','project'],ans:'De <strong>Kennisbank</strong> maakt uw projectarchief doorzoekbaar op gebouwtype, installatiesysteem en locatie.',chips:['◎ Kennisbank']},
  {keys:['meer','vraag','help','wat kan'],ans:'U kunt mij vragen naar:',chips:['📊 Dashboard','📝 Rapport Schrijver','⊞ Excel Assistent','⟁ BENG Checker','⚖ Norm Monitor','◎ Kennisbank','🏛 Exploitatieadvies','📋 WKB uitleg']}
];
function toggleChat(){
  _open=!_open;
  document.getElementById('chatWin').classList.toggle('open',_open);
  if(_open&&!_init){_init=true;setTimeout(function(){_botMsg('Goedemiddag! Ik ben de assistent van <strong>DIA Groep</strong>. Waarmee kan ik u helpen?');_chips(['🗂 Naar een app','📝 Rapport schrijven','⟁ BENG uitleg','📋 Norm updates','❓ Meer vragen']);},350);}
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
  if(el.innerHTML){el.innerHTML='';btn.textContent=n===0?'▸ Analyseer impact voor mijn projecten':'▸ Analyseer impact voor mijn projecten';return;}
  const data=[
    {title:'NEN 1010:2026 — Impact projecten DIA Groep',items:[
      {p:'TivoliVredenburg Utrecht',i:'Cultureel gebouw: NEN 1010 afd. 7-710 van toepassing op podiuminstallaties — review vereist per 1 jul 2026',lvl:'warn'},
      {p:'Sportcampus Leidsche Rijn',i:'Sportzaal: groepsverdeling en differentiaalbeveiliging herzien conform nieuwe norm',lvl:'warn'},
      {p:'Kovelswade Rijksmonument',i:'Monument: installatietechnisch adviseur vereist — NEN 1010 bijlage A monumenten van toepassing',lvl:'miss'}
    ]},
    {title:'Bbl 2026 brandveiligheid monumenten — Impact projecten DIA Groep',items:[
      {p:'Kovelswade Rijksmonument',i:'Rijksmonument >500 m²: sprinklerplicht en nieuwe ontsnappingsroutes — omgevingsvergunning aanpassen',lvl:'miss'},
      {p:'TivoliVredenburg Utrecht',i:'Publiek gebouw: brandcompartimentering reviewen — nieuwe Bbl eisen per 15 apr 2026',lvl:'warn'},
      {p:'Hotel Figi Zeist — Renovatie',i:'Geen Rijksmonument — huidige Bbl eisen van toepassing',lvl:'ok'}
    ]}
  ];
  const d=data[n];
  btn.textContent='▲ Verberg impact';
  el.innerHTML=`<div style="margin-top:10px;background:rgba(0,200,150,.07);border-radius:4px;padding:14px;border:1px solid rgba(0,200,150,.2);animation:fi .22s ease;"><div style="font-size:12px;font-weight:700;color:var(--teal-accent);margin-bottom:8px;">${d.title}</div>${d.items.map(i=>`<div style="display:flex;gap:8px;padding:6px 0;border-bottom:1px solid var(--border);font-size:12px;align-items:flex-start;"><div style="width:8px;height:8px;border-radius:50%;background:${i.lvl==='ok'?'var(--green)':i.lvl==='warn'?'var(--amber)':'var(--red)'};margin-top:4px;flex-shrink:0;"></div><div><strong style="color:var(--text)">${i.p}</strong><br><span style="color:var(--mid)">${i.i}</span></div></div>`).join('')}</div>`;
}
function variantAnalyse(){
  const proj=document.getElementById('vc-proj').value;
  const r=document.getElementById('vc-result');
  r.innerHTML='<div class="panel"><div class="panel-body"><div class="prog-wrap"><div class="prog-bar" id="vcpbar" style="width:0%"></div></div><div style="font-size:11px;color:var(--mid);margin-top:4px;" id="vc-lbl">BENG indicatoren berekenen per variant...</div></div></div>';
  const steps=[[20,'BENG 1 berekenen...'],[45,'BENG 2 fossiel energiegebruik...'],[65,'BENG 3 hernieuwbaar...'],[82,'GPR indicaties...'],[95,'DUMAVA subsidiecheck...'],[100,'Analyse gereed!']];
  let i=0;const run=()=>{if(i<steps.length){const el=document.getElementById('vcpbar');const lb=document.getElementById('vc-lbl');if(el)el.style.width=steps[i][0]+'%';if(lb)lb.textContent=steps[i][1];i++;setTimeout(run,380);}else{
    r.innerHTML=`<div class="panel"><div class="panel-head"><div class="panel-icon">✅</div><div class="panel-title">Vergelijkingsresultaten — ${proj}</div></div><div class="panel-body"><div class="vc-grid">
      <div class="vc-card"><div class="vc-title">Variant A — Referentie</div>
        <div class="vc-row"><span class="vc-lbl">BENG 1</span><span class="vc-ok">50 kWh/m²/jr ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">BENG 2</span><span class="vc-warn">48 kWh/m²/jr ✗</span></div>
        <div class="vc-row"><span class="vc-lbl">BENG 3</span><span class="vc-ok">55% ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">GPR</span><span class="vc-v">7,2</span></div>
        <div class="vc-row"><span class="vc-lbl">Meerkosten</span><span class="vc-v">€ 0</span></div>
        <div class="vc-row"><span class="vc-lbl">DUMAVA</span><span style="font-weight:700;color:var(--red);">✗ Nee</span></div>
        <div style="margin-top:8px;font-size:11px;color:var(--mid);">BENG 2 voldoet niet aan 2027 norm. Actie vereist.</div>
      </div>
      <div class="vc-card winner"><div class="vc-badge">★ Aanbevolen</div>
        <div class="vc-title">Variant B — WP + WTW ventilatie</div>
        <div class="vc-row"><span class="vc-lbl">BENG 1</span><span class="vc-ok">47 kWh/m²/jr ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">BENG 2</span><span class="vc-ok">31 kWh/m²/jr ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">BENG 3</span><span class="vc-ok">68% ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">GPR</span><span class="vc-v">8,4</span></div>
        <div class="vc-row"><span class="vc-lbl">Meerkosten</span><span class="vc-v">€ 82.000</span></div>
        <div class="vc-row"><span class="vc-lbl">DUMAVA</span><span class="vc-ok">✓ Subsidiabel</span></div>
        <div style="margin-top:8px;font-size:11px;color:var(--mid);">Beste kosten-baten. DUMAVA ~73%. Netto ca. €22.000. BENG 2 conform 2027.</div>
        <button class="btn btn-primary btn-sm" style="width:100%;margin-top:8px;">✓ Selecteer Variant B</button>
      </div>
      <div class="vc-card"><div class="vc-title">Variant C — Volledig elektrisch + PV</div>
        <div class="vc-row"><span class="vc-lbl">BENG 1</span><span class="vc-ok">45 kWh/m²/jr ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">BENG 2</span><span class="vc-ok">29 kWh/m²/jr ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">BENG 3</span><span class="vc-ok">72% ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">GPR</span><span class="vc-v">8,1</span></div>
        <div class="vc-row"><span class="vc-lbl">Meerkosten</span><span class="vc-v">€ 134.000</span></div>
        <div class="vc-row"><span class="vc-lbl">DUMAVA</span><span style="font-weight:700;color:var(--red);">✗ Niet subsidiabel</span></div>
        <div style="margin-top:8px;font-size:11px;color:var(--mid);">Maximale elektrificatie. Hoge kosten zonder subsidie.</div>
      </div>
    </div>
    <div style="background:rgba(0,200,150,.07);border-radius:4px;padding:12px;font-size:12px;color:var(--mid);border:1px solid rgba(0,200,150,.2);"><strong style="color:var(--teal-accent);">Advies:</strong> Variant B beste kosten-baten. BENG 2: 48 → 31. DUMAVA ~73% meerkosten. Netto slechts €22.000.</div>
    <div style="display:flex;gap:8px;margin-top:12px;"><button class="btn btn-primary btn-sm">📄 Exporteer vergelijking</button><button class="btn btn-outline btn-sm">✦ Naar Rapport Schrijver</button></div>
    </div></div>`;}};run();
}
function wkbBuild(){
  const b=document.getElementById('wkb-body');
  b.innerHTML='<div class="prog-wrap"><div class="prog-bar" id="wkbpbar" style="width:0%"></div></div><div style="font-size:11px;color:var(--mid);margin-top:4px;">WKB vereisten ophalen voor GK2 kantoorfunctie...</div>';
  let w=0;const iv=setInterval(()=>{w+=7;const el=document.getElementById('wkbpbar');if(el)el.style.width=w+'%';if(w>=100){clearInterval(iv);
  b.innerHTML=`<div style="background:rgba(0,200,150,.07);border-radius:4px;padding:14px;margin-bottom:14px;border:1px solid rgba(0,200,150,.2);">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;"><div style="font-size:12px;font-weight:600;color:var(--teal-accent);">Dossier compleetheid</div><div style="font-size:14px;font-weight:700;color:var(--amber);">56%</div></div>
    <div class="prog-wrap" style="margin:0 0 6px;"><div class="prog-bar" style="width:56%;background:var(--amber);"></div></div>
    <div style="font-size:11px;color:var(--mid);">4 items aanwezig · 3 incompleet · 2 ontbreekt</div></div>
  <div class="wkb-item wkb-ok"><div class="wkb-ic">✓</div><div><div class="wkb-lbl">Borgingsplan ingediend</div><div class="wkb-sub">GK2 borgingsplan · ref. BP-2026-062</div></div></div>
  <div class="wkb-item wkb-ok"><div class="wkb-ic">✓</div><div><div class="wkb-lbl">Kwaliteitsborger aangesteld</div><div class="wkb-sub">Bouwend Nederland KB · WKB niveau 2</div></div></div>
  <div class="wkb-item wkb-ok"><div class="wkb-ic">✓</div><div><div class="wkb-lbl">Voormelding Bevoegd Gezag</div><div class="wkb-sub">Gemeente Rotterdam · ontvangen 18 jan 2026</div></div></div>
  <div class="wkb-item wkb-ok"><div class="wkb-ic">✓</div><div><div class="wkb-lbl">Constructieve veiligheid VO</div><div class="wkb-sub">Constructierapport goedgekeurd · IBB Ingenieurs</div></div></div>
  <div class="wkb-item wkb-warn"><div class="wkb-ic">⚠</div><div><div class="wkb-lbl">BENG berekening — incompleet</div><div class="wkb-sub">Definitieve NTA 8800 berekening ontbreekt na WP-upgrade. Actie vóór 1 mei.</div></div></div>
  <div class="wkb-item wkb-warn"><div class="wkb-ic">⚠</div><div><div class="wkb-lbl">Brandcompartimentering — incompleet</div><div class="wkb-sub">WBDBO berekening (NEN 6068) niet aangeleverd. Vereist voor GK2 kantoor.</div></div></div>
  <div class="wkb-item wkb-warn"><div class="wkb-ic">⚠</div><div><div class="wkb-lbl">Akoestisch rapport — incompleet</div><div class="wkb-sub">Verkeersgeluid Weena nog niet berekend (Bbl afd. 3.1).</div></div></div>
  <div class="wkb-item wkb-miss"><div class="wkb-ic">✗</div><div><div class="wkb-lbl">Dossier Bevoegd Gezag</div><div class="wkb-sub">Nog te compileren na afronding BENG, brand en akoestiek.</div></div></div>
  <div class="wkb-item wkb-miss"><div class="wkb-ic">✗</div><div><div class="wkb-lbl">Opleverdossier</div><div class="wkb-sub">Fase: DO. Wordt aangemaakt bij oplevering.</div></div></div>
  <div style="display:flex;gap:8px;margin-top:12px;"><button class="btn btn-primary btn-sm">⬇ Export WKB dossier PDF</button><button class="btn btn-outline btn-sm">📧 Stuur naar kwaliteitsborger</button></div>`;}},80);
}
