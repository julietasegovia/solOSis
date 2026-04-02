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
var calcapp = document.querySelector("#calculatorapp");

const abmeIcon = document.querySelector("#about-logo");
const sysIcon = document.querySelector("#system-logo");
const pntIcon = document.querySelector("#paint-logo");
const ntsIcon = document.querySelector("#note-logo");
const calcIcon = document.querySelector("#calculator-logo");

var abmeClose = document.querySelector("#abmepageclose");
var pntClose = document.querySelector("#paintappclose");
var sysClose = document.querySelector("#systemappclose");
var ntsClose = document.querySelector("#notesappclose");
var calcClose = document.querySelector("#calculatorappclose");

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

calcIcon.addEventListener("click", () => {
    handleIconChoosing(calcIcon, calcapp);
});

dragElement(abmepage);
dragElement(systemapp);
dragElement(paintapp);
dragElement(notesapp);
dragElement(calcapp);

abmeClose.addEventListener("click", () => {
    closeWindow(abmepage);
})

pntClose.addEventListener("click", () => {
    closeWindow(paintapp);
})

sysClose.addEventListener("click", () => {
    closeWindow(systemapp);
})

ntsClose.addEventListener("click", () => {
    closeWindow(notesapp);
})

calcClose.addEventListener("click", () => {
    closeWindow(calcapp);
});

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

let browser = document.querySelector("#bws2");
let screenDisplay = document.querySelector("#scr2");
let timeZone = document.querySelector("#tz2");
let osVer = document.querySelector("#osv2");

const userAgent = navigator.userAgent;
let browserName = "Unknown";
let browserVersion = "Unknown";

if (userAgent.includes("Edg/")) {
    browserName = "Edge";
    browserVersion = userAgent.match(/Edg\/([\d.]+)/)?.[1];
} else if (userAgent.includes("Chrome/") && !userAgent.includes("Chromium/")) {
    browserName = "Chrome";
    browserVersion = userAgent.match(/Chrome\/([\d.]+)/)?.[1];
} else if (userAgent.includes("Firefox/")) {
    browserName = "Firefox";
    browserVersion = userAgent.match(/Firefox\/([\d.]+)/)?.[1];
} else if (userAgent.includes("Safari/") && !userAgent.includes("Chrome/")) {
    browserName = "Safari";
    browserVersion = userAgent.match(/Version\/([\d.]+)/)?.[1];
} else if (userAgent.includes("OPR/") || userAgent.includes("Opera/")) {
    browserName = "Opera";
    browserVersion = userAgent.match(/OPR\/([\d.]+)/)?.[1];
}

const screenRes = `${screen.width} x ${screen.height}`;

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

let osVersion = "Unknown";
if (userAgent.includes("Windows NT 10.0")) osVersion = "Windows 10/11";
else if (userAgent.includes("Windows NT 6.3")) osVersion = "Windows 8.1";
else if (userAgent.includes("Windows NT 6.1")) osVersion = "Windows 7";
else if (userAgent.includes("Mac OS X")) {
    const match = userAgent.match(/Mac OS X ([\d_]+)/);
    osVersion = "macOS " + (match?.[1]?.replace(/_/g, ".") ?? "");
} else if (userAgent.includes("Android")) {
    const match = userAgent.match(/Android ([\d.]+)/);
    osVersion = "Android " + (match?.[1] ?? "");
} else if (userAgent.includes("iPhone OS") || userAgent.includes("iPad")) {
    const match = userAgent.match(/OS ([\d_]+)/);
    osVersion = "iOS " + (match?.[1]?.replace(/_/g, ".") ?? "");
} else if (userAgent.includes("Linux")) osVersion = "Linux";

browser.textContent = `${browserName} ${browserVersion}`;
screenDisplay.textContent = screenRes;
osVer.textContent = osVersion;
timeZone.textContent = userTimeZone;

let titletext = document.querySelector("#title-here");
let contenttext = document.querySelector("#note-here");

function editText(el){
    el.style.width = el.offsetWidth + "px";
    el.style.height = el.offsetHeight + "px";
    el.textContent = "";
    el.setAttribute("contenteditable", "true");
    el.focus();

    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

titletext.addEventListener("click", () => editText(titletext));
contenttext.addEventListener("click", () => editText(contenttext));

titletext.addEventListener("blur", () =>{
    titletext.removeAttribute("contenteditable");
});

contenttext.addEventListener("blur", () => {
    contenttext.removeAttribute("contenteditable");
})

let calcdisplay = document.querySelector("#display-result");
let calcbuttons = document.querySelectorAll(".calc-buttons");

calcbuttons.forEach(c => {
    c.addEventListener("click", () => {
        calcdisplay.textContent += c.textContent;
    });
});
