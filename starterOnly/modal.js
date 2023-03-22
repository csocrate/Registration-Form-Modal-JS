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
const modalbg       = document.querySelector(".bground");
const modalBtn      = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelector(".close");
const modalContent  = document.querySelector(".content");
// Form
const form          = document.querySelector("form");
const formData      = document.querySelectorAll(".formData");

/**
 * Set up variable to hold Regular expression object
 */ 
const regExpFullName   = new RegExp("^[a-zA-Z]([a-zA-Z\-\s]){1,30}$", "g");
const regExpEmail      = new RegExp("^[a-zA-Z0-9\.\-\_]{1,30}@[a-zA-Z\-\_]{2,30}\.[a-zA-Z\-\_]{2,15}$", "g");
const regexBirthdate   = new RegExp("^[0-9]{4}(\-[0-9]{2}){2}$", "g");
const regexQuantity    = new RegExp("^[0-9]{1,2}$", "g");

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
   * Test firstname value
   */
  function testFirstName() {
    if (form.first.value.match(regExpFullName)) {
      console.log(form.first.value);
      form.first.style.borderColor = "transparent";
      return true;
    } else {
      form.first.style.borderWidth = "3px";
      form.first.style.borderColor = "rgb(254 20 85)";
      console.log("Merci de saisir au moins 2 caractères pour le champ prénom.");
      return false;
    }
  }
  
  /**
   * Test name value
   */
  function testLastName() {
    if (form.last.value.match(regExpFullName)) {
      console.log(form.last.value);
      form.last.style.borderColor = "transparent";
      return true;
    } else {
      form.last.style.borderWidth = "3px";
      form.last.style.borderColor = "rgb(254 20 85)";
      console.log("Merci de saisir au moins 2 caractères pour le champ nom.");
      return false;
    }
  }
  
  /**
   * Test email value
   */
  function testEmail() {
    if (regExpEmail.test(form.email.value)) {
      console.log(form.email.value);
      form.email.style.borderColor = "transparent";
      return true;
    } else {
      form.email.style.borderWidth = "3px";
      form.email.style.borderColor = "rgb(254 20 85)";
      console.log("Merci de saisir une adresse valide.");
      return false;
    }
  }
  
  /**
   * Test birthdate value
   */
   function testBirthdate() {
    if (regexBirthdate.test(form.birthdate.value)) {
      console.log(form.birthdate.value);
      form.birthdate.style.borderColor = "transparent";
      return true;
    } else {
      form.birthdate.style.borderWidth = "3px";
      form.birthdate.style.borderColor = "rgb(254 20 85)";
      console.log("Merci de saisir votre date de naissance.");
      return false;
    }
  }
  
  /**
   * Test quantity value
   */
   function testQuantity() {
    if (regexQuantity.test(form.quantity.value)) {
      console.log(form.quantity.value);
      form.quantity.style.borderColor = "transparent";
      return true;
    } else {
      form.quantity.style.borderWidth = "3px";
      form.quantity.style.borderColor = "rgb(254 20 85)";
      console.log("Merci d'indiquer le nombre de tournoi.");
      return false;
    }
  }
  
  /**
   * Test location value
   */
  function testLocation() {
    if ( form.location1.checked
      || form.location2.checked
      || form.location3.checked
      || form.location4.checked
      || form.location5.checked
      || form.location6.checked) {
      console.log(form.location.value);
      return true;
    } else {
      console.log("Merci d'indiquer le tournoi.");
      return false;
    }
  }
  
  /**
   * Test if a box is checked
   */
  function testTermsChecked() {
    if (form.checkbox1.checked) {
      console.log("Conditions d'utilisation: " + form.checkbox1.checked );
      return true;
    } else {
      console.log("Merci de lire et d'accepter les conditions d'utilisation.");
      return false;
    }
  }
  function testNewsChecked() { // optional checkbox
    if (form.checkbox2.checked) {
      console.log("checkbox2: " + form.checkbox2.checked);
      return true;
    }
  }

  /**
   * Valid inputs
   */
  function isValid() {
    testFirstName();
    testLastName();
    testEmail();
    testBirthdate();
    testQuantity();
    testLocation();
    testTermsChecked();
    testNewsChecked();
  }

  /**
   * Handle register form submission
   * when submit event is fires
   */
  const validate = (e) => {    
    if ((testFirstName() === true) && (testLastName() === true) && (testEmail() === true) && (testBirthdate() === true) && (testQuantity() === true) && (testLocation() === true) && (testTermsChecked() === true)) {
      console.log("Merci pour votre inscription.");
    } else {
      e.preventDefault(); // Prevent the form being submitted
      isValid();
    }
  }
  form.addEventListener("submit", validate, false);
}
reserveApp();