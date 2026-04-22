const titles={dashboard:'Dashboard',rapport:'Rapport Schrijver',excel:'Excel Assistent',beng:'BENG Checker',normen:'Norm Monitor',kennis:'Kennisbank'};

function show(id,el){
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
      acts.innerHTML='<button class="btn btn-primary btn-sm">⬇ Download .docx</button><button class="btn btn-outline btn-sm">✏ Bewerk</button><button class="btn btn-outline btn-sm">📤 Verstuur naar klant</button>';
      out.innerHTML=`<strong style="color:var(--forest);font-family:'Raleway',sans-serif;font-size:14px;">Duurzaamheidsscan — Papendorp-Noord</strong><br><br><strong>Opdrachtgever:</strong> Amvest Vastgoed BV<br><strong>Adviseur:</strong> D. van Tienen · DVTadvies · 21 april 2026<br><br><strong>1. Gebouwomschrijving</strong><br>Kantoorcomplex Papendorp-Noord, bouwjaar 1997, 4.200 m² BVO verdeeld over 3 bouwlagen. Huidig energielabel C. Gasgestookte HR-ketels, geen hernieuwbare energie aanwezig.<br><br><strong>2. Energieprestatie nulmeting</strong><br>Huidig primair energiegebruik: <strong>187 kWh/m²/jr</strong>. CO₂-emissie gebouwgebonden: 38,4 ton/jr. Paris Proof target 2030: 55 kWh/m²/jr — <span style="color:var(--red)">niet gehaald</span>.<br><br><strong>3. Maatregelplan naar label A</strong><br>• Lucht-water warmtepomp (COP 3,9) — vervanging gasketels<br>• PV installatie 64 kWp dakoppervlak<br>• Gevelisolatie Rc 4,5 m²K/W<br>• WTW ventilatie η=88%<br><br><strong>4. CO₂-reductie &amp; financieel</strong><br>Verwachte CO₂-reductie: <strong style="color:var(--green)">74%</strong> · van 38,4 t naar 10,1 t/jr.<br>Energielabel na maatregelen: <strong style="color:var(--green)">A+</strong><br>Investeringskosten: ca. €485.000 · Terugverdientijd: 7,2 jaar.<br><br><strong>5. DUMAVA subsidie</strong><br>Geschatte DUMAVA subsidie: <strong style="color:var(--green)">€112.000</strong> (23% van subsidiabele kosten).<br><br><em style="color:var(--soft);font-size:11px;">Gegenereerd door DVTadvies Digitaal Platform · NTA 8800:2026 · DUMAVA 2026 · Paris Proof 2030</em>`;
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
      </div>`;
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
      </div>`;
    }
  },100);
}

const kbData=[
  {title:'Energielabel A+ traject wooncomplex Overvecht Utrecht',meta:'Woningbouw · 2024 · 8.200 m² · Utrecht',snip:'NTA 8800 berekening, warmtepomp, PV 88 kWp, gevelisolatie Rc 4,5. Energielabel van D naar A+. DUMAVA subsidie €94.000 verkregen.',score:98},
  {title:'DUMAVA subsidieaanvraag kantoor Leidsche Rijn',meta:'Kantoor · 2025 · 3.600 m² · Utrecht',snip:'Complete DUMAVA dossier: subsidiabele kosten €380.000, toegekend €87.400. Warmtepomp + PV + bouwkundige maatregelen. Paris Proof 2030 gehaald.',score:94},
  {title:'CO₂-routekaart wijk Hoograven Den Haag',meta:'Gemengd wonen · 2023 · 340 woningen · Den Haag',snip:'Wijkgerichte aanpak klimaatneutraliteit 2035. Warmtenet aansluiting, hybride warmtepomp, collectieve PV. CO₂-reductie 68% gerealiseerd.',score:89},
  {title:'Circulaire renovatie schoolgebouw Amersfoort',meta:'Onderwijs · 2024 · 2.800 m² · Amersfoort',snip:'Materiaalpasspoort opgesteld, 74% materiaalhergebruik, energielabel G naar A. Bbl circulaire sloopmelding toegepast. Frisse Scholen klasse B behaald.',score:85},
];

function searchKB(){
  const q=document.getElementById('kb-q').value;
  document.getElementById('kb-meta').textContent=kbData.length+` resultaten voor "${q}" — gesorteerd op relevantie`;
  document.getElementById('kb-results').innerHTML=kbData.map(k=>`<div class="kb-item"><span class="match">${k.score}% match</span><div class="kb-title">${k.title}</div><div class="kb-meta">${k.meta}</div><div class="kb-snip">${k.snip}</div></div>`).join('');
}
