/*
* Created 20091224@Lee - Core javascript functions and classes
*
* !!!CAUTION: ANY REVISION MUST BE APPROVED BEFORE PROCEEDING!!!
* Revision ?@? - ... 
* 
*/
function $(id) {
    return document.getElementById(id);
}
// Returns the string with all the beginning
// and ending whitespace removed
String.prototype.trim = function() {
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
};

function SetParameterValue(name, value, url) {
    var newParameter = (value != null) ? (name + "=" + value) : null;
    if (!url.contains("?")) {
        url = (newParameter == null) ? url : (url + "?" + newParameter);
        return url;
    }
    // Already contain ?
    var separator = url.contains("?" + name + "=") ? "?" : "&";
    if (!url.contains("&" + name + "=") && !url.contains("?" + name + "=")) {
        url = (newParameter == null) ? url : (url + "&" + newParameter);
        return url;
    }
    else {
        var i1 = url.indexOf(separator + name + "=");
        var tmp = url.substr(i1);
        var i2 = tmp.indexOf("&", 1);
        var oldParameter = i2 >= 0 ? url.substr(i1, i2) : tmp;
        url = url.replace(oldParameter, (newParameter == null) ? null : (separator + newParameter));
        return url;
    }
}

function GetParameterValue(name, url) {
    if (null == url || null == name || 0 == name.length) return null;
    var urlToCompare = url.toLowerCase();
    name = name.toLowerCase();
    var separator = urlToCompare.contains("?" + name + "=") ? "?" : "&";
    var parameter = separator + name + "=";
    var i1 = urlToCompare.indexOf(parameter);
    if (i1 == -1) return null;
    var tmp = url.substr(i1);
    var i2 = tmp.indexOf("&", 1);
    var value = i2 >= 0 ? tmp.substr(parameter.length, i2 - parameter.length) : tmp.substr(parameter.length);
    return value;
}
String.prototype.contains = function(sub) {
    return this.indexOf(sub, 0) != -1;
}
// Detect browser

function isIE() {
    return /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent);
}
IE = isIE();
// Cookie

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function setCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else
        var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}
// Manipulate style sheet class name

function HasClassName(element, className) {
    if (typeof element == 'string') element = $(element);
    var elementClassName = element.className;
    if (typeof elementClassName == 'undefined') return false;
    return (elementClassName.length > 0 && (elementClassName == className || new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName)));
}

function AddClassName(element, className) {
    if (typeof element == 'string') element = $(element);
    if (!HasClassName(element, className)) element.className += (element.className ? ' ' : '') + className;
    return element;
}

function RemoveClassName(element, className) {
    if (typeof element == 'string') element = $(element);
    var elementClassName = element.className;
    if (typeof elementClassName == 'undefined') return false;
    element.className = element.className.replace(
    new RegExp("(^|\\s+)" + className + "(\\s+|$)"), ' ');
    return element;
}
// !!!IMPORTANT: This function is reserved for system management, do not use it.

function _addEvent(el, evname, func) {
    if (!el) return;
    if (el.attachEvent) { // IE
        el.attachEvent("on" + evname, func);
    }
    else if (el.addEventListener) { // Gecko / W3C
        el.addEventListener(evname, func, true);
    }
    else { // Opera (or old browsers)
        el["on" + evname] = func;
    }
}
// Prototype of IBC

function IBC()
{ };
// !!!IMPORTANT: isSingle = true if you want just one function for this event
IBC.prototype.addEvent = function(el, evname, func, isSingle) {
    if (!el) return;
    if (el.attachEvent && isSingle != true) { // IE
        el.attachEvent("on" + evname, func);
    }
    else if (el.addEventListener && isSingle != true) { // Gecko / W3C
        el.addEventListener(evname, func, true);
    }
    else { // Opera (or old browsers)
        el["on" + evname] = func;
    }
}
IBC.prototype.removeEvent = function(el, evname, func) {
    if (!el) return;
    if (el.detachEvent) { // IE
        el.detachEvent("on" + evname, func);
    }
    else if (el.removeEventListener) { // Gecko / W3C
        el.removeEventListener(evname, func, true);
    }
    else { // Opera (or old browsers)
        el["on" + evname] = null;
    }
}
IBC.prototype.stopEvent = function(ev) {
    if (IE) {
        window.event.cancelBubble = true;
        window.event.returnValue = false;
    }
    else {
        ev.preventDefault();
        ev.stopPropagation();
    }
    return false;
};
// Create a html element
IBC.prototype.createElement = function(type, parent) {
    var el = null;
    if (document.createElementNS) {
        // use the XHTML namespace; IE won't normally get here unless
        // _they_ "fix" the DOM2 implementation.
        el = document.createElementNS("http://www.w3.org/1999/xhtml", type);
    }
    else {
        el = document.createElement(type);
    }
    if (typeof parent != "undefined") {
        parent.appendChild(el);
    }
    return el;
}
// Which element is nearer origin Oxy
IBC.prototype.beforeElement = function(o1, o2) {
    if (typeof o2 == 'undefined') return o1;
    if (typeof o1 == 'undefined') return o2;
    // Tto get offset position
    o1.style.position = 'relative';
    o2.style.position = 'relative';
    // Compare distance from origin
    var d1 = o1.offsetTop * o1.offsetTop + o1.offsetLeft * o1.offsetLeft;
    var d2 = o2.offsetTop * o2.offsetTop + o2.offsetLeft * o2.offsetLeft;
    if (d1 > d2) return o2;
    else
        return o1;
}
// Find first form element in px position with tag name
IBC.prototype.firstFormElement = function(tag) {
    var items = document.getElementsByTagName(tag);
    if (items.length > 0) {
        var c = items.length > 5 ? 5 : items.length;
        for (var i = 0; i < c; i++) {
            if (!items[i].getAttribute('noFocus') && // property indicate do not focus on this item
            !items[i].disabled && items[i].type != 'hidden' && !items[i].readonly && items[i].type != 'checkbox' && items[i].type != 'radio') {
                return items[i];
            }
        }
    }
}
// Calculate view area
IBC.prototype.CalculateViewport = function() {
    this.viewport = function()
    { };
    if (!IE) {
        // in standards compliant mode (i.e. with a valid doctype as the first line in the document)
        if (typeof document.documentElement != 'undefined' && typeof document.documentElement.scrollWidth != 'undefined' && document.documentElement.scrollWidth != 0) {
            this.viewport.width = document.documentElement.scrollWidth;
            this.viewport.height = document.documentElement.scrollHeight;
        }
        this.viewport.width = Math.max(this.viewport.width, (Math.max(document.body.scrollWidth, document.body.clientWidth)));
        this.viewport.height = Math.max(this.viewport.height, (Math.max(document.body.scrollHeight, document.body.clientHeight)));
    }
    else {
        // in standards compliant mode (i.e. with a valid doctype as the first line in the document)
        if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
            this.viewport.width = document.documentElement.clientWidth;
            this.viewport.height = document.documentElement.clientHeight;
        }
        this.viewport.width = Math.max(document.body.scrollWidth, this.viewport.width);
        this.viewport.height = Math.max(document.body.scrollHeight, this.viewport.height);
    }
}
// Create a mask div will cover whole page
IBC.prototype.CreateMaskDiv = function() {
    this.divMaskLoading = this.createElement("div");
    var div1 = this.createElement("div");
    div1.style.width = '100px';
    div1.style.height = '100px';
    div1.style.position = 'relative';
    this.divMaskLoading.style.display = 'none';
    this.divMaskLoading.style.position = 'absolute';
    this.divMaskLoading.style.top = '0px';
    this.divMaskLoading.style.left = '0px';
    this.divMaskLoading.style.filter = 'alpha(opacity=50)';
    this.divMaskLoading.style.opacity = '0.5';
    this.divMaskLoading.style.backgroundColor = 'white';
    this.divMaskLoading.appendChild(div1);
    document.body.appendChild(this.divMaskLoading);
}
IBC.prototype.RemoveBookmarksInUrl = function(url) {
    if (typeof url != 'string') return null;
    var i = url.indexOf('#');
    if (i == -1) return url;
    return url.substr(0, i);
}
// Show a mask div cover whole page
IBC.prototype.ShowMaskDiv = function(withIcon) {
    if (!this.divMaskLoading) return;
    this.CalculateViewport();
    this.divMaskLoading.style.width = (this.viewport.width - 2) + 'px';
    this.divMaskLoading.style.height = (this.viewport.height - 2) + 'px';
    this.divMaskLoading.firstChild.style.left = Math.floor(this.viewport.width / 2) + 'px';
    this.divMaskLoading.firstChild.style.top = document.documentElement.scrollTop + 'px';
    this.divMaskLoading.firstChild.className = withIcon ? 'MaskLoadingDiv' : '';
    this.divMaskLoading.style.display = 'block';
}
// Hide showed mask div
IBC.prototype.HideMaskDiv = function() {
    if (!this.divMaskLoading) return;
    this.divMaskLoading.style.display = 'none';
}
IBC.prototype.ReloadPage = function(time) {
    var ibc = new IBC();
    this.ShowMaskDiv(true);
    var delay = time ? time : 2000;
    this.delayTimer = setTimeout("ibc.HideMaskDiv()", delay);
}
// Reload page with provided url and delay time
IBC.prototype.DelayReloadPage = function(url, time) {
    this.ShowMaskDiv(true);
    var delay = time ? time : 2000;
    if (!url) {
        location.nextUrl = this.RemoveBookmarksInUrl(location.href);
        this.delayTimer = setTimeout("location = location.nextUrl", delay);
    }
    else {
        this.delayTimer = setTimeout("location = '" + url + "'", delay);
    }
}
// Catch enter event and do the action, using by onkeydown="ibc.DoEnter(...)"
IBC.prototype.DoEnter = function(evt, action) {
    if (null == ibc) return;
    if (IE) {
        if (window.event.keyCode == 13) eval(action);
    }
    else {
        if (evt.keyCode == 13) eval(action);
    }
}
IBC.prototype.Lock = function(withIcon) {
    this.ShowMaskDiv(withIcon);
    this.locked = true;
}
IBC.prototype.UnLock = function() {
    this.HideMaskDiv();
    this.locked = false;
}
// Refresh whole site to update session, cookies...
IBC.prototype.Refresh = function() {
    var wnd = window.parent;
    while (wnd != wnd.parent) // Jump out
    {
        wnd = wnd.parent;
    }
    wnd.location = wnd.location.href;
}
IBC.prototype.GetBaseUrl = function() {
    var url = window.location.href;
    var mark = '))/';
    var end = url.indexOf(mark);
    if (end == -1) {
        var slashNum = 3; // Public site
        if (url.indexOf('.com') == -1 || url.indexOf('.net') == -1 || url.indexOf('.org') == -1) slashNum = 4; // Local site
        end = 0;
        for (var i = 0; i < slashNum; i++) {
            end = url.indexOf('/', end + 1);
            if (end == -1) return null;
        }
        end++;
    }
    else {
        end += mark.length;
    }
    return url.substr(0, end);
}
IBC.prototype.GetQueryString = function(key, defaultValue) {
    if (defaultValue == null) defaultValue = "";
    key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
    var qs = regex.exec(window.location.href);
    if (qs == null) return defaultValue;
    else
        return qs[1];
} /*End*/
/*
* Created 20091224@Lee - Light ajax library
*
*!!!CAUTION: ANY REVISION MUST BE APPROVED BEFORE PROCEEDING!!!
* Revision ?@? - ... 
* 
*/
//jx.request(url,function(result){...},method,params,async);
//method:post,get
//async:true,false
//params:a string, an object or an array
jx = {
    toQueryString: function(obj) {
        if (typeof obj == 'object') {
            var arr = new Array();
            for (var att in obj) {
                arr.push(att + '=' + eval('obj.' + att));
            }
            return arr.join('&');
        }
        else if (typeof obj == 'string') {
            return obj.replace('?', '');
        }
        else {
            return obj;
        }
    },
    getHTTPObject: function() {
        var A = false;
        if (typeof ActiveXObject != "undefined") {
            try {
                A = new ActiveXObject("Msxml2.XMLHTTP")
            }
            catch (C) {
                try {
                    A = new ActiveXObject("Microsoft.XMLHTTP")
                }
                catch (B) {
                    A = false
                }
            }
        }
        else {
            if (window.XMLHttpRequest) {
                try {
                    A = new XMLHttpRequest()
                }
                catch (C) {
                    A = false
                }
            }
        }
        return A
    },
    request: function(url, callback, method, params, async) {
        var http = this.init();
        if (!http || !url || !method) {
            return
        }
        method = method.toUpperCase();
        if (typeof async == "undefined") async = true;
        var isGet = (method == "GET");
        var ch = (url.indexOf("?") == -1) ? "?" : "&";
        http.open(method, (isGet && typeof params != "undefined") ? url + ch + this.toQueryString(params) : url, async);
        http.onreadystatechange = function() {
            if (http.readyState == 4) {
                if (http.status == 200) {
                    var result = http;
                    if (callback && async) {
                        callback(result, http.getResponseHeader('Date'))
                    }
                }
                else { /*alert(http.statusText)*/
                }
            }
        }; if (!isGet) {
            http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            if (typeof params != "undefined") http.setRequestHeader("Content-length", params.length);
            http.setRequestHeader("Connection", "close");
        };
        http.send(isGet ? null : this.toQueryString(params));
        return http;
        if (!async) callback(http);
    },
    init: function() {
        return this.getHTTPObject()
    }
}
// Ajax class

function AJAX()
{ };
AJAX.prototype.Request = function(url, options) {
    //url:'url?var1=val1&var2=val2...'
    //options:{method:'get/post',asynchronous:true/false,parameters:'var3=val3&var4=val4',onComplete:function(data){}}
    var method = 'post';
    var callback = 'void(0)',
        params = null;
    var async = true;
    if (options) {
        if (typeof options.method != 'undefined') method = options.method;
        if (typeof options.parameters != 'undefined') params = options.parameters;
        if (typeof options.onComplete != 'undefined') callback = options.onComplete;
        else if (typeof options.onSuccess != 'undefined') callback = options.onSuccess;
        if (typeof options.asynchronous != 'undefined') async = options.asynchronous;
    }
    return jx.request(url, callback, method, params, async);
}
//JSON Get
//JSON Post
//asynchronous=true
AJAX.prototype.CreateParams = function() {
    // Create params string from array of element id
    var params = new Array();
    var c = arguments.length;
    for (var i = 0; i < c; i++) {
        var element = document.getElementById(arguments[i]);
        var query = element.name;
        if (null == query || '' == query) {
            query = element.id;
        }
        var value = null;
        if (element.tagName == 'INPUT') {
            if (element.type == 'checkbox' || element.type == 'radio') value = element.checked;
            else
                value = element.value;
        }
        else if (element.tagName == 'SELECT') value = element.value;
        if (null != value) params.push(query + '=' + escape(value));
    }
    return params.join('&');
}

AJAX.prototype.CreateParams2 = function(ids) {
    // Create params string from array of element id
    var params = new Array();
    var c = ids.length;
    for (var i = 0; i < c; i++) {
        var element = document.getElementById(ids[i]);
        var query = element.name;
        if (null == query || '' == query) {
            query = element.id;
        }
        var value = null;
        if (element.tagName == 'INPUT') {
            if (element.type == 'checkbox' || element.type == 'radio') value = element.checked;
            else
                value = element.value;
        }
        else if (element.tagName == 'SELECT') value = element.value;
        if (null != value) params.push(query + '=' + escape(value));
    }
    return params.join('&');
}

AJAX.prototype.GetJSON = function(url, callback, async) {
    var callback1 = function(result) {
        var data = '({"errCode":-1})';
        if (result.getResponseHeader("Content-type").indexOf("text/plain") != -1) {
            data = '(' + result.responseText + ')';
        }
        var obj = eval(data);
        callback(obj);
    }
    if (typeof async != 'boolean') async = true;
    return jx.request(url, callback1, 'GET', null, async);
}
AJAX.prototype.PostJSON = function(url, params, callback, async) {
    var callback1 = function(result) {
        var data = '({"errCode":-1})';
        if (result.getResponseHeader("Content-type").indexOf("text/plain") != -1) {
            data = '(' + result.responseText + ')';
        }
        var obj = eval(data);
        callback(obj);
    }
    if (typeof async != 'boolean') async = true;
    return jx.request(url, callback1, 'POST', params, async);
}
// Init ajax object
ajax = new AJAX(); /**************OPEN START-UP SECTION**************/
_page = {}; // root JSON object
var _startupCommands = new Array();

function RegisterStartUp(command) {
    _startupCommands.push(command);
}
// Delay init object to window.onload event to boots up performance
ibc = null;
ajax = null;

function _startup() {
    // $ function
    window.$ = $;
    if (typeof window.parent.$ == 'undefined') {
        window.parent.$ = function(id) {
            return this.document.getElementById(id);
        }
    }
    ibc = new IBC();
    ajax = new AJAX();
    // Focus at startup
    if (typeof _focusElementId == 'undefined') {
        var input = ibc.firstFormElement("input");
        var select = ibc.firstFormElement("select");
        var item = ibc.beforeElement(input, select);
        try {
            if (item) item.focus();
        }
        catch (e)
        { }
    }
    else if (_focusElement != -1) {
        var _focusElement = $(_focusElementId);
        if (_focusElement != null && typeof _focusElement == 'object') _focusElement.focus();
    }
    // Create div
    ibc.CreateMaskDiv();
    // Calculate width and height of view port
    ibc.CalculateViewport();
    // Execute startup commands
    var commands = _startupCommands.join(';');
    eval(commands);
    window.loaded = true;
}
_addEvent(window, "load", _startup); /************CLOSE START-UP SECTION*****************/
/*
* Created 20091224@Lee - Common business javascript functions
* Revision ?@? - ... 
* 
*/
// Frameset
// top.menu, top.main, top.frHeader, top.frFooter
// Error code
var UNKNOWN = -1;
var ACCESS_DENIED = 1;
var ACCOUNT_CLOSED = 2;
var KICKED_OUT = 3;
var UNDER_MAINTENANCE = 4;
// Reload frames to update language or configuration
IBC.prototype.Invalidate = function() {
    top.menu.location = ibc.RemoveBookmarksInUrl(top.menu.location.href);
    top.frHeader.location = ibc.RemoveBookmarksInUrl(top.frHeader.location.href);
    top.main.location = ibc.RemoveBookmarksInUrl(top.main.location.href);
    top.frFooter.location = ibc.RemoveBookmarksInUrl(top.frFooter.location.href);
}
// SignOut
IBC.prototype.SignOut = function() {
    var index = window;
    while (index != index.parent) // Jump out
    {
        index = index.parent;
    }
    index.location = this.GetBaseUrl() + '_Authorization/Handlers/SignOut.ashx';
    if (index.location.href.indexOf('http://intagent.ibc88.com/') == 0) {
        index.close();
    }
}
// Password must be at least 6 in length and at least 2 characters and 2 digits

function IsPassWord(str) {
    numbers = "0123456789";
    var i = 0;
    var nCount = 0;
    while (i < str.length) {
        (numbers.indexOf(str.substring(i, i + 1)) >= 0) ? nCount++ : false;
        i++;
    }
    return ((nCount > (str.length - 2)) || nCount < 2 || str.length < 6) ? false : true;
}
// Add popup height when show error
var _preHeight = 0;

function AddPopupHeight(h) {
    ibcWnd = parent.ibcWnd;
    if (typeof ibcWnd == 'undefined') return;
    if (_preHeight == 0) {
        _preHeight = ibcWnd.height;
    }
    ibcWnd.setRect(null, null, ibcWnd.width, _preHeight + h);
}

function OpenIPInfo(ip) {
    ibcWnd.open(ibc.GetBaseUrl() + '_IPInfo/IpInfo.aspx?ip=' + ip, '', 500, 250, 400, 150);
} /*End*/



