console.log("Game Going")
let me;
let myName
let oldPos = [0, 0];
let peeps = {};

function setup() {
    myName = Math.floor(random() * 1000000);
    console.log("Game Setup")

    let cnv = new createCanvas(windowWidth, windowHeight);
    console.log("Game Setup")
    me = new Sprite(width / 2, height / 2, 50, 'n')
    firebase.database().ref('/players/').on('value', movePeeps)
    firebase.database().ref('/players/' + myName).onDisconnect().remove();
}

function draw() {
    background('green');
    move();
    drawchat();
}
function drawchat(){
    for (peep of Object.keys(peeps)){
        text(peeps[peep].chat,peeps[peep].x,peeps[peep].y - 30)
        textAlign(CENTER)
    }
}
function scream(){
    console.log("AAAAAAAA");
    console.log(gabagool.value);
    firebase.database().ref('/players/' + myName).set(
                {
                    x: me.x,
                    y: me.y,
                    chat: gabagool.value 
                }
            )
}
function move() {
    //Player 1 Arrow Key Rotation
    if (kb.pressing('left')) {
        me.x -= 1;
    }
    if (kb.pressing('right')) {
        me.x += 1;
    }
    if (kb.pressing('up')) {
        me.y -= 1;
    }
    if (kb.pressing('down')) {
        me.y += 1;
    }
    if (frameCount % 5 == 0) {
        if (oldPos[0] == me.x && oldPos[1] == me.y) {
            //Nochange

        } else {
            //changed
            // Write
            firebase.database().ref('/players/' + myName).update(
                {
                    x: me.x,
                    y: me.y
                }
            )
            console.log(frameCount)
            oldPos[0] = me.x
            oldPos[1] = me.y
        }
    }
}

function movePeeps(snapshot) {
    data = snapshot.val()
    console.log("Me is " + myName)
    for (name of Object.keys(data)) {
        //if (name != myName) {
            if (Object.keys(peeps).includes(name)) {
                peeps[name].x = data[name].x;
                peeps[name].y = data[name].y;
                peeps[name].chat = data[name].chat;
            } else {
                peeps[name] = new Sprite(data[name].x, data[name].y, 50, 'n')
            }
        //}
    }
}