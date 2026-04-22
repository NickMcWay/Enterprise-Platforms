function mobToggle(){var s=document.querySelector('.sidebar'),o=document.getElementById('mobOv');s.classList.toggle('mob-open');o.classList.toggle('mob-open');}
function mobClose(){var s=document.querySelector('.sidebar'),o=document.getElementById('mobOv');if(s)s.classList.remove('mob-open');if(o)o.classList.remove('mob-open');}
function checkPin(){var v=document.getElementById('lock-pin').value;if(v==='1234'){document.getElementById('lock-err').textContent='';document.getElementById('lock-step1').classList.add('lock-fade');document.getElementById('lock-step2').classList.remove('lock-fade');setTimeout(function(){document.getElementById('lock-otp').focus();},100);}else{document.getElementById('lock-err').textContent='Onjuiste code. Probeer opnieuw.';document.getElementById('lock-pin').value='';}}
function checkOtp(){var v=document.getElementById('lock-otp').value.replace(/\D/g,'');if(v.length>=6){var e=document.getElementById('lock-otp-err');e.style.color='#2A9D5C';e.textContent='Verificatie geslaagd...';setTimeout(function(){var ls=document.getElementById('lockScreen');ls.classList.add('ls-out');setTimeout(function(){ls.style.display='none';},420);},900);}else{document.getElementById('lock-otp-err').textContent='Voer 6 cijfers in.';}}
var _demoTimer;function demoNotice(){var t=document.getElementById('demoToast');t.classList.add('dt-show');clearTimeout(_demoTimer);_demoTimer=setTimeout(function(){t.classList.remove('dt-show');},3500);}
document.addEventListener('click',function(e){var b=e.target.closest('button');if(b&&!b.getAttribute('onclick')&&!b.closest('.lock-card')&&!b.classList.contains('mob-toggle')){demoNotice();}});
const titles={
  dashboard:'Dashboard',
  rapport:'Rapport Schrijver',
  excel:'Excel Assistent',
  beng:'BENG Checker',
  normen:'Norm Monitor',
  kennis:'Kennisbank',
  concept:'Concept Generator',
  variant:'Variant Vergelijker',
  wkb:'WKB Dossier Builder'
};

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
      acts.innerHTML='<button class="btn btn-primary btn-sm" onclick="alert(\'Rapport wordt geëxporteerd als .docx...\')">⬇ Download .docx</button><button class="btn btn-outline btn-sm" onclick="exportRapportPdf()">⬇ Download PDF</button><button class="btn btn-outline btn-sm" onclick="alert(\'Rapport openen in editor...\')">✏ Bewerk in editor</button><button class="btn btn-outline btn-sm" onclick="alert(\'Rapport gedeeld via e-mail...\')">✉ Verstuur aan opdrachtgever</button>';
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
<em style="color:var(--soft);font-size:11.5px;">Gegenereerd door Nieman Digitaal Platform · NEN 6068:2026 + Bbl afd. 2.2 · 21 april 2026</em>
<button class="expl-btn" onclick="toggleExplain('ep-rapport')">▶ Waarom is dit correct?</button>
<div class="expl-pan" id="ep-rapport"><strong>Normen &amp; bronnen:</strong><br>• <strong>Bbl afdeling 2.2</strong> — Beperken van ontwikkeling en uitbreiding van brand; art. 2.98: WBDBO ≥ 60 min per brandcompartiment<br>• <strong>NEN 6068:2026</strong> — Bepaling weerstand tegen branddoorslag en brandoverslag (WBDBO), bepalingsmethode herzien 2026<br>• <strong>NEN-EN 1337</strong> — Vluchtroutes en nooduitgangen: max. vluchtafstand gezondheidszorgfunctie ≤ 60 m<br>• <strong>Bbl art. 2.2</strong> — Compartimentering: maximale omvang brandcompartiment gezondheidszorg 1.000 m²<br><br><strong>Formule WBDBO:</strong> WBDBO = f(brandbelasting, afstand, F-waarde) conform NEN 6068 bijlage A.<br><strong>Aanname:</strong> Standaard sprinklerinstallatie aanwezig → brandbelasting gecorrigeerd met factor 0,5 conform Bbl art. 2.113.</div>`;
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
</div>
<button class="expl-btn" onclick="toggleExplain('ep-excel')">▶ Waarom is dit correct?</button>
<div class="expl-pan" id="ep-excel"><strong>Normen &amp; bronnen:</strong><br>• <strong>NEN 1068:2012+A2:2020</strong> — Thermische isolatie van gebouwen; Rc-waarde berekening per bouwdeel: Rc = Σ(d_i / λ_i) + R_si + R_se<br>• <strong>NEN-EN ISO 6946:2017</strong> — Bouwdelen: thermische weerstand en doorlaatvermogen; correctie voor luchtspleten en thermische bruggen<br>• <strong>Bbl art. 5.3 tabel 5.1</strong> — Minimale Rc-eisen per bouwdeel (nieuwbouw en renovatie)<br>• <strong>WKB gevolgklasse 2</strong> — Kwaliteitsborger toetst Rc-waarden aan Bbl als onderdeel van de borgingsplicht<br><br><strong>Rc-standaardwaarden NEN 1068:</strong> Dak plat (ongeïsoleerd ca. 0,5) → na isolatie 200 mm PIR: Rc ≈ 6,5 m²K/W.<br><strong>Aanname:</strong> constructieopbouw begane grondvloer standaard holle vloer + 100 mm EPS → Rc = 3,5 m²K/W.</div>`;
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
</div>
<button class="expl-btn" onclick="toggleExplain('ep-beng')">▶ Waarom is dit correct?</button>
<div class="expl-pan" id="ep-beng"><strong>Normen &amp; bronnen:</strong><br>• <strong>BENG 1</strong> — Energiebehoefte woonfunctie: Bbl bijlage A tabel 1 · eis nieuwbouw ≤ 55 kWh/m²/jr · berekend conform NEN 7120 §5<br>• <strong>BENG 2</strong> — Primair fossiel energiegebruik: Bbl bijlage A · eis 2027 ≤ 20 kWh/m²/jr (aangescherpt van 25 per 1 jan 2027)<br>• <strong>BENG 3</strong> — Hernieuwbaar aandeel: berekend als E_hernieuwbaar / E_totaal_primair · eis ≥ 50% · PV bijdrage via NTA 8800 §7.2<br>• <strong>NEN-EN ISO 13790</strong> — Berekening thermische energiebehoefte gebouwen (maandbalans methode)<br><br><strong>Formule BENG 1:</strong> Q_netto = (H_trans + H_vent) × (T_set − T_buiten) − η_gains × (Q_intern + Q_zon) conform ISO 13790<br><strong>Aanname:</strong> WP COP 4,5 jaargemiddeld, PV-opbrengst 900 kWh/kWp/jr (Rotterdam/Utrecht), η WTW = 91%.</div>`;
    }
  },180);
}

const kbData=[
  {
    title:'Brandveiligheidsadvies Isala Ziekenhuis Meppel — Uitbreiding SEH',
    meta:'Brandveiligheid · 2024 · 8.200 m² · Zwolle',
    snip:'Volledig brandveiligheidsadvies conform NEN 6068 en Bbl afd. 2.2. Compartimentering 28 brandcompartimenten. Horizontale evacuatiestrategie toegepast. Samenwerking brandweer IJsselland.',
    tags:['Brandveiligheid','NEN 6068','Zorg'],
    score:99,
    cmp:{type:'Ziekenhuis',m2:'8.200',tech:'Compartimentering + sprinkler + vluchtroutes NEN 6068',beng2:'n.v.t.',saving:'n.v.t.',reuse:'Evacuatiestrategie en compartimenteringsschema herbruikbaar voor vergelijkbare zorggebouwen'}
  },
  {
    title:'WKB Kwaliteitsborging — Woontoren Stationsplein Utrecht',
    meta:'WKB · Bouwfysica · 2025 · 22.400 m² · Utrecht',
    snip:'WKB dossiervoorbereiding gevolgklasse 2. Volledige bouwfysische toetsing Bbl. 287 appartementen. Kwaliteitsverklaring afgegeven. Eerste grootschalige WKB-project in centraal Utrecht.',
    tags:['WKB','Bouwfysica','Woningbouw'],
    score:97,
    cmp:{type:'Woontoren',m2:'22.400',tech:'WKB gevolgklasse 2 + bouwfysica Rc 5,5 + BENG berekeningen',beng2:'19 kWh/m²/jr',saving:'72%',reuse:'WKB dossierstructuur en borgingsplan volledig herbruikbaar'}
  },
  {
    title:'Akoestisch onderzoek De Rotterdam — Gemengd gebruik',
    meta:'Akoestiek · 2024 · 34.600 m² · Rotterdam',
    snip:'Lucht- en contactgeluidsisolatie conform NPR 5272. Gecombineerde woon- en kantoorfunctie. Complexe geluidssituatie Wilhelminakade. Alle maatregelen binnen budgetkaders gerealiseerd.',
    tags:['Akoestiek','Gemengd gebruik','Rotterdam'],
    score:94,
    cmp:{type:'Gemengd gebruik',m2:'34.600',tech:'Luchtgeluid 55 dB + contactgeluid 0 dB NPR 5272',beng2:'22 kWh/m²/jr',saving:'58%',reuse:'Akoestische detailtekeningen gevel en vloerrand herbruikbaar'}
  },
  {
    title:'Bouwfysica grootschalige woningbouw Zwolle Stadshagen fase 3',
    meta:'Bouwfysica · BENG · 2023 · 18.900 m² · Zwolle',
    snip:'BENG berekeningen 186 woningen. Thermische bruggencatalogus opgesteld. Dauwpuntanalyse per geveltype. CO₂ reductie 68% t.o.v. referentiegebouw. Paris Proof 2030 gehaald.',
    tags:['Bouwfysica','BENG','Woningbouw'],
    score:91,
    cmp:{type:'Woningbouw',m2:'18.900 (186 won.)',tech:'Rc gevel 5,5 + WP COP 4,5 + PV 980 m²',beng2:'17 kWh/m²/jr',saving:'68%',reuse:'Thermische bruggencatalogus en BENG-berekeningen herbruikbaar per geveltype'}
  }
];

function searchKB(){
  const q=document.getElementById('kb-q').value;
  const filtered=kbData;
  document.getElementById('kb-meta').textContent=`${filtered.length} resultaten voor "${q}" — gesorteerd op relevantie · Nieman kennisbank 2019–2026`;
  document.getElementById('kb-results').innerHTML=filtered.map((k,i)=>`
<div class="kb-item">
  <span class="match">${k.score}% match</span>
  <div class="kb-title">${k.title}</div>
  <div class="kb-meta">${k.meta}</div>
  <div class="kb-snip">${k.snip}</div>
  <div class="kb-tags">${k.tags.map(t=>`<span class="ntag t-bbl">${t}</span>`).join('')}</div>
  <button class="cmp-btn" onclick="showCompare(${i})">◎ Vergelijk met huidig project</button>
  <div class="cmp-pan" id="cmp-${i}">
    <div class="cmp-row"><span class="cmp-key">Type</span><span class="cmp-val">${k.cmp.type}</span></div>
    <div class="cmp-row"><span class="cmp-key">Projectomvang</span><span class="cmp-val">${k.cmp.m2} m²</span></div>
    <div class="cmp-row"><span class="cmp-key">Techniek / aanpak</span><span class="cmp-val">${k.cmp.tech}</span></div>
    <div class="cmp-row"><span class="cmp-key">BENG 2 uitkomst</span><span class="cmp-val">${k.cmp.beng2}</span></div>
    <div class="cmp-row"><span class="cmp-key">CO₂-besparing</span><span class="cmp-val">${k.cmp.saving}</span></div>
    <div class="cmp-row"><span class="cmp-key">Herbruikbare aanpak</span><span class="cmp-val" style="font-size:11px;">${k.cmp.reuse}</span></div>
  </div>
</div>`).join('');
}

function qaAnalyse(){
  const issues=[
    {level:'h',title:'Isala Nieuwbouw west: NEN 6068:2026 hertoetsing vereist',sub:'Huidige WBDBO-berekeningen zijn gebaseerd op NEN 6068:2020. De herziene norm (2026) wijzigt de berekeningswijze significant — hertoetsing verplicht voor indiening.'},
    {level:'h',title:'Wilhelminapier Rotterdam: deadline morgen — BENG definitief',sub:'BENG rapport nog in concept. Aanvraag omgevingsvergunning wacht op definitieve BENG-berekening. Urgentie: deadline 25 april 2026.'},
    {level:'m',title:'WKB dossier Gemeentehuis Zwolle: gevolgklasse 2 criteria niet volledig',sub:'14 van de 18 verplichte toetsingspunten gevolgklasse 2 zijn ingevuld. 4 punten ontbreken voor kwaliteitsverklaring fase 1.'},
    {level:'m',title:'Rijnboutt: akoestisch rapport ontwerptekeningen bijwerken',sub:'Bbl afdeling 3.1 aangescherpt per 1 juli 2026 (55 dB). Huidig ontwerp haalt 53 dB — 2 dB extra isolatie nodig. Tekeningen aanpassen.'},
    {level:'l',title:'De Baak: thermische brug analyse niet gedocumenteerd',sub:'Thermische bruggencatalogus ontbreekt in WKB dossier fase 2. Toevoeging aanbevolen voor volledigheid kwaliteitsborging.'},
    {level:'l',title:'Kennisbank: 3 projecten zonder discipline-tag',sub:'Drie projectdossiers in de Kennisbank missen discipline-classificatie. Zoekresultaten worden minder relevant door ontbrekende metadata.'},
  ];
  const score=58;
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
    {name:'All-electric kantoor — WKO + WP + PV',desc:'Warmte-koudeopslag gekoppeld aan reversibele warmtepomp. Dak volledig benut met PV. Toekomstbestendig en BENG 2 (2027) compliant.',pros:['BENG 2 ruim onder 20 kWh/m²/jr','Kwalificeert voor WKB kwaliteitsverklaring','Paris Proof 2030 haalbaar'],cons:['Hoge investeringskosten (€120–180/m²)','WKO vereist grondwatervergunning']},
    {name:'Hybride systeem — HR-ketel + WP + PV',desc:'Overgangsoplossing met hybride warmtepomp als aanvulling op bestaande ketel. Lagere investering, snelle terugverdientijd.',pros:['Lage instapkosten (€55–85/m²)','Snel uitvoerbaar','Gedeeltelijk BENG-compliant'],cons:['BENG 2 grens 2027 (20 kWh/m²) lastiger haalbaar','Fossiele afhankelijkheid blijft deels']}
  ],
  'Woning':[
    {name:'Warmtepomp (bodem) + PV + triple glas',desc:'Bodemwarmtepomp als primaire warmtebron, aangevuld met PV. Hoge akoestische kwaliteit en bouwfysisch geoptimaliseerd.',pros:['Energielabel A++ haalbaar','BENG 2 ≤ 17 kWh/m²/jr','WKB kwaliteitsverklaring afgiftebaar'],cons:['Hoge initiële investering','Voldoende dakoppervlak nodig voor PV']},
    {name:'Hybride warmtepomp + zonnecollector',desc:'Lucht-water hybride warmtepomp gecombineerd met zonnecollector voor tapwater. Flexibele aanpak, geschikt voor renovatie.',pros:['Lagere investering dan all-electric','Bruikbaar bij bestaande gasinfrastructuur','Subsidie via ISDE mogelijk'],cons:['BENG 2 2027-eis aan de grens','Onderhoud twee systemen']}
  ],
  'Zorggebouw':[
    {name:'Warmtenet aansluiting + PV + WTW',desc:'Collectieve warmtelevering via stadsnet of buurt-WKO. Ideaal voor zorggebouwen met 24/7 warmtebehoefte. Brandveiligheid integraal meeontwerpd.',pros:['Geen onderhoud eigen installatie','Stabiele energiekosten','BENG 2 goed haalbaar'],cons:['Afhankelijk van netbeschikbaarheid','Lagere eigen sturing energieverbruik']},
    {name:'WKO + absorptiewarmtepomp + PV',desc:'Eigen WKO-systeem met absorptiewarmtepomp. Geschikt voor hoog warmtapwaterverbruik in zorgfuncties en maximale WKB-borging.',pros:['Maximale CO₂-reductie','Onafhankelijk van warmtenet','GPR > 8 haalbaar'],cons:['Complexe installatie, hoge CAPEX','Grondwatervergunning verplicht']}
  ],
  'School':[
    {name:'Frisse Scholen klasse A — WTW + WP + PV',desc:'Volledig elektrisch concept met hoog-rendement WTW-ventilatie. Akoestische kwaliteit conform Bbl afdeling 3.1 gewaarborgd.',pros:['Frisse Scholen klasse A','Gezond binnenklimaat','WKB en BENG compliant'],cons:['Dakoppervlak intensief gebruik','Inregeling ventilatie vraagt expertise']},
    {name:'Hybride aanpak bestaande bouw',desc:'Isolatie-eerste aanpak: HR++ glas, hybride warmtepomp en WTW. Gefaseerd uitvoerbaar per schoolvakantie. Akoestisch getoetst.',pros:['Minimale schoolonderbreking','Lagere kosten per fase','Energielabel C → A in 2 fasen'],cons:['Frisse Scholen klasse B maximaal fase 1','Langere totale terugverdientijd']}
  ],
  'Logistiek':[
    {name:'PV-dak + luchtbehandeling + LED',desc:'Grootschalig PV op logistiek dak, efficiënte luchtbehandeling. Brandcompartimentering conform Bbl voor logistieke functie.',pros:['PV-opbrengst zeer hoog','Energieneutraal of leverend haalbaar','SDE++ combineerbaar'],cons:['Dak verstevigen voor grote PV-last','Weinig warmtebehoefte in hal']},
    {name:'WKO + vloerverwarming (kantoorvleugel) + PV',desc:'Hybride concept: WKO voor kantoorvleugel, PV voor de loods. Brandveiligheid geïntegreerd per brandcompartiment.',pros:['Optimale verduurzaming per zone','Goed scorend bij energielabel kant.+loods','BENG compliant'],cons:['Twee systemen verhogen complexiteit','WKO economisch alleen bij > 500 m² kantoor']}
  ],
  'Horeca / Hotel':[
    {name:'WKO + absorptiewarmtepomp + PV + zonnecollector',desc:'Maximaal duurzaam voor hotels met hoog tapwaterverbruik. Brandveiligheid ontworpen conform Bbl voor logiesfunctie.',pros:['Energielabel A+ haalbaar','Minimale fossiele afhankelijkheid','Aantrekkelijk voor duurzaamheidscertificering'],cons:['Hoge investering (€150–220/m²)','WKO vergunningstraject']},
    {name:'Warmteterugwinning keuken + WP + PV',desc:'Warmteterugwinning uit keukenafzuiging gekoppeld aan warmtepomp. Praktisch en haalbaar voor bestaande horecapanden.',pros:['Goede ROI door hoge keukenafvalwarmte','Minder invasief dan WKO','Korte terugverdientijd'],cons:['Minder geschikt voor grote hotels','WTR installatie vraagt aanpassing keuken']}
  ]
};

function genConcept(){
  const type=document.getElementById('cg-type').value;
  const m2=document.getElementById('cg-m2').value;
  const state=document.getElementById('cg-state').value;
  const opts=cgConcepts[type]||cgConcepts['Kantoor'];
  document.getElementById('cg-out').innerHTML=`<div style="font-size:12px;color:var(--soft);margin-bottom:12px;">Concepten voor <strong style="color:var(--navy)">${type}</strong> · ${m2} m² · ${state}</div><div class="cg-grid">${opts.map(o=>`<div class="cg-card"><div class="cg-name">✦ ${o.name}</div><div class="cg-desc">${o.desc}</div><div class="pc-box"><div class="cg-pros"><strong>+ Voordelen</strong><br>${o.pros.map(p=>'• '+p).join('<br>')}</div><div class="cg-cons" style="margin-top:8px;"><strong>− Aandachtspunten</strong><br>${o.cons.map(c=>'• '+c).join('<br>')}</div></div></div>`).join('')}</div>`;
}

function filterProjects(){demoNotice();}
function exportTable(){demoNotice();}
function newProject(){demoNotice();}
function openProject(name){demoNotice();}
function normAction(norm){demoNotice();}
function refreshNorms(){demoNotice();}

(function(){
var _open=false,_init=false;
var _faq=[
  {keys:['beng','indicator','energieprestatie'],ans:'<strong>BENG</strong> staat voor Bijna Energie Neutraal Gebouw. Drie indicatoren:<br>• <strong>BENG 1</strong>: Energiebehoefte (kWh/m²/jr)<br>• <strong>BENG 2</strong>: Primair fossiel energiegebruik<br>• <strong>BENG 3</strong>: Aandeel hernieuwbare energie<br><br>Nieman werkt veelal met woningbouw en utiliteit. De Checker verwijst automatisch naar relevante Bbl-bijlagen.',chips:['⟁ BENG Checker']},
  {keys:['brandveiligheid','brand','nen 6068','compartiment'],ans:'Nieman is specialist in <strong>brandveiligheid</strong>. De Rapport Schrijver stelt brandveiligheidsrapporten op conform NEN 6068 en de Bbl-vereisten, inclusief compartimenteringsanalyse.',chips:['📝 Rapport Schrijver']},
  {keys:['wkb','kwaliteitsborg','kwaliteitsverklar'],ans:'De <strong>WKB</strong> (Wet Kwaliteitsborging voor het Bouwen) vereist een kwaliteitsverklaring per bouwfase. De Rapport Schrijver genereert WKB-kwaliteitsverklaringen automatisch — in de Nieman-structuur en met correcte Bbl-verwijzingen.',chips:['📝 Rapport Schrijver']},
  {keys:['bouwfysica','rc','u-waarde','isolatie','dauw'],ans:'Nieman heeft een sterke bouwfysica-afdeling. De <strong>Excel Assistent</strong> vult ontbrekende Rc- en U-waarden in via NEN 1068 en toetst direct aan de WKB-kwaliteitsborgingseisen.',chips:['⊞ Excel Assistent']},
  {keys:['akoestiek','geluid','omgevingsgeluid'],ans:'Nieman doet zowel binnenakoestiek als omgevingsgeluid. De <strong>Rapport Schrijver</strong> stelt akoestische onderzoeken op conform de relevante NEN-normen en Bbl-eisen.',chips:['📝 Rapport Schrijver']},
  {keys:['rapport','rapportage','document'],ans:'Met de <strong>Rapport Schrijver</strong> stelt u brandveiligheidsrapporten, bouwfysica-rapporten, WKB-kwaliteitsverklaringen en akoestisch onderzoek op — automatisch in Nieman-structuur en met correcte normbronnen.',chips:['📝 Rapport Schrijver']},
  {keys:['norm','nen','bbl','wkb','update','regelgev'],ans:'De <strong>Norm Monitor</strong> houdt wijzigingen in WKB-circulaires, NEN 6068, brandveiligheidsnormen en Bbl bij — over alle vestigingen (Utrecht, Zwolle, Rotterdam) tegelijk.',chips:['⚖ Norm Monitor']},
  {keys:['kennis','archief','zoek','project','zwolle','rotterdam'],ans:'De <strong>Kennisbank</strong> maakt uw projectarchief doorzoekbaar op discipline, norm, gebouwtype en locatie — over alle vestigingen heen.',chips:['◎ Kennisbank']},
  {keys:['meer','vraag','help','wat kan'],ans:'U kunt mij vragen naar:',chips:['📊 Dashboard','📝 Rapport Schrijver','⊞ Excel Assistent','⟁ BENG Checker','⚖ Norm Monitor','◎ Kennisbank','🔥 Brandveiligheid','📋 WKB uitleg','🏗 Bouwfysica']}
];
function toggleChat(){
  _open=!_open;
  document.getElementById('chatWin').classList.toggle('open',_open);
  if(_open&&!_init){_init=true;setTimeout(function(){_botMsg('Goedemiddag! Ik ben de assistent van <strong>Nieman</strong>. Waarmee kan ik u helpen?');_chips(['🗂 Naar een app','📝 Rapport schrijven','⟁ BENG uitleg','📋 Norm updates','❓ Meer vragen']);},350);}
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
function variantAnalyse(){
  const proj=document.getElementById('vc-proj').value;
  const r=document.getElementById('vc-result');
  r.innerHTML='<div class="panel"><div class="panel-body"><div class="prog-wrap"><div class="prog-bar" id="vcpbar" style="width:0%"></div></div><div style="font-size:11px;color:var(--mid);margin-top:4px;" id="vc-lbl">BENG indicatoren berekenen per variant...</div></div></div>';
  const steps=[[20,'BENG 1 berekenen...'],[45,'BENG 2 fossiel energiegebruik...'],[65,'BENG 3 hernieuwbaar...'],[82,'GPR indicaties...'],[95,'DUMAVA subsidiecheck...'],[100,'Analyse gereed!']];
  let i=0;const run=()=>{if(i<steps.length){const el=document.getElementById('vcpbar');const lb=document.getElementById('vc-lbl');if(el)el.style.width=steps[i][0]+'%';if(lb)lb.textContent=steps[i][1];i++;setTimeout(run,380);}else{
    r.innerHTML=`<div class="panel"><div class="panel-head"><div class="panel-icon">✅</div><div class="panel-title">Vergelijkingsresultaten — ${proj}</div></div><div class="panel-body"><div class="vc-grid">
      <div class="vc-card"><div class="vc-title">Variant A — WP COP 4,0</div>
        <div class="vc-row"><span class="vc-lbl">BENG 1</span><span class="vc-ok">42 kWh/m²/jr ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">BENG 2</span><span class="vc-ok">28 kWh/m²/jr ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">BENG 3</span><span class="vc-ok">73% ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">GPR</span><span class="vc-v">7,9</span></div>
        <div class="vc-row"><span class="vc-lbl">Meerkosten</span><span class="vc-v">€ 0</span></div>
        <div class="vc-row"><span class="vc-lbl">DUMAVA</span><span style="font-weight:700;color:var(--red);">✗ Nee</span></div>
        <div style="margin-top:8px;font-size:11px;color:var(--mid);">Voldoet aan normen maar beperkte marge op 2027 BENG 2 eis (≤25).</div>
      </div>
      <div class="vc-card winner"><div class="vc-badge">★ Aanbevolen</div>
        <div class="vc-title">Variant B — WP upgrade COP 5,4</div>
        <div class="vc-row"><span class="vc-lbl">BENG 1</span><span class="vc-ok">38 kWh/m²/jr ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">BENG 2</span><span class="vc-ok">21 kWh/m²/jr ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">BENG 3</span><span class="vc-ok">85% ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">GPR</span><span class="vc-v">8,7</span></div>
        <div class="vc-row"><span class="vc-lbl">Meerkosten</span><span class="vc-v">€ 58.000</span></div>
        <div class="vc-row"><span class="vc-lbl">DUMAVA</span><span class="vc-ok">✓ Subsidiabel</span></div>
        <div style="margin-top:8px;font-size:11px;color:var(--mid);">Beste kosten-baten. DUMAVA ~69%. Netto ca. €18.000. BENG 2 ruim onder 2027 eis.</div>
        <button class="btn btn-primary btn-sm" style="width:100%;margin-top:8px;">✓ Selecteer Variant B</button>
      </div>
      <div class="vc-card"><div class="vc-title">Variant C — WP COP 5,4 + PV 200 kWp</div>
        <div class="vc-row"><span class="vc-lbl">BENG 1</span><span class="vc-ok">35 kWh/m²/jr ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">BENG 2</span><span class="vc-ok">17 kWh/m²/jr ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">BENG 3</span><span class="vc-ok">91% ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">GPR</span><span class="vc-v">9,2</span></div>
        <div class="vc-row"><span class="vc-lbl">Meerkosten</span><span class="vc-v">€ 145.000</span></div>
        <div class="vc-row"><span class="vc-lbl">DUMAVA</span><span style="font-weight:700;color:var(--red);">✗ Niet subsidiabel</span></div>
        <div style="margin-top:8px;font-size:11px;color:var(--mid);">Maximale duurzaamheid. Hoge kosten zonder subsidie. Combineerbaar met B.</div>
      </div>
    </div>
    <div style="background:var(--gold-pale);border-radius:8px;padding:12px;font-size:12px;color:var(--mid);border:1px solid var(--gold-soft);"><strong style="color:var(--gold-mid);">Advies:</strong> Variant B beste kosten-baten. BENG 2: 28 → 21. DUMAVA ~69%. Netto slechts €18.000. Paris Proof 2030 ruim gehaald.</div>
    <div style="display:flex;gap:8px;margin-top:12px;"><button class="btn btn-primary btn-sm">📄 Exporteer vergelijking</button><button class="btn btn-outline btn-sm">✦ Naar Rapport Schrijver</button></div>
    </div></div>`;}};run();
}
function wkbBuild(){
  const b=document.getElementById('wkb-body');
  b.innerHTML='<div class="prog-wrap"><div class="prog-bar" id="wkbpbar" style="width:0%"></div></div><div style="font-size:11px;color:var(--mid);margin-top:4px;">WKB vereisten ophalen voor GK2 kantoorfunctie...</div>';
  let w=0;const iv=setInterval(()=>{w+=7;const el=document.getElementById('wkbpbar');if(el)el.style.width=w+'%';if(w>=100){clearInterval(iv);
  b.innerHTML=`<div style="background:var(--gold-pale);border-radius:8px;padding:14px;margin-bottom:14px;border:1px solid var(--gold-soft);">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;"><div style="font-size:12px;font-weight:600;color:var(--gold-mid);">Dossier compleetheid</div><div style="font-size:14px;font-weight:700;color:var(--green);">72%</div></div>
    <div class="prog-wrap" style="margin:0 0 6px;"><div class="prog-bar" style="width:72%;background:var(--green);"></div></div>
    <div style="font-size:11px;color:var(--mid);">6 items aanwezig · 2 incompleet · 1 ontbreekt</div></div>
  <div class="wkb-item wkb-ok"><div class="wkb-ic">✓</div><div><div class="wkb-lbl">Borgingsplan ingediend</div><div class="wkb-sub">GK2 borgingsplan · ref. BP-2026-071</div></div></div>
  <div class="wkb-item wkb-ok"><div class="wkb-ic">✓</div><div><div class="wkb-lbl">Kwaliteitsborger aangesteld</div><div class="wkb-sub">Nieman Kwaliteitsborging · WKB niveau 2</div></div></div>
  <div class="wkb-item wkb-ok"><div class="wkb-ic">✓</div><div><div class="wkb-lbl">Voormelding Bevoegd Gezag</div><div class="wkb-sub">Gemeente · ontvangen 14 jan 2026</div></div></div>
  <div class="wkb-item wkb-ok"><div class="wkb-ic">✓</div><div><div class="wkb-lbl">Constructieve veiligheid VO</div><div class="wkb-sub">Constructierapport goedgekeurd · Nieman Constructie</div></div></div>
  <div class="wkb-item wkb-ok"><div class="wkb-ic">✓</div><div><div class="wkb-lbl">BENG berekening DO</div><div class="wkb-sub">NTA 8800 · BENG 1/2/3 conform eis · 19 apr 2026</div></div></div>
  <div class="wkb-item wkb-ok"><div class="wkb-ic">✓</div><div><div class="wkb-lbl">Brandcompartimentering</div><div class="wkb-sub">WBDBO berekening (NEN 6068) goedgekeurd · Nieman Brandveiligheid</div></div></div>
  <div class="wkb-item wkb-warn"><div class="wkb-ic">⚠</div><div><div class="wkb-lbl">Akoestisch rapport — incompleet</div><div class="wkb-sub">Stationsomgeving verkeersgeluid niet afgerond (Bbl afd. 3.1). Actie vóór 30 apr.</div></div></div>
  <div class="wkb-item wkb-warn"><div class="wkb-ic">⚠</div><div><div class="wkb-lbl">Legionella risicoanalyse — incompleet</div><div class="wkb-sub">ISSO 55.1 analyse verwacht 26 apr 2026.</div></div></div>
  <div class="wkb-item wkb-miss"><div class="wkb-ic">✗</div><div><div class="wkb-lbl">Dossier Bevoegd Gezag</div><div class="wkb-sub">Nog te compileren na afronding akoestiek en legionella.</div></div></div>
  <div style="display:flex;gap:8px;margin-top:12px;"><button class="btn btn-primary btn-sm">⬇ Export WKB dossier PDF</button><button class="btn btn-outline btn-sm">📧 Stuur naar kwaliteitsborger</button></div>`;}},80);
}
