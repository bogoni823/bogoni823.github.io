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

function addImg(game, object_, id_, class_, src_, x, y) {
    var img = document.createElement("img");
    img.setAttribute("id", id_);
    img.setAttribute("class", class_);
    img.setAttribute("src", src_);
    img.style.position = "absolute";
    img.style.left = x+"px";
    img.style.top = y+"px";
    if(game == "bingo" && size != 5 && (size >= 1 && size <= 10)) {
        var percent = ["500px", "250px", "33.5%", "25.2%", 0, "84px", "72px", "12.5%", "11%", "9.85%"];
        img.style.width = percent[size-1];
        img.style.height = percent[size-1];
    }
    object_.append(img);
}

$(document).on("click", ".check-img", function() {
    var id_str = $(this).attr("id");
    var id = id_str.split("img")[1];
    arr_flag[parseInt(id)-1] = false;
    clickImg(id);
    document.getElementById(id_str).parentNode.removeChild(document.getElementById(id_str));
    scoring();
});
