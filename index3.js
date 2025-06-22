let id = (id) => document.getElementById(id);
let classes = (classes) => document.getElementsByClassName(classes);
let userform = id("form");
let Entries = [];

const saveuserform = (event) => {
    event.preventDefault();

    const nameVal = id("name").value.trim();
    const emailVal = id("email").value.trim();
    const passwordVal = id("password").value.trim();

    let isValid = true;

    // Name: should not contain numbers or special characters
    if (!/^[a-zA-Z\s]+$/.test(nameVal)) {
        engine(0, "Name should only contain letters and spaces");
        isValid = false;
    } else {
        engine(0, "");
    }

    // Email: must end with @gmail.com
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(emailVal)) {
        engine(1, "Email must be a valid @gmail.com address");
        isValid = false;
    } else {
        engine(1, "");
    }

    // Password: 8+ characters, 1 number, 1 special character
    if (!/^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(passwordVal)) {
        engine(2, "Password must be at least 8 characters, include a number and special character");
        isValid = false;
    } else {
        engine(2, "");
    }

    if (isValid) {
        const userentries = {
            name: nameVal,
            email: emailVal,
            password: passwordVal
        };

        Entries.push(userentries);
        localStorage.setItem("Entries", JSON.stringify(Entries));
        displayentries();
        userform.reset(); // Clear the form
    }
};

userform.addEventListener("submit", saveuserform);

let error = classes("error");

let engine = (serial, message) => {
    error[serial].innerHTML = message;
};

const getentries = () => {
    let retrieveentries = localStorage.getItem("Entries");
    return retrieveentries ? JSON.parse(retrieveentries) : [];
};

const displayentries = () => {
    const entries = getentries();
    const tableentries = entries.map((entry) => {
        const name = `<td>${entry.name}</td>`;
        const email = `<td>${entry.email}</td>`;
        const password = `<td>${entry.password}</td>`;
        return `<tr>${name}${email}${password}</tr>`;
    }).join("");

    const table = `<table border="1">
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
        </tr>
        ${tableentries}
    </table>`;

    id("result").innerHTML = table;
};

// Show any previously saved entries on page load
displayentries();
