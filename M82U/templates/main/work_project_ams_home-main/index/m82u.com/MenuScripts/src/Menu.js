/*
* Created 20100203@Lee - Left menu page functions
* Revision ?@? - ... 
* 
*/


var currentMenuItem = null;
function ClearCurrentLeftMenu() {
    if (currentMenuItem != null) {
        currentMenuItem.className = 'Bleft_Sub';
    }
}

function MenuItemSelect(index) {
    ClearCurrentLeftMenu();
    if (top.frHeader) {
        if (top.frHeader.ClearActiveTab) {
            top.frHeader.ClearActiveTab();
        }
    }
    
    var menuItem = $('menuitem' + index);
    menuItem.className = 'Bleft_Sub_2';
    currentMenuItem = menuItem;
}

function MenuToggle(index) {
    var subMenu = $('div' + index);
    subMenu.style.display = (subMenu.style.display == 'none') ? 'block' : 'none';
    var aMenu = $('a' + index);
    aMenu.className = (aMenu.className == 'Bleft_Parent') ? 'Bleft_ParentAc' : 'Bleft_Parent';
}


function StopBlinkAccInfoTab() {

}

function ShowFlashAccInfoMaster() {

}

function OpenPage(url, width, height) {
    var wnd = window.open(ibc.GetBaseUrl() + url, 'flashuserguide', 'height=' + height + ',width=' + width + ',menubar=no,status=no,scrollbars=yes,resizable=yes');
    if (typeof window.focus != 'undefined' && wnd) wnd.focus();
    return false;
}

/*function initMenus() {
    $('ul.menu ul').hide();
    $.each($('ul.menu'), function() {
        $('#' + this.id + '.expandfirst ul:first').show();
    });
    $('ul.menu li a').click(
		function() {
		    var checkElement = $(this).next();
		    var parent = this.parentNode.parentNode.id;

		    if ($('#' + parent).hasClass('noaccordion')) {
		        $(this).next().slideToggle('normal');
		        return false;
		    }
		    if ((checkElement.is('ul')) && (checkElement.is(':visible'))) {
		        if ($('#' + parent).hasClass('collapsible')) {
		            $('#' + parent + ' ul:visible').slideUp('normal');
		        }
		        return false;
		    }
		    if ((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
		        $('#' + parent + ' ul:visible').slideUp('normal');
		        checkElement.slideDown('normal');
		        return false;
		    }
		}
	);
}
$(document).ready(function() { initMenus(); });*/