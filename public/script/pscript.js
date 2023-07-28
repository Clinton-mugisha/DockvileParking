$(document).ready(function () {
  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
      isClosed = false;

  trigger.click(function () {
      hamburger_cross();
  });

  function hamburger_cross() {
      if (isClosed == true) {
          overlay.hide();
          trigger.removeClass('is-open');
          trigger.addClass('is-closed');
          isClosed = false;
      } else {
          overlay.show();
          trigger.removeClass('is-closed');
          trigger.addClass('is-open');
          isClosed = true;
      }
  }

  $('[data-toggle="offcanvas"]').click(function () {
      $('#wrapper').toggleClass('toggled');
  });

  // Event listener to close sidebar when clicking anywhere on the document
  $(document).click(function (e) {
      if ($('#wrapper').hasClass('toggled') && !$(e.target).closest('#sidebar-wrapper').length && !$(e.target).closest('.hamburger').length) {
          closeSidebar();
      }
  });

  // Function to close the sidebar
  function closeSidebar() {
      overlay.hide();
      trigger.removeClass('is-open');
      trigger.addClass('is-closed');
      isClosed = false;
      $('#wrapper').removeClass('toggled');
  }
});
