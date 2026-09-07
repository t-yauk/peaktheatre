const v = document.getElementById("video");
const elements = document.getElementsByClassName("control-item");
const wrapper = (document.getElementsByClassName("timeline-wrapper"))[0];
let timeoutId;

function startFilm() {
    v.play();
    document.getElementById("start-button").style.display = "none";
    document.getElementById("cover").style.display = "none";
    const timelineInterval = setInterval(updateTimeline, 10);
}

function playPause() {
    if(!v.paused){
        v.pause();
    }else{
        v.play();
    }
}

function rewind() {
    v.currentTime -= 10;
}

function forward() {
    v.currentTime += 10;
}

function updateTimeline() {

    const perc = ((v.currentTime / v.duration) * 100);

    document.getElementById("timeline").style.width = `${perc}%`;

    if(!v.paused){
        elements[1].innerHTML = "<i class='fa-solid fa-pause'></i>";
    }else{
        elements[1].innerHTML = "<i class='fa-solid fa-play'></i>";
    }



}





const element = document.querySelector('.the-timeline');

element.addEventListener('click', function (event) {
  // Get the size of the element and its position relative to the viewport
  const rect = this.getBoundingClientRect();

  // Calculate the click position relative to the element's top-left corner
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;

  // Turn those positions into a percentage of the total width/height
  const percentageX = (clickX / rect.width) * 100;
  const percentageY = (clickY / rect.height) * 100;

  const the_timecode = ((percentageX / 100) * v.duration);
  
  v.currentTime = the_timecode;

  
});



v.addEventListener('click', function (event) {
    if(!v.paused){
        v.pause();
    }else{
        v.play();
    }
});




function formatSeconds(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Pad each component with a leading zero if it's a single digit
    const hh = String(hours);
    const mm = String(minutes);
    const ss = String(seconds).padStart(2, '0');

    if(totalSeconds >= 3600){
        return `${hh}:${mm}:${ss}`;
    }else{
        return `${mm}:${ss}`;
    }
}



function fullToggle() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
        .catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
        // Otherwise, exit full screen
        document.exitFullscreen();
    }
}












function resetTimer() {
    // Reappear/show the element immediately when the mouse moves
    wrapper.style.transform = 'translateY(0px)';
    document.getElementById("the-title").style.opacity = "1";
    document.getElementById("homelink").style.opacity = "1";
    document.body.style.cursor = 'default';

    // Clear the existing timeout
    clearTimeout(timeoutId);

    // Set a new timer to hide the element after 10 seconds (10000 milliseconds)
    timeoutId = setTimeout(() => {
      wrapper.style.transform = 'translateY(12vh)';
      document.getElementById("the-title").style.opacity = "0";
      document.getElementById("homelink").style.opacity = "0";
      document.body.style.cursor = 'none';
    }, 5000);
}

// Listen for mouse movements anywhere on the page
window.addEventListener('mousemove', resetTimer);

// Initialize the timer when the page loads
resetTimer();
