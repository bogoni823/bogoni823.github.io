var span_flag = false;
var span_left = {
    cyan : "28%",
    yellow : "28%",
    blue : "23.5%",
    green : "25%"
}

if(location.protocol != "https:") {
    document.getElementById("a-bingo").setAttribute("href","bingo/index.html");
    document.getElementById("a-lotto").setAttribute("href","lotto/index.html");
}

$(document).on("mouseenter", ".btn-3d", function() {
  if(span_flag) $("#style-span").remove();
  else span_flag = true;
  var id = $(this).attr("class").split(" ")[1];
  $("<style id='style-span'> [data-tooltip-text]:hover:after { left: "+span_left[id]+"; } </style>").appendTo($("head"));
});