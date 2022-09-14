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
      firstName: "",
      lastName: "",
      middleName: "null",
      nickName: "null",
      image: "",
      house: "",
    };
    //takeaway the random spaces
    student.fullname = studentInfo.fullname.trim();
    //get first name
    student.firstName = student.fullname.split(` `)[0];
    //capitalise firstName
    student.firstName = capitalise(student.firstName);
    //find lastName
    student.lastName = student.fullname.substring(student.fullname.lastIndexOf(" ") + 1);
    //capitalise lastName
    student.lastName = capitalise(student.lastName);
    //find nickName
    if (student.fullname.includes(`"`)) {
      student.nickName = student.fullname.split(`"`)[1];
      student.nickName = capitalise(student.nickName);
    }
    console.log(student);
  });
}

function capitalise(str) {
  return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
}
