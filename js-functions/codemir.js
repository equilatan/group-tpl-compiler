var inputEditor = CodeMirror(document.getElementById('input-editor'), {
    value: '',
    mode: 'javascript',
    theme: 'material',
    lineNumbers: true
  });

  inputEditor.on("change", function() {
    // Check if there is any text in the codemirror instance
    if (inputEditor.getValue().trim().length > 0) {
      // If there is text, enable the syntax and semantic buttons
      document.getElementById("syntax").disabled = true;
      document.getElementById("semantic").disabled = true;
    } else {
      // If there is no text, disable the syntax and semantic buttons
      document.getElementById("syntax").disabled = true;
      document.getElementById("semantic").disabled = true;
    }
  });

  window.userInput = inputEditor.getValue();

  inputEditor.addEventListener("keyup", function() {
    // get the lexical, syntax, and semantic buttons
    var lexbutton = document.getElementById("lexical");
    var synbutton = document.getElementById("syntax");
    var sembutton = document.getElementById("semantic");

    // disable the buttons
    lexbutton.disabled = true;
    synbutton.disabled = true;
    sembutton.disabled = true;
  });