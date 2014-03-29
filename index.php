<!DOCTYPE html>
<html>
<head>
<title>Socknit Browser Extension - Put a Sock-n-it.</title>
<meta name="description" content="Socknit Browser Extension to block annoying news/media article comments.">
<meta name="keywords" content="chrome, firefox, socknit, extension, plugin, browser, block, comments, commentary, news sites, media, youtube, cnn, bbc, fox">
<meta name="author" content="Jonathan Face">
<meta charset="UTF-8">
<link rel="shortcut icon" href="./img/favicon.ico">
<link rel="stylesheet" type="text/css" href="css/main.css">
<link rel="chrome-webstore-item" href="https://chrome.google.com/webstore/detail/pjefaeadmaaefnhmbbnacbijblmmdenc">
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
<!--
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/jquery-ui.min.js"></script>
-->
<script type="text/javascript" src="js/main.js"></script>

</head>
<body>
<div id="pageContent">
<div id="mainBlock">
<div id="menu">
<div id="menuHeader">
<div>
<img src="img/sock_red.png" alt="socknit">
<span style="position:relative;top:-15px;">Socknit Comment Remover</span>
</div>
<div id="subHeader">A Chrome browser extension to hide annoying internet comment sections on popular websites.</div>
</div><br />
<div class="menuItem" id="install" style="text-decoration:underline" onclick="javascript:installPage();">Install</div>
<div class="menuItem" id="about" onclick="javascript:aboutPage();">About</div>
<div class="menuItem" id="sites" onclick="javascript:sitesPage();">List of Sites</div>
<div class="menuItem" id="request" onclick="javascript:requestPage();">Request a Site</div>
</div><br />
<div id="content">
<noscript>Sorry, this site requires JavaScript.</noscript>
</div>
</div>
</div><br />
<footer>Copyright 2013 <a href="http://www.jonathanface.com" target="new">Jonathan Face</a></footer>
</body>
</html>