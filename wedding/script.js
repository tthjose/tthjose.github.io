window.onscroll = function() {scrollFunction()};
    function scrollFunction() {
          if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            document.getElementById("navbar-scroll").style.top = "0";
          } else {
            document.getElementById("navbar-scroll").style.top = "-100px";
          }
        }
function menu() {
  var x = document.getElementById("menu");
  if (x.style.display == "none") {
    x.style.display = "grid";
    x.style.gridTemplateColumns="1fr 1fr 1fr 1fr";
  }
  else {
    x.style.display = "none";
  }
}