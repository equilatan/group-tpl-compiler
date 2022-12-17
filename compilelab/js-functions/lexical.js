// var inputArr = {}; //global variables for tokens/lexemes

var keywords;
var operators;
var delimiters;

             

function print(s){
    //document.getElementById("output").textContent += s;
    document.getElementById("output").innerHTML = s;
    document.getElementById("output").scrollTop = document.getElementById("output").scrollHeight;

    if(s != ""){
        document.getElementById("syntax").disabled = false;
        document.getElementById("lexical").style.backgroundColor = "#32CD32";
        document.getElementById("lexical").style.color = black;

    }
    
}

function getExpression(){
    var s = inputEditor.getValue();

    // Split the string into an array of lines
    let lines = s.split("\n");
    //remove empty strings
    lines = lines.filter(e => e); 
    // Iterate over the lines and remove leading and trailing whitespace
    let trimmedLines = lines.map(line => line.trim());

    // Join the trimmed lines back into a single string
    let result = trimmedLines.join("");

    return result;
  }
 

function initTokens(){
    keywords = {
        access_modifiers: ["public", "private", "protected"],
        static_modifier: ["static"],
        classes: ["class"],
        data_types: ["int", "float", "double", "boolean", "char", "String", "void"],
        loops: ["while", "for", "do-while"],
        objects: ["System", "out", "println"],
        booleans: ["true", "false"],
        references: ["this"],
        control_structures: ["if", "else", "switch", "case", "default"],
        exceptions: ["try", "catch", "finally", "throw"],
        arrays: ["int[]", "float[]", "double[]", "boolean[]", "char[]", "String[]"]
      };
      operators = {
        arithmetic: ["+", "-", "*", "/", "%"],
        assignment: ["="],
        arit_assignment: ["+=", "-=", "*=", "/=", "%="],
        comparison: ["==", "!=", ">", "<", ">=", "<="],
        logical: ["&&", "||", "!"],
        conditional: ["?:"],
        incDcr: ["++", "--"]
      };
      delimiters = {
        lparen: ["("],
        rparen: [")"],
        lbracket: ["["],
        rbracket: ["]"],
        lbrace: ["{"],
        rbrace: ["}"],
        comma: [","],
        semicolon: [";"],
        //dotDelim: ["."],
        comments: ["//", "/*", "*/"]
      };     
}


var lexemeDictGlobal = {};
var tokenDictGlobal = {};



function lexical(){

    lexemeDictGlobal = {};
    tokenDictGlobal = {};
    var s = inputEditor.getValue();
    
    let lines = s.split("\n");
    let trimmedLines = lines.map(line => line.trim());

    outTemp = "";

    let lexemes = {};
    let tokens = {};
    for(let i = 0 ; i < trimmedLines.length ; i++){
        
        lexemes[i] = lexical2(trimmedLines[i]).filter(str => str !== "");
        tokens[i] = getTokens2(lexemes[i]).filter(str => str !== "");
    
         //outTemp += ("The line is " + (i+1) + "\n" + lexemes[i] + "\n" + tokens[i] + "\n\n\n");
         for(let j = 0; j < lexemes[i].length ; j++){
            outTemp += ("(" + (i+1) + ") >>> " + lexemes[i][j] + " >>> " + tokens[i][j] + "\n");
         }
         
    }
    // something wrong with lexemes
    lexemeDictGlobal = lexemes;
    tokenDictGlobal = tokens;

    outTemp += "\n  There are " + unknownCtr + " unknown tokens found in the program."; 
    unknownCtr = 0;
    print(outTemp);
}  

function lexical2(expressions){

    initTokens();
 
    let tokens = [];

    let currentToken = "";
    let inString = false;

    let keywordsArray = [];
    
    for (const key in keywords) {
        keywordsArray.push(...keywords[key]);
    }

    let arithmeticArray = [];
    arithmeticArray = operators.arithmetic;

    let comparisonArray = [];
    comparisonArray = operators.comparison;

    let operatorsArray = [];
    for (const key in operators) {
        operatorsArray.push(...operators[key]);
    }

    let delimitersArray = [];
    for (const key in delimiters) {
        delimitersArray.push(...delimiters[key]);
    }
    let symbols = currentToken.match(/[^a-zA-Z0-9 ]/g);
    for (let i = 0; i < expressions.length; i++) {

        let char = expressions.charAt(i);

        if (char === "\"" && !inString) {
            // Start of string
            inString = true;
            currentToken += char;
        } else if (char === "\"" && inString) {
            // End of string
            inString = false;
            currentToken += char;
            tokens.push(currentToken);
            currentToken = "";
        } 
        else if(char == "'" && expressions.charAt(i+2) == "'"){
            currentToken += expressions.charAt(i+1);
            tokens.push("'" + currentToken + "'" );
            currentToken = "";
            i+=2;
            continue;
        }
        else if(expressions.charAt(i+1) == "[" && expressions.charAt(i+2) == "]"){
            currentToken += char;
            tokens.push(currentToken + "[" +  "]");
            currentToken = "";
            i+=2;
            continue;
        }
        else if (arithmeticArray.includes(char) && !inString) {
            // Operator

            if(expressions.charAt(i+1) == "="){
                //tokens.push(char + "=");
                if (currentToken) {
                    tokens.push(currentToken);
                }
                aritTemp = char;
                i++;
                char += expressions.charAt(i);
                tokens.push(char);
                currentToken = "";

            }
            else{
                if (currentToken) {
                    tokens.push(currentToken);
                }
                tokens.push(char);
                currentToken = "";
            }
            
        } 
        else if ((char == "<" || char == ">" || char == "=" || char == "!") && !inString) {
            // Operator

            if(expressions.charAt(i+1) == "="){
                //tokens.push(char + "=");
                if (currentToken) {
                    tokens.push(currentToken);
                }
                aritTemp = char;
                i++;
                char += expressions.charAt(i);
                tokens.push(char);
                currentToken = "";

            }
            else{
                if (currentToken) {
                    tokens.push(currentToken);
                }
                tokens.push(char);
                currentToken = "";
            }
            
        }
        else if(operatorsArray.includes(char) && !inString) {
            // Delimiter
            if (currentToken) {
                tokens.push(currentToken);
            }
            tokens.push(char);
            currentToken = "";
        } else if(delimitersArray.includes(char) && !inString) {
            // Delimiter
            if (currentToken) {
                tokens.push(currentToken);
            }
            tokens.push(char);
            currentToken = "";
        } else if (keywordsArray.includes(currentToken + char) && !inString) {
            // Keyword
            currentToken += char;
            
            tokens.push(currentToken);
            currentToken = "";
        }
        
        else if(/^[^a-zA-Z0-9\.]+$/.test(char) && !inString){
            currentToken += char;
            tokens.push(currentToken);
            currentToken = "";
        }
        else if(char === " " && !inString && /^[a-zA-Z0-9 ]+$/.test(currentToken)){
            currentToken += char;
            tokens.push(currentToken);
            currentToken = "";
        }
        else {
            // Part of a token
            currentToken += char;
        }
    }


    if (currentToken) {
        tokens.push(currentToken);
    }

    let noWhitespace = tokens.map(str => str.trim());
    // let noEmpty = noWhitespace.filter(str => str.trim() != "");

    return noWhitespace;

}



let initChk=false;
function getTokens2(lexemeArr){
    // Create a new object
    let lexemeDict = {};
    let ctr=0;
    let tempOutput = "";
    let temp;

   initChk=false;
    
    let tempArr = [];
    // Loop through the lexemes in the trimmed2 array
    for (let lexeme of lexemeArr) {
    
    // for keywords
    if (keywords.access_modifiers.includes(lexeme))
        temp = "<access_modifier>";
    else if (keywords.static_modifier.includes(lexeme))
        temp = "<static_modifier>";
    else if (keywords.classes.includes(lexeme))
        temp = "<class>";
    else if (keywords.data_types.includes(lexeme))
        temp = "<data_type>";
    else if (keywords.loops.includes(lexeme))
        temp = "<loop>";
    else if (keywords.objects.includes(lexeme))
        temp = "<object>";
    else if (keywords.booleans.includes(lexeme))
        temp = "<boolean>";
    else if (keywords.references.includes(lexeme))
        temp = "<reference>";
    else if (keywords.control_structures.includes(lexeme))
        temp = "<control_structure>";
    else if (keywords.exceptions.includes(lexeme))
        temp = "<exception>";
    else if (keywords.arrays.includes(lexeme))
        temp = "<data_type>";
            
    //for operators
    else if (operators.arithmetic.includes(lexeme)){
        temp = "<arithmetic_operator>";
        initChk=true;
    }
    else if (operators.assignment.includes(lexeme)){
        temp = "<assignment_operator>";
        initChk=true;
    }
    else if (operators.arit_assignment.includes(lexeme)){
        temp = "<arithmetic_assignment_operator>";
        initChk=true;
    }
        
    else if (operators.comparison.includes(lexeme))
        temp = "<comparison_operator>";
    else if (operators.logical.includes(lexeme))
        temp = "<logical_operator>";
    else if (operators.conditional.includes(lexeme))
        temp = "<conditional_operator>";
    else if (operators.incDcr.includes(lexeme))
        temp = "<increment_decrement_operator>";

    //for delimiters
    else if (delimiters.lparen.includes(lexeme))
        temp = "<left_parenthesis_delimiter>";
    else if (delimiters.rparen.includes(lexeme))
        temp = "<right_parenthesis_delimiter>";
    else if (delimiters.lbracket.includes(lexeme))
        temp = "<left_bracket_delimiter>";
    else if (delimiters.rbracket.includes(lexeme))
        temp = "<right_bracket_delimiter>";
    else if (delimiters.lbrace.includes(lexeme))
        temp = "<left_brace_delimiter>";
    else if (delimiters.rbrace.includes(lexeme))
        temp = "<right_brace_delimiter>";
    else if (delimiters.comma.includes(lexeme))
        temp = "<comma_delimiter>";
    else if (delimiters.semicolon.includes(lexeme)){
        temp = "<semicolon_delimiter>";
        initChk = false;
    }
        
    else if (delimiters.comments.includes(lexeme))
        temp = "<comment>";
    // else if (delimiters.dotDelim.includes(lexeme))
    //     temp = "<dot_delimiter>";


    else if(lexeme.includes('"') || (initChk == true && /^[0-9]+(\.[0-9]+)?$/.test(lexeme)) || /^[^']*'[^']*'[^']*$/.test(lexeme))
        temp = "<value>";
    else if(/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(lexeme)){
        temp = "<identifier>";
    }
    else{
        temp = "<unknown_token>";
        unknownCtr++;
    }
    
    
    // store temp value to the key
    lexemeDict[lexeme] = temp;

    // inputArr[ctr] = lexemeDict;  
    ctr++;
    //tempOutput += ("(" + ctr + ") >>> " + lexeme + " >>> " + lexemeDict[lexeme] + "\n");

    tempOutput += lexemeDict[lexeme] + "&&&";
    //lexemeDictGlobal[ctr-1] = lexeme;
    //tokenDictGlobal[ctr-1] = lexemeDict[lexeme];
    
    }
    
    tempArr = tempOutput.split("&&&");
    //print(tempArr);
    return tempArr;
}

var unknownCtr = 0;