var stat_flag = true;

function reloadPage() {
  if(stat_flag) {
    alert("주소가 잘못되었습니다.\n초기화면으로 돌아갑니다.");
    location.href = window.location.pathname;
  }
  stat_flag = false;
}
function getSizeURL(in_size) {
  if(in_size === '3' || in_size === '4' || in_size === '5') return in_size;
  reloadPage();
}
function getDupURL(in_flag) {
  if(in_flag === "false" || in_flag === "true") return in_flag;
  reloadPage();
}
function getArrayURL(in_arr, in_size) {
  var arr_size = in_size*in_size;
  in_arr = in_arr.split(',');
  if(in_arr.length <= arr_size) {
	  for(var i=0; i<in_arr.length; i++) if(in_arr[i].length > 3) in_arr[i] = "";
      return in_arr;
  }
  reloadPage();
}
function setArray(in_arr) {
  arr.length = 0;
  arr = in_arr;
}