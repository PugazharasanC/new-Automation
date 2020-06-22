class Question {
  constructor() {}
}

class Ide {
  renderComplierLanguages(selectedLanguage) {
    try {
      let editorModeId = $("#languageSelect");
      let availableLanguages = [
        "BASH",
        "BASIC",
        "C",
        "CLOJURE",
        "CRYSTAL",
        "C++",
        "C#",
        "ELIXIR",
        "ERLANG",
        "GO",
        "HASKELL",
        "INSECT",
        "JAVA",
        "JAVA 8",
        "JAVASCRIPT",
        "OCAML",
        "OCTAVE",
        "PASCAL",
        "PYTHON 2",
        "PYTHON 3",
        "RUBY",
        "RUST",
      ];
      let languageData = "";
      for (let itr = 0; itr < availableLanguages.length; itr++) {
        let languageValue = this.getValue(availableLanguages[itr]);
        if (selectedLanguage && selectedLanguage === languageValue) {
          languageData +=
            "<option value='" +
            languageValue +
            "' selected>" +
            availableLanguages[itr] +
            "</option>";
        } else {
          languageData +=
            "<option value='" +
            languageValue +
            "'>" +
            availableLanguages[itr] +
            "</option>";
        }
      }
      editorModeId.html(languageData);
    } catch (error) {}
  }
  getMode(language) {
    let modeList = {
      bash: "sh",
      c: "c_cpp",
      clojure: "clojure",
      crystal: "crystal",
      cpp: "c_cpp",
      csharp: "csharp",
      elixir: "elixir",
      erlang: "erlang",
      go: "golang",
      haskell: "haskell",
      java: "java",
      java8: "java",
      javascript: "javascript",
      ocaml: "ocaml",
      pascal: "pascal",
      python: "python",
      python3: "python",
      ruby: "ruby",
      rust: "rust",
    };
    return modeList[language] ? modeList[language] : "text";
  }
  getCompilerId(language) {
    var language_name = {
      c: "C",
      cpp: "CPP14",
      js: "JAVASCRIPT",
      pl: "PERL",
      php: "PHP",
      py: "PY2",
      py3: "PY3",
      cs: "CS",
      rb: "RUBY",
      java: "JAVA",
      sh: "BASH",
      scala: "SCALA",
      go: "GO",
      m: "OBJC",
      java8: "JAVA8",
      javascript: "JAVASCRIPT",
      javascript_en: "JAVASCRIPT",
      python_en: "PY3",
      BASH: "BASH",
      C: "C",
      "C++": "CPP14",
      "C#": "CS",
      GO: "GO",
      JAVA: "JAVA",
      "JAVA 8": "JAVA8",
      JAVASCRIPT: "JAVASCRIPT",
      "OBJECTIVE C": "OBJC",
      PERL: "PERL",
      PHP: "PHP",
      "PYTHON 2": "PY2",
      "PYTHON 3": "PY3",
      RUBY: "RUBY",
      SCALA: "SCALA",
      java_en: "JAVA",
      java_telugu: "JAVA",
      python: "PY3",
      python_ar: "PY3",
      python_hi: "PY3",
      BASIC: 3,
      CLOJURE: 18,
      CRYSTAL: 19,
      ELIXIR: 20,
      ERLANG: 21,
      HASKELL: 23,
      INSECT: 25,
      OCAML: 31,
      OCTAVE: 32,
      PASCAL: 33,
      RUST: 42,
    };
    return language_name[language];
  }
  getValue(label) {
    let valueList = {
      BASH: "bash",
      BASIC: "basic",
      C: "c",
      CLOJURE: "clojure",
      CRYSTAL: "crystal",
      "C++": "cpp",
      "C#": "csharp",
      ELIXIR: "elixir",
      GO: "go",
      HASKELL: "haskell",
      INSECT: "insect",
      JAVA: "java",
      "JAVA 8": "java8",
      JAVASCRIPT: "javascript",
      OCAML: "ocaml",
      OCTAVE: "octave",
      PASCAL: "pascal",
      "PYTHON 2": "python",
      "PYTHON 3": "python3",
      RUBY: "ruby",
      RUST: "rust",
    };
    return valueList[label] ? valueList[label] : "UNKNOWN";
  }
  updateSettings() {
    let currentMode = this.getMode($("#languageSelect").val());
    let fontSize = $("#editor-font-size").val();
    let selectedTheme = $("input[type=radio][name=theme]:checked").val();
    let wrapEnabled = $("#codeWrap").is(":checked");
    let showGutter = $("#showGutter").is(":checked");
    let autoCompletionEnabled = $("#autoCompletion").is(":checked");
    let lineNumberEnabled = $("#lineNumber").is(":checked");
    import(
      "https://unpkg.com/ace-builds@1.4.8/src-min-noconflict/mode-" +
        currentMode +
        ".js"
    ).then(function (currentLanguage) {
      let selectedMode = ace.require("ace/mode/" + currentMode).Mode;
      editor.session.setMode(new selectedMode());
      editor.setOptions({
        fontSize: Number(fontSize),
        wrap: wrapEnabled,
        showGutter: showGutter,
        showLineNumbers: lineNumberEnabled,
        showPrintMargin: false,
        scrollPastEnd: true,
      });
    });
    import(
      "https://unpkg.com/ace-builds@1.4.8/src-min-noconflict/theme-" +
        selectedTheme +
        ".js"
    ).then(function (currentTheme) {
      editor.setTheme("ace/theme/" + selectedTheme);
    });
    import(
      "https://unpkg.com/ace-builds@1.4.8/src-min-noconflict/ext-language_tools.js"
    ).then(function (autoCompletion) {
      ace.require("ace/ext/language_tools");
      editor.setOption("enableLiveAutocompletion", autoCompletionEnabled);
    });
    authorize.setSession(
      "ideLanguageSelected",
      $("#languageSelect option:selected").val()
    );
  }
  codeTemplate = (label) => {
    let templateData = {
      BASH: 'echo "Hello World"',
      C:
        '#include <stdio.h>\nint main(void) {\n    printf("hello, world");\n    return 0;\n}',
      "C++":
        '#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello World" << endl;\n    return 0;\n}',
      "C#":
        'public class Hello {\n    public static void Main() {\n        System.Console.WriteLine("hello, world");\n    }\n}',
      GO:
        'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("hello, world")\n}',
      JAVA:
        'public class Main {\n    public static void main(String[] args) {\n        System.out.println("hello, world");\n    }\n}',
      "JAVA 8":
        'public class Main {\n    public static void main(String[] args) {\n        System.out.println("hello, world");\n    }\n}',
      JAVASCRIPT:
        '//A Simple Hello World\nconsole.log("Hello World");\n\n\n// Getting input via STDIN\nconst readline = require("readline");\n\nconst inp = readline.createInterface({\n  input: process.stdin\n});\n\ninp.on("line", (data) => {\n  console.log(data)\n});',
      "OBJECTIVE C":
        '#import <Foundation/Foundation.h>\n\nint main(int argc, const char * argv[]) {\n    @autoreleasepool {\n        NSLog(@"Hello, World!");\n    }\n    return 0;\n}\n',
      PERL:
        '#!/usr/bin/perl \n\n# Modules used \nuse strict; \nuse warnings; \n\n# Print function \nprint("Hello World"); \n',
      PHP: '<?php\necho "Hello World!";\n?>',
      "PYTHON 2": 'print "Hello World"',
      "PYTHON 3": 'print("Hello World")',
      RUBY: 'puts "hello, world"',
      SCALA:
        'object HelloWorld {\n  def main(args: Array[String]): Unit = {\n    println("Hello, world!")\n  }\n}',
      BASIC: 'PRINT "hello, world"',
      CLOJURE: '(println "hello, world")',
      CRYSTAL: 'puts "hello, world"',
      ELIXIR: 'IO.puts "hello, world"',
      ERLANG: 'main(_) ->\n    io:fwrite("hello, world").',
      HASKELL: 'main = putStrLn "hello, world"',
      INSECT: "2 min + 30 s",
      OCAML: 'print_endline "hello, world";',
      OCTAVE: 'printf("hello, world");',
      PASCAL: "program Hello;\nbegin\n    writeln ('hello, world')\nend.",
      RUST: 'fn main() {\n    println!("hello, world");\n}',
    };
    return templateData[label] ? templateData[label] : "";
  };
  isMobile() {
    if (window.innerWidth <= 768) {
      return true;
    }
    return false;
  }
  renderCustomCompilation(responseData) {
    let data = responseData.compilationDetails;
    let runCount = responseData.runCount;
    let compilerData = "";
    let output = data.output ? data.output : "Nil";
    let executionTime = data.executionTime ? data.executionTime : "Nil";
    let memory = data.memory ? data.memory : "Nil";
    compilerData += "<h5>Output: </h5>";
    compilerData +=
      "<div><pre>" +
      output +
      "</pre><h5>Execution Time:</h5><pre>" +
      executionTime +
      "</pre><h5>Memory Used: </h5><pre>" +
      memory +
      "</pre></div>";
    $(".outputValue").html(compilerData);
    this.isMobile()
      ? $("#input-tab-mobile").trigger("click")
      : $("#output-tab").trigger("click");
  }
}
$(document).ready(function () {
  authorize.loginCheck();
  editor = ace.edit("editor");
  $('[data-toggle="tooltip"]').tooltip();
  Split(["#one", "#two"], {
    minSize: 300,
    onDrag: function (event) {
      editor.resize();
    },
  });
  let ideObj = new Ide();
  let previousLanguage = authorize.getSession("ideLanguageSelected");
  let previousCode = authorize.getSession("ideSourceCode");
  ideObj.renderComplierLanguages(
    previousLanguage && previousLanguage !== "" ? previousLanguage : false
  );
  ideObj.updateSettings();
  $(".spinner").hide();
  if (previousLanguage && previousLanguage !== "") {
    $("#languageSelect").val(previousLanguage);
  }
  if (previousCode && previousCode !== "") {
    editor.setValue(previousCode);
  } else {
    let languageLabel = $("#languageSelect option:selected").text();
    editor.setValue(ideObj.codeTemplate(languageLabel));
  }
  editor.on("change", function (event) {
    authorize.setSession("ideSourceCode", editor.getValue());
  });
});
$(document).on(
  "change input",
  "#languageSelect, #editor-font-size, #themeControl, #autoCompletion, #showGutter, #codeWrap, #lineNumber",
  function () {
    let ideObj = new Ide();
    ideObj.updateSettings();
  }
);
$(document).on("click", "#insertTemplate", function () {
  let ideObj = new Ide();
  let languageLabel = $("#languageSelect option:selected").text();
  editor.setValue(ideObj.codeTemplate(languageLabel));
  $("#editorSettingModal").modal("hide");
});
$(window).on("resize", function () {
  if (
    window.innerWidth > 768 &&
    $("#resultTabMobile .active").text() !== "EDITOR"
  ) {
    $("#editor-tab-mobile").trigger("click");
  }
});
$(document).on("click", ".share-link", function () {
  $("#editorSettingModal").modal("hide");
  authorize.share_modal();
});
$(document).on("click", "#runCode", function () {
  let ideObj = new Ide();
  let sourceCode = editor.getValue();
  let input = ideObj.isMobile()
    ? $("#inputValue-mobile").val()
    : $("#inputValue").val();
  let languageLabel = $("#languageSelect option:selected").text();
  if (sourceCode && sourceCode !== "") {
    $(".spinner").show();
    $("#runCode").attr("disabled", true);
    grecaptcha
      .execute("6LdADb4UAAAAAA1feb36sozffPYRKKOqD9WPbibp", {
        action: "runCode",
      })
      .then(function (token) {
        authorize.ajax(
          {
            source: sourceCode,
            user_input: input,
            compilerId: ideObj.getCompilerId(languageLabel),
            token: token,
          },
          "idePoint",
          function (data) {
            $("#runCode").attr("disabled", false);
            data = JSON.parse(data);
            if (data.status == "success") {
              ideObj.renderCustomCompilation(data);
            } else {
              $("#reloadModal").modal({ show: true, backdrop: "static" });
            }
          }
        );
        ga("send", {
          hitType: "event",
          eventCategory: "IDE",
          eventAction: "runCode",
          eventLabel: languageLabel + " - Run",
        });
      });
  }
});
$(document).on("click", "#reloadPage", function () {
  window.location.reload();
});
