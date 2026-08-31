// Portfolio interactivity: scroll-spy nav, scroll progress bar,
// copy-email button, and scroll-reveal animation for cards.
(function () {
  "use strict";

  /* ---------- Scroll progress bar ---------- */
  var progressBar = document.getElementById("scroll-progress");
  function updateProgress() {
    if (!progressBar) return;
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight =
      document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var pct = docHeight > 0 ? scrollTop / docHeight : 0;
    progressBar.style.transform = "scaleX(" + Math.min(1, Math.max(0, pct)) + ")";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  /* ---------- Scroll-spy nav highlighting ---------- */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('nav a[href^="#"]')
  );
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute("href").slice(1);
      var el = document.getElementById(id);
      return el ? { id: id, el: el, link: link } : null;
    })
    .filter(Boolean);

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      var isActive = link.getAttribute("href") === "#" + id;
      link.classList.toggle("text-white", isActive);
      link.classList.toggle("text-slate-400", !isActive);

      var underline = link.querySelector("span");
      if (isActive && !underline) {
        underline = document.createElement("span");
        underline.className =
          "absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-cyan-400 to-violet-400";
        link.appendChild(underline);
      } else if (!isActive && underline) {
        underline.remove();
      }
    });
  }

  if (sections.length && "IntersectionObserver" in window) {
    var spyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach(function (s) {
      spyObserver.observe(s.el);
    });
  }

  /* ---------- Scroll-reveal for cards ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------- Copy email button ---------- */
  var copyBtn = document.getElementById("copy-email-btn");
  if (copyBtn) {
    var email = "neha.gadodia99@gmail.com";
    var originalHTML = copyBtn.innerHTML;
    copyBtn.addEventListener("click", function () {
      var done = function () {
        copyBtn.innerHTML =
          '<svg aria-hidden="true" class="lucide lucide-check w-4 h-4" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M20 6 9 17l-5-5"></path></svg>Copied!';
        setTimeout(function () {
          copyBtn.innerHTML = originalHTML;
        }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done, done);
      } else {
        var ta = document.createElement("textarea");
        ta.value = email;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
        } catch (e) {}
        document.body.removeChild(ta);
        done();
      }
    });
  }
})();
