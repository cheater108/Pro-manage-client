const priorityList = [
    { name: "High Priority", style: "high" },
    { name: "Moderate Priority", style: "moderate" },
    { name: "Low Priority", style: "low" },
];

const status_list = [
    { type: "Backlog", display: "BACKLOG" },
    { type: "Todo", display: "TODO" },
    { type: "In Progress", display: "PROGRESS" },
    { type: "Done", display: "DONE" },
];

const month_name = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
}

// to get st, rd, th for dates
function append(num_str) {
    if (num_str.length === 1) {
        if (num_str === "1") return "st";
        else if (num_str === "2") return "nd";
        else if (num_str === "3") return "rd";
        return "th";
    } else if (num_str[0] === "1") return "th";
    else if (num_str[1] === "1") return "st";
    else if (num_str[1] === "2") return "nd";
    else if (num_str[1] === "3") return "rd";
    return "th";
}

// count checked todos
function countSelected(todos) {
    const selected = todos.reduce(
        (acc, curr) => acc + (curr.done === true ? 1 : 0),
        0
    );
    return selected;
}

// date for card
function dateString(date) {
    if (date) {
        const d = new Date(date);
        return `${month_name[d.getMonth()]} ${d.getDate()}${append(
            d.getDate().toString()
        )} `;
    }
    return "";
}

// current date for board
function getCurrentDate() {
    const date = new Date();
    return `${date.getDate()}${append(date.getDate())} ${
        month_name[date.getMonth()]
    }, ${date.getFullYear()}`;
}

// get user from localstorage
function getUser() {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    return { email, name };
}

// to check if user is owner of a task
function isOwner(owner_email, task_email) {
    return owner_email === task_email;
}

function datePassed(date_str) {
    const curr_date = new Date();
    const date = new Date(date_str);

    curr_date.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    if (date < curr_date) return true;
    return false;
}

function getNameTag(email) {
    const tag = email.substr(0, 2).toUpperCase();
    return tag;
}

export {
    priorityList,
    status_list,
    countSelected,
    dateString,
    getCurrentDate,
    getUser,
    isOwner,
    logout,
    datePassed,
    getNameTag,
};
