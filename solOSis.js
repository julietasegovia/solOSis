function updateTime(){
    var currentTime = new Date().toLocaleString();
    var timeText = document.querySelector("#time");

    timeText.innerHTML = currentTime;
}

setInterval(updateTime, 1000);

function dragElement(element) {
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  if (document.getElementById(element.id + "header")) {
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    element.onmousedown = startDragging;
  }

  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    initialX = e.clientX;
    initialY = e.clientY;
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function closeWindow(element){
    element.style.display = "none";
}

function openWindow(element){
    element.style.display = "block";
    element.style.top = "";
    element.style.left = "";
    element.style.transform = "translate(-50%, -50%)";
}

var welcomeWindow = document.getElementById("welcome-page");
var welcomeClose = document.querySelector("#welcome-pageclose");
var welcomeOpen = document.querySelector("#solosis-come-back");


dragElement(welcomeWindow);

welcomeClose.addEventListener("click", () => {
    closeWindow(welcomeWindow);
});

welcomeOpen.addEventListener("click", () => {
    openWindow(welcomeWindow);
});

var selectedIcon = undefined;

function chooseIcon(element){
    if(selectedIcon && selectedIcon != element)
        selectedIcon.classList.remove("selected-app");
    element.classList.add("selected-app");
    selectedIcon = element;
}

function stopChoosingIcon(element){
    element.classList.remove("selected-app");
    selectedIcon = undefined;
}

function handleIconChoosing(element, window){
    if(element.classList.contains("selected-app")){
      stopChoosingIcon(element);
      openWindow(window);
    }
    else{
      chooseIcon(element);
    }
}

var abmeWindow = document.querySelector("#about-me-content");
var sysWindow = document.querySelector("#system-app-content");
var pntWindow = document.querySelector("#paint-app-content");
var ntsWindow = document.querySelector("#notes-app-content");

const abmeIcon = document.querySelector("#about-logo");
const sysIcon = document.querySelector("#system-logo");
const pntIcon = document.querySelector("#paint-logo");
const ntsIcon = document.querySelector("#note-logo");

abmeIcon.addEventListener("click", () => {
    handleIconChoosing(abmeIcon, abmeWindow);
});

sysIcon.addEventListener("click", () => {
    handleIconChoosing(sysIcon, sysWindow);
});

pntIcon.addEventListener("click", () => {
    handleIconChoosing(pntIcon, pntWindow);
});

ntsIcon.addEventListener("click", () => {
    handleIconChoosing(ntsIcon, ntsWindow);
});

dragElement(abmeWindow);
dragElement(sysWindow);
dragElement(pntWindow);
dragElement(ntsWindow);