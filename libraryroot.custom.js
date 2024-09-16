// Function to round min-width for each element with the class PP7LM0Ow1K5qkR8WElLpt
function adjustDropdownMinWidth(dropdown) {
    // Get the current min-width style
    const minWidth = window.getComputedStyle(dropdown).getPropertyValue('min-width');
    
    if (minWidth) {
        // Parse the min-width to a float value and round it up
        const parsedMinWidth = parseFloat(minWidth);
        const roundedMinWidth = Math.ceil(parsedMinWidth);

        // Only adjust if the rounded value is different
        if (roundedMinWidth !== parsedMinWidth) {
            // Set the new rounded min-width
            dropdown.style.minWidth = `${roundedMinWidth}px`;

            console.log(`Adjusted min-width from ${parsedMinWidth}px to ${roundedMinWidth}px for element:`, dropdown);
        }
    }
}

// Function to observe changes in dropdown visibility
function observeDropdowns() {
    const observer = new MutationObserver((mutationsList) => {
        mutationsList.forEach((mutation) => {
            // Check if a new dropdown was added or made visible
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1 && node.classList.contains('PP7LM0Ow1K5qkR8WElLpt')) {
                    console.log('Detected new dropdown:', node);
                    adjustDropdownMinWidth(node);
                }
            });

            // If attributes like visibility change (dropdown opening/closing), handle those
            if (mutation.type === 'attributes' && mutation.target.classList.contains('PP7LM0Ow1K5qkR8WElLpt')) {
                console.log('Dropdown visibility or attributes changed:', mutation.target);
                adjustDropdownMinWidth(mutation.target);
            }
        });
    });

    // Start observing the document body for changes to child elements and attributes
    observer.observe(document.body, {
        childList: true,    // Watch for new dropdowns added to the DOM
        subtree: true,      // Watch all descendants of body
        attributes: true,   // Watch for attribute changes like visibility or style
        attributeFilter: ['style', 'class']  // Only watch for style and class changes
    });

    console.log('Started observing dropdown activations.');
}

// Start observing dropdown activations and adjustments
observeDropdowns();
