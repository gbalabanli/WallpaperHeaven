/**
 * 
 */
var ScreensizePlugin = { 
    callNativeScreensize: function (success, fail, resultType) { 
      return cordova.exec( success, fail, 
                           "ScreensizePlugin", 
                           "getScreensize", [resultType]); 
    } 
};
