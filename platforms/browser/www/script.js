//maze
var maze_size = 5;
var layout = {0,3,5,6,7,8,9,10,14,15,16,17,18,22}; //true
var user_x = maze_size/2;
var user_y = maze_size;
//bluethooth
var interval = 10; //sec
var service = 713D0000-503E-4C75-BA94-3148F18D941E;
var num_motors = 713D0001-503E-4C75-BA94-3148F18D941E;
var update_freq = 713D0002-503E-4C75-BA94-3148F18D941E;
var motor_control = 713D0003-503E-4C75-BA94-3148F18D941E;
var device_id;
//control
var control_data = new Uint8Array(4)

function init(){
    var success = function(device){
        var connectSuccess = function(device){
            device_id = device.id;
            startGame();
        }
        var connectFailure = function(){
            alert("can't connect to device"+ device.name);
        }
        if(device.name.contains("3")) {
            ble.connect(device.id, connectSuccess, connectFailure);
        }
    }
    var failure = function(failure){alert("no matching device found")}
    ble.scan(service, interval, success, failure);
}

function startGame(){
    var controls = document.getElementsByClassName("control");
    controls.forEach(function(item,index,array{
        item.visibility = "visible";
        item.enabled = true;
    }));
}


function isWall(x,y){ //true if there is a wall
    var position = x + y*maze_size;
    return !layout.contains(posiition);
}

function move(x,y){
    if(isWall(user_x + x,user_y = y)){
        feedback(x,y);
    } else{
        user_x += x;
        user_y += y;
    }
}

function feedback(x,y){
    var motor = Math.abs(x) * (x+1) + Math.abs(y)*(2-y);//left(-1,0) = 0, top(0,1) = 1
    control_data.fill(0,0,3);
    control_data[motor] = 0xFF;

    var success = function(){
        var stop = function(){
            data.fill(0,0,3);
            ble.writeWithoutResponse(device_id, service, motor_control, data.buffer, success, failure);
        }
        setTimeout(stop,1000);
    }
    ble.writeWithoutResponse(device_id, service, motor_control, data.buffer, success, failure);
}