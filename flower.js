/* Swaying mark for the closing scene. Bitmap and motion match the provided flower. */
(function () {
  var section = document.querySelector(".lp-cta");
  var box = document.querySelector(".lp-cta .flower");
  var canvas = document.getElementById("sakura");
  if (!section || !box || !canvas) return;

  var COLOR = [254, 97, 19];
  var W = 359, H = 675;

  fetch("flower.b64").then(function (response) { return response.text(); }).then(function (raw) {
  var B64 = raw.replace(/\s+/g, "");
  var bits = Uint8Array.from(atob(B64), function (c) { return c.charCodeAt(0); });
  var src = document.createElement("canvas");
  src.width = W;
  src.height = H;
  var sctx = src.getContext("2d");
  var img = sctx.createImageData(W, H);
  for (var i = 0; i < W * H; i++) {
    if ((bits[i >> 3] >> (7 - (i & 7))) & 1) {
      var p = i * 4;
      img.data[p] = COLOR[0];
      img.data[p + 1] = COLOR[1];
      img.data[p + 2] = COLOR[2];
      img.data[p + 3] = 255;
    }
  }
  sctx.putImageData(img, 0, 0);

  var ctx = canvas.getContext("2d");
  var base = document.createElement("canvas");
  var bctx = base.getContext("2d");
  var buf = document.createElement("canvas");
  var fctx = buf.getContext("2d");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  var dpr, s, cw, ch, fw, fh, padL, padY, bleed, band, raf = 0, visible = false;

  function layout() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    var mobile = window.innerWidth <= 900;
    var room = section.querySelector(".lp-cta-visual");
    var roomH = room ? room.clientHeight : 0;
    var target = mobile
      ? Math.min(460, Math.max(300, roomH || 400))
      : Math.min(760, Math.max(460, window.innerHeight * 0.8));
    s = 1;
    var best = Infinity;
    for (var k = 1; k <= 3; k++) {
      var dist = Math.abs(k * H / dpr - target);
      if (dist < best) { best = dist; s = k; }
    }
    fw = W * s;
    fh = H * s;
    padL = Math.round(fw * 0.12);
    padY = Math.round(fh * 0.05);
    bleed = Math.round(12 * dpr);
    cw = fw + padL + bleed;
    ch = fh + 2 * padY;
    band = dpr > 1 ? 3 : 2;

    section.style.setProperty("--fh", (fh / dpr) + "px");
    canvas.width = buf.width = base.width = cw;
    canvas.height = buf.height = base.height = ch;
    canvas.style.width = (cw / dpr) + "px";
    canvas.style.height = (ch / dpr) + "px";
    canvas.style.right = (-bleed / dpr) + "px";
    canvas.style.top = (-padY / dpr) + "px";

    bctx.imageSmoothingEnabled = false;
    bctx.clearRect(0, 0, cw, ch);
    bctx.drawImage(src, 0, 0, W, H, padL, padY, fw, fh);
    bctx.drawImage(src, W - 1, 0, 1, H, padL + fw, padY, bleed, fh);
    draw(reduce.matches ? 0 : performance.now() / 1000);
  }

  function draw(t) {
    var g = reduce.matches ? 0 : 0.62 + 0.30 * Math.sin(t * 0.31) + 0.14 * Math.sin(t * 0.83 + 1);
    var ax = 0.0036 * fh * g;
    var ay = 0.0105 * fh * g;

    fctx.clearRect(0, 0, cw, ch);
    var y, v, dx, x, u, a, dy, right;
    for (y = 0; y < ch; y += band) {
      v = y / fh;
      dx = ax * (Math.sin(t * 0.70 + v * 5.0) + 0.4 * Math.sin(t * 1.35 + v * 11.0));
      fctx.drawImage(base, 0, y, cw, band, dx, y, cw, band);
    }
    ctx.clearRect(0, 0, cw, ch);
    right = padL + fw;
    for (x = 0; x < cw; x += band) {
      u = Math.max(0, (right - x) / fw);
      a = ay * Math.pow(u, 1.4);
      dy = a * (Math.sin(t * 0.90 - u * 4.5) + 0.35 * Math.sin(t * 1.60 - u * 9.0 + 2));
      ctx.drawImage(buf, x, 0, band, ch, x, dy, band, ch);
    }
  }

  function loop(now) {
    draw(now / 1000);
    raf = window.requestAnimationFrame(loop);
  }
  function start() {
    if (!raf && visible && !reduce.matches) raf = window.requestAnimationFrame(loop);
  }
  function stop() {
    window.cancelAnimationFrame(raf);
    raf = 0;
  }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) start();
      else stop();
    }, { rootMargin: "120px" }).observe(section);
  } else {
    visible = true;
  }

  var rt;
  window.addEventListener("resize", function () {
    window.clearTimeout(rt);
    rt = window.setTimeout(function () { layout(); start(); }, 120);
  });
  if (reduce.addEventListener) {
    reduce.addEventListener("change", function () { stop(); layout(); start(); });
  }

  layout();
  start();
  }).catch(function () {});
})();
