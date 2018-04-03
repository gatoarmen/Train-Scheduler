    "use strict"
    
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAqzEvasDHp2CfSTjgRONBYdERFgQNXbEg",
    authDomain: "train-scheduler-e6db7.firebaseapp.com",
    databaseURL: "https://train-scheduler-e6db7.firebaseio.com",
    projectId: "train-scheduler-e6db7",
    storageBucket: "train-scheduler-e6db7.appspot.com",
    messagingSenderId: "426173697792"
  };
  firebase.initializeApp(config);


var database = firebase.database();


$('#add-train-btn').on( "click", function (event) {

event.preventDefault();

 // Grabs user input
 var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("HH:mm");
  var frequency = $("#frequency-input").val().trim();

var newTrain = {

train: trainName,
destino: destination,
start: trainStart,
frecuencia: frequency,


}


database.ref().push(newTrain);


// Logs everything to console
console.log(newTrain.train  );
console.log(newTrain.destino);
console.log(newTrain.start);
console.log(newTrain.frecuencia);

$("#train-name-input").val("");
$("#destination-input").val("");
$("#start-input").val("");
$("#frequency-input").val("");


})

database.ref().on("child_added", function(childSnapshot, prevChildKey)  {



// Store everything into a variable.
var trainName = childSnapshot.val().train;
var destination = childSnapshot.val().destino;
var trainStart = childSnapshot.val().start;

 // Assumptions
var frequency = childSnapshot.val().frecuencia;


// Train Info
console.log(trainName);
console.log(destination);
console.log(trainStart);
console.log(frequency);

  
  


// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(trainStart, "hh:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % frequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = frequency - tRemainder;
console.log(tMinutesTillTrain);

// Next Train Arrival Time
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log(    moment(nextTrain).format("hh:mm"));

// Add each train's data into the table
$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td><td>");



});


