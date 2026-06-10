(function () {
  "use strict";

  if (window.__PKPW_WIDGET__) return;
  window.__PKPW_WIDGET__ = { version: "1.3.2" };

  var CONFIG = {
    previewVideo:
      "https://cdnv.boomstream.com/balancer/eBkdrQO5-gSVQfNtT.mp4",
    openVideo:
      "https://cdnv.boomstream.com/balancer/eBkdrQO5-gSVQfNtT.mp4",
    fullPodcastUrl: "#video",
    ctaText: "СМОТРЕТЬ ПОДКАСТ",
    position: "left",
    bottomPx: 24,
    sidePx: 24,
    zIndex: 2147482000,
    thumbWidth: 184,
    playerWidth: 300,
    hideTildaBlock: "#rec2353068381"
  };

  function mergeConfig() {
    var node = document.getElementById("pkpw-config");
    if (!node) return;
    try {
      var data = JSON.parse(node.textContent || "{}");
      for (var key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          CONFIG[key] = data[key];
        }
      }
    } catch (_) {}
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        if (!Object.prototype.hasOwnProperty.call(attrs, k)) continue;
        if (k === "class") node.className = attrs[k];
        else if (k === "text") node.textContent = attrs[k];
        else if (k === "html") node.innerHTML = attrs[k];
        else node.setAttribute(k, attrs[k]);
      }
    }
    if (children) {
      for (var i = 0; i < children.length; i++) {
        if (children[i]) node.appendChild(children[i]);
      }
    }
    return node;
  }

  function injectStyles() {
    if (document.getElementById("pkpw-style")) return;

    var side = CONFIG.position === "right" ? "right" : "left";

    var css =
      ".pkpw-root{" +
      "--pkpw-collapsed:" +
      CONFIG.thumbWidth +
      "px;" +
      "position:fixed;" +
      side +
      ":" +
      CONFIG.sidePx +
      "px;bottom:" +
      CONFIG.bottomPx +
      "px;z-index:" +
      CONFIG.zIndex +
      ";font-family:Montserrat,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;pointer-events:none}" +
      ".pkpw-root[data-visible='0']{opacity:0;visibility:hidden;transform:translateY(10px)}" +
      ".pkpw-root[data-visible='1']{opacity:1;visibility:visible;transform:translateY(0)}" +
      ".pkpw-root{transition:opacity .25s ease,visibility .25s ease,transform .25s ease}" +
      ".pkpw-card{pointer-events:auto;position:relative;width:var(--pkpw-collapsed);aspect-ratio:9/16;border-radius:0;background:#000;box-shadow:0 10px 28px rgba(0,0,0,.22);transform-origin:" +
      (CONFIG.position === "right" ? "right bottom" : "left bottom") +
      ";overflow:visible;touch-action:manipulation;-webkit-tap-highlight-color:transparent}" +
      ".pkpw-media{position:absolute;inset:0;border-radius:0;overflow:hidden;background:#000}" +
      ".pkpw-video{display:block;width:100%;height:100%;object-fit:cover;background:#000;pointer-events:none}" +
      ".pkpw-dismiss{position:absolute;top:-7px;right:-7px;width:28px;height:28px;border:0;border-radius:999px;background:rgba(24,24,36,.94);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:6;padding:0;opacity:1;pointer-events:auto;transition:opacity .18s ease,transform .18s ease;box-shadow:0 4px 14px rgba(0,0,0,.25)}" +
      ".pkpw-dismiss svg{width:11px;height:11px;display:block}" +
      "@media (hover:hover) and (pointer:fine){.pkpw-dismiss:hover{transform:scale(1.08)}}" +
      "@media (hover:none){.pkpw-dismiss{top:4px;right:4px}}" +
      ".pkpw-tap{position:absolute;inset:0;z-index:3;border:0;padding:0;margin:0;background:transparent;cursor:pointer;-webkit-tap-highlight-color:transparent}" +
      ".pkpw-cta{position:absolute;left:0;right:0;bottom:0;z-index:4;display:flex;align-items:center;justify-content:center;padding:8px 6px;border:0;background:#3c3c6b;color:#fff;text-align:center;text-decoration:none;font-size:9px;font-weight:500;letter-spacing:.04em;text-transform:uppercase;line-height:1.2;cursor:pointer;opacity:1;visibility:visible;transform:translateY(0);transition:background .18s ease,color .18s ease;box-sizing:border-box}" +
      ".pkpw-cta:hover,.pkpw-cta:focus-visible{background:#4b4b77;color:#dfe3ee;outline:none}" +
      ".pkpw-media::after{content:'';position:absolute;left:0;right:0;bottom:0;height:42%;background:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,.55) 100%);opacity:1;transition:opacity .24s ease;pointer-events:none;z-index:2}" +
      "@media (max-width:480px){.pkpw-root{--pkpw-collapsed:124px;" +
      side +
      ":16px;bottom:16px}.pkpw-cta{font-size:8px;padding:7px 5px}}" +
      "body.t-body_popupshowed .pkpw-root{z-index:99990}" +
      (CONFIG.hideTildaBlock
        ? CONFIG.hideTildaBlock + "{display:none!important}"
        : "");

    document.head.appendChild(el("style", { id: "pkpw-style", text: css }));
  }

  function hideTildaWidget() {
    if (!CONFIG.hideTildaBlock) return;
    var block = document.querySelector(CONFIG.hideTildaBlock);
    if (block) block.style.display = "none";
  }

  function sameUrl(a, b) {
    if (!a || !b) return false;
    try {
      return new URL(a, window.location.href).href === new URL(b, window.location.href).href;
    } catch (_) {
      return a === b;
    }
  }

  function isHashLink(href) {
    return /^#/.test(String(href || "").trim());
  }

  function playVideo(video, opts) {
    if (!video) return;
    video.muted = !opts.sound;
    video.loop = !!opts.loop;
    var p = video.play();
    if (p && p.catch) p.catch(function () {});
  }

  function buildWidget() {
    if (document.getElementById("pkpw-root")) return;

    var root = el("div", {
      class: "pkpw-root",
      id: "pkpw-root",
      "data-visible": "0"
    });

    var soundOn = false;

    var card = el("div", { class: "pkpw-card" });
    var media = el("div", { class: "pkpw-media" });

    var video = el("video", {
      class: "pkpw-video",
      playsinline: "",
      muted: "",
      loop: "",
      autoplay: "",
      preload: "metadata",
      disablepictureinpicture: ""
    });
    video.appendChild(
      el("source", { src: CONFIG.previewVideo, type: "video/mp4" })
    );

    var dismiss = el("button", {
      class: "pkpw-dismiss",
      type: "button",
      "aria-label": "Скрыть виджет"
    });
    dismiss.innerHTML =
      '<svg viewBox="0 0 11 11" aria-hidden="true"><path fill="#fff" d="m1 .65-.65.65L9.99 10.3l.65-.65L1 .65Z"/><path fill="#fff" d="m.35 9.99.65.65 9.65-9.65-.65-.65L.35 9.99Z"/></svg>';

    var ctaHref = CONFIG.fullPodcastUrl || "#video";
    var ctaAttrs = {
      class: "pkpw-cta",
      href: ctaHref,
      text: CONFIG.ctaText
    };
    if (isHashLink(ctaHref)) {
      ctaAttrs.target = "_self";
    } else {
      ctaAttrs.target = "_blank";
      ctaAttrs.rel = "noopener noreferrer";
    }
    var cta = el("a", ctaAttrs);

    var tap = el("button", {
      class: "pkpw-tap",
      type: "button",
      "aria-label": "Включить звук"
    });

    media.appendChild(video);
    media.appendChild(tap);
    card.appendChild(media);
    card.appendChild(dismiss);
    card.appendChild(cta);
    root.appendChild(card);
    document.body.appendChild(root);

    function setPreviewMode() {
      var src = video.querySelector("source");
      if (src && CONFIG.previewVideo && !sameUrl(src.getAttribute("src"), CONFIG.previewVideo)) {
        src.setAttribute("src", CONFIG.previewVideo);
        video.load();
      }
      playVideo(video, { sound: false, loop: true });
    }

    function enableSound() {
      if (soundOn) return;
      soundOn = true;
      var src = video.querySelector("source");
      if (src && CONFIG.openVideo && !sameUrl(src.getAttribute("src"), CONFIG.openVideo)) {
        src.setAttribute("src", CONFIG.openVideo);
        video.load();
      }
      playVideo(video, { sound: true, loop: true });
    }

    tap.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      enableSound();
    });

    dismiss.addEventListener("click", function (e) {
      e.stopPropagation();
      soundOn = false;
      setPreviewMode();
      root.setAttribute("data-visible", "0");
    });

    cta.addEventListener("click", function (e) {
      e.stopPropagation();
    });

    setPreviewMode();

    setTimeout(function () {
      root.setAttribute("data-visible", "1");
    }, 400);

    return root;
  }

  function init() {
    mergeConfig();
    injectStyles();
    hideTildaWidget();
    buildWidget();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
