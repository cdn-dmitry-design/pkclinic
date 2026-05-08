(function () {
  "use strict";

  try {
    if (window.__PKCW_WIDGET__) return;
    window.__PKCW_WIDGET__ = { version: "1.2.4-fixed-layout" };

    var CONFIG = {
      id: "pkcw",
      title: "Записаться в Посольство",
      appearAfterScrollPx: 220,
      bottomPx: 30,
      rightPx: 30,
      zIndex: 2147483000,
      theme: {
        panelBg: "#3b3d6b",
        text: "#ffffff",
        chipBg: "#ffffff",
        chipText: "#1f2340",
        shadow: "0 14px 34px rgba(0,0,0,.18)",
        ring: "rgba(255,255,255,.35)"
      },
      primaryActions: [
        { id: "signup", label: "Записаться", icon: "signupDoc", href: "#form-vizit", target: "_self" },
        { id: "online", label: "Онлайн-запись", icon: "calendar", href: "#form-zapis", target: "_self", marquee: true },
        { id: "call", label: "Телефон", icon: "phone", href: "tel:+74232600000", target: "_self" }
      ],
      moreActions: [
        { id: "max", label: "Макс", icon: "max", href: "https://max.ru/u/f9LHodD0cOJlwy2TNgRb5Pu6Hhgop2C7ENynPaT9Y_MMHiZmQvKvsgTXih0", target: "_blank" },
        { id: "whatsapp", label: "Вотсап", icon: "whatsapp", href: "https://api.whatsapp.com/send?phone=79147181865", target: "_blank" },
        { id: "telegram", label: "Телеграм", icon: "telegram", href: "https://t.me/pololstvo_krasoty", target: "_blank" }
      ],
      track: function () {}
    };

    function el(tag, attrs) {
      var n = document.createElement(tag);
      if (!attrs) return n;
      for (var k in attrs) {
        if (!Object.prototype.hasOwnProperty.call(attrs, k)) continue;
        if (k === "class") n.className = attrs[k];
        else if (k === "text") n.textContent = attrs[k];
        else if (k === "html") n.innerHTML = attrs[k];
        else n.setAttribute(k, attrs[k]);
      }
      return n;
    }

    function on(node, evt, fn, opts) {
      if (node) node.addEventListener(evt, fn, opts || false);
    }

    function safeUrl(href) {
      var s = String(href || "").trim();
      if (!s) return "#";
      if (s[0] === "#") return s;
      if (s.indexOf("/") === 0) return s;
      if (/^https?:\/\//i.test(s)) return s;
      if (/^tel:/i.test(s)) return s;
      if (/^mailto:/i.test(s)) return s;
      return "#";
    }

    function isMobile480() {
      try {
        return window.matchMedia && window.matchMedia("(max-width: 480px)").matches;
      } catch (_) {
        return false;
      }
    }

    function iconSvg(name) {
      if (name === "calendar") return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M7.75 4C7.75 3.58579 7.41421 3.25 7 3.25C6.58579 3.25 6.25 3.58579 6.25 4V5.81643C4.75693 6.02751 3.57738 7.20845 3.3777 8.71484L3.29115 9.36779C3.27647 9.47849 3.26244 9.58926 3.24905 9.70008C3.21354 9.99405 3.44514 10.25 3.74125 10.25H20.2587C20.5548 10.25 20.7864 9.99405 20.7509 9.70008C20.7375 9.58926 20.7235 9.47849 20.7088 9.36779L20.6222 8.71484C20.4226 7.20847 19.243 6.02754 17.75 5.81644V4C17.75 3.58579 17.4142 3.25 17 3.25C16.5858 3.25 16.25 3.58579 16.25 4V5.66763C13.4223 5.4158 10.5777 5.4158 7.75 5.66763V4Z" fill="currentColor"></path><path d="M20.9446 12.2256C20.9358 11.9591 20.7156 11.75 20.4491 11.75H3.55087C3.28429 11.75 3.06413 11.9591 3.05537 12.2256C2.99598 14.0332 3.10578 15.8446 3.38451 17.6359C3.59552 18.9919 4.69718 20.0335 6.06292 20.1681L7.25593 20.2858C10.411 20.5969 13.589 20.5969 16.744 20.2858L17.937 20.1681C19.3028 20.0335 20.4044 18.9919 20.6154 17.6359C20.8942 15.8446 21.004 14.0332 20.9446 12.2256Z" fill="currentColor"></path></svg>';
      if (name === "signupDoc") return '<svg viewBox="0 0 492.493 492" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M304.14 82.473 33.165 353.469a10.799 10.799 0 0 0-2.816 4.949L.313 478.973a10.716 10.716 0 0 0 2.816 10.136 10.675 10.675 0 0 0 7.527 3.114 10.6 10.6 0 0 0 2.582-.32l120.555-30.04a10.655 10.655 0 0 0 4.95-2.812l271-270.977zM476.875 45.523 446.711 15.36c-20.16-20.16-55.297-20.14-75.434 0l-36.949 36.95 105.598 105.597 36.949-36.949c10.07-10.066 15.617-23.465 15.617-37.715s-5.547-27.648-15.617-37.719zm0 0" fill="currentColor"></path></svg>';
      if (name === "max") return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.2149 21.9429C10.2521 21.9429 9.34 21.6552 7.75452 20.504C6.75166 21.799 3.57593 22.8111 3.43744 21.0796C3.43744 19.7798 3.1509 18.6815 2.82617 17.4824C2.43935 16.0051 2 14.36 2 11.9763C2 6.28308 6.65137 2 12.1623 2C17.6781 2 21.9999 6.49411 21.9999 12.029C22.0088 14.6461 20.9835 17.1599 19.149 19.0186C17.3145 20.8772 14.8207 21.929 12.2149 21.9429ZM12.2961 6.92098C9.6122 6.78189 7.52052 8.64764 7.05729 11.5734C6.67525 13.9955 7.35338 16.9452 7.93122 17.0987C8.2082 17.1658 8.90542 16.5999 9.34 16.1634C10.0586 16.662 10.8954 16.9614 11.766 17.0315C13.1028 17.0961 14.4114 16.6314 15.4107 15.7372C16.41 14.843 17.02 13.5908 17.1098 12.2496C17.162 10.9057 16.6869 9.59493 15.7867 8.59928C14.8864 7.60362 13.633 7.00268 12.2961 6.92578V6.92098Z" fill="currentColor"></path></svg>';
      if (name === "phone") return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M5.00017 9.86053C6.91657 14.0344 10.3266 17.3529 14.5661 19.1519L15.2457 19.4547C16.8005 20.1475 18.6283 19.6212 19.5766 18.2077L20.4647 16.884C20.7534 16.4536 20.6655 15.8739 20.2622 15.5485L17.2503 13.1187C16.8079 12.7618 16.1574 12.845 15.819 13.3016L14.8873 14.5589C12.4965 13.3795 10.5554 11.4385 9.37607 9.04768L10.6333 8.11596C11.09 7.77754 11.1731 7.12702 10.8162 6.68464L8.38635 3.6727C8.061 3.26942 7.4815 3.18145 7.05113 3.47002L5.71829 4.36372C4.29595 5.31742 3.77257 7.16027 4.4813 8.71922L4.99939 9.85884L5.00017 9.86053Z" fill="currentColor"></path></svg>';
      if (name === "whatsapp") return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M12.0421 2.5C14.5763 2.50004 16.9475 3.48215 18.7335 5.25977C20.5187 7.03682 21.5001 9.40022 21.5001 11.916C21.5001 17.1027 17.2543 21.3271 12.0421 21.3271H12.0372C10.4537 21.3271 8.89821 20.9299 7.51672 20.1816C7.43319 20.1364 7.33876 20.1159 7.24524 20.1221L7.15149 20.1377L2.71204 21.2969L3.89661 16.9971C3.93212 16.868 3.91475 16.7301 3.84778 16.6143C3.01947 15.1841 2.58351 13.5616 2.58411 11.9111C2.58423 6.72444 6.83005 2.5 12.0421 2.5ZM8.39172 6.66504C8.10419 6.66504 7.68459 6.7699 7.33704 7.14453C7.32491 7.1576 7.31145 7.17304 7.29407 7.19141C6.99995 7.50224 6.30286 8.24166 6.30286 9.62695C6.30288 10.3609 6.56642 11.0548 6.82629 11.5684C7.08959 12.0887 7.37223 12.4665 7.45129 12.5723L7.45618 12.5801C7.45802 12.5827 7.46118 12.5863 7.46497 12.5918C7.47267 12.603 7.4823 12.6176 7.49524 12.6367C7.81541 13.1099 9.49139 15.6045 12.0763 16.6211C13.0758 17.0145 13.7425 17.2044 14.2296 17.2861C14.735 17.3709 15.0357 17.3366 15.2755 17.3076C15.322 17.302 15.3598 17.2965 15.3966 17.293L15.3976 17.2939C15.7503 17.261 16.2111 17.0578 16.589 16.8145C16.9603 16.5753 17.3957 16.2055 17.5626 15.7451L17.5636 15.7412C17.6842 15.4005 17.7465 15.0808 17.7687 14.8223C17.7797 14.6935 17.7819 14.5718 17.7736 14.4658C17.7689 14.4063 17.7583 14.3047 17.7198 14.2012L17.671 14.0986L17.5997 13.999C17.5236 13.9094 17.437 13.8495 17.3732 13.8105C17.2876 13.7583 17.1861 13.711 17.1046 13.6719C17.0603 13.6506 17.0159 13.6289 16.9689 13.6055C16.8378 13.5403 16.4552 13.3518 16.0753 13.1689C15.7098 12.993 15.3065 12.8026 15.1603 12.748C15.0524 12.7078 14.8416 12.6272 14.6115 12.6543C14.3302 12.6875 14.13 12.8564 13.9923 13.0635C13.8529 13.2695 13.4478 13.7446 13.2579 13.9658C13.2568 13.9653 13.2552 13.9654 13.254 13.9648C13.1973 13.9366 13.1256 13.9059 13.0607 13.8779C12.7157 13.7291 12.056 13.4446 11.2911 12.7637L11.2902 12.7627C10.6429 12.189 10.1804 11.4801 10.0001 11.1807C10.0905 11.0891 10.189 10.9726 10.2657 10.8799C10.3149 10.8204 10.3589 10.7665 10.4005 10.7188C10.5611 10.5343 10.6337 10.3817 10.7032 10.2373C10.7123 10.2185 10.7213 10.1997 10.7306 10.1807C10.9105 9.81171 10.8083 9.48842 10.7081 9.28906C10.7072 9.28708 10.7001 9.27228 10.6847 9.23633C10.6691 9.20011 10.6492 9.15168 10.6251 9.09375C10.577 8.97805 10.5149 8.82785 10.4464 8.66113C10.2724 8.23743 10.0532 7.70264 9.92102 7.4082V7.40723L9.82336 7.21777C9.71796 7.03904 9.58771 6.89586 9.422 6.7998C9.20481 6.67405 8.99188 6.67227 8.90149 6.66992H8.90247C8.7443 6.6647 8.56247 6.66504 8.39172 6.66504Z" fill="currentColor" stroke="currentColor" stroke-linejoin="round"></path></svg>';
      if (name === "telegram") return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.4831 19.79L18.4838 19.7883L18.5012 19.7448L21.5 4.62568V4.57657C21.5 4.19987 21.3608 3.87101 21.0579 3.67375C20.7928 3.50109 20.4881 3.48879 20.2744 3.50501C20.0483 3.52217 19.8352 3.57858 19.6877 3.62554C19.6118 3.6497 19.5483 3.67298 19.5028 3.69059C19.48 3.69943 19.4615 3.70692 19.4481 3.71251L19.4349 3.71807L2.71508 10.277L2.71048 10.2787C2.70145 10.2819 2.68951 10.2864 2.67508 10.292C2.64633 10.3032 2.60719 10.3192 2.56121 10.3401C2.47093 10.381 2.34619 10.4441 2.21969 10.5307C2.00484 10.6779 1.59572 11.0262 1.6648 11.5784C1.72202 12.0358 2.03733 12.3263 2.2499 12.4767C2.36384 12.5574 2.47286 12.6155 2.55269 12.6535C2.59313 12.6728 2.62749 12.6875 2.65308 12.6979C2.66591 12.7032 2.67663 12.7073 2.68493 12.7105L2.69556 12.7144L2.70235 12.717L5.62759 13.7018C5.61772 13.8853 5.63592 14.0724 5.68459 14.2571L7.14988 19.8155C7.32361 20.4745 7.91984 20.9336 8.60141 20.9331C9.21234 20.9327 9.75417 20.5631 9.98435 20.0117L12.272 17.5656L16.201 20.5778L16.2569 20.6022C16.6138 20.758 16.9474 20.8073 17.2523 20.7657C17.5568 20.7241 17.7987 20.5964 17.9805 20.451C18.1594 20.3079 18.2819 20.1464 18.359 20.0248C18.3982 19.963 18.4274 19.9087 18.4476 19.8679C18.4578 19.8473 18.4658 19.83 18.4718 19.8164L18.4794 19.799L18.4821 19.7926L18.4831 19.79ZM7.13499 13.8747C7.10169 13.7484 7.15397 13.615 7.26426 13.545L17.1863 7.24407C17.1863 7.24407 17.7699 6.88978 17.749 7.24407C17.749 7.24407 17.8532 7.30664 17.5404 7.59837C17.2438 7.87544 10.4688 14.4165 9.78322 15.0784C9.74365 15.1166 9.72003 15.1604 9.70608 15.2136L8.60028 19.4331L7.13499 13.8747Z" fill="currentColor"></path></svg>';
      return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M7 12h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    }

    if (!document.getElementById("pkcw-style")) {
      var css = ""
        + ".pkcw-root{--pkcw-btn:50px;position:fixed;right:" + CONFIG.rightPx + "px;bottom:" + CONFIG.bottomPx + "px;z-index:" + CONFIG.zIndex + ";pointer-events:none;font-family:Montserrat,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif}"
        + ".pkcw-root[data-visible='0']{opacity:0;visibility:hidden;transform:translateY(10px)}"
        + ".pkcw-root[data-visible='1']{opacity:1;visibility:visible;transform:translateY(0)}"
        + ".pkcw-root{transition:opacity .22s ease,visibility .22s ease,transform .22s ease;will-change:opacity,transform}"
        + ".pkcw-btn{pointer-events:auto;display:inline-flex;align-items:center;justify-content:center;width:var(--pkcw-btn);height:var(--pkcw-btn);min-width:var(--pkcw-btn);min-height:var(--pkcw-btn);aspect-ratio:1/1;border-radius:999px;border:0;padding:0;cursor:pointer;background:" + CONFIG.theme.panelBg + ";box-shadow:" + CONFIG.theme.shadow + ";color:" + CONFIG.theme.text + ";position:relative;z-index:1;overflow:hidden;transition:opacity .18s ease,visibility .18s ease,transform .18s ease;animation:pkcw-trigger-pulse 2.8s ease-in-out infinite}"
        + ".pkcw-btn::after{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:linear-gradient(120deg,rgba(255,255,255,0) 34%,rgba(255,255,255,.35) 50%,rgba(255,255,255,0) 66%);transform:translateX(-140%);animation:pkcw-trigger-shine 3.6s ease-in-out infinite}"
        + ".pkcw-btnIcon{display:block;line-height:0;width:22px;height:22px}"
        + ".pkcw-btnIcon>svg{width:100%;height:100%;display:block}"
        + ".pkcw-btnIcon .pkcw-triggerCalendar{transform-origin:50% 52%;animation:pkcw-calendar-wiggle 2.2s ease-in-out infinite}"
        + ".pkcw-root[data-open='1'] .pkcw-btn{opacity:0;visibility:hidden;transform:scale(.96);pointer-events:none}"
        + ".pkcw-panel{pointer-events:auto;position:absolute;right:0;bottom:0;z-index:2;transform:translateY(10px);opacity:0;visibility:hidden;transition:opacity .34s cubic-bezier(.16,1,.3,1),transform .34s cubic-bezier(.16,1,.3,1),visibility .34s;will-change:opacity,transform}"
        + ".pkcw-root[data-open='1'] .pkcw-panel{opacity:1;visibility:visible;transform:translateY(0)}"
        + ".pkcw-card{width:min(272px,calc(100vw - 18px));background:" + CONFIG.theme.panelBg + ";border-radius:22px;box-shadow:" + CONFIG.theme.shadow + ";padding:12px 10px 54px 10px;color:" + CONFIG.theme.text + ";overscroll-behavior:contain;touch-action:manipulation;overflow:hidden;position:relative}"
        + ".pkcw-header{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:18px;padding:0}"
        + ".pkcw-title{font-weight:500;font-size:14px;letter-spacing:.1px;margin:0;padding-top:5px;padding-left:5px}"
        + ".pkcw-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;align-items:start}"
        + ".pkcw-action{display:flex;flex-direction:column;align-items:center;gap:7px;text-decoration:none;color:" + CONFIG.theme.text + ";min-height:auto}"
        + ".pkcw-icon{width:42px;height:42px;border-radius:999px;background:" + CONFIG.theme.chipBg + ";display:flex;align-items:center;justify-content:center;color:" + CONFIG.theme.chipText + ";box-shadow:inset 0 0 0 1px rgba(0,0,0,.02)}"
        + ".pkcw-icon svg{width:20px;height:20px;display:block}"
        + ".pkcw-action[data-action-id='signup'] .pkcw-icon svg{width:15px!important;height:15px!important;transform:translate(.5px,-.5px)!important}"
        + ".pkcw-label{font-size:12px;opacity:.95;text-align:center;line-height:1.25;max-width:88px;font-weight:400}"
        + ".pkcw-labelWrap{max-width:88px;overflow:hidden;white-space:nowrap;text-align:center;font-size:12px;opacity:.95;line-height:1.25;font-weight:400;box-sizing:border-box}"
        + ".pkcw-labelWrap--marquee{max-width:83px;transform:translateX(5px);text-align:left}"
        + ".pkcw-labelMarquee{display:inline-flex;white-space:nowrap;will-change:transform;transform:translate3d(0,0,0);backface-visibility:hidden;animation:pkcw-marquee-rtl var(--pkcw-marquee-duration,3.2s) linear infinite}"
        + ".pkcw-labelText{white-space:nowrap;padding-right:22px}"
        + ".pkcw-footer{position:absolute;left:15px;right:12px;bottom:10px;display:flex;align-items:center;justify-content:flex-end;gap:10px;margin:0;height:32px}"
        + ".pkcw-close{width:32px;height:32px;min-width:32px;min-height:32px;padding:0;border-radius:999px;border:0;background:rgba(255,255,255,.14);color:" + CONFIG.theme.text + ";cursor:pointer;display:flex;align-items:center;justify-content:center;box-sizing:border-box;line-height:0}"
        + ".pkcw-close svg{width:12px;height:12px;display:block}"
        + ".pkcw-close svg path{stroke-width:1.6}"
        + "@keyframes pkcw-marquee-rtl{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(-50%,0,0)}}"
        + "@keyframes pkcw-trigger-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}"
        + "@keyframes pkcw-trigger-shine{0%,70%,100%{transform:translateX(-140%)}78%{transform:translateX(140%)}}"
        + "@keyframes pkcw-calendar-wiggle{0%,100%{transform:translateY(0) rotate(0deg)}10%{transform:translateY(-1px) rotate(-6deg)}20%{transform:translateY(-1px) rotate(5deg)}30%{transform:translateY(0) rotate(-3deg)}40%{transform:translateY(0) rotate(2deg)}50%,90%{transform:translateY(0) rotate(0deg)}}"
        + "@media (prefers-reduced-motion: reduce){.pkcw-btn,.pkcw-btn::after,.pkcw-btnIcon .pkcw-triggerCalendar,.pkcw-labelMarquee{animation:none}}"
        + "@media (max-width:480px){"
          + ".pkcw-root{right:28px;bottom:28px;width:var(--pkcw-btn)}"
          + ".pkcw-panel{left:50%;right:auto;bottom:calc(var(--pkcw-btn) + 12px);transform:translate(-50%,10px)}"
          + ".pkcw-root[data-open='1'] .pkcw-panel{transform:translate(-50%,0)}"
          + ".pkcw-root[data-open='1'] .pkcw-btn{opacity:1;visibility:visible;transform:none;pointer-events:auto}"
          + ".pkcw-btnIcon{width:22px;height:22px}"
          + ".pkcw-btn.pkcw-btn--cross .pkcw-btnIcon{width:18px;height:18px}"
          + ".pkcw-card{width:min(88px,calc(100vw - 18px));padding:16px 0;border-radius:999px;display:block;overflow:hidden;box-shadow:" + CONFIG.theme.shadow + "}"
          + ".pkcw-header{display:none}"
          + ".pkcw-grid{display:flex;flex-direction:column-reverse;gap:18px;align-items:center}"
          + ".pkcw-action{flex-direction:column;justify-content:flex-start;align-items:center;gap:5px;min-height:auto}"
          + ".pkcw-action[data-action-id='telegram']{margin-top:10px}"
          + ".pkcw-action[data-action-id='signup']{margin-bottom:18px}"
          + ".pkcw-icon{width:34px;height:34px}"
          + ".pkcw-icon svg{width:17px;height:17px}"
          + ".pkcw-label{display:block;max-width:70px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center;font-size:10px;line-height:1.1;opacity:.95}"
          + ".pkcw-labelWrap{display:block;max-width:70px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;text-align:center;font-size:10px;line-height:1.1;opacity:.95}"
          + ".pkcw-labelWrap--marquee{max-width:70px;transform:none;text-align:left}"
          + ".pkcw-labelMarquee{display:inline-flex;white-space:nowrap;animation:pkcw-marquee-rtl var(--pkcw-marquee-duration,3.2s) linear infinite}"
          + ".pkcw-labelMarquee .pkcw-labelText:last-child{display:inline}"
          + ".pkcw-labelText{padding-right:22px}"
          + ".pkcw-action[data-action-id='signup'] .pkcw-icon svg{width:12px!important;height:12px!important;transform:translate(.5px,-.5px)!important}"
          + ".pkcw-footer{display:none}"
        + "}"
        + "@media (min-width:481px){.pkcw-root{--pkcw-btn:62px}.pkcw-btnIcon{width:28px;height:28px}}"
        + "@media (max-width:360px){.pkcw-root{--pkcw-btn:40px}.pkcw-card{padding:8px 0}.pkcw-icon{width:40px;height:40px}.pkcw-icon svg{width:19px;height:19px}.pkcw-btnIcon{width:20px;height:20px}}"
        + "@media (min-width:1920px){.pkcw-root{--pkcw-btn:54px}.pkcw-card{width:300px;padding:14px 14px 64px 14px}.pkcw-title{font-size:15px}.pkcw-icon{width:46px;height:46px}.pkcw-icon svg{width:22px;height:22px}.pkcw-label{font-size:13px;max-width:98px}.pkcw-labelWrap{max-width:98px}.pkcw-btnIcon{width:23px;height:23px}.pkcw-close{width:34px;height:34px;min-width:34px;min-height:34px}.pkcw-close svg{width:12px;height:12px}.pkcw-footer{left:19px}}"
        + "@media (min-width:2560px){.pkcw-root{--pkcw-btn:58px}.pkcw-card{width:320px}.pkcw-title{font-size:16px}.pkcw-icon{width:50px;height:50px}.pkcw-icon svg{width:24px;height:24px}.pkcw-label{font-size:14px;max-width:110px}.pkcw-labelWrap{max-width:110px}.pkcw-btnIcon{width:25px;height:25px}.pkcw-close{width:36px;height:36px;min-width:36px;min-height:36px}.pkcw-close svg{width:13px;height:13px}.pkcw-footer{left:19px}}";

      document.head.appendChild(el("style", { id: "pkcw-style", text: css }));
    }

    var root = el("div", {
      class: "pkcw-root",
      id: "pkcw-root",
      "data-visible": "0",
      "data-open": "0"
    });

    var openBtn = el("button", {
      class: "pkcw-btn",
      type: "button",
      "aria-label": "Открыть виджет"
    });

    var openBtnIcon = el("span", {
      class: "pkcw-btnIcon",
      "aria-hidden": "true"
    });

    openBtnIcon.innerHTML = iconSvg("calendar");

    var openBtnCalendar = openBtnIcon.querySelector("svg");
    if (openBtnCalendar) openBtnCalendar.classList.add("pkcw-triggerCalendar");

    openBtn.appendChild(openBtnIcon);

    var openBtnDesktopHtml = openBtnIcon.innerHTML;
    var openBtnCrossHtml =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17" fill="none" aria-hidden="true">' +
      '<path d="M0.5 0.5L16.5 16.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.6"></path>' +
      '<path d="M0.5 16.5L16.5 0.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.6"></path>' +
      '</svg>';

    var panel = el("div", {
      class: "pkcw-panel",
      role: "dialog",
      "aria-modal": "false"
    });

    var card = el("div", { class: "pkcw-card" });

    var header = el("div", { class: "pkcw-header" });
    header.appendChild(el("div", { class: "pkcw-title", text: CONFIG.title }));

    var grid = el("div", { class: "pkcw-grid" });

    function makeAction(a) {
      var node = el("a", {
        class: "pkcw-action",
        href: safeUrl(a.href),
        target: a.target || "_self",
        rel: a.target === "_blank" ? "noopener noreferrer" : ""
      });

      node.setAttribute("data-action-id", a.id || "");

      node.appendChild(el("div", {
        class: "pkcw-icon",
        html: iconSvg(a.icon)
      }));

      if (a.marquee) {
        var lw = el("div", { class: "pkcw-labelWrap pkcw-labelWrap--marquee" });
        var track = el("span", { class: "pkcw-labelMarquee", "aria-hidden": "true" });
        var lbl = a.label || "";
        var ratio = Math.max(1, lbl.length / 12);

        track.style.setProperty("--pkcw-marquee-duration", (3.2 * ratio).toFixed(2) + "s");
        track.appendChild(el("span", { class: "pkcw-labelText", text: lbl + "   " }));
        track.appendChild(el("span", { class: "pkcw-labelText", text: lbl + "   " }));

        lw.appendChild(track);
        node.appendChild(lw);
      } else {
        node.appendChild(el("div", {
          class: "pkcw-label",
          text: a.label || ""
        }));
      }

      on(node, "click", function () {
        closePanel();
      });

      return node;
    }

    for (var i = 0; i < CONFIG.primaryActions.length; i++) {
      grid.appendChild(makeAction(CONFIG.primaryActions[i]));
    }

    for (var j = 0; j < CONFIG.moreActions.length; j++) {
      grid.appendChild(makeAction(CONFIG.moreActions[j]));
    }

    var footer = el("div", { class: "pkcw-footer" });
    var closeBtn = el("button", {
      class: "pkcw-close",
      type: "button",
      "aria-label": "Закрыть"
    });

    closeBtn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17" fill="none" aria-hidden="true">' +
      '<path d="M0.5 0.5L16.5 16.5" stroke="currentColor" stroke-linecap="round"></path>' +
      '<path d="M0.5 16.5L16.5 0.5" stroke="currentColor" stroke-linecap="round"></path>' +
      '</svg>';

    footer.appendChild(closeBtn);

    card.appendChild(header);
    card.appendChild(grid);
    card.appendChild(footer);
    panel.appendChild(card);
    root.appendChild(panel);
    root.appendChild(openBtn);

    function mount() {
      if (!document.body) return false;
      if (document.getElementById(root.id)) return true;
      document.body.appendChild(root);
      return true;
    }

    function setVisible(v) {
      root.setAttribute("data-visible", v ? "1" : "0");
    }

    function applyMobileCopyTweaks() {
      var mobile = isMobile480();
      var opened = root.getAttribute("data-open") === "1";
      var html = mobile && opened ? openBtnCrossHtml : openBtnDesktopHtml;

      if (mobile && opened) openBtn.classList.add("pkcw-btn--cross");
      else openBtn.classList.remove("pkcw-btn--cross");

      if (openBtnIcon.innerHTML !== html) openBtnIcon.innerHTML = html;
    }

    function openPanel() {
      root.setAttribute("data-open", "1");
      applyMobileCopyTweaks();
    }

    function closePanel() {
      root.setAttribute("data-open", "0");
      applyMobileCopyTweaks();
      updateVisibility();
    }

    on(openBtn, "click", function (e) {
      e.preventDefault();
      if (root.getAttribute("data-open") === "1") closePanel();
      else openPanel();
    });

    on(closeBtn, "click", function (e) {
      e.preventDefault();
      closePanel();
    });

    on(document, "click", function (e) {
      if (root.getAttribute("data-open") !== "1") return;
      if (root.contains(e.target)) return;
      closePanel();
    }, true);

    on(document, "keydown", function (e) {
      if (e.key === "Escape" && root.getAttribute("data-open") === "1") {
        closePanel();
      }
    });

    var ticking = false;

    function updateVisibility() {
      ticking = false;

      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      var threshold = CONFIG.appearAfterScrollPx || 0;

      if (root.getAttribute("data-open") === "1" && y < threshold) {
        root.setAttribute("data-open", "0");
      }

      setVisible(y >= threshold);
      applyMobileCopyTweaks();
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateVisibility);
    }

    function init() {
      if (!mount()) return;

      setVisible(false);
      root.setAttribute("data-open", "0");

      updateVisibility();

      on(window, "scroll", onScroll, { passive: true });
      on(window, "resize", onScroll);
    }

    if (document.readyState === "loading") {
      on(document, "DOMContentLoaded", init);
    } else {
      init();
    }

  } catch (e) {
    try {
      console.error("[PKCW] init failed:", e);
    } catch (_) {}
  }
})();
