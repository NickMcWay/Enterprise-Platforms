function mobToggle(){var s=document.querySelector('.sidebar'),o=document.getElementById('mobOv');s.classList.toggle('mob-open');o.classList.toggle('mob-open');}
function mobClose(){var s=document.querySelector('.sidebar'),o=document.getElementById('mobOv');if(s)s.classList.remove('mob-open');if(o)o.classList.remove('mob-open');}
function checkPin(){var v=document.getElementById('lock-pin').value;if(v==='1234'){document.getElementById('lock-err').textContent='';document.getElementById('lock-step1').classList.add('lock-fade');document.getElementById('lock-step2').classList.remove('lock-fade');setTimeout(function(){document.getElementById('lock-otp').focus();},100);}else{document.getElementById('lock-err').textContent='Onjuiste code. Probeer opnieuw.';document.getElementById('lock-pin').value='';}}
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
function selRT(el){document.querySelectorAll('.rt-btn').forEach(b=>b.classList.remove('sel'));el.classList.add('sel');}
function exportRapportPdf(options={}){
  const outHtml=options.bodyHtml||((document.getElementById('rp-out')||{}).innerHTML||'');
  if(!outHtml)return;

  const logoMain=(document.querySelector('.logo-text')||{}).textContent||'MEP';
  const logoSub=(document.querySelector('.logo-sub')||{}).textContent||'Digitaal Platform';
  const reportType=(options.reportType||((document.querySelector('.rt-btn.sel .rt-title')||{}).textContent||'Rapport')).trim();
  const projectField=document.querySelector('#page-rapport input.inp');
  const projectName=(options.projectName||(projectField&&projectField.value?projectField.value.trim():'Project')).trim();
  const now=new Date();
  const today=now.toLocaleDateString('nl-NL',{day:'2-digit',month:'long',year:'numeric'});

  const rootStyles=getComputedStyle(document.documentElement);
  const pickColor=(name,fallback)=>{
    const value=rootStyles.getPropertyValue(name);
    return value?value.trim()||fallback:fallback;
  };

  const brandPrimary=pickColor('--teal',pickColor('--forest',pickColor('--navy',pickColor('--accent','#0e7490'))));
  const brandPrimarySoft=pickColor('--teal-light',pickColor('--forest-light','#eef6f5'));
  const brandStrong=pickColor('--text','#0f172a');
  const brandMuted=pickColor('--mid','#475569');
  const brandSoft=pickColor('--soft','#64748b');
  const border=pickColor('--border','#d7dee7');
  const bg=pickColor('--bg','#f4f7fb');
  const okColor=pickColor('--green','#16a34a');
  const warnColor=pickColor('--amber','#f59e0b');

  const source=document.createElement('div');
  source.innerHTML=outHtml;
  source.querySelectorAll('button,.expl-btn,.expl-pan').forEach(el=>el.remove());
  source.querySelectorAll('[style]').forEach(el=>el.removeAttribute('style'));
  source.querySelectorAll('br').forEach(br=>br.replaceWith(document.createElement('br')));

  const plainText=(source.textContent||'').replace(/\s+/g,' ').trim();
  const findMetric=(regex,fallback)=>{
    const hit=plainText.match(regex);
    return hit&&hit[1]?hit[1]:fallback;
  };

  const metricA=findMetric(/BENG\s*1[^\d]{0,24}(\d+[\.,]?\d*)\s*kWh\/?m²\/?jr/i,'42');
  const metricB=findMetric(/BENG\s*2[^\d]{0,24}(\d+[\.,]?\d*)\s*kWh\/?m²\/?jr/i,'27');
  const metricC=findMetric(/(\d{1,3})\s*%\s*(?:✓|match|hernieuwbaar|reductie)?/i,'68');

  const numA=Math.max(0,Math.min(100,100-parseFloat(String(metricA).replace(',','.'))||58));
  const numB=Math.max(0,Math.min(100,100-parseFloat(String(metricB).replace(',','.'))||73));
  const numC=Math.max(0,Math.min(100,parseFloat(String(metricC).replace(',','.'))||68));

  const reportHtml=source.innerHTML;

  const chartBars=[
    {label:'Prestatie A',value:numA,color:brandPrimary},
    {label:'Prestatie B',value:numB,color:warnColor},
    {label:'Duurzaam',value:numC,color:okColor}
  ];

  const barSvg=chartBars.map((b,idx)=>{
    const y=24+(idx*36);
    const width=Math.max(12,Math.round((b.value/100)*210));
    return '<text x="0" y="'+(y+11)+'" fill="'+brandMuted+'" font-size="11" font-family="Inter,Arial">'+b.label+'</text><rect x="88" y="'+y+'" width="210" height="14" rx="7" fill="#e2e8f0"/><rect x="88" y="'+y+'" width="'+width+'" height="14" rx="7" fill="'+b.color+'"/><text x="306" y="'+(y+11)+'" fill="'+brandStrong+'" font-size="11" font-weight="700" font-family="Inter,Arial">'+Math.round(b.value)+'%</text>';
  }).join('');

  const linePoints=[numA,numB,numC].map((v,idx)=>{
    const x=24+(idx*82);
    const y=116-Math.round((v/100)*82);
    return x+','+y;
  }).join(' ');

  const score=Math.round((numA+numB+numC)/3);
  const ring=Math.max(0,Math.min(100,score));
  const circumference=2*Math.PI*42;
  const dashOffset=circumference-(ring/100)*circumference;

  const pdfWindow=window.open('','_blank');
  if(!pdfWindow){alert('Sta pop-ups toe om PDF export te starten.');return;}

  pdfWindow.document.write(`<!doctype html><html lang="nl"><head><meta charset="utf-8"><title>${reportType} - ${projectName}</title><link rel="stylesheet" href="styles.css"><style>
  :root{color-scheme:light only}
  *{box-sizing:border-box}
  body{margin:0;background:${bg};color:${brandStrong};font-family:Inter,Arial,sans-serif}
  .sheet{max-width:980px;margin:20px auto;background:#fff;border:1px solid ${border};border-radius:20px;overflow:hidden;box-shadow:0 24px 60px rgba(2,6,23,.12)}
  .hero{position:relative;padding:34px 36px 24px;background:linear-gradient(135deg,${brandPrimary} 0%,#0f172a 100%);color:#fff}
  .hero:after{content:'';position:absolute;right:-120px;top:-120px;width:320px;height:320px;background:radial-gradient(circle,rgba(255,255,255,.22) 0%,rgba(255,255,255,0) 70%)}
  .brand{position:relative;font-size:11px;letter-spacing:.18em;text-transform:uppercase;opacity:.92}
  .title{position:relative;font-size:34px;line-height:1.1;font-weight:800;margin:12px 0 8px;max-width:760px}
  .subtitle{position:relative;display:flex;gap:14px;flex-wrap:wrap;font-size:12px;opacity:.93}
  .dash{padding:18px 36px;background:${brandPrimarySoft};border-bottom:1px solid ${border}}
  .dash-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
  .stat{background:#fff;border:1px solid ${border};border-radius:12px;padding:10px 12px;min-height:72px}
  .stat-k{font-size:10px;color:${brandSoft};letter-spacing:.08em;text-transform:uppercase}
  .stat-v{margin-top:5px;font-size:18px;font-weight:800;color:${brandStrong}}
  .stat-s{margin-top:2px;font-size:11px;color:${brandMuted}}
  .main{display:grid;grid-template-columns:1.7fr .9fr;gap:18px;padding:24px 36px}
  .content{padding:2px 0 8px}
  .content p,.content li,.content div{font-size:13px;line-height:1.75;color:${brandStrong}}
  .content strong{color:${brandPrimary}}
  .content em{color:${brandMuted}}
  .content ul{padding-left:18px}
  .aside{display:flex;flex-direction:column;gap:14px}
  .card{border:1px solid ${border};border-radius:14px;background:#fff;padding:12px}
  .card h3{margin:0 0 10px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:${brandSoft}}
  .viz{width:100%;height:auto;display:block}
  .score-wrap{display:flex;align-items:center;gap:10px}
  .score-text{font-size:12px;color:${brandMuted}}
  .score-text b{display:block;font-size:26px;color:${brandStrong};line-height:1.05}
  .footer{display:flex;justify-content:space-between;gap:12px;align-items:center;padding:14px 36px;border-top:1px solid ${border};background:linear-gradient(180deg,#fff,${brandPrimarySoft});font-size:11px;color:${brandMuted}}
  .footer b{color:${brandPrimary}}
  @media print{
    body{background:#fff}
    .sheet{max-width:none;margin:0;border:none;border-radius:0;box-shadow:none}
    .main{grid-template-columns:1fr}
    .dash-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  }
  </style></head><body><article class="sheet"><header class="hero"><div class="brand">${logoMain}${logoSub?' · '+logoSub:''}</div><h1 class="title">${reportType}</h1><div class="subtitle"><span>Project: ${projectName}</span><span>Datum: ${today}</span><span>Referentie: ${logoMain.substring(0,4).toUpperCase()}-${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}</span></div></header><section class="dash"><div class="dash-grid"><div class="stat"><div class="stat-k">BENG 1</div><div class="stat-v">${metricA}</div><div class="stat-s">kWh/m²/jr</div></div><div class="stat"><div class="stat-k">BENG 2</div><div class="stat-v">${metricB}</div><div class="stat-s">kWh/m²/jr</div></div><div class="stat"><div class="stat-k">Duurzaam aandeel</div><div class="stat-v">${metricC}%</div><div class="stat-s">geanalyseerd</div></div><div class="stat"><div class="stat-k">Kwaliteitsscore</div><div class="stat-v">${score}/100</div><div class="stat-s">automatische beoordeling</div></div></div></section><section class="main"><section class="content">${reportHtml}</section><aside class="aside"><section class="card"><h3>Prestatievergelijking</h3><svg class="viz" viewBox="0 0 325 130" role="img" aria-label="Prestatie staafdiagram">${barSvg}</svg></section><section class="card"><h3>Trend</h3><svg class="viz" viewBox="0 0 210 130" role="img" aria-label="Trend grafiek"><line x1="16" y1="116" x2="194" y2="116" stroke="${border}"/><polyline fill="none" stroke="${brandPrimary}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" points="${linePoints}"/><circle cx="24" cy="${116-Math.round((numA/100)*82)}" r="4" fill="${brandPrimary}"/><circle cx="106" cy="${116-Math.round((numB/100)*82)}" r="4" fill="${warnColor}"/><circle cx="188" cy="${116-Math.round((numC/100)*82)}" r="4" fill="${okColor}"/></svg></section><section class="card"><h3>Totaalscore</h3><div class="score-wrap"><svg width="102" height="102" viewBox="0 0 102 102" role="img" aria-label="Score ring"><circle cx="51" cy="51" r="42" fill="none" stroke="#e2e8f0" stroke-width="10"/><circle cx="51" cy="51" r="42" fill="none" stroke="${brandPrimary}" stroke-width="10" stroke-linecap="round" stroke-dasharray="${circumference.toFixed(2)}" stroke-dashoffset="${dashOffset.toFixed(2)}" transform="rotate(-90 51 51)"/></svg><div class="score-text"><b>${score}</b>Visuele rapportkwaliteit en normprestatie.</div></div></section></aside></section><footer class="footer"><span><b>${logoMain}</b> - automatisch opgesteld rapport in bedrijfshuisstijl</span><span>Vertrouwelijk · Alleen voor intern gebruik en opdrachtgever</span></footer></article></body></html>`);

  pdfWindow.document.close();
  pdfWindow.focus();
  setTimeout(()=>pdfWindow.print(),340);
}
function exportSectionPdf(sectionId,title,projectName){
  const section=document.getElementById(sectionId);
  if(!section)return;
  exportRapportPdf({
    bodyHtml:section.innerHTML,
    reportType:title||'Rapport',
    projectName:projectName||((document.querySelector('#page-rapport input.inp')||{}).value||'Project')
  });
}

function sendToRapportFromSection(sectionId,reportType){
  const section=document.getElementById(sectionId);
  const out=document.getElementById('rp-out');
  const acts=document.getElementById('rp-acts');
  if(!section||!out||!acts)return;
  out.innerHTML=section.innerHTML;
  acts.style.display='flex';
  acts.innerHTML='<button class="btn btn-primary btn-sm">⬇ Download .docx</button><button class="btn btn-outline btn-sm" onclick="exportRapportPdf()">⬇ Download PDF</button><button class="btn btn-outline btn-sm">✏ Bewerk</button>';
  const nav=document.querySelector(".nav-item[onclick*='rapport']");
  if(typeof show==='function')show('rapport',nav);
  if(reportType){
    const selected=document.querySelector('.rt-btn.sel .rt-title');
    if(selected)selected.textContent=reportType;
  }
}
function genRapport(){
  const bar=document.getElementById('rpbar'),lbl=document.getElementById('rp-lbl'),prog=document.getElementById('rp-prog'),out=document.getElementById('rp-out'),acts=document.getElementById('rp-acts');
  prog.style.display='block';acts.style.display='none';out.innerHTML='<span style="color:var(--soft)">Rapport wordt opgesteld...</span>';
  const steps=[[15,'Projectgegevens verwerken...'],[35,'VIAC templates laden...'],[55,'Paris Proof normen toepassen...'],[75,'Installatieschema opstellen...'],[92,'Rapport opmaken...'],[100,'Rapport gereed!']];
  let i=0;const run=()=>{if(i<steps.length){bar.style.width=steps[i][0]+'%';lbl.textContent=steps[i][1];i++;setTimeout(run,450);}else{prog.style.display='none';acts.style.display='flex';acts.innerHTML='<button class="btn btn-primary btn-sm">⬇ Download .docx</button><button class="btn btn-outline btn-sm" onclick="exportRapportPdf()">⬇ Download PDF</button><button class="btn btn-outline btn-sm">✏ Bewerk</button>';out.innerHTML=`<strong style="color:var(--teal);font-family:'Playfair Display',serif;">BENG Rapportage — Kantoor Papendorp fase 2</strong><br><br><strong>Opdrachtgever:</strong> Syntrus Achmea Real Estate<br><strong>Adviseur:</strong> VIAC Adviseurs BV · 21 april 2026<br><br><strong>1. Projectomschrijving</strong><br>Transformatie van het kantoorgebouw Papendorp fase 2 naar een Paris Proof gebouw. BVO: 2.840 m². Volledige renovatie W/E installaties.<br><br><strong>2. Installatieconcept</strong><br>Lucht-water warmtepomp (COP 4,2) + PV 72 kWp + WTW ventilatie η=88%. Gasaansluiting verwijderd.<br><br><strong>3. BENG Indicatoren</strong><br>• BENG 1: <strong style="color:var(--green)">42 kWh/m²/jr ✓</strong> (eis ≤50)<br>• BENG 2: <strong style="color:var(--green)">27 kWh/m²/jr ✓</strong> (eis ≤30 na 2027)<br>• BENG 3: <strong style="color:var(--green)">68% ✓</strong> (eis ≥50%)<br><br><em style="color:var(--soft);">Opgesteld door VIAC Digitaal Platform · NEN 7120 + Paris Proof 2030</em><div style="margin-top:12px;padding-top:10px;border-top:1px solid var(--border);"><button class="expl-btn" onclick="toggleExplain('ep-rapport')">▶ Waarom is dit correct?</button><div class="expl-pan" id="ep-rapport"><strong>Gebaseerd op:</strong><br>• <strong>NEN 7120:2011</strong> — Energieprestatie van gebouwen (bepalingsmethode BENG)<br>• <strong>Bbl bijlage A</strong> — BENG-eisen per gebruiksfunctie, rev. 2027<br>• <strong>Paris Proof 2030</strong> — DGBC doelstelling kantoren: 55 kWh/m²/jr<br><br><strong>Aannames:</strong><br>• Warmtepomp SCOP: 4,2 | PV opbrengst: 900 kWh/kWp/jr<br>• Infiltratie: 0,2 dm³/s·m² | WTW rendement η=88%<br>• Berekend conform NEN 7120 + ISSO-75<br><div class="expl-src">📚 Bronnen: NEN 7120:2011, Bbl 2024 bijlage A, DGBC Paris Proof 2030, ISSO-75</div></div></div>`;}};run();
}
function loadXLS(){
  document.getElementById('xls-body').innerHTML=`<div style="margin-bottom:10px;font-size:12px;color:var(--soft);">📂 warmteverliesberekening.xlsx geladen</div><div class="xls-preview"><div class="xrow xhead"><div class="xcell">Bouwdeel</div><div class="xcell">Opp. m²</div><div class="xcell">U-waarde</div><div class="xcell">Temp.∆</div><div class="xcell">Verlies W</div></div><div class="xrow"><div class="xcell">Gevel noord</div><div class="xcell">184</div><div class="xcell">0.21</div><div class="xcell">22</div><div class="xcell">849</div></div><div class="xrow"><div class="xcell">Gevel oost</div><div class="xcell">96</div><div class="xcell">0.21</div><div class="xcell">22</div><div class="xcell">443</div></div><div class="xrow"><div class="xcell">Dak</div><div class="xcell">710</div><div class="xcell" style="color:var(--amber);font-weight:600;">?</div><div class="xcell">22</div><div class="xcell" style="color:var(--amber);">—</div></div><div class="xrow"><div class="xcell">Begane grond</div><div class="xcell">710</div><div class="xcell" style="color:var(--amber);font-weight:600;">?</div><div class="xcell">10</div><div class="xcell" style="color:var(--amber);">—</div></div><div class="xrow"><div class="xcell">Glas totaal</div><div class="xcell">340</div><div class="xcell">0.70</div><div class="xcell">22</div><div class="xcell">5.236</div></div></div><div style="margin-bottom:10px;"><span class="ai-chip">✦ 2 ontbrekende waarden gedetecteerd</span></div><button class="btn btn-primary btn-sm" onclick="procXLS()">✦ Verwerk automatisch</button>`;
}
function procXLS(){
  const b=document.getElementById('xls-body');b.innerHTML='<div class="prog-wrap"><div class="prog-bar" id="xpbar" style="width:0%"></div></div><div style="font-size:11px;color:var(--mid);margin-top:4px;">NEN 1068 waarden opzoeken...</div>';
  let w=0;const iv=setInterval(()=>{w+=8;document.getElementById('xpbar').style.width=w+'%';if(w>=100){clearInterval(iv);b.innerHTML=`<div style="margin-bottom:8px;"><span class="ai-chip">✦ 2 waarden ingevuld · totaal berekend</span></div><div class="xls-preview"><div class="xrow xhead"><div class="xcell">Bouwdeel</div><div class="xcell">Opp. m²</div><div class="xcell">U-waarde</div><div class="xcell">Temp.∆</div><div class="xcell">Verlies W</div></div><div class="xrow"><div class="xcell">Gevel noord</div><div class="xcell">184</div><div class="xcell">0.21</div><div class="xcell">22</div><div class="xcell">849</div></div><div class="xrow"><div class="xcell">Gevel oost</div><div class="xcell">96</div><div class="xcell">0.21</div><div class="xcell">22</div><div class="xcell">443</div></div><div class="xrow"><div class="xcell">Dak</div><div class="xcell">710</div><div class="xcell xai">0.20 ✦</div><div class="xcell">22</div><div class="xcell xai">3.124 ✦</div></div><div class="xrow"><div class="xcell">Begane grond</div><div class="xcell">710</div><div class="xcell xai">0.25 ✦</div><div class="xcell">10</div><div class="xcell xai">1.775 ✦</div></div><div class="xrow"><div class="xcell">Glas totaal</div><div class="xcell">340</div><div class="xcell">0.70</div><div class="xcell">22</div><div class="xcell">5.236</div></div><div class="xrow" style="background:var(--teal-light);font-weight:700;"><div class="xcell">TOTAAL</div><div class="xcell">—</div><div class="xcell">—</div><div class="xcell">—</div><div class="xcell xai">11.427 W ✦</div></div></div><div style="background:var(--teal-light);border-radius:8px;padding:12px;font-size:12px;color:var(--teal);margin-top:8px;"><strong>Conclusie:</strong> Transmissieverlies 11,4 kW. Voldoet aan BENG eis. <strong style="color:var(--green);">✓ BENG 1 gehaald.</strong></div><div style="margin-top:10px;display:flex;gap:8px;"><button class="btn btn-primary btn-sm">⬇ Download Excel</button><button class="btn btn-outline btn-sm">📄 Naar rapport</button></div><button class="expl-btn" onclick="toggleExplain('ep-excel')">▶ Waarom is dit correct?</button><div class="expl-pan" id="ep-excel"><strong>Gebruikte formule:</strong><br>Warmteverlies Q = U × A × ΔT (W)<br>• U-waarde dak (0,20 W/m²K) uit <strong>NEN 1068:2013 tabel 1</strong> — standaard Rc 5,0 m²K/W<br>• U-waarde begane grond (0,25 W/m²K) uit NEN 1068 — standaard Rc 4,0 m²K/W<br><br><strong>Bbl minimumwaarden bouwdelen (kantoor):</strong><br>• Gevel: Rc ≥ 4,7 m²K/W | Dak: Rc ≥ 6,0 | Vloer: Rc ≥ 3,5 | Glas: U ≤ 1,65 W/m²K<br>• Alle bouwdelen voldoen aan Bbl 2024 artikel 5.3<br><div class="expl-src">📚 Bronnen: NEN 1068:2013, NEN-EN ISO 6946, Bbl 2024 art. 5.3, ISSO-publicatie 82</div></div>`;}},100);
}
function checkBENG(){
  const b=document.getElementById('beng-body');b.innerHTML='<div class="prog-wrap"><div class="prog-bar" id="bpbar" style="width:0%"></div></div>';
  let w=0;const iv=setInterval(()=>{w+=10;document.getElementById('bpbar').style.width=w+'%';if(w>=100){clearInterval(iv);b.innerHTML=`<div class="brc"><div class="brow"><div style="font-size:12px;color:var(--mid)">BENG 1 — Energiebehoefte</div><div style="font-size:13px;font-weight:700;color:var(--green)">42 kWh/m²/jr ✓</div></div><div class="brow"><div style="font-size:11px;color:var(--soft)">Eis (kantoor)</div><div style="font-size:11px;color:var(--mid)">≤ 50 kWh/m²/jr</div></div></div><div class="brc"><div class="brow"><div style="font-size:12px;color:var(--mid)">BENG 2 — Primair fossiel</div><div style="font-size:13px;font-weight:700;color:var(--green)">27 kWh/m²/jr ✓</div></div><div class="brow"><div style="font-size:11px;color:var(--soft)">Eis vanaf 2027</div><div style="font-size:11px;color:var(--mid)">≤ 30 kWh/m²/jr</div></div></div><div class="brc"><div class="brow"><div style="font-size:12px;color:var(--mid)">BENG 3 — Hernieuwbaar</div><div style="font-size:13px;font-weight:700;color:var(--green)">68% ✓</div></div><div class="brow"><div style="font-size:11px;color:var(--soft)">Eis</div><div style="font-size:11px;color:var(--mid)">≥ 50%</div></div></div><div style="background:#E3F5EC;border-radius:8px;padding:12px;margin-top:8px;"><div style="font-size:13px;font-weight:700;color:var(--green);">✓ Alle BENG indicatoren gehaald</div><div style="font-size:11px;color:var(--mid);margin-top:4px;">Kwalificeert voor Paris Proof 2030. BENG 2 heeft 10% marge boven de 2027 eis.</div></div><div style="margin-top:10px;display:flex;gap:8px;"><button class="btn btn-primary btn-sm" onclick="sendToRapportFromSection('beng-body','BENG Rapportage')">📄 Genereer BENG rapport</button><button class="btn btn-outline btn-sm" onclick="exportSectionPdf('beng-body','BENG Rapport')">⬇ PDF</button></div><button class="expl-btn" onclick="toggleExplain('ep-beng')">▶ Waarom is dit correct?</button><div class="expl-pan" id="ep-beng"><strong>Berekeningswijze BENG indicatoren (NEN 7120):</strong><br>• <strong>BENG 1</strong>: (Transmissieverlies + ventilatieverl. – zonnewinsten) / Ag = 42 kWh/m²/jr<br>• <strong>BENG 2</strong>: EP_primair = EP_totaal × fp_fossiel — warmtepomp COP 4,2 verlaagt fossiel aandeel sterk<br>• <strong>BENG 3</strong>: PV 72 kWp × 900 kWh/kWp/jr = 64.800 kWh hernieuwbaar = 68% van totaal<br><br><strong>Eisen conform Bbl bijlage A (kantoor, 2027):</strong><br>• BENG 1 ≤ 50 kWh/m²/jr ✓ marge 16% | BENG 2 ≤ 30 ✓ marge 10% | BENG 3 ≥ 50% ✓<br><div class="expl-src">📚 Bronnen: NEN 7120:2011, Bbl 2024 bijlage A, ISSO-75.1, NEN-EN ISO 52000-1</div></div>`;}},100);
}
const kbData=[
  {title:'Warmtepomp renovatie UMCU fase 1',meta:'Zorg · 2023 · 12.400 m² · Utrecht',snip:'Lucht-water warmtepompen in 6 vleugels. COP gemeten 4.1. Aardgasvrij behaald. Projectduur 14 maanden.',score:97,
   cmp:{type:'Zorggebouw renovatie',m2:'12.400 m²',tech:'6× lucht-water warmtepomp, COP 4,1',beng2:'24 kWh/m²/jr',saving:'CO₂ −65%',reuse:'WP-fasering, BMS-aanpak, installatiestrategie per vleugel'}},
  {title:'WKO-systeem Antonius Ziekenhuis Nieuwegein',meta:'Zorg · 2022 · 28.000 m² · Nieuwegein',snip:'Warmte-koude opslag met absorptiekoeling. Energiebesparing 62% t.o.v. referentie. Paris Proof gehaald.',score:91,
   cmp:{type:'Zorggebouw nieuwbouw',m2:'28.000 m²',tech:'WKO + absorptiekoeling, COP eff. 5,8',beng2:'19 kWh/m²/jr',saving:'CO₂ −62%',reuse:'WKO-ontwerp, koelcapaciteitsberekening, Paris Proof aanpak'}},
  {title:'Renovatie warmtesysteem woonzorgcentrum Zeist',meta:'Zorg · 2024 · 4.200 m² · Zeist',snip:'Hybride warmtepomp systeem. Gasverbruik min 78%. BMS integratie voor real-time monitoring.',score:88,
   cmp:{type:'Zorgwonen renovatie',m2:'4.200 m²',tech:'Hybride warmtepomp + gasketel back-up',beng2:'31 kWh/m²/jr',saving:'Gas −78%',reuse:'Hybride strategie, BMS-aanpak, stapsgewijze vervanging'}},
  {title:'Duurzame installaties Meander MC',meta:'Zorg · 2021 · 45.000 m² · Amersfoort',snip:'Totaalrenovatie W/E. WKO + warmtepomp. BREEAM Excellent. CO₂ reductie 71%.',score:84,
   cmp:{type:'Zorggebouw totaalrenovatie',m2:'45.000 m²',tech:'WKO + warmtepomp + PV 380 kWp',beng2:'22 kWh/m²/jr',saving:'CO₂ −71%',reuse:'WKO + WP combinatie, PV-integratie, BREEAM documentatie'}},
];
function searchKB(){
  const q=document.getElementById('kb-q').value;
  document.getElementById('kb-meta').textContent=kbData.length+` resultaten voor "${q}" — gesorteerd op relevantie`;
  document.getElementById('kb-results').innerHTML=kbData.map((k,idx)=>`<div class="kb-item"><span class="match">${k.score}% match</span><div class="kb-title">${k.title}</div><div class="kb-meta">${k.meta}</div><div class="kb-snip">${k.snip}</div><div style="margin-top:8px;"><button class="expl-btn" style="margin-top:0;" onclick="showCompare(${idx})">◎ Vergelijk met huidig project</button></div><div class="cmp-pan" id="cmp-${idx}"><div class="cmp-title">◎ Dit project vs. huidige scope</div><div class="cmp-row"><span class="cmp-lbl">Type</span><span class="cmp-val">${k.cmp.type}</span></div><div class="cmp-row"><span class="cmp-lbl">Projectgrootte</span><span class="cmp-val">${k.cmp.m2}</span></div><div class="cmp-row"><span class="cmp-lbl">Techniek</span><span class="cmp-val">${k.cmp.tech}</span></div><div class="cmp-row"><span class="cmp-lbl">BENG 2 resultaat</span><span class="cmp-val">${k.cmp.beng2}</span></div><div class="cmp-row"><span class="cmp-lbl">CO₂ besparing</span><span class="cmp-val">${k.cmp.saving}</span></div><div class="cmp-row"><span class="cmp-lbl">Hergebruikbare aanpak</span><span class="cmp-val">${k.cmp.reuse}</span></div></div></div>`).join('');
}
function qaAnalyse(){
  document.getElementById('qaOv').classList.add('show');
  const bd=document.getElementById('qaBody');
  bd.innerHTML='<div class="prog-wrap"><div class="prog-bar" id="qapbar" style="width:0%"></div></div><div style="font-size:11px;color:var(--mid);margin-top:6px;">Projecten scannen op ontbrekende en inconsistente gegevens...</div>';
  let w=0;const iv=setInterval(()=>{w+=5;const el=document.getElementById('qapbar');if(el)el.style.width=w+'%';if(w>=100){clearInterval(iv);bd.innerHTML=`<div style="margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;"><div style="font-size:12px;color:var(--mid);">5 projecten gescand · <strong style="color:var(--red);">2 hoog risico</strong> · 3 aandachtspunten</div><span class="ai-chip">✦ QA Score: 74/100</span></div><div class="iss-row"><div class="iss-r r-h">Hoog</div><div><div class="iss-txt"><strong>Kantoor Papendorp fase 2</strong> — BENG 2 marge onder 10%</div><div class="iss-sub">Primair fossiel: 27 kWh/m²/jr · Eis 2027: 30 · Risico bij kleine ontwerpwijziging</div></div></div><div class="iss-row"><div class="iss-r r-h">Hoog</div><div><div class="iss-txt"><strong>Renovatie UMCU Vleugel B</strong> — Deadline in 3 dagen, rapport incompleet</div><div class="iss-sub">Sectie 4 (installatieconcept) ontbreekt · WKB checklist niet ingevuld</div></div></div><div class="iss-row"><div class="iss-r r-m">Middel</div><div><div class="iss-txt"><strong>Frisse School De Meern</strong> — U-waarde glas niet bevestigd</div><div class="iss-sub">Standaardwaarde 0,7 W/m²K aangenomen · Bevestig bij architect</div></div></div><div class="iss-row"><div class="iss-r r-m">Middel</div><div><div class="iss-txt"><strong>Monument Oudegracht 88</strong> — Geen installatiestrategie voor monument</div><div class="iss-sub">Warmtepomp mogelijk niet haalbaar bij monumentenstatus · Alternatief nodig</div></div></div><div class="iss-row"><div class="iss-r r-l">Laag</div><div><div class="iss-txt"><strong>Wooncomplex Leidsche Rijn</strong> — PV vermogen niet bevestigd</div><div class="iss-sub">72 kWp aangenomen · Structuuradvies dak nodig voor definitieve waarde</div></div></div><div style="margin-top:14px;padding-top:12px;border-top:1px solid var(--border);display:flex;gap:8px;"><button class="btn btn-primary btn-sm">📄 Exporteer QA rapport</button><button class="btn btn-outline btn-sm" onclick="closeQA()">Sluiten</button></div>`;}},60);
}
function closeQA(){document.getElementById('qaOv').classList.remove('show');}
function toggleExplain(id){
  const el=document.getElementById(id);if(!el)return;
  el.classList.toggle('show');
  const btn=el.previousElementSibling;
  if(btn&&btn.classList.contains('expl-btn'))btn.innerHTML=el.classList.contains('show')?'▲ Verberg uitleg':'▶ Waarom is dit correct?';
}
function showCompare(idx){const el=document.getElementById('cmp-'+idx);if(el)el.classList.toggle('show');}
function normImpact(n,btn){
  const el=document.getElementById('ni-'+n);if(!el)return;
  if(el.innerHTML){el.innerHTML='';btn.textContent=n===0?'Bekijk impact voor mijn projecten':'Check mijn lopende projecten';return;}
  const data=[
    {title:'NEN 1010:2026 — Impact op lopende projecten',items:[
      {p:'Wooncomplex Leidsche Rijn',i:'Groepsverdeling en differentiaalbeveiliging reviewen — nieuwe eisen per 1 juli 2026',lvl:'warn'},
      {p:'Renovatie UMCU Vleugel B',i:'Medische locatie: NEN 1010 afd. 7-710 van toepassing — elektrotechnisch adviseur actie vereist',lvl:'miss'},
      {p:'Frisse School De Meern',i:'FELV-systemen en noodverlichting reviewen conform nieuwe norm',lvl:'warn'}
    ]},
    {title:'BENG kantoren 2027 — Impact op lopende projecten',items:[
      {p:'Kantoor Papendorp fase 2',i:'Huidig BENG 2: 27 kWh/m²/jr — voldoet ruim aan nieuwe eis ≤30 ✓',lvl:'ok'},
      {p:'Monument Oudegracht 88',i:'Kantoorcomponent: herbereken BENG 2 bij definitieve aanvraag na 1 jan 2027',lvl:'warn'},
      {p:'Wooncomplex Leidsche Rijn',i:'Niet van toepassing — woonfunctie, andere BENG-grenswaarden',lvl:'ok'}
    ]}
  ];
  const d=data[n];
  btn.textContent='▲ Verberg impact';
  el.innerHTML=`<div style="margin-top:10px;background:var(--teal-light);border-radius:8px;padding:14px;animation:fi .22s ease;"><div style="font-size:12px;font-weight:700;color:var(--teal);margin-bottom:8px;">${d.title}</div>${d.items.map(i=>`<div style="display:flex;gap:8px;padding:6px 0;border-bottom:1px solid var(--border);font-size:12px;align-items:flex-start;"><div style="width:8px;height:8px;border-radius:50%;background:${i.lvl==='ok'?'var(--green)':i.lvl==='warn'?'var(--amber)':'var(--red)'};margin-top:4px;flex-shrink:0;"></div><div><strong>${i.p}</strong><br><span style="color:var(--mid)">${i.i}</span></div></div>`).join('')}</div>`;
}
function variantAnalyse(){
  const proj=document.getElementById('vc-proj').value;
  const r=document.getElementById('vc-result');
  r.innerHTML='<div class="panel"><div class="panel-body"><div class="prog-wrap"><div class="prog-bar" id="vcpbar" style="width:0%"></div></div><div style="font-size:11px;color:var(--mid);margin-top:4px;" id="vc-lbl">BENG indicatoren berekenen per variant...</div></div></div>';
  const steps=[[20,'BENG 1 berekenen per variant...'],[45,'BENG 2 fossiel energiegebruik...'],[65,'BENG 3 hernieuwbaar bepalen...'],[82,'GPR indicaties ophalen...'],[95,'DUMAVA subsidiecheck...'],[100,'Analyse gereed!']];
  let i=0;const run=()=>{if(i<steps.length){const el=document.getElementById('vcpbar');const lb=document.getElementById('vc-lbl');if(el)el.style.width=steps[i][0]+'%';if(lb)lb.textContent=steps[i][1];i++;setTimeout(run,380);}else{
    r.innerHTML=`<div class="panel"><div class="panel-head"><div class="panel-icon">✅</div><div class="panel-title">Vergelijkingsresultaten — ${proj}</div></div><div class="panel-body">
    <div class="vc-grid">
      <div class="vc-card"><div class="vc-title">Variant A — Extra dakisolatie</div>
        <div class="vc-row"><span class="vc-lbl">BENG 1</span><span class="vc-ok">39 kWh/m²/jr ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">BENG 2</span><span class="vc-ok">26 kWh/m²/jr ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">BENG 3</span><span class="vc-ok">68% ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">GPR indicatie</span><span class="vc-v">7,1</span></div>
        <div class="vc-row"><span class="vc-lbl">Meerkosten</span><span class="vc-v">€ 22.000</span></div>
        <div class="vc-row"><span class="vc-lbl">DUMAVA</span><span style="font-weight:700;color:var(--red);">✗ Niet subsidiabel</span></div>
        <div style="margin-top:10px;font-size:11px;color:var(--mid);">Beperkte BENG 2 verbetering. Laagste kosten maar geen subsidie.</div>
      </div>
      <div class="vc-card winner"><div class="vc-badge">★ Aanbevolen</div>
        <div class="vc-title">Variant B — Warmtepomp upgrade</div>
        <div class="vc-row"><span class="vc-lbl">BENG 1</span><span class="vc-ok">42 kWh/m²/jr ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">BENG 2</span><span class="vc-ok">22 kWh/m²/jr ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">BENG 3</span><span class="vc-ok">72% ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">GPR indicatie</span><span class="vc-v">7,6</span></div>
        <div class="vc-row"><span class="vc-lbl">Meerkosten</span><span class="vc-v">€ 35.000</span></div>
        <div class="vc-row"><span class="vc-lbl">DUMAVA</span><span class="vc-ok">✓ Subsidiabel</span></div>
        <div style="margin-top:10px;font-size:11px;color:var(--mid);">Beste kosten-baten. DUMAVA dekt ~77% meerkosten. Netto investering ca. €8.000.</div>
        <button class="btn btn-primary btn-sm" style="width:100%;margin-top:10px;">✓ Selecteer Variant B</button>
      </div>
      <div class="vc-card"><div class="vc-title">Variant C — PV uitbreiding</div>
        <div class="vc-row"><span class="vc-lbl">BENG 1</span><span class="vc-ok">42 kWh/m²/jr ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">BENG 2</span><span class="vc-ok">20 kWh/m²/jr ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">BENG 3</span><span class="vc-ok">81% ✓</span></div>
        <div class="vc-row"><span class="vc-lbl">GPR indicatie</span><span class="vc-v">7,4</span></div>
        <div class="vc-row"><span class="vc-lbl">Meerkosten</span><span class="vc-v">€ 48.000</span></div>
        <div class="vc-row"><span class="vc-lbl">DUMAVA</span><span class="vc-ok">✓ Subsidiabel</span></div>
        <div style="margin-top:10px;font-size:11px;color:var(--mid);">Hoogste BENG 3 score. Maximale hernieuwbare energie. Combineerbaar met B.</div>
      </div>
    </div>
    <div style="background:var(--teal-light);border-radius:8px;padding:12px;font-size:12px;color:var(--mid);"><strong style="color:var(--teal);">Advies:</strong> Variant B heeft de beste kosten-baten verhouding. BENG 2 daalt van 27 → 22 kWh/m²/jr. DUMAVA subsidie dekt ~77% van meerkosten. Combinatie B+C haalt Paris Proof 2030 target van 55 kWh/m²/jr ruim.</div>
    <div style="display:flex;gap:8px;margin-top:12px;"><button class="btn btn-primary btn-sm">📄 Exporteer vergelijking</button><button class="btn btn-outline btn-sm">✦ Stuur naar Rapport Schrijver</button></div>
    </div></div>`;}};run();
}
function wkbBuild(){
  const b=document.getElementById('wkb-body');
  b.innerHTML='<div class="prog-wrap"><div class="prog-bar" id="wkbpbar" style="width:0%"></div></div><div style="font-size:11px;color:var(--mid);margin-top:4px;">WKB vereisten ophalen voor GK2 zorgfunctie...</div>';
  let w=0;const iv=setInterval(()=>{w+=7;const el=document.getElementById('wkbpbar');if(el)el.style.width=w+'%';if(w>=100){clearInterval(iv);
  b.innerHTML=`<div style="background:var(--teal-light);border-radius:8px;padding:14px;margin-bottom:14px;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;"><div style="font-size:12px;font-weight:600;color:var(--teal);">Dossier compleetheid</div><div style="font-size:14px;font-weight:700;color:var(--amber);">62%</div></div>
    <div class="prog-wrap" style="margin:0 0 6px;"><div class="prog-bar" style="width:62%;background:var(--amber);"></div></div>
    <div style="font-size:11px;color:var(--mid);">5 items aanwezig · 3 incompleet · 2 ontbreekt</div>
  </div>
  <div class="wkb-item wkb-ok"><div class="wkb-ic">✓</div><div><div class="wkb-lbl">Borgingsplan ingediend</div><div class="wkb-sub">GK2 borgingsplan · ingediend 3 mrt 2026 · ref. BP-2026-044</div></div></div>
  <div class="wkb-item wkb-ok"><div class="wkb-ic">✓</div><div><div class="wkb-lbl">Kwaliteitsborger aangesteld</div><div class="wkb-sub">Van Rossum Kwaliteitsborging B.V. · WKB gecertificeerd</div></div></div>
  <div class="wkb-item wkb-ok"><div class="wkb-ic">✓</div><div><div class="wkb-lbl">Voormelding Bevoegd Gezag</div><div class="wkb-sub">Gemeente Utrecht · ontvangen 10 feb 2026</div></div></div>
  <div class="wkb-item wkb-ok"><div class="wkb-ic">✓</div><div><div class="wkb-lbl">Constructieve veiligheid VO-fase</div><div class="wkb-sub">Constructierapport goedgekeurd · D3BN Ingenieurs</div></div></div>
  <div class="wkb-item wkb-ok"><div class="wkb-ic">✓</div><div><div class="wkb-lbl">BENG berekening DO</div><div class="wkb-sub">NTA 8800 · BENG 1/2/3 conform eis · VIAC rapport 21 apr 2026</div></div></div>
  <div class="wkb-item wkb-warn"><div class="wkb-ic">⚠</div><div><div class="wkb-lbl">Brandveiligheidsplan — incompleet</div><div class="wkb-sub">WBDBO berekening (NEN 6068) ontbreekt. Vereist voor GK2 zorg. Actie vóór 28 apr.</div></div></div>
  <div class="wkb-item wkb-warn"><div class="wkb-ic">⚠</div><div><div class="wkb-lbl">Akoestisch rapport — incompleet</div><div class="wkb-sub">Rw-berekening scheiding verblijfsruimten ontbreekt (Bbl afd. 3.1 ≥55 dB).</div></div></div>
  <div class="wkb-item wkb-warn"><div class="wkb-ic">⚠</div><div><div class="wkb-lbl">Legionella risicoanalyse — incompleet</div><div class="wkb-sub">ISSO 55.1 analyse nog niet aangeleverd door installateur.</div></div></div>
  <div class="wkb-item wkb-miss"><div class="wkb-ic">✗</div><div><div class="wkb-lbl">Dossier Bevoegd Gezag</div><div class="wkb-sub">Nog te compileren na afronding brandveiligheid en akoestiek.</div></div></div>
  <div class="wkb-item wkb-miss"><div class="wkb-ic">✗</div><div><div class="wkb-lbl">Opleverdossier</div><div class="wkb-sub">Fase: DO. Wordt aangemaakt bij oplevering. Niet van toepassing.</div></div></div>
  <div style="display:flex;gap:8px;margin-top:12px;"><button class="btn btn-primary btn-sm" onclick="exportSectionPdf('wkb-body','WKB Dossier')">⬇ Export WKB dossier PDF</button><button class="btn btn-outline btn-sm">📧 Stuur naar kwaliteitsborger</button></div>`;}},80);
}
const cgConcepts={
  'Kantoor':[{name:'Lucht-water warmtepomp + PV',desc:'Eenvoudig en betrouwbaar voor kantoren tot 5.000 m². Gasvrij, BENG 2 haalbaar binnen 30 kWh/m²/jr.',pros:['Lage investeringskosten','Breed toepasbaar','Snel installeerbaar'],cons:['Hogere elektriciteitsvraag bij koude piek','Buitenruimte nodig voor units']},{name:'WKO-systeem + warmtepomp',desc:'Optimaal voor grotere kantoren. Laagste energiekosten op lange termijn. Paris Proof 2030 haalbaar.',pros:['BENG 2 ruim onder 20 kWh/m²/jr','Gratis koeling in zomer','Lage operationele kosten'],cons:['Hoge initiële investering','Bodemonderzoek vereist','Vergunning grondwater nodig']}],
  'Woning (appartementen)':[{name:'Lucht-water WP per appartement',desc:'Individuele installatie per woning. Geschikt voor nieuwbouw en grote renovaties.',pros:['Bewoner individueel verantwoordelijk','BENG 2 ≤ 20 kWh/m²/jr haalbaar','Eenvoudige service'],cons:['Ruimtebehoefte per unit','Geluidsisolatie buitenunit nodig']},{name:'Collectief WKO + afleverset',desc:'Collectieve warmtelevering. Ideaal voor gebouwen > 30 appartementen.',pros:['Laagste energiekosten VvE','Hoge bewonerstevredenheid','Paris Proof haalbaar'],cons:['Complexere aansturing','Hogere projectkosten','VvE-besluit vereist']}],
  'Zorggebouw':[{name:'WKO + absorptiekoeling',desc:'Stabiele levering voor 24/7 zorggebouwen. Koeling en warmte simultaan leverbaar.',pros:['Hoge betrouwbaarheid','Simultane koeling/warmte','Lage fossiele emissie'],cons:['Complex systeem','Onderhoud vereist specialist','Hoge aanlegkosten']},{name:'Lucht-water WP + redundantie',desc:'Eenvoudiger systeem met back-up voor zorgcontinuïteit.',pros:['Redundantie ingebouwd','Lager risico','Snellere oplevering'],cons:['Minder efficiënt dan WKO','Hogere energiekosten langetermijn']}],
  'School / Onderwijs':[{name:'Lucht-water WP + Frisse Scholen C',desc:'Voldoet aan Bbl Frisse Scholen klasse C eis. CO₂-gestuurde ventilatie.',pros:['Wettelijk vereist niveau','Gezond binnenklimaat','Bekende techniek'],cons:['Hogere elektriciteitsvraag','Buitenunits bij klassen']},{name:'WKO + vraaggestuurd ventileren',desc:'Premium oplossing voor scholen > 3.000 m². Frisse Scholen klasse B haalbaar.',pros:['Frisse Scholen klasse B','Laagste energiekosten','Subsidiabel via RVO'],cons:['Duurder in aanleg','Bodemonderzoek nodig']}],
  'Logistiek / Bedrijfshal':[{name:'Infraroodverwarming + LED + PV',desc:'Eenvoudig en kosteneffectief voor grote bedrijfshallen. Snel terugverdientijd PV.',pros:['Lage aanlegkosten','PV op groot dakoppervlak','Snel terugverdiend'],cons:['Minder geschikt voor kantoorzone','Beperkte koeling']},{name:'Lucht-water WP + ventilatieunit',desc:'Gecombineerde warmte/koeling, geschikt voor kantoor + hal.',pros:['Comfortabeler voor kantoorzone','BENG haalbaar','Flexibel'],cons:['Hogere investering','Meer onderhoud']}],
  'Horeca / Hotel':[{name:'WKO + stadsverwarming hybride',desc:'Optimale combinatie voor hotel met hoge warmtevraag en koelbehoefte.',pros:['Hoge comfort','Lage emissie','Paris Proof mogelijk'],cons:['Afhankelijk van stadsverwarming beschikbaarheid','Hoge aanleg']},{name:'Lucht-water WP + warmteterugwinning',desc:'Standalone systeem voor kleinere horeca of locaties zonder WKO.',pros:['Onafhankelijk van net','Standaard techniek','Goed te onderhouden'],cons:['Hogere elektriciteitskosten','Ruimtebehoefte buitenunits']}]
};
function genConcept(){
  const type=document.getElementById('cg-type').value;
  const m2=parseInt(document.getElementById('cg-m2').value)||2500;
  const state=document.getElementById('cg-state').value;
  const out=document.getElementById('cg-result');
  out.innerHTML='<div class="prog-wrap"><div class="prog-bar" id="cgpbar" style="width:0%"></div></div><div style="font-size:11px;color:var(--mid);margin-top:6px;">Systeemconcepten genereren voor '+type+'...</div>';
  let w=0;const iv=setInterval(()=>{w+=10;const el=document.getElementById('cgpbar');if(el)el.style.width=w+'%';if(w>=100){clearInterval(iv);const concepts=cgConcepts[type]||cgConcepts['Kantoor'];out.innerHTML=`<div style="font-size:11px;color:var(--soft);margin-bottom:10px;">${type} · ${m2.toLocaleString()} m² · ${state}</div><div class="cg-out-grid">${concepts.map((c,i)=>`<div class="cg-card"><div style="font-size:9px;font-weight:700;color:var(--soft);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px;">Optie ${i+1}</div><div class="cg-name">${c.name}</div><div class="cg-desc">${c.desc}</div><div class="pc-grid"><div class="pc-box"><div class="pc-lbl pro">Voordelen</div>${c.pros.map(p=>`<div class="pc-li">✓ ${p}</div>`).join('')}</div><div class="pc-box"><div class="pc-lbl con">Aandachtspunten</div>${c.cons.map(p=>`<div class="pc-li">△ ${p}</div>`).join('')}</div></div></div>`).join('')}</div><div style="background:var(--teal-light);border-radius:8px;padding:10px 12px;margin-top:12px;font-size:11.5px;color:var(--mid);"><strong>Let op:</strong> Dit zijn globale concepten ter oriëntatie. Laat altijd een gedetailleerde haalbaarheidsanalyse uitvoeren.</div>`;}},80);
}

(function(){
var _open=false,_init=false;
var _faq=[
  {keys:['beng','indicator','energieprestatie'],ans:'<strong>BENG</strong> staat voor Bijna Energie Neutraal Gebouw. Drie indicatoren:<br>• <strong>BENG 1</strong>: Energiebehoefte (kWh/m²/jr)<br>• <strong>BENG 2</strong>: Primair fossiel energiegebruik<br>• <strong>BENG 3</strong>: Aandeel hernieuwbare energie<br><br>Wilt u de Checker openen?',chips:['⟁ BENG Checker']},
  {keys:['paris proof','klimaat','co2','co₂'],ans:'Paris Proof betekent dat een gebouw richting 2050 klimaatneutraal opereert. Voor kantoren: <strong>55 kWh/m²/jr</strong> in 2030. VIAC begeleidt hier volledige trajecten in.',chips:['📝 Rapport Schrijver','⟁ BENG Checker']},
  {keys:['wkb','kwaliteitsborg','wet kwalit'],ans:'De <strong>WKB</strong> (Wet Kwaliteitsborging voor het Bouwen) vereist onafhankelijke kwaliteitsborging per project. Dit verhoogt de documentatieverplichtingen aanzienlijk. De Rapport Schrijver kan WKB-conforme dossiers automatisch opstellen.',chips:['📝 Rapport Schrijver']},
  {keys:['warmtepomp','cop','wp'],ans:'Een warmtepomp-COP van 4,0+ is doorgaans voldoende voor BENG 2. In de BENG Checker kunt u de COP direct invoeren en het effect berekenen.',chips:['⟁ BENG Checker']},
  {keys:['rapport','rapportage','document'],ans:'Met de <strong>Rapport Schrijver</strong> stelt u BENG-rapportages, installatieadviezen en Paris Proof analyses op — automatisch gebaseerd op VIAC-templates en actuele NEN-normen.',chips:['📝 Rapport Schrijver']},
  {keys:['excel','berekening','sheet'],ans:'Upload een warmteverlies- of installatiesheet in de <strong>Excel Assistent</strong>. Het platform vult ontbrekende waarden in via NEN-standaarden en berekent het totaal.',chips:['⊞ Excel Assistent']},
  {keys:['norm','nen','bbl','update','regelgev'],ans:'De <strong>Norm Monitor</strong> houdt alle wijzigingen in Bbl, NEN en Paris Proof automatisch bij — direct relevant voor uw lopende projecten.',chips:['⚖ Norm Monitor']},
  {keys:['kennis','archief','zoek','project'],ans:'De <strong>Kennisbank</strong> maakt uw projectarchief doorzoekbaar op gebouwtype, techniek en locatie. Vind het meest relevante referentieproject direct.',chips:['◎ Kennisbank']},
  {keys:['meer','vraag','help','wat kan'],ans:'U kunt mij vragen naar:',chips:['📊 Dashboard','📝 Rapport Schrijver','⊞ Excel Assistent','⟁ BENG Checker','⚖ Norm Monitor','◎ Kennisbank','🔎 BENG uitleg','📋 WKB uitleg','🌍 Paris Proof']}
];
function toggleChat(){
  _open=!_open;
  document.getElementById('chatWin').classList.toggle('open',_open);
  if(_open&&!_init){_init=true;setTimeout(function(){_botMsg('Goedemiddag! Ik ben de assistent van <strong>VIAC</strong>. Waarmee kan ik u helpen?');_chips(['🗂 Naar een app','📝 Rapport schrijven','⟁ BENG uitleg','📋 Norm updates','❓ Meer vragen']);},350);}
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
