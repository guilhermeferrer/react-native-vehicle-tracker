let dropDownAlert;

function setDropDownAlert(ref) {
    dropDownAlert = ref;
}

function alert(type, title, message) {
    dropDownAlert.alertWithType(type, title, message);
}

export {
    dropDownAlert,
    alert,
    setDropDownAlert
}