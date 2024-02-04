
function reply_click(clicked_id)
  {
    if(clicked_id == 2){
      document.getElementById(clicked_id).className = "scrollers-selected";
      document.getElementById(1).className = "scrollers-non-selected";
      document.getElementById(3).className = "scrollers-non-selected";
      //changer le visuelle
      //lancer l'animation inverse
      document.getElementById("h1").className = "anim-inv";
      document.getElementById("p").className = "anim-inv";
        document.getElementById("btn").className = "btn anim-inv";
        document.getElementById("image").className = "feature-img anim-inv";
        document.getElementById("btn").onclick.innerHTML = "window.location.assign('emplois.html')";
    //attendre la fin pour lancer l'animation principale
      setTimeout(function() {
        document.getElementById("h1").innerHTML = "Consultation <br> des emplois du temps";
        document.getElementById("p").innerHTML = "Vous pouvez consulter les emplois du tmps de n'importe quelle section en un clique!";
        document.getElementById("btn").innerHTML = "Consulter !";
      
        document.getElementById("image").src = "icons/Schedule-bro.png";


        document.getElementById("h1").className = "anim";
        document.getElementById("p").className = "anim";
        document.getElementById("btn").className = "btn anim";
        document.getElementById("image").className = "feature-img anim";
      }, 800);
      
      
    }

    if(clicked_id == 1){
      document.getElementById(clicked_id).className = "scrollers-selected";
      document.getElementById(2).className = "scrollers-non-selected";
      document.getElementById(3).className = "scrollers-non-selected";

         //lancer l'animation inverse
      document.getElementById("h1").className = "anim-inv";
      document.getElementById("p").className = "anim-inv";
        document.getElementById("btn").className = "btn anim-inv";
        document.getElementById("image").className = "feature-img anim-inv";
        document.getElementById("btn").onclick.innerHTML = "window.location.assign('map.html')";
    //attendre la fin pour lancer l'animation principale
      setTimeout(function() {
        document.getElementById("h1").innerHTML = "Visualisation <br> des salles";
        document.getElementById("p").innerHTML = "Vous pouvez visualiser avec plusieurs filtre les salles prises!";
        document.getElementById("btn").innerHTML = "Visualiser !"; 
        document.getElementById("image").src = "icons/Location search-bro.png";


        document.getElementById("h1").className = "anim";
        document.getElementById("p").className = "anim";
        document.getElementById("btn").className = "btn anim";
        document.getElementById("image").className = "feature-img anim";
      }, 800);
      

    }
    if(clicked_id == 3){
      document.getElementById(clicked_id).className = "scrollers-selected";
      document.getElementById(1).className = "scrollers-non-selected";
      document.getElementById(2).className = "scrollers-non-selected";
          //lancer l'animation inverse
          document.getElementById("h1").className = "anim-inv";
          document.getElementById("p").className = "anim-inv";
            document.getElementById("btn").className = "btn anim-inv";
            document.getElementById("image").className = "feature-img anim-inv";
            document.getElementById("btn").onclick.innerHTML = "window.location.assign('profils.html')";
        //attendre la fin pour lancer l'animation principale
          setTimeout(function() {
            document.getElementById("h1").innerHTML = "Parcourir les profils des enseignants";
            document.getElementById("p").innerHTML = "Vous pouvez parcourir et consulter les informations profils des différents enseignants!";
            document.getElementById("btn").innerHTML = "Parcourir !";
            
            document.getElementById("image").src = "icons/Professor-bro.png";
    
    
            document.getElementById("h1").className = "anim";
            document.getElementById("p").className = "anim";
            document.getElementById("btn").className = "btn anim";
            document.getElementById("image").className = "feature-img anim";
          }, 800);
          

    }
    
  }