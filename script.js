/**************************************************************
 **************************************************************
 **                                                          **
 ** script.js is where you will write most of your code.     **
 **                                                          **
 **************************************************************
 **************************************************************/

const HTML_OUTPUT = document.getElementById("databaseOutput");

/**************************************************************/
// helloWorld()
// Demonstrate a minimal write to firebase
// This function replaces the entire database with the message "Hello World"
// 
// This uses the set() operation to write the key:value pair "message":"Hello World"
// The ref('/') part tells the operation to write to the base level of the database "/"
// This means it replaces the whole database with message:Hello World
/**************************************************************/
function helloWorld() {
    console.log("Running helloWorld()")
    firebase.database().ref('/').set(
        {
            message: 'Hello World!'
        }
    )
}
function goodbye() {
    console.log("Running goodbye()")
    firebase.database().ref('/').set(
        {
            message: 'goodbye'
        }
    )
}
/**************************************************************/
// simpleRead()
// Demonstrate a minimal read from firebase
// This function reads the current value from the 'message' field once
//
/**************************************************************/
function simpleRead() {
    console.log("Reading message");
    firebase.database().ref('/').child('message').once('value', displayRead);
    console.log("Leaving simpleRead")
}
function safeRead() {
    console.log("Reading message safely");
    firebase.database().ref('/').child('message').once('value', displayReadSafely, fb_readError);
    console.log("Leaving safeRead")
}
function readListener() {
    console.log("Setting up listener for message");
    firebase.database().ref('/').child('message').on('value', displayReadSafely, fb_readError);
    console.log("Leaving readListener")
}


/*-----------------------------------------*/
// displayRead is a callback function. It will run when the database read has finished
// the database call will pass a snapshot of the data to fb_readOK
// Input:  data returned from firebase
/*-----------------------------------------*/
function displayRead(snapshot) {
    console.log("Running displayRead(), the message is: " + snapshot.val())
    HTML_OUTPUT.innerHTML = snapshot.val();
}

function displayReadSafely(snapshot) {
    console.log("Running displayReadSafely()")
    var dbData = snapshot.val();
    if (dbData == null) { // if there is no data, dbData will be null.
        console.log('There was no record when trying to read the message');
        HTML_OUTPUT.innerHTML = 'There was no record when trying to read the message';
    }
    else {
        console.log("The message is: " + dbData)
        HTML_OUTPUT.innerHTML = dbData;
    }
}
function makeHighscoreTable() {
    highscoreTable = {
        game1: {
            users: {
                Dhruv: 99999,
                Jack: 10000,
                Michael: "3.141",
                Sasha: 0.5,
                Yug: 987654321
            }
        },
        game2: {
            users: {
                Dhruv: 13,
                Jack: 14,
                Mikaela: 7,
            Sasha: 3,
                Yug: 12
            }
        }
    }

    firebase.database().ref('/').set(highscoreTable)
}