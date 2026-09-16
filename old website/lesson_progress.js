
const startTime = document.getElementById('starttime')
const endTime = document.getElementById('endtime')
const calculateButton = document.getElementById('calculatebutton')
const progressBar = document.getElementById('progressbar')
const progressStart = document.getElementById('progressstart')
const progressEnd = document.getElementById('progressend')
const progressBarText = document.getElementById('progress-bar-text')

calculateButton.addEventListener("click",startTicking)
startTime.addEventListener("change", interruptTicking)
endTime.addEventListener("change", interruptTicking)

reset()

function interruptTicking(){
    changeBarColor("grey")
    clearInterval(intervalID)
}

function reset(){
    changeBarColor("grey")
    displayBarText("")
    progressBar.style.width = "100%"
}

function stopTicking(){
    clearInterval(intervalID)
}

function startTicking(){
    const error = validateData()
    console.log('Error:',error)
    if (error){
        alert(error);
        changeBarColor("grey");
        return;
    }

    progressStart.textContent = startTime.value
    progressEnd.textContent = endTime.value
    progressBarText.textContent = ""
    changeBarColor("blue")
    updateProgressBar()
    window.intervalID = setInterval(updateProgressBar,1000)
}

function changeBarColor(color){
    progressBar.style.backgroundColor = color;
}

function displayBarText(text){
    progressBarText.textContent = text
}

function lessonFinished(){
    changeBarColor("green")
    displayBarText("Lesson Finished!")
    stopTicking()
}

function lessonNotStarted(){
    console.log('Lauched lessonNotStarted')
    reset()
    displayBarText("Your lesson starts in " + timeToStart())
}

function lessonStart(){
    changeBarColor("blue")
    displayBarText("")
}

function timeToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}

function timeToStart(){
    differenceInMinutes = timeToMinutes(startTime.value) - currentTimeInMinutes()
    console.log("Difference in minutes:",differenceInMinutes)
    seconds = Math.round((differenceInMinutes%1) * 60)
    minutes = Math.round(differenceInMinutes%60 - seconds/60)
    hours = Math.round((differenceInMinutes - minutes - seconds/60)/60)
    
    if (hours !== 0) return addLeadingZero(hours)+":"+addLeadingZero(minutes)+":"+addLeadingZero(seconds);
    else return (addLeadingZero(minutes)+":"+addLeadingZero(seconds));
}

function addLeadingZero(x){
    if (x < 10) return "0"+x;
    else return x;
}

function updateProgressBar(){
    percentageProgress = percentageCompleted() + "%"
    console.log('Percentage calculated:',percentageProgress)
    progressBar.style.width = percentageProgress
    if (percentageCompleted() >= 100) {
        lessonFinished()
    }
    if (percentageCompleted() < 0){
        lessonNotStarted()
    }
    if (percentageCompleted() === 0){
        lessonStart()
    }
}

function currentTimeInMinutes(){
    const now = new Date()
    return 60*now.getHours() + now.getMinutes() + now.getSeconds()/60
}

function percentageCompleted(){
    totalLessonLength = timeToMinutes(endTime.value) - timeToMinutes(startTime.value)
    timeElapsed = currentTimeInMinutes() - timeToMinutes(startTime.value)
    return (timeElapsed/totalLessonLength * 100)
}

function validateData(){
    if (timeToMinutes(endTime.value)<timeToMinutes(startTime.value)) return "End time must be after the start time";
    if (timeToMinutes(endTime.value)===timeToMinutes(startTime.value)) return "The start and end cannot be at the same time.";
    if (Number.isNaN(timeToMinutes(endTime.value)) || Number.isNaN(timeToMinutes(startTime.value))) return "Both the start and end time must be defined.";
    return null;
}
