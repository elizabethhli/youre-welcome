// script_JSONL.js
var editor = ace.edit("editor");
editor.session.setMode("ace/mode/json");
editor.setOptions({
    useWorker: false,
    showLineNumbers: true,
    showGutter: true
});

function lintJSONL() {
    try {
        var rawData = editor.getValue(); // Get JSONL data from editor
        var lines = rawData.trim().split("\n"); // Split the input into lines
        var validJSONLines = [];
        lines.forEach(line => {
            var data = JSON.parse(line); // Parse each line to validate JSONL
            validJSONLines.push(JSON.stringify(data)); // Add valid JSONL line back to array
        });
        var formattedJSONL = validJSONLines.join("\n"); // Combine valid JSONL lines, separated by newlines
        editor.setValue(formattedJSONL, -1); // Set formatted JSONL back to editor, -1 moves cursor to the start
        document.getElementById('output').innerHTML = '<div class="alert alert-success" role="alert">Valid JSONL! Formatted successfully.</div>';
    } catch (error) {
        document.getElementById('output').innerHTML = '<div class="alert alert-danger" role="alert">Invalid JSONL: ' + error.message + '</div>';
    }
}
