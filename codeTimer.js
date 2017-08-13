document.addEventListener("DOMContentLoaded", function(){
   // define and creat the button
   var btn = document.createElement('button');
   btn.className = 'timer-button';
   btn.innerText = 'Save Timer';
   // position and style the button
   Object.assign(btn.style, {
      position: 'fixed',
      bottom: 0,
      right: 0,
      padding: '10px',
      cursor: 'pointer'
   });
   // append the button to the end of the body
   document.body.appendChild(btn);


   // save the timer on click
   btn.onclick = function(){

      // get the timer value from local storage
      var timerValue = localStorage.getItem('timerValue'),
         timerHolder = document.title,
         tValue = [];

      // if timerValue have an old saved data push it to the array tValue
      timerValue ? tValue = [timerValue.split(',')] : tValue = [];

      // push the timer to the array
      tValue.push(timerHolder);

      // save the timer to the local storage
      localStorage.setItem('timerValue', tValue);

      // print the timer value
      console.log(tValue);
   } // end onclick
});
