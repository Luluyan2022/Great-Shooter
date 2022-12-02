class Game{
    constructor(){
        this.shooter = null;
        this.targetsArray = [];
    }
    start(){
        this.shooter = new Shooter();
        this.detectShooterMove();

        //create targets
        setInterval(() => {
            const target = new Target();
            this.targetsArray.push(target);   
            
        }, 3000);

        //keep creating moving targets 
        
        setInterval(() => {

            this.targetsArray.forEach(targetInstance => {

                targetInstance.moveLeft();

                 this.removeTargetIfOutside(targetInstance);
                
            });
    
        }, 1000);     
    }
    // shooter manipulate the game 
    detectShooterMove() {
        document.addEventListener(`keydown`, e => {
            if (e.key === "ArrowLeft") {
                this.shooter.moveLeft();
            } else if (e.key === "ArrowRight") {
                this.shooter.moveright();
            };
        });
    };

    removeTargetIfOutside(targetInstance){
        if(targetInstance.positionX + targetInstance.width <= 0){
            targetInstance.newTarget.remove();
            this.targetsArray.shift();
         } 
    }

    removeTargetInCertainTime(targetInstance){
        setInterval(() => {
            targetInstance.newTarget.remove();
            this.targetsArray.shift();
        }, 500);
    }
}



//creat a player 
class Shooter {
    constructor (){
        this.height = 10;
        this.width = 6;
        this.positionX = 50 - this.width / 2; 
        this.positionY = 0;
        this.newShooter = null;
        this.createNewShooter(); 
   }
    createNewShooter(){
       //creat the player
        this.newShooter = document.createElement(`div`);
       //add content
        this.newShooter.id = "shooter";
        this.newShooter.style.width = this.width + "vw";
        this.newShooter.style.height = this.height + "vh";
        this.newShooter.style.bottom = this.positionY + "vh";
        this.newShooter.style.left = this.positionX + "vw";
       //append to the dom
       const boardElm = document.getElementById("board");
       boardElm.appendChild(this.newShooter);

   }
     moveLeft (){
        this.positionX --;
        this.newShooter.style.left = this.positionX + "vw";
     }

     moveright(){
        this.positionX ++;
        this.newShooter.style.left = this.positionX + 'vw';
     }

     



}


class Target{
    constructor(){
         this.height = 5;
         this.width = 5;
         this.positionX = Math.round(Math.random()*100)  ; 
         this.positionY = 90;
         this.newTarget = null;
         this.createTarget();   
     }
    createTarget(){
        //creat one target
        this.newTarget = document.createElement(`div`);
        //add content
         this.newTarget.className = "target";
         this.newTarget.style.width = this.width + "vw";
         this.newTarget.style.height = this.height + "vh";
         this.newTarget.style.bottom = this.positionY + "vh";
         this.newTarget.style.left = this.positionX + "vw";
        //append to the dom
         const boardElm = document.getElementById("board");
         boardElm.appendChild(this.newTarget);

     }
     moveLeft(){
         
         this.positionX = this.positionX - 12;
         this.newTarget.style.left = this.positionX + "vw";  
         
     }  
}                 
 
const target = new Target();




const game = new Game();
game.start();



