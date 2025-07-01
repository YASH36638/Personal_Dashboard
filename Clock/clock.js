let hh=document.getElementById("hours")
let mm=document.getElementById("minutes")
let ss=document.getElementById("seconds")
let alarmSound = new Audio("beep.wav")
let today
let i=0;

// for main analog watch 
setInterval(() => {
    today=new Date();
    hh.innerText = String(today.getHours()).padStart(2, '0');
    mm.innerText = String(today.getMinutes()).padStart(2, '0');
    ss.innerText = String(today.getSeconds()).padStart(2, '0');
}, 1000);

// for timer 
function Timer(durationi)
{
    let duration;  //it is needed in other loops also .­°. global declaration.
    i+=1;
    if(i===1)     //first time, else it is pause resume loop
    {
    let tem = Number(prompt("Enter time duration in seconds.")); 
    if(isNaN(tem) || tem<=0)
    {
        window.alert("Timer not started.Invalid time entered"); //handle the faulty input.
        return;
    }
    duration=tem*1000; //  in mili_sec
    }
    else
    {
        duration=durationi
    }
        let startTime = Date.now();
        let isPaused=false;
        let at_time= Number(startTime) + duration;
        let timeout= new Date(at_time)
        
        let checkInterval = setInterval(() =>
        {
            let elapsed = Date.now() - startTime;
            let remaining = duration - elapsed;
        
                if (remaining <= 0) 
                {
                    clearInterval(checkInterval);
                    window.alert("Time's up!");
                    document.getElementById("timerContent").innerHTML=``
                    let y=document.getElementById("div1");
                    y.style.visibility=""; 
                    i=0;
                }
                else
                {
                    document.getElementById("timerContent").innerHTML=`
                    <br><p>Remaining time: ${Math.ceil(remaining / 1000)} second</p>
                    <hr>
                    <p>🔔${timeout.toLocaleTimeString()}</p>
                    <button id="12">Pause</button>`
                    let y=document.getElementById("div1");
                    y.style.visibility="hidden";
                }
        const btn=document.getElementById("12")    
        if(btn)
        {
            btn.onclick=()=>
            {
                if(isPaused)
                {
                    isPaused=false;
                    document.getElementById("12").innerText="Pause";

                    Timer(duration) //calling f:n again to start with left duaration
                }
                else{
                    isPaused=true;
                    document.getElementById("12").innerText="Resume";
                    clearInterval(checkInterval);
                    duration = remaining;
                }
            };
        }
    
    }, 1000);
}

function Alarm()
{
let timeInput = prompt("Enter alarm time in HH:MM:SS format");
if (!/^\d{2}:\d{2}:\d{2}$/.test(timeInput)) 
    {
        alert("Invalid format! Use HH:MM:SS");
    } 
else
    {
        let [h,m,s] =timeInput.split(":").map(Number);
        let now= new Date()
        let alarm= new Date()
        alarm.setHours(h,m,s,0);
        if(alarm<=now)
        {
            alarm.setDate(alarm.getDate()+1);
        }
            alert(`✅ Alarm set for: ${alarm.toLocaleString()}`);
            document.getElementById("alarmContent").innerHTML=document.getElementById("alarmContent").innerHTML+`<br><p>Alarm set for ${alarm.toLocaleString()}</p>`
        let alarminterval = setInterval(()=>
        {
            let current=new Date();
            if(current>=alarm)
            {
                alarmSound.currentTime = 0;
                clearInterval(alarminterval);
                alarmSound.play();
                document.getElementById("alarmContent").innerHTML=`<p>⏰ Alarm is ringing!</p>
                <button id="1">Stop Alarm</button>`;
                const btn = document.getElementById("1");
                if (btn) 
                {
                    btn.onclick = () => 
                    {
                        alarmSound.pause();
                        document.getElementById("alarmContent").innerHTML = ``;
                    };
                } 
                setTimeout(() => {
                  alarmSound.pause();
                  document.getElementById("alarmContent").innerHTML = ``;
                }, 20000);
            }
        },1000);
    }
}

//for stopwtch
let checkintrvl;
function stopWatch()
{
    let isPaused=false;
    let d=new Date();
    d.setHours(0,0,0,0);
    console.log(d)
    document.getElementById("div1").style.visibility="hidden";
    document.getElementById("watchContent").innerHTML = `
        <p id="watchtime">00:00:00</p>
        <button id="rst-btn">Reset</button>
        <button id="pause-btn">Stop</button>`;
        

    document.getElementById("pause-btn").onclick=()=>
    {
        if (!isPaused) 
        {
            clearInterval(checkintrvl);
            isPaused = true;
            document.getElementById("pause-btn").innerText = "Resume";
        } 
        else 
        {
            checkintrvl = setInterval(updateTime, 1000);
            isPaused = false;
            document.getElementById("pause-btn").innerText = "Pause";
        }
    };
    

    document.getElementById("rst-btn").onclick = () => 
        {
            clearInterval(checkintrvl);
            checkintrvl = null;
            d.setHours(0, 0, 0, 0);
            document.getElementById("div1").style.visibility = "";
            strtshow();             
        };


    function updateTime() {
        d = new Date(d.getTime() + 1000);
        let hh = String(d.getHours()).padStart(2, '0');
        let mm = String(d.getMinutes()).padStart(2, '0');
        let ss = String(d.getSeconds()).padStart(2, '0');
        document.getElementById("watchtime").innerText = `${hh}:${mm}:${ss}`;
    }

    checkintrvl = setInterval(updateTime, 1000);
}

function strtshow()
{
    document.getElementById("watchContent").innerHTML= 
    `<p id="watchtime">00:00:00</p>
    <button type="button" id="stpwtcbtn">Start</button>
    <button id="clear">Clear</button>` 

    document.getElementById("stpwtcbtn").onclick=stopWatch;
    document.getElementById("clear").onclick= ( ) =>
    {
        clearInterval(checkintrvl);
        checkintrvl = null;
        document.getElementById("watchContent").innerHTML = "";
        document.getElementById("div1").style.visibility = "";
    }
}

