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
 * Set up variable to hold Regular expression object
 */ 
const regExpFullName  = new RegExp("^[a-zA-Z]([a-zA-Z\-\s]){1,30}$", "g");
const regExpEmail     = new RegExp("^[a-zA-Z0-9\.\-\_]{1,30}@[a-zA-Z\-\_]{2,30}\.[a-zA-Z\-\_]{2,15}$", "g");
const regExpBirthdate = new RegExp("^[0-9]{4}(\-[0-9]{2}){2}$", "g");
const regExpQuantity  = new RegExp("^[0-9]{1,2}$", "g");

/**
 * Location inputs
 */ 
const locations = [
  form.location1,
  form.location2,
  form.location3,
  form.location4,
  form.location5,
  form.location6
];

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

const reserveApp = function() {
  /**
   * Focus and blur field
   */
  formData.forEach((child) => {
    const input = child.querySelector("input");
    // console.log(input);
    const isInputFocus = (event) => {
      event.target.style.background = "#e8f0fe";
    }
    
    const isInputBlur = (event) => {
      event.target.style.background = "";
    }
    
    input.addEventListener("focus", isInputFocus, false);
    input.addEventListener("blur", isInputBlur, false);
  })

  /**
   * Test if value is not empty and matches to expected values
   * with regular expressions
   * About firstname, lastname, email, birthdate and quantity inputs
   */
  function isValueMatch({name}, regExpName) {
    let elementByName = document.getElementsByName(name)[0];
    // console.log(elementByName);

    if (elementByName.value.match(regExpName)) {
      console.log(elementByName.value);
      elementByName.style.borderColor = "transparent";
      return true;
    } else {
      console.log("error: " + name);
      elementByName.style.borderWidth = "3px";
      elementByName.style.borderColor = "rgb(254 20 85)";
      return false;
    }
  }

  /**
   * Check if a radio button is checked
   * About location inputs
   */
  function isLocationChecked() {
    for (let i in locations) {
      if (locations[i].checked) {
        console.log(form.location.value);
        return true;
      }
    }
    if (!locations.checked) {
      console.log("Merci d'indiquer le tournoi.");
    }
  }

  /**
   * Check if a checkbox is checked
   * About terms and newsletters inputs
   */
  function isCheckboxChecked({id}) {
    const elementById = document.getElementById(id);

    if (elementById.checked) {
      console.log(id + ": " + elementById.checked );
      return true;
    } else if ((elementById.checked === false) && (elementById === document.getElementById("checkbox1"))) {
      console.log("Merci de lire et d'accepter les conditions d'utilisation.");
      return false;
    } else {
      console.log(id + ": optional");
    }
  }

  /**
   * Valid inputs
   */
  function isValid() {
    isValueMatch(first, regExpFullName);
    isValueMatch(last, regExpFullName);
    isValueMatch(email, regExpEmail);
    isValueMatch(birthdate, regExpBirthdate);
    isValueMatch(quantity, regExpQuantity);
    isLocationChecked();
    isCheckboxChecked(checkbox1); // Terms input
    isCheckboxChecked(checkbox2); // Newletters input (not required)
  }

  /**
   * Handle register form submission
   * when submit event is fires
   */
   const validate = (e) => {
    if ((isValueMatch(first, regExpFullName) === true) && (isValueMatch(last, regExpFullName) === true) && (isValueMatch(email, regExpEmail)) && (isValueMatch(birthdate, regExpBirthdate)) && (isValueMatch(quantity, regExpQuantity)) && (isLocationChecked() === true) && (isCheckboxChecked(checkbox1) === true)) {
      console.log("Merci pour votre inscription.");
    } else {
      e.preventDefault(); // Prevent the form being submitted
      isValid();
    }
  }
  form.addEventListener("submit", validate, false);
}
reserveApp();