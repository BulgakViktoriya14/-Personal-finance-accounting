export function validateEmptyField(fieldsArray) {
    let countFalse = 0;
    fieldsArray.forEach(function (item) {
        if(item === "") {
            countFalse++;
        }
    })
    if(countFalse > 0) {
        return false;
    } else {
        return true;
    }
}