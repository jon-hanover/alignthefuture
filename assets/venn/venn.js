/* Align the Future: the Humans / AI Venn animation.
   The blue (Humans) and yellow (AI) circles start apart, glide together, and
   where they overlap the green Align column emerges. Plays once when the
   section scrolls into view; Replay runs it again. Respects reduced motion. */
(function () {
  var NS = "http://www.w3.org/2000/svg";
  var DURATION = 4800;
  var HOLD = 700;
  var PHONE = "(max-width: 759px)";

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function span(t, from, len) { return ease(clamp((t - from) / len)); }

  function el(name, attrs, parent) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }

  function gradient(defs, id, stops) {
    var g = el("radialGradient", { id: id, cx: "50%", cy: "50%", r: "50%" }, defs);
    stops.forEach(function (s) {
      el("stop", { offset: s[0], "stop-color": s[1], "stop-opacity": s[2] }, g);
    });
  }

  function init(root, n) {
    var stage = root.querySelector(".stage");
    var svg = root.querySelector("svg.circles");
    var grid = root.querySelector(".grid");
    var pillH = root.querySelector(".pill.h");
    var pillA = root.querySelector(".pill.a");
    var pillI = root.querySelector(".pill.i");
    var pillAText = pillA.children;
    var sides = root.querySelectorAll(".pill.h, .pill.i, .cell.h, .cell.i");
    var segs = root.querySelectorAll(".bar .seg.a");
    var cellsA = root.querySelectorAll(".cell.a");
    var replay = root.querySelector(".replay");
    var phone = window.matchMedia(PHONE);
    var still = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Watercolor circles: pigment pools toward the rim, as in the logo.
    var id = "atfv" + n;
    var defs = el("defs", {}, svg);
    gradient(defs, id + "b", [["0", "#6F97C4", 1], ["0.72", "#4675B3", 1], ["0.93", "#1F55A2", 1], ["1", "#11479A", 1]]);
    gradient(defs, id + "y", [["0", "#F4E27A", 1], ["0.75", "#EFDA55", 1], ["1", "#E6CC3C", 1]]);
    gradient(defs, id + "g", [["0", "#5F9A55", 1], ["0.7", "#3D7C3D", 1], ["1", "#2F6A34", 1]]);
    var clip = el("clipPath", { id: id + "c" }, defs);
    var clipCircle = el("circle", {}, clip);

    var wash = el("g", {}, svg);
    var blue = el("circle", { fill: "url(#" + id + "b)" }, wash);
    var yellow = el("circle", { fill: "url(#" + id + "y)" }, wash);
    var lens = el("circle", { fill: "url(#" + id + "g)", "clip-path": "url(#" + id + "c)" }, wash);
    lens.style.mixBlendMode = "normal";

    var labels = el("g", {}, svg);
    var tHumans = el("text", { fill: "#fff", "font-size": 13 }, labels);
    var tAi = el("text", { fill: "#1F2A36", "font-size": 14 }, labels);
    var tAlign = el("text", { fill: "#fff", "font-size": 14 }, labels);
    var tFor = el("text", { fill: "#4C6E36", "font-size": 12 }, labels);
    tHumans.textContent = "HUMANS";
    tAi.textContent = "AI";
    tAlign.textContent = "ALIGN";
    tFor.textContent = "FOR HUMAN FLOURISHING";

    var t = 0;

    function render() {
      var small = phone.matches;
      var W = stage.clientWidth;
      var H = small ? 250 : stage.clientHeight;
      var m = span(t, 0, 0.7);
      var a = span(t, 0.5, 0.28);
      var r0, r1, d0, d1, cy;

      if (small) {
        r0 = Math.min(0.2 * W, 80);
        r1 = Math.min(0.27 * W, 96);
        d0 = Math.min(W - 2 * r0 - 8, 2.3 * r0);
        d1 = 1.2 * r1;
        cy = 112;
      } else {
        var top = pillH.getBoundingClientRect().bottom - stage.getBoundingClientRect().top;
        r1 = Math.min(0.25 * W, 0.52 * H);
        r0 = 0.82 * r1;
        d0 = Math.min(W - 2 * r0 - 0.02 * W, 2.35 * r0);
        d1 = 1.12 * r1;
        cy = (top + H) / 2;
      }

      var r = lerp(r0, r1, m);
      var d = lerp(d0, d1, m);
      var cx = W / 2;
      var bx = cx - d / 2;
      var yx = cx + d / 2;

      svg.setAttribute("viewBox", "0 0 " + W + " " + H);
      [blue, clipCircle].forEach(function (c) { c.setAttribute("cx", bx); c.setAttribute("cy", cy); c.setAttribute("r", r); });
      [yellow, lens].forEach(function (c) { c.setAttribute("cx", yx); c.setAttribute("cy", cy); c.setAttribute("r", r); });
      // The green deepens as the overlap grows.
      var overlap = clamp((2 * r - d) / (2 * r1 - d1));
      lens.setAttribute("opacity", (small ? 0.85 : 0.7) * overlap);
      wash.setAttribute("opacity", small ? 0.92 : 0.3);

      labels.style.display = small ? "" : "none";
      if (small) {
        // Keep each label centered in the part of its circle the other does not cover.
        tHumans.setAttribute("x", (bx - r + Math.min(bx + r, yx - r)) / 2);
        tAi.setAttribute("x", (yx + r + Math.max(yx - r, bx + r)) / 2);
        tHumans.setAttribute("y", cy);
        tAi.setAttribute("y", cy);
        tAlign.setAttribute("x", cx);
        tAlign.setAttribute("y", cy);
        tFor.setAttribute("x", cx);
        tFor.setAttribute("y", cy + r1 + 22);
        tAlign.setAttribute("opacity", a);
        tFor.setAttribute("opacity", a);
      }

      var shift = small ? 0 : (1 - m) * 14;
      for (var i = 0; i < sides.length; i++) {
        var left = sides[i].classList.contains("h");
        sides[i].style.transform = shift ? "translateX(" + (left ? -shift : shift) + "px)" : "";
      }

      var rad = 12 * (1 - a);
      pillH.style.borderRadius = "12px " + rad + "px " + rad + "px 12px";
      pillI.style.borderRadius = rad + "px 12px 12px " + rad + "px";
      pillA.style.transform = "scaleX(" + a + ")";
      pillA.style.opacity = a > 0 ? 1 : 0;
      for (var j = 0; j < pillAText.length; j++) pillAText[j].style.opacity = clamp((a - 0.55) / 0.45);

      // On a phone the rows sit below the fold, so only the Venn animates.
      for (var k = 0; k < cellsA.length; k++) {
        var s = span(t, 0.52 + 0.04 * k, 0.28);
        if (segs[k]) segs[k].style.transform = "scaleX(" + s + ")";
        var e = small ? 1 : span(t, 0.62 + 0.06 * k, 0.26);
        cellsA[k].style.opacity = e;
        cellsA[k].style.transform = e < 1 ? "translateY(" + (1 - e) * 10 + "px)" : "";
      }
    }

    var raf = 0;
    function play() {
      cancelAnimationFrame(raf);
      replay.hidden = true;
      t = 0;
      render();
      var start = performance.now() + HOLD;
      function frame(now) {
        t = clamp((now - start) / DURATION);
        render();
        if (t < 1) raf = requestAnimationFrame(frame);
        else if (!still.matches) replay.hidden = false;
      }
      raf = requestAnimationFrame(frame);
    }

    root.classList.add("is-live");
    replay.addEventListener("click", play);
    window.addEventListener("resize", render);
    if (window.ResizeObserver) new ResizeObserver(render).observe(grid);
    if (phone.addEventListener) phone.addEventListener("change", render);

    if (still.matches || !("IntersectionObserver" in window)) {
      t = 1;
      render();
      return;
    }

    t = 0;
    render();
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        io.disconnect();
        play();
      }
    }, { rootMargin: "0px 0px -30% 0px" });
    io.observe(root);
  }

  var roots = document.querySelectorAll("[data-atf-venn]");
  for (var i = 0; i < roots.length; i++) init(roots[i], i);
})();
