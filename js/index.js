import onBoxClick from "./onBoxClick.js";
import onSubmitClick from "./onSubmitClick.js";
import RenderSudoku from "./RenderSudoku.js";

let selected_option = "Easy";
let option_btns = document.getElementsByClassName("option");

[...option_btns].forEach((btn) => {
    btn.addEventListener("click", (e) => {
        var current = document.getElementsByClassName("active");
        if (current.length > 0) {
            current[0].className = current[0].className.replace("active", "");
        }
        e.target.classList.add("active");
        selected_option = e.target.innerHTML;
    });
});

document.getElementById("start").addEventListener("click", async () => {
    document.getElementById("start__page").classList.add("d-none");
    document.getElementById("grid__container").classList.remove("d-none");
    let div = document.getElementById("sudoku__grid").querySelector("div");

    let level =
        selected_option === "Easy"
            ? 30
            : selected_option === "Medium"
            ? 60
            : 100;
    let html = await RenderSudoku(level);
    div.innerHTML = `${html} `;

    let elements = document.getElementsByClassName("element");
    let not__null = document.getElementsByClassName("not__null");

    Array.from(not__null).forEach(function (element) {
        element.addEventListener("click", onBoxClick);
    });

    let submitBtn = document.getElementById("submit");

    submitBtn.addEventListener("click", (curr_event) =>
        onSubmitClick(curr_event, elements)
    );
});
