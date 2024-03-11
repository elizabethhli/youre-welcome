function renderHTML() {
    // var html = document.querySelector('#editor textarea').value;
    // console.log(html)
    // html = html.replace(/›/g, '>').replace(/‹/g, '<');
    // var outputFrame = document.getElementById('output');
    // outputFrame.srcdoc = html;

    // lintHTML(html);
    // var testString = "‹p›";
    // testString = testString.replace(/›/g, ">").replace(/‹/g, "<");
    // console.log(testString); // Should output "<p>"
    var html = editor.getValue();
    html = html.replace(/›/g, ">").replace(/‹/g, "<");
    // ‹p›hello‹p›
    // console.log(html)
    var outputFrame = document.getElementById('output');
    outputFrame.srcdoc = html;

    lintHTML(html);
}

function lintHTML(html) {
    var rules = HTMLHint.HTMLHint.defaultRuleset;
    // rules['doctype-first'] = false;

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
    // editor.session.clearAnnotations();
    
    editor.session.setAnnotations(annotations);
}
