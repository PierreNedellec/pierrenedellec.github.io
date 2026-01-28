
const startTime = document.getElementById('starttime')
const endTime = document.getElementById('endtime')
const calculateButton = document.getElementById('calculatebutton')
const progressBar = document.getElementById('progressbar')

calculateButton.addEventListener("click",updateProgressBar)

function timeToMinutes(time) {
    console.log('Tried to convert:',time)
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}

function updateProgressBar(){
    percentageProgress = Math.round(percentageCompleted()) + "%"
    console.log('Percentage calculated:',percentageProgress)
    progressBar.style.width = percentageProgress
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