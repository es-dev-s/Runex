/* Homepage intro. Covers the existing page, waits for it to load, then reveals it. */
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!document.documentElement.classList.contains("runex-intro")) return;

  var ORANGE = "#FD4E00";
  var WHITE = "#FFFFFF";
  var PATHS = [
    "M582.649 349.645C603.664 348.329 615.637 371.552 642.494 368.396C665.201 365.727 670.015 356.961 688.919 349.652C697.756 346.236 716.85 357.96 717.405 370.194C718.81 401.147 700.164 432.305 682.524 456.609C673.382 467.949 663.848 481.206 649.456 486.067C641.852 488.635 630.259 487.798 623.273 483.406C595.1 464.326 575.317 426.252 564.073 394.991C556.808 374.791 560.672 355.861 582.649 349.645Z",
    "M765.669 405.838C775.185 405.078 783.291 408.306 789.339 415.905C798.815 427.812 791.86 441.292 789.762 454.467C786.949 472.138 793.179 489.357 805.957 501.789C815.276 510.982 829.553 520.296 826.685 535.383C825.57 541.247 822.027 548.943 816.771 552.067C797.756 563.37 768.776 558.519 748.236 554.749C707.282 544.801 654.457 529.495 687.568 476.731C704.257 450.136 734.173 413.958 765.669 405.838Z",
    "M678.713 555.27C679.456 555.224 680.2 555.19 680.944 555.166C711.513 554.224 762.062 577.377 785.228 598.03C795.75 607.411 802.439 620.859 794.521 634.305C784.411 651.471 763.418 644.62 747.455 650.395C737.797 653.888 732.263 658.134 725.167 665.569C714.311 678.77 709.845 704.714 692.567 708.018C650.607 715.684 647.156 636.801 647.316 610.046C647.467 584.899 651.211 561.905 678.713 555.27Z",
    "M505.355 405.888C538.515 402.369 592.201 467.885 600.804 497.445C611.373 533.76 562.318 546.719 537.16 553.179C525.755 556.055 514.024 557.211 503.935 558.63C458.147 565.071 429.378 533.745 473.667 501.146C485.938 492.115 492.687 467.608 488.979 452.425C484.016 432.106 480.368 414.773 505.355 405.888Z",
    "M590.055 555.345C594.228 554.896 598.447 555.122 602.549 556.014C611.329 557.891 618.98 563.235 623.765 570.834C636.416 591.249 631.795 639.85 626.488 662.963C622.292 681.242 612.1 714.711 586.906 708.73C568.671 704.401 568.473 687.689 560.083 673.975C551.052 661.001 539.622 651.135 523.718 648.451C519.677 647.884 515.413 647.401 511.345 647.13C497.89 646.233 483.993 641.186 481.548 626.148C478.757 608.982 493.108 597.514 505.728 588.747C530.952 571.382 559.784 559.962 590.055 555.345Z",
  ];
  var VB = { x: 411.4, y: 312.9, size: 436.2 };
  var M4 = [
    [0, 12, 1, 13],
    [8, 4, 9, 5],
    [2, 14, 3, 15],
    [10, 6, 11, 7],
  ];
  var DOT = 0.6;
  var MASK = 72;
  var PAD = 38;
  var HALO = 5;
  var ARRIVE = 0.52;
  var HOLD = 0.14;
  var REVEAL_AT = 0.08;
  var REVEAL_LEN = 1.55;

  function bayer(x, y) {
    var v = 0;
    for (var b = 0; b < 3; b++) v = (v << 2) | ((((x ^ y) >> b) & 1) << 1) | ((y >> b) & 1);
    return v;
  }
  function clamp01(v) {
    return v < 0 ? 0 : v > 1 ? 1 : v;
  }
  function fract(v) {
    return v - Math.floor(v);
  }
  function hash2(i, j, s) {
    return fract(Math.sin(i * 127.1 + j * 311.7 + s * 74.7) * 43758.5453);
  }
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  var shell = document.createElement("div");
  shell.setAttribute("role", "status");
  shell.setAttribute("aria-label", "Runex");
  shell.style.cssText =
    "position:fixed;top:0;left:0;z-index:2147483000;background:#FD4E00;pointer-events:auto;overflow:hidden;";
  var canvas = document.createElement("canvas");
  canvas.style.cssText = "position:absolute;top:0;left:0;display:block;";
  var cap = document.createElement("div");
  cap.setAttribute("aria-hidden", "true");
  cap.style.cssText = "position:absolute;top:0;right:0;bottom:0;background:#FD4E00;z-index:2;";
  shell.appendChild(canvas);
  shell.appendChild(cap);
  document.documentElement.appendChild(shell);

  var root = document.documentElement;
  var blocked = true;
  function blockScroll(event) {
    if (blocked) event.preventDefault();
  }
  function blockKeys(event) {
    if (!blocked) return;
    var keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " ", "PageUp", "PageDown", "Home", "End"];
    if (keys.indexOf(event.key) === -1) return;
    var tag = event.target && event.target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    event.preventDefault();
  }
  window.addEventListener("wheel", blockScroll, { passive: false, capture: true });
  window.addEventListener("touchmove", blockScroll, { passive: false, capture: true });
  window.addEventListener("keydown", blockKeys, true);
  window.scrollTo(0, 0);

  var released = false;
  function release() {
    if (released) return;
    released = true;
    blocked = false;
    window.__runexIntroDone = true;
    window.cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    window.removeEventListener("wheel", blockScroll, { capture: true });
    window.removeEventListener("touchmove", blockScroll, { capture: true });
    window.removeEventListener("keydown", blockKeys, true);
    root.classList.remove("runex-intro", "runex-reveal");
    if (shell.parentNode) shell.parentNode.removeChild(shell);
  }
  window.__runexIntroRelease = release;

  var ctx = canvas.getContext("2d");
  if (!ctx) {
    release();
    return;
  }

  var paths = PATHS.map(function (p) {
    return new Path2D(p);
  });
  var G = MASK + 2 * PAD;
  var mc = document.createElement("canvas");
  mc.width = mc.height = G;
  var mx = mc.getContext("2d", { willReadFrequently: true });
  if (!mx) {
    release();
    return;
  }
  mx.setTransform(MASK / VB.size, 0, 0, MASK / VB.size, PAD, PAD);
  mx.translate(-VB.x, -VB.y);
  mx.fillStyle = "#000";
  paths.forEach(function (p) {
    mx.fill(p);
  });
  var md = mx.getImageData(0, 0, G, G).data;
  var sol = new Uint8Array(G * G);
  var inv = new Uint8Array(G * G);
  for (var n = 0; n < G * G; n++) {
    sol[n] = md[n * 4 + 3] > 110 ? 1 : 0;
    inv[n] = 1 - sol[n];
  }

  function chamfer(tg) {
    var d = new Float32Array(G * G);
    for (var i = 0; i < d.length; i++) d[i] = tg[i] ? 0 : 1e6;
    var j, i2, idx, v;
    for (j = 0; j < G; j++) {
      for (i2 = 0; i2 < G; i2++) {
        idx = j * G + i2;
        v = d[idx];
        if (i2 > 0) v = Math.min(v, d[idx - 1] + 1);
        if (j > 0) {
          v = Math.min(v, d[idx - G] + 1);
          if (i2 > 0) v = Math.min(v, d[idx - G - 1] + 1.414);
          if (i2 < G - 1) v = Math.min(v, d[idx - G + 1] + 1.414);
        }
        d[idx] = v;
      }
    }
    for (j = G - 1; j >= 0; j--) {
      for (i2 = G - 1; i2 >= 0; i2--) {
        idx = j * G + i2;
        v = d[idx];
        if (i2 < G - 1) v = Math.min(v, d[idx + 1] + 1);
        if (j < G - 1) {
          v = Math.min(v, d[idx + G] + 1);
          if (i2 < G - 1) v = Math.min(v, d[idx + G + 1] + 1.414);
          if (i2 > 0) v = Math.min(v, d[idx + G - 1] + 1.414);
        }
        d[idx] = v;
      }
    }
    return d;
  }

  var dOut = chamfer(sol);
  var dIn = chamfer(inv);
  var ox = [];
  var oy = [];
  var sdl = [];
  var thl = [];
  var inl = [];
  for (var j = 0; j < G; j++) {
    for (var i = 0; i < G; i++) {
      var cellIndex = j * G + i;
      var sd = sol[cellIndex] ? -(dIn[cellIndex] - 0.5) : dOut[cellIndex] - 0.5;
      if (sd > HALO) continue;
      ox.push((i - PAD + 0.5) / MASK - 0.5);
      oy.push((j - PAD + 0.5) / MASK - 0.5);
      sdl.push(sd);
      thl.push((bayer(i, j) + 0.5) / 64);
      inl.push(sol[cellIndex]);
    }
  }
  var CN = ox.length;
  var cOx = Float32Array.from(ox);
  var cOy = Float32Array.from(oy);
  var cSd = Float32Array.from(sdl);
  var cThr = Float32Array.from(thl);
  var cIn = Uint8Array.from(inl);

  var size = { W: 0, H: 0, dpr: 1 };
  var cols = 0;
  var rows = 0;
  var pitch = 8;
  var order = new Float32Array(0);
  function resize() {
    var gutter = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
    var W = window.innerWidth - gutter;
    var H = window.innerHeight;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    size = { W: W, H: H, dpr: dpr };
    shell.style.width = window.innerWidth + "px";
    shell.style.height = H + "px";
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    cap.style.width = gutter + "px";
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    pitch = Math.min(9, Math.max(5.5, Math.min(W, H) / 92));
    cols = Math.ceil(W / pitch);
    rows = Math.ceil(H / pitch);
    order = new Float32Array(cols * rows);
    for (var row = 0; row < rows; row++) {
      for (var col = 0; col < cols; col++) {
        order[row * cols + col] = clamp01(
          0.78 * (1 - row / rows) + 0.22 * (col / cols) + (hash2(col, row, 9) - 0.5) * 0.1,
        );
      }
    }
  }
  resize();
  window.addEventListener("resize", resize);

  var target = 0;
  function report(value) {
    if (released) return;
    target = Math.max(target, clamp01(value));
  }
  var fonts = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  var win = new Promise(function (resolve) {
    if (document.readyState === "complete") resolve();
    else window.addEventListener("load", function () { resolve(); }, { once: true });
  });
  report(0.08);
  fonts.then(function () {
    report(0.45);
    return win;
  }).then(function () {
    report(1);
  }).catch(function () {
    report(1);
  });

  var t0 = performance.now();
  var last = t0;
  var prog = 0;
  var fullAt = -1;
  var exitAt = -1;
  var scFrozen = 1;
  var revealed = false;
  var raf = 0;

  function frame(now) {
    raf = window.requestAnimationFrame(frame);
    var W = size.W;
    var H = size.H;
    var dpr = size.dpr;
    if (blocked && (window.scrollX || window.scrollY)) window.scrollTo(0, 0);
    if (!W) return;

    var t = (now - t0) / 1000;
    var dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    var intro = easeOutCubic(clamp01(t / 0.42));
    var scLive = 0.92 + 0.08 * intro;

    if (exitAt < 0) {
      var goal = t >= 12 ? 1 : target;
      var rate = goal >= 1 ? 8 : 5;
      prog = Math.max(prog, Math.min(1, prog + (goal - prog) * (1 - Math.exp(-dt * rate))));
      if (fullAt < 0 && goal >= 1 && prog >= 0.995 && t >= ARRIVE) {
        prog = 1;
        fullAt = now;
      }
      if (fullAt >= 0 && (now - fullAt) / 1000 >= HOLD) {
        exitAt = now;
        scFrozen = scLive;
      }
    }
    var e = exitAt < 0 ? -1 : (now - exitAt) / 1000;
    var sc = exitAt < 0 ? scLive : scFrozen;
    var L = Math.min(Math.max(Math.min(W, H) * 0.46, 240), 520);
    var cx = W / 2;
    var cy = H / 2;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = ORANGE;
    ctx.fillRect(0, 0, W, H);

    var arrive = easeOutCubic(clamp01(t / ARRIVE));
    if (arrive > 0.004) {
      var cell = (L * sc) / MASK;
      var dot = Math.max(1 / dpr, Math.round(cell * DOT * dpr) / dpr);
      var LS = L * sc;
      var moving = 1 - arrive;
      var dots = new Path2D();
      for (var n = 0; n < CN; n++) {
        var inside = cIn[n] === 1;
        var dist = cSd[n];
        var depth = inside ? Math.max(0, -dist) : 0;
        var rim = inside ? clamp01(depth / 8) : 0;
        var halo = !inside ? clamp01(1 - dist / HALO) : 0;
        var body = inside ? 0.38 + 0.62 * rim : halo * 0.7 * moving;
        if (body <= 0) continue;
        var across = clamp01(cOx[n] + 0.5);
        var density = clamp01(arrive * 1.5 - across * 0.62 * moving) * body;
        if (density <= cThr[n]) continue;
        var px = cx + cOx[n] * LS;
        var py = cy + cOy[n] * LS;
        dots.rect(Math.round((px - dot / 2) * dpr) / dpr, Math.round((py - dot / 2) * dpr) / dpr, dot, dot);
      }
      ctx.fillStyle = WHITE;
      ctx.fill(dots);
    }

    if (e >= REVEAL_AT) {
      if (!revealed) {
        revealed = true;
        root.classList.add("runex-reveal");
        shell.style.background = "transparent";
      }
      var w = easeInOutCubic(clamp01((e - REVEAL_AT) / REVEAL_LEN));
      if (w >= 1) {
        release();
        return;
      }
      var Pc = pitch * dpr;
      var sz0 = Math.max(1, Math.round(Pc * DOT));
      var R = 0.55;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      var keep = [];
      for (var row = 0; row < rows; row++) {
        for (var col = 0; col < cols; col++) {
          var d = clamp01((w * (1 + R) - order[row * cols + col]) / R);
          if (d <= 0) continue;
          var on = d > (M4[row % 4][col % 4] + 0.5) / 16;
          var x0 = Math.round(col * Pc);
          var y0 = Math.round(row * Pc);
          var x1 = Math.round((col + 1) * Pc);
          var y1 = Math.round((row + 1) * Pc);
          var hx = Math.round(col * Pc + (Pc - sz0) / 2);
          var hy = Math.round(row * Pc + (Pc - sz0) / 2);
          if (d > 0.5) {
            ctx.rect(x0, y0, x1 - x0, y1 - y0);
            if (!on) keep.push(hx, hy);
          } else if (on) {
            ctx.rect(hx, hy, sz0, sz0);
          }
        }
      }
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
      if (keep.length) {
        ctx.fillStyle = ORANGE;
        ctx.beginPath();
        for (var h = 0; h < keep.length; h += 2) ctx.rect(keep[h], keep[h + 1], sz0, sz0);
        ctx.fill();
      }
    }
  }

  raf = window.requestAnimationFrame(frame);
})();
