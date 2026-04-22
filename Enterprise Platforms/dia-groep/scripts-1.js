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
      out.innerHTML=`<strong style="font-family:'Barlow Condensed',sans-serif;color:var(--teal-accent);font-size:15px;letter-spacing:.5px;text-transform:uppercase;">Exploitatieadvies — TivoliVredenburg Utrecht</strong><br><br><strong style="color:var(--text);">Opdrachtgever:</strong> <span style="color:var(--mid)">TivoliVredenburg Stichting</span><br><strong style="color:var(--text);">Adviseur:</strong> <span style="color:var(--mid)">DIA Groep Zeist · 21 april 2026</span><br><br><strong style="color:var(--text);">1. Projectomschrijving</strong><br><span style="color:var(--mid)">TivoliVredenburg is een toonaangevend muziek- en evenementengebouw in het hart van Utrecht (BVO: 11.400 m², 5 zalen). Dit exploitatieadvies richt zich op reductie van energiekosten, verlenging van installatietechnische levensduur en aansluiting op Paris Proof 2030-doelstellingen.</span><br><br><strong style="color:var(--text);">2. Exploitatiebevindingen</strong><br><span style="color:var(--mid)">Huidig energieverbruik: 1.320 MWh/jr (116 kWh/m²/jr). Benchmark bijeenkomstfunctie: 90 kWh/m²/jr. Grootste verliezen: HVAC ongeplande stops (23%), verlichtingsbeheer (18%), koelinstallatie zaalklimaat (31%).</span><br><br><strong style="color:var(--text);">3. Aanbevelingen</strong><br><span style="color:var(--mid)">• BMS-upgrade met slimme zaaloccupatie koppeling <strong style="color:var(--green)">↓ 14%</strong><br>• LED-retrofit algemene ruimten + dimregeling <strong style="color:var(--green)">↓ 18%</strong><br>• WKO-voorstudie voor basiskoeling/-verwarming<br>• Exploitatieplan 5-jaar incl. onderhoudsmomenten</span><br><br><strong style="color:var(--text);">4. BENG Indicatoren (prognose)</strong><br><span style="color:var(--mid)">• BENG 1: <strong style="color:var(--green)">61 kWh/m²/jr ✓</strong> (eis bijeenkomst ≤75)<br>• BENG 2: <strong style="color:var(--green)">38 kWh/m²/jr ✓</strong> (eis ≤40)<br>• BENG 3: <strong style="color:var(--green)">54% ✓</strong> (eis ≥50%)</span><br><br><em style="color:var(--soft);font-size:11px;">Gegenereerd door DIA Groep Digitaal Platform · NEN 7120 + Paris Proof 2030 · Eerst denken, dan doen.</em>`;
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
        </div>`;
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
        </div>`;
    }
  },95);
}

const kbData=[
  {title:'Exploitatieadvies TivoliVredenburg — HVAC optimalisatie',meta:'Cultuur · 2024 · 11.400 m² · Utrecht',snip:'Volledige exploitatiedoorlichting muziekgebouw. BMS-upgrade bespaarde 22% op HVAC. Paris Proof strategie 2030 opgesteld. Terugverdientijd 2,4 jaar.',score:98},
  {title:'Sportcampus Leidsche Rijn — W/E installatieontwerp',meta:'Sport · 2023 · 8.200 m² · Utrecht',snip:'Nieuwbouw indoor sportcomplex. Warmtepomp + PV 140 kWp + WTW ventilatie η=92%. BENG 3: 71%. Aardgasvrij ontwerp, oplevering on-time binnen budget.',score:93},
  {title:'Kovelswade Rijksmonument — Installatierenovatie',meta:'Monument · 2022 · 2.800 m² · Utrecht',snip:'Installatierenovatie in beschermd Rijksmonument. Maatwerk HVAC zonder aanpassing monumentale gevel. Energielabel C → A. Alle vergunningen eerste ronde verleend.',score:89},
  {title:'Windpark Zeewolde — Infra- en E-installaties',meta:'Energie · 2025 · Zeewolde · Flevoland',snip:'Elektrotechnische infrastructuur voor het grootste windpark van Nederland (241 turbines). Transformatorstations, kabelroutering, monitoring systeem. On-time opgeleverd.',score:84},
];

function searchKB(){
  const q=(document.getElementById('kb-q')||{}).value||'';
  document.getElementById('kb-meta').textContent=kbData.length+` resultaten voor "${q}" — gesorteerd op relevantie`;
  document.getElementById('kb-results').innerHTML=kbData.map(k=>`
    <div class="kb-item">
      <span class="match">${k.score}% match</span>
      <div class="kb-title">${k.title}</div>
      <div class="kb-meta">${k.meta}</div>
      <div class="kb-snip">${k.snip}</div>
    </div>`).join('');
}
