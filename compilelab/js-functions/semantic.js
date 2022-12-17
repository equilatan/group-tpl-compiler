


function semantic(){
  var numLines = Object.keys(tokenDictGlobal).length;
  let outTemp = "";
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
          outTemp += lexeme + " ";
          outTemp += (checkValue(dataType, lexeme) + "\n");
          isVar == false;
        }
      }
    }
  }

  print3(outTemp + "\n");
}

function checkValue(dataType, value) {
  let isValid = false;
  switch (dataType) {
    case "int":
      isValid = /^\d+$/.test(value);
      break;
    case "double":
    case "float":
      isValid = /^\d+(\.\d+)?$/.test(value);
      break;
    case "String":
      isValid = typeof value === "string";
      break;
    default:
      // dataType is not recognized
      break;
  }
  return isValid;
}




function print3(s){
    document.getElementById("output").innerHTML = s;
    document.getElementById("output").scrollTop = document.getElementById("output").scrollHeight;

    if(s != ""){
        document.getElementById("semantic").disabled = false;
        document.getElementById("semantic").style.backgroundColor = "#32CD32";
        document.getElementById("semantic").style.color = black;
    }
    
}