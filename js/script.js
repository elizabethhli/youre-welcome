function renderHTML() {
    var html = editor.getValue();
    html = html.replace(/›/g, ">").replace(/‹/g, "<");

    var outputFrame = document.getElementById('output');
    outputFrame.srcdoc = html;

    lintHTML(html);
}

function lintHTML(html) {
    var rules = HTMLHint.HTMLHint.defaultRuleset;

    var errors = HTMLHint.HTMLHint.verify(html, rules);

    var annotations = [];

    errors.forEach(function(error) {
        var type = "error";
        if (error.rule.id === 'doctype-first') {
            type = "warning"; // Set the type to "warning" for 'doctype-first' errors
        }
        annotations.push({
            row: error.line - 1,
            column: error.col - 1,
            text: error.message,
            type: type
        });
    });
    
    editor.session.setAnnotations(annotations);
}
