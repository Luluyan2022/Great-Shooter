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

        setInterval(() => {
            //create targets
            const target = new Target();
            target.createTarget();
            target.markToRemove();
            this.targetsArray.push(target);
            //create bombs   
            const bomb = new Bomb();
            bomb.createBomb();
            bomb.markToRemove();
            this.bombsArray.push(bomb); 
        }, 2000);        
       
                
        setInterval(() => {

            //remove the ghost of targets and bombs
            const newTargetsArray = this.targetsArray.filter((target) =>{
                return target.notRemove
            }) 
             this.targetsArray = newTargetsArray;            
             
             const newBombsArray = this.bombsArray.filter((bomb) =>{
                return bomb.notRemove
            }) 
             this.bombsArray = newBombsArray; 

            //update obstacles
            this.bombsArray.forEach(bombInstance => {
                 //prevent too many bombs on the screen
                 setTimeout(() => {
                    bombInstance.newBomb.remove();
                    this.bombsArray.shift();
                }, 2000);               
               this.targetsArray.forEach(targetInstance => { 
                //remove the targets after a certain time if they weren't shot
                    setTimeout(() => {
                        targetInstance.newTarget.remove();
                        this.targetsArray.shift();
                    }, 2000);
                });                
            });  

        }, 500);

        //update the bullets
        setInterval(() => {

            this.bulletsArray.forEach(bulletInstance => {
                bulletInstance.moveTop();
                //limit the moving scope of the bullets
                // if (bulletInstance.positionY + bulletInstance.height >= 100) {
                //     bulletInstance.newBullet.remove();
                //     this.bulletsArray.shift();
                // };

                // //detect collision with targets
                this.targetsArray.forEach(targetInstance =>{
                    //console.log(bulletInstance);
                    if (bulletInstance.positionX < targetInstance.positionX + targetInstance.width &&
                        bulletInstance.positionX + bulletInstance.width > targetInstance.positionX &&
                        bulletInstance.positionY < targetInstance.positionY + targetInstance.height &&
                        bulletInstance.positionY + bulletInstance.height > targetInstance.positionY
                        ) {
                        console.log("collision 1 detected!");
                        this.board.calculateSumPoints(); 

                        //remove the targets who were shot by shooter and the bullets 
                        document.getElementById('shot-audio').play();
                        targetInstance.newTarget.remove();                        
                        bulletInstance.newBullet.remove();
                    };
                })                
                this.bombsArray.forEach(bombInstance =>{
                //detect collision with bombs 
                    if (bulletInstance.positionX < bombInstance.positionX + bombInstance.width &&
                        bulletInstance.positionX + bulletInstance.width > bombInstance.positionX &&
                        bulletInstance.positionY < bombInstance.positionY + bombInstance.height &&
                        bulletInstance.positionY + bulletInstance.height > bombInstance.positionY
                        ) {
                        //console.log("collision detected!");
                        document.getElementById('exploded-audio').play();
                        //setTimeout(() => { location.href = `./gameOver.html` }, 2000);
                    }
                })
            });
        }, 100);
      
    }

    // shooter manipulate the game: move or shoot 
    detectShooterAction() {
        

        document.addEventListener(`keydown`, e => {
            if (e.key === "ArrowLeft") {
                this.shooter.moveLeft();
            } else if (e.key === "ArrowRight") {
                this.shooter.moveright();
            }  
            //shoot the bullets 
            else if(e.key === "ArrowUp"){
                //1. create a new instance of the class Bullet
                const bullet = new Bullet(this.shooter.positionX + this.shooter.width/2);               
                //2. push that instance to the array of buttets
                this.bulletsArray.push(bullet);
            }                   
        });  
    }     
}
 
//creat a player 
class Shooter {
    constructor (){
        this.height = 25;
        this.width = 10;
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
        this.newShooter.style.backgroundImage = "url(./img/shooter.png)";
        this.newShooter.style.backgroundSize = "cover";
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
            this.positionX;
            this.newShooter.style.left = this.positionX + "vw";
        }
     }

     moveright(){
        if(this.positionX + this.width <= 96){
            this.positionX = this.positionX + 4;
            this.newShooter.style.left = this.positionX + 'vw';
            //console.log(this.positionX);
        } else {
            this.positionX;
            this.newShooter.style.left = this.positionX + 'vw';
        }
     }  
}

class Target{
    constructor(){
         this.height = 10;
         this.width = 4;
         this.positionX = Math.round(Math.random()*75 + 10)  ; 
         this.positionY = Math.round(Math.random()*40 + 35);
         this.newTarget = null;
         this.notRemove = true;
     }
    createTarget(){
        //creat one target
        this.newTarget = document.createElement(`div`);
        //add content
         this.newTarget.className = "target";
         this.newTarget.style.backgroundImage = "url(./img/target.png)";
         this.newTarget.style.backgroundSize = "cover";
         this.newTarget.style.width = this.width + "vw";
         this.newTarget.style.height = this.height + "vh";
         this.newTarget.style.border = "thick solid white"
         this.newTarget.style.left = this.positionX + "vw";
         this.newTarget.style.bottom = this.positionY + "vh";
        //append to the dom
         const boardElm = document.getElementById("board");
         boardElm.appendChild(this.newTarget);
     }
    markToRemove(){
        setTimeout(() => {
            this.notRemove = false;
            this.newTarget.remove();
        },1500)
    }     
}                 
 
//create obstacles-Bombs
class Bomb {
    constructor() {
       this.width = 30;
       this.height = 30;
       this.positionX = Math.round(Math.random() * 90);
       this.positionY = Math.round(Math.random() * 40 + 20);
       this.newBomb = null;
       this.notRemove = true;
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
    markToRemove(){
        setTimeout(() => {
            this.notRemove = false;
            this.newBomb.remove();
        },1500)
    }
}

//create bullet
class Bullet{
    constructor(shooterPositionX){
        this.newBullet = null;
        this.width = 1;
        this.height = 8;
        this.positionX = shooterPositionX - this.width/2;
        this.positionY = 25;
        this.createBullet();
    }
    createBullet(){
        this.newBullet = document.createElement('div');
        this.newBullet.className = "bullet";
        this.newBullet.style.width = this.width + "vw";
        this.newBullet.style.height = this.height + "vh";
        this.newBullet.style.left = this.positionX + "vw";
        this.newBullet.style.bottom = this.positionY + 'vh';
        //this.newBullet.style.border = "thick solid #0000FF"

        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.newBullet); 
    }
    moveTop(){
        this.positionY = this.positionY + 10;
        this.newBullet.style.bottom = this.positionY + "vh";
    }
}

//create calculateboard
class Calculateboard{
    constructor(){
        this.width = 15;
        this.height = 15;
        this.positionX = 50 - this.width /2;
        this.positionY = 85;
        this.calculateboard = null;
        this.points = 0;
        this.createBoard();
        
    }
    createBoard(){
        this.calculateboard = document.createElement('div');
        this.calculateboard.id = "sumPoints";
        this.calculateboard.style.backgroundImage = "url(./img/scoreBoard.png)";
        this.calculateboard.style.backgroundSize = "cover";
        this.calculateboard.style.width = this.width + "vw";
        this.calculateboard.style.height = this.height + "vh";
        this.calculateboard.style.left = this.positionX + "vw";
        this.calculateboard.style.bottom = this.positionY + "vh"
        const boardElm = document.getElementById('board');
        boardElm.appendChild(this.calculateboard);       
        this.calculateboard.innerHTML = '<div id = "sumPoints"><p><span id="score">0</span></p></div>';
    }
    calculateSumPoints() {
        this.points = points;
        this.points += 1; 
        document.getElementById('score').innerHTML = this.points;        
    }
}


const game = new Game();
game.start();



