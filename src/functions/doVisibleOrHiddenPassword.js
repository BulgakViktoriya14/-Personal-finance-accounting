export function doVisibleOrHiddenPassword(element) {
    if(element.classList.contains("button-hidden-password")) {
        element.classList.remove("button-hidden-password");
        element.previousElementSibling.setAttribute("type", "password");
    } else {
        element.classList.add("button-hidden-password");
        element.previousElementSibling.setAttribute("type", "text");
    }
}