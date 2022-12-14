const { systemPreferences } = require("electron");

function semantic_declaration(){

    
    
    if(chkDataType(result[0]) && chkName(result[1]) && chkSemantic(result[0],result[3])){
        printSemantic("yep");
    }
    else{
        printSemantic("no");
    }


    /*
    for(var i=0; i < result.length; i++){

        
    }*/
}

function printSemantic(s){
    document.getElementById("semantic").textContent = s;
}


function chkDataType(dataType){

    const typeArr = ["int","double","String","float","boolean"];

    if(typeArr.includes(dataType)){
        return true;
    }
    else return false;
}

function chkName(name){

    const reservedNames = ["abstract","continue","for","new","switch","assert",
    "package","synchronized","default","goto","boolean","do","if",
    "private","this","break","else","import","public","throw","byte",
    "enum","implements","protected","throws","case","double","instanceof",
    "return","transient","catch","extends","int","short","try","char","final",
    "interface","static","void","class","finally","long","strictfp","volatile",
    "const","float","native","super","while"];

    if(onlyLettersAndNumbers(name)) {
			
        //check if name matches keywords
        if(reservedNames.includes(name)){
            return false;
        }
        else return true;
    }
    else return false;

}

function onlyLettersAndNumbers(str) {
    return /^[A-Za-z_][A-Za-z0-9_]*$/.test(str);
  }


  function chkSemantic(dataType, value) {
    switch (dataType) {
      case "int":
        return /^[0-9]+$/.test(value);
      case "double":
      case "float":
        return /^[0-9]+(\.[0-9]+)?$/.test(value);
      case "char":
        return value.length === 3 && value.charAt(0) === "'" && value.charAt(value.length - 1) === "'";
      case "String":
        return value.charAt(0) === "'" && value.charAt(value.length - 1) === "'";
      case "boolean":
        return value === "true" || value === "false";
      default:
        return false;
    }
}