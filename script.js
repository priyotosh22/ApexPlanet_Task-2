// =====================================
// INTERNSHIP ASSIGNMENT - JAVASCRIPT
// =====================================

// ---------- Contact Form Validation ----------

const contactForm = document.getElementById("contactForm");

const fields = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    subject: document.getElementById("subject"),
    message: document.getElementById("message")
};

const errors = {
    name: document.getElementById("nameError"),
    email: document.getElementById("emailError"),
    subject: document.getElementById("subjectError"),
    message: document.getElementById("messageError")
};

const formSuccess = document.getElementById("formSuccess");

function showError(field, errorElement, message) {
    field.classList.add("input-error");
    errorElement.textContent = message;
}

function clearError(field, errorElement) {
    field.classList.remove("input-error");
    errorElement.textContent = "";
}

function validateContactForm() {
    let isValid = true;
    formSuccess.textContent = "";

    Object.keys(fields).forEach((key) => {
        clearError(fields[key], errors[key]);
    });

    const name = fields.name.value.trim();
    const email = fields.email.value.trim();
    const subject = fields.subject.value.trim();
    const message = fields.message.value.trim();

    if (name === "") {
        showError(fields.name, errors.name, "Full name is required.");
        isValid = false;
    } else if (name.length < 2) {
        showError(fields.name, errors.name, "Name must contain at least 2 characters.");
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        showError(fields.email, errors.email, "Email address is required.");
        isValid = false;
    } else if (!emailPattern.test(email)) {
        showError(fields.email, errors.email, "Please enter a valid email address.");
        isValid = false;
    }

    if (subject === "") {
        showError(fields.subject, errors.subject, "Subject is required.");
        isValid = false;
    }

    if (message === "") {
        showError(fields.message, errors.message, "Message is required.");
        isValid = false;
    } else if (message.length < 10) {
        showError(fields.message, errors.message, "Message must contain at least 10 characters.");
        isValid = false;
    }

    return isValid;
}

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (validateContactForm()) {
        formSuccess.textContent = "Form submitted successfully.";
        contactForm.reset();
    }
});

// Clear individual validation errors when the user starts correcting them.
Object.keys(fields).forEach((key) => {
    fields[key].addEventListener("input", () => {
        clearError(fields[key], errors[key]);
        formSuccess.textContent = "";
    });
});


// ---------- Dynamic To-Do List / DOM Manipulation ----------

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyState = document.getElementById("emptyState");
const taskMessage = document.getElementById("taskMessage");

function updateTaskCount() {
    const total = taskList.children.length;
    taskCount.textContent = `${total} ${total === 1 ? "task" : "tasks"}`;
    emptyState.style.display = total === 0 ? "block" : "none";
}

function createTask(taskText) {
    const listItem = document.createElement("li");
    listItem.className = "task-item";

    const taskContent = document.createElement("div");
    taskContent.className = "task-content";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-check";
    checkbox.setAttribute("aria-label", `Mark "${taskText}" as completed`);

    const text = document.createElement("span");
    text.textContent = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete "${taskText}"`);

    checkbox.addEventListener("change", () => {
        listItem.classList.toggle("completed", checkbox.checked);
    });

    deleteButton.addEventListener("click", () => {
        listItem.remove();
        updateTaskCount();
    });

    taskContent.appendChild(checkbox);
    taskContent.appendChild(text);

    listItem.appendChild(taskContent);
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);
    updateTaskCount();
}

function addTask() {
    const taskText = taskInput.value.trim();
    taskMessage.textContent = "";

    if (taskText === "") {
        taskMessage.textContent = "Please enter a task.";
        taskInput.focus();
        return;
    }

    if (taskText.length < 2) {
        taskMessage.textContent = "Task must contain at least 2 characters.";
        taskInput.focus();
        return;
    }

    createTask(taskText);
    taskInput.value = "";
    taskInput.focus();
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

updateTaskCount();
