// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // initialize with random stats
    this.randomizeEnemy();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    // if fully off screen to the right, regenerate enemy
    if (this.x > 505) {
      this.randomizeEnemy();
    }
    //check for collision with player
    if (this.collisionCheck(this.x, this.y, 60, 70, player.x, player.y+20, 70, 70)) {
      player.score--;
      player.resetPlayer();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Randomize the enemy's position and speed to keep things interesting
Enemy.prototype.randomizeEnemy = function() {
  // always start just off screen to the left
  this.x = -101;
  // randomly select one of the 3 stone rows
  this.y = (Math.floor(Math.random() * 3) + 1) * 75;
  // random speed between 70 and 190
  this.speed = (Math.floor(Math.random() * 120) + 70);
}

// Check for collision by checking for rectangle overlap
Enemy.prototype.collisionCheck = function(x1, y1, w1, h1, x2, y2, w2, h2) {
  // turn widths into right side x value
  w2 += x2;
  w1 += x1;
  // if the left side of 2 is bigger than right side of 1,
  // or the left side of 1 is bigger than right side of 2,
  // then collision isn't possible
  if (x2 > w1 || x1 > w2) {
    return false;
  }
  // turn heights into bottom side y value
  h2 += y2;
  h1 += y1;
  // if the top side of 2 is bigger than bottom side of 1,
  // or the top side of 1 is bigger than bottom side of 2,
  // then collision isn't possible
  if (y2 > h1 || y1 > h2) {
    return false;
  }
  // otherwise collision occured
  return true;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Our Player
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.resetPlayer();
    this.score = 0;
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // If player reaches the water, reset to starting position
    if (this.y === -40) {
      this.score++;
      this.resetPlayer();
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.font = '48px serif';
    ctx.fillText(`Score: ${this.score}`, 0, 580);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle user input to move Player
Player.prototype.handleInput = function(key) {
  // move player but contain within the game board
  switch(key) {
    case 'left':
      if (this.x > 0)
        this.x -= 101;
      break;
    case 'up':
      if (this.y > -40)
        this.y -= 83;
      break;
    case 'right':
      if (this.x < 404)
        this.x += 101;
      break;
    case 'down':
      if (this.y < 375)
        this.y += 83;
      break;
  }
}

// Reset player position to starting position
Player.prototype.resetPlayer = function() {
  this.x = 2*101;
  this.y = 5*75;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [
  new Enemy(),
  new Enemy(),
  new Enemy()
];
let player = new Player();


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
