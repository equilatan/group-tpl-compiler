
function syntax(){

    // var outputTemp = ""; 
    // var ctr = 1;
    

    // let rbrace_ctr = 0;
    // let lbrace_ctr = 0;

    // for(let i = 0 ; i < tokenDictGlobal.length ; i++){

    //     let currentToken = tokenDictGlobal[i];

    //     if(currentToken == "<left_brace_delimiter>") lbrace_ctr++;
    //     else if(currentToken == "<right_brace_delimiter>") rbrace_ctr++;

    // }

    // if(lbrace_ctr != rbrace_ctr){

    //     if(lbrace_ctr > rbrace_ctr)
    //         print("Syntax Error: Missing '{' at the end of the statement.");
    //     else
    //         print("Syntax Error: Extra '}' at the end of the statement.")
    // }
    outTemp = "";
    for(lol in tokenDictGlobal){
        outTemp += (tokenDictGlobal[lol] + "\n");
    }
    print2(outTemp);
    
        
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