/**
 * Data Retriving
 */
var lang;

function init2(){
	lineLog("init2!");
	
	lang = window.navigator.language;
	lineLog("lang of browser: "+ window.navigator.language);

	

}

function onDeviceReady2() {
	lineLog("device is ready2!");
	
	document.addEventListener("backbutton", onBackKeyDown2, false); 
	lineLog("initpreview is ready2!"); 
	initPreview();
	
	
} 

//Handle the back button

function onBackKeyDown2() {  
	navigator.app.backHistory();

}



function onDeviceReady() {	
	lineLog("device is ready1");
	document.addEventListener("backbutton", onBackKeyDown, false);
	/*networkState = navigator.connection.type;
	
	if (networkState == Connection.NONE){
		alert("Please check your Internet Connection!");
	}*/
	initPreview();
	
} 

//Handle the back button

function onBackKeyDown() { 
	var sPath = window.location.pathname;
	lineLog("BACK BUTTON PRESSED "+sPath);
	//document.getElementById('stylesheet').href = 'css/jquery.mobile-1.2.0.min.css';
	
//	if(lang == 'tr'){
//		$.mobile.changePage( "ExitDialog_tr.html", {
//			transition: "pop",
//			reverse: false,
//			changeHash: false
//		});
//	}
	var hasRated = localStorage.getItem("hasRated");

	if(!!hasRated)
	{
		lineLog("NOT NULL "+ hasRated);
		exitDialog();
	}
	else
	{
		lineLog("NULL "+ hasRated);
		rateUsDialog();
			
	}
	
	
}

function rateUsDialog(){
	  navigator.notification.confirm(
            "Just a click away to give us some motivation to create cooler wallpapers! Once you rate us, pop up won't appear again!",  // message
            onConfirmRate,              // callback to invoke with index of button pressed
            'Rate Us!',            // title
            'Postpone,Rate Us'          // buttonLabels
        );
	//showDialog("Rate Us!","Just a click away to give us some motivation to create cooler wallpapers! Once you rate us, pop up won't appear again! <p><a href =\"#\" onclick=\"postponeButtonPressed()\"><img class='button' src='css/images/postpone_button.png' /></a>   <a href =\"#\" onclick=\"rateUsButtonPressed()\"><img class='button' src='css/images/rate_us_button.png' /></a></p>","error");
}
function exitDialog(){
	 navigator.notification.confirm(
            "Are you sure you wanna exit? Come back to check for new HD Wallpapers!",  // message
            onConfirmExit,              // callback to invoke with index of button pressed
            'Come Back!',            // title
            'Cancel,Exit'          // buttonLabels
     );
	//showDialog("Exit","Are you Sure you wanna exit?Come back to check for new HD Wallpapers! <p><a href =\"#\" onclick=\"cancelButtonPressed()\"><img class='button' src='css/images/cancel_button.png' /></a> <a href =\"#\" onclick=\"exitButtonPressed()\"><img class='button' src='css/images/exit_button.png' /></a></p>","error");
}
function onConfirmExit(button){
	if (button == 1){
		lineLog("cancel is pressed");
	}
	else if (button == 2){
		exitButtonPressed();
	}
}

function onConfirmRate(button){
	//alert("you selected" + button);
	if (button == 1){
		postponeButtonPressed();
	}
	else if(button == 2)
	{
		rateUsButtonPressed();
	}
}
function rateUsButtonPressed(){
	lineLog("rateus button pressed");
	localStorage.setItem("hasRated", "Y");
	try{
		window.location.href="market://details?id=com.ketchapp.wallpaperheaven";
	}
	catch(err){
		window.location.href="https://play.google.com/store/apps/details?id=com.ketchapp.wallpaperheaven";
	}
	
}

function postponeButtonPressed(){
	lineLog("postpone is pressed");
	exitDialog();
}

function exitButtonPressed(){
	
	lineLog("exit is pressed");
	closeApp();
}

function cancelButtonPressed(){

	lineLog("cancel is pressed");
	hideDialog();

}


function closeApp(){
	navigator.app.exitApp();
}


//Show a custom confirmation dialog

function showConfirm() {
	navigator.notification.confirm(
			'<img border="0" src="t1.jpg" />Are you sure to exit?',  // message
			onConfirmExit,              // callback to invoke with index of button pressed
			'Rate Us',            // title
			'RateUs,No,Yes'          // buttonLabels
	);
}

function lineLog(LINE){
	//console.log("DEBUG_MODE: " + LINE);
}

function callNativePlugin( returnSuccess ) { 
	TestPlugin.callNativeFunction( nativePluginResultHandler, nativePluginErrorHandler, returnSuccess ); 
} 
function onConfirm(button){
	
}
function nativePluginResultHandler (result) { 
	lineLog("setaswallpaper success:"+result);
	sureHesapla();
	spinner5.stop();
	removeDarken();
	//alert("Your Wallpaper has changed!" );
	//navigator.notification.beep(2);
	  navigator.notification.confirm(
        'Your Wallpaper has changed!',  // message
        onConfirm,              // callback to invoke with index of button pressed
        'Change',            // title
        'Ok'          // buttonLabels
    );
	
} 
function nativePluginErrorHandler (error) { 
	alert("ERROR: \r\n"+error ); 
} 
 
function doIntAdmob( returnSuccess2 ) { 
	
	ConnPlugin.callNativeFunction( nativePluginResultHandler2, nativePluginErrorHandler2, returnSuccess2 ); 
	//alert("return success"+returnSuccess2);
	
} 
function nativePluginResultHandler2 (result) { 
	//alert("yes received");
	nativeReturn = true;
	return nativeReturn;
	//alert("nativeReturn "+nativeReturn);
	
} 
function nativePluginErrorHandler2 (error) { 
	//alert("not received");
	nativeReturn = false;
	return nativeReturn;
	//alert("nativeReturn "+nativeReturn);
} 
function checkIfAdOnScreen( returnSuccess3 ) { 
	
	AdPlugin.callNativeFunction( nativePluginResultHandler3, nativePluginErrorHandler3, returnSuccess3 ); 
	
} 
function getVersionCode(returnSuccess4){
	Version.getVersionCode( nativePluginResultHandler4, nativePluginErrorHandler4, returnSuccess4 ); 

}
function nativePluginResultHandler3 (result) { 
	window.localStorage.setItem("checkAd", result);
} 
function nativePluginErrorHandler3 (error) { 
	//alert("not received");
	//alert("nativeReturn "+nativeReturn);
	alert("error:"+error);
} 
function nativePluginResultHandler4 (result) { 
	//alert("success:"+result);
	CURRENT_VERSION = result; 
	return result;
} 
function nativePluginErrorHandler4 (error) { 
	//alert("not received");
	//alert("nativeReturn "+nativeReturn);
	alert("error:"+error);
	return error;
} 
function clearSession(){
	window.localStorage.setItem("checkAd", "false");
	window.localStorage.removeItem("pageNumber");
	window.localStorage.removeItem("categoryNumber");
	lineLog("cleared");
}
function checkAdReceived(){
	window.localStorage.setItem("checkAd", "true");
}

