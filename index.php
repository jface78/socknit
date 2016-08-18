<!DOCTYPE html>
<html lang="en-US">
  <head>
    <title>Socknit Comment Blocker</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="Author" content="Socknit.com">
    <meta name="Description" content="Chrome plug-in to block annoying comment sections on news websites.">
    <meta name="Keywords" content="news, comments, blocker, block, article, articles, extension, plugin, sanitizer">
    <meta name="google-site-verification" content="tCzoBF12FHdMffuuznVpxgh0bMdnLVl4tVIUKmzLJ0k" />
    <link rel="chrome-webstore-item" href="https://chrome.google.com/webstore/detail/pjefaeadmaaefnhmbbnacbijblmmdenc">
    <link rel="shortcut icon" href="img/favicon.ico.png" />
    <link rel="stylesheet" href="css/owl.carousel.css" type="text/css">  
    <link rel="stylesheet" type="text/css" href="css/jquery-ui.min.css">
    <link rel="stylesheet" type="text/css" href="css/jquery-ui.theme.min.css">
    <link rel="stylesheet" type="text/css" href="css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="css/main.css" type="text/css">

    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/owl.carousel.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/s/ju-1.11.4/dt-1.10.10/datatables.min.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
  </head>
  <body>
      <header>
        <div class="title">
          <a href="#homeframe">
            <img style="vertical-align:middle;" src="img/header.png" title="socknit article comment blocker" alt="socknit logo">
            <span class="logotext">ARTICLE<br>COMMENT<br>BLOCKER</span>
          </a>
        </div>
        <div class="menu">
          <ul>
            <li><a href="#huhframe" title="(about)">Huh?</a></li>
            <li><a href="#whichframe" title="(list of blocked sites)">Which?</a></li>
            <li><a href="#howframe" title="(submit a site)">How?</a></li>
          </ul>
        </div>
      </header>
      <div class="frame" style="background-color:#CCFFCC;" id="homeframe">
        <main>
          <div style="text-align:center;">
            <img src="img/logo.png">
          </div>
          <div style="font-size:36px;">Blocking annoying comment sections since 2013</div>
          <div style="padding:50px;margin-top:50px;" id="installDiv"><a href="#" id="installButton">Install Chrome Extension</a></div>
        </main>
      </div>
      <div class="frame" style="background-color:#FFFFCC;" id="huhframe">
        <main>
          <div style="font-size:36px;">
          Socknit is a Chrome extension that "sanitizes" news and entertainment websites by hiding user comment sections on every page.
          </div>
          <div class="owl-carousel">
            <div class="item"><img src="img/screenshot_01.jpg" alt="demo"><h4>1</h4></div>
            <div class="item"><img src="img/screenshot_02.jpg" alt="demo"><h4>2</h4></div>
            <div class="item"><img src="img/screenshot_03.jpg" alt="demo"><h4>3</h4></div>
          </div>
          <div style="font-size:14px;">See, 'cause it puts a sock in it... get it :(</div>
        </main>
      </div>
      <div class="frame" style="background-color:#ffd4e5;" id="whichframe">
        <main>
          <div id="sitesCount" style="margin-bottom:10px;font-size:18px;font-weight:bold;"></div>
          <table id="sitesList">
            <thead>
              <tr>
                <th>Site Name</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </main>
      </div>
      <div class="frame" style="background-color:#dbdcff;" id="howframe">
        <main>
          <div>
            Submit a site you'd like added to Socknit's comment filter.
A direct link to a specific example article containing the comments you'd like socked would be most helpful.
<br><br>
Note: Social media platforms (facebook, twitter) will not be considered, and not all sites are sockable. It depends on how they were designed.
<br><br>
<span class="formLabel">Domain: </span>
            <input id="url" type="text" >
            <a href="#" id="submitLinkButton">Submit</a><br><br>
            <div id="formResults" style="font-weight:bold;"></div>
          </div>
        </main>
      </div>
  </body>
</html>