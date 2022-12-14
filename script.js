"use strict";

window.addEventListener("DOMContentLoaded", start);

const url = "https://petlatkea.dk/2021/hogwarts/students.json";
const allStudents = [];
const studentObj = {
  firstName: "",
  lastName: "",
  middleName: "null",
  nickName: "null",
  image: "",
  house: "",
};

function start() {
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
    const student = Object.create(studentObj);

    student.house = studentInfo.house.trim();
    student.house = capitalise(student.house);

    let fullname;
    //takeaway the random spaces
    fullname = studentInfo.fullname.trim();
    //get first name and capitalise it
    student.firstName = fullname.split(` `)[0];
    student.firstName = capitalise(student.firstName);
    //find lastName and capitalise it
    student.lastName = fullname.substring(fullname.lastIndexOf(" ") + 1);
    student.lastName = capitalise(student.lastName);
    //find nickName and capatalise
    if (fullname.includes(`"`)) {
      student.nickName = fullname.split(`"`)[1];
      student.nickName = capitalise(student.nickName);
    } else {
      student.nickName = "null";
    }

    if (fullname.split(" ").length > 2 && fullname.includes(`"`) === false) {
      student.middleName = fullname.split(` `)[1];
      student.middleName = capitalise(student.middleName);
    } else {
      student.middleName = "null";
    }
    console.log(student);
    allStudents.unshift(student);
    console.log(allStudents);
  });
  displayStudent();
}

function capitalise(str) {
  return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
}

function displayStudent(student) {
  allStudents.forEach((student) => {
    console.log("displayStudent");
    const template = document.querySelector("#student-template").content;
    const copy = template.cloneNode(true);
    copy.querySelector(".first-name").textContent = `First Name: ${student.firstName}`;
    copy.querySelector(".last-name").textContent = `Last Name: ${student.lastName}`;
    copy.querySelector(".middle-name").textContent = `Middle Name: ${student.middleName}`;
    copy.querySelector(".nick-name").textContent = `Nickname: ${student.nickName}`;
    copy.querySelector(".house").textContent = `House: ${student.house}`;
    const parent = document.querySelector("main");
    parent.appendChild(copy);
  });
}
//fullname.indexOf(" ") !== student.fullname.lastIndexOf(" ")
