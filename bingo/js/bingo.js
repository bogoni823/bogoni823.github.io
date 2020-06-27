var st_btn = document.getElementById("game-start");
st_btn.addEventListener("click", stBtn);
var rand_btn = document.getElementById("random-button");
rand_btn.addEventListener("click", randBtn);
var del_btn = document.getElementById("delete-button");
del_btn.addEventListener("click", delBtn);
var share_btn = document.getElementById("share-button");
share_btn.addEventListener("click", shareBtn);
var plus_btn = document.getElementById("plus-button");
plus_btn.addEventListener("click", plusBtn);
var minus_btn = document.getElementById("minus-button");
minus_btn.addEventListener("click", minusBtn);
var file_input = document.getElementById("file_input");
var set_btn = document.getElementById("toggle");
var dup_input = document.getElementById("checkbox");
var amount_input = document.getElementById("amount");
var max_size = 100;
var arr = new Array(size*size);
var arr_flag = new Array(size*size);
for(var i=0; i<size*size; i++) arr_flag[i] = false;
var arr_rand = new Array(max_size);
for( var i=0; i<max_size; i++) arr_rand[i] = i+1;
var arr_x = new Array(3,101,200,299,397);
var arr_y = new Array(56,154,253,352,450);
var dup_check = true;
var edit_id = false;
var edit_value = false;
var img_flag = false;
var local_flag = false;
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
    if(arr_url_para.length != 3) throw new Error("length error!");
    var param_size = getSizeURL(arr_url_para[0]);
    var param_dup = getDupURL(arr_url_para[1]);
    var param_arr = getArrayURL(decodeURI(arr_url_para[2]), param_size*param_size, 3);

    document.getElementById("amount").value = param_size;
    editTable(param_size);

    if(param_dup+"" == dup_check+"") {
      dup_check = !dup_check;
      dup_input.checked = true;
    }

    setArray(param_arr);
    if(dup_check) dupFunc("del");
    else {
      $("<style id='style-span-dup'>#span-dup:hover:after{ content: '중복된 번호를 허용합니다'; }</style>").appendTo($("head"));
      viewNumFunc();
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
  return "<font color='red'>보고니</font> B I N G O";
}
function initArray(size) {
  arr.length = 0;
  arr = new Array(size*size);
  if(arr.length > 25) {
    arr_flag.length = 0;
    arr_flag = new Array(size*size);
    for(var i=0; i<size*size; i++) arr_flag[i] = false;
  }
}
function bingoCnt() {
  var bingo = 0;
  if(size == 1) return 0;
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
function scoring() {
  bingo = bingoCnt();
  if(size != 1) document.getElementById("score").innerHTML="<font color='red'>"+bingo+"</font>줄 ┃ <font color='red'>"+count+"</font>개";
  else document.getElementById("score").innerHTML="<font color='red'>"+count+"</font>개";
}
function stBtn() {
  $("#game-start").hide();
  rand_btn.disabled = "disabled";
  rand_btn.style.cursor = "default";
  del_btn.disabled = "disabled";
  del_btn.style.cursor = "default";
  minus_btn.disabled = "disabled";
  plus_btn.disabled = "disabled";
  dup_input.disabled = "disabled";
  amount_input.disabled = "disabled";
  $(".slider").css("cursor", "default");
  $(".blanks input[type='radio'] + span").css("cursor", "default");
  startImg();
  setTimeout(function() {
    document.getElementsByClassName("bingo")[0].removeChild(document.getElementById("start-img"));
  }, 1111);
  for(var i=1; i<=size*size; i++) {
    var num = document.getElementById(i);
    if(String(arr[i-1]).length < 4 && String(arr[i-1]).length) {
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
        document.getElementById("bingo-start").removeChild(document.getElementById("img"+id));
      }
      scoring();
    }
  }
});
$(document).on("click", ".bingo-table td", function() {
  var id = $(this).attr("id");
  var num_id = id.split("td")[1];
  if(st_btn.style.display=="none") {
    if(document.getElementById(num_id).innerHTML != "" && arr_flag[parseInt(num_id)-1]==false) {
      chkImg(num_id);
      scoring();
    }
  }
  else { document.getElementById(num_id).focus(); }
});
function clickImg(id) {
/* id : common으로 합치기위한 불필요한 매개변수로 사용x */
  count--;
}
function sizeChange(size) {
  arr_x.length = 0;
  arr_y.length = 0;
  if(size == 5) {
    arr_x = new Array(3,101,200,299,397);
    arr_y = new Array(56,154,253,352,450);
  }
  else if(size == 4) {
    arr_x = new Array(2,125,248,372);
    arr_y = new Array(56,179,302,425);
  }
  else if(size == 3) {
    arr_x = new Array(2,166,330);
    arr_y = new Array(56,220,384);
  }
  else if(size == 10) {
    arr_x = new Array(3,52,101,150,199,248,298,348,397.75, 447.25);
    arr_y = new Array(56.2,105,154,203,252,301,350.5,400.25,450.8,500.25);
  }
  else if(size == 8) {
    arr_x = new Array(2,63,125,187,249,311,373,434);
    arr_y = new Array(55.5,116,178,240,302,364,426,487);
  }
  else if(size == 2) {
    arr_x = new Array(2,249);
    arr_y = new Array(56,303);
  }
  else if(size == 1) {
    arr_x = new Array(2, 0);
    arr_y = new Array(56, 0);
  }
  else if(size == 6) {
    arr_x = new Array(2,84,166,248,330.5,413);
    arr_y = new Array(55.5,137,219,301,383.5,466);
  }
  else if(size == 7) {
    arr_x = new Array(2,72,142,212.5,283,354,425);
    arr_y = new Array(55.5,125,195,265.5,336,407,478);
  }
  else if(size == 9) {
    arr_x = new Array(3,57,112,167,222,277,332,387,442);
    arr_y = new Array(56.2,110,165,220,275,330,385,440,495);
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
  var dup_flag = false;
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
        else if(flag == "del") {
          arr[j]="";
          dup_flag = true;
        }
      }
    }
  }
  if(dup_flag) toastr.info("중복된 번호를 삭제합니다");
  viewNumFunc();
}
function randFunc() {
  return String(Math.floor(Math.random() * 100) + 1);
}
function randFuncIdx(len) {
  return Math.floor(Math.random() * len);
}
function randBtn() {
  if(dup_check) {
    try {
      for(var i=0; i<size*size; i++) {
        var temp_idx = randFuncIdx(max_size - i);
        var temp_val = arr_rand[max_size - i-1];
        arr_rand[max_size-i-1] = arr_rand[temp_idx];
        arr_rand[temp_idx] = temp_val;
        arr[i] = arr_rand[max_size-i-1];
      }
    }
    catch(e) {
      arr_rand.length = 0;
      arr_rand = new Array(max_size);
      for(var i=0; i<max_size; i++) arr_rand[i] = i+1;
    }
  }
  else {
    for(var i=0; i<size*size; i++) arr[i] = randFunc();
  }
  viewNumFunc();
}
function delBtn() {
  for(var i=0; i<size*size; i++) arr[i] = "";
  viewNumFunc();
}
function inRudder() {
  if(!minus_btn.disabled && (event.keyCode == 37 || event.keyCode == 40)) minusBtn();
  else if(!plus_btn.disabled && (event.keyCode == 39 || event.keyCode == 38)) plusBtn();
}
function inNumber() {
  if(event.keyCode < 48 || event.keyCode > 57) {
    event.returnValue = false;
  }
}
function plusBtn() {
  if(minus_btn.disabled) minus_btn.disabled = false;
  if(size == 9) plus_btn.disabled = "disabled";
  size++;
  amount_input.value = size;
  editTable(amount_input.value);
}
function minusBtn() {
  if(plus_btn.disabled) plus_btn.disabled = false;
  if(size == 2) minus_btn.disabled = "disabled";
  size--;
  amount_input.value = size;
  editTable(amount_input.value);
}
dup_input.addEventListener('change',function(e) {
  dup_check = $("input:checkbox[id='checkbox']").is(":checked") == false;
  if(dup_check) {
    dupFunc("del");
    document.head.removeChild(document.getElementById("style-span-dup"));
  }
  else $("<style id='style-span-dup'>#span-dup:hover:after{ content: '중복된 번호를 허용합니다'; }</style>").appendTo($("head"));
});
$(document).on("propertychange change keyup paste input", ".bingo-number", function() {
  var id = $(this).attr("id");
  var node = document.getElementById(id);
  edit_id = parseInt(id)-1;
  if(node.innerHTML.length > 3) node.innerHTML = "";
  edit_value = node.innerHTML.substring(0,3);
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
        document.getElementsByClassName("bingo-table")[0].removeChild(document.getElementById("box"+dup_id));
        document.getElementById(current_id+1).innerHTML = "";
        document.getElementById(current_id+1).focus();
      }, 800);
      toastr.warning("중복된 번호입니다!");
    }
  }
}
function editTable(new_size) {
  size = new_size;
  document.getElementsByTagName("table")[0].removeChild(document.getElementsByTagName("tbody")[0]);
  initArray(new_size);
  sizeChange(new_size);
  makeTable();
  for(var i=0; i<new_size*new_size; i++) arr[i] = i+1;
  viewNumFunc();
}
amount_input.addEventListener('input',function(e) {
  if(this.value >= 1 && this.value <= 10) {
    if(this.value == 10) plus_btn.disabled = "disabled";
    else if(this.value == 1) minus_btn.disabled = "disabled";
    if(this.value != 1 && minus_btn.disabled) minus_btn.disabled = false;
    else if(this.value != 10 && plus_btn.disabled) plus_btn.disabled = false;
  }
  else {
    if(this.value != "") this.value = size;
    return;
  }
  size = Number(this.value);
  editTable(this.value);
});
$(document).on("blur", "#amount", function() {
  if(amount_input.value == "") amount_input.value = size;
});
function setArray(in_arr) {
  arr.length = 0;
  arr = in_arr;
}
function shareBtn() {
  var url = window.location;
  if(!local_flag) url += page_name;
  var uri = url + '?' + size + '&' + !dup_check + '&' + encodeURI(arr);
  copy(uri);
  toastr.info("주소가 복사되었습니다");
  if(uri.length > 128) toastr.warning("디스코드를 통해 전달하세요!", "길이 초과!", {timeOut: 5000});
}
file_input.addEventListener('change',function(e){
  var file = e.target.files[0];
  var reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = function() {
    if(img_flag) document.head.removeChild(document.getElementById("style-background"));
    else img_flag = true;
    $("<style id='style-background'> .bingo.new:after { background: url('"+reader.result+"'); background-size: 500px 500px; opacity: 0.5; } </style>").appendTo($("head"));
    $(".bingo").attr("class", "bingo new");
    toastr.info("이미지를 변경하였습니다");
  }
});
set_btn.addEventListener('change',function(e) {
  $("<style id='style-span-set'> #span-set:after { opacity: 0; }#span-set:before { opacity: 0; } </style>").appendTo($("head"));
  setTimeout(function() {document.head.removeChild(document.getElementById("style-span-set"));}, 400);
});
