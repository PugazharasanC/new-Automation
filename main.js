let curTopic = "";
let topics = {};
let myTestcase;
let questions;
let editor;
let myCodeMirror;

const getQuestions = async () => {
  let URL =
    "https://raw.githubusercontent.com/PugazharasanC/new-Automation/master/questions/questions.json";
  let fetchData = await fetch(URL);
  questions = await fetchData.json();
}

let feedTopic = () => {
  let myDropdown = document.getElementById("topics");
  let topicsArray = Object.keys(questions);
  topicsArray.forEach((val) => {
    let newOption = document.createElement("option");
    newOption.classList = "dropdown-item";
    newOption.innerHTML = val;
    newOption.value = val;
    topics[val] = {
      name: val,
      pageNum: 0,
      noOfQuestions: questions[val].length,
    };
    myDropdown.appendChild(newOption);
  });
}

let addTestCase = (testcase) => {
  myTestcase = testcase;
  let testcaseDiv = document.getElementById("testcase");
  testcaseDiv.innerHTML = "";
  testcase.forEach((val, ind) => {
    let newDiv = document.createElement("div");
    newDiv.className = "p-2 bd-highlight";
    newDiv.innerHTML = val;
    newDiv.id = "test" + ind;
    testcaseDiv.appendChild(newDiv);
  });
}

let feedQuestion = () => {
  if (questions[curTopic].length != 0) {
    let myQuestion = questions[curTopic][topics[curTopic].pageNum];
    document.getElementById("question").innerHTML = myQuestion.problem;
    myCodeMirror.setValue(myQuestion.template);
    addTestCase(myQuestion.output);
  }
}

let displayInfo = () => {
  let infoElements = document.getElementsByClassName("info");
  for (let element of infoElements) {
    element.style.display = "inline";
  }
}

let hideInfo = () => {
  let infoElements = document.getElementsByClassName("info");
  for (let element of infoElements) {
    element.style.display = "none";
  }
}

let nextPage = () => {
  if (
    curTopic !== "" &&
    topics[curTopic].pageNum !== topics[curTopic].noOfQuestions - 1
  ) {
    topics[curTopic].pageNum++;
    feedQuestion();
  } else {
    alert("Last Question");
  }
}

let prevPage = () => {
  if (curTopic !== "" && topics[curTopic].pageNum !== 0) {
    topics[curTopic].pageNum--;
    feedQuestion();
  } else {
    alert("First Question");
  }
};

let setTopic = (topic) => {
  curTopic = topic;
  if (topic !== "") {
    displayInfo();
    feedQuestion();
  } else {
    hideInfo();
    myCodeMirror.setValue("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
  }
};

window.onload = async () => {
  await getQuestions();
  feedTopic();
};

myCodeMirror = CodeMirror(document.getElementById("editor"), {
  lineNumbers: true,
  lineWrapping: true,
  firstLineNumber: 0,
  value: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
  mode: "javascript",
});

myCodeMirror.setSize("100%", "500px");

let input = document.getElementById("select");

function selectTheme() {
  let theme = input.options[input.selectedIndex].textContent;
  if (theme !== "default" && document.getElementById("id" + theme) === null) {
    let newLink = document.createElement("link");
    newLink.rel = "stylesheet";
    newLink.id = "id" + theme;
    newLink.href = "codemirror/theme/" + theme + ".css";
    document.getElementsByTagName("head")[0].appendChild(newLink);
  }
  myCodeMirror.setOption("theme", theme);
  location.hash = "#" + theme;
}
let choice =
  (location.hash && location.hash.slice(1)) ||
  (document.location.search &&
    decodeURIComponent(document.location.search.slice(1)));
if (choice) {
  input.value = choice;
  myCodeMirror.setOption("theme", choice);
}
CodeMirror.on(window, "hashchange", function () {
  let theme = location.hash.slice(1);
  if (theme) {
    input.value = theme;
    selectTheme();
  }
});

let defaultLog = console.log;
let count = 0;
let currTestcase = 0;
let runMyCode = () => {
  count = 0;
  currTestcase = 0;
  let runScript = document.getElementById("runScript");
  runScript.innerHTML = "";
  let newScript = document.createElement("script");
  newScript.innerHTML = myCodeMirror.getValue();
  runScript.appendChild(newScript);
};
console.log = (value) => {
 // defaultLog(value);
    value.replace("document.write","");
  if (myTestcase[currTestcase] === value) {
    count++;
    document.getElementById("test" + currTestcase).className = "p-2 bd-highlight pass";
  } else {
    document.getElementById("test" + currTestcase).className = "p-2 bd-highlight fail"
  }
  currTestcase++;
  if (count === myTestcase.length) {
    alert("All Test Cases Passed");
  }
};
