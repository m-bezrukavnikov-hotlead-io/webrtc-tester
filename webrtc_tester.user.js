// ==UserScript==
// @name         WebRTC Debuger
// @namespace    http://tampermonkey.net/
// @version      0.11
// @description  try to take over the world!
// @author       You
// @match        https://crm.hotlead.io/telephony/web-rtc/sip-accounts
// @match        http://localhost:8080/telephony/web-rtc/sip-accounts
// @downloadURL  https://github.com/m-bezrukavnikov-hotlead-io/webrtc-tester/raw/master/webrtc_tester.user.js
// @updateURL    https://github.com/m-bezrukavnikov-hotlead-io/webrtc-tester/raw/master/webrtc_tester.user.js
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var unsafeWindow = window.wrappedJSObject;

    document.getElementById("webrtc-wrapper").innerHTML += "<div id = 'webrtc-debugger-output' style='max-height: 200px; overflow: auto;'></div>";

    function loop(){
        if (unsafeWindow.webrtcWidget.webrtcBox.phoneEngine.session){
            var from = unsafeWindow.webrtcWidget.webrtcBox.phoneEngine.session._request.from;
            output("_display_name: " + from._display_name + ", _user: " + from._uri._user);
        }
    }

    function output(message){
        document.getElementById("webrtc-debugger-output").innerHTML = message + "<br>" + document.getElementById("webrtc-debugger-output").innerHTML;
    }

    // даём время на установку сессии
    setTimeout(
        setInterval(
            loop, 1000
        ), 3000
    );
})();
