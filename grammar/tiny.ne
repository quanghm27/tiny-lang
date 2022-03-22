@{%
const myLexer = require("../lexer");
%}

@lexer myLexer

program
    -> _ml program_statements _ml
        {% data => data[1] %}

program_statements
    ->  program_statement (__lb_ program_statement):*
        {%
            (data) => {
                const repeated = data[1];
                const restStatements = repeated.map(chunks => chunks[1]);
                return [data[0], ...restStatements];
            }
        %}

program_statement
    -> formula_definition  {% id %}
    | formula_evaluation   {% id %}

formula_definition
    -> "form" __ %identifier _ "(" _ parameter_list _ ")" _ formula_body
    {%
        (data) => {
            return {
                type: "formula_definition",
                name: data[2],
                parameters: data[6],
                body: data[10]
            }
        }
    %}

parameter_list
    -> null        
        {% () => [] %}
    | expression   
        {% d => [d[0]] %}
    | expression _ "," _ parameter_list
        {%
            d => [d[0], ...d[4]]
        %}

formula_body
    -> "{" executable_statements "}"
    {%
        (data) => {
            return {
                type: "code_block",
                statements: data[1],
            }
        }
    %}

executable_statements
    -> _
        {% () => [] %}
    |  _ "\n" executable_statements
        {% (d) => d[2] %}
    |  _ executable_statement _
        {% d => [d[1]] %}
    |  _ executable_statement _ "\n" executable_statements
        {%
            d => [d[1], ...d[4]]
        %}

executable_statement
    -> var_assign            {% id %}
    # | formula_evaluation     {% id %}
    |  %comment              {% id %}
    | return_statement       {% id %}

var_assign
    -> %identifier _ "=" _ expression
        {%
            (data) => {
                return {
                    type: "var_assign",
                    var_name: data[0],
                    value: data[4]
                }
            }
        %}

expression
    -> unary_expression      {% id %}
    |  formula_evaluation    {% id %}
    |  binary_expression     {% id %}

unary_expression
    -> %string               {% id %}
    |  %number               {% id %}
    |  %identifier           {% id %}
    |  paren_expression      {% id %}

formula_evaluation
    -> %identifier _ "(" _ parameter_list _ ")"
        {%
            (data) => {
                return {
                    type: "formula_evaluation",
                    name: data[0],
                    arguments: data[4]
                }
            }
        %}

return_statement
    -> "return" __ expression
        {%
            (data) => {
                return {
                    type: "return_statement",
                    value: data[2]
                }
            }
        %}

binary_expression
    ->  unary_expression _ operator _ expression
        {%
            (data) => {
                return {
                    type: "binary_expression",
                    operator: data[2],
                    left: data[0],
                    right: data[4],
                }
            }
        %}

operator
    -> "+" {% id %}
    |  "-" {% id %}
    |  "*" {% id %}
    |  "/" {% id %}

paren_expression
    -> "(" _ binary_expression _ ")"
        {%
            (data) => {
                return {
                    type: "paren_expression",
                    value: data[2]
                }
            }
        %}

# Mandatory line-break with optional whitespace around it
__lb_ -> (_ %NL):+ _

# Optional multi-line whitespace
_ml -> (%WS | %NL):*

# Mandatory multi-line whitespace
__ml -> (%WS | %NL):+

# Optional whitespace    
_ -> %WS:*

# Mandatory whitespace
__ -> %WS:+