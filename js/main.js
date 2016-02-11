var currentLocation = '#homeframe';
var mousewheelTimer;
var scrollTimer;
var carousel;

function assignFormSubmission() {
  $('#submitLinkButton').click(function(event) {
    event.preventDefault();
    var url = $('#url').val();
    if (url.length) {
      $.ajax('mailer.php?type=site&value=' + url).done(function() {
        $('#formResults').html('Your requested site has been submitted. Thanks.');
      }).fail(function() {
        $('#formResults').html('There was an error submitting your site. Please try again later.');
      });
    }
  });
}

function assignNavigation() {
  $('header a').each(function(index, item) {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname && this.hash.replace(/#/,'') ) {
      var targetID = $(this.hash), targetAnchor = $('[name=' + this.hash.slice(1) +']');
      var target = targetID.length ? targetID : targetAnchor.length ? targetAnchor : false;
      if (target) {
        $(this).click(function(event) {
          event.preventDefault();
          event.stopPropagation();
          $('.menu a').css('text-decoration', 'none');
          if (index > 0) {
            $(this).css('text-decoration', 'underline');
          }
          currentLocation = this.hash;
          var targetOffset = target.offset().top;
          $('html, body').animate({scrollTop: targetOffset}, 500, 'easeInOutCubic', function() {
            //window.location.hash = currentLocation;
          });
          return false;
        });
      }
    }
  });
  $('#submitLink').click(function(event) {
    event.preventDefault();
    event.stopPropagation();
    $($('header a')[3]).trigger('click');
  });
}

function onDocumentScrolled() {
  if ($(this).scrollTop() < $('#huhframe').offset().top ) {
    currentLocation = '#homeframe';
    $('.menu a').css('text-decoration', 'none');
  } else if ($(this).scrollTop() >= $('#huhframe').offset().top && $(this).scrollTop() < $('#whichframe').offset().top) {
    currentLocation = '#huhframe';
    $('.menu a').css('text-decoration', 'none');
    $($('.menu a')[0]).css('text-decoration', 'underline');
  } else if ($(this).scrollTop() >= $('#whichframe').offset().top && $(this).scrollTop() < $('#howframe').offset().top) {
    currentLocation = '#whichframe';
    $('.menu a').css('text-decoration', 'none');
    $($('.menu a')[1]).css('text-decoration', 'underline');
  } else if ($(this).scrollTop() >= $('#howframe').offset().top) {
    currentLocation = '#howframe';
    $('.menu a').css('text-decoration', 'none');
    $($('.menu a')[2]).css('text-decoration', 'underline');
  }
  window.location.hash = currentLocation;
}

function mousewheelScrolled(event) {
  event.preventDefault();
  var nextSlide,targetOffset;
  mousewheelTimer = setTimeout(function() {
    if (event.deltaY >= 0) {
      if (currentLocation != '#howframe') { // scroll down
        if (currentLocation == '#homeframe') {
          nextSlide = '#huhframe';
        } else if (currentLocation == '#huhframe') {
          nextSlide = '#whichframe';
        } else {
          nextSlide = '#howframe';
        }
      }
    } else {
      if (currentLocation != '#homeframe') { // scroll down
        if (currentLocation == '#huhframe') {
          nextSlide = '#homeframe';
        } else if (currentLocation == '#whichframe') {
          nextSlide = '#huhframe';
        } else {
          nextSlide = '#whichframe';
        }
      }
      
    }
    if (nextSlide) {
      targetOffset = $(nextSlide).offset().top;
      $('body').animate({scrollTop: targetOffset}, 500, 'easeInOutCubic', function() {
        
      });
    }
  }, 100);
}

function assignMouseWheelListener() {
  $('html,body').on('mousewheel', function(event) {
    event.preventDefault();
    event.stopPropagation();
    clearTimeout(mousewheelTimer);
    if (event.target.id == 'el') {
      return;
    }
    mousewheelScrolled(event.originalEvent);
  });
}

$(document).ready(function() {
  carousel = $('.owl-carousel').owlCarousel({
    loop:true,
    items:1,
    autoplay:true,
    mouseDrag: false
  });
  //carousel.trigger('autoplay.stop.owl');
  $('#sitesList').DataTable({
    paging:true,
    lengthChange: false,
    info:false
  });
  $.ajax({
    url: 'blocked_sites.txt',
    success: function(data) {
      var sites = data.split(',');
      $('#sitesCount').html(sites.length + ' sites blocked so far. <a href="#howframe" id="submitLink">Submit one.</a>');
      for (var i=0; i < sites.length; i++) {
        $('#sitesList').DataTable().row.add([sites[i]]).draw().node();
      }
      assignNavigation();
    }
  });
  assignMouseWheelListener();
  $(document).scroll(function() {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function() {
      onDocumentScrolled();
    }, 50);
  });
  assignFormSubmission();
  $('#installButton').click(function(event) {
    event.preventDefault();
    installChrome();
  });
  $(window).on('hashchange', function(event) {
    event.preventDefault();
    event.stopPropagation();
  });
  window.location.hash = 'homeframe';
});

function installChrome() {
  chrome.webstore.install(
  "https://chrome.google.com/webstore/detail/pjefaeadmaaefnhmbbnacbijblmmdenc",
  function() {
    var div = document.createElement("div");
    $(div).css("text-align", "center");
    $(div).css("font-size", "36px");
    $(div).html("SockNit has been successfully installed. Enjoy!");
    $("#installDiv").html(div);
  }, function(why) {
    console.log(why);
  });
}

