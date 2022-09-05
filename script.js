"use strict";

window.addEventListener("DOMContentLoaded", start);
const url = "https://petlatkea.dk/2021/hogwarts/students.json";
function start() {
  console.log("go!");
  loadJSON();
}
function loadJSON() {
  fetch(url)
    .then((response) => response.json())
    .then((jsonData) => {
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
  jsonData.forEach((studentInfo) => {
    let student = {
      firstName: "harry",
      lastName: "potter",
      middleName: "the rock",
      nickName: "specky",
      image: "...",
      house: "whatever",
    };
    student.fullname = studentInfo.fullname.trim();
    student.firstName = student.fullname.split(` `)[0];
    student.lastName = student.fullname.substring(student.fullname.lastIndexOf(" "));
    console.log(student.firstName);
    console.log(student.lastName);
  });
}
