//#region - PARAMETER -
var cookieKey = "Collection";
var paramterKey = "Stemp";
var dataKeyArray = ["1", "2", "3"];
var targetWebsiteURL = "";
var usedDebug = true;
//#endregion

//#region - Get Data From Cookie -
var data = GetCookie(cookieKey);
if (usedDebug) {
    document.write("Cookie Data<br>");
    DebugData(data);
}
//#endregion

//#region - Get Input From URL Parameter -
var parameterValue = GetURLParameter(paramterKey);
if (usedDebug) {
    document.write(paramterKey + " => " + parameterValue + "<br><br>");
}
//#endregion

//#region - Update Data -
for (var i = 0; i < dataKeyArray.length; i++){
    if (parameterValue == dataKeyArray[i]) {
        if (!data.stemps[i]) {
            data.isNewCollected = true;
            data.stemps[i] = true;
        }            
        break;
    }
}
if (usedDebug) {
    document.write("Updated Data<br>");
    DebugData(data);
}
//#endregion

//#region - Save Data To Cookie -
var dataString = JSON.stringify(data);
if (usedDebug) {
    document.write("NewCookie => " + dataString);
}
SetCookie(cookieKey, dataString);
//#endregion

//#region - Replace Load To Target Website -
if (targetWebsiteURL != "") {
    window.location.replace(targetWebsiteURL);
}
//#endregion

function newData(count) {
    var data = {stemps: new Array(count).fill(false), isNewCollected: false,}
    return data;
}

function GetCookie(key) {
    var data = newData(dataKeyArray.length);
    var decodedCookie = decodeURIComponent(document.cookie);
    document.write("Cookie => " + decodedCookie + "<br><br>");
    var cookies = decodedCookie.split('; ');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].split("=");
        if (cookie[0] = key && cookie[1] != null) {
            var cookieData = JSON.parse(cookie[1]);
            for (var i = 0; i < data.stemps.length; i++){
                data.stemps[i] = cookieData.stemps[i];
            }
        }
    }
    return data;
}

function GetURLParameter(key) {
    var url = document.URL;
    var index = url.indexOf("?");
    if (index != -1) {
        var decodedParameter = url.split("?")[1];
        var parameters = decodedParameter.split("&");
        for (var i = 0; i < parameters.length; i++) {
            var parameter = parameters[i].split("=");
            if (parameter[0] = key) {
                return parameter[1];
            }
        }
    }
    return "Null";
}

function SetCookie(key, value) {
    var cookie = key + "=" + value;
    var date = new Date();
    date.setTime(date.getTime() + (3 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + date.toUTCString();
    document.cookie = cookie + "; " + expires + "; path=/";
}

function DebugData(data) {
    for (var i = 0; i < data.stemps.length; i++) {
        document.write("Stemp" + i.toString().padStart(2, "0")
            + " = " + data.stemps[i] + ";<br>");
    }
    document.write("isNewCollected = " + data.isNewCollected + "; <br>");
    document.write("<br>");
}