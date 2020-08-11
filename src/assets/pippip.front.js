(function($) {
  import "flickety";
  import "flickety/dist/flickety.min.css";

  // Homepage only

  var // General purpose vars
    htmlBody = $("html,body"),
    Window = $(window),
    Document = $(document),
    Wrapper = $("#js-wrapper"),
    storiesPos = function() {
      console.log("testingle");
      var storyWrap = $("#js-stories"),
        widthMarker = $("#js-setWidth").offset().left,
        dots = storyWrap.find(".flickity-page-dots");

      storyWrap.css({
        "margin-left": widthMarker,
      });
      dots.css({
        "margin-left": -(widthMarker / 2),
      });

      console.log(storyWrap);
    },
    stories = function() {
      var storyWrap = $("#js-stories");

      storyWrap.flickity({
        cellAlign: "left",
        contain: true,
        prevNextButtons: false,
        selectedAttraction: 0.01,
        friction: 0.15,
      });
    },
    // ----
    // Prep functions to run
    // ----

    Ready = function() {
      stories();
      storiesPos();
    };

  // ----
  // Run everything
  // ----

  // Document.ready
  $(function() {
    Ready();
  });
})(jQuery);
