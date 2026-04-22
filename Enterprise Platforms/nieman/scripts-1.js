const titles={
  dashboard:'Dashboard',
  rapport:'Rapport Schrijver',
  excel:'Excel Assistent',
  beng:'BENG Checker',
  normen:'Norm Monitor',
  kennis:'Kennisbank'
};

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
  const bar=document.getElementById('rpbar');
  const lbl=document.getElementById('rp-lbl');
  const prog=document.getElementById('rp-prog');
  const out=document.getElementById('rp-out');
  const acts=document.getElementById('rp-acts');
  prog.style.display='block';
  acts.style.display='none';
  out.innerHTML='<span style="color:var(--soft)">Rapport wordt opgesteld conform Nieman-standaarden...</span>';
  const steps=[
    [12,'Projectgegevens inlezen en valideren...'],
    [28,'Nieman rapport-sjablonen laden...'],
    [44,'NEN 6068 en Bbl afdeling 2.2 toepassen...'],
    [58,'Compartimenteringsschema opstellen...'],
    [70,'Vluchtroutes en rookcompartimenten berekenen...'],
    [83,'Rapportopmaak en figuurverwijzingen...'],
    [94,'Eindcontrole conform WKB checklist...'],
    [100,'Rapport gereed voor oplevering!']
  ];
  let i=0;
  const run=()=>{
    if(i<steps.length){
      bar.style.width=steps[i][0]+'%';
      lbl.textContent=steps[i][1];
      i++;
      setTimeout(run,480);
    } else {
      prog.style.display='none';
      acts.style.display='flex';
      acts.innerHTML='<button class="btn btn-primary btn-sm" onclick="alert(\'Rapport wordt geëxporteerd als .docx...\')">⬇ Download .docx</button><button class="btn btn-outline btn-sm" onclick="alert(\'Rapport openen in editor...\')">✏ Bewerk in editor</button><button class="btn btn-outline btn-sm" onclick="alert(\'Rapport gedeeld via e-mail...\')">✉ Verstuur aan opdrachtgever</button>';
      out.innerHTML=`<strong style="color:var(--navy);font-family:'Cormorant Garamond',serif;font-size:15px;">Brandveiligheidsrapport — Ziekenhuis Isala Nieuwbouw west</strong><br><br>
<strong>Opdrachtgever:</strong> Isala Klinieken, Zwolle<br>
<strong>Adviseur:</strong> Nieman Raadgevende Ingenieurs BV · Utrecht<br>
<strong>Kenmerk:</strong> NIE-2026-0341-BV · Versie 1.0 concept<br>
<strong>Datum:</strong> 21 april 2026<br><br>
<strong>1. Inleiding en aanleiding</strong><br>
Dit rapport betreft het brandveiligheidsadvies voor de nieuwbouw van het westelijk gebouwdeel van Isala Klinieken te Zwolle. Het gebouw omvat 6 bouwlagen met een bruto vloeroppervlak van 18.400 m² en is bestemd voor opname van patiënten, behandelruimten en ondersteunende functies.<br><br>
<strong>2. Wettelijk kader</strong><br>
Toetsing conform:<br>
• Besluit bouwwerken leefomgeving (Bbl) afdeling 2.2 — Beperken van ontwikkeling van brand<br>
• NEN 6068:2026 — Weerstand tegen branddoorslag en brandoverslag (WBDBO)<br>
• NEN-EN 1337 — Vluchtroutes en nooduitgangen<br><br>
<strong>3. Brandcompartimentering</strong><br>
Het gebouw is opgedeeld in 24 brandcompartimenten van gemiddeld 760 m². Alle compartimentsgrenzen hebben een WBDBO van minimaal 60 minuten conform Bbl art. 2.98.<br><br>
<strong>4. Vluchtroutes</strong><br>
• Maximale vluchtafstand: <strong style="color:var(--green);">54 m ✓</strong> (eis ≤ 60 m voor gezondheidszorgfunctie)<br>
• Aantal noodtrappen: 4 (conform berekening NEN-EN 1337)<br>
• Horizontale evacuatie via nevencompartimenten: toegepast<br><br>
<strong>5. Conclusie</strong><br>
Het gebouwontwerp voldoet aan de brandveiligheidseisen conform Bbl 2024 en NEN 6068:2026. <strong style="color:var(--green);">Geen afwijkingen geconstateerd.</strong><br><br>
<em style="color:var(--soft);font-size:11.5px;">Gegenereerd door Nieman Digitaal Platform · NEN 6068:2026 + Bbl afd. 2.2 · 21 april 2026</em>`;
    }
  };
  run();
}

function loadXLS(){
  document.getElementById('xls-body').innerHTML=`
<div style="margin-bottom:10px;font-size:12px;color:var(--soft);">📂 bouwfysica_brandveiligheid_WKB.xlsx geladen — 2 ontbrekende waarden gedetecteerd</div>
<div class="xls-preview">
  <div class="xrow xhead"><div class="xcell">Bouwdeel</div><div class="xcell">Opp. m²</div><div class="xcell">Rc / U</div><div class="xcell">Bbl eis</div><div class="xcell">Temp.∆ °C</div><div class="xcell">Verlies W</div></div>
  <div class="xrow"><div class="xcell">Gevel oost</div><div class="xcell">312</div><div class="xcell">5.5</div><div class="xcell">≥ 4.7</div><div class="xcell">22</div><div class="xcell">1.248</div></div>
  <div class="xrow"><div class="xcell">Gevel west</div><div class="xcell">312</div><div class="xcell">5.5</div><div class="xcell">≥ 4.7</div><div class="xcell">22</div><div class="xcell">1.248</div></div>
  <div class="xrow"><div class="xcell">Dak plat</div><div class="xcell">1.280</div><div class="xcell" style="color:var(--amber);font-weight:700;">?</div><div class="xcell">≥ 6.0</div><div class="xcell">22</div><div class="xcell" style="color:var(--amber);">—</div></div>
  <div class="xrow"><div class="xcell">Begane grond</div><div class="xcell">1.280</div><div class="xcell" style="color:var(--amber);font-weight:700;">?</div><div class="xcell">≥ 3.5</div><div class="xcell">12</div><div class="xcell" style="color:var(--amber);">—</div></div>
  <div class="xrow"><div class="xcell">Glas gevel</div><div class="xcell">520</div><div class="xcell">0.60</div><div class="xcell">≤ 0.7</div><div class="xcell">22</div><div class="xcell">6.864</div></div>
  <div class="xrow"><div class="xcell">Thermische bruggen</div><div class="xcell">—</div><div class="xcell">—</div><div class="xcell">—</div><div class="xcell">—</div><div class="xcell">980</div></div>
</div>
<div style="margin-bottom:10px;"><span class="ai-chip">✦ Gedetecteerd: 2 ontbrekende Rc-waarden — klik op Verwerk automatisch</span></div>
<button class="btn btn-gold btn-sm" onclick="procXLS()">✦ Verwerk automatisch</button>`;
}

function procXLS(){
  const b=document.getElementById('xls-body');
  b.innerHTML='<div class="prog-wrap"><div class="prog-bar" id="xpbar" style="width:0%"></div></div><div style="font-size:11.5px;color:var(--soft);margin-top:5px;" id="xp-lbl">NEN 1068 / NEN-EN ISO 6946 waarden opzoeken...</div>';
  const steps=[[20,'NEN 1068 standaardwaarden ophalen...'],[45,'Rc-waarden berekenen per constructieopbouw...'],[65,'Bbl eisen toetsen...'],[85,'Totaal warmtedoorlaatverlies berekenen...'],[100,'Analyse voltooid!']];
  let i=0,w=0;
  const lbl=document.getElementById('xp-lbl');
  const iv=setInterval(()=>{
    if(i<steps.length){w=steps[i][0];document.getElementById('xpbar').style.width=w+'%';if(lbl)lbl.textContent=steps[i][1];i++;}
    if(w>=100){
      clearInterval(iv);
      b.innerHTML=`
<div style="margin-bottom:10px;"><span class="ai-chip">✦ 2 waarden ingevuld · Bbl toetsing voltooid · 1 aandachtspunt</span></div>
<div class="xls-preview">
  <div class="xrow xhead"><div class="xcell">Bouwdeel</div><div class="xcell">Opp. m²</div><div class="xcell">Rc / U</div><div class="xcell">Bbl eis</div><div class="xcell">Temp.∆ °C</div><div class="xcell">Verlies W</div></div>
  <div class="xrow"><div class="xcell">Gevel oost</div><div class="xcell">312</div><div class="xcell">5.5</div><div class="xcell">≥ 4.7 ✓</div><div class="xcell">22</div><div class="xcell">1.248</div></div>
  <div class="xrow"><div class="xcell">Gevel west</div><div class="xcell">312</div><div class="xcell">5.5</div><div class="xcell">≥ 4.7 ✓</div><div class="xcell">22</div><div class="xcell">1.248</div></div>
  <div class="xrow"><div class="xcell">Dak plat</div><div class="xcell">1.280</div><div class="xcell xai">6.5 ✦</div><div class="xcell">≥ 6.0 ✓</div><div class="xcell">22</div><div class="xcell xai">4.323 ✦</div></div>
  <div class="xrow"><div class="xcell">Begane grond</div><div class="xcell">1.280</div><div class="xcell xai">3.5 ✦</div><div class="xcell">≥ 3.5 ✓</div><div class="xcell">12</div><div class="xcell xai">4.389 ✦</div></div>
  <div class="xrow"><div class="xcell">Glas gevel</div><div class="xcell">520</div><div class="xcell">0.60</div><div class="xcell">≤ 0.7 ✓</div><div class="xcell">22</div><div class="xcell">6.864</div></div>
  <div class="xrow"><div class="xcell">Thermische bruggen</div><div class="xcell">—</div><div class="xcell">—</div><div class="xcell">—</div><div class="xcell">—</div><div class="xcell">980</div></div>
  <div class="xrow" style="background:var(--gold-soft);font-weight:700;"><div class="xcell">TOTAAL</div><div class="xcell">—</div><div class="xcell">—</div><div class="xcell">—</div><div class="xcell">—</div><div class="xcell xai">19.052 W ✦</div></div>
</div>
<div style="background:var(--gold-pale);border:1px solid rgba(244,162,97,.3);border-radius:8px;padding:14px;font-size:12.5px;color:var(--navy);margin-top:8px;line-height:1.6;">
  <strong>Conclusie:</strong> Totaal transmissieverlies 19,05 kW. Alle bouwdelen voldoen aan Bbl-eisen conform NEN 1068. Begane grond vloerisolatie exact op grenswaarde — <strong style="color:var(--amber);">aanbeveling: verhoog Rc naar 4.0 voor marge.</strong> BENG 1 gehaald. <strong style="color:var(--green);">✓ WKB kwaliteitsverklaring kan worden afgegeven.</strong>
</div>
<div style="margin-top:12px;display:flex;gap:8px;">
  <button class="btn btn-primary btn-sm" onclick="alert('Excel exporteren...')">⬇ Download Excel</button>
  <button class="btn btn-outline btn-sm" onclick="alert('Rapport openen...')">📄 Naar WKB rapport</button>
  <button class="btn btn-outline btn-sm" onclick="alert('Aandachtspuntenlijst exporteren...')">⚠ Exporteer aandachtspunten</button>
</div>`;
    }
  },200);
}

function checkBENG(){
  const b=document.getElementById('beng-body');
  b.innerHTML='<div class="prog-wrap"><div class="prog-bar" id="bpbar" style="width:0%"></div></div><div style="font-size:11.5px;color:var(--soft);margin-top:5px;" id="bp-lbl">BENG indicatoren berekenen conform Bbl bijlage A...</div>';
  let w=0;
  const lbl=document.getElementById('bp-lbl');
  const steps=[[15,'Geometrie en oriëntatie verwerken...'],[35,'Warmtevraag berekenen (NEN 7120)...'],[55,'Systeemsimulatie warmtepomp + PV...'],[75,'Primair fossiel energiegebruik bepalen...'],[90,'Aandeel hernieuwbaar berekenen...'],[100,'Resultaten gereed!']];
  let si=0;
  const iv=setInterval(()=>{
    if(si<steps.length){w=steps[si][0];document.getElementById('bpbar').style.width=w+'%';if(lbl)lbl.textContent=steps[si][1];si++;}
    if(w>=100){
      clearInterval(iv);
      b.innerHTML=`
<div class="brc brc-pass">
  <div class="brow"><div style="font-size:12.5px;font-weight:700;">BENG 1 — Energiebehoefte</div><div style="font-size:14px;font-weight:800;color:var(--green)">34 kWh/m²/jr ✓</div></div>
  <div class="brow"><div style="font-size:11px;color:var(--soft)">Eis woonfunctie (Bbl bijlage A)</div><div style="font-size:11px;color:var(--mid)">≤ 55 kWh/m²/jr</div></div>
  <div class="brow"><div style="font-size:11px;color:var(--soft)">Marge t.o.v. eis</div><div style="font-size:11px;font-weight:700;color:var(--green)">38% ruimte</div></div>
</div>
<div class="brc brc-pass">
  <div class="brow"><div style="font-size:12.5px;font-weight:700;">BENG 2 — Primair fossiel energiegebruik</div><div style="font-size:14px;font-weight:800;color:var(--green)">17 kWh/m²/jr ✓</div></div>
  <div class="brow"><div style="font-size:11px;color:var(--soft)">Eis vanaf jan 2027 (Bbl)</div><div style="font-size:11px;color:var(--mid)">≤ 20 kWh/m²/jr</div></div>
  <div class="brow"><div style="font-size:11px;color:var(--soft)">Huidige marge</div><div style="font-size:11px;font-weight:700;color:var(--green)">15% marge boven 2027-eis</div></div>
</div>
<div class="brc brc-pass">
  <div class="brow"><div style="font-size:12.5px;font-weight:700;">BENG 3 — Aandeel hernieuwbaar</div><div style="font-size:14px;font-weight:800;color:var(--green)">79% ✓</div></div>
  <div class="brow"><div style="font-size:11px;color:var(--soft)">Eis (Bbl bijlage A)</div><div style="font-size:11px;color:var(--mid)">≥ 50%</div></div>
  <div class="brow"><div style="font-size:11px;color:var(--soft)">Contributie PV panelen (980 m²)</div><div style="font-size:11px;font-weight:700;color:var(--green)">162 MWh/jr</div></div>
</div>
<div style="background:#D8F3DC;border-radius:8px;padding:14px;margin-top:10px;border:1px solid rgba(45,106,79,.2);">
  <div style="font-size:13.5px;font-weight:800;color:var(--green);font-family:'Cormorant Garamond',serif;">✓ Alle BENG indicatoren ruimschoots gehaald</div>
  <div style="font-size:11.5px;color:var(--mid);margin-top:5px;line-height:1.55;">Project kwalificeert voor WKB kwaliteitsverklaring. BENG 2 heeft 15% marge boven de aankomende 2027-eis. Conform Bbl 2024 bijlage A. Aanvraag omgevingsvergunning kan worden ingediend.</div>
</div>
<div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;">
  <button class="btn btn-primary btn-sm" onclick="alert('BENG rapport genereren...')">📄 Genereer BENG rapport</button>
  <button class="btn btn-outline btn-sm" onclick="alert('PDF exporteren...')">⬇ Exporteer PDF</button>
  <button class="btn btn-outline btn-sm" onclick="alert('Naar WKB dossier...')">📋 Voeg toe aan WKB dossier</button>
</div>`;
    }
  },180);
}

const kbData=[
  {
    title:'Brandveiligheidsadvies Isala Ziekenhuis Meppel — Uitbreiding SEH',
    meta:'Brandveiligheid · 2024 · 8.200 m² · Zwolle',
    snip:'Volledig brandveiligheidsadvies conform NEN 6068 en Bbl afd. 2.2. Compartimentering 28 brandcompartimenten. Horizontale evacuatiestrategie toegepast. Samenwerking brandweer IJsselland.',
    tags:['Brandveiligheid','NEN 6068','Zorg'],
    score:99
  },
  {
    title:'WKB Kwaliteitsborging — Woontoren Stationsplein Utrecht',
    meta:'WKB · Bouwfysica · 2025 · 22.400 m² · Utrecht',
    snip:'WKB dossiervoorbereiding gevolgklasse 2. Volledige bouwfysische toetsing Bbl. 287 appartementen. Kwaliteitsverklaring afgegeven. Eerste grootschalige WKB-project in centraal Utrecht.',
    tags:['WKB','Bouwfysica','Woningbouw'],
    score:97
  },
  {
    title:'Akoestisch onderzoek De Rotterdam — Gemengd gebruik',
    meta:'Akoestiek · 2024 · 34.600 m² · Rotterdam',
    snip:'Lucht- en contactgeluidsisolatie conform NPR 5272. Gecombineerde woon- en kantoorfunctie. Complexe geluidssituatie Wilhelminakade. Alle maatregelen binnen budgetkaders gerealiseerd.',
    tags:['Akoestiek','Gemengd gebruik','Rotterdam'],
    score:94
  },
  {
    title:'Bouwfysica grootschalige woningbouw Zwolle Stadshagen fase 3',
    meta:'Bouwfysica · BENG · 2023 · 18.900 m² · Zwolle',
    snip:'BENG berekeningen 186 woningen. Thermische bruggencatalogus opgesteld. Dauwpuntanalyse per geveltype. CO₂ reductie 68% t.o.v. referentiegebouw. Paris Proof 2030 gehaald.',
    tags:['Bouwfysica','BENG','Woningbouw'],
    score:91
  }
];

function searchKB(){
  const q=document.getElementById('kb-q').value;
  const filtered=kbData;
  document.getElementById('kb-meta').textContent=`${filtered.length} resultaten voor "${q}" — gesorteerd op relevantie · Nieman kennisbank 2019–2026`;
  document.getElementById('kb-results').innerHTML=filtered.map(k=>`
<div class="kb-item">
  <span class="match">${k.score}% match</span>
  <div class="kb-title">${k.title}</div>
  <div class="kb-meta">${k.meta}</div>
  <div class="kb-snip">${k.snip}</div>
  <div class="kb-tags">${k.tags.map(t=>`<span class="ntag t-bbl">${t}</span>`).join('')}</div>
</div>`).join('');
}

function filterProjects(){
  alert('Filteropties: discipline, vestiging, status, deadline, opdrachtgever. Functionaliteit beschikbaar in enterprise versie.');
}
function exportTable(){
  alert('Projectoverzicht exporteren als .xlsx of .pdf...');
}
function newProject(){
  alert('Nieuw project aanmaken — koppeling met Nieman projectadministratie (TOPdesk)...');
}
function openProject(name){
  alert('Project "'+name+'" openen in projectdossier...');
}
function normAction(norm){
  alert('Impact van "'+norm+'" controleren op alle lopende Nieman projecten...');
}
function refreshNorms(){
  alert('Norm Monitor wordt bijgewerkt via NEN Connect en officielebekendmakingen.nl...');
}
