//Amander Pears
//amander.jp@gmail.com

hwFAC = 25;
gameH = 17;
gameW = 20;

window.onload = function () {
    //set window focus
    window.focus();

    //game area
    var gameDiv = this.document.getElementById("game");
    gameDiv.style.backgroundColor = "gray";
    gameDiv.style.width = (gameW*hwFAC) + "px";
    gameDiv.style.height = (gameH*hwFAC) + "px";
    gameDiv.style.position = "relative";
    //document.body.appendChild(gameDiv);

    //defin the building blocks of the snake and prey
    var cell = function (x, y, color) {
        this.x = x;
        this.y = y;
        this.c = document.createElement("div");
        this.c.style.backgroundColor = color == undefined ? "black" : color;
        this.c.style.width = hwFAC + "px";
        this.c.style.height = hwFAC + "px";
        this.c.style.position = "absolute";
        gameDiv.appendChild(this.c);
        (function (c) {
            c.style.left = x * hwFAC + "px";
            c.style.top = y * hwFAC + "px";
        })(this.c);

        this.set = function (x, y) {
            this.x = x;
            this.y = y;
            this.c.style.left = x * hwFAC + "px";
            this.c.style.top = y * hwFAC + "px";
        };

        this.cx = this.c.style.left;
        this.cy = this.c.style.top;

    };

    //direction
    var direction = "right";

    //a collection of cell makes the snake
    var snake = [];
    for (var i = 2; i >= 0; i--) {
        snake.push(new cell(i, 0));
    }

    //create a prey
    //create new random x and y coordinates
    var newX = Math.floor(Math.random() * gameW),
        newY = Math.floor(Math.random() * gameH);
    //create the prey object
    var prey = new cell(newX, newY, "red");
    //function to set location of new prey
    //  function makes sure the new prey does not roll used coordinates
    var newPrey = function () {
        newX = Math.floor(Math.random() * gameW),
            newY = Math.floor(Math.random() * gameH);
        for (var i in snake) {
            if (newX == snake[i].x && newY == snake[i].y) {
                newX = Math.floor(Math.random() * gameW);
                newY = Math.floor(Math.random() * gameH);
            }
        }
        prey.set(newX, newY);
    };

    //snake eat
    var eat = function () {
        snake.push(new cell(prey.x, prey.y));
    };

    //collsion
    var collisionDetection = function (obj) {
        var leftMax = gameW - 1,
            topMax = gameH - 1;
        for (var i = 1; i < snake.length; i++) {
            if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
                stop();
            }
        }
        if (obj.x < 0 || obj.y < 0 || obj.x > leftMax || obj.y > topMax) {
            stop();
        } else if (obj.x == prey.x && obj.y == prey.y) {
            eat();
            newPrey();
        }
    };

    //snake movement
    var move = function () {
        //listen for keypress
        window.onkeydown = function (e) {
            input(e);
        };

        //start snake movement
        var temp = snake.pop();
        //set direction of movement
        if (direction == "right") {
            temp.set(snake[0].x + 1, snake[0].y);
        } else if (direction == "left") {
            temp.set(snake[0].x - 1, snake[0].y);
        } else if (direction == "down") {
            temp.set(snake[0].x, snake[0].y + 1);
        } else if (direction == "up") {
            temp.set(snake[0].x, snake[0].y - 1);
        }
        //complete the process
        snake.unshift(temp);

        //check for collision
        collisionDetection(snake[0]);
    };

    var start = this.setInterval(function () {
        if (!pauseGame) {
            tick = true;
            move();
        }
    }, 200);

    //refresh button
    refresh = function () {
        window.location.reload();
    };
    //stop
    stop = function () {
        clearInterval(start);
    };
    //pause
    var pauseGame = false;
    var pausebtn = document.getElementById("pauseButton");
    pause = function () {
        pauseGame = !pauseGame;
        if (pauseGame) {
            pausebtn.setAttribute("value", "resume");
        } else {
        pausebtn.setAttribute("value", "pause");
        }
    };

    //keypresses
    input = function (e) {
        if ((e.keyCode == 37 || e == 37) && direction != "right" && tick) {
            tick = false;
            direction = "left";
        } else if ((e.keyCode == 38 || e == 38) && direction != "down" && tick) {
            tick = false;
            direction = "up";
        } else if ((e.keyCode == 39 || e == 39) && direction != "left" && tick) {
            tick = false;
            direction = "right";
        } else if ((e.keyCode == 40 || e == 40) && direction != "up" && tick) {
            tick = false;
            direction = "down";
        }
    };
    //window.addEventListener("keydown", input);

};