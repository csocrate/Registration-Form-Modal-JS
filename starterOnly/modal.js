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
const modalbg         = document.querySelector(".bground");
const modalBtn        = document.querySelectorAll(".modal-btn");
const closeModalBtn   = document.querySelector(".close");
const modalContent    = document.querySelector(".content");
// Form
const form            = document.querySelector("form");
const formData        = document.querySelectorAll(".formData");

/**
 * List of rules from possible user data inputs
 */ 
const regex = {
  fullname:  new RegExp("^[a-zA-Z]([a-zA-Z\-\s]){1,30}$", "g"),
  email:     new RegExp("^[a-zA-Z0-9\.\_\-]{1,30}@[a-zA-Z\-\_]{2,30}\.[a-zA-Z\-\_]{2,15}$", "g"),
  birthdate: new RegExp("^[0-9]{4}(\-[0-9]{2}){2}$", "g"),
  quantity:  new RegExp("^[0-9]{1,2}$", "g")
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
    //Add ARIA atttributes
    closeModalBtn.setAttribute("aria-label", "Fermer le formulaire");
    closeModalBtn.setAttribute("title", "Fermer le formulaire");
    closeModalBtn.setAttribute("aria-expanded", "true");
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

    // Handle ARIA attributes
    closeModalBtn.removeAttribute("aria-label");
    closeModalBtn.removeAttribute("title");
    closeModalBtn.setAttribute("aria-expanded", "false");
  }, 800); // Same timing as modal animation
}
closeModalBtn.addEventListener("click", closeModal);

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
   * @returns {boolean} - If user data is set to true or false that means required field is correct or not
   * @see inputValidation
   */
  function isValueMatch({name}, regExpName) {
    const inputByname = document.querySelector("input[name=" + name + "]");
    
    return (inputByname.value.match(regExpName) ? true : false); 
  }

  /**
   * Implement rules - About location inputs
   * @returns {boolean}  Radio button is checked or not
   * @see inputValidation
   */
  function isLocationChecked() {
    const locations = Array.from(document.querySelectorAll("input[name=location]"));

    for (let i in locations) {
      if (locations[i].checked) {
        return true;
      }
    }
    
    if (!locations.checked) {
      return false;
    }
  }

  /**
   * Implement rules - About terms and newsletters inputs
   * @param {string} id - Value of ID global attribute
   * @returns {boolean} - Checkbox is checked or not
   * @see inputValidation
   */
  function isCheckboxChecked({id}) {
    const inputById = document.querySelector("input[id=" + id + "]");

    if (inputById.checked) {
      return true;
    } else if ((inputById.checked === false) && (inputById.name === "terms")) {
      return false;
    }
  }

  /**
   * Rejects any input that doesn't follow rules
   * @see {@link isValueMatch}
   * @see {@link isLocationChecked}
   * @see {@link isCheckboxChecked} 
   */
  const inputValidation = () => {
    let result = true;

    if (!isValueMatch(first, regex.fullname)) {
      result = false;
    }

    if (!isValueMatch(last, regex.fullname)) {
      result = false;
    }

    if (!isValueMatch(email, regex.email)) {
      result = false;
    }
    if (!isValueMatch(birthdate, regex.birthdate)) {
      result = false;
    }
    if (!isValueMatch(quantity, regex.quantity)) {
      result = false;
    }
    if (!isLocationChecked()) {
      result = false;
    }
    if (!isCheckboxChecked(checkbox1)) { // Terms input
      result = false;
    }

    isCheckboxChecked(checkbox2); // Newsletters input - not required
  }

  /**
   * Handle implementation form inputs
   * when submit event is fires
   */
   const validate = (e) => {
    e.preventDefault(); // Prevent the form being submitted
    inputValidation();
  }
  form.addEventListener("submit", validate, false);
}
reserveApp();