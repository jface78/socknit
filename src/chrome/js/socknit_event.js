var enabled = true;
var supported = true;
var pageLoaded = false;

function getPopup() {
  var popups = chrome.extension.getViews({type: "popup"});
  if (popups.length != 0) {
    return popups[0];
  } else {
    return false;
  }
}

function setPopup() {
  if (!pageLoaded) {
    getPopup().loading();
    checkPageLoaded();
  } else {
    if (!supported) {
      getPopup().unsupported();
    } else if (!enabled) {
      getPopup().disabled();
    } else if (enabled) {
      getPopup().enabled();
    }
  }
}

function initialize() {
  enabled = true;
  supported = true;
  chrome.tabs.getSelected(null, function(tab) {
    var cookie = chrome.cookies.get({ url: tab.url, name: "socknit_disabled" },
        function(cookie) {
          var tmpA = document.createElement("a");
          tmpA.href = tab.url;
          if (!cookie) {
            sendGetSites();
          } else if (tmpA.hostname == cookie.value) {
            enabled = false;
            toggleIcon("off");
            if (getPopup()) {
              getPopup().disabled();
            }
          } else {
            sendGetSites();
          }
        }
    );
  });
}

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.pageReady) {
    pageLoaded = true;
    initialize();
  } else if (msg.unsupported) {
    supported = false;
    if (getPopup()) {
      getPopup().unsupported();
    }
  } else if (msg.setIconOn) {
    enabled = true;
    toggleIcon("on");
    if (getPopup()) {
      getPopup().enabled();
    }
  } else if (msg.inactive) {
    toggleIcon("off");
    enabled = false;
    if (getPopup()) {
      getPopup().disabled();
    }
  }
});

function checkPageLoaded() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {checkPageReady: true}, function(response) {
      pageLoaded = true;
      initialize();
    });  
  });
}

function toggleIcon(value) {
  var path = 'img/sock19_blue.png';
  if (value == "on") {
    path = 'img/sock19_red.png';
    chrome.pageAction.show(tabs[0].id);
  } else if (value == "unsupported") {
    path = 'img/sock19_gray.png';
    chrome.pageAction.show(tabs[0].id);
  }
  chrome.tabs.query({
    currentWindow: true,
    active: true
  }, function(tabs) {
    if(tabs.length === 0) {
      return;
    }
    chrome.browserAction.setIcon({
      path: path,
      tabId: tabs[0].id
    });
  });
}

function sendGetSites() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {getSites: true}, function(response) {});  
  });
}

function showHiddenElements() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {showHidden: true}, function(response) {});  
  });
}

function hideVisibleElements() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {hideVisible: true}, function(response) {});  
  });
}