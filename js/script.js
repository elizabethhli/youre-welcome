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

    outputFrame.onload = function() {
        bindAnchorClicks(outputFrame);
    };

    // outputFrame.onload = function() {
    //     var iframeDocument = outputFrame.contentDocument || outputFrame.contentWindow.document;

    //     // Intercept click events on all anchor tags inside the iframe
    //     var anchors = iframeDocument.querySelectorAll('a');
    //     anchors.forEach(function(anchor) {
    //         anchor.addEventListener('click', function(event) {
    //             event.preventDefault(); // Prevent the default anchor behavior
    //             var targetId = anchor.getAttribute('href').slice(1); // Get the ID without the '#' character
    //             var targetElement = iframeDocument.getElementById(targetId);

    //             if (targetElement) {
    //                 targetElement.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the element
    //             }
    //         });
    //     });
    // };
}


function bindAnchorClicks(frame) {
    // Get all anchor tags in the iframe document
    var anchors = frame.contentDocument.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default anchor handling
            var targetId = anchor.getAttribute('href').substring(1); // Get the ID, removing '#'
            var targetElement = frame.contentDocument.getElementById(targetId);
            if (targetElement) {
                // Scroll to the target element within the iframe
                targetElement.scrollIntoView();
                // Update the hash in the iframe's URL
                frame.contentWindow.location.hash = targetId;
            }
        });
    });
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
