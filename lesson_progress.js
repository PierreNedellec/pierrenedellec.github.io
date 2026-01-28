
const startTime = document.getElementById('starttime')
const endTime = document.getElementById('endtime')
const calculateButton = document.getElementById('calculatebutton')
const progressBar = document.getElementById('progressbar')

calculateButton.addEventListener("click",startTicking)

function startTicking(){
    updateProgressBar()
    window.intervalID = setInterval(updateProgressBar,1000)
}

function timeToMinutes(time) {
    console.log('Tried to convert:',time)
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}

function updateProgressBar(){
    const error = validateData()
    console.log('Error:',error)
    if (error){
        alert(error);
        clearInterval(intervalID);
        return;
    }
    percentageProgress = percentageCompleted() + "%"
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

function validateData(){
    if (timeToMinutes(endTime.value)<timeToMinutes(startTime.value)) return "End time must be after the start time";
    if (timeToMinutes(endTime.value)===timeToMinutes(startTime.value)) return "The start and end cannot be at the same time.";
    if (Number.isNaN(timeToMinutes(endTime.value)) || Number.isNaN(timeToMinutes(startTime.value))) return "Both the start and end time must be defined.";
    return null;
}
