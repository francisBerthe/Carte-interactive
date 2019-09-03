                                 //TIMER
                       //Déclenchement du compteur 


class Timer {
  constructor(minutes, secondes) {
    this.compteurElt = document.getElementById("chrono"); //Ciblage bloc compteur
    this.changementTitre = document.getElementById("changement-titre"); //Ciblage titre compteur
    this.boutonConfirmer = document.getElementById("bouton-confirmation"); //Ciblage bouton confirmation  
    this.visibilityTps = document.getElementById("timer"); //Ciblage Timer
    this.visibilityMessage = document.getElementById("message-timer"); //Ciblage message Timer
    this.fondReservation = document.getElementById("fond-formulaire"); //Ciblage fond Réservation 
    
    this.minutes = minutes;
    this.secondes = secondes;
    this.initMinutes = minutes;  
    this.initSecondes = secondes;
     
    this.compteur;
    this.localisation = "";
    
    this.lancementTimer();
    this.ajoutZero();
    this.resetCompteur();
    this.refresh();
   }//Fin du constructor
    

    lancementTimer() {
        let nombreCompteur = Number(this.compteurElt.textContent);
        
        this.boutonConfirmer.addEventListener("click", () => {
               //ENREGISTREMENT DONNEES : station.address 
               sessionStorage.setItem("stationAddress", app.map.currentStation.address);
               this.insertStation = sessionStorage.getItem("stationAddress");
            
               sessionStorage.setItem("stationResa", app.map.resaStation.address);
               this.resaStation = sessionStorage.getItem("stationResa");
               
               this.visibilityTps.style.visibility = "visible";  //Apparition du Timer au 1er clic
               this.visibilityMessage.style.visibility = "visible";  //Apparition du Message au 1er clic
                 
               //Disparition du canvas   
               this.fondReservation.style.visibility = "visible"; 
            
               //Init Secondes & Minutes
               this.secondes = this.initSecondes
               this.minutes = this.initMinutes;
            
               //Remise à zero du compteur 
               clearInterval(this.compteur); 
              
               this.compteur = setInterval( () => {            
                   this.secondes -= 1;
               if (this.minutes < 0) return;
               else if (this.secondes < 0 && this.minutes !== 0) {
                   this.minutes -= 1;
                   this.secondes = 59;
                }
                   
                //Ajout du Zero pour minutes & les secondes
                this.compteurElt.innerHTML = this.minutes + ':' + this.secondes;  //Intégration des min et sec dans la div   
                       
                //SessionStorage pour les minutes & secondes
                sessionStorage.setItem("secondes", this.secondes);  //Enregistrement des Secondes
                sessionStorage.setItem("minutes", this.minutes);  //Enregistrement des Minutes
                
                //Ajout informations Storage dans Timer
                this.insertPrenom = localStorage.getItem("prenomUtilisateur");  //Ciblage du nom en local
                this.changementTitre.innerHTML = `<strong style="font-size: 1.1em;">${this.insertPrenom}</strong>, votre réservation est valable pour une durée de 20min ! Votre vélo est disponible <strong style="font-size: 1.1em;">${this.insertStation}</strong>.`;
                
                //Methode resetCompteur()
                this.resetCompteur();
                   
                //Methode ajoutZero()
                this.ajoutZero();    
                   
                }, 1000);
         }); //Fin ecoute boutonConfirmer
     } //Fin lancementTimer()

      
    ajoutZero() {
            //Ajout du Zero pour minutes & les secondes
            this.compteurElt.innerHTML = this.minutes + ':' + this.secondes;  //Intégration des min et sec dans la div
                       
       if (this.minutes < 10) {
            this.compteurElt.innerHTML = '0' + this.minutes + ':' + this.secondes;  //Ajout du Zero
       } 
       if (this.secondes < 10) {
            this.compteurElt.innerHTML = this.minutes + ':0' + this.secondes;   //Ajout du Zero 
       } 
       if (this.minutes < 10 && this.secondes < 10 ){
            this.compteurElt.innerHTML = '0' + this.minutes + ':0' + this.secondes;  //Intégration des min et sec dans la div 
       } //Fin du if   
    }//Fin ajoutZero()
    
    
    resetCompteur() {
        //Si compteur à zero
        if (((this.minutes < 0)||(this.minutes == 0)) && ((this.secondes < 0)||(this.secondes == 0))) { 
             this.compteurElt.innerHTML = this.minutes + ':' + this.secondes ;  //Intégration des min et sec dans la div  
             this.changementTitre.innerHTML = "Votre réservation n'est plus disponible !";
                  
             //Effacement des informations dans Sessiontorage
             sessionStorage.clear();
            
             //Remise à zero du compteur 
             clearInterval(this.compteur); 
            
             //Methode ajoutZero()
             this.ajoutZero();
               
             //Message fin réservation
             setTimeout(function () { 
             this.changementTitre = document.getElementById("changement-titre");
             this.changementTitre.innerHTML = "Veuillez recommencer pour réserver de nouveau !";
             }, 4000); //Fin setTimeout   
         }// Fin if ===0
     }//Fin resetCompteur()
     
    
    refresh() {
         if (sessionStorage.getItem("minutes") && sessionStorage.getItem("stationResa")) { // Si réservation....
             this.minutes = sessionStorage.getItem("minutes"); // Minutes
             this.secondes = sessionStorage.getItem("secondes"); // Secondes
             
             this.compteur = setInterval( () => {
             this.visibilityTps = document.getElementById("timer"); 
             this.visibilityTps.style.visibility = "visible";  //Disparition du Timer au 1er clic
             this.visibilityMessage = document.getElementById("message-timer"); 
             this.visibilityMessage.style.visibility = "visible";  //Disparition du Message au 1er clic
                         
                         
             this.insertPrenom = localStorage.getItem("prenomUtilisateur");  //Ciblage du nom en local
             this.resaStation = sessionStorage.getItem("stationResa");
             this.changementTitre.innerHTML = `<strong style="font-size: 1.1em;">${this.insertPrenom}</strong>, votre réservation est valable pour une durée de 20min ! Votre vélo est disponible <strong style="font-size: 1.1em;">${this.resaStation}</strong>.`;        
             
             //Relance le compte à rebours
             if((this.seconde != 0)) {
				 this.secondes -= 1;
			 }
             if (((this.minutes < 0) || (this.minutes == 0)) && ((this.secondes < 0) || (this.secondes == 0))) {
				  this.resetCompteur();
			 }
			 if ((this.secondes < 0) && (this.minutes !== 0)) {
                  this.minutes -= 1;
                  this.secondes = 59;
             }

              //SessionStorage pour les minutes & secondes
              sessionStorage.setItem("secondes", this.secondes);  //Enregistrement des Secondes
              sessionStorage.setItem("minutes", this.minutes);  //Enregistrement des Minutes    
                           
              //Methode ajoutZero()
              this.ajoutZero();
              }, 1000); //Fin setInterval 
         }//Fin if sessionStorage 
    }//Fin refresh()
};//Fin Class



                    
      












