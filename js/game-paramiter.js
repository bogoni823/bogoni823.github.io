var stat_flag = true;

function reloadPage() {
  if(stat_flag) {
    alert("주소가 잘못되었습니다.\n초기화면으로 돌아갑니다.");
    location.href = window.location.pathname;
  }
  stat_flag = false;
}
function getSizeURL(in_size) {
  if(in_size === '3' || in_size === '4' || in_size === '5' || in_size === '8' || in_size === '10') return in_size;
  reloadPage();
}
function getDupURL(in_flag) {
  if(in_flag === "false" || in_flag === "true") return in_flag;
  reloadPage();
}
function getArrayURL(in_arr, in_size, in_length) {
  in_arr = in_arr.split(',');
  if(in_arr.length <= in_size) {
	  for(var i=0; i<in_arr.length; i++) if(in_arr[i].length > in_length) in_arr[i] = "";
      return in_arr;
  }
  reloadPage();
}
function copy(val) {
  var dummy = document.createElement("textarea");
  dummy.style.position = "absolute";
  dummy.style.top = "0px";
  dummy.value = val;
  document.body.appendChild(dummy);
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}
