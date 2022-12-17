// Get a reference to the drop-zone div
var dropZone = document.getElementById('drop-zone');

function setupDropZone() {
  // Get a reference to the CodeMirror instance


  // Add an event listener for when the user drags a file over the drop-zone
  dropZone.addEventListener('dragover', function(e) {
    // Prevent the default behavior
    e.preventDefault();

    // Set the drop-zone's background color to indicate that a file can be dropped here
    dropZone.style.backgroundColor = 'lightgreen';
  });

  // Add an event listener for when the user leaves the drop-zone
  dropZone.addEventListener('dragleave', function(e) {
    // Reset the drop-zone's background color
    dropZone.style.backgroundColor = '';
  });

  // Add an event listener for when the user drops a file on the drop-zone
  dropZone.addEventListener('drop', function(e) {
    // Prevent the default behavior
    e.preventDefault();

    // Reset the drop-zone's background color
    dropZone.style.backgroundColor = '';

    // Get the file that was dropped
    var file = e.dataTransfer.files[0];

    // Get the file extension of the file
    var fileExtension = file.name.split('.').pop();

    // Check if the file is a Java file
    if (fileExtension == 'java') {
      // Create a new FileReader
      var reader = new FileReader();

      // Add an event listener for when the file has been read
      reader.addEventListener('load', function(e) {
        // Get the file contents as a string
        var text = e.target.result;

        // Save the string in a variable
        var myString = text;

        // Set the value of the CodeMirror instance to the contents of the file
        inputEditor.setValue(myString);
      });

      // Read the file as text
      reader.readAsText(file);
    } else {
      alert('File must be a Java file!');
    }

    
  });
}

// Set up the drop zone when the page loads
setupDropZone();

// Set up the drop zone again if the user clicks the drop-zone element
dropZone.addEventListener('click', function() {
  // Remove existing event listeners
  dropZone.removeEventListener('dragover', handleDragOver);
  dropZone.removeEventListener('dragleave', handleDragLeave);
  dropZone.removeEventListener('drop', handleDrop);

  // Set up the drop zone again
  setupDropZone();
});
