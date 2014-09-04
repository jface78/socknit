var menuItems;
var loadedCounter = 0;
var imgArray = ["img/dummy_article.png", "img/you.png", "img/hick.png", "img/dummy.png", "img/fake.png"];
var objArray = [];
var loadedInterval;
var timeouts;

$(document).ready(function(){
  menuItems = [$("#install"), $("#about"), $("#sites"), $("#report"), $("#request")];
  var hash = window.location.href.split('#')[1];
  switch(hash) {
    case "about":
    aboutPage();
    break;
    case "sites":
    sitesPage();
    break;
    case "request":
    requestPage();
    break;
    default:
    installPage();
    break;
  }
});

function installChrome() {
  chrome.webstore.install(
  "https://chrome.google.com/webstore/detail/pjefaeadmaaefnhmbbnacbijblmmdenc",
  function() {
    var div = document.createElement("div");
    $(div).css("text-align", "left");
    $(div).css("font-size", "16px");
    $(div).html("SockNit has been successfully installed. Enjoy!");
    $("#content").html(div);
  }, function(why) {
    console.log("error: " + why);
  });
}

function startAnimating() {
  if (timeouts) {
    for (var i = 0; i < timeouts.length; i++) {
      clearTimeout(timeouts[i]);
    }
  }
  timeouts = [];
  var timeout;
  var text1 = document.createElement("img");
  var text2 = document.createElement("img");
  var text3 = document.createElement("img");
  var text4 = document.createElement("img");
  $(text1).css("opacity", "0");
  $(text2).css("opacity", "0");
  $(text3).css("opacity", "0");
  $(text4).css("opacity", "0");

  $("#mainImg").attr("src", objArray[0].src);

  $("#mainImg").animate({
      opacity: '1'
  }, 1000, 'easeOutCubic', function() {
  });
  timeout = setTimeout(function() {
    $("#movieText").animate({
      opacity: '1'
    }, 1000, 'easeOutCubic', function() {
    });
  }, 1000);
  timeouts.push(timeout);
  timeout = setTimeout(function() {
    $("#movieText").animate({
      opacity: '0'
    }, 1000, 'easeOutCubic', function() {
    });
  }, 7000);
  timeouts.push(timeout);
  timeout = setTimeout(function() {
    $("#mainImg").animate({
      opacity: '0'
    }, 1000, 'easeOutCubic', function() {
     
    });
  }, 7500);
  timeouts.push(timeout);
  
  timeout = setTimeout(function() {
    $("#movieText").text("...always has crap like this at the bottom?");
    $("#movieText").animate({
      opacity: '1'
    }, 1000, 'easeOutCubic', function() {
    });
  }, 8000);
  timeouts.push(timeout);
  
  timeout = setTimeout(function() {
    $(text1).attr("src", objArray[1].src);
    $("#mainImg").remove();
    $("#aboutMovie").append(text1);
    $(text1).animate({
      opacity: '1'
    }, 1000, 'easeOutCubic', function() {
    });
  }, 9000);
  timeouts.push(timeout);
  
  timeout = setTimeout(function() {
  $(text2).attr("src", objArray[2].src);
    $("#aboutMovie").append(text2);
    $(text2).animate({
      opacity: '1'
    }, 1000, 'easeOutCubic', function() {
    });
  }, 11000);
  timeouts.push(timeout);
  
  timeout = setTimeout(function() {
  $(text3).attr("src", objArray[3].src);
    $("#aboutMovie").append(text3);
    $(text3).animate({
      opacity: '1'
    }, 1000, 'easeOutCubic', function() {
    });
  }, 21000);
  timeouts.push(timeout);
  
  timeout = setTimeout(function() {
  $(text4).attr("src", objArray[4].src);
    $("#aboutMovie").append(text4);
    $(text4).animate({
      opacity: '1'
    }, 1000, 'easeOutCubic', function() {
    });
  }, 31000);
  timeouts.push(timeout);
  
  timeout = setTimeout(function() {
    $(text1).animate({
      opacity: '0'
    }, 1000, 'easeOutCubic', function() {
    });
    $(text2).animate({
      opacity: '0'
    }, 1000, 'easeOutCubic', function() {
    });
    $(text3).animate({
      opacity: '0'
    }, 1000, 'easeOutCubic', function() {
    });
    $(text4).animate({
      opacity: '0'
    }, 1000, 'easeOutCubic', function() {
    });
    $("#movieText").animate({
      opacity: '0'
    }, 1000, 'easeOutCubic', function() {
      $(text1).remove();
      $(text2).remove();
      $(text3).remove();
      $(text4).remove();
    });
  }, 40000);
  timeouts.push(timeout);
  
  timeout = setTimeout(function() {
    $("#movieText").text("");
    $("#movieText").css("opacity", "1");
    var span1 = document.createElement("span");
    $(span1).css("opacity", "0");
    $(span1).text("All of these people are dumb. You gain nothing by reading any of it.");
    $("#movieText").append(span1);
    $(span1).animate({
      opacity: '1'
    }, 1000, 'easeOutCubic', function() {
    });
  }, 42000);
  timeouts.push(timeout);
  
  timeout = setTimeout(function() {
    var span2 = document.createElement("span");
    $(span2).css("opacity", "0");
    $(span2).text("Socknit removes them from your life.");
    $("#movieText").append("<br />");
    $("#movieText").append(span2);
    $(span2).animate({
      opacity: '1'
    }, 1000, 'easeOutCubic', function() {
    });
  }, 45000);
  timeouts.push(timeout);
  
  timeout = setTimeout(function() {
    $("#movieText").append("<br /><br />");
    var a = document.createElement("a");
    $(a).css("opacity", "0");
    $(a).html("replay");
    $(a).css("textDecoration", "underline");
    $(a).attr("href", "javascript:replayAnimation();");
    $("#movieText").append(a);
    $(a).animate({
      opacity: "1"
    }, 1000, 'easeOutCubic', function() {
    });
  }, 47000);
  timeouts.push(timeout);
}

function replayAnimation() {
  $("#movieText").animate({
    opacity: "0"
  }, 1000, 'easeOutCubic', function() {
    var img = document.createElement("img");
    $(img).attr("alt", "news story");
    $(img).attr("id", "mainImg");
    $("#aboutMovie").append(img);
    $("#movieText").text("Ever notice how an ordinary news article like this one...");
    startAnimating();
  });
}

function checkForLoadComplete() {
  var loadedMax = imgArray.length;
  if (loadedCounter == loadedMax) {
    clearInterval(loadedInterval);
    setTimeout(function() {
      startAnimating();
    }, 1000);
  }
}

function removeUnderlines() {
  for (var i = 0; i < menuItems.length; i++) {
    $(menuItems[i]).css("textDecoration", "none");
  }
}

function sitesPage() {
  removeUnderlines();
  $("#sites").css("textDecoration", "underline");
  $("#content").html("");
  window.location.hash = "#sites";
  var span = document.createElement("span");
  $(span).attr("id", "sitesListingHeader");
  $(span).text("Websites with commenting removed so far:");
  $("#content").html(span);
  var div = document.createElement("div");
  $(div).attr("id", "sitesListing");
  $(div).html("<br />");
  $("#content").append(div);
  var url = "blocked_sites.txt";
  $.ajax({
    url: url,
    statusCode: {
      200: function(results) {
        var sites = results.split(",").sort();
        for (var i=0; i < sites.length; i++) {
          $(div).append(sites[i] + "<br />");
        }
      }
    }
  });
}

function installPage() {
  window.location.hash = "#install";
  removeUnderlines();
  $("#install").css("textDecoration", "underline");
  var div = document.createElement("div");
  $(div).attr("id", "installText");
  $(div).html("Socknit is a browser extension that &quot;sanitizes&quot; news and entertainment ");
  $(div).append("websites by hiding user comment sections on every page. ");
  var a = document.createElement("a");
  $(a).attr("href", "javascript:aboutPage();");
  $(a).attr("id", "learnMoreButton");
  $(a).html("Learn more.");
  $(div).append("<br />");
  $(div).append(a);
  $(div).append("<br /><br />");
  if (window.chrome) {
    a = document.createElement("a");
    $(a).attr("href", "#");
    $(a).attr("id", "installButton");
    $(a).html("Install Chrome Extension");
    $(a).click(function() {
      installChrome();
    });
    $(div).append(a);
    $(div).append("<br /><br />");
  } else if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
    $(div).append("A FireFox version is under development but not available just yet.<br /><br />");
  } else {
    $(div).append("This browser extension is currently only available for Google Chrome.<br /><br />");
  }
  $("#content").html(div);
}

function requestPage() {
  window.location.hash = "#request";
  removeUnderlines();
  $("#request").css("textDecoration", "underline");
  var div = document.createElement("div");
  $(div).attr("id", "requestDiv");
  $(div).text("Submit a site you'd like added to Socknit's comment filter.");
  $(div).append("<br />");
  $(div).append("A direct link to a specific example article containing the comments you'd like socked would be most helpful.<br /><br />");
  $(div).append("Note: Social media platforms (facebook, twitter) will not be considered, and not all sites are sockable. It depends on how they were designed.");
  $(div).append("<br /><br />");
  var input = document.createElement("input");
  $(input).attr("type", "text");
  $(input).css("color", "#C2C2C2");
  $(input).attr("value", "http://www.somesite.com");
  $(input).attr("id", "siteURL");
  $(input).focus(function() {
    $(this).attr("value", "");
    $(this).css("color", "#000000");
  });
  $(div).append(input);
  input = document.createElement("input");
  $(input).attr("type", "button");
  $(input).attr("value", "submit");
  $(input).click(function() {
    var url = $("#siteURL").val();
    if (url != "" && url != "http://www.somesite.com") {
      $.ajax("mailer.php?type=site&value=" + url)
      .done(function() {
        $("#content").html("Your requested site has been submitted. Thanks.");
      })
      .fail(function() {
        $("#content").html("There was an error submitting your site. Please try again later.");
      });
    }
  });
  $(div).append(input);
  $("#content").html(div);
}

function pushImgToArray(img) {
  objArray.push(img);
}

function aboutPage() {
  window.location.hash = "#about";
  loadedCounter = 0;
  removeUnderlines();
  $("#about").css("textDecoration", "underline");
  var div = document.createElement("div");
  $(div).attr("id", "aboutMovie");
  var img = document.createElement("img");
  $(img).attr("alt", "news story");
  $(img).attr("id", "mainImg");
  $(div).append(img);
  $("#content").html(div);
  div = document.createElement("div");
  $(div).attr("id", "movieText");
  $(div).text("Ever notice how an ordinary news article like this one...");
  $("#content").append(div);
  objArray = [];
  var tmpImg;
  for (var i=0; i < imgArray.length; i++) {
    tmpImg = new Image();
    tmpImg.onload = function() {
      loadedCounter++;
    }
    tmpImg.src = imgArray[i];
    pushImgToArray(tmpImg);
  }
  loadedInterval = setInterval(checkForLoadComplete, 500);
}