class Game{
    constructor(){
        this.shooter = null;
        this.target = null;
        this.targetsArray = [];
        this.bombsArray = [];
        this.bulletsArray = [];
        this.points = 0;
    }
    start(){
        this.shooter = new Shooter();  
        this.board = new Calculateboard(); 
             
        this.detectShooterAction();

        //create targets
        setInterval(() => {
            const target = new Target();
            target.createTarget();   
            this.targetsArray.push(target);             
            
        }, 1000);

        //create bombs 
        setInterval(() => {
            const bomb = new Bomb();
            bomb.createBomb();
            this.bombsArray.push(bomb); 
            
        }, 500);

       

        

        //keep creating flashing targets         
        setInterval(() => {

            this.targetsArray.forEach(targetInstance => {                

                //remove the targets which comes out of the screen
                if(targetInstance.positionX + targetInstance.width <= 0){
                    targetInstance.newTarget.remove();
                    this.targetsArray.shift();
                 } 

                //remove the targets who were shot by shooter 
                
                /* document.addEventListener(`keydown`, e => {
                    if (e.key === "ArrowUp" && this.shooter.positionX + (this.shooter.width / 2) > targetInstance.positionX
                    && this.shooter.positionX + (this.shooter.width / 2) < targetInstance.positionX + targetInstance.width
                    ){                                               
                        targetInstance.newTarget.remove();
                    }
                    })
                */

                //remove the targets after a certain time if they weren't shot
                setTimeout(() => {
                    targetInstance.newTarget.remove();
                    this.targetsArray.shift();
                },1000);

                });         
             
            //update obstacles
            this.bombsArray.forEach(bombInstance => {

                //move current obstacles (try to simplify the game,let obstacles move like targets,so delete it)
                // bombInstance.keepMovingright();                

                //limit the moving scope of the Bombs
                if(bombInstance.positionX <= 100){
                    bombInstance.newBomb.remove();
                    this.bombsArray.shift();
                 } 
               
            });  

        }, 1500);

        //update the bullets
        setInterval(() => {

            this.bulletsArray.forEach(bulletInstance => {


                bulletInstance.moveTop();

                //limit the moving scope of the bullets
                if (bulletInstance.positionY + bulletInstance.height >= 100) {
                    bulletInstance.newBomb.remove();
                    this.bulletsArray.shift();
                };

                //detect collision with targets
                if(bulletInstance.positionX < targetInstance.positionX + targetInstance.width  &&
                    bulletInstance.positionX + bulletInstance.width > targetInstance.positionX && 
                    bulletInstance.positionY < targetInstance.positionY + targetInstance.height &&
                    bulletInstance.positionY + bulletInstance.height > targetInstance.positionY
                    ){
                      //console.log("collision detected!");
                      this.calculateSumPoints();  
                    };
                

                //detect collision with bombs 
                if(bulletInstance.positionX < bombInstance.positionX + bombInstance.width  &&
                    bulletInstance.positionX + bulletInstance.width > bombInstance.positionX && 
                    bulletInstance.positionY < bombInstance.positionY + bombInstance.height &&
                    bulletInstance.positionY + bulletInstance.height > bombInstance.positionY)
                {
                    location.href = `gameOver.html`;
                }

            });
        }, 1000);
      
    } 

    // shooter manipulate the game: move or shoot 
     detectShooterAction(){
        

        document.addEventListener(`keydown`, e => {
            if (e.key === "ArrowLeft") {
                this.shooter.moveLeft();
            } else if (e.key === "ArrowRight") {
                this.shooter.moveright();
            }  //shoot the bullets 
            else if(e.key === "ArrowUp"){
                //1. create a new instance of the class Bullet
                const bullet = new Bullet;               
                //2. push that instance to the array of buttets
                this.bulletsArray.push(bullet);
            }                   
        });  
               
            
    /*calculateSumPoints(){
      this.points = this.points + 10;
      this.calculateboard.innerHTML = this.points;
    }*/
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
            //console.log(this.positionX);
        } else {
            this.positionX
            this.newShooter.style.left = this.positionX + 'vw';
        }
     }  



}


class Target{
    constructor(){
         this.height = 300;
         this.width = 200;
         this.positionX = Math.round(Math.random()*85)  ; 
         this.positionY = 50;
         this.newTarget = null;
         
     }
    createTarget(){
        //creat one target
        this.newTarget = document.createElement(`div`);
        //add content
         this.newTarget.className = "target";
         this.newTarget.style.backgroundImage = "url(./img/target.png)";
         this.newTarget.style.backgroundSize = "cover";
         this.newTarget.style.width = this.width + "px";
         this.newTarget.style.height = this.height + "px";
         this.newTarget.style.left = this.positionX + "vw";
         this.newTarget.style.bottom = this.positionY + "vh";
         
        //append to the dom
         const boardElm = document.getElementById("board");
         boardElm.appendChild(this.newTarget);

     }
     
}                 
 
//create obstacles-Bombs
class Bomb {
    constructor() {
       this.width = 100;
       this.height = 100;
       this.positionX = Math.round(Math.random() * 95);
       this.positionY = Math.round(Math.random() * 40 + 20);
       this.newBomb = null;
      
    }
    createBomb(){
       this.newBomb = document.createElement(`div`);
       this.newBomb.className = "obstacle";
       this.newBomb.style.backgroundImage = "url(./img/bomb.png)";
       this.newBomb.style.backgroundSize = "cover";
       this.newBomb.style.width = this.width + "px";
       this.newBomb.style.height = this.height + "px";
       this.newBomb.style.left = this.positionX + "vw";
       this.newBomb.style.bottom = this.positionY + "vh";
       const boardElm = document.getElementById("board");
       boardElm.appendChild(this.newBomb);
    }
    /* keepMovingright(){
          this.positionX = this.positionX + 5;
          this.newBomb.style.left = this.positionX + "vw";  
    } */
}

//create bullet
class Bullet{
    constructor(){
        this.newBullet = null;
        this.width = 100;
        this.height = 100;
        this.positionX = 0;
        this.positionY = 0;
        this.createBullet();
    }
    createBullet(){
        const newBullet = document.createElement('div');
        this.newBullet.style.backgroundImage = "url(./img/bullet.png)";
        this.newBullet.className = "bullet";
        this.newBullet.style.backgroundSize = "cover";
        this.newBullet.style.width = this.width + "px";
        this.newBullet.style.height = this.height + "px";
        this.newBullet.style.left = this.shooter.positionX + "vw";
        this.newBullet.style.bottom = this.positionY + 'vh';
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.newBullet); 
    }
    moveTop(){
        this.positionY = this.positionY + 5;
        this.newBullet.style.bottom = this.positionY + "vh";
    }
}

//create calculateboard
class Calculateboard{
    constructor(){
        this.width = 15;
        this.height = 10;
        this.positionX = 0;
        this.positionY = 85;
        this.calculateboard = null;
        this.createBoard();
    }
    createBoard(){
        this.calculateboard = document.createElement('div');
        this.calculateboard.id = "sumPoints";
        this.calculateboard.style.width = this.width + "vw";
        this.calculateboard.style.height = this.height + "vh";
        this.calculateboard.style.left = this.positionX + "vw";
        this.calculateboard.style.bottom = this.positionY + "vh"
        const boardElm = document.getElementById('board');
        boardElm.appendChild(this.calculateboard);
    }
}


const game = new Game();
game.start();



