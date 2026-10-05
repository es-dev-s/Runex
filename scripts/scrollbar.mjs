import { animate } from "motion/mini";

var root = document.documentElement;
var scroller = document.scrollingElement || root;
var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var coarse = window.matchMedia("(pointer: coarse)").matches;
var rail = document.createElement("div");
var thumb = document.createElement("div");
var fade = null;
var hideTimer = 0;
var drag = null;

rail.className = "rx-scroll";
rail.setAttribute("aria-hidden", "true");
thumb.className = "rx-scroll-thumb";
rail.appendChild(thumb);
root.appendChild(rail);

function pageOn() {
  return !root.classList.contains("runex-intro");
}

function metrics() {
  var scroll = scroller.scrollHeight - scroller.clientHeight;
  var track = window.innerHeight - 24;
  if (scroll <= 1 || track <= 0) return null;
  var h = Math.max(36, track * (scroller.clientHeight / scroller.scrollHeight));
  var y = (scroller.scrollTop / scroll) * (track - h);
  return { scroll: scroll, track: track, h: h, y: y };
}

function setOpacity(value) {
  if (!pageOn()) value = 0;
  if (reduce) {
    if (fade) fade.stop();
    rail.style.opacity = String(value);
    return;
  }
  if (fade) fade.stop();
  fade = animate(rail, { opacity: value }, { duration: 0.32, ease: [0.22, 1, 0.36, 1] });
}

function paint() {
  var m = metrics();
  if (!m) {
    rail.classList.remove("is-live");
    setOpacity(0);
    return null;
  }
  thumb.style.height = m.h + "px";
  thumb.style.transform = "translate3d(0," + m.y.toFixed(2) + "px,0)";
  return m;
}

function settle() {
  if (!pageOn()) {
    rail.classList.remove("is-live");
    setOpacity(0);
    return;
  }
  if (!paint()) return;
  rail.classList.add("is-live");
  setOpacity(coarse ? 0 : 1);
}

function reveal() {
  if (!pageOn() || !paint()) return;
  rail.classList.add("is-live");
  setOpacity(1);
  if (!coarse) return;
  window.clearTimeout(hideTimer);
  hideTimer = window.setTimeout(function () {
    if (drag) return;
    setOpacity(0);
  }, 650);
}

window.addEventListener("scroll", reveal, { passive: true });
window.addEventListener("resize", settle);

rail.addEventListener("pointerdown", function (event) {
  if (coarse) return;
  var m = metrics();
  if (!m) return;
  if (event.target === thumb) {
    drag = { y: event.clientY, top: scroller.scrollTop };
    rail.classList.add("is-drag");
    thumb.setPointerCapture(event.pointerId);
  } else {
    var rect = rail.getBoundingClientRect();
    scroller.scrollTop = ((event.clientY - rect.top) / rect.height) * m.scroll;
  }
  event.preventDefault();
});

thumb.addEventListener("pointermove", function (event) {
  if (!drag) return;
  var m = metrics();
  if (!m) return;
  var span = Math.max(1, m.track - m.h);
  scroller.scrollTop = drag.top + ((event.clientY - drag.y) / span) * m.scroll;
});

function endDrag() {
  if (!drag) return;
  drag = null;
  rail.classList.remove("is-drag");
}

thumb.addEventListener("pointerup", endDrag);
thumb.addEventListener("pointercancel", endDrag);

new MutationObserver(settle).observe(root, { attributes: true, attributeFilter: ["class"] });
settle();
