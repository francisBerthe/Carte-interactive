//Canvas

class Canvas {
  constructor() {
    this.boutonConfirmer = document.getElementById("bouton-confirmation"); //Ciblage du bouton confirmer  
    this.canvas = document.getElementById("canvas"); //Ciblage bloc canvas
    this.canvas.fillStyle = "#fff";  
    this.canvas.lineWidth = 2;
    this.canvas.lineCap = "round";
    this.context = this.canvas.getContext("2d");
    this.lastPos = null;
    this.drawing = false;  
       
    this.initMouseEvents();
    this.initTouchEvents();
    this.initClearEvent();
    this.clear(); 
    this.signature();  
  }
    
    initMouseEvents(){
    this.canvas.addEventListener("mousedown", (e) => {
      if (e.buttons === 1) this.start(this.positionSouris(e));
      this.drawing = true; 
      this.signature();  
    });
    this.canvas.addEventListener("mouseup", (e) => {
      this.stop(this.positionSouris(e));
      this.drawing = true; 
      this.signature();  
    });
    this.canvas.addEventListener("mousemove", (e) => {
      this.move(this.positionSouris(e));
    });
    this.canvas.addEventListener("mouseleave", (e) => {
      this.stop(this.positionSouris(e));
    });
    this.canvas.addEventListener("mouseenter", (e) => {
      if (e.buttons === 1) this.start(this.positionSouris(e));
    });
  }

  initTouchEvents(){
    this.canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      if (e.touches.length > 0) this.start(this.positionToucher(e));
    });
    this.canvas.addEventListener("touchend", (e) => {
      e.preventDefault();
      if (e.touches.length > 0) this.stop(this.positionToucher(e));
    });
    this.canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
      if (e.touches.length > 0) this.move(this.positionToucher(e));
    });
  }

  initClearEvent(){
    const bouttonClear = document.getElementById("effacer");
    bouttonClear.addEventListener("click", this.clear());
  }

  position(pos) {
    const rect = this.canvas.getBoundingClientRect(); 
    pos.x = (pos.x - rect.left) / (rect.right - rect.left) * this.canvas.width; 
    pos.y = (pos.y - rect.top) / (rect.bottom - rect.top) * this.canvas.height; 
    return pos;
  }

  positionSouris(e) {
    return this.position({
      x: e.clientX,
      y: e.clientY
    }); 
  }

  positionToucher(e) {
    return this.position({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }); //Position toucher 
  }

  dessiner(pos1, pos2) {
    this.context.moveTo(pos1.x, pos1.y); 
    this.context.lineTo(pos2.x, pos2.y); 
    this.context.stroke();
  }

  start(pos) {
    this.lastPos = pos; 
  }

  stop(pos) {
    if (this.lastPos) { 
      this.dessiner(this.lastPos, pos);
      this.lastPos = null; 
    }
  }

  move(pos) {
    if (this.lastPos) {
      const newPos = pos;
      this.dessiner(this.lastPos, newPos);
      this.lastPos = newPos;
    }
   }

  clear() {
    this.canvas.width = this.canvas.width;
  }
    
  signature() {
    this.boutonConfirmer = document.getElementById("bouton-confirmation"); //Ciblage du bouton confirmer
       if (this.drawing === true) {
         this.boutonConfirmer.style.visibility = "visible";
       } else {
        this.boutonConfirmer.style.visibility = "hidden";  
       }
  }//Fin signature()  


};//Fin Class













