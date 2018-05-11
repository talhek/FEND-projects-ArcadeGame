// Enemies our player must avoid
class Enemy{
    constructor(coordinate_x, coordinate_y, speed){
        this._coordinate_x = coordinate_x;
        this._coordinate_y = coordinate_y;
        this._speed = speed;

        //getters
        //Axis X coordinate
        this.getX = function(){
            return this._coordinate_x;
        }
        //Axis Y coordinate
        this.getY = function(){
            return this._coordinate_y;
        }
        //Speed getter
        this.getSpeed = function(){
            return this._speed;
        }
        //setters
        //Axis X setter
        this.setX = function(coordinate_x){
            this._coordinate_x = coordinate_x;
        }
        //Axis Y setter
        this.setY = function(coordinate_y){
            this._coordinate_y = coordinate_y;
        }
        
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.setX(this.getX() + (dt * 100 * this.getSpeed()));
    //this._coordinate_x += dt* 100 * this.getSpeed();
    if (this.getX() >=500){
        this._coordinate_x = Math.floor((Math.random() * -300) + -50);
        this.speed = Math.floor((Math.random() * 3) + 1);
    }
}
    // Draw the enemy on the screen, required method for game
    render(){
    ctx.drawImage(Resources.get(this.sprite), this.getX(), this.getY());
    }
}
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

//checks if a colission occured on the X axis
function checkAxisX(player, enemy){
    if((player.getX() >= enemy.getX() -30) && (player.getX() <= enemy.getX() + 20))
    {
        return true;
    }
    else{
        return false;
    }
}
//checks if a colission occured on the Y axis
function checkAxisY(player, enemy){
    if((player.getY() >= enemy.getY() - 20) && (player.getY() <= enemy.getY() + 20))
    {
        return true;
    }
    else {
        return false;
    }
}
//checks if a colission between a player and an enemy object occured
//if it did, restarting the game
function check_colission(player, enemy){

    if (checkAxisX(player, enemy) && checkAxisY(player, enemy)){
        console.log(`colission: Player cord- ${player._coordinate_x},${player._coordinate_y}:: enemy cord- ${enemy._coordinate_x},${enemy._coordinate_y}`);
        gameLost();
    }

}
//game lost, restarting game by reloading page
function gameLost(){
    location.reload();
}
//game won, displaying modal info
function gameWon(){
    let modal = document.getElementById('congratsModal');
    let modalClose = document.querySelector(".modalClose");
    let modalRestart = document.querySelector(".modalRestart");
    modalClose.addEventListener('click', function(){
        pauseCardsSelection();
        modal.style.display = "none";
    })
    modalRestart.addEventListener('click', function(){
        location.reload();
    });
    gameStats(); 

    modal.style.display = "block";
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
//prints the game statistics
function gameStats(){
    let modalStats = document.querySelector(".modalStats");
    let modalHeader = document.querySelector(".modalHeader");

    modalHeader.innerHTML = "YOU WON!!!!!!"; 
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player{
    constructor(coordinate_x, coordinate_y){
        this._coordinate_x = coordinate_x;
        this._coordinate_y = coordinate_y;
        this.sprite = 'images/char-boy.png';
        
        //getters
        this.getX = function (){
            return this._coordinate_x;
        }
        this.getY = function(){
            return this._coordinate_y;
        }
        //setters
        this.setX = function (coordinate_x){
            this._coordinate_x = coordinate_x;
        }
        this.setY = function (coordinate_y){
            this._coordinate_y = coordinate_y;
        }
        
    }
    update(dt){
        for (let i = 0; i < allEnemies.length; i++){
            check_colission(this, allEnemies[i]);
        }
        //player cannot step out of map bounds
        if (this.getY() <= -30){
            this.setY(-30);
            gameWon();
        }
        if(this.getY() >= 385){
            this.setY(385);
        }
        if(this.getX() <= 0){
            this.setX(0);
        }
        if(this.getX() >= 400){
            this.setX(400);
        }
        
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.getX(), this.getY());
    }
    /* This functions handles the user 'player input
    * and moves the player to the correct direction 
    * in accordance to the key selected
    */
    handleInput(direction){
        switch(direction){
            case "up":
            this.setY(this.getY() - 85);
            break;
            case "down":
            this.setY(this.getY() +85);
            break;
            case "left":
            this.setX(this.getX() -100);
            break;
            case "right":
            this.setX(this.getX() +100);
            break;
        }
    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player(200, 300);
const enemy_one = new Enemy(Math.floor((Math.random() * -200) + 0), 50, 1);
const enemy_two = new Enemy(Math.floor((Math.random() * -200) + 0), 150, 1.25);
const enemy_three = new Enemy(Math.floor((Math.random() * -200) + 0), 225, 2);
const allEnemies = [enemy_one, enemy_two, enemy_three];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
