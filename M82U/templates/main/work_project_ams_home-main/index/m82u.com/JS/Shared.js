/***************************** My Ajax Function ***************************************************************/
//function periodUpdateStock(url, freq) {
//    var myAjax = new Ajax.PeriodicalUpdater('tableStock', url,
//	{
//	    method: 'post'
//	    //,insertion: Insertion.replace
//		, frequency: freq
//		, decay: 1
//	});
//}
var _timeout = null;
var timeout = null;
function readStock(url, _t) {
    /*new Ajax.Updater('tableStock', url, { method: 'post' });*/
    jQuery.ajax({
        async: true,
        cache: false,
        url: url,
        beforeSend: showCreate(),
        complete: function (_ort) {
            try {
                $("#tableStock").empty().append(_ort.responseText);
                timeRun(url, _t);
                showComplete();
            }
            catch (ex) {
                alert(ex.toString());
            }
        }
    });
}

function timeRun(url, _t) {
    if (_t != null)
        timeout = _t;

    if (_timeout != null)
        clearTimeout(_timeout);

    _timeout = setTimeout(function () { readStock(url, _t); }, timeout * 1000);
};

function showCreate() {
    if ($("#spinner") != null) {
        $("#spinner").css("width", "32px");
        $("#spinner").css("height", "32px");
        $("#spinner").css("left", "50%");
        $("#spinner").css("top", "30%");
        $("#spinner").css("display", "inline");
        $("#spinner").css("background", "url(../Images/spinner.gif)");
    }
}

function showComplete() {
    $("#spinner").css("display", "none");
}

function _$mouseLT(_obj) {
    var _t = _obj.offsetTop;
    var _l = _obj.offsetLeft;
    while (_obj = _obj.offsetParent) {
        _t += _obj.offsetTop;
        _l += _obj.offsetLeft;
    }
    return { x: _l, y: _t };
}

function btnFullShare(button, mouseOver) {
    if (button != null) {
        if (mouseOver == true)
            button.src = "../Images/" + button.id + "_2.jpg"
        else
            button.src = "../Images/" + button.id + "_1.jpg";
    }

}

function bindData(param) {
    var lstSortBy = document.getElementById("lstSortBy");
    var lstLeague = document.getElementById("lstLeague");
    var lstDay = document.getElementById("lstDay");
    var selectedSortBy = lstSortBy.options[lstSortBy.selectedIndex].value;
    var selectedLeague = lstLeague.options[lstLeague.selectedIndex].value;
    var selectedDay = lstDay.options[lstDay.selectedIndex].value;
    readStock(param + "&sortBy=" + selectedSortBy + "&moduleId=" + selectedLeague + "&day=" + selectedDay);

}

function GetDetailsFC(querystr) {
    ChildWindow = window.open('../FC_HandicapAndOU_Detail.aspx?' + querystr, '', 'width=1000,height=270,top=200,left=400,toolbars=no,scrollbars=yes,status=no,resizable=yes');

}

/*************************************************************************************************************/

// handle call function from Main2.aspx
$(document).mouseup(function (event) {
    if (window.top.location.href.indexOf('Main2.aspx') != -1)
        window.top.tooglePanelLeftRight(event);
});

// Show box request valid for password
$(document).ready(function () {
    $(".containerInfo").on('click', function () {
        $(".containerInfo_content").toggle("fast");
    });
});