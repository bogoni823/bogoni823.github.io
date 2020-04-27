var span_flag = false;

$(document).on("mouseenter", ".btn-3d", function() {
  if(span_flag) $("#style-span").remove();
  else span_flag = true;
  var id = $(this).attr("class").split(" ")[1];
  $("<style id='style-span'> [data-tooltip-text]:hover:after { left: "+span_left[id]+"; } </style>").appendTo($("head"));
});