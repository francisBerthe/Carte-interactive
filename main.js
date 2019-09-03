class Main {
    constructor() {
        this.timer = new Timer(20, 0); //Instance Timer()
        this.map = new Map(); //Instance Map()
        this.diapo = new Diaporama(images, textes); //Instance Diaporama()
        this.canvas = new Canvas(); //Instance Canvas()
        this.bouton = new Bouton(); //Instance Bouton()
        this.reservation = new Reservation(); //Instance Reservation()
    }//Fin constructor 
};//Fin class Main

let app = null;

window.onload = () => { //Chargement de l'instance Main au lancement du site
  app = new Main();
}; 

