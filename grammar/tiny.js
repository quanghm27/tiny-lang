// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const myLexer = require("../lexer");
var grammar = {
    Lexer: myLexer,
    ParserRules: [
    {"name": "program", "symbols": ["_ml", "program_statements", "_ml"], "postprocess": data => data[1]},
    {"name": "program_statements$ebnf$1", "symbols": []},
    {"name": "program_statements$ebnf$1$subexpression$1", "symbols": ["__lb_", "program_statement"]},
    {"name": "program_statements$ebnf$1", "symbols": ["program_statements$ebnf$1", "program_statements$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "program_statements", "symbols": ["program_statement", "program_statements$ebnf$1"], "postprocess": 
        (data) => {
            const repeated = data[1];
            const restStatements = repeated.map(chunks => chunks[1]);
            return [data[0], ...restStatements];
        }
                },
    {"name": "program_statement", "symbols": ["formula_definition"], "postprocess": id},
    {"name": "program_statement", "symbols": ["formula_evaluation"], "postprocess": id},
    {"name": "formula_definition", "symbols": [{"literal":"form"}, "__", (myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"("}, "_", "parameter_list", "_", {"literal":")"}, "_", "formula_body"], "postprocess": 
        (data) => {
            return {
                type: "formula_definition",
                name: data[2],
                parameters: data[6],
                body: data[10]
            }
        }
            },
    {"name": "parameter_list", "symbols": [], "postprocess": () => []},
    {"name": "parameter_list", "symbols": ["expression"], "postprocess": d => [d[0]]},
    {"name": "parameter_list", "symbols": ["expression", "_", {"literal":","}, "_", "parameter_list"], "postprocess": 
        d => [d[0], ...d[4]]
                },
    {"name": "formula_body", "symbols": [{"literal":"{"}, "executable_statements", {"literal":"}"}], "postprocess": 
        (data) => {
            return {
                type: "code_block",
                statements: data[1],
            }
        }
            },
    {"name": "executable_statements", "symbols": ["_"], "postprocess": () => []},
    {"name": "executable_statements", "symbols": ["_", {"literal":"\n"}, "executable_statements"], "postprocess": (d) => d[2]},
    {"name": "executable_statements", "symbols": ["_", "executable_statement", "_"], "postprocess": d => [d[1]]},
    {"name": "executable_statements", "symbols": ["_", "executable_statement", "_", {"literal":"\n"}, "executable_statements"], "postprocess": 
        d => [d[1], ...d[4]]
                },
    {"name": "executable_statement", "symbols": ["var_assign"], "postprocess": id},
    {"name": "executable_statement", "symbols": [(myLexer.has("comment") ? {type: "comment"} : comment)], "postprocess": id},
    {"name": "executable_statement", "symbols": ["return_statement"], "postprocess": id},
    {"name": "var_assign", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"="}, "_", "expression"], "postprocess": 
        (data) => {
            return {
                type: "var_assign",
                var_name: data[0],
                value: data[4]
            }
        }
                },
    {"name": "expression", "symbols": ["unary_expression"], "postprocess": id},
    {"name": "expression", "symbols": ["formula_evaluation"], "postprocess": id},
    {"name": "expression", "symbols": ["binary_expression"], "postprocess": id},
    {"name": "unary_expression", "symbols": [(myLexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "unary_expression", "symbols": [(myLexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "unary_expression", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "unary_expression", "symbols": ["paren_expression"], "postprocess": id},
    {"name": "formula_evaluation", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"("}, "_", "parameter_list", "_", {"literal":")"}], "postprocess": 
        (data) => {
            return {
                type: "formula_evaluation",
                name: data[0],
                arguments: data[4]
            }
        }
                },
    {"name": "return_statement", "symbols": [{"literal":"return"}, "__", "expression"], "postprocess": 
        (data) => {
            return {
                type: "return_statement",
                value: data[2]
            }
        }
                },
    {"name": "binary_expression", "symbols": ["unary_expression", "_", "operator", "_", "expression"], "postprocess": 
        (data) => {
            return {
                type: "binary_expression",
                operator: data[2],
                left: data[0],
                right: data[4],
            }
        }
                },
    {"name": "operator", "symbols": [{"literal":"+"}], "postprocess": id},
    {"name": "operator", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "operator", "symbols": [{"literal":"*"}], "postprocess": id},
    {"name": "operator", "symbols": [{"literal":"/"}], "postprocess": id},
    {"name": "paren_expression", "symbols": [{"literal":"("}, "_", "binary_expression", "_", {"literal":")"}], "postprocess": 
        (data) => {
            return {
                type: "paren_expression",
                value: data[2]
            }
        }
                },
    {"name": "__lb_$ebnf$1$subexpression$1", "symbols": ["_", (myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__lb_$ebnf$1", "symbols": ["__lb_$ebnf$1$subexpression$1"]},
    {"name": "__lb_$ebnf$1$subexpression$2", "symbols": ["_", (myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__lb_$ebnf$1", "symbols": ["__lb_$ebnf$1", "__lb_$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__lb_", "symbols": ["__lb_$ebnf$1", "_"]},
    {"name": "_ml$ebnf$1", "symbols": []},
    {"name": "_ml$ebnf$1$subexpression$1", "symbols": [(myLexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "_ml$ebnf$1$subexpression$1", "symbols": [(myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "_ml$ebnf$1", "symbols": ["_ml$ebnf$1", "_ml$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_ml", "symbols": ["_ml$ebnf$1"]},
    {"name": "__ml$ebnf$1$subexpression$1", "symbols": [(myLexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__ml$ebnf$1$subexpression$1", "symbols": [(myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__ml$ebnf$1", "symbols": ["__ml$ebnf$1$subexpression$1"]},
    {"name": "__ml$ebnf$1$subexpression$2", "symbols": [(myLexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__ml$ebnf$1$subexpression$2", "symbols": [(myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__ml$ebnf$1", "symbols": ["__ml$ebnf$1", "__ml$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__ml", "symbols": ["__ml$ebnf$1"]},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (myLexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [(myLexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (myLexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
