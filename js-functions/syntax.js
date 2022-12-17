var errorChk = false;
var currentLine = 0;
var errorTemp = "";

function syntax(){

    var numLines = Object.keys(tokenDictGlobal).length;
    let errorMessages = "";
    var classChk = false;

    var lbrace_ctr = 0;
    var rbrace_ctr = 0;
    var classDecl = 0;
    var dataTypeDecl = 0;
    var varInitDecl = 0;
    var varChange = 0;
    var varInitFinish = true;
    var methodDecl =0 ;
    var semicolonCtr=0;
    var semicolonAll=0;
    insideMethod = false;
    for (let line = 0; line < numLines; line++) {
        //get tokens from line
        let tokens = tokenDictGlobal[line];

        //iterate tokens from line
        for (let i = 0; i < tokens.length; i++) {
          //get specific token
          let token = tokens[i];
          //check if token is undefined so it can be skipped
          if (token == undefined) continue;
          else if (errorChk == true) break;

          //Syntax Checking - Class Declaration
          else if(token == "<access_modifier>" && classChk == false) {
            classChk = true;
            classDecl++;
            continue;
          }
          if(classDecl == 1){
            if(token == "<class>"){
                classDecl++;
            }
            else printError("Expected <class>, got " + token, line);
          } 
          else if(classDecl == 2){
            if(token == "<identifier>"){
                classDecl++;
            }
            else printError("Expected <identifier>, got " + token, line);
          }
          else if(classDecl == 3){
            if(token == "<left_brace_delimiter>"){
                classDecl++;
                lbrace_ctr++;
            }
            else printError("Expected <left_brace_delimiter>, got " + token, line);
          }
          else if(classDecl == 4){

            //check variable initialization syntax
            if(token == "<identifier>" && dataTypeDecl == 0 && methodDecl == 0 && varChange==0){
                varChange++;
                continue;
            }
            else if(varChange == 1){
                if(token == "<assignment_operator>" || token == "<arithmetic_assignment_operator>"){
                    varChange++;
                }
                else printError("Expected <assignment_operator>, got " + token, line);
            }
            else if(varChange == 2){
                if(token == "<value>" || token == "<identifier>"){
                    varChange++;
                }
                else printError("Expected <value>, got " + token, line);
            }
            else if(varChange == 3){
                if(token == "<arithmetic_operator>"){
                    varChange--;
                }
                else if(token == "<arithmetic_operator>"){
                    varChange--;
                }
                else if(token == "<semicolon_delimiter>"){
                    varChange=0;
                    semicolonCtr++;
                }
                else printError("Expected <semicolon_delimiter>, got " + token, line);
            }

            //check method calling syntax
            if(insideMethod==true){
            }



            if(token == "<access_modifier>"){
                dataTypeDecl=1;
                continue;
            }
            else if(token == "<static_modifier>"){
                dataTypeDecl = 1;
                continue;
            }




            //check method declaration syntax
            else if(methodDecl == 4 && token == "<left_parenthesis_delimiter>"){
                methodDecl++;
                dataTypeDecl=0;
            }
            else if(methodDecl == 5){
                if(token == "<data_type>"){
                    methodDecl++;
                }
                else if(token == "<right_parenthesis_delimiter>"){
                    methodDecl = 8;
                }
                else printError("Expected <data_type> or <right_parenthesis_delimiter>, got " + token, line);
            }
            else if(methodDecl == 6){
                if(token == "<identifier>"){
                    methodDecl++;
                }
                else printError("Expected <identifier>, got " + token, line);
            }
            else if(methodDecl == 7){
                if(token == "<right_parenthesis_delimiter>"){
                    methodDecl = 8;
                    insideMethod = false;
                }
                else printError("Expected <identifier>, got " + token, line);
            }
            else if(methodDecl == 8){
                if(token == "<left_brace_delimiter>"){
                    methodDecl = 9;
                    insideMethod = true;
                    lbrace_ctr++;
                }
                else printError("Expected <left_brace_delimiter>, got " + token, line);
            }

            else if(methodDecl == 9 && token == "<right_brace_delimiter>"){
                methodDecl = 0;
                rbrace_ctr++;
                continue;
            }




            //check variable declaration syntax
            else if(dataTypeDecl == 1 || token == "<data_type>"){
                if(token == "<data_type>"){
                    dataTypeDecl=3;
                }
                else printError("Expected <data_type>, got " + token, line);
            }
            else if(dataTypeDecl == 3){
                if(token == "<identifier>"){
                    dataTypeDecl++;
                    methodDecl = 4;
                }
                else printError("Expected <identifier>, got " + token, line);
            }
            else if(dataTypeDecl == 4){
                if(token == "<assignment_operator>"){
                    dataTypeDecl++;
                }
                else if(token == "<semicolon_delimiter>"){
                    dataTypeDecl=0;
                    methodDecl=0;
                }
                else printError("Expected <assignment_operator> or <semicolon_delimiter>, got " + token, line);
            }
            else if(dataTypeDecl == 5){
                if(token == "<value>" || token == "<identifier>"){
                    dataTypeDecl=6;
                }
                else printError("Expected <value>, got " + token, line);
                
            }
            else if(dataTypeDecl == 6){
                if(token == "<arithmetic_operator>"){
                    dataTypeDecl--;
                }
                else if(token == "<semicolon_delimiter>"){
                    dataTypeDecl=0;
                    methodDecl=0;
                    semicolonCtr++;
                }
                else printError("Expected <arithmetic_operator> or <semicolon_delimiter>, got " + token, line);
            }
          }


          

          if (classChk == false){
            print2("Syntax Error: Expected class declaration.");
            break;
          } 

          if(classDecl == 4 && token == "<right_brace_delimiter>" && methodDecl == 0){
            classDecl == 0;
            rbrace_ctr++;
            continue;
          }

          if(token == "<semicolon_delimiter>"){
            semicolonAll++;
          }

          
        }

        

    }   







    if(errorChk == true){
        print2(errorTemp);
        errorTemp = "";
        errorChk=false;
    }
    else if(lbrace_ctr > rbrace_ctr){
        print2("Syntax Error: Missing '}' at the end of the program.")
    }
    else if(semicolonAll > semicolonCtr){
        print2("Extra <semicolon_delimiter> at the end of the statement.");
    }
    else if(lbrace_ctr < rbrace_ctr){
        print2("Syntax Error: Extra '}' at the end of the program.")
    }
    else if(methodDecl != 0){
        print2("Syntax Error: Expected method declaration.")
    }
    else if(classDecl != 4){
        print2("Syntax Error: Expected class declaration.")
    }
    else if(dataTypeDecl != 0){
        print2("Syntax Error: Variable declaration is incomplete.")
    }
    else if(varChange !=0){
        print2("Syntax Error: Variable initialization is incomplete.")
    }
    else print2("Syntax is Correct!");
    
    if(document.getElementById("output").innerHTML == "Syntax is Correct!"){
        print2("Syntax is Correct!");
        document.getElementById("semantic").disabled = false;
        document.getElementById("syntax").style.backgroundColor = "#32CD32";
        document.getElementById("syntax").style.color = black;
    }
    else{
        document.getElementById("syntax").disabled = true;
        document.getElementById("syntax").style.backgroundColor = "#dc3545";
        document.getElementById("syntax").style.color = white;
    }

    // if(errorChk==true){
    //     document.getElementById("syntax").disabled = true;
    //     document.getElementById("syntax").style.backgroundColor = "#dc3545";
    //     document.getElementById("syntax").style.color = white;
    // }
    // else{
    //     print2("Syntax is Correct!");
    //     document.getElementById("semantic").disabled = false;
    //     document.getElementById("syntax").style.backgroundColor = "#32CD32";
    //     document.getElementById("syntax").style.color = black;
    // }
    
    // errorChk=false;
}

function printError(errorMsg,lineAt){
    errorChk = true;
    errorTemp += "Syntax Error:\n" + errorMsg + "\nat line " + (lineAt+1);
    errorTemp += "\n\n";
    
}

function print2(s){
    document.getElementById("output").innerHTML = s;
    document.getElementById("output").scrollTop = document.getElementById("output").scrollHeight;
    
    
    // else if(unknownCtr == 0 && s != ""){
    //     document.getElementById("syntax").disabled = false;
    //     document.getElementById("lexical").style.backgroundColor = "#32CD32";
    //     document.getElementById("lexical").style.color = black;
    // }
    
}