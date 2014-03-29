var bg;

function loading() {
  document.querySelector('#controls').innerHTML = "Loading...";
}

function unsupported() {
  document.querySelector('#controls').innerHTML = "Nothing to hide on this page or site unsupported.";
}

function enabled() {
  document.querySelector('#controls').innerHTML = "";
  var label = document.createElement("label");
  label.id = "enableToggle";
  label.innerHTML = "Enabled for this site&nbsp;";
  var input = document.createElement("input");
  input.type = "checkbox";
  input.id = "socknitEnabled";
  input.checked = true;
  label.appendChild(input);
  document.querySelector("#controls").appendChild(label);
  setupControls();
}

function disabled() {
  document.querySelector('#controls').innerHTML = "";
  var label = document.createElement("label");
  label.id = "enableToggle";
  label.innerHTML = "Enabled for this site&nbsp;";
  var input = document.createElement("input");
  input.type = "checkbox";
  input.id = "socknitEnabled";
  input.checked = false;
  label.appendChild(input);
  document.querySelector("#controls").appendChild(label);
  setupControls();
}

function setupControls() {
  document.querySelector('#socknitEnabled').addEventListener('change', function() {
    if (bg.enabled) {
      bg.enabled = false;
      bg.toggleIcon("off");
      chrome.tabs.getSelected(null, function(tab) {
        var tmpA = document.createElement ('a');
        tmpA.href   = tab.url;
        chrome.cookies.set({ url: tab.url, name: "socknit_disabled", value: tmpA.hostname });
        bg.showHiddenElements();
      });
    } else {
      bg.enabled = true;
      bg.toggleIcon("on");
      chrome.tabs.getSelected(null, function(tab) {
        chrome.cookies.remove({ url: tab.url, name: "socknit_disabled" });
      });
      bg.hideVisibleElements();
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  chrome.runtime.getBackgroundPage(function(page) {
    bg = page;
    bg.pageLoaded = false;
    bg.setPopup();
  });
});

