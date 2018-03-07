//handles bluethooth communication

var interval = 10; //sec
var service = "713D0000-503E-4C75-BA94-3148F18D941E"; //Service of a teco wearable
var num_motors = "713D0001-503E-4C75-BA94-3148F18D941E"; //Characteristic: number of motors
var update_freq = "713D0002-503E-4C75-BA94-3148F18D941E"; //Characteristic: update frequency
var motor_control = "713D0003-503E-4C75-BA94-3148F18D941E"; //Characteristic: motors
var device_id = 0;
//control
var control_data = new Uint8Array(4); //array to send to the motors

//checks if bluethooth is enabled and starts the game
function init(){
    if(device_id!==0){
        startGame();
    }
    var enabled = function(){
        connect();         //TODO real connect
    };
    var disabled = function(){
        alert("Please enable Bluethooth");
    };
    ble.isEnabled(enabled,disabled);
}

//used for testing without wearable
function fake_connect(){
    startGame();
}

//connects to the wearble with name "TECO Wearbale 3"
function connect(){
    var success = function(device){
        //alert(device.name);
        var connectSuccess = function(device){
            device_id = device.id;
            connectedDevice = device;
            startGame();
        };
        var connectFailure = function(){
            alert("can't connect to device"+ device.name);
        };
        if(device.name == "TECO Wearable 3") {
            ble.connect(device.id, connectSuccess, connectFailure);
        }
    };
    var failure = function(failure){
        alert("no matching device found")
    };
    ble.scan([], interval, success, failure);
}

//Lets the motors buzz for 1 sec
function controlMotors(data){
    var failure = function(){
        alert("can not reach wearable");
    };

    var success = function(){
        //alert("starting motor");
        var stop = function(){
            control_data.fill(0x00,0,4);
            ble.writeWithoutResponse(device_id, service, motor_control, control_data.buffer, function(){}, function(){}); //stops the motors
            //alert("stopped motor");
        };
        setTimeout(stop,1000);
    };
    ble.writeWithoutResponse(device_id, service, motor_control, data.buffer, success,failure); //starts the motors
}
