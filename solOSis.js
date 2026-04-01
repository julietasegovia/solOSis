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

var abmepage = document.querySelector("#abmepage");
var systemapp = document.querySelector("#systemapp");
var paintapp = document.querySelector("#paintapp");
var notesapp = document.querySelector("#notesapp");

const abmeIcon = document.querySelector("#about-logo");
const sysIcon = document.querySelector("#system-logo");
const pntIcon = document.querySelector("#paint-logo");
const ntsIcon = document.querySelector("#note-logo");

var abmeClose = document.querySelector("#abmepageclose");
var pntClose = document.querySelector("#paintappclose");
var sysClose = document.querySelector("#systemappclose");

abmeIcon.addEventListener("click", () => {
    handleIconChoosing(abmeIcon, abmepage);
});

sysIcon.addEventListener("click", () => {
    handleIconChoosing(sysIcon, systemapp);
});

pntIcon.addEventListener("click", () => {
    handleIconChoosing(pntIcon, paintapp);
});

ntsIcon.addEventListener("click", () => {
    handleIconChoosing(ntsIcon, notesapp);
});

dragElement(abmepage);
dragElement(systemapp);
dragElement(paintapp);
dragElement(notesapp);

abmeClose.addEventListener("click", () => {
    closeWindow(abmepage);
})

pntClose.addEventListener("click", () => {
    closeWindow(paintapp);
})

sysClose.addEventListener("click", () => {
    closeWindow(systemapp);
})

const grid = document.querySelector("#canvas");
const resetButton = document.querySelector("#reset-canvas");
const setEraser = document.querySelector("#set-eraser");
const chosenColor = document.querySelector("#chosen-color");

let isDragging = false;
let isErasing = false;
let cells = [];
let trueColor = "rgb(255, 0, 0)";

for(let row = 0; row < 20; row++){
    for(let col = 0; col < 20; col++){
        const cell = document.createElement('div');
        cell.classList.add('pixel');
        cell.dataset.row = row;
        cell.dataset.col = col;
        grid.appendChild(cell);
        cells.push(cell);
    }
}

function cellMode(cell){
    if(isErasing){
        cell.style.backgroundColor = "rgb(240, 255, 236)";
        cell.style.borderColor = "rgb(220, 255, 210)";
    }
    else{
        cell.style.backgroundColor = trueColor;
        cell.style.borderColor = trueColor;        
    }
}

chosenColor.addEventListener("input", (e) => {
    trueColor = e.target.value;

    if(isErasing){
        setEraser.classList.remove('eraser-set');
        isErasing = false;
    }
});

cells.forEach(cell => {
    cell.addEventListener('mousedown', (e) => { //when a cell is clicked, draw or erase dpending on cell mode
        e.preventDefault();
        isDragging = true;
        cellMode(cell);
    });

    cell.addEventListener('mouseenter', () => { //enables infinite dragging
        if(isDragging)
            cellMode(cell);
    });

    cell.addEventListener('mouseup', (e) => { //stops drawing/erasing when user stops dragging the mouse
        isDragging = false;
    });
})

resetButton.addEventListener("click", () =>{
    cells.forEach(cell => {
        cell.style.backgroundColor = "rgb(240, 255, 236)";
        cell.style.borderColor = "rgb(220, 255, 210)"
        setEraser.classList.remove('eraser-set');
        isErasing = false;
    });
})

setEraser.addEventListener("click", () =>{
    if(isErasing){ //disables erasing
        setEraser.classList.remove('eraser-set');
        isErasing = false;
    }
    else{ //enables erasing
        setEraser.classList.add('eraser-set');
        isErasing = true;
    }
})