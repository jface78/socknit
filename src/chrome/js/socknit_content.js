var sitesArray = [];
var elementsArray = [];
var domain;
var displayType;
var observer;
var isActive = false;

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.getSites) {
    getSitesList();
    if (!observer) {
      addObserver();
    }
  }
  if (msg.showHidden) {
    isActive = false;
    unhideElements();
  }
  if (msg.hideVisible) {
    isActive = true;
    hideElementIfExists();
  }
  if (msg.checkPageReady) {
    sendResponse(true);
  }
});

function addObserver() {
  observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (isActive) {
        hideElementIfExists();
      }
    });    
  });
  // configuration of the observer:
  var config = { attributes: true, childList: true, characterData: true };
  // pass in the target node, as well as the observer options
  observer.observe(document.body, config);
}

function unhideElements() {
  if (!domain) {
    getSitesList();
    return;
  }
  var matched = false;
  for (var i = 0; i < elementsArray.length; i++) {
    var id = document.getElementById(elementsArray[i]);
    if (id) {
      //id.style.visibility = "visible";
      id.style.display = 'inline';
      matched = true;
    }
    var nodes = document.getElementsByClassName(elementsArray[i]);
    if (nodes.length > 0) {
      for (var s=0; s < nodes.length; s++) {
        nodes[s].style.display = 'inline';
        //nodes[s].style.visibility = "visible";
      }
      matched = true;
    }
  }
  return matched;
}

function notifyExtensionActive() {
  isActive = true;
  chrome.runtime.sendMessage({setIconOn: true}, function(response) {
    //
  });
}
function notifyExtensionInactive() {
  isActive = false;
  chrome.runtime.sendMessage({inactive: true}, function(response) {
    //
  });
}
function notifyExtensionUnsupported() {
  isActive = false;
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
  xmlhttp.open("GET",location.protocol + "//socknit.appspot.com/classes_" + domain + ".txt?cachebust=" + cacheBust, true);
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
  xmlhttp.open("GET", location.protocol + "//socknit.appspot.com/blocked_sites.txt?cachebust=" + cacheBust, true);
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
      id.style.display = "none";
      //id.style.visibility = "hidden";
      matched = true;
    }
    var nodes = document.getElementsByClassName(elementsArray[i]);
    if (nodes.length > 0) {
      for (var s=0; s < nodes.length; s++) {
        displayType = nodes[s].style.display;
        nodes[s].style.display = "none";
        //nodes[s].style.visibility = "hidden";
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