const rand = document.getElementById("rand");
const start = document.getElementById("start");
const share = document.getElementById("share-button");
const setting = document.getElementById("toggle");
let tmp = 1, numbers, count = 0, size = 1, max_size = 7;
let arr = new Array(size*max_size);
let arr_flag = new Array(size*max_size);
let arr_star = new Array(max_size+1);
initStar(arr_star, max_size+1);
for(var i=0; i<size*max_size; i++) arr_flag[i] = false;
let local_flag = false;
let img_star = "url('../img/star.svg') center center / 85% 85% no-repeat";
const page_name = "index.html";

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "2000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

var url_para = window.location.href.split(window.location.pathname)[1];
if(url_para.length) {
    try {
        if(url_para[0] !== "?") throw new Error("query error!");
        var arr_url_para = url_para.substr(1,url_para.length-1).split("&");
        if(arr_url_para.length < 2 || arr_url_para.length > 4) throw new Error("length error!");
        if(arr_url_para.length > 2) {
            var param_arr = getArrayURL(decodeURI(arr_url_para[2]), max_size, 2);
            if(arr_url_para.length > 3) var param_star = getStarURL(arr_url_para[3], 3);
            arr = param_arr;
            setArray(arr);
            if(arr_url_para.length > 3) {
                decode16ToArr(param_star, arr_star);
                viewStarFunc(arr, arr_star);
            }
        }
    }
    catch(e) {
        reloadPage();
    }
}
try {
    history.pushState({},null,"./");
}
catch(e) {
    local_flag = true;
    history.pushState({},null,location.pathname);
}

changeTitle();

function writeTitle() {
    return "<font color='red'>보고니</font> Lotto";
}

function getindex(c) {
    let d = 0;
    for (d; c = c.previousElementSibling; d++);
    return d
}

function getColor(id, num="") {
    var color = "rgb(176, 216, 64)";
    if(isNaN(num) || num === "" || num < 1 || num > 45) {
        if(id <=3) color = "rgb(105, 200, 242)";
        else if(id <= 5) color = "rgb(255, 114, 114)";
        else if(id == 6) color = "rgb(170, 170, 170)";
    }
    else if(num < 11) color = "#F5C842";
    else if(num < 21) color = "#95C5E6";
    else if(num < 31) color = "#EA8A82";
    else if(num < 41) color = "#AA9CDE";
    else color = "#74D39D";
    return color;
}

function setColor(obj_, color) {
    obj_.style.background = color;
}

function mergeColor(arr_color) {
    var res = arr_color[0];
    for(var i=1; i<arr_color.length; i++) {
        res+= ", " + arr_color[i];
    }
    return res;
}

function initStar(in_arr, len) {
    in_arr[0] = 0;
    for(var i=1; i<len; i++) in_arr[i] = false;
}

function decryptEffect(elem, time) {
    initStar(arr_star, max_size+1);
    const effect = setInterval(function() {
        elem.innerText = Math.floor(Math.random()*44 + 1)
    }, 10);
    setTimeout(function() {
        const random = Math.floor(Math.random() * numbers.length);
        clearInterval(effect),
        elem.classList.add("done"),
        elem.innerText = numbers[random];
        var color = getColor(elem.id, numbers[random]);
        setColor(elem, color);
        numbers.splice(random, 1);
    },  time * 600 + 1000)
}

function lottery() {
    Array.from(document.querySelectorAll(".ball")).forEach(a => {
        a.classList.remove("done"),
        decryptEffect(a, getindex(a))
    })
}

function ranking() {
    var rank;
    if(count < 3) rank = "꽝!";
    else if(count == 3) rank = "5등";
    else if(count == 4) rank = "4등";
    else if(count == 5 && arr_flag[6] == false) rank = "3등";
    else if(count == 5 && arr_flag[6] == true) rank = "2등";
    else if(count == 6) rank = "1등";
    return rank;
}

function scoring() {
    var rank = ranking();
    var text = "<font color='red'>"+rank+"</font> ┃ <font color='red'>"+count+"</font>개";
    if(arr_flag[6]) text += " + <font color='skyblue'>보너스</font>";
    document.getElementById("score").innerHTML = text;
}

function setArray(in_arr, in_start=0, in_end=max_size) {
    for(var i=in_start; i<in_end; i++) {
        var elem = document.getElementById(i+1);
        elem.innerText = in_arr[i];
        setColor(elem, getColor(i+1, in_arr[i]));
    }
}

function getArray(in_start=0, in_end=max_size) {
    for(var i=in_start; i<in_end; i++) arr[i] = document.getElementById(i+1).innerText;
}

rand.addEventListener("click", function() {
    tmp === 1 && (
        numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45],
        tmp = 0,
        start.disabled = true,
        rand.classList.add("hide"),
        start.classList.remove("btn"),
        start.classList.add("start-disabled"),
        lottery(),
        setTimeout(function() {
            tmp = 1,
            start.disabled = false,
            rand.classList.remove("hide"),
            start.classList.remove("start-disabled"),
            start.classList.add("btn"),
            getArray()
        }, 5700)
    )
})

start.addEventListener("click", function() {
    tmp === 1 && (
        tmp = 0,
        rand.classList.add("hide"),
        start.classList.add("hide"),
        Array.from(document.querySelectorAll(".ball")).forEach(a => {
            a.contentEditable = false,
            a.style.cursor = "pointer"
        }),
        startImg(),
        setTimeout(function() {
            rand.remove(),
            start.style.display = "none"
        }, 400),
        setTimeout(function() {
            document.getElementById("wrapper").removeChild(document.getElementById("start-img"))
        }, 1111)
    )
})

share.addEventListener("click", function() {
    var url = window.location;
    if(!local_flag) url += page_name;
    var dup_check = true;
    getArray();
    var uri = url + '?' + size + '&' + !dup_check;
    for(var i=0; i<arr.length; i++) {
        if(arr[i]) {
            uri += '&' + encodeURI(arr);
            if(arr_star[0]) uri += '&' + encodeArrTo16(arr_star, 3);
            break;
        }
    }
    copy(uri);
    toastr.info("주소가 복사되었습니다");
    if(uri.length > 128) toastr.warning("디스코드를 통해 전달하세요!", "길이 초과!", {timeOut: 5000});
})

function clickBall(id) {
    if(id<max_size) count++;
}

function clickImg(id) {
    if(id<max_size) count--;
}

Array.from(document.querySelectorAll(".ball")).forEach(a => {
    a.contentEditable = true;
    a.addEventListener("click", evt => {
        if(start.style.display == "none" && !arr_flag[parseInt(evt.target.id)-1]) {
            arr_flag[parseInt(evt.target.id)-1] = true;
            var xx = evt.pageX-evt.offsetX;
            var yy = evt.pageY-evt.offsetY;
            clickBall(evt.target.id);
            addImg("lotto", document.getElementById("numbers"), "img"+(evt.target.id), "check-img", xx, yy);
            scoring();
        }
    })
    a.addEventListener("blur", evt => {
        if(start.style.display != "none") {
            var number = evt.target.innerHTML;

            if(arr[evt.target.id-1] == number) return;
            arr[evt.target.id-1] = number;
            var back_color;
            if(arr_star[evt.target.id]) back_color = mergeColor([img_star, getColor(evt.target.id, number)]);
            else back_color = getColor(evt.target.id, number);
            setColor(evt.target, back_color);
        }
    })
})

$(document).on("propertychange change keyup paste input", ".ball", function() {
    var id = $(this).attr("id");
    var node = document.getElementById(id);
    var text = node.innerHTML;
    if(text.length > 2) node.innerHTML = "";
})

$( window ).resize(function() {
    Array.from(document.querySelectorAll(".check-img")).forEach(a => {
        var ball_id = a.id.split("img")[1];
        var ball = document.getElementById(ball_id);
        var x = ball.getBoundingClientRect().left;
        var y = ball.getBoundingClientRect().top;
        $("#"+a.id).offset({ left: x, top: y});
    })
})

setting.addEventListener('change',function(e) {
    $("<style id='style-span-set'> #span-set:after { opacity: 0; }#span-set:before { opacity: 0; } </style>").appendTo($("head"));
    setTimeout(function() {document.head.removeChild(document.getElementById("style-span-set"));}, 400);
});

function viewStarFunc(in_arr, arr_boolean) {
    if(arr_boolean[0]) {
        var max_cnt = arr_boolean[0];
        var cnt = 0;
        for(var i=1; max_cnt-cnt>0; i++) {
            if(arr_boolean[i]) {
                cnt++;
                var back_color = mergeColor([img_star, getColor(i, in_arr[i-1])]);
                setColor(document.getElementById(i), back_color);
            }
        }
    }
}

$(document).on("mousedown", ".ball", function(e) {
    if(e.which != 2) return;
    arr_star[this.id] = !arr_star[this.id];
    var back_color;

    if(arr_star[this.id]) {
        arr_star[0]++;
        back_color = mergeColor([img_star, getColor(this.id, this.innerText)]);
    }
    else {
        arr_star[0]--;
        back_color = getColor(this.id, this.innerText);
    }
    setColor(this, back_color);
});

/* 시작 후 공 클릭시 전체적으로 밀리는 현상 방지 */
addImg("lotto", document.getElementById("numbers"), "img0", "check-img-del", 0, 0);
getArray();
