function keyPress(e, param) {
    if (e.charCode >= 48 && e.charCode <= 57) {
        param.target.innerHTML = e.key;
    }
}

let keyPressListner = null;

function onBoxClick(param) {
    let classBg = document.getElementsByClassName("bg_click_color");
    if (classBg.length > 0) {
        classBg[0].classList.remove("bg_click_color");
    }
    // When user clicks on box then box gets highlighted
    param.target.classList.add("bg_click_color");

    // Adding Keyboard keypress event
    if (keyPressListner !== null) {
        document.removeEventListener("keypress", keyPressListner);
    }
    keyPressListner = (e) => {
        keyPress(e, param);
    };
    document.addEventListener("keypress", keyPressListner);
}

export default onBoxClick;
