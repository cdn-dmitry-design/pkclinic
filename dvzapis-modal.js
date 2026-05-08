(function(){

/* ===========================
   ТАБЫ T1281
=========================== */

(function(){
  var dvExtraTabs = [];
  var dvUseScroller = false;
  var dvGlobal = true;
  var dvWrapTabs = true;
  var dvUseBorder = true;
  var dvInactiveBg = '#FEFEFE';
  var dvInactiveText = '#363667';
  var dvInactiveBorder = '#DFE3EE';
  var dvActiveBg = '#E9E9F0';
  var dvActiveText = '#363667';
  var dvActiveBorder = '#E9E9F0';
  var dvHoverBg = '#E9E9F0';
  var dvHoverBorder = '#E9E9F0';
  var dvEqualizeRecs = [];
  var dvResizeBound = false;

  var dvExcludeRecs = {
    '1838219131': 1,
    '1838386421': 1,
    '2140567561': 1
  };

  function isExcluded(recEl){
    if(!recEl || !recEl.id) return false;
    return dvExcludeRecs[recEl.id.replace(/^rec/, '')] === 1;
  }

  function applyGlobalOverrides(recEl){
    if(!dvGlobal || !recEl) return;

    var tabs = [].slice.call(recEl.querySelectorAll('.t1281__tab'));
    if(!tabs.length) return;

    function setImp(el, prop, val){
      if(!el || val === '') return;
      el.style.setProperty(prop, val, 'important');
    }

    tabs.forEach(function(tab){
      var title = tab.querySelector('.t1281__title');
      if(!title) return;

      if(tab.classList.contains('t1281__tab_active')){
        setImp(title, 'background', dvActiveBg);
        setImp(title, 'border-color', dvActiveBorder);
        setImp(title, 'color', dvActiveText);
      } else {
        setImp(title, 'background', dvInactiveBg);
        setImp(title, 'border-color', dvInactiveBorder);
        setImp(title, 'color', dvInactiveText);
      }
    });
  }

  function equalizeTabRows(recEl){
    if(!dvWrapTabs || !recEl) return;

    var wrapper = recEl.querySelector('.t1281__wrapper');
    if(!wrapper) return;

    var tabs = [].slice.call(wrapper.querySelectorAll('.t1281__tab'));
    if(!tabs.length) return;

    var rowTops = [];
    var rowCounts = [];

    for(var i = 0; i < tabs.length; i++){
      var top = Math.round(tabs[i].getBoundingClientRect().top);
      var idx = rowTops.indexOf(top);

      if(idx === -1){
        rowTops.push(top);
        rowCounts.push(1);
      } else {
        rowCounts[idx]++;
      }
    }

    var rows = rowTops.length;
    if(rows <= 1){
      wrapper.classList.remove('dv-t1281-equal-rows');
      wrapper.style.removeProperty('--dv-tabs-cols');
      return;
    }

    var maxCount = Math.max.apply(null, rowCounts);

    wrapper.style.setProperty('--dv-tabs-cols', String(maxCount || 1));
    wrapper.classList.add('dv-t1281-equal-rows');
  }

  function getRecList(){
    return [].slice.call(document.querySelectorAll('div[id^="rec"][data-record-type="1281"]')).filter(function(el){
      return !isExcluded(el);
    });
  }

  function runForRec(recEl){
    if(!recEl || isExcluded(recEl)) return;

    applyGlobalOverrides(recEl);

    var recId = (recEl.id || '').replace(/^rec/, '');

    if(typeof t1281_init === 'function'){
      t1281_init(recId);
    }

    if(typeof t_slider__init === 'function'){
      t_slider__init(recId, 't1281');
    }

    setTimeout(function(){
      applyGlobalOverrides(recEl);
      equalizeTabRows(recEl);
    }, 60);
  }

  function run(){
    var recs = getRecList();

    for(var i = 0; i < recs.length; i++){
      runForRec(recs[i]);
    }
  }

  if(typeof t_onReady !== 'undefined'){
    t_onReady(function(){
      run();
    });
  } else {
    document.addEventListener('DOMContentLoaded', function(){
      run();
    });
  }
})();


/* ===========================
   МОДАЛЬНОЕ ОКНО ЗАПИСИ
=========================== */

(function(){

  var root=document.getElementById("dvzapis");
  if(!root) return;

  var frameBit=document.getElementById("dvzapis_frame_bit");
  var frameFit=document.getElementById("dvzapis_frame_fitnes");

  var actionBtns=root.querySelectorAll("[data-dvzapis-action]");

  function showFrame(which){
    if(frameBit) frameBit.classList.remove("is-show");
    if(frameFit) frameFit.classList.remove("is-show");

    if(which==="bit" && frameBit) frameBit.classList.add("is-show");
    if(which==="fit" && frameFit) frameFit.classList.add("is-show");
  }

  function setActive(btn){
    if(!btn){
      for(var i=0;i<actionBtns.length;i++){
        actionBtns[i].classList.remove("is-active");
        actionBtns[i].classList.remove("is-inactive");
      }

      root.classList.add("is-step-2");
      root.classList.remove("is-step-3");
      return;
    }

    for(var j=0;j<actionBtns.length;j++){
      var b=actionBtns[j];
      var isActive=(b===btn);

      b.classList.toggle("is-active", isActive);
      b.classList.toggle("is-inactive", !isActive);
    }

    root.classList.add("is-step-2");
    root.classList.remove("is-step-3");
  }

  function openModal(){
    root.classList.add("is-open");
    root.setAttribute("aria-hidden","false");

    document.documentElement.classList.add("dvzapis-lock");
    document.body.classList.add("dvzapis-lock");

    root.classList.add("is-step-2");
    root.classList.remove("is-step-3");

    setActive(null);
    showFrame(null);
  }

  function closeModal(){
    root.classList.remove("is-open");
    root.setAttribute("aria-hidden","true");

    document.documentElement.classList.remove("dvzapis-lock");
    document.body.classList.remove("dvzapis-lock");

    showFrame(null);

    root.classList.remove("is-step-2");
    root.classList.remove("is-step-3");

    setActive(null);

    if (window.location.hash === "#form-zapis") {
      var url = window.location.pathname + window.location.search;
      window.history.replaceState(null, "", url);
    }
  }

  window.openZapisModal=openModal;
  window.closeZapisModal=closeModal;

  root.addEventListener("click", function(e){
    var c=e.target.closest("[data-dvzapis-close]");
    if(!c) return;

    e.preventDefault();
    closeModal();
  });

  document.addEventListener("keydown", function(e){
    if(e.key==="Escape" && root.classList.contains("is-open")){
      closeModal();
    }
  });

  for(var i=0;i<actionBtns.length;i++){
    actionBtns[i].addEventListener("click", function(e){

      e.preventDefault();

      var btn=e.currentTarget;
      var action=btn.getAttribute("data-dvzapis-action");
      var id=btn.getAttribute("data-dvzapis-id");

      setActive(btn);

      if(action==="fitnes"){
        showFrame("fit");

        root.classList.add("is-step-3");
        root.classList.remove("is-step-2");

        return;
      }

      showFrame("bit");

      root.classList.add("is-step-3");
      root.classList.remove("is-step-2");

      if(frameBit && frameBit.contentWindow){
        try{
          frameBit.contentWindow.postMessage(
            {
              bit_umc_action:"set-clinic",
              payload:{id: Number(id)}
            },
            "https://bit-umc.krasbit.studio"
          );
        }catch(_){}
      }
    });
  }

  document.addEventListener("click", function(e){
    var t=e.target.closest("[data-open-zapis]");

    if(!t) return;

    e.preventDefault();

    openModal();

  }, false);

})();


/* ===========================
   HASH OPEN
=========================== */

(function(){

  var H="#form-zapis";

  var O=function(){
    return "function"==typeof window.openZapisModal && (window.openZapisModal(),!0);
  };

  document.addEventListener("click",function(e){

    var a=e.target.closest("a[href],[href]");
    if(!a) return;

    var h=(a.getAttribute("href")||"").trim();

    if(h===H){

      e.preventDefault();

      if(location.hash!==H){
        try{
          history.pushState(null,"",H);
        }catch(e){
          location.hash=H;
        }
      }

      O();
    }

  },!1);

  var L=function(){

    if(location.hash===H){

      var t=0;

      var i=setInterval(function(){

        t++;

        if(O()||t>40){
          clearInterval(i);
        }

      },50);
    }
  };

  if("loading"===document.readyState){
    document.addEventListener("DOMContentLoaded",L);
  }else{
    L();
  }

  window.addEventListener("hashchange",function(){
    if(location.hash===H){
      O();
    }
  });

})();

})();