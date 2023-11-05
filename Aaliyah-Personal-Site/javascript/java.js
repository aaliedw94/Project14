const body = document.querySelector('body'); //variable for selecting the body of the document
const modeSwitch = document.getElementById('mode'); //
const modeStat = document.querySelector('.mode-stat');
const myform = document.getElementById('contactForm');
const mySubButton = document.querySelector('.btn-secondary.submit');
const successMessage = document.getElementById('contact-successful');

function LightDarkSwitch() { //function to switch from light to dark mode
    body.classList.toggle('dark-mode');

    //Checking if the toggle is in light mode or dark mode
    const modeMessage = body.classList.contains('dark-mode') ?
    'Dark Mode' : "Light Mode"

    modeStat.innerText = modeMessage;

}

modeSwitch.addEventListener('click', LightDarkSwitch); //event listener for toggle switch

//function to use Intersection Observer for fade-slide-in effect
function addSlideIn(entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('slide-in');
        }
    });
}
//How far in the viewport to start the effect
const options = {
    threshold: 0.1
}
//creating an observer for the effect
const observer = new IntersectionObserver(addSlideIn, options);

//variables to select certain elements and/or classes
const par_items = document.querySelectorAll('.my_item');
//const myimg = document.querySelector('self-image')
const photo_card = document.querySelector('card');

//Adding observer to each item based on class or element
par_items.forEach(my_item => {
    observer.observe(my_item);
});
//I tried to create a seperate one to use for my photocards on my photos page and projects page.
photo_card.forEach(my_item => {
    observer.observe(my_item);
});

//observer.observe(photo_card);

//incoming code for form validation

const formElements = [...myform.elements ];

//attempting to check for invalid symbols for first and last name
function nonallowedSymbols(userinput) {
    const symbols = /[@\[\]\/&^%$#!*:;{}<>?~_+()]/;

    return symbols.test(userinput);
}

const good_inputs = () => {
    const valid = formElements.every((element) => {
      if (element.nodeName === 'SELECT') {
        return element.value !== 'Select a rating for your experience';
      } 
      else {
        return element.checkValidity();
      }
    })

    return valid;
}

const handleChange = () => {
    // Use the forEach() function to execute the provided function once for each element in the formElements array
    formElements.forEach((element) => {
      // If the element is invalid and is not a button, a select dropdown, a checkbox, or a radio button, style it with a red border and red text
      if (!element.checkValidity()
            && element.nodeName !== 'BUTTON'
            && element.nodeName !== 'SELECT'  
            && element.type !== 'radio'
      ) {
        element.style.borderColor = 'red'
        element.nextElementSibling.style.color = 'red'
        element.nextElementSibling.style.display = 'block'
        element.previousElementSibling.style.color = 'red'
      }
      //Checking that first and last name don't have certain symbols for input
      if (!element.checkValidity() && element.type === 'text') 
          
      {
          const firstname = document.getElementById('firstname').value;
          const lastname = document.getElementById('lastname').value;
          if (nonallowedSymbols(firstname) || nonallowedSymbols(lastname)) {
        element.style.borderColor = 'red'
        element.nextElementSibling.style.color = 'red'
        element.nextElementSibling.style.display = 'block'
        element.previousElementSibling.style.color = 'red'
          }
      }
      
  
      // If the element is valid, reset its style to the original colors
      // The conditions are the same as above for excluding certain elements
      if (element.checkValidity()
            && element.nodeName !== 'BUTTON'
            && element.nodeName !== 'SELECT'
            && element.type !== 'radio'
      ) {
        element.style.borderColor = '#CED4DA'
        element.nextElementSibling.style.color = '#CED4DA'
        element.nextElementSibling.style.display = 'none'
        element.previousElementSibling.style.color = '#212529'
      }
  
      // If the element is a checkbox or a radio button and is invalid, style it with a red border and red text
      if (!element.checkValidity()
            && element.type === 'radio'
      ) {
        element.style.borderColor = 'red'
        element.nextElementSibling.style.color = 'red'
      }
  
      // If the checkbox or radio button is valid, reset its style to the original colors
      if (element.checkValidity()
            && element.type === 'radio'
      ) {
        element.style.borderColor = '#CED4DA'
        element.nextElementSibling.style.color = '#212529'
      }
  
      // If the element is a select dropdown and the default option is selected, style it with a red border and red text
      if (element.nodeName === 'SELECT'
            && element.value === 'Select a rating for your experience'
      ) {
        element.style.borderColor = 'red'
        element.nextElementSibling.style.color = 'red'
        element.nextElementSibling.style.display = 'block'
        element.previousElementSibling.style.color = 'red'
      }
  
      // If an option other than the default is selected in the dropdown, reset its style to the original colors
      if (element.nodeName === 'SELECT'
            && element.value !== 'Select a rating for your experience'
      ) {
        element.style.borderColor = '#CED4DA'
        element.nextElementSibling.style.color = '#CED4DA'
        element.nextElementSibling.style.display = 'none'
        element.previousElementSibling.style.color = '#212529'
      }
    })
  
    // If all form elements are valid, enable the submit button; otherwise, disable it
    if (good_inputs()) {
      mySubButton.removeAttribute('disabled', '')
    } else {
      mySubButton.setAttribute('disabled', '')
    }
  }
  
 myform.addEventListener ('submit', (e) => {
    // Prevent the default form submission behavior
    e.preventDefault()
  
    // If all form elements are valid after the form submission, display a success message, reset the form, and disable the submit button
    if (good_inputs()) {
      successMessage.style.display = 'block';
      myform.reset();
      mySubButton.setAttribute('disabled', 'disabled');
  
      // Hide the success message after 3 seconds
      setTimeout(() => {
        successMessage.style.display = 'none'
      }, 5000);
    }
  });
  
  formElements.forEach((element) => {
    element.addEventListener('change', handleChange)
  });
  
  // Add submit listener to the form
  myform.addEventListener('submit', (e) => my_default(e));