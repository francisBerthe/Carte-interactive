                          //RESERVATION

 class Reservation {
  constructor() {
      this.nom = document.getElementById("input-nom"); //Ciblage input nom
      this.prenom = document.getElementById("input-prenom"); //Ciblage input prenom
      this.bouton = document.getElementById("bouton-reserver");  //Ciblage bouton réserver
      this.formulaireText = document.getElementById("formulaire-text"); //Ciblage du texte en bas du formulaire
      this.fondReservation = document.getElementById("fond-formulaire"); //Ciblage de l'encart formulaire
      
      let BackgroundColorInput = "#ff4747";  //Couleur background <input> par défaut
      let colorText = "#fff";    //Couleur Texte <input> par défaut 
      
      let validiteNom = ""; //Controle nom
      let validitePrenom = ""; //Controle prenom
      let regexMajuscule = /[A-Z]/; //Controle Maj
      let regexMinuscule = /[A-Z].+[a-z]/; //Controle lettres derriere la Maj
      
      this.validationDonnees();
      this.regexFormulaire();
      this.signatureVisible();
      this.remplirFormulaire();
  }//Fin constructor 

    validationDonnees() { //Verification de la longueur du Nom & Prenom
        this.bouton.style.visibility = "hidden"; //Bouton caché par défaut
        this.formulaireText.innerHTML = "* Veuillez inscrire votre nom et votre prenom pour réserver."; 
        
        this.nom.addEventListener ("input", function(e) {
              const valeurInput = e.target.value; //récupération de la valeur des <input>
              let BackgroundColorInput = "#ff4747";  //Couleur background <input> par défaut
              let colorText = "#fff";    //Couleur Texte <input> par défaut 
     
        if(valeurInput.length > 2) {  //Changement si + petit que 2 caractéres 
           BackgroundColorInput = "#fff";  
           colorText = "var(--couleurNoire)";
           this.bouton = document.getElementById("bouton-reserver");  
           this.bouton.style.visibility = "visible";
           this.formulaireText = document.getElementById("formulaire-text"); 
           this.formulaireText.style.visibility = "hidden";  
        } 
           this.nom = document.getElementById("input-nom"); //Ciblage input nom
           this.nom.style.backgroundColor = BackgroundColorInput;
           this.nom.style.color = colorText; 
       }); //Fin ecoute input
          
        this.prenom.addEventListener ("input", function(e) {
              const valeurInput = e.target.value; //récupération de la valeur des <input>
              let BackgroundColorInput = "#ff4747";  //Couleur background <input> par défaut
              let colorText = "#fff";    //Couleur Texte <input> par défaut 
              
     
       if(valeurInput.length > 2) {  //Changement si + petit que 2 caractéres 
           BackgroundColorInput = "#fff";  
           colorText = "var(--couleurNoire)";
           this.bouton = document.getElementById("bouton-reserver");  
           this.bouton.style.visibility = "visible";
           this.formulaireText = document.getElementById("formulaire-text");
           this.formulaireText.style.visibility = "hidden";
       } 
           this.prenom = document.getElementById("input-prenom"); //Ciblage input prenom 
           this.prenom.style.backgroundColor = BackgroundColorInput;
           this.prenom.style.color = colorText;
       }); //Fin ecoute input  
    } //Fin validationDonnees()
 
     
     regexFormulaire() { //Verification de la Majuscule + minuscule.
            this.formulaireText = document.getElementById("formulaire-text");
            this.formulaireText.innerHTML = "* Pour réserver un vélo, veuillez inscrire <br> &nbsp &nbspvotre nom et votre prénom."; 
            this.formulaireText.style.visibility = "visible"; 
            this.bouton.style.visibility = "hidden"; //Bouton caché par défaut
            
        this.nom.addEventListener("blur", function(e) {
             let validiteNom = "";
             let regexMajuscule = /[A-Z]/; //Controle Maj
             let regexMinuscule = /[A-Z].+[a-z]/; //Controle lettres derriere la Maj
    
       
       if(!regexMajuscule.test(e.target.value)) {
           this.bouton = document.getElementById("bouton-reserver");  
           this.bouton.style.visibility = "hidden";
           validiteNom = "Veuillez mettre une majuscule";
           this.formulaireText = document.getElementById("formulaire-text");
           this.formulaireText.style.visibility = "visible";
       } else if (!regexMinuscule.test(e.target.value)) {
           validiteNom = "Complétez votre nom";
           this.bouton = document.getElementById("bouton-reserver");  
           this.bouton.style.visibility = "hidden";
           this.formulaireText = document.getElementById("formulaire-text");
           this.formulaireText.style.visibility = "visible";
       } else {
           this.bouton = document.getElementById("bouton-reserver");  
           this.bouton.style.visibility = "visible";
           this.formulaireText = document.getElementById("formulaire-text");
           this.formulaireText.style.visibility = "hidden";
       }
    
           document.getElementById("spanNom").textContent = validiteNom; //Ajout du texte
       });//Fin Ecoute Blur 
         
       
       this.prenom.addEventListener("blur", function(e) {
             let validitePrenom = "";
             let regexMajuscule = /[A-Z]/; //Controle Maj
             let regexMinuscule = /[A-Z].+[a-z]/; //Controle lettres derriere la Maj
    
             this.bouton = document.getElementById("bouton-reserver");  
             this.bouton.style.visibility = "hidden"; //Bouton caché par défaut
            
       if(!regexMajuscule.test(e.target.value)) {
           this.bouton = document.getElementById("bouton-reserver");  
           this.bouton.style.visibility = "hidden";
           validitePrenom = "Veuillez mettre une majuscule";
       } else if (!regexMinuscule.test(e.target.value)) {
           validitePrenom = "Complétez votre prenom";
           this.bouton = document.getElementById("bouton-reserver");  
           this.bouton.style.visibility = "hidden";
       } else {
           this.bouton = document.getElementById("bouton-reserver");  
           this.bouton.style.visibility = "visible";
       }
    
           document.getElementById("spanPrenom").textContent = validitePrenom; //Ajout du texte       
       });//Fin Ecoute Blur  
     } //Fin regexFormulaire()


     signatureVisible() {  //Permet à l'utilisateur de signer pour Réserver
        this.bouton.addEventListener("click", () => {
            
          //ENREGISTREMENT DONNEES : Nom & Prenom
           let nom = document.getElementById("input-nom").value;  //Valeur du nom
           let prenom = document.getElementById("input-prenom").value; //Valeur du prenom
           
               localStorage.setItem("nomUtilisateur", nom);
               nom = localStorage.getItem("nomUtilisateur");
               localStorage.setItem("prenomUtilisateur", prenom);
               prenom = localStorage.getItem("prenomUtilisateur");
            
            if(nom !== "" && prenom !== "" && app.map.currentStation !== "") {
               this.fondReservation = document.getElementById("fond-formulaire"); 
               this.fondReservation.style.visibility = "hidden";
               this.bouton = document.getElementById("bouton-reserver");  
               this.bouton.style.visibility = "hidden";
            } else if (nom !== "" && prenom !== "") {
               this.fondReservation = document.getElementById("fond-formulaire"); 
               this.fondReservation.style.visibility = "visible";
               alert("Selectionnez une station en cliquant sur un marqueur pour poursuivre la réservation !");
            } else {
               this.fondReservation = document.getElementById("fond-formulaire"); 
               this.fondReservation.style.visibility = "visible";
            }//Fin du else
         })//Fin ecoute clic sur boutonReserver
      }; //Fin signatureVisible()
 
      
      remplirFormulaire() {
         let nom = document.getElementById("input-nom").value;  //Valeur du nom
         let prenom = document.getElementById("input-prenom").value; //Valeur du prenom 
         
            if (localStorage.getItem("nomUtilisateur") && (localStorage.getItem("prenomUtilisateur"))) {
                this.nom.value = localStorage.getItem("nomUtilisateur");   
                this.prenom.value = localStorage.getItem("prenomUtilisateur"); 
            } else {
                this.nom.value = "";   
                this.prenom.value = ""; 
            } 
      }//Fin remplirFormulaire()
 
 
};//Fin Class Reservation
  



   