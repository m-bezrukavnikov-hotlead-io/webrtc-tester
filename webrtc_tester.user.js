// ==UserScript==
// @name         WebRTC Tester
// @namespace    http://tampermonkey.net/
// @version      0.1.7
// @description  try to take over the world!
// @author       DEMENTOR
// @match        https://crm.hotlead.io/telephony/web-rtc/sip-accounts
// @match        http://localhost:8080/telephony/web-rtc/sip-accounts
// @downloadURL  https://github.com/m-bezrukavnikov-hotlead-io/webrtc-tester/raw/master/webrtc_tester.user.js
// @updateURL    https://github.com/m-bezrukavnikov-hotlead-io/webrtc-tester/raw/master/webrtc_tester.user.js
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // получаем доступ к окну
    var unsafeWindow = window.wrappedJSObject;

    // сразу показываем скрытый блок
    document.getElementById("dialer-call-status").style.display = "block";
    // и скрываем хинт
    document.getElementById("dialer-input-hint").style.display = "none";

    document.getElementById("webrtc-wrapper").innerHTML += "<div id = 'webrtc-debugger-output' style='max-height: 200px; max-width: 400px; overflow: auto;'></div>";

    function loop(){
        if (unsafeWindow.webrtcWidget.webrtcBox.phoneEngine.session){
            var from = unsafeWindow.webrtcWidget.webrtcBox.phoneEngine.session._request.from;
            output("_display_name: " + from._display_name + ", _uri._user: " + from._uri._user);
            document.getElementById("dialer-call-contact").innerHTML = from._display_name;
            document.getElementById("dialer-call-number").innerHTML = from._uri._user;
        } else {
            document.getElementById("dialer-call-contact").innerHTML = null;
            document.getElementById("dialer-call-number").innerHTML = null;
        }
    }

    function output(message){
        document.getElementById("webrtc-debugger-output").innerHTML = message + "<br>" + document.getElementById("webrtc-debugger-output").innerHTML;
    }

    // даём время на установку сессии
    setTimeout(
        setInterval(
            loop, 1000
        ), 5000
    );
})();
