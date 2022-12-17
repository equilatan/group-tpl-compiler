


function semantic(){
  var numLines = Object.keys(tokenDictGlobal).length;
  let outTemp = "";
  let wrongSem = 0;
  for(let line = 0; line < numLines; line++){
    let tokens = tokenDictGlobal[line];
    let lexemes = lexemeDictGlobal[line];

    let isVar = false;
    let isClass = false;

    var dataType;
    for(let i = 0; i < tokens.length; i++){
      let token = tokens[i];
      let lexeme = lexemes[i];
      //outTemp += lexeme;
      if(token == "<data_type>"){
        dataType = lexeme;
        isVar=true;
        continue;
      }
      if(token == "<class>"){
        isClass == true;
        continue;
      }

      if(isVar==true){
        if (token == "<value>"){
          // outTemp += lexeme + " ";
          // outTemp += (checkValue(dataType, lexeme) + "\n");
          if(checkValue(dataType, lexeme) == false){
            outTemp += ("Value of " + dataType + ": " + lexeme + " is Semantically Incorrect." + "\n\n");
            isVar == false;
            wrongSem++;
          }
          else{
            //outTemp += ("Value of "  + dataType + ": " + lexeme + " is Semantically Correct!" + "\n\n");
            isVar == false;
          }
        }
        else if(token == "<identifier>"){

          if(/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(lexeme) == false){
            outTemp += ("Variable Name " + lexeme + " is " + "Semantically Incorrect." + "\n\n");
            isVar == false;
            wrongSem++;
          }
          else{
            //outTemp += ("Variable Name " + lexeme + " is " + "Semantically Correct!" + "\n\n");
            isVar == false;
          }
        }
      }
    }
  }

  
  if(wrongSem != 0){
    outTemp += " Total Semantic Errors: " + wrongSem;
    print3(outTemp);
    document.getElementById("semantic").disabled = true;
    document.getElementById("semantic").style.backgroundColor = "#dc3545";
    document.getElementById("semantic").style.color = white;
  }
  else{
    outTemp += "The Program is Semantically Correct!";
    print3(outTemp);
    document.getElementById("semantic").disabled = false;
    document.getElementById("semantic").style.backgroundColor = "#32CD32";
    document.getElementById("semantic").style.color = black;

  }


  wrongSem=0;
  

}

function checkValue(dataType, value) {
  let isValid = false;
  switch (dataType) {
    case "int":
      isValid = /^\d+$/.test(value);
      break;
    case "double":
    case "float":
      isValid = /^\d*\.\d+$/.test(value);
      break;
    case "String":
      isValid = /^"([^"]*)"$/.test(value);
      break;
    case "char":
      isValid = /^'([^']?)'$/.test(value);
      break;
    case "boolean":
      isValid = (value == "true" || value == "TRUE" || value == "false" || value == "FALSE");
    default:
      // dataType is not recognized
      break;
  }
  return isValid;
}




function print3(s){
    document.getElementById("output").innerHTML = s;
    document.getElementById("output").scrollTop = document.getElementById("output").scrollHeight;

    
}