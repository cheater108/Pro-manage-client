function validateTask(task) {
    let valid = true;
    const error = { title: false, checklist: false, priority: false };
    const message = {
        title: "Title cannot be empty",
        checklist: "Checklist cannot be empty",
        priority: "Please select a Priority",
    };

    task.title = task.title.trim();
    if (task.title === "") {
        valid = false;
        error.title = true;
    }

    if (task.checklist.length === 0) {
        valid = false;
        error.checklist = true;
    }

    for (const todo of task.checklist) {
        todo.task = todo.task?.trim();
        if (todo.task === "") {
            valid = false;
            error.checklist = true;
            message.checklist = "A todo cannot be empty";
            break;
        }
    }

    if (task.priority === "") {
        valid = false;
        error.priority = true;
    }

    return { valid, error, message };
}

function validateLogin(user) {
    let valid = true;
    const error = { email: false, password: false };
    const message = {
        email: "Email cannot be empty",
        password: "Password cannot be empty",
    };
    if (user.email === "") {
        valid = false;
        error.email = true;
    }
    if (user.password === "") {
        valid = false;
        error.password = true;
    }

    return { valid, error, message };
}

function validateRegister(user) {
    let valid = true;
    const error = {
        name: false,
        email: false,
        password: false,
        confirm_pass: false,
    };

    const message = {
        name: "Name cannot be empty",
        email: "Email cannot be empty",
        password: "Password cannot be empty",
        confirm_pass: "Passwords don't match",
    };

    if (user.name === "") {
        valid = false;
        error.name = true;
    }

    if (user.email === "") {
        valid = false;
        error.email = true;
    }

    if (user.password === "") {
        valid = false;
        error.password = true;
    } else if (user.password.length < 8) {
        valid = false;
        error.password = true;
        message.password = "Password cannot be less than 8 characters.";
    } else if (user.password.search(/[!@#$%^&*._\-\+=]/) === -1) {
        valid = false;
        error.password = true;
        message.password =
            "Password must containe atleast one of these characters !@#$%^&*._-+=";
    } else if (user.password.search(/[A-Z]/) === -1) {
        valid = false;
        error.password = true;
        message.password =
            "Password must containe atleast one capital letter A-Z";
    } else if (user.password.search(/[a-z]/) === -1) {
        valid = false;
        error.password = true;
        message.password =
            "Password must containe atleast one small letter a-z";
    } else if (user.password.search(/[0-9]/) === -1) {
        valid = false;
        error.password = true;
        message.password = "Password must containe atleast one number 0-9";
    }

    if (user.confirm_pass !== user.password) {
        valid = false;
        error.confirm_pass = true;
    }

    return { valid, error, message };
}

function validateEditUser(user) {
    let valid = true;
    const error = {
        new_password: false,
    };

    const message = {
        new_password: "Passwords don't match",
    };

    if (user.new_password.length > 0) {
        if (user.new_password.length < 8) {
            valid = false;
            error.new_password = true;
            message.new_password =
                "New Password cannot be less than 8 characters.";
        } else if (user.new_password.search(/[!@#$%^&*._\-\+=]/) === -1) {
            valid = false;
            error.new_password = true;
            message.new_password =
                "New Password must containe atleast one of these characters !@#$%^&*._-+=";
        } else if (user.new_password.search(/[A-Z]/) === -1) {
            valid = false;
            error.new_password = true;
            message.new_password =
                "New Password must containe atleast one capital letter A-Z";
        } else if (user.new_password.search(/[a-z]/) === -1) {
            valid = false;
            error.new_password = true;
            message.new_password =
                "New Password must containe atleast one small letter a-z";
        } else if (user.new_password.search(/[0-9]/) === -1) {
            valid = false;
            error.new_password = true;
            message.new_password =
                "New Password must containe atleast one number 0-9";
        }
    }

    return { valid, error, message };
}

export { validateLogin, validateRegister, validateTask, validateEditUser };
