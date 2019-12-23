$("head").append(
  $('<link rel="stylesheet" type="text/css" />').attr(
    "href",
    "//cdnjs.cloudflare.com/ajax/libs/fluidbox/2.0.5/css/fluidbox.min.css"
  )
),
  $("head").append(
    $('<link rel="stylesheet" type="text/css" />').attr(
      "href",
      "//cdn.jsdelivr.net/gh/coreysnyder04/fluidbox-ghost-blog-plugin@8c04f1180f64a0e434236fdb7f8c28eb120ba395/fluidbox-ghost-blog-plugin.css"
    )
  ),
  (window.fluidboxGhost = $.when(
    $.getScript(
      "//cdnjs.cloudflare.com/ajax/libs/jquery-throttle-debounce/1.1/jquery.ba-throttle-debounce.min.js"
    ),
    $.getScript(
      "//cdnjs.cloudflare.com/ajax/libs/fluidbox/2.0.5/js/jquery.fluidbox.min.js"
    ),
    $.Deferred(function(o) {
      $(o.resolve);
    })
  ).done(function() {
    let o,
      e = window.fluidboxGhostConfig.matchImageSelectors || [
        ".kg-gallery-image img",
        ".kg-card img"
      ],
      t = window.fluidboxGhostConfig.theme || "dark";
    (o =
      "image-backdrop" === t
        ? "#212121"
        : "light" === t
        ? "hsla(0, 0%, 100%, .85)"
        : "dark" === t
        ? "hsla(0, 0%, 15%, 0.85)"
        : t),
      document.styleSheets[0].addRule(
        ".fluidbox__wrap .fluidbox__overlay",
        "background-color: " + o + "!important"
      );
    let i = window.fluidboxGhostConfig.showCaption,
      n = null;
    $("<div />", { id: "caption-overlay" })
      .html('<div class="img-caption"></div>')
      .appendTo($("body")),
      $(e.join(",")).each(function(o, e) {
        $(
          "<a href='" + $(this).attr("src") + "' class='zoom'></a>"
        ).insertAfter($(this)),
          $(this).appendTo($(this).next("a"));
      }),
      $(".zoom:not(.fluidbox--opened)")
        .fluidbox({ loader: !0, immediateOpen: !0 })
        .on("openstart.fluidbox", function() {
          if ("image-backdrop" === t) {
            let o =
              'background-image: url("' +
              $(this)
                .find("img")
                .attr("src") +
              '") !important;';
            document.styleSheets[0].addRule(".fluidbox__overlay::before", o);
          }
        })
        .on("openend.fluidbox", function() {
          if (((n = this), i)) {
            let o = $(this)
              .parents("figure")
              .find("figcaption")
              .html();
            o &&
              o.length > 0 &&
              $("#caption-overlay")
                .addClass("visible")
                .find(".img-caption")
                .html(o);
          }
        })
        .on("closestart.fluidbox", function() {
          (n = null), $("#caption-overlay").removeClass("visible");
        });
    var l = 0;
    $(window).scroll(
      $.throttle(250, function() {
        var o = $(window).scrollTop();
        Math.abs(o - l) > 60 && $(n).fluidbox("close"), (l = o);
      })
    ),
      setTimeout(() => {
        let o = $(".zoom");
        window.addEventListener("keydown", function(e) {
          if (!n) return;
          e.preventDefault(), e.stopImmediatePropagation(), e.stopPropagation();
          const t = e.key;
          let i = o.index(n);
          "ArrowRight" === t || "ArrowDown" === t
            ? i++
            : ("ArrowLeft" !== t && "ArrowUp" !== t) || i--,
            $(o[i]).trigger("click");
        });
      }, 500);
  }));
