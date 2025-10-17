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
    x.style.display = "block";
    x.style.minWidth="150px";
  }
  else {
    x.style.display = "none";
  }
}