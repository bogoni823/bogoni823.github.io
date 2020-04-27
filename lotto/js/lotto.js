const rand = document.getElementById("rand");
const start = document.getElementById("start");
let tmp = 1, numbers, count = 0, bonus = false, size = 1;
const arr_flag = new Array(size*7);
for(var i=0; i<size*7; i++) arr_flag[i] = false;
changeTitle();

function writeTitle() {
    return "<font color='red'>보고니</font> Lotto";
}

function getindex(c) {
    let d = 0;
    for (d; c = c.previousElementSibling; d++);
    return d
}

function getColor(num) {
    var color;
    if(isNaN(num) || num === "") return false;
    else if(num < 11) color = "#F5C842";
    else if(num < 21) color = "#95C5E6";
    else if(num < 31) color = "#EA8A82";
    else if(num < 41) color = "#AA9CDE";
    else color = "#74D39D";
    return color;
}

function setColor(id, color) {
    document.getElementById(id).style.background = color;
}

function decryptEffect(elem, time) {
    const effect = setInterval(function() {
        elem.innerText = Math.floor(Math.random()*44 + 1)
    }, 10);
    setTimeout(function() {
        const random = Math.floor(Math.random() * numbers.length);
        clearInterval(effect),
        elem.classList.add("done"),
        elem.innerText = numbers[random],
        numbers.splice(random, 1);
        var color = getColor(numbers[random]);
        setColor(elem.id, color);
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
    else if(count == 5 && bonus == false) rank = "3등";
    else if(count == 5 && bonus == true) rank = "2등";
    else if(count == 6) rank = "1등";
    return rank;
}

function scoring() {
    var rank = ranking();
    var text = "<font color='red'>"+rank+"</font> ┃ <font color='red'>"+count+"</font>개";
    if(bonus) text += " + <font color='skyblue'>보너스</font>";
    document.getElementById("score").innerHTML = text;
};

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
            start.classList.add("btn")
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
            document.getElementById("start-img").remove()
        }, 1111)
    )
})

function clickBall(id) {
    if(id<7) count++;
    else bonus = !bonus;
}

function clickImg(id) {
    if(id<7) count--;
    else bonus = !bonus;
}

function addImg(game, object_, id_, class_, src_, x, y) {
    var img = document.createElement("img");
    img.setAttribute("id", id_);
    img.setAttribute("class", class_);
    img.setAttribute("src", src_);
    img.style.position = "absolute";
    img.style.left = x+"px";
    img.style.top = y+"px";
    if(game == "bingo" && size != 5 && size == 3 || size == 4) {
        var percent = (size == 3 ? "33.5%" : "25.2%");
        img.style.width = percent;
        img.style.height = percent;
    }
    object_.append(img);
}

Array.from(document.querySelectorAll(".ball")).forEach(a => {
    a.contentEditable = true;
    a.addEventListener("click", evt => {
        if(start.style.display == "none" && !arr_flag[parseInt(evt.target.id)-1]) {
            arr_flag[parseInt(evt.target.id)-1] = true;
            var xx = evt.pageX-evt.offsetX;
            var yy = evt.pageY-evt.offsetY;
            clickBall(evt.target.id);
            addImg("lotto", document.getElementById("numbers"), "img"+(evt.target.id), "check-img", "img/v.png", xx, yy);
            scoring();
        }
    })
    a.addEventListener("blur", evt => {
        if(start.style.display != "none") {
            var number = document.getElementById(evt.target.id).innerHTML;
            var color = getColor(number);
            if(color) setColor(evt.target.id, color);
        }
    })
})



$(document).on("propertychange change keyup paste input", ".ball", function() {
    var id = $(this).attr("id");
    var node = document.getElementById(id);
    var text = node.innerHTML;
    if(text.length > 2) node.innerHTML = "";
});

$( window ).resize(function() {
    Array.from(document.querySelectorAll(".check-img")).forEach(a => {
        var ball_id = a.id.split("img")[1];
        var ball = document.getElementById(ball_id);
        var x = ball.getBoundingClientRect().left;
        var y = ball.getBoundingClientRect().top;
        $("#"+a.id).offset({ left: x, top: y});
    })
});

addImg("lotto", document.getElementById("numbers"), "img0", "check-img-del", "img/v.png", 0, 0);