var sitesArray = [];
var elementsArray = [];
var domain;
var displayType = "";

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.getSites) {
    getSitesList();
  }
  if (msg.showHidden) {
    unhideElements();
  }
  if (msg.hideVisible) {
    hideElementIfExists();
  }
  if (msg.checkPageReady) {
    sendResponse(true);
  }
});

function unhideElements() {
  if (!domain) {
    getSitesList();
    return;
  }
  var matched = false;
  for (var i = 0; i < elementsArray.length; i++) {
    var id = document.getElementById(elementsArray[i]);
    if (id) {
      id.style.visibility = "visible";
      id.style.display = displayType;
      matched = true;
    }
    var nodes = document.getElementsByClassName(elementsArray[i]);
    if (nodes.length > 0) {
      for (var s=0; s < nodes.length; s++) {
        nodes[s].style.visibility = "visible";
        nodes[s].style.display = displayType;
      }
      matched = true;
    }
  }
  return matched;
}

function notifyExtensionActive() {
  chrome.runtime.sendMessage({setIconOn: true}, function(response) {
    //
  });
}
function notifyExtensionInactive() {
  chrome.runtime.sendMessage({inactive: true}, function(response) {
    //
  });
}
function notifyExtensionUnsupported() {
  chrome.runtime.sendMessage({unsupported: true}, function(response) {
    //
  });
}

function getElementsList() {
  var cacheBust = Math.random(0,9999);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      elementsArray = xmlhttp.responseText.split(",");
      if (hideElementIfExists()) {
        notifyExtensionActive();
      } else {
        notifyExtensionUnsupported();
      }
    }
  }
  xmlhttp.open("GET","http://socknit.appspot.com/classes_" + domain + ".txt?cachebust=" + cacheBust, true);
  xmlhttp.send();
}

function getSitesList() {
  var cacheBust = Math.random(0,9999);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      sitesArray = xmlhttp.responseText.split(",");
      if (domainMatches()) {
        getElementsList();
      } else {
        notifyExtensionUnsupported();
      }
    }
  }
  xmlhttp.open("GET","http://socknit.appspot.com/blocked_sites.txt?cachebust=" + cacheBust, true);
  xmlhttp.send();
}

function hideElementIfExists() {
  if (!domain) {
    getSitesList();
    return;
  }
  var matched = false;
  for (var i = 0; i < elementsArray.length; i++) {
    var id = document.getElementById(elementsArray[i]);
    if (id) {
      displayType = id.style.display;
      id.style.visibility = "hidden";
      id.style.display = "none";
      matched = true;
    }
    var nodes = document.getElementsByClassName(elementsArray[i]);
    if (nodes.length > 0) {
      for (var s=0; s < nodes.length; s++) {
        nodes[s].style.visibility = "hidden";
        nodes[s].style.display = "none";
      }
      matched = true;
    }
  }
  return matched;
}

function domainMatches() {
  var host = window.location.host;
  var tmpA = document.createElement("a");
  tmpA.href = host;
  host = tmpA.hostname;
  for (var i = 0 ; i < sitesArray.length; i++) {
    if (host.indexOf(sitesArray[i]) > -1) {
      domain = host.substr(host.indexOf(sitesArray[i]), sitesArray[i].length);
      return true;
    }
  }
  return false;
}

function extractDomain() {
  var host = window.location.host;
  var tmpA = document.createElement("a");
  tmpA.href = host;
  host = tmpA.hostname;
  if (host.indexOf("co.uk") > -1) {
    var tmpArray = host.split(".");
    var newHost;
    for (var i = 0; i < tmpArray.length-2; i++) {
      newHost += tmpArray[i] + ".";
    }
    host = newHost;
  }
  var lastDotPoint = host.lastIndexOf(".");
  if (lastDotPoint) {
    var startPoint = 0;
    for (i=lastDotPoint-1; i > 0; i--) {
      if (host.charAt(i) == ".") {
        startPoint = i+1;
        i = 0;
      }
    }
    return host.substring(startPoint, lastDotPoint);
  } else {
    return host;
  }
}

chrome.runtime.sendMessage({pageReady: true}, function(response) {
    //
});