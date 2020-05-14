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
      td[j*size+i].innerHTML = "<div id='"+ (j*size+i+1) +"' class='bingo-number'></div>";
      tr[j].appendChild(td[j*size+i]);
    }
    tbody.appendChild(tr[j]);
  }
  if(document.getElementById("bingo-number10")) document.getElementById("bingo-number10").remove();
  if(size == 5) tbody.style.height = "99px";
  else if(size == 4) tbody.style.height = "124px";
  else if(size == 3) tbody.style.height = "165px";
  else if(size == 10) {
    tbody.style.fontSize = "16px";
    $("<style id='bingo-number10'> .bingo-number { min-height:25px; } </style>").appendTo($("head"));
  }
  $(".bingo-table").append(tbody);
  for(var i=1; i<=size*size; i++) $("#"+i).attr("contenteditable", true);
}
