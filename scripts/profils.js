
var liste_prof= ["Rebai","Zohra"]
function search() {
  document.getElementById("profil").className = "container-profil anim-inv";

  setTimeout(function() {
  document.getElementById("profil").style.visibility = "hidden" ;
  }, 300);
  
    var valeur =document.getElementById("search").value;
    var cpt = 0;
    liste_prof.forEach(element => {
      if (element.toLowerCase() == valeur.toLowerCase()  && cpt == 0) {
        setTimeout(function() {
          document.getElementById("text1").innerHTML = "Rebai Med Younes";
          document.getElementById("text2").innerHTML = "Maitre de conférence classe B,Faculté d'informatique";
          document.getElementById("text3").innerHTML = "RBYOUNES@gmail.com";
          document.getElementById("pic").src = "icons/profile-pic.png";

          document.getElementById("profil").style.visibility = "visible" ;
          document.getElementById("profil").className = "container-profil anim";
        }, 800);
      }
      if (element.toLowerCase() == valeur.toLowerCase()  && cpt == 1){ //Zohra
        setTimeout(function() {
          document.getElementById("text1").innerHTML = "Fatima Zohra";
          document.getElementById("text2").innerHTML = "Maitre de conférence classe A,Faculté d'informatique";
          document.getElementById("text3").innerHTML = "ZohraVhope@gmail.com";
          document.getElementById("pic").src = "icons/Fatima-Zohra.jpg";

          document.getElementById("profil").style.visibility = "visible" ;
          document.getElementById("profil").className = "container-profil anim";
        }, 800);
      }
      cpt =cpt + 1;
    });
}