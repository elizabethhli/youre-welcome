var editor = ace.edit("editor");
// editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/html");
editor.setOptions({
    useWorker: false,
    showLineNumbers: true,
    showGutter: true
});

editor.session.on('change', function() {
    renderHTML();
});

function renderHTML() {
    // var html = editor.getValue();
    // html = html.replace(/›/g, ">").replace(/‹/g, "<");

    // // Inject a script into the HTML that prevents hash links from navigating.
    // var script = `<script>
    //     document.addEventListener('DOMContentLoaded', function() {
    //         document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    //             anchor.addEventListener('click', function(e) {
    //                 e.preventDefault();
    //                 // Optional: Implement custom behavior here, such as scrolling to a target element.
    //             });
    //         });
    //     });
    //     </script>`;
    
    // // Append the script to the HTML content
    // html += script;

    // var outputFrame = document.getElementById('output');
    // outputFrame.srcdoc = html;

    // lintHTML(html);
    var html = editor.getValue();
    html = html.replace(/›/g, ">").replace(/‹/g, "<");

    // Enhanced script injection for in-document navigation
    var script = `<script>
        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
                anchor.addEventListener('click', function(e) {
                    var href = this.getAttribute('href');
                    // Check if the href is not just '#' (which would mean top of the page)
                    if (href.length > 1) {
                        // Prevent the default anchor link behavior
                        e.preventDefault();
                        // Navigate to the specific element within the iframe content
                        var targetElement = document.querySelector(href);
                        if (targetElement) {
                            // Scroll to the target element smoothly
                            targetElement.scrollIntoView({block: 'start'});
                        }
                    } else {
                        e.preventDefault();
                    }
                });
            });
        });
        </script>`;

    // Append the script to the HTML content
    html += script;

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
