                 //MAP

class Map {
  constructor() {
        this.currentStation = "";
        this.resaStation ="";
        this.mapTile = null;
        this.markerStation = [];
        this.markerClusters = new L.MarkerClusterGroup(); // Groupe de Clusters
        this.apiURL = "https://api.jcdecaux.com/vls/v1/stations?contract=Amiens&apiKey=471d9f879712ee728bf049b1cd1ae7b538eb18f8";
        this.iconeGreen = L.icon({  //Icone Open
            iconUrl: 'css/img/marker-green.png',  //Image Icone
            shadowUrl: 'css/img/icone-ombre.png', //Ombre Icone
            
            iconSize: [75, 85], //Taille icone  [largeur, hauteur]
            iconAnchor: [50, 50], // Position icone
            shadowSize: [93, 80], // Taille ombre
            shadowAnchor: [26, 37.2],  //Position ombre
            
            popupAnchor:  [-3, -50], //Position Popup
        })
        this.iconeOrange = L.icon({  //Icone close
            iconUrl: 'css/img/marker-orange.png', //Image Icone
            shadowUrl: 'css/img/icone-ombre.png', //Ombre Icone
            
            iconSize: [75, 85], //Taille icone  [largeur, hauteur]
            iconAnchor: [50, 50], // Position icone
            shadowSize: [93, 80], // Taille ombre
            shadowAnchor: [26, 37.2],  //Position ombre
            
            popupAnchor:  [-3, -50], //Position Popup
        })
        this.iconeRed = L.icon({  //Icone close
            iconUrl: 'css/img/marker-red.png', //Image Icone
            shadowUrl: 'css/img/icone-ombre.png', //Ombre Icone
            
            iconSize: [75, 85], //Taille icone  [largeur, hauteur]
            iconAnchor: [50, 50], // Position icone
            shadowSize: [93, 80], // Taille ombre
            shadowAnchor: [26, 37.2],  //Position ombre
            
            popupAnchor:  [-3, -50], //Position Popup
        })
      
        this.carte();
        this.addMarkers;
} //Fin Constructor

     
               //OPENSTREETMAP
   carte() {
   this.mapTile = L.map('mapid').setView([49.894180, 2.296121], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.mapTile);
    this.addMarkers(); //Ajout des markers sur la map
   }//Fin carte()
    

    
                //MARKERS
   addMarkers() {
          this.ajax = new Ajax(this.apiURL);
          this.ajax.ajaxGet(this.apiURL, (stations) => {
             
             stations.forEach((station) => {
                
            if (station.available_bikes > 3 && station.status === "OPEN" ) { //velo disponible & station "OPEN"
                let marker = L.marker([station.position.lat, station.position.lng]).setIcon(this.iconeGreen).bindPopup(`<strong> STATION &#8470; ${station.name}</strong> <br> ${station.address}`);
                this.markerStation.push(marker);   
                this.markerClusters.addLayer(marker); 
               
                marker.addEventListener('click', (e) => { //Clic Marqueur si disponible et "OPEN" !
                      this.currentStation = station;
                      this.resaStation = station;
                    
                      //ENREGISTREMENT DONNEES : Localisation
                  let localisation = document.getElementById("text-localisation"); //Ciblage de la div
                      localisation.textContent = station.address; //Localisation
                    
                       sessionStorage.setItem("stationAddress", station.address);
                       localisation = sessionStorage.getItem("stationAddress");
                    
                      //ENREGISTREMENT DONNEES : Statut Station
                  if (station.status === "OPEN") {  //Traduction en Français "OPEN"
                      station.status = "OUVERTE";
                  } else if (station.status === "CLOSE") { //Traduction en Français "CLOSE"
                      station.status = "FERMÃ‰E";
                  }
              
                      let nomStation = document.getElementById("text-station"); //Ciblage de la div
                      nomStation.textContent = station.status; //Nom de la station
                      
                      sessionStorage.setItem("stationStatut", station.status);
                      nomStation = sessionStorage.getItem("stationStatut");     
                     
                         //INCREMENTATION Vélo 
                      this.veloDisponible = document.getElementById("text-disponibilite"); //Ciblage de la div
                      this.veloDisponible.style.color = "var(--couleurNoire)"; //Le texte ci-dessus en rouge
                      
                  if ((sessionStorage.getItem("secondes")) && sessionStorage.getItem("stationAddress")) {
                      this.veloDisponible.innerHTML = station.available_bikes -1;
                  } else {
                      this.veloDisponible.innerHTML = station.available_bikes;
                  }
                    
                       //CHANGEMENTS Icone 
                   let iconeVeloDisponible = document.getElementById("icone-bicycle"); //Ciblage de la div
                   let blocPictogramme = document.getElementById("bloc-picto3"); //Ciblage de la div
                       iconeVeloDisponible.style.color = "var(--couleurNoire)"; //Changement couleur Icone
                       blocPictogramme.style.backgroundColor = "var(--couleurVerte)"; //Changement couleur Fond
                
                })
              } else if (station.available_bikes >= 1 && station.available_bikes <= 3  && station.status === "OPEN" ) { //Si moins de 3 stations
                    let marker = L.marker([station.position.lat, station.position.lng]).setIcon(this.iconeOrange).bindPopup(`<strong> STATION &#8470; ${station.name}</strong> <br> ${station.address}`);
                    this.markerStation.push(marker);
                    this.markerClusters.addLayer(marker); 
                
                marker.addEventListener('click', (e) => {  //Clic Marqueur si pas disponible !!
                       this.currentStation = station;
                       this.resaStation = station;
                    
                       //ENREGISTREMENT DONNEES : Localisation
                   let localisation = document.getElementById("text-localisation"); //Ciblage de la div
                       localisation.textContent = station.address; 
                    
                       sessionStorage.setItem("stationAddress", station.address);
                       localisation = sessionStorage.getItem("stationAddress");
                    
                       //ENREGISTREMENT DONNEES : Statut Station
                   if (station.status === "OPEN") {  //Traduction en Français "OPEN" 
                       station.status = "OUVERTE";
                   } else if (station.status === "CLOSE") {  //Traduction en Français "CLOSE"
                       station.status = "FERMÃ‰E";
                   }
                     
                   let nomStation = document.getElementById("text-station"); //Ciblage de la div
                       nomStation.textContent = station.status; //Par défaut
                    
                       sessionStorage.setItem("stationStatut", station.status);
                       nomStation = sessionStorage.getItem("stationStatut");    
                     
                       //INCREMENTATION Vélo 
                    this.veloDisponible = document.getElementById("text-disponibilite"); //Ciblage de la div
                         this.veloDisponible.style.color = "var(--couleurNoire)"; //Le texte ci-dessus en rouge
                    
                    if ((sessionStorage.getItem("secondes")) && sessionStorage.getItem("stationAddress")) {
                       this.veloDisponible.innerHTML = station.available_bikes -1;
                    } else {
                       this.veloDisponible.innerHTML = station.available_bikes;
                    }
                    
                        //CHANGEMENTS ICONE
                      let iconeVeloDisponible = document.getElementById("icone-bicycle"); //Ciblage de la div
                      let blocPictogramme = document.getElementById("bloc-picto3"); //Ciblage de la div
                         iconeVeloDisponible.style.color = "#fff"; //Changement couleur Icone
                         blocPictogramme.style.backgroundColor = "#ff7e00"; //Changement couleur Fond
                })  
            } else { //Si station "CLOSE" & velo pas disponible
                let marker = L.marker([station.position.lat, station.position.lng]).setIcon(this.iconeRed).bindPopup(`<strong> STATION &#8470; ${station.name}</strong> <br> ${station.address}`);
                this.markerStation.push(marker);
                this.markerClusters.addLayer(marker); 
                
              marker.addEventListener('click', (e) => {  //Clic Marqueur si pas disponible !!
                       this.currentStation = station;
                       this.resaStation = station;
                  
                       //ENREGISTREMENT DONNEES : Localisation
                 let localisation = document.getElementById("text-localisation"); //Ciblage de la div
                     localisation.textContent = station.address; 
                    
                     sessionStorage.setItem("stationAddress", station.address);
                     localisation = sessionStorage.getItem("stationAddress");
                    
                       //ENREGISTREMENT DONNEES : Statut Station
                  if (station.status === "OPEN") {  //Traduction en Français "OPEN" 
                     station.status = "OUVERTE";
                  } else if (station.status === "CLOSE") {  //Traduction en Français "CLOSE"
                     station.status = "FERMÃ‰E";
                  }
                     
                  let nomStation = document.getElementById("text-station"); //Ciblage de la div
                      nomStation.textContent = station.status; //Par défaut
                    
                        //CHANGEMENT vélos Disponibles
                  let veloDisponible = document.getElementById("text-disponibilite"); //Ciblage de la div
                      veloDisponible.textContent = "Pas de vélo disponible :)"; //Par défaut
                      veloDisponible.style.color = "var(--couleurNoire)"; //Le texte ci-dessus en rouge
                     
                       //CHANGEMENTS Icone
                  let iconeVeloDisponible = document.getElementById("icone-bicycle"); //Ciblage de la div
                  let blocPictogramme = document.getElementById("bloc-picto3"); //Ciblage de la div
                      iconeVeloDisponible.style.color = "#fff"; //Changement couleur Icone
                      blocPictogramme.style.backgroundColor = "#ff4747"; //Changement couleur Fond
                })  
             } //Fin du else
          }) //Fin forEach
            this.mapTile.addLayer(this.markerClusters);
       })//Fin ajaxGet
     }//Fin addMarkers()


};//Fin Class Map





      
         
          


         
         
      


     