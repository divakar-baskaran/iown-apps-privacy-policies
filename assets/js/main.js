(function () {
  "use strict";

  function assetBase() {
    var root = document.body && document.body.dataset.assetBase;
    return root != null ? root : "assets/";
  }

  function renderHomepageApps() {
    var grid = document.getElementById("app-grid");
    if (!grid || !window.IOWN_PRIVACY_APPS) return;

    var apps = window.IOWN_PRIVACY_APPS.filter(function (app) {
      return app.status === "published";
    });

    if (!apps.length) {
      grid.innerHTML =
        '<li class="empty-state">No published privacy policies yet.</li>';
      return;
    }

    var base = assetBase();
    grid.innerHTML = apps
      .map(function (app) {
        var iconSrc = "";
        if (app.icon && base.indexOf("..") === 0) {
          iconSrc = base + app.icon.replace(/^assets\//, "");
        } else if (app.icon) {
          iconSrc = app.icon;
        }

        var iconHtml = iconSrc
          ? '<img class="app-card__icon" src="' +
            iconSrc +
            '" width="48" height="48" alt="' +
            escapeHtml(app.name) +
            ' icon" loading="lazy" decoding="async">'
          : '<div class="app-card__icon app-card__icon--placeholder" aria-hidden="true">APP</div>';

        return (
          "<li>" +
          '<a class="app-card" href="' +
          escapeHtml(app.path) +
          '">' +
          iconHtml +
          '<div class="app-card__body">' +
          "<h3>" +
          escapeHtml(app.name) +
          "</h3>" +
          "<p>" +
          escapeHtml(app.description) +
          "</p>" +
          '<span class="app-card__cta">Read Privacy Policy →</span>' +
          "</div></a></li>"
        );
      })
      .join("");
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function syncHeaderOffset() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var height = Math.ceil(header.getBoundingClientRect().height);
    document.documentElement.style.setProperty(
      "--header-offset",
      height + 12 + "px"
    );
  }

  function syncTocMode() {
    var desktop = document.querySelector(".desktop-toc");
    var toggle = document.getElementById("mobile-toc-toggle");
    var panel = document.getElementById("mobile-toc-panel");
    if (!desktop && !toggle) return;

    var isDesktop = window.matchMedia("(min-width: 960px)").matches;

    if (desktop) {
      desktop.hidden = !isDesktop;
      desktop.setAttribute("aria-hidden", isDesktop ? "false" : "true");
    }

    if (toggle) {
      toggle.hidden = isDesktop;
    }

    if (panel) {
      if (isDesktop) {
        panel.classList.remove("is-open");
        panel.hidden = true;
        if ("inert" in panel) panel.inert = true;
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      } else if (toggle && toggle.getAttribute("aria-expanded") !== "true") {
        panel.hidden = true;
        if ("inert" in panel) panel.inert = true;
      }
    }
  }

  function setTocOpen(toggle, panel, open) {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    panel.classList.toggle("is-open", open);
    panel.hidden = !open;
    if ("inert" in panel) {
      panel.inert = !open;
    }
  }

  function initMobileToc() {
    var toggle = document.getElementById("mobile-toc-toggle");
    var panel = document.getElementById("mobile-toc-panel");
    if (!toggle || !panel) return;

    // Ensure closed state is consistent on load
    setTocOpen(toggle, panel, false);

    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      setTocOpen(toggle, panel, !open);
      if (!open) {
        var firstLink = panel.querySelector("a");
        if (firstLink) {
          // Keep focus on toggle for predictability; do not trap focus
          // Screen readers announce expanded state via aria-expanded
        }
      }
    });

    panel.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setTocOpen(toggle, panel, false);
        toggle.focus();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      setTocOpen(toggle, panel, false);
      toggle.focus();
    });
  }

  function initActiveToc() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll('.toc a[href^="#"]')
    );
    if (!links.length) return;

    var sections = [];
    var seen = {};
    links.forEach(function (link) {
      var id = link.getAttribute("href").slice(1);
      if (seen[id]) return;
      var el = document.getElementById(id);
      if (el) {
        seen[id] = true;
        sections.push(el);
      }
    });

    function setActive(id) {
      links.forEach(function (link) {
        var match = link.getAttribute("href") === "#" + id;
        link.classList.toggle("is-active", match);
        if (match) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          var visible = entries
            .filter(function (entry) {
              return entry.isIntersecting;
            })
            .sort(function (a, b) {
              return b.intersectionRatio - a.intersectionRatio;
            });
          if (visible.length) {
            setActive(visible[0].target.id);
          }
        },
        {
          rootMargin: "-18% 0px -62% 0px",
          threshold: [0, 0.2, 0.45, 1],
        }
      );
      sections.forEach(function (section) {
        observer.observe(section);
      });
    }

    if (sections[0]) {
      setActive(sections[0].id);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderHomepageApps();
    initMobileToc();
    initActiveToc();
    syncHeaderOffset();
    syncTocMode();

    if (window.matchMedia) {
      var mq = window.matchMedia("(min-width: 960px)");
      var onChange = function () {
        syncTocMode();
        syncHeaderOffset();
      };
      if (mq.addEventListener) {
        mq.addEventListener("change", onChange);
      } else if (mq.addListener) {
        mq.addListener(onChange);
      }
    }
  });

  window.addEventListener("resize", function () {
    syncHeaderOffset();
  });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncHeaderOffset).catch(function () {});
  }
})();
