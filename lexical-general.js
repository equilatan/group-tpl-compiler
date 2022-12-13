function lexical2(){

    const expInput = inputEditor.getValue();
    let expressions = expInput.replace(/\n/g, "");

    let keywords = {
        access_modifiers: ["public", "private", "protected"],
        classes: ["class"],
        data_types: ["int", "float", "double", "boolean", "char", "String"],
        loops: ["while", "for", "do-while"],
        objects: ["System", "out", "println"],
        booleans: ["true", "false"],
        references: ["this"],
        control_structures: ["if", "else", "switch", "case", "default"],
        exceptions: ["try", "catch", "finally", "throw"],
        arrays: ["int[]", "float[]", "double[]", "boolean[]", "char[]", "String[]"]
      };
      let operators = {
        arithmetic: ["+", "-", "*", "/", "%"],
        assignment: ["=", "+=", "-=", "*=", "/=", "%=", "<<=", ">>=", ">>>=", "&=", "^=", "|="],
        bitwise: ["~", "<<", ">>", ">>>", "&", "^", "|"],
        comparison: ["==", "!=", ">", "<", ">=", "<="],
        logical: ["&&", "||", "!"],
        conditional: ["?:"],
        miscellaneous: ["instanceof", "new", "++", "--"]
      };
      let delimiters = {
        grouping: ["(", ")", "[", "]"],
        lbrace: ["{"],
        rbrace: ["}"],
        comma: [","],
        semicolon: [";"],
        comments: ["//", "/*", "*/"]
      };      
    let tokens = [];

    let currentToken = "";
    let inString = false;

    let keywordsArray = [];
    
    for (const key in keywords) {
        keywordsArray.push(...keywords[key]);
    }

    let operatorsArray = [];
    for (const key in operators) {
        operatorsArray.push(...operators[key]);
    }

    let delimitersArray = [];
    for (const key in delimiters) {
        delimitersArray.push(...delimiters[key]);
    }

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
        
        else if (operatorsArray.includes(char) && !inString) {
            // Operator
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
        } else {
            // Part of a token
            currentToken += char;
        }
    }


    if (currentToken) {
        tokens.push(currentToken);
    }

    let noWhitespace = tokens.map(str => str.trim());
    let noEmpty = noWhitespace.filter(str => str.trim() != "");

    // Create a new object
    let lexemeDict = {};
    let ctr=0;
    // Loop through the lexemes in the trimmed2 array
    for (let lexeme of noEmpty) {
    
    // Check if the lexeme is a keyword, operator, or delimiter
    // and add it to the object with its corresponding token type
    if (keywords.access_modifiers.includes(lexeme)) {
        lexemeDict[lexeme] = "<access_modifier>";
    } else if (keywords.data_types.includes(lexeme)) {
        lexemeDict[lexeme] = "<data_type>";
    } else if (operators.arithmetic.includes(lexeme)) {
        lexemeDict[lexeme] = "<arithmetic_operator>";
    } else if (delimiters.grouping.includes(lexeme)) {
        lexemeDict[lexeme] = "<grouping_delimiter>";
    } else if(delimiters.semicolon.includes(lexeme)){
        lexemeDict[lexeme] = "<semicolon_delimiter>";
    }else if (delimiters.lbrace.includes(lexeme)) {
        lexemeDict[lexeme] = "<left_brace_delimiter>";
    } else if (delimiters.rbrace.includes(lexeme)) {
        lexemeDict[lexeme] = "<right_brace_delimiter>";
    }



    ctr++;
    print(ctr + ">>> " + lexeme + " >>> " + lexemeDict[lexeme] + "\n");
    }



    print(trimmed2.join("<< token" + "\n"));
   
}

function print(s){
    document.getElementById("output").textContent += s;
}



