// Create a new instance of Dropzone
var dropZone = new Dropzone("#drop-zone", {
    url: "/file/post"
  });
  
  // Handle the addedfile event
  dropZone.on("addedfile", function(file) {
    if (file.type !== "text/plain") {
      // Display a popup message
      alert("Only text files are allowed");
      
      // Remove the file from the drop zone
      this.removeFile(file);
    }
  });
  
  // Handle the success event
  dropZone.on("success", function(file, response) {
    // Set the file contents as the value of the CodeMirror editor
    inputEditor.setValue(response);
  });
  