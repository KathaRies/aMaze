//the game logic

var maze_size = 5;
//var layout = [0,3,5,6,7,8,9,10,14,15,16,17,18,22]; //true
var layout = [];

var layouts = [[5,6,7,8,16,17,18,19],[],[6,7,8,11,12,13,16,17,18]]; //different game board layouts,list of positions of walls

var start_position_x = 4;
var start_position_y = 4;
var goal = 0;

var user_x = start_position_x;
var user_y = start_position_y;

var step_counter = 0;
var wall_hits = 0;

var control_data = new Uint8Array(4);//aray to give feedback

window.onload = function(){
    var text = document.getElementById("text");
};

function startGame(){
    reset();
    window.location = "#game";

}

//resets all variables witch get set during game (counter, position)
function reset(){
    var choosen = Math.round((Math.random()*100))%layouts.length;
    document.getElementById("game_header").innerHTML = "Find the exit in maze " + choosen;
    layout = layouts[choosen];
    user_x = start_position_x;
    user_y = start_position_y;
    step_counter = 0;
    wall_hits = 0;
}

//checks if the position x,y is a wall
function isWall(x,y){ //true if there is a wall
    var position = x + y*maze_size;
    if(x>=maze_size || x<0) {
        return true;
    }
    if(y>=maze_size || y<0){
        return true;
    }
    if(layout.includes(position)){
        return true;
    }
}

//oncklick function of control. Triey to move the user in x,y direction x,y is 0,1,-1
function move(x,y){
    step_counter++;
    if(isWall((user_x + x),(user_y + y))){
        wall_hits++;
      feedback(x,y);     //TODO real feedback
    } else {
        user_x = user_x + x;
        user_y = user_y + y;
        //text.innerHTML = "one step closer"
        //text.innerHTML = "x: " + user_x + " , " + x + " , y: " + user_y + " , " + y;
    }
    if((user_x +user_y * maze_size) ===goal){
        alert("Congratulation! You found the way it just took you " + step_counter + " steps and you hit " + wall_hits + " walls.");
        window.location = "#init";
    }
}


//signals the user
function feedback(x,y){
    //alert("feedback" + x + " " + y);
    var motor = Math.abs(x) * (x+1) + Math.abs(y)*(2-y);//left(-1,0) = 0, top(0,1) = 1
    //alert("motor: " + motor);
    control_data.fill(0x00,0,4);
    control_data[motor] = 0xFF;

    controlMotors(control_data);
}

//for testing without wearable
function fake_feedback(x,y){
    var direction = Math.abs(x) * (x+1) + Math.abs(y)*(2-y);

    switch(direction){
        case 0: text.innerHTML = "wall is left";
            break;
        case 1: text.innerHTML = "wall is up";
            break;
        case 2: text.innerHTML = "wall is right";
            break;
        case 3: text.innerHTML = "wall is down";
            break;
    }
}