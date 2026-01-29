
const startTime = document.getElementById('starttime')
const endTime = document.getElementById('endtime')
const calculateButton = document.getElementById('calculatebutton')
const progressBar = document.getElementById('progressbar')
const progressStart = document.getElementById('progressstart')
const progressEnd = document.getElementById('progressend')

calculateButton.addEventListener("click",startTicking)
startTime.addEventListener("change", stopTicking)
endTime.addEventListener("change", stopTicking)

stopTicking()

function stopTicking(){
    clearInterval(intervalID)
    changeBarColor("grey")
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
    changeBarColor("blue")


    updateProgressBar()
    window.intervalID = setInterval(updateProgressBar,1000)
}

function changeBarColor(color){
    progressBar.style.backgroundColor = color;
}

function lessonFinished(){
    clearInterval(intervalID)
    changeBarColor("green")
}

function timeToMinutes(time) {
    console.log('Tried to convert:',time)
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}

function updateProgressBar(){
    percentageProgress = percentageCompleted() + "%"
    console.log('Percentage calculated:',percentageProgress)
    progressBar.style.width = percentageProgress
    if (percentageCompleted() >= 100) {
        lessonFinished()
    }
}

function currentTime(){
    const now = new Date()
    return 60*now.getHours() + now.getMinutes() + now.getSeconds()/60
}

function percentageCompleted(){
    totalLessonLength = timeToMinutes(endTime.value) - timeToMinutes(startTime.value)
    timeElapsed = currentTime() - timeToMinutes(startTime.value)
    return (timeElapsed/totalLessonLength * 100)
}

function validateData(){
    if (timeToMinutes(endTime.value)<timeToMinutes(startTime.value)) return "End time must be after the start time";
    if (timeToMinutes(endTime.value)===timeToMinutes(startTime.value)) return "The start and end cannot be at the same time.";
    if (Number.isNaN(timeToMinutes(endTime.value)) || Number.isNaN(timeToMinutes(startTime.value))) return "Both the start and end time must be defined.";
    return null;
}
