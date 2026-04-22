const titles={dashboard:'Dashboard',rapport:'Rapport Schrijver',excel:'Excel Assistent',beng:'BENG Checker',normen:'Norm Monitor',kennis:'Kennisbank',concept:'Concept Generator'};
function show(id,el){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  if(el)el.classList.add('active');
  document.getElementById('ptitle').textContent=titles[id]||id;
  if(id==='kennis')searchKB();
}
function selRT(el){document.querySelectorAll('.rt-btn').forEach(b=>b.classList.remove('sel'));el.classList.add('sel');}
function genRapport(){
  const bar=document.getElementById('rpbar'),lbl=document.getElementById('rp-lbl'),prog=document.getElementById('rp-prog'),out=document.getElementById('rp-out'),acts=document.getElementById('rp-acts');
  prog.style.display='block';acts.style.display='none';out.innerHTML='<span style="color:var(--soft)">Rapport wordt opgesteld...</span>';
  const steps=[[12,'Projectgegevens verwerken...'],[28,'Feniks-templates laden...'],[46,'NEN-EN 12354 normen toepassen...'],[63,'Geluidsisolatie waarden berekenen...'],[80,'Aanbevelingen formuleren...'],[95,'Rapport opmaken...'],[100,'Rapport gereed!']];
  let i=0;const run=()=>{if(i<steps.length){bar.style.width=steps[i][0]+'%';lbl.textContent=steps[i][1];i++;setTimeout(run,420);}else{prog.style.display='none';acts.style.display='flex';acts.innerHTML='<button class="btn btn-primary btn-sm">⬇ Download .docx</button><button class="btn btn-outline btn-sm">✏ Bewerk</button>';out.innerHTML=`<strong style="color:var(--accent);font-family:'Crimson Text',serif;font-size:16px;">Akoestisch Rapport — Appartementen Lombok Utrecht</strong><br><br><strong style="color:var(--mid);">Opdrachtgever:</strong> <span style="color:var(--text);">Heijmans Wonen BV</span><br><strong style="color:var(--mid);">Adviseur:</strong> <span style="color:var(--text);">Feniks Installatie-adviseurs · H. Tromp · 21 april 2026</span><br><br><strong style="color:var(--text);">1. Projectomschrijving</strong><br><span style="color:var(--mid);">Renovatie van 48 bestaande appartementen te Utrecht-Lombok. Aanleiding: klachten over geluidshinder tussen woningen. Scope: analyse bestaande situatie, ontwerp verbetermaatregelen en begeleiding uitvoering.</span><br><br><strong style="color:var(--text);">2. Bestaande situatie</strong><br><span style="color:var(--mid);">Veldmeting conform NEN-EN ISO 16283-1 uitgevoerd op 8 representatieve scheidingsvloeren. Gemeten DnT,A,k gemiddeld <strong style="color:var(--red);">46 dB</strong> — niet voldoend aan Bbl eis van 52 dB.</span><br><br><strong style="color:var(--text);">3. Verbetermaatregelen</strong><br><span style="color:var(--mid);">• Drijvende dekvloer 80mm (betonkern + isolatie) → verwachte verbetering +11 dB<br>• Plafondvering woningscheidende wanden → +6 dB<br>• Akoestische dichte kieren- en naaddichting installaties</span><br><br><strong style="color:var(--text);">4. Verwacht resultaat</strong><br><span style="color:var(--mid);">Na uitvoering: DnT,A,k ≥ <strong style="color:var(--green);">57 dB ✓</strong> — voldoet ruimschoots aan Bbl eis én nieuwe Bbl-norm 2027 (≥55 dB).</span><br><br><em style="color:var(--soft);font-size:11px;">Gegenereerd door Feniks Digitaal Platform · NEN-EN 12354-1 + Bbl 2026 · 40 jaar bouwfysische expertise</em><div style="margin-top:12px;padding-top:10px;border-top:1px solid var(--border);"><button class="expl-btn" onclick="toggleExplain('ep-rapport')">▶ Waarom is dit correct?</button><div class="expl-pan" id="ep-rapport"><strong style="color:var(--text);">Gebaseerd op:</strong><br>• <strong>NEN-EN 12354-1:2017</strong> — Berekening geluidsisolatie gebouwen (luchtgeluid)<br>• <strong>NEN-EN ISO 16283-1</strong> — Veldmeting vloergeluidsisolatie<br>• <strong>Bbl 2024 art. 3.28</strong> — Luchtgeluidsisolatie woningscheidende bouwdelen (≥52 dB)<br>• <strong>Bbl rev. 2027</strong> — Aanscherping naar ≥55 dB contactgeluid<br><br><strong style="color:var(--text);">Aannames:</strong><br>• Veldcorrectie C = -2 dB conform NEN-EN 12354-1 tabel F.1<br>• Flankerend transport berekend met bijdragenfactor per bouwdeel<br><div class="expl-src">📚 Bronnen: NEN-EN 12354-1:2017, NEN-EN ISO 16283-1, Bbl 2024 art. 3.28, SBR-richtlijn A</div></div></div>`;}};run();
}
function loadXLS(){
  document.getElementById('xls-body').innerHTML=`<div style="margin-bottom:10px;font-size:12px;color:var(--soft);">📂 geluidsisolatie_berekening.xlsx geladen</div><div class="xls-preview"><div class="xrow xhead"><div class="xcell">Scheidingsconstructie</div><div class="xcell">Opp. m²</div><div class="xcell">Rw (dB)</div><div class="xcell">Correctie C</div><div class="xcell">DnT,A,k</div></div><div class="xrow"><div class="xcell">Woningscheidende vloer</div><div class="xcell">62</div><div class="xcell">48</div><div class="xcell">-2</div><div class="xcell">46</div></div><div class="xrow"><div class="xcell">Woningscheidende wand</div><div class="xcell">28</div><div class="xcell">52</div><div class="xcell">-1</div><div class="xcell">51</div></div><div class="xrow"><div class="xcell">Drijvende dekvloer</div><div class="xcell">62</div><div class="xcell xai" style="color:var(--amber);font-weight:700;">?</div><div class="xcell">-2</div><div class="xcell" style="color:var(--amber);">—</div></div><div class="xrow"><div class="xcell">Leidinggeluiddempende vloer</div><div class="xcell">12</div><div class="xcell xai" style="color:var(--amber);font-weight:700;">?</div><div class="xcell">0</div><div class="xcell" style="color:var(--amber);">—</div></div><div class="xrow"><div class="xcell">Buitengevel</div><div class="xcell">18</div><div class="xcell">35</div><div class="xcell">-3</div><div class="xcell">32</div></div></div><div style="margin-bottom:10px;"><span class="ai-chip">🔥 Gedetecteerd: 2 ontbrekende Rw-waarden</span></div><button class="btn btn-primary btn-sm" onclick="procXLS()">🔥 Verwerk automatisch</button>`;
}
function procXLS(){
  const b=document.getElementById('xls-body');b.innerHTML='<div class="prog-wrap"><div class="prog-bar" id="xpbar" style="width:0%"></div></div><div style="font-size:11px;color:var(--mid);margin-top:4px;">NEN-EN 12354 waarden opzoeken...</div>';
  let w=0;const iv=setInterval(()=>{w+=8;document.getElementById('xpbar').style.width=w+'%';if(w>=100){clearInterval(iv);b.innerHTML=`<div style="margin-bottom:8px;"><span class="ai-chip">🔥 2 waarden ingevuld · totaal berekend</span></div><div class="xls-preview"><div class="xrow xhead"><div class="xcell">Scheidingsconstructie</div><div class="xcell">Opp. m²</div><div class="xcell">Rw (dB)</div><div class="xcell">Correctie C</div><div class="xcell">DnT,A,k</div></div><div class="xrow"><div class="xcell">Woningscheidende vloer</div><div class="xcell">62</div><div class="xcell">48</div><div class="xcell">-2</div><div class="xcell">46</div></div><div class="xrow"><div class="xcell">Woningscheidende wand</div><div class="xcell">28</div><div class="xcell">52</div><div class="xcell">-1</div><div class="xcell">51</div></div><div class="xrow"><div class="xcell">Drijvende dekvloer</div><div class="xcell">62</div><div class="xcell xai">59 ✦</div><div class="xcell">-2</div><div class="xcell xai">57 ✦</div></div><div class="xrow"><div class="xcell">Leidinggeluiddempende vloer</div><div class="xcell">12</div><div class="xcell xai">45 ✦</div><div class="xcell">0</div><div class="xcell xai">45 ✦</div></div><div class="xrow"><div class="xcell">Buitengevel</div><div class="xcell">18</div><div class="xcell">35</div><div class="xcell">-3</div><div class="xcell">32</div></div><div class="xrow" style="background:rgba(196,80,10,.12);font-weight:700;"><div class="xcell" style="color:var(--accent);">GEWOGEN RESULTAAT</div><div class="xcell">—</div><div class="xcell">—</div><div class="xcell">—</div><div class="xcell xai">DnT,A,k 53 dB ✦</div></div></div><div style="background:rgba(76,175,125,.1);border:1px solid rgba(76,175,125,.2);border-radius:8px;padding:12px;font-size:12px;color:var(--green);margin-top:8px;"><strong>Conclusie:</strong> Gecombineerde geluidsisolatie DnT,A,k = 53 dB. <strong>Voldoet aan huidige Bbl eis ≥52 dB ✓.</strong> Let op: bij renovatie ná 2027 is eis ≥55 dB — aanvullende maatregelen nodig.</div><div style="margin-top:10px;display:flex;gap:8px;"><button class="btn btn-primary btn-sm">⬇ Download Excel</button><button class="btn btn-outline btn-sm">📄 Naar rapport</button></div><button class="expl-btn" onclick="toggleExplain('ep-excel')">▶ Waarom is dit correct?</button><div class="expl-pan" id="ep-excel"><strong style="color:var(--text);">Gebruikte norm:</strong><br>• <strong>NEN-EN 12354-1:2017</strong> — Berekeningsmodel geluidsisolatie vloer/wand<br>• Rw-waarden uit tabel NEN-EN 12354-1 bijlage D (standaardconstructies)<br>• Correctiefactoren C en Ctr conform NEN-EN ISO 717-1<br><br><strong style="color:var(--text);">Veldcorrectie methode:</strong><br>DnT,A,k = Rw + C − Veldcorrectie (6 dB flankerend standaard)<br><div class="expl-src">📚 Bronnen: NEN-EN 12354-1:2017, NEN-EN ISO 717-1, Bbl 2024 art. 3.28, SBR-richtlijn A</div></div>`;}},100);
}
function checkBENG(){
  const b=document.getElementById('beng-body');b.innerHTML='<div class="prog-wrap"><div class="prog-bar" id="bpbar" style="width:0%"></div></div>';
  let w=0;const iv=setInterval(()=>{w+=10;document.getElementById('bpbar').style.width=w+'%';if(w>=100){clearInterval(iv);b.innerHTML=`<div class="brc"><div class="brow"><div style="font-size:12px;color:var(--mid)">BENG 1 — Energiebehoefte</div><div style="font-size:13px;font-weight:700;color:var(--green)">68 kWh/m²/jr ✓</div></div><div class="brow"><div style="font-size:11px;color:var(--soft)">Eis (woning, renovatie)</div><div style="font-size:11px;color:var(--mid)">≤ 75 kWh/m²/jr</div></div></div><div class="brc"><div class="brow"><div style="font-size:12px;color:var(--mid)">BENG 2 — Primair fossiel</div><div style="font-size:13px;font-weight:700;color:var(--amber)">28 kWh/m²/jr ⚠</div></div><div class="brow"><div style="font-size:11px;color:var(--soft)">Eis huidig / eis 2026</div><div style="font-size:11px;color:var(--mid)">≤30 / ≤25 per 1 jul 2026</div></div></div><div class="brc"><div class="brow"><div style="font-size:12px;color:var(--mid)">BENG 3 — Hernieuwbaar</div><div style="font-size:13px;font-weight:700;color:var(--green)">61% ✓</div></div><div class="brow"><div style="font-size:11px;color:var(--soft)">Eis woning</div><div style="font-size:11px;color:var(--mid)">≥ 50%</div></div></div><div style="background:rgba(229,166,35,.12);border:1px solid rgba(229,166,35,.25);border-radius:8px;padding:12px;margin-top:8px;"><div style="font-size:13px;font-weight:700;color:var(--amber);">⚠ Let op: BENG 2 krappe marge</div><div style="font-size:11px;color:var(--mid);margin-top:4px;">Huidig ontwerp voldoet aan huidige eis (≤30). Maar per 1 juli 2026 geldt eis ≤25 kWh/m²/jr. Aanbeveling: extra PV of COP verbeteren van 3,8 naar 4,2.</div></div><div style="margin-top:10px;display:flex;gap:8px;"><button class="btn btn-primary btn-sm">📄 Genereer BENG rapport</button><button class="btn btn-outline btn-sm">⬇ PDF</button></div><button class="expl-btn" onclick="toggleExplain('ep-beng')">▶ Waarom is dit correct?</button><div class="expl-pan" id="ep-beng"><strong style="color:var(--text);">Berekeningswijze BENG (woning renovatie):</strong><br>• <strong>BENG 1</strong>: Energiebehoefte na renovatie berekend met verbetering bouwschil naar label B<br>• <strong>BENG 2</strong>: Primair fossiel — COP 3,8 warmtepomp + PV 48 kWp. Krappe marge t.o.v. 2026-eis<br>• <strong>BENG 3</strong>: 61% hernieuwbaar — PV en WTW samen voldoende boven eis<br><br><strong style="color:var(--text);">Aandachtspunt:</strong><br>BENG 2 eis per 1 jul 2026 wordt ≤25 kWh/m²/jr. Huidig ontwerp: 28 — niet voldoende na deadline<br><div class="expl-src">📚 Bronnen: NEN 7120:2011, Bbl 2024 bijlage A, ISSO-75.1, BRL-9500-01</div></div>`;}},100);
}
const kbData=[
  {title:'Geluidsisolatie renovatie Transwijk-flats Utrecht',meta:'Akoestiek · 2022 · 72 appartementen · Utrecht',snip:'Volledige akoestische renovatie woningscheidende vloeren en wanden. DnT,A,k verbeterd van 44 naar 58 dB. NEN-EN 12354 conform.',score:98,
   cmp:{type:'Woning renovatie akoestiek',m2:'72 appartementen',tech:'Drijvende dekvloer + plafondvering',beng2:'N.v.t.',saving:'DnT,A,k +14 dB verbetering',reuse:'Constructiekeuze, NEN-12354 aanpak, uitvoeringsspecificaties'}},
  {title:'Installatieadvies bestaande bouw Zeist',meta:'Bestaande bouw · 2023 · 3.400 m² · Zeist',snip:'Diagnose storingen CV-installatie 30 jaar oud gebouw. Leiding corrosie, ventielproblemen. Gefaseerde vervanging zonder sloopoverlast.',score:94,
   cmp:{type:'Bestaande bouw installaties',m2:'3.400 m²',tech:'Gefaseerde CV-vervanging',beng2:'N.v.t.',saving:'Energielabel C → B',reuse:'Diagnosemethode, gefaseerde aanpak, leveranciersselectie'}},
  {title:'BIM model validatie renovatie Nieuwegein',meta:'BIM · 2024 · 8.200 m² · Nieuwegein',snip:'Clash-detectie W/E installaties in Revit BIM model. 147 clashes gedetecteerd en opgelost voor uitvoering. €180k faalkosten voorkomen.',score:89,
   cmp:{type:'BIM-validatie W/E',m2:'8.200 m²',tech:'Revit clash-detectie + coördinatie',beng2:'N.v.t.',saving:'€180k faalkosten voorkomen',reuse:'BIM-workflow, clash-categorieën, coördinatieproces'}},
  {title:'Directievoering nieuwbouw woningen De Meern',meta:'Directievoering · 2021 · 64 woningen · Utrecht',snip:'Bouwtoezicht W/E installaties gedurende 18 maanden. Oplevering conform planning. 0 gebreken bij eindoplevering.',score:85,
   cmp:{type:'Directievoering nieuwbouw',m2:'64 woningen',tech:'W/E bouwtoezicht + oplevering',beng2:'N.v.t.',saving:'0 gebreken eindoplevering',reuse:'Toezichtsprotocol, opleveringsformat, kwaliteitschecklists'}},
];
function searchKB(){
  const q=document.getElementById('kb-q').value;
  document.getElementById('kb-meta').textContent=kbData.length+` resultaten voor "${q}" — gesorteerd op relevantie`;
  document.getElementById('kb-results').innerHTML=kbData.map((k,idx)=>`<div class="kb-item"><span class="match">${k.score}% match</span><div class="kb-title">${k.title}</div><div class="kb-meta">${k.meta}</div><div class="kb-snip">${k.snip}</div><div style="margin-top:8px;"><button class="expl-btn" style="margin-top:0;" onclick="showCompare(${idx})">◎ Vergelijk met huidig project</button></div><div class="cmp-pan" id="cmp-${idx}"><div class="cmp-title">🔥 Dit project vs. huidige scope</div><div class="cmp-row"><span class="cmp-lbl">Type</span><span class="cmp-val">${k.cmp.type}</span></div><div class="cmp-row"><span class="cmp-lbl">Projectgrootte</span><span class="cmp-val">${k.cmp.m2}</span></div><div class="cmp-row"><span class="cmp-lbl">Techniek</span><span class="cmp-val">${k.cmp.tech}</span></div><div class="cmp-row"><span class="cmp-lbl">Resultaat</span><span class="cmp-val">${k.cmp.saving}</span></div><div class="cmp-row"><span class="cmp-lbl">Hergebruikbare aanpak</span><span class="cmp-val">${k.cmp.reuse}</span></div></div></div>`).join('');
}
function qaAnalyse(){
  document.getElementById('qaOv').classList.add('show');
  const bd=document.getElementById('qaBody');
  bd.innerHTML='<div class="prog-wrap"><div class="prog-bar" id="qapbar" style="width:0%"></div></div><div style="font-size:11px;color:var(--mid);margin-top:6px;">Projecten scannen...</div>';
  let w=0;const iv=setInterval(()=>{w+=5;const el=document.getElementById('qapbar');if(el)el.style.width=w+'%';if(w>=100){clearInterval(iv);bd.innerHTML=`<div style="margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;"><div style="font-size:12px;color:var(--mid);">4 projecten gescand · <strong style="color:var(--red);">1 hoog risico</strong> · 3 aandachtspunten</div><span class="ai-chip">🔥 QA Score: 78/100</span></div><div class="iss-row"><div class="iss-r r-h">Hoog</div><div><div class="iss-txt"><strong style="color:var(--text);">Appartementen Lombok</strong> — BENG 2 boven 2026-eis (28 vs eis 25)</div><div class="iss-sub">Per 1 juli 2026 is eis ≤25 kWh/m²/jr · Extra PV of hogere COP nodig</div></div></div><div class="iss-row"><div class="iss-r r-m">Middel</div><div><div class="iss-txt"><strong style="color:var(--text);">BIM model Nieuwegein</strong> — Revit model niet bijgewerkt na ontwerpwijziging</div><div class="iss-sub">Wijziging wand type 3A nog niet verwerkt in BIM · Rev. 3 expected</div></div></div><div class="iss-row"><div class="iss-r r-m">Middel</div><div><div class="iss-txt"><strong style="color:var(--text);">Installatieadvies Zeist</strong> — Kostenraming niet bijgewerkt</div><div class="iss-sub">Materiaalkosten gestegen 12% · Raming herziening nodig</div></div></div><div class="iss-row"><div class="iss-r r-l">Laag</div><div><div class="iss-txt"><strong style="color:var(--text);">Directievoering De Meern</strong> — Meetrapport fase 2 nog niet ontvangen</div><div class="iss-sub">Aannemers verwacht volgende week · Follow-up nodig</div></div></div><div style="margin-top:14px;padding-top:12px;border-top:1px solid var(--border);display:flex;gap:8px;"><button class="btn btn-primary btn-sm">📄 Exporteer QA rapport</button><button class="btn btn-outline btn-sm" onclick="closeQA()">Sluiten</button></div>`;}},60);
}
function closeQA(){document.getElementById('qaOv').classList.remove('show');}
function toggleExplain(id){const el=document.getElementById(id);if(!el)return;el.classList.toggle('show');const btn=el.previousElementSibling;if(btn&&btn.classList.contains('expl-btn'))btn.innerHTML=el.classList.contains('show')?'▲ Verberg uitleg':'▶ Waarom is dit correct?';}
function showCompare(idx){const el=document.getElementById('cmp-'+idx);if(el)el.classList.toggle('show');}
const cgConcepts={
  'Kantoor':[{name:'Lucht-water WP + PV',desc:'Eenvoudig en betrouwbaar voor kantoren tot 5.000 m². Gasvrij, BENG 2 haalbaar.',pros:['Lage investeringskosten','Breed toepasbaar','Snel installeerbaar'],cons:['Hogere elektriciteitsvraag bij piek','Buitenruimte nodig']},{name:'WKO-systeem + warmtepomp',desc:'Optimaal voor grotere kantoren. Laagste energiekosten.',pros:['BENG 2 < 20 kWh/m²/jr','Gratis koeling','Lage operationele kosten'],cons:['Hoge initiële investering','Bodemonderzoek nodig','Vergunning vereist']}],
  'Woning (appartementen)':[{name:'Lucht-water WP per appartement',desc:'Individuele installatie. Geschikt voor renovaties.',pros:['Bewoner verantwoordelijk','BENG 2 ≤ 20 haalbaar','Eenvoudige service'],cons:['Ruimtebehoefte','Geluidsisolatie buitenunit']},{name:'Collectief WKO + afleverset',desc:'Collectief voor > 30 appartementen. Paris Proof.',pros:['Laagste VvE-kosten','Hoge tevredenheid','Paris Proof'],cons:['Complexe aansturing','Hogere kosten','VvE-besluit']}],
  'Zorggebouw':[{name:'WKO + absorptiekoeling',desc:'24/7 betrouwbaar voor zorg.',pros:['Betrouwbaar','Simultane koeling','Lage emissie'],cons:['Complex','Specialist nodig','Hoge aanleg']},{name:'Lucht-water WP + redundantie',desc:'Eenvoudiger met back-up voor zorgcontinuïteit.',pros:['Redundantie','Lager risico','Sneller'],cons:['Minder efficiënt','Hogere energie']}],
  'School / Onderwijs':[{name:'WP + Frisse Scholen C',desc:'Voldoet aan Bbl Frisse Scholen eis.',pros:['Wettelijk','Gezond','Standaard techniek'],cons:['Elektriciteitskosten','Buitenunits']},{name:'WKO + vraaggestuurd',desc:'Frisse Scholen klasse B haalbaar.',pros:['Klasse B','Laagste kosten','RVO subsidie'],cons:['Duurder aanleg','Bodemonderzoek']}],
  'Logistiek / Bedrijfshal':[{name:'Infrarood + LED + PV',desc:'Kosteneffectief voor hallen.',pros:['Lage aanleg','Groot PV-dak','Snel terugverdiend'],cons:['Geen koeling','Beperkt kantoor']},{name:'WP + ventilatie',desc:'Warmte/koeling voor hal + kantoor.',pros:['Comfort kantoor','BENG','Flexibel'],cons:['Hogere investering','Meer onderhoud']}],
  'Horeca / Hotel':[{name:'WKO hybride',desc:'Optimaal voor hotels.',pros:['Comfort','Lage emissie','Paris Proof'],cons:['Stadsverwarming afhankelijk','Hoge aanleg']},{name:'WP + WTW',desc:'Standalone voor kleinere horeca.',pros:['Onafhankelijk','Standaard','Onderhoudbaar'],cons:['Hogere elektra','Ruimtebehoefte']}]
};
function genConcept(){
  const type=document.getElementById('cg-type').value;
  const m2=parseInt(document.getElementById('cg-m2').value)||2500;
  const state=document.getElementById('cg-state').value;
  const out=document.getElementById('cg-result');
  out.innerHTML='<div class="prog-wrap"><div class="prog-bar" id="cgpbar" style="width:0%"></div></div><div style="font-size:11px;color:var(--mid);margin-top:6px;">Systeemconcepten genereren...</div>';
  let w=0;const iv=setInterval(()=>{w+=10;const el=document.getElementById('cgpbar');if(el)el.style.width=w+'%';if(w>=100){clearInterval(iv);const concepts=cgConcepts[type]||cgConcepts['Kantoor'];out.innerHTML=`<div style="font-size:11px;color:var(--soft);margin-bottom:10px;">${type} · ${m2.toLocaleString()} m² · ${state}</div><div class="cg-out-grid">${concepts.map((c,i)=>`<div class="cg-card"><div style="font-size:9px;font-weight:700;color:var(--soft);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px;">Optie ${i+1}</div><div class="cg-name">${c.name}</div><div class="cg-desc">${c.desc}</div><div class="pc-grid"><div class="pc-box"><div class="pc-lbl pro">Voordelen</div>${c.pros.map(p=>`<div class="pc-li">✓ ${p}</div>`).join('')}</div><div class="pc-box"><div class="pc-lbl con">Aandachtspunten</div>${c.cons.map(p=>`<div class="pc-li">△ ${p}</div>`).join('')}</div></div></div>`).join('')}</div><div style="background:rgba(196,80,10,.1);border:1px solid var(--border);border-radius:8px;padding:10px 12px;margin-top:12px;font-size:11.5px;color:var(--mid);">🔥 Globale concepten ter oriëntatie — altijd haalbaarheidsanalyse laten uitvoeren.</div>`;}},80);
}

(function(){
var _open=false,_init=false;
var _faq=[
  {keys:['beng','indicator','energieprestatie'],ans:'<strong>BENG</strong> staat voor Bijna Energie Neutraal Gebouw. Drie indicatoren:<br>• <strong>BENG 1</strong>: Energiebehoefte (kWh/m²/jr)<br>• <strong>BENG 2</strong>: Primair fossiel energiegebruik<br>• <strong>BENG 3</strong>: Aandeel hernieuwbare energie<br><br>Feniks werkt veelal met woningbouw — wilt u BENG berekenen?',chips:['⟁ BENG Checker']},
  {keys:['akoestiek','geluid','geluidsisolatie','rw','dnt'],ans:'Feniks is gespecialiseerd in akoestisch advies. De <strong>Excel Assistent</strong> kan ontbrekende Rw-waarden invullen via NEN-EN 12354 en de geluidsisolatie toetsen aan de Bbl-eisen — inclusief de aangescherpte norm per 2027.',chips:['⊞ Excel Assistent','📝 Rapport Schrijver']},
  {keys:['bim','revit','model','3d'],ans:'<strong>BIM-modellering</strong> is een kernactiviteit van Feniks. De Kennisbank bevat referentieprojecten met BIM-ervaringen die u direct kunt doorzoeken.',chips:['◎ Kennisbank']},
  {keys:['wkb','kwaliteitsborg','directievoer','toezicht'],ans:'De <strong>WKB</strong> verhoogt de documentatieverplichtingen bij directievoering aanzienlijk. De Rapport Schrijver genereert automatisch directievoeringsverslagen en kwaliteitsdossiers conform WKB-vereisten.',chips:['📝 Rapport Schrijver']},
  {keys:['storing','diagnose','bestaand','troubleshoot'],ans:'Feniks specialiseert in het diagnosticeren van storingen in bestaande installaties. Upload een installatiesheet in de <strong>Excel Assistent</strong> voor snelle analyse.',chips:['⊞ Excel Assistent']},
  {keys:['rapport','rapportage','document'],ans:'Met de <strong>Rapport Schrijver</strong> stelt u akoestische rapporten, BIM-kwaliteitschecks en directievoeringsverslagen op — gebaseerd op Feniks-templates en NEN-EN 12354.',chips:['📝 Rapport Schrijver']},
  {keys:['norm','nen','bbl','update','regelgev'],ans:'De <strong>Norm Monitor</strong> houdt wijzigingen in geluidsnormen, Bbl en bouwfysica-eisen bij — geen verrassingen meer bij lopende projecten.',chips:['⚖ Norm Monitor']},
  {keys:['kennis','archief','zoek','350','project'],ans:'Uw <strong>350+ projecten</strong> zijn doorzoekbaar op constructietype, locatie en techniek. Vind het meest relevante referentieproject direct.',chips:['◎ Kennisbank']},
  {keys:['meer','vraag','help','wat kan'],ans:'U kunt mij vragen naar:',chips:['📊 Dashboard','📝 Rapport Schrijver','⊞ Excel Assistent','⟁ BENG Checker','⚖ Norm Monitor','◎ Kennisbank','🔉 Akoestiek','📐 BIM modellering','📋 WKB uitleg']}
];
function toggleChat(){
  _open=!_open;
  document.getElementById('chatWin').classList.toggle('open',_open);
  if(_open&&!_init){_init=true;setTimeout(function(){_botMsg('Goedemiddag! Ik ben de assistent van <strong>Feniks</strong>. Waarmee kan ik u helpen?');_chips(['🗂 Naar een app','📝 Rapport schrijven','⟁ BENG uitleg','📋 Norm updates','❓ Meer vragen']);},350);}
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
    return '<button class="chip" onclick="_chip(''+c.replace(/'/g,"\'")+'')">'+ c +'</button>';
  }).join('');
}
function _clearChips(){document.getElementById('chatChips').innerHTML='';}
window._chip=function(t){_userMsg(t);_clearChips();_process(t);};
window.sendChat=function(){
  var i=document.getElementById('chatInp'),v=i.value.trim();
  if(!v)return;_userMsg(v);i.value='';_clearChips();_process(v);
};
function _navTo(id,label){
  var nav=document.querySelector('.nav-item[onclick*="''+id+''"]');
  show(id,nav);
  setTimeout(function(){
    _botMsg('U bent doorgestuurd naar <strong>'+label+'</strong>. Nog iets anders?');
    _chips(['🗂 Naar een app','❓ Meer vragen']);
  },200);
}
function _process(t){
  var l=t.toLowerCase();
  if(l.includes('app')||l.includes('navigeer')||l.includes('naar een')){
    setTimeout(function(){_botMsg('Naar welke app wilt u?');_chips(['📊 Dashboard','📝 Rapport Schrijver','⊞ Excel Assistent','⟁ BENG Checker','⚖ Norm Monitor','◎ Kennisbank']);}),500);
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
