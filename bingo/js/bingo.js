var st_btn = document.getElementById("game-start");
st_btn.addEventListener("click", stBtn);
var rand_btn = document.getElementById("random-button");
rand_btn.addEventListener("click", randBtn);
var arr = new Array(size*size);
var arr_flag = new Array(size*size);
for(var i=0; i<size*size; i++) arr_flag[i] = false;
var arr_x = new Array(3,101,200,299,397);
var arr_y = new Array(57,156,255,353,452);
var dup_check = true;
var edit_id = false;
var edit_value=false;

function writeTitle() {
  return "<font color='red'>보고니</font> B I N G O";
}
function initArray(size) {
  arr.length = 0;
  arr = new Array(size*size);
}
function bingoCnt() {
  var bingo = 0;
  var c1cnt = 0;
  var c2cnt = 0;
  for(var i=0; i<size; i++) {
    var xcnt = 0;
    var ycnt = 0;
    for(var j=0; j<size; j++) {
      if(arr_flag[i*size+j]==true) xcnt++;
      if(arr_flag[j*size+i]==true) ycnt++;
      if(i==j&&arr_flag[i*size+j]==true) c1cnt++;
      if(i+j==(size-1)&&arr_flag[i*size+j]==true) c2cnt++;
    }
    if(xcnt==size) bingo++;
    if(ycnt==size) bingo++;
  }
  if(c1cnt==size) bingo++;
  if(c2cnt==size) bingo++;
  return bingo;
}
function scoreChange() {
  bingo = bingoCnt();
  document.getElementById("score").innerHTML="<font color='red'>"+bingo+"</font>줄 ┃ <font color='red'>"+count+"</font>개";
};
function stBtn() {
  $("#game-start").hide();
  rand_btn.disabled="disabled";
  rand_btn.style.cursor = "default";
  document.getElementById("checkbox").disabled="disabled";
  $(".slider").css("cursor", "default");
  for(var i=3; i<=5; i++) {
    document.getElementById("blank"+i).disabled="disabled"
    $(".blanks input[type='radio'] + span").css("cursor", "default");
  }
  startImg();
  setTimeout(function() {
    $("#start-img").remove();
  }, 1111);
  for(var i=1; i<=size*size; i++) {
    var num = document.getElementById(i);
    if(String(arr[i-1]).length < 4 && arr[i-1].length) {
      var td = document.getElementById("td"+i);
      num.style.cursor = "pointer";
      td.style.cursor = "pointer";
    }
    num.contentEditable = "false";
  }
}
function chkImg(id) {
  arr_flag[parseInt(id)-1] = true;
  count++;
  var xx = arr_x[(parseInt(id)-1)%size];
  var yy = arr_y[parseInt((parseInt(id)-1)/size)];
  addImg("bingo", $(".bingo-table"), ("img"+id), "check-img", "img/o.png", xx, yy);
}
$(".bingo-number").click(function() {
  if(st_btn.style.display=="none") {
    var id = $(this).attr("id");
    if(document.getElementById(id).innerHTML != "") {
      if(arr_flag[parseInt(id)-1] == false) {
        chkImg(id);
      }
      else {
        arr_flag[parseInt(id)-1] = false;
        count--;
        $("#img"+id).remove();
      }
      scoreChange();
    }
  }
});
$(document).on("click", ".bingo-table td", function() {
  var id = $(this).attr("id");
  num_id = id.split("td")[1];
  if(st_btn.style.display=="none") {
    if(document.getElementById(num_id).innerHTML != "" && arr_flag[parseInt(num_id)-1]==false) {
      chkImg(num_id);
      scoreChange();
    }
  }
  else { document.getElementById(num_id).focus(); }
});
function clickImg(id) {
/* id : common으로 합치기위한 불필요한 매개변수로 사용x */
  count--;
}
function sizeChange(size) {
  if(size == 5) {
    arr_x.splice(0,5,3,101,200,299,397);
    arr_y.splice(0,5,57,156,255,353,452);
  }
  else if(size == 4) {
    arr_x.splice(0,5,2,125,248,372,0);
    arr_y.splice(0,5,56,179,302,425,0);
  }
  else if(size == 3) {
    arr_x.splice(0,5,2,166,330,0,0);
    arr_y.splice(0,5,56,220,384,0,0);
  }
  else {
    alert("Size Error");
    if(navigator.appVersion.indexOf("MSIE 6.0")>=0) { parent.window.close(); }
    else { parent.window.open('about:blank','_self').close(); }
  }
}
function viewNumFunc() {
  for(var i=0; i<size; i++) {
    for(var j=0; j<size; j++) {
      if(arr[i*size+j] || arr[i*size+j]==="") document.getElementById((i*size+j+1)).innerHTML = arr[i*size+j];
    }
  }
}
function dupFunc(flag) {
  for(var i=0; i<size*size-1; i++) {
    for(var j=i+1; j<size*size; j++) {
      if(arr[i] && arr[j] && arr[i] == arr[j]) {
        if(flag == "add") {
          arr[j] = randFunc();
          for(var k=j-1; k>=0; k--) {
            if(arr[j] == arr[k]) {
              arr[j] = randFunc();
              k=j;
            }
          }
        }
        else if(flag == "del") { arr[j]=""; }
      }
    }
  }
  viewNumFunc();
}
function randFunc() {
  return String(Math.floor(Math.random() * 100) + 1);
}
function randBtn() {
  for(var i=0; i<size*size; i++) {
    arr[i] = randFunc();
    viewNumFunc();
  }
  if(dup_check) dupFunc("add");
}
$("#checkbox").click(function() {
  dup_check = $("input:checkbox[id='checkbox']").is(":checked") == false;
  if(dup_check) dupFunc("del");
  else dup_check = false;
});
$(document).on("propertychange change keyup paste input", ".bingo-number", function() {
  var id = $(this).attr("id");
  var node = document.getElementById(id);
  var text = node.innerHTML;
  if(text.length > 3) node.innerHTML = "";
  edit_id = parseInt(id)-1;
  if(text == arr[edit_id]) return;
  edit_value = text.substring(0,3);
});
$(document).on("blur", ".bingo-number", function() {
  arrAddFunc();
});
$(document).on("focus", ".bingo-number", function() {
  arrAddFunc();
});
function dupCheck(id, value) {
  for(i=0; i<size*size; i++) if(arr[i] && value && arr[i] == value && i != id) return i;
  return false;
}
function arrAddFunc() {
  if(edit_id!==false) {
    var current_id = edit_id;
    var current_value = edit_value;
    edit_id = false;
    edit_value = false;
    if(!dup_check) {
      arr[current_id] = current_value;
      return;
    }
    var dup_id = dupCheck(current_id, current_value);
    if(dup_id === false) arr[current_id] = current_value;
    else {
      arr[current_id] = "";
      var temp_id = dup_id+1;
      var td = document.getElementById("td"+temp_id);
      var xx = arr_x[dup_id%size];
      var yy = arr_y[parseInt(parseInt(dup_id)/size)];
      td.style.color = "#2196F3";
      addImg("bingo", $(".bingo-table"), ("box"+dup_id), "box-img", "img/box.png", xx, yy);
      setTimeout(function() {
        td.style.color = "black";
        $("#box"+dup_id).remove();
        document.getElementById(current_id+1).innerHTML = "";
        document.getElementById(current_id+1).focus();
      }, 800);
    }
  }
}
$(".blanks input").click(function() {
  var value = $(this).attr("value");
  if(size != value) {
    size = value;
    $(".bingo-table tbody").remove();
    initArray(value);
    sizeChange(value);
    makeTable();
  }
});