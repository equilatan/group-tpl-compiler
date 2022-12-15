document.getElementById('file-input').addEventListener('change', function() {
  var file = this.files[0];

  // Create a new FileReader object
  var reader = new FileReader();

  // Read the contents of the file and display it in the CodeMirror editor
  reader.addEventListener('load', function() {
    inputEditor.setValue(reader.result);
  });

  // Read the file as text
  reader.readAsText(file);
});