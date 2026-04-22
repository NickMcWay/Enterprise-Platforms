(function(){
  var open=false,inited=false;
  var faq=[{"keys": ["beng", "indicator"], "ans": "<strong>BENG</strong>: Bijna Energie Neutraal Gebouw.<br>&#8226; BENG 1: Energiebehoefte<br>&#8226; BENG 2: Primair fossiel energiegebruik<br>&#8226; BENG 3: Hernieuwbare energie", "chips": ["BENG Checker"]}, {"keys": ["dumava", "subsidie"], "ans": "<strong>DUMAVA</strong> is de subsidieregeling voor verduurzaming van utiliteitsgebouwen. De Rapport Schrijver stelt automatisch een DUMAVA-subsidieadvies op.", "chips": ["Rapport Schrijver"]}, {"keys": ["energielabel", "label", "nta 8800"], "ans": "De <strong>Excel Assistent</strong> berekent op basis van NTA 8800 het huidige energielabel en de prognose na verduurzamingsmaatregelen.", "chips": ["Excel Assistent", "Rapport Schrijver"]}, {"keys": ["paris proof", "klimaatneutraal", "co2"], "ans": "Paris Proof houdt in dat een gebouw richting 2050 klimaatneutraal opereert. DVTadvies stelt CO2-routekaarten op.", "chips": ["Rapport Schrijver"]}, {"keys": ["rapport", "rapportage"], "ans": "De <strong>Rapport Schrijver</strong> stelt energielabelrapporten, DUMAVA-subsidieadviezen en CO2-routekaarten op.", "chips": ["Rapport Schrijver"]}, {"keys": ["excel", "berekening"], "ans": "De <strong>Excel Assistent</strong> vult ontbrekende EP-waarden in via NTA 8800 en berekent het huidige energielabel.", "chips": ["Excel Assistent"]}, {"keys": ["norm", "nen", "bbl", "dumava"], "ans": "De <strong>Norm Monitor</strong> houdt wijzigingen in DUMAVA-regels, energielabelverplichtingen en Paris Proof bij.", "chips": ["Norm Monitor"]}, {"keys": ["kennis", "archief", "zoek"], "ans": "De <strong>Kennisbank</strong> maakt uw projectarchief doorzoekbaar op gebouwtype, bouwjaar en label.", "chips": ["Kennisbank"]}];
  var welcome="Goedemiddag! Ik ben de assistent van DVTadvies. Waarmee kan ik u helpen?";
  var navMap={"Dashboard":"dashboard","Rapport Schrijver":"rapport","Excel Assistent":"excel","BENG Checker":"beng","Norm Monitor":"normen","Kennisbank":"kennis"};
  function toggle(){
    open=!open;
    document.getElementById("chatWin").classList.toggle("cw-open",open);
    if(open&&!inited){inited=true;setTimeout(function(){botMsg(welcome);setChips(["Welke apps zijn er?","Rapport schrijven","BENG uitleg","Norm updates","WKB uitleg","Meer vragen"]);},350);}
    if(open) document.getElementById("chatInp").focus();
  }
  document.getElementById("chatToggleBtn").addEventListener("click",toggle);
  document.getElementById("chatCloseBtn").addEventListener("click",toggle);
  function botMsg(html){
    var m=document.getElementById("chatMsgs");
    var el=document.createElement("div");
    el.className="cmsg-typing";
    el.innerHTML="<span class=\"cdot\"></span><span class=\"cdot\"></span><span class=\"cdot\"></span>";
    m.appendChild(el);m.scrollTop=m.scrollHeight;
    setTimeout(function(){el.className="cmsg cmsg-bot";el.innerHTML=html;m.scrollTop=m.scrollHeight;},650);
  }
  function userMsg(txt){
    var m=document.getElementById("chatMsgs");
    var el=document.createElement("div");
    el.className="cmsg cmsg-user";el.textContent=txt;
    m.appendChild(el);m.scrollTop=m.scrollHeight;
  }
  function setChips(arr){
    var el=document.getElementById("chatChips");
    el.innerHTML="";
    arr.forEach(function(label){
      var btn=document.createElement("button");
      btn.className="cchip";btn.textContent=label;
      btn.addEventListener("click",function(){
        userMsg(label);
        document.getElementById("chatChips").innerHTML="";
        process(label);
      });
      el.appendChild(btn);
    });
  }
  function navTo(id,label){
    var nav=null;
    document.querySelectorAll(".nav-item").forEach(function(el){
      if(el.getAttribute("onclick")&&el.getAttribute("onclick").indexOf(id)!==-1) nav=el;
    });
    show(id,nav);
    setTimeout(function(){
      botMsg("U bent doorgestuurd naar <strong>"+label+"</strong>. Nog iets anders?");
      setChips(["Welke apps zijn er?","Meer vragen"]);
    },200);
  }
  function process(t){
    var l=t.toLowerCase();
    if(l.indexOf("welke")!==-1||l.indexOf("app")!==-1||l.indexOf("navigeer")!==-1){
      setTimeout(function(){botMsg("Naar welke app wilt u?");setChips(["Dashboard","Rapport Schrijver","Excel Assistent","BENG Checker","Norm Monitor","Kennisbank"]);},500);
      return;
    }
    if(navMap[t]){setTimeout(function(){navTo(navMap[t],t);},500);return;}
    for(var page in navMap){
      if(l.indexOf(page.toLowerCase())!==-1){
        (function(p){setTimeout(function(){navTo(navMap[p],p);},500);})(page);
        return;
      }
    }
    var match=null;
    for(var i=0;i<faq.length&&!match;i++){
      for(var j=0;j<faq[i].keys.length&&!match;j++){
        if(l.indexOf(faq[i].keys[j])!==-1) match=faq[i];
      }
    }
    if(match){
      (function(m){setTimeout(function(){botMsg(m.ans);if(m.chips)setChips(m.chips);},500);})(match);
    } else {
      setTimeout(function(){botMsg("Dat weet ik helaas niet direct. Kan ik u ergens naartoe sturen?");setChips(["Welke apps zijn er?","Meer vragen"]);},500);
    }
  }
  document.getElementById("chatSendBtn").addEventListener("click",function(){
    var inp=document.getElementById("chatInp"),v=inp.value.trim();
    if(!v) return;
    userMsg(v);inp.value="";
    document.getElementById("chatChips").innerHTML="";
    process(v);
  });
  document.getElementById("chatInp").addEventListener("keydown",function(e){
    if(e.key==="Enter") document.getElementById("chatSendBtn").click();
  });
})();
