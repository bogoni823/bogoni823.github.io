function checkBroswer() {
    var agent = navigator.userAgent.toLowerCase();
    if(((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)) || agent.indexOf("edge") != -1 || agent.indexOf("firefox") != -1 || agent.indexOf("opr") != -1 || (agent.indexOf("chrome") == -1 && agent.indexOf("safari") != -1)) {
        return false;
    }
    return true;
}

function changeTitle() {
    if(checkBroswer()) {
        document.getElementById("chrome-link").parentNode.removeChild(document.getElementById("chrome-link"));
        document.getElementById("title").innerHTML = writeTitle();
    }
}

function startImg() {
    var img = document.getElementById("start-img");
    img.style.display = "inline";
}

function addImg(game, object_, id_, class_, x, y) {
    var elem = document.createElement("div");
    elem.setAttribute("id", id_);
    elem.setAttribute("class", class_);
    elem.style.position = "absolute";
    elem.style.left = x+"px";
    elem.style.top = y+"px";
    if(game == "bingo" && size != 5 && (size >= 1 && size <= 10)) {
        var percent = [500, 250, 166, 124, 0, 84, 72, 62, 56, 50];
        elem.style.width = percent[size-1]+"px";
        elem.style.height = percent[size-1]+"px";
        elem.style.backgroundSize = percent[size-1]+"px";
    }
    object_.append(elem);
}

$(document).on("click", ".check-img", function() {
    var id_str = this.id;
    var id = id_str.split("img")[1];
    arr_flag[id-1] = false;
    clickImg(id);
    document.getElementById(id_str).parentNode.removeChild(document.getElementById(id_str));
    scoring();
});

/* encoding common js starting point */
function encodeArrTo16(arr_boolean, size) {
    var idx = 1;
    var res = "";
    for(var j=0; j<size*size; j+=4) {
        var half_byte = 0;
        for(var i=0; i<4; i++) {
            if(arr_boolean[idx+i]) half_byte += (1 << 3-i);
        }
        idx += 4;
        res += half_byte.toString(16);
    }
    var len = res.length;
    for(var i=len-1; i>0; i--) {
        if(res[i]!='0') break;
        len--;
    }
    return res.slice(0,len);
}

function decode16ToArr(str_16, out_arr) {
    for(var i=0; i<str_16.length; i++) {
        var half_byte = parseInt(str_16.substr(i,1), 16);
        for(var j=0; j<4; j++) {
            if(half_byte & 1) {
                out_arr[i*4+4-j] = true;
                out_arr[0]++;
            }
            half_byte = half_byte >>> 1;
        }
    }
}
/* encoding common js starting point */

/* cookie comoon js starting point */
function setCookie(name,value,expiredays,domain) {
    var todayDate = new Date(); 
    todayDate.setDate( todayDate.getDate() + expiredays );
    var cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";";
    if(domain) cookie += " domain=" + domain +";";
    document.cookie = cookie;
}

function getCookie(name) {
    var nameOfCookie = name + "=";
        var x = 0;
        while ( x <= document.cookie.length ) {
            var y = (x+nameOfCookie.length);
            if ( document.cookie.substring( x, y ) == nameOfCookie ) {
                if ( (endOfCookie=document.cookie.indexOf( ";",y )) == -1 ) endOfCookie = document.cookie.length;
                return unescape( document.cookie.substring(y, endOfCookie ) );
            }
        x = document.cookie.indexOf( " ", x ) + 1;
        if ( x == 0 ) break;
    }
    return "";
}
/* cookie common js end point */
