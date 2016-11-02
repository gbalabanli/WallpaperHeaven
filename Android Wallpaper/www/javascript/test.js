/**
 * 
 */
var TestPlugin = { 
    callNativeFunction: function (success, fail, resultType) { 

      return cordova.exec( success, fail, 
                           "TestPlugin", 
                           "setWallPaper", [resultType]); 
    } 
};
var AdPlugin = { 
	    callNativeFunction: function (success, fail, resultType) { 
		
	      return cordova.exec( success, fail, 
	                           "TestPlugin", 
	                           "checkReceivedAd", [resultType]); 
	    } 
};
var ConnPlugin = { 
	    callNativeFunction: function (success, fail, resultType) { 
	      return cordova.exec( success, fail, 
	                           "TestPlugin", 
	                           "checkDoIntAdmob", [resultType]); 
	    } 
};
Version ={
getVersionCode: function (success, fail, resultType) { 
	      return cordova.exec( success, fail, 
	                           "TestPlugin", 
	                           "GetVersionCode", [resultType]);
		}
};
