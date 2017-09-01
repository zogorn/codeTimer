/*
   =========== User Guid of Content ===========
   - Define Variables
      |- Hours, Minutes, Seconds and Output Variables for Hours, Minutes, Seconds
   - Get The Prevous Saved Timer
   - Timer Calculation
      |- Run timer and calc on the run
         |=> Increase seconds
         |=> After 60 sec increase minutes
         |=> After 60 min increase hours
         |=> Beautify the output for human reading HH:MM:SS
         |=> Show hours only when reach hours
   - Create HTML Elements
      |- Main Div
      |- Start / Stop Button
      |- Save Button
   - Make the code run only when document ready xD
      |- Style HTML Elements
      |- Run Timer (Start / Pause / Save Timer)
*/


// - Declare Variables
var
   startTimer, // declare variable for timer timming function (make it global => line 74)
   hours, minutes, seconds, // Timming Variables
   saveSeconds, // save and reset timer value
   hoursOutput, minutesOutput, secondsOutput; // to output with human friendly style

// get the timer value from local storage
var timerValue = localStorage.getItem('timerValue');
// if timerValue have an old saved data push it to saveSeconds
timerValue ? saveSeconds = Number(timerValue) : saveSeconds = 0;

// convert the saved seconds into hours, minutes and seconds
function calcTime(sec) {
   seconds  = sec % 60;
   // minutes  = Math.floor( (sec % 3600) / 60); // another way to calc
   // hours    = Math.floor( (sec % (3600 * 60) ) / 3600 ); // another way to calc
   minutes     = Math.floor(sec / 60);
   hours       = Math.floor(minutes / 60);
   minutes     = minutes - (hours * 60);
} // calcTime()
calcTime(saveSeconds);

/*
   ========== Timer Calculation  ==========
   |-> Run timer and calc on the run
   |-> looping for timer functionality
   |-> stop / pause timer functionality
*/

//    - calculate the seconds, minutes and hours on the run
function timer() {
   seconds++; // increase seconds (current)
   saveSeconds++; // save the seconds (total)

   if(seconds / 60 == true) {seconds = 0; minutes++} // after 60 sec increase minutes
   if(minutes / 60 == true) {minutes = 0; hours++} // after 60 min increase hours

   // beautify the output for human reading
   secondsOutput =  (seconds >= 10) ? seconds : '0' + seconds;
   minutesOutput =  (minutes >= 10) ? minutes : '0' + minutes;
   hoursOutput   =  (hours >= 10) ? hours : '0' + hours;

   // show hours only when reach hours
   if(hours == true) {
      // update the title
      document.title  = hoursOutput + ':' + minutesOutput + ':' + secondsOutput;
   } else {
      // update the title
      document.title  = minutesOutput + ':' + secondsOutput;
   } // end if - else
} // end timer()

// looping for timer functionality
function timerLooping() {
   timer();
   startTimer = setTimeout(timerLooping, 1000);
}; // end timerLooping()

// stop / pause timer functionality
function stopTimer() {clearTimeout(startTimer)}

/*
   ========== Create HTML Elements ==========
   Creat HTML codeTimer main contianer
      |-> codeTimer heading title
      |-> codeTimer heading body
         ||=> codeTimer start / pause button
         ||=> codeTimer Save timer button
*/

var
   timerContainer = document.createElement('div'),
   timerHTML;

// create timer header
timerHTML = '<div class="codeTimer-header">Code Timer</div>';
// open timer body
timerHTML += '<div class="codeTimer-body">';
   // create start / pause button
   timerHTML += '<button class = "codeTimer-btn-start">Start</button>';
   // create Save timer button
   timerHTML += '<button class = "codeTimer-btn-save">Save</button>';
// close timer body
timerHTML += '</div>';

// define classes and inner text for them
timerContainer.className = 'codeTimer-container';
timerContainer.innerHTML = timerHTML;

// when don content loaded
document.addEventListener("DOMContentLoaded", function(){

   // append the button to the end of the body
   document.body.appendChild(timerContainer);

   var timerHeader   = document.querySelector('.codeTimer-container .codeTimer-header');
   var timerBody     = document.querySelector('.codeTimer-container .codeTimer-body');
   var timerSave     = document.querySelector('.codeTimer-container .codeTimer-body .codeTimer-btn-save');
   var timerStart    = document.querySelector('.codeTimer-container .codeTimer-body .codeTimer-btn-start');

   /*
      ========== Start / Save Timer ==========
   */
   // when click the Start / Pause button
   timerStart.onclick = function() {
      if (this.innerText == 'Start') {
         timerLooping();
         this.innerText = 'Pause';
      } else if (this.innerText == 'Pause') {
         stopTimer();
         this.innerText = 'Start';
      } else {alert('ERROR')}
   } // timerStart.onclick()

   // save the timer on click
   timerSave.onclick = function(){
      // save the timer to the local storage
      localStorage.setItem('timerValue', saveSeconds);
   } // end onclick

   /*
      ========== Style codeTimer ==========
      |-> container style
         |= hover functions
      |-> header style
      |-> body style
      |-> btn-save style
   */

   // codeTimer-container style
   Object.assign(timerContainer.style, {
      position: 'fixed',
      bottom: 0,
      right: 0,
      padding: '5px',
      background: '#EFEFEF',
      border: '1px solid #CCC',
      transition: 'all 0.2s ease-in-out'
   });
   // appear on hover
   timerContainer.onmouseenter = function() {this.style.opacity = 1}
   // disappear on normal state
   timerContainer.onmouseleave = function() {this.style.opacity = 0.15}

   // codeTimer-header style
   Object.assign(timerHeader.style, {
      background: '#eaeaea',
      padding: '1px',
      marginBottom: '10px',
      borderBottom: '1px solid #CCC',
      textAlign: 'center'
   });

   // codeTimer-body style
   Object.assign(timerBody.style, {
      paddingLeft: '5px',
      paddingRight: '5px'
   });

   // codeTimer-btn-start style
   Object.assign(timerStart.style, {
      marginRight: '5px',
      minWidth: '54px'
   });
   // codeTimer-btn-save style
   Object.assign(timerSave.style, {
      minWidth: '54px'
   });
});
