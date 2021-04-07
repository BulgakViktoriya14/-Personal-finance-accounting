export function validateLengthField(typeField, valueField) {
    switch (typeField) {
        case "text":
            return flagLengthTextField(valueField);
        case "email":
            return flagLengthEmailField(valueField);
        default:
            break;
    }
}

function flagLengthTextField(value) {
    if(value.length < 3) {
        return false;
    }
    return true;
}

function flagLengthEmailField(email) {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(String(email).toLowerCase());
}