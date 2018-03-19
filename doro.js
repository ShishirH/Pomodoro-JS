let play = document.querySelector(".play");
let pause = document.querySelector(".pause");
let stop = document.querySelector(".stop");

let duration = document.querySelector(".dur h2");
let breaks = document.querySelector(".bre h2");
let time = document.querySelector(".time h2");
let status = 0;
var audio = new Audio('ringing.mp3');
let durup = document.querySelector("#durup");
let durdown = document.querySelector("#durdown");
let breup = document.querySelector("#breup");
let bredown = document.querySelector("#bredown");
let breakCount = 1;
let isPlaying = 1;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


durup.addEventListener('click', function() {
    let min = duration.textContent.split(":")[0];
    let seconds = duration.textContent.split(":")[1];
    min = parseInt(min);
    min += 1;
    duration.textContent = min + ":" + seconds; 
    time.textContent = duration.textContent;   
});

durdown.addEventListener('click', function() {
    let min = duration.textContent.split(":")[0];
    let seconds = duration.textContent.split(":")[1];
    min = parseInt(min);
    if(min != 0)
        min -= 1;
    duration.textContent = min + ":" + seconds;    
    time.textContent = duration.textContent;       
});

breup.addEventListener('click', function() {
    let min = breaks.textContent.split(":")[0];
    let seconds = breaks.textContent.split(":")[1];
    min = parseInt(min);
    min += 1;
    breaks.textContent = min + ":" + seconds; 
});

bredown.addEventListener('click', function() {
    let min = breaks.textContent.split(":")[0];
    let seconds = breaks.textContent.split(":")[1];
    min = parseInt(min);
    if(min != 0)
        min -= 1;
    breaks.textContent = min + ":" + seconds;    
});

play.addEventListener('click', played);

async function played (){
    let min = time.textContent.split(":")[0];
    let seconds = time.textContent.split(":")[1];
    min = parseInt(min);
    status = 0;
    time.classList.remove("waitingForConnection");
    seconds = parseInt(seconds);
    let temp = breaks.textContent;
    while(status == 0){
        if(min == 0 && seconds == 0){
            audio.play();
            await sleep(5000);
            audio.pause();
            audio.currentTime = 0;
            if(isPlaying == 1)
            {
                
                if(breakCount % 3 == 0)
                {
                    breaks.textContent = "15:00";
                }
                else
                    breaks.textContent = temp;
                isPlaying = 0;
                time.textContent = breaks.textContent;
                min = breaks.textContent.split(":")[0];
                seconds = breaks.textContent.split(":")[1];
                min = parseInt(min);
                seconds = parseInt(seconds);
                breakCount += 1;
            }

            else
            {
                isPlaying = 1;
                time.textContent = duration.textContent;
                min = duration.textContent.split(":")[0];
                seconds = duration.textContent.split(":")[1];
                min = parseInt(min);
                seconds = parseInt(seconds);

            }
        }
        else if(seconds == 0)
        {
            min = min - 1;
            seconds = 59;
            time.textContent = min + ":" + seconds;
            await sleep(1000);
        }

        else
        {
            seconds = seconds - 1;
            if(seconds < 10)
                time.textContent = min + ":0" + seconds;
            else
                time.textContent = min + ":" + seconds;
            await sleep(1000);

        }

    }
}

function paused()
{
    status = 1;
    time.classList.add("waitingForConnection");
}

function stopped()
{
    status = 1;
    time.classList.remove("waitingForConnection");
    time.innerHTML = "25:00";
    audio.pause();
    audio.currentTime = 0;
}

stop.addEventListener('click', stopped);
pause.addEventListener('click', paused);