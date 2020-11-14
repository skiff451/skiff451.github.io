'use strict';

let hoursBlock = document.querySelectorAll(".hours-block .digits"),
    minutesBlock = document.querySelectorAll(".minutes-block .digits"),
    secondsBlock = document.querySelectorAll(".seconds-block .digits");

let hourFlag = new Date().getHours(),
    minutesFlag = new Date().getMinutes(),
    secondsFlag = new Date().getSeconds();

const hoursItems = document.querySelectorAll(".hours-block .digits"),
    minuteItems = document.querySelectorAll(".minutes-block .digits"),
    secondItems = document.querySelectorAll(".seconds-block .digits");

timeCorrection();
setInterval(clockStart, 1000);

function setTimeItemLine(itemBlock, timeItemName) {
    let time = new Date(),
        hour = time.getHours(),
        minute = time.getMinutes(),
        seconds = time.getSeconds();

    let index;

    if (timeItemName === "HOURS") {
        index = hour + 2; // to fill the digit line. we have two digits before current hour value. 
    } else if (timeItemName === "MINUTES") {
        index = minute + 2;
    } else if (timeItemName === "SECONDS") {
        index = seconds + 2;
    }

    let overNum;

    if (timeItemName === "MINUTES" || timeItemName === "SECONDS") {
        overNum = 59;
    } else if (timeItemName === "HOURS") {
        overNum = 23;
    }

    itemBlock.forEach((item) => {
        if (index <= overNum) {
            item.textContent = addZero(index);
            if (index < 0) {
                item.textContent = addZero(overNum);
                index = overNum;
            }
        }
        else if (index > overNum) {
            if (index - overNum === 2) {
                index = 1;
            } else {
                index = 0;
            }
        }
        index--;
    });
}

function addZero(digit) {
    if (digit < 10) {
        return `0${digit}`;
    } else {
        return digit;
    }
}
/** method add digit element at the top of digit line after animation occur. 
 Than changers css classes on digits block
 and removes last digit*/
function addFirstDigitInLine(itemBlock, timeItemName) {

    const first = itemBlock[0],
        second = itemBlock[1],
        third = itemBlock[2],
        fourth = itemBlock[3];
    const value = digitValue(first.textContent, timeItemName);

    first.classList.remove("first-digit");
    first.before(createFirstElement(value));
    second.classList.add("current-digit");
    third.classList.remove("current-digit");
    third.classList.add("last-digit");
    fourth.remove();


    function createFirstElement(value) {
        const firstDigit = document.createElement("div");
        firstDigit.className = "digits first-digit";
        firstDigit.textContent = value;
        return firstDigit;
    }

    function digitValue(value, timeItemName) {
        const h = "HOURS",
            m = "MINUTES",
            s = "SECONDS";

        if (timeItemName === h) {
            if (value < 23) {
                value++;
            } else {
                value = 0;
            }

        } else if (timeItemName === m || timeItemName === s) {
            if (value < 59) {
                value++;
            } else {
                value = 0;
            }
        }
        return addZero(value);
    }
}

function clockStart() {

    const time = new Date(),
        currentHour = time.getHours(),
        currentMinute = time.getMinutes(),
        currentSecond = time.getSeconds();

    const hoursLine = document.querySelector(".hours-block .digit-block"),
        minutesLine = document.querySelector(".minutes-block .digit-block"),
        secondsLine = document.querySelector(".seconds-block .digit-block");


    if (checkClockEvent(secondsFlag, currentSecond)) {
        clockAnimation(secondsLine, "SECONDS");
        secondsFlag = currentSecond;
        secondsCorrection(time);
    }
    if (checkClockEvent(minutesFlag, currentMinute)) {
        clockAnimation(minutesLine, "MINUTES");
        minutesFlag = currentMinute;
        minuteCorrection(time);
    }
    if (checkClockEvent(hourFlag, currentHour)) {
        clockAnimation(hoursLine, "HOURS");
        hourFlag = currentHour;
        hoursCorrection(time);
    }
}

function clockAnimation(clockItemBlock, timeItemName) {

    const growDigit = clockItemBlock.querySelector(".first-digit").nextElementSibling;
    const decreaseDigit = clockItemBlock.querySelector(".current-digit");
    growDigit.classList.add("digit-grow-animation");
    decreaseDigit.classList.add("digit-decrease-animation");

    clockItemBlock.classList.add("animation");
    let animationItem = document.querySelector(".animation");

    animationItem.addEventListener("webkitAnimationEnd", endAnimation);

    function endAnimation() {
        if (clockItemBlock.classList.contains("animation")) {
            growDigit.classList.remove("digit-grow-animation");
            decreaseDigit.classList.remove("digit-decrease-animation");
            clockItemBlock.classList.remove("animation");
            const items = clockItemBlock.querySelectorAll(".digits");
            addFirstDigitInLine(items, timeItemName);

        }
    }
}

function checkClockEvent(flag, currentTime) {
    if (flag !== currentTime) {
        return true;
    }
}

function timeCorrection() {
    const time = new Date();
    secondsCorrection(time);
    minuteCorrection(time);
    hoursCorrection(time);
}

function secondsCorrection(date) {
    const secondsBlock = document.querySelectorAll(".seconds-block .digits"),
        currentSecondDigit = document.querySelector(".seconds-block .current-digit");
    if (checkClockEvent(+currentSecondDigit.textContent + 1, date.getSeconds())) {
        setTimeItemLine(secondsBlock, "SECONDS");
    }
}

function minuteCorrection(date) {
    const minutesBlock = document.querySelectorAll(".minutes-block .digits"),
        currentMinuteDigit = document.querySelector(".minutes-block .current-digit");
    if (checkClockEvent(+currentMinuteDigit.textContent + 1, date.getMinutes())) {
        setTimeItemLine(minutesBlock, "MINUTES");
    }
}

function hoursCorrection(date) {
    const hoursBlock = document.querySelectorAll(".hours-block .digits"),
        currentHourDigit = document.querySelector(".hours-block .current-digit");
    if (checkClockEvent(+currentHourDigit.textContent + 1, date.getHours())) {
        setTimeItemLine(hoursBlock, "HOURS");
    }
}




