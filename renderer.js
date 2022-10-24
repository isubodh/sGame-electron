/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
 const CELLCNT = 9
 const sGameArray = []
 let clickCounterVar = 0
 
 setRandomValue();
 
 main()
 
 function main(){
 
     for( let cnt=1; cnt<=CELLCNT; cnt++) {
         let button = document.createElement("button")
         
         button.name = sGameArray[cnt]
         button.id = cnt    
     
         button.innerText = sGameArray[cnt -1];
     
         if (sGameArray[cnt -1] == 9 ){
             button.innerText = " "
         }
     
         button.addEventListener("click",function(){
             userClickd(this.id);
         })
     
         document.getElementById('button-holder').appendChild(button)
     }
 
     clickCounter(0)
     
 }
 
 
 //
 function userClickd(id){
     //alert("Clicked id : " + id + " Text : " + sGameArray[id-1] + " Click Count " + clickCounterVar)
     actionOnButtonClick(id)
 
 }
 
 //
 function actionOnButtonClick(id){
     clickCounter(1)
     
     moveKeysOnClick(id);
     
     labelKeys(); 
 
     if (id == sGameArray[id - 1]) {
         verifyDone();
     }
 }
 
 //
 function moveKeysOnClick(id) {
     // Left jump if button clicked
     if (id%3 != 0){ makeMoves(id, 1) }
 
     //Right jump
     if (id%3 != 1){ makeMoves(id, -1) }
 
     //Jump Up
     if (Math.ceil(id/3) != 1){ makeMoves(id, -3) }
 
     //Jump down
     if (Math.ceil(id/3) != 3){ makeMoves(id, 3) }
 }
 
 
 //
 function makeMoves(id, steps){
     let currentLoc = id - 1
         let newLoc = currentLoc + steps;
         if (sGameArray[newLoc] == 9){
             sGameArray[newLoc] = sGameArray[currentLoc];
             sGameArray[currentLoc] = 9;
             return;
         }
 }
 // 
 function labelKeys(){
     for (let i= 1; i <= CELLCNT; i++){
 
         document.getElementById(i).innerText = sGameArray[i - 1];
 
         if (sGameArray[i - 1] == 9 ){
             document.getElementById(i).innerText = " "
         }
     }
     
 }
 
 function clickCounter(number){
     if (number == 0){
         clickCounterVar = 0
     } else {
         clickCounterVar += number
     }
 
     document.getElementById('stats-counter').innerText = "Clicks : " + clickCounterVar
 }
 // Is the game over
 function verifyDone(){
 
     console.log("Verifying the soluton");
     
     let doneFlag = true;
 
     for (let i =0 ; i < CELLCNT ; i++){
         if (sGameArray[i] != i + 1 ){
             doneFlag = false ; 
         }
     }
     
     if (doneFlag){
         alert("Wow, you won in " + clickCounterVar + " clicks. \nGame will reset now.")
         clickCounter(0);
         setRandomValue();
     }
 
 }
 
 // Setup the board randomly
 function setRandomValue(){
     console.log("In Random random");
     // Set know invalid value
     for(let i = 0; i < CELLCNT ; i++){
         sGameArray[i] = -1;
     }
     
     //Set random val
     for(let i = 1; i <= CELLCNT; i++){
 
         newRandomPlace = getRandomInt(0,8);
         
         while (sGameArray[newRandomPlace] != -1){
 
             if (newRandomPlace == CELLCNT -1){
                 newRandomPlace = 0
             }
             else{
                 newRandomPlace += 1
             }
         }
 
         sGameArray[newRandomPlace] = i
         
     }
     console.log(sGameArray)
 }
 
 // random number within range min to max
 function getRandomInt(min, max) {
     return Math.floor(Math.random() * (max - min + 1) + min);
   }