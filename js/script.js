"use strict";

document.addEventListener("DOMContentLoaded", function () {
  setupMobileNavigation();
  setFooterYear();
  setWelcomeGreeting();
  setupCourseUnits();
  setupEnquiryForm();
});

function setupMobileNavigation() {
  var toggle = document.querySelector(".menu-toggle");
  var navigation = document.getElementById("primary-navigation");

  if (!toggle || !navigation) return;

  toggle.addEventListener("click", function () {
    var isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
    toggle.querySelector(".sr-only").textContent = isOpen ? "Open navigation menu" : "Close navigation menu";
  });

  navigation.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
      toggle.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
      toggle.querySelector(".sr-only").textContent = "Open navigation menu";
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      toggle.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
      toggle.querySelector(".sr-only").textContent = "Open navigation menu";
      toggle.focus();
    }
  });
}

function setFooterYear() {
  var year = String(new Date().getFullYear());
  document.querySelectorAll("[data-current-year]").forEach(function (element) {
    element.textContent = year;
  });
}

function setWelcomeGreeting() {
  var greeting = document.getElementById("welcome-greeting");
  if (!greeting) return;

  var hour = new Date().getHours();
  var timeOfDay = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  greeting.textContent = timeOfDay + " — welcome to AIA.";
}

function setupCourseUnits() {
  var list = document.getElementById("unit-list");
  var search = document.getElementById("unit-search");
  var expandAll = document.querySelector("[data-expand-all]");
  if (!list) return;

  var items = Array.from(list.querySelectorAll(".unit-item"));
  var status = document.getElementById("unit-search-status");
  var noResults = document.getElementById("unit-no-results");

  function setExpanded(button, expanded) {
    var panel = document.getElementById(button.getAttribute("aria-controls"));
    button.setAttribute("aria-expanded", String(expanded));
    panel.hidden = !expanded;
  }

  items.forEach(function (item) {
    var button = item.querySelector(".unit-toggle");
    button.addEventListener("click", function () {
      setExpanded(button, button.getAttribute("aria-expanded") !== "true");
      updateExpandButton();
    });
  });

  function updateExpandButton() {
    if (!expandAll) return;
    var visibleButtons = items.filter(function (item) {
      return !item.hidden;
    }).map(function (item) {
      return item.querySelector(".unit-toggle");
    });
    var allExpanded = visibleButtons.length > 0 && visibleButtons.every(function (button) {
      return button.getAttribute("aria-expanded") === "true";
    });
    expandAll.setAttribute("aria-expanded", String(allExpanded));
    expandAll.textContent = allExpanded ? "Collapse all" : "Expand all";
  }

  if (expandAll) {
    expandAll.addEventListener("click", function () {
      var visibleButtons = items.filter(function (item) {
        return !item.hidden;
      }).map(function (item) {
        return item.querySelector(".unit-toggle");
      });
      var shouldExpand = !visibleButtons.length || !visibleButtons.every(function (button) {
        return button.getAttribute("aria-expanded") === "true";
      });
      visibleButtons.forEach(function (button) {
        setExpanded(button, shouldExpand);
      });
      updateExpandButton();
    });
  }

  if (search) {
    search.addEventListener("input", function () {
      var query = search.value.trim().toLocaleLowerCase();
      var visibleCount = 0;

      items.forEach(function (item) {
        var matches = item.textContent.toLocaleLowerCase().indexOf(query) !== -1;
        item.hidden = !matches;
        if (matches) {
          visibleCount += 1;
        } else {
          setExpanded(item.querySelector(".unit-toggle"), false);
        }
      });

      if (status) {
        status.textContent = query ? visibleCount + (visibleCount === 1 ? " sample placeholder found." : " sample placeholders found.") : "";
      }
      if (noResults) noResults.hidden = visibleCount !== 0;
      updateExpandButton();
    });
  }
}

function setupEnquiryForm() {
  var form = document.getElementById("enquiry-form");
  if (!form) return;

  var fields = {
    fullName: form.elements.fullName,
    email: form.elements.email,
    phone: form.elements.phone,
    courseInterest: form.elements.courseInterest,
    message: form.elements.message,
    consent: form.elements.consent
  };
  var characterCount = document.getElementById("character-count");
  var result = document.getElementById("form-result");
  var honeypot = form.elements.website;
  var errors = {
    fullName: document.getElementById("full-name-error"),
    email: document.getElementById("email-error"),
    phone: document.getElementById("phone-error"),
    courseInterest: document.getElementById("course-interest-error"),
    message: document.getElementById("message-error"),
    consent: document.getElementById("consent-error")
  };

  function setError(name, message) {
    var field = fields[name];
    errors[name].textContent = message;
    if (field.type === "checkbox") {
      field.setAttribute("aria-invalid", message ? "true" : "false");
    } else {
      field.setAttribute("aria-invalid", message ? "true" : "false");
    }
    return !message;
  }

  function validateName() {
    var value = fields.fullName.value.trim();
    if (!value) return setError("fullName", "Please enter your full name.");
    if (value.length < 2) return setError("fullName", "Please enter at least 2 characters.");
    if (/[\u0000-\u001f\u007f]/.test(value)) return setError("fullName", "Please remove unsupported characters.");
    return setError("fullName", "");
  }

  function validateEmail() {
    var value = fields.email.value.trim();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!value) return setError("email", "Please enter your email address.");
    if (value.length > 254 || !emailPattern.test(value)) return setError("email", "Please enter a valid email address.");
    return setError("email", "");
  }

  function validatePhone() {
    var value = fields.phone.value.trim();
    if (!value) return setError("phone", "Please enter your Australian phone number.");
    if (!/^[+0-9()\s.-]+$/.test(value)) return setError("phone", "Use digits and common phone number separators only.");
    var normalized = value.replace(/[()\s.-]/g, "");
    if (normalized.indexOf("+61") === 0) normalized = "0" + normalized.slice(3);
    if (!/^0(?:4\d{8}|[2378]\d{8})$/.test(normalized)) {
      return setError("phone", "Enter a valid Australian mobile or landline number.");
    }
    return setError("phone", "");
  }

  function validateCourse() {
    if (!fields.courseInterest.value) return setError("courseInterest", "Please select a course interest.");
    return setError("courseInterest", "");
  }

  function validateMessage() {
    var value = fields.message.value.trim();
    if (!value) return setError("message", "Please enter a message.");
    if (value.length > 500) return setError("message", "Your message must be 500 characters or fewer.");
    if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value)) return setError("message", "Please remove unsupported characters.");
    return setError("message", "");
  }

  function validateConsent() {
    if (!fields.consent.checked) return setError("consent", "Please confirm you understand this is a demonstration form.");
    return setError("consent", "");
  }

  var validators = {
    fullName: validateName,
    email: validateEmail,
    phone: validatePhone,
    courseInterest: validateCourse,
    message: validateMessage,
    consent: validateConsent
  };

  Object.keys(validators).forEach(function (name) {
    var field = fields[name];
    field.addEventListener(field.type === "checkbox" || field.tagName === "SELECT" ? "change" : "input", function () {
      validators[name]();
      if (result) result.textContent = "";
    });
  });

  fields.message.addEventListener("input", function () {
    if (characterCount) characterCount.textContent = fields.message.value.length + " / 500";
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (result) result.textContent = "";

    var valid = Object.keys(validators).map(function (name) {
      return validators[name]();
    }).every(Boolean);

    if (honeypot.value.trim()) {
      if (result) result.textContent = "This demonstration form does not submit or store enquiries.";
      return;
    }

    if (!valid) {
      var firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    form.reset();
    if (characterCount) characterCount.textContent = "0 / 500";
    Object.keys(errors).forEach(function (name) {
      errors[name].textContent = "";
      fields[name].setAttribute("aria-invalid", "false");
    });
    if (result) {
      result.textContent = "Thank you for trying the AIA enquiry form. Your details have not been sent or stored; this is a front-end demonstration only.";
      result.focus();
    }
  });
}
