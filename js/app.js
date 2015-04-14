var Playground = function() {
  this.grid = {
    "width":101,
    "height":83,
    "widthHalf":50,
    "heightHalf":41
  };

  this.row = 6;
  this.column = 5;
};

Playground.prototype.getRandomPlayerSpawnCoordinate = function() {
  return {
    "x":((Math.floor(Math.random() * 5)) * this.grid.width),
    "y":((Math.floor(Math.random() * 1 + 4) + 0.5) * this.grid.height)
  };
};

Playground.prototype.getRandomEnemySpawnCoordinate = function() {
  return {
    "x":-playground.grid.width,
    "y":((Math.floor(Math.random() * 2 + 1) + 0.5) * this.grid.height)
  };
};

Playground.prototype.getWidth = function() {
  return this.grid.width * this.column;
};

Playground.prototype.getHeight = function() {
  return this.grid.height * this.row;
};

var playground = new Playground();


// == Mother of anything moving ================================================
var MovingObject = function() {
};

// The x coordinate for mobing object
MovingObject.prototype.x = 0;
// The y coordinate for moving object
MovingObject.prototype.y = 0;
// The speed for the moving object
MovingObject.prototype.speed = 0;


// == Enemies our player must avoid ============================================
var Enemy = function(coordinate) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // The x coordinate for enemy
    this.x = coordinate.x;

    // The y coordinate for enemy
    this.y = coordinate.y;

    // The speed for enemy, pixels per time
    this.speed = Math.random() * 40 + 10; // TODO: Randomize enemy speed
}

Enemy.prototype = Object.create(MovingObject.prototype);
Enemy.prototype.constructor = MovingObject;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * dt;

    if(this.x > playground.getWidth())
    {
      var i = allEnemies.indexOf(this);
      allEnemies.splice(i, 1);
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(coordinate) {
  // The image/sprite for our player, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/char-boy.png';

  // The x coordinate for player
  this.x = coordinate.x;

  // The y coordinate for player
  this.y = coordinate.y;

  // The speed for enemy, pixels per time
  this.speed = 500; // TODO: Randomize enemy speed

  // Pending movement
  this.pendingMove = null;

  // Flag for life and death
  this.alive = true;
}

Player.prototype = Object.create(MovingObject.prototype);
Player.prototype.constructor = MovingObject;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    var move = this.pendingMove;

    if (move == 'left') {
      // TODO: Move - horizontal
      if (this.x >= playground.grid.width) {
        this.x -= playground.grid.width;
      }
    }
    else if (move == 'right') {
      // TODO: Move + horizontal
      if (this.x < playground.grid.width * (playground.column - 1)) {
        this.x += playground.grid.width;
      }
    }
    else if (move == 'up') {
      if (this.y > 0) {
        this.y -= playground.grid.height;
      }
    }
    else if (move == 'down') {
      if (this.y < playground.grid.height * (playground.row - 2)) {
        this.y += playground.grid.height;
      }
    }

    this.pendingMove = null;
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Handle input for player
Player.prototype.handleInput = function(input) {
  this.pendingMove = input;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [
  new Enemy(playground.getRandomEnemySpawnCoordinate()),
  new Enemy(playground.getRandomEnemySpawnCoordinate()),
  new Enemy(playground.getRandomEnemySpawnCoordinate()),
  new Enemy(playground.getRandomEnemySpawnCoordinate())
];

var player = new Player(playground.getRandomPlayerSpawnCoordinate());

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
