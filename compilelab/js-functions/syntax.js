
function syntax(){

    var outputTemp = "";
    let currentLine = 0;
    let rbrace_ctr = 0;
    let lbrace_ctr = 0;
    outTemp="";
    errorChk = false;

    var length = Object.keys(tokenDictGlobal).length;
   
    for(let i = 0 ; i < length ; i++){

        currentLine = (i+1);
        // outTemp += currentLine;
        for(let j = 0 ; j < tokenDictGlobal[i].length ; j++){

            let currentToken = tokenDictGlobal[i][j];
            if(currentToken == "<left_brace_delimiter>"){
                lbrace_ctr++;
            } 
            else if(currentToken == "<right_brace_delimiter>"){
                rbrace_ctr++;

                if(rbrace_ctr > lbrace_ctr){
                    errorChk = true;
                    print2("Syntax Error: Extra '}' at the end of the statement." + "\nat line " + currentLine)
                }
            } 
        }
        
        if(errorChk == false)
            print2("Syntax is Correct!");


    }


    // outTemp = "";
    // for(lol in tokenDictGlobal){
    //     outTemp += (tokenDictGlobal[lol] + "\n");
    // }
    // print2(outTemp);
    
        
}




function print2(s){
    //document.getElementById("output").textContent += s;
    document.getElementById("output").innerHTML = s;
    document.getElementById("output").scrollTop = document.getElementById("output").scrollHeight;

    // if(s != ""){
    //     document.getElementById("syntax").disabled = false;
    //     document.getElementById("lexical").style.backgroundColor = "#32CD32";
    //     document.getElementById("lexical").style.color = black;

    // }
    
}