// Detect current page name dynamically
const currentPage = window.location.pathname.split("/").pop().toLowerCase();

// Function to check if email format is valid
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// Show error message under input field
function showError(input, message) {
  const errorEl = input.parentElement.querySelector(".error-msg");
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.remove("hidden");
  }
  input.classList.add("border-red-500", "focus:ring-red-500");
}

// Clear any previous error message
function clearError(input) {
  const errorEl = input.parentElement.querySelector(".error-msg");
  if (errorEl) {
    errorEl.textContent = "";
    errorEl.classList.add("hidden");
  }
  input.classList.remove("border-red-500", "focus:ring-red-500");
}

// Validation for Sign Up page
function validateSignUp(form) {
  let isValid = true;
  const name = form.querySelector("input[placeholder='Name']");
  const email = form.querySelector("input[placeholder='Email']");
  const password = form.querySelector("input[placeholder='Password']");
  const confirm = form.querySelector("input[placeholder='Confirm Password']");

  [name, email, password, confirm].forEach(clearError);

  if (!name.value.trim()) {
    showError(name, "Name is required.");
    isValid = false;
  }

  if (!email.value.trim()) {
    showError(email, "Email is required.");
    isValid = false;
  } else if (!isValidEmail(email.value.trim())) {
    showError(email, "Invalid email format.");
    isValid = false;
  }

  if (password.value.trim().length < 6) {
    showError(password, "Password must be at least 6 characters.");
    isValid = false;
  }

  if (confirm.value.trim() !== password.value.trim()) {
    showError(confirm, "Passwords do not match.");
    isValid = false;
  }

  return isValid;
}

// Validation for Sign In page
function validateSignIn(form) {
  let isValid = true;
  const email = form.querySelector("input[placeholder='Email']");
  const password = form.querySelector("input[placeholder='Password']");

  [email, password].forEach(clearError);

  if (!email.value.trim()) {
    showError(email, "Email is required.");
    isValid = false;
  } else if (!isValidEmail(email.value.trim())) {
    showError(email, "Invalid email format.");
    isValid = false;
  }

  if (!password.value.trim()) {
    showError(password, "Password is required.");
    isValid = false;
  } else if (password.value.trim().length < 6) {
    showError(password, "Password must be at least 6 characters.");
    isValid = false;
  }

  return isValid;
}

// Validation for Forget Password page
function validateForget(form) {
  let isValid = true;
  const email = form.querySelector("input[placeholder='Email']");
  clearError(email);

  if (!email.value.trim()) {
    showError(email, "Email is required.");
    isValid = false;
  } else if (!isValidEmail(email.value.trim())) {
    showError(email, "Invalid email format.");
    isValid = false;
  }

  return isValid;
}

// Validation for Change Password page
function validateChange(form) {
  let isValid = true;
  const password = form.querySelector("input[placeholder='New Password']");
  const confirm = form.querySelector("input[placeholder='Confirm Password']");

  [password, confirm].forEach(clearError);

  if (!password.value.trim()) {
    showError(password, "New password is required.");
    isValid = false;
  } else if (password.value.trim().length < 6) {
    showError(password, "Password must be at least 6 characters.");
    isValid = false;
  }

  if (confirm.value.trim() !== password.value.trim()) {
    showError(confirm, "Passwords do not match.");
    isValid = false;
  }

  return isValid;
}

// Run the validation automatically when form is submitted
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = false;

    switch (currentPage) {
      case "signup.html":
        isValid = validateSignUp(form);
        break;
      case "signin.html":
        isValid = validateSignIn(form);
        break;
      case "forget_pass.html":
        isValid = validateForget(form);
        break;
      case "change_pass.html":
        isValid = validateChange(form);
        break;
      default:
        console.warn("No validation rules for this page.");
    }

    if (isValid) {
      const btn = form.querySelector("button[type='submit']");
      const originalText = btn.textContent;
      btn.classList.add("bg-green-600");
      btn.textContent = "Validated!";

      setTimeout(() => {
        btn.classList.remove("bg-green-600");
        btn.textContent = originalText;
      }, 1500);
    }
  });
});
