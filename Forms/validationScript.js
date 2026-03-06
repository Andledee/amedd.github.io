// JavaScript code for form validation

// Retrieve the form and input field elements from the DOM using their IDs. 
// Used const to declare these variables since they will not be reassigned later in the code.
const form = document.getElementById('myForm');
const inputField = document.getElementById('inputField');

// Add an event listener to the form for the submit event
form.addEventListener('submit', function(event) { // Use an anonymous function as the event handler for the submit event

    // Prevent the form from submitting by default
    event.preventDefault();

    // Retrieve the input field value so that it can be validated against the regular expression pattern.
    const inputValue = inputField.value;

    // Regular expression pattern for alphanumeric input only (letters and numbers, no spaces or special characters)
    const pattern = /^[a-zA-Z0-9]+$/;

    // Check if the input value matches the pattern
    if (pattern.test(inputValue)) {
        // Valid input: display confirmation message
        alert('Success! Your input "' + inputValue + '" is valid. Form submitted.');
    } else {
        // Invalid input: display error message and do not submit
        alert('Error: Input must contain only letters and numbers (no spaces or special characters).');
        inputField.value = ''; // Clear the input field for the user to try again
        inputField.focus(); // Set focus back to the input field for user convenience
    }
});