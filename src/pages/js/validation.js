// Validate form
function validateForm(form) {
  let valid = true;

  const name = form.querySelector("[placeholder='Name']");
  const email = form.querySelector("[placeholder='Email']");
  const pass = form.querySelector("[placeholder='Password']");
  const confirm = form.querySelector("[placeholder='Confirm Password']");

  clear(name);
  clear(email);
  clear(pass);
  if (confirm) clear(confirm);

  if (name && name.value === "") {
    error(name, "Name is required");
    valid = false;
  }

  if (email.value === "") {
    error(email, "Email is required");
    valid = false;
  } else if (!email.value.includes("@")) {
    error(email, "Email must contain @");
    valid = false;
  }

  if (pass.value.length < 6) {
    error(pass, "Password must be at least 6 characters");
    valid = false;
  }

  if (confirm && confirm.value !== pass.value) {
    error(confirm, "Passwords not matched");
    valid = false;
  }

  return valid;
}

// Show error
function error(input, msg) {
  input.nextElementSibling.innerText = msg;
  input.nextElementSibling.classList.remove("hidden");
}

// Clear error
function clear(input) {
  if (!input) return;
  input.nextElementSibling.innerText = "";
  input.nextElementSibling.classList.add("hidden");
}

// Submit
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  if (validateForm(this)) {
    alert("Form is valid ✅");
  }
});
