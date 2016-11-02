// ===================================================================
// Author: Christopher Manciero <cmanciero@gmail.com>
// WWW: http://www.chrismanciero.com/
//
// NOTICE: You may use this code for any purpose, commercial or
// private, without any further permission from the author. You may
// remove this notice from your final code if you wish, however it is
// appreciated by the author if at least my web site address is kept.
//
// You may *NOT* re-distribute this code in any way except through its
// use. That means, you can include it in your product, or your web
// site, or any other form where the code is actually being used. You
// may not put the plain javascript up on your site for download or
// include it in your javascript libraries for download. 
// If you wish to share this code with others, please just point them
// to the URL instead.
// Please DO NOT link directly to my .js files from your site. Copy
// the files to your server and use them there. Thank you.
// ===================================================================

// These variable are for the horizontal sliding methods
var timerlen = 5;
var slideAniLen = 500;
var timerID = new Array();    
var obj = new Array();
var endLength = new Array();
var moving = new Array();
var dir = new Array();
var startTime = new Array();

// This object slide the elements horizontally (left to right)
function HorizontalSlide(ObjectToSlide,direction){
    //this.ToggleSlide(ObjectToSlide);
	if(direction == "right")
		this.SlideRight(ObjectToSlide);
	else
		this.SlideLeft(ObjectToSlide);
}

/*
    This function sees if object is shown, slide left or if object is hidden, slide right
    Parameters
        objname - name of object to slide
*/
HorizontalSlide.prototype.ToggleSlide = function (objname)
{	
	if(document.getElementById(objname).style.display == "none")
	{
		// div is hidden, so let's slide right
		this.SlideRight(objname);
	}
	else
	{
		// div is not hidden, so slide left
		this.SlideLeft(objname);
	}
};

/*
    This function slides the object right
    Parameters
        objname - name of object to slide
*/
HorizontalSlide.prototype.SlideRight = function (objname)
{
	if(moving[objname])
		return;

//	if(document.getElementById(objname).style.display != "none")
//		return; // cannot slide down something that is already visible

	moving[objname] = true;
	dir[objname] = "right";
	this.StartSlide(objname);
};

/*
    This function slides the object left
    Parameters
        objname - name of object to slide
*/
HorizontalSlide.prototype.SlideLeft = function (objname)
{
	if(moving[objname])
		return;

	if(document.getElementById(objname).style.display == "none")
		return; // cannot slide up something that is already hidden

	moving[objname] = true;
	dir[objname] = "left";
	this.StartSlide(objname);
};

/*
    This function start slidings the object
    Parameters
        objname - name of object to slide
*/
HorizontalSlide.prototype.StartSlide = function (objname)
{
	obj[objname] = document.getElementById(objname);

	endLength[objname] = parseInt(obj[objname].style.width);
	startTime[objname] = (new Date()).getTime();

	if(dir[objname] == "right")
		obj[objname].style.width = "1px";
		
	obj[objname].style.display = "block";

	timerID[objname] = setInterval('HorizontalSlide.prototype.SlideTick(\'' + objname + '\');',timerlen);
};

/* 
    This function checks if the time since the slide started has passed
    the define value for slideAniLen if it hasn't keep sliding
    Parameters
        objname - name of object to slide
*/
HorizontalSlide.prototype.SlideTick = function (objname)
{
	var elapsed = (new Date()).getTime() - startTime[objname];

	if (elapsed > slideAniLen)
		this.EndSlide(objname)
	else 
	{
		var d =Math.round(elapsed / slideAniLen * endLength[objname]);
		if(dir[objname] == "left")
			d = endLength[objname] - d;
		
		obj[objname].style.width = d + "px";
	}
	return;
};

// This function ends the sliding
HorizontalSlide.prototype.EndSlide = function (objname)
{
	clearInterval(timerID[objname]);
 
	if(dir[objname] == "left")
		obj[objname].style.display = "none";
 
	obj[objname].style.width = endLength[objname] + "px";
 
	delete(moving[objname]);
	delete(timerID[objname]);
	delete(startTime[objname]);
	delete(endLength[objname]);
	delete(obj[objname]);
	delete(dir[objname]);

	return;
};