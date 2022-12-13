

function syntax_declaration(){
    
    let i = 0;
    let pattern_1 = ['<data_type>','<identifier>','<delimiter>'];
    let pattern_2 = ['<data_type>','<identifier>','<assignment_operator>','<value>'];
    let pattern_3 = ['<value>', '<arithmetic_operator>'];
    let valueChk = '';
    let syntaxChk = true;
    if(!token_arr.includes("<delimiter>")){
        wrongSyntax("Error: Missing ';' at the end of the statement.");
    }
    else{
        for(let i = 0; token_arr[i]!="<delimiter>"; i++){

            if(!(token_arr[i] == pattern_1[i] || token_arr[i] == pattern_2[i] || token_arr[i] == valueChk)){
                wrongSyntax("Syntax Error!");
                syntaxChk = false;
                break;
            }

            if(token_arr[i] == "<value>"){
                valueChk = '<arithmetic_operator>';
            }
            else if(token_arr[i] == '<arithmetic_operator>'){
                valueChk = '<value>';
            }

        }
        if(syntaxChk==true){
            printSyntax("Syntax is Correct!"); 
            enableSemantic();
        } 

        }
    }
    
    


function wrongSyntax(s){
    
    document.getElementById("output").textContent = s;
    var button = document.getElementById('syntax');
    var sembutton = document.getElementById('semantic');
    button.disabled = true;
    sembutton.disabled = true;
}

function printSyntax(s){
    document.getElementById("output").textContent = s;
}

function enableSemantic(){

    var button = document.getElementById('semantic');
    var lexbutton = document.getElementById('syntax');
    button.disabled = false;
    lexbutton.style.backgroundColor = "#5cb85c"; //#5cb85c for green // #d9534f for red
    lexbutton.style.color = "black";
    
}
