// script_JSON.js
var editor = ace.edit("editor");
editor.session.setMode("ace/mode/json");
editor.setOptions({
    useWorker: false,
    showLineNumbers: true,
    showGutter: true
});

function lintJSON() {
    try {
        var rawData = editor.getValue(); // Get JSON data from editor
        var data = JSON.parse(rawData); // Parse JSON to validate
        var formattedJSON = JSON.stringify(data, null, 4); // Reformat JSON with 4-space indentation
        editor.setValue(formattedJSON, -1); // Set formatted JSON back to editor, -1 moves cursor to the start
        document.getElementById('output').innerHTML = '<div class="alert alert-success" role="alert">Valid JSON! Formatted successfully.</div>';
    } catch (error) {
        document.getElementById('output').innerHTML = '<div class="alert alert-danger" role="alert">Invalid JSON: ' + error.message + '</div>';
    }
}


