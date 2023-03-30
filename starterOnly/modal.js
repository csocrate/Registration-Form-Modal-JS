/***********************************************************
 *                     TOP NAVIGATION                     *
 ***********************************************************/
 function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

/***********************************************************
 *                       MODAL FORM                       *
 ***********************************************************/

/**
 * DOM Elements
 */
// Modal
const modalbg          = document.querySelector(".bground");
const modalBody        = document.querySelector("div.modal-body");
const modalBtn         = document.querySelectorAll(".modal-btn");
const closeModalBtn    = document.querySelectorAll(".close");
const modalContent     = document.querySelector(".content");
const closeSuccessForm = document.querySelector(".btn-submit ~ .close");
// Form
const form             = document.querySelector("form");
const formData         = document.querySelectorAll(".formData");
const locationInput    = document.querySelectorAll("input[name=location]");
const radioButton      = document.querySelector("input[type=radio]");
const spanError        = document.querySelector("span[data-error]");

/**
 * List of rules from possible user data inputs
 */ 
const regex = {
  fullname:  new RegExp("^[a-zA-Z]([a-zA-Z\-\s]){1,30}$", "g"),
  email:     new RegExp("^[a-zA-Z0-9\.\_\-]{1,30}@[a-zA-Z\-\_]{2,30}\.[a-zA-Z\-\_]{2,15}$", "g"),
  birthdate: new RegExp("^[0-9]{4}(\-[0-9]{2}){2}$", "g"),
  quantity:  new RegExp("^[0-9]{1,2}$", "g")
}

/**
 * Error Messages
 * @see inputValidation
 */ 
const errorMessages = {
  first:     "Le champ prénom doit contenir 2 caractères ou plus.",
  last:      "Le champ nom doit contenir 2 caractères ou plus.",
  email:     "L'adresse email doit être valide.",
  birthdate: "La date de naissance doit être valide.",
  quantity:  "Le nombre de tournoi doit être saisi.",
  location:  "Un tournoi doit être choisi.",
  terms:     "Merci de lire et d'accepter les conditions d'utilisation."
}

/* ----------------------------------
     LAUNCH AND CLOSE MODAL EVENT
   ---------------------------------- */

/**
 * Launch modal event
 */
const launchModal = () => {
  modalbg.style.display = "block";
  modalbg.classList.add("visible");
  const visibleModal = document.querySelector(".bground.visible");

  if (typeof visibleModal !== "undefined") {

    closeModalBtn.forEach( closeBtn => {
      //Add ARIA atttributes
      closeBtn.setAttribute("aria-label", "Fermer le formulaire");
      closeBtn.setAttribute("title", "Fermer le formulaire");
      closeBtn.setAttribute("aria-expanded", "true");
    })
  }
}
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

/**
 * Close modal event
 */
const closeModal = () => {
  // Add .dismissed for exit animation 
  modalContent.classList.add("dismissed");

  setTimeout(() => {      
    modalContent.classList.remove("dismissed");
    modalbg.classList.remove("visible");
    modalbg.style.display = "none";

    closeModalBtn.forEach( closeBtn => {
      // Handle ARIA attributes
      closeBtn.removeAttribute("aria-label");
      closeBtn.removeAttribute("title");
      closeBtn.setAttribute("aria-expanded", "false");
    })
  }, 800); // Same timing as modal animation
}
closeModalBtn.forEach((btn) => btn.addEventListener("click", closeModal));

/* ----------------------------------
          HANDLE RESERVE FORM                        
   ---------------------------------- */

/**
 * Handle register form submission
 */
const reserveApp = function() {
  /**
   * Implement rules - About firstname, lastname, email, birthdate and quantity inputs
   * @param {string} name - Value name of input element
   * @param {object} regExpName - Expected data rules
   * @param {string} errorText - Message
   * @returns {boolean} - If user data is set to true or false that means required field is correct or not
   * @see inputValidation
   */
  function isValueMatch({name}, regExpName, errorText) {
    const inputByname = document.querySelector("input[name=" + name + "]");

    if (inputByname.value.match(regExpName)) {
      inputByname.parentElement.dataset.error = "";
      inputByname.parentElement.dataset.errorVisible = "false";
      return true;
    } else {
      inputByname.parentElement.dataset.error = errorText;
      inputByname.parentElement.dataset.errorVisible = "true";
      return false;
    }
  }

  /**
   * Implement rules - About location inputs
   * @param {string} errorText - Message
   * @returns {boolean}  Radio button is checked or not
   * @see inputValidation
   */
  function isLocationChecked(errorText) {
    const locations = Array.from(locationInput);

    for (let i in locations) {
      if (locations[i].checked) {        
        locations[i].parentElement.dataset.error = "";
        locations[i].parentElement.dataset.errorVisible = "false";
        return true;
      }
    }
    
    if (!locations.checked) {
      radioButton.parentElement.dataset.error = errorText;
      radioButton.parentElement.dataset.errorVisible = "true";
      return false;
    }
  }

  /**
   * Implement rules - About terms and newsletters inputs
   * @param {string} id - Value of ID global attribute
   * @returns {boolean} - Checkbox is checked or not
   * @see inputValidation
   */
  function isCheckboxChecked({id}, errorText) {
    const inputById = document.querySelector("input[id='" + id + "']");

    if (inputById.checked && (id !== "checkbox1")) {
      return true;
    } else if (inputById.checked && (id === "checkbox1")) {
      spanError.dataset.error = "";
      spanError.dataset.errorVisible = "false";
      return true;
    } else if (!inputById.checked && (id === "checkbox1")) {
      spanError.dataset.error = errorText;
      spanError.dataset.errorVisible = "true";
      return false;
    }
  }

  /**
   * Rejects any input that doesn't follow rules
   * @see {@link errorMessages} Object
   * @see {@link isValueMatch}
   * @see {@link isLocationChecked}
   * @see {@link isCheckboxChecked} 
   */
  const inputValidation = () => {
    let result = true;

    // if (!isValueMatch(first, regex.fullname, errorMessages.first)) {
    //   result = false;
    // }

    // if (!isValueMatch(last, regex.fullname, errorMessages.last)) {
    //   result = false;
    // }

    // if (!isValueMatch(email, regex.email, errorMessages.email)) {
    //   result = false;
    // }
    // if (!isValueMatch(birthdate, regex.birthdate, errorMessages.birthdate)) {
    //   result = false;
    // }
    // if (!isValueMatch(quantity, regex.quantity, errorMessages.quantity)) {
    //   result = false;
    // }
    // if (!isLocationChecked(errorMessages.location)) {
    //   result = false;
    // }
    if (!isCheckboxChecked(checkbox1, errorMessages.terms)) { // Terms input
      result = false;
    }

    isCheckboxChecked(checkbox2); // Newsletters input - not required

    if (result === true ) {
      modalBody.classList.add("success");

      closeSuccessForm.classList.remove("none");
      closeSuccessForm.classList.add("success");

      form.dataset.success = "Merci ! \n Votre réservation \n est confirmée.";
    }
  }

  /**
   * Handle implementation form inputs and user responses
   * when submit event is fires
   */
   const validate = (e) => {
    e.preventDefault(); // Prevent the form being submitted
    inputValidation();
  }
  form.addEventListener("submit", validate, false);
}
reserveApp();