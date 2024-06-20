// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Your JavaScript code goes here!
document.addEventListener('DOMContentLoaded', () => {
  const hearts = document.querySelectorAll('.like-glyph');

  hearts.forEach(heart => {
    heart.addEventListener('click', () => {
      mimicServerCall()
        .then(response => {
          if (heart.classList.contains('activated-heart')) {
            heart.classList.remove('activated-heart');
            heart.textContent = EMPTY_HEART;
          } else {
            heart.classList.add('activated-heart');
            heart.textContent = FULL_HEART;
          }
        })
        .catch(error => {
          const errorModal = document.getElementById('error-modal');
          errorModal.classList.remove('hidden');
          const modalMessage = document.getElementById('modal-message');
          modalMessage.textContent = error;

          setTimeout(() => {
            errorModal.classList.add('hidden');
          }, 3000);
        });
    });
  });
});
//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}


/*
Add the .hidden class to the error modal in the HTML 
so it does not appear when the page first loads

When a user clicks on an empty heart:
  ~ Invoke mimicServerCall to simulate making a server request
  ~ When the "server" returns a failure status:
  ~ Respond to the error using a .catch(() => {}) block after your
    .then(() => {}) block.
  ~ Display the error modal by removing the .hidden class
  ~ Display the server error message in the modal
  ~ Use setTimeout to hide the modal after 3 seconds (add the .hidden class)
  ~ When the "server" returns a success status:
  ~ Change the heart to a full heart
  ~ Add the .activated-heart class to make the heart appear red

When a user clicks on a full heart:
  ~ Change the heart back to an empty heart
  ~ Remove the .activated-heart class

Keep all your styling rules entirely in style.css. Do not manipulate any 
.style properties.

Only manipulate the DOM once the server request responds. Do not make the 
heart full until you're inside a successful .then block.

Note: The tests will only check for the first part of the specification 
(adding the hidden class). You should verify the rest of the behavior yourself, 
by checking the page in the browser.
*/