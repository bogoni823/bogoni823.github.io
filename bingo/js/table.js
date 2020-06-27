window.onload = makeTable();

function makeTable() {
  var tbody = document.createElement("tbody");
  var tr = new Array(size);
  var td = new Array(size*size);
  for(var j=0; j<size; j++) {
    tr[j] = document.createElement("tr");
    for(var i=0; i<size; i++) {
      td[j*size+i] = document.createElement("td");
      td[j*size+i].setAttribute("id", "td"+(j*size+i+1));
      td[j*size+i].innerHTML = "<div id='"+ (j*size+i+1) +"' class='bingo-number' contenteditable='true'></div>";
      tr[j].appendChild(td[j*size+i]);
    }
    tbody.appendChild(tr[j]);
  }

  var style_bingo = document.getElementsByClassName("bingo-class");
  for( var i=0; i < style_bingo.length; i++ ) {
    document.head.removeChild(document.getElementById(style_bingo.item(i).id));
  }

  var size_font = [80, 60, 38, 36, 35, 28, 23, 18, 17, 16];
  var size_height = [494, 247, 165, 124, 99, 78.5, 67, 58, 51, 45.5];
  var size_height2 = [123, 92, 54, 54, 54, 43, 35, 28, 26, 25];
  tbody.style.fontSize = size_font[size-1]+"px";
  if(size <= 5) {
    tbody.style.height = size_height[size-1]+"px";
  }
  else {
    $("<style id='bingo-number" + size +"' class='bingo-class'> .bingo-table td { min-height:" + size_height[size-1] + "px; } .bingo-number { min-height:" + size_height2[size-1] + "px; } </style>").appendTo($("head"));
  }
  $(".bingo-table").append(tbody);
}
