export function validateEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// collected from: https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript/49178339
// Validates that the input string is a valid date formatted as "mm/dd/yyyy"
export function isValidDate(dateString) {
    // First check for the pattern
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
        return false;
    }

    // Parse the date parts to integers
    var parts = dateString.split('/');
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month === 0 || month > 12) {
        return false;
    }

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
        monthLength[1] = 29;
    }

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
}

export function validatePassword(password) {
    if (password.length < 8) {
        return false;
    }
    const re = /(?=.*[A-Za-z])(?=.*\d)/;
    return re.test(String(password));
}

export function validateUsername(username) {
    if (username.length < 4 || username.length > 20) {
        return false;
    }
    const re = /([A-Za-z0-9_]+)/;
    return re.test(String(username));
}

export function validateNid(nid) {
    return [10, 13, 17].includes(nid.length) && !isNaN(nid);
}

export function validatePhone(phone) {
    return phone.length === 11 && phone.startsWith('01') && !isNaN(phone);
}
