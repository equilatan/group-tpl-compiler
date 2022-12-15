// Attach an event listener to the button to call the save code when the button is clicked
document.getElementById('save-button').addEventListener('click', function() {
    // Get the text in the CodeMirror editor
    var text = inputEditor.getValue();
  
    // Create a new Blob object with the text as its content
    var file = new Blob([text], {type: 'text/plain'});
  
    // Create a temporary a element
    var a = document.createElement('a');
    a.style.display = 'none';
  
    // Set the href and download attributes of the a element to the file
    // This will prompt the user to save the file
    a.href = URL.createObjectURL(file);

    var filenameTemp = document.getElementById("file-name-display").innerHTML;

    if(filenameTemp != ""){
        a.download = filenameTemp;
    }
    else
        a.download = 'filename.java';
  
    // Append the a element to the DOM
    document.body.appendChild(a);
  
    // Click the a element to trigger the download
    a.click();
  
    // Remove the a element from the DOM
    document.body.removeChild(a);
  });