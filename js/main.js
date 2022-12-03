class Game{
    constructor(){
        this.shooter = null;
        this.target = null;
        this.targetsArray = [];
    }
    start(){
        this.shooter = new Shooter();
        
        this.detectShooterAction();

        //create targets
        setInterval(() => {
            const target = new Target();
            this.targetsArray.push(target);   
            
        }, 1000);

        //keep creating flashing targets 
        
        setInterval(() => {

            this.targetsArray.forEach(targetInstance => {

                // targetInstance.moveLeft();

                //remove the targets which comes out of the screen
                 this.removeTargetIfOutside(targetInstance);

                //remove the targets who were shot by shooter 
                 this.removeshotTargets(targetInstance);

                
                this.removeTargetInCertainTime(targetInstance);
                
                
            });
    
        }, 1100);     
    }

    // shooter manipulate the game: move or shoot 
    detectShooterAction() {
        document.addEventListener(`keydown`, e => {
            if (e.key === "ArrowLeft") {
                this.shooter.moveLeft();
            } else if (e.key === "ArrowRight") {
                this.shooter.moveright();
            } else if (e.key === "ArrowUp"){
                //console,console.log("I shot");
                this.removeshotTargets();
            };
        });
    };

    removeTargetIfOutside(targetInstance){
        if(targetInstance.positionX + targetInstance.width <= 0){
            targetInstance.newTarget.remove();
            this.targetsArray.shift();
         } 
    }
    //remove the targets after a certain time if they weren't shot
    removeTargetInCertainTime(targetInstance){
        
        targetInstance.newTarget.remove();
        this.targetsArray.shift();
       
    }

    // when the target was shot, remove it
    removeshotTargets(targetInstance){

        if(
            this.shooter.positionX + (this.shooter.width / 2) > targetInstance.positionX 
        && this.shooter.positionX + (this.shooter.width / 2) < targetInstance.positionX + targetInstance.width
        ){
            
            targetInstance.newTarget.remove();           
        }
    }
}



//creat a player 
class Shooter {
    constructor (){
        this.height = 10;
        this.width = 4;
        this.positionX = 50 - (this.width / 2); 
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
    //limit the moving area in the scope of the screen
     moveLeft (){
        if(this.positionX >= 4){
            this.positionX = this.positionX - 4;
            this.newShooter.style.left = this.positionX + "vw";
        } else {
            this.positionX
            this.newShooter.style.left = this.positionX + "vw";
        }
     }

     moveright(){
        if(this.positionX + this.width <= 96){
            this.positionX = this.positionX + 4;
            this.newShooter.style.left = this.positionX + 'vw';
            console.log(this.positionX);
        } else {
            this.positionX
            this.newShooter.style.left = this.positionX + 'vw';
        }
     }

     



}


class Target{
    constructor(){
         this.height = 5;
         this.width = 5;
         this.positionX = Math.round(Math.random()*95)  ; 
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
     /*moveLeft(){
         
         this.positionX = this.positionX - 12;
         this.newTarget.style.left = this.positionX + "vw";  
         
     }  */ 
}                 
 





const game = new Game();
game.start();



