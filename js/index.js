import onBoxClick from "./onBoxClick.js";
import onSubmitClick from "./onSubmitClick.js";
import RenderSudoku from "./RenderSudoku.js";

// Default Level
let selected_option = "Easy";
let option_btns = document.getElementsByClassName("option");

// Options styling
[...option_btns].forEach((btn) => {
    btn.addEventListener("click", (e) => {
        var current = document.getElementsByClassName("active");
        if (current.length > 0) {
            current[0].className = current[0].className.replace("active", "");
        }
        e.target.classList.add("active");

        // * Getting Selected Level by User
        selected_option = e.target.innerHTML;
    });
});

// When user clicks on 'start' button
document.getElementById("start").addEventListener("click", async () => {
    // Hiding Start page
    document.getElementById("start__page").classList.add("d-none");

    // Displaying Sudoku Grid
    document.getElementById("grid__container").classList.remove("d-none");
    let div = document.getElementById("sudoku__grid").querySelector("div");

    // Converting 'selected_option' from string to Int
    let level =
        selected_option === "Easy"
            ? 30
            : selected_option === "Medium"
            ? 60
            : 100;

    // Calling RenderSudoku from RenderSudoku.js getting sudoku grid by level
    let html = await RenderSudoku(level);

    // Rendering sudoku grid to html page
    div.innerHTML = `${html} `;

    // Selecting each box of sudoku
    let elements = document.getElementsByClassName("element");

    // Selecting box which 'not' contains predefine numbers
    let number_not_present =
        document.getElementsByClassName("number_not_present");

    // Adding onCLick event to each empty box element
    Array.from(number_not_present).forEach(function (element) {
        element.addEventListener("click", onBoxClick);
    });

    let submitBtn = document.getElementById("submit");

    // User clicks on submit button
    submitBtn.addEventListener("click", (curr_event) =>
        /**  
         * Giving 'current event' and all box of grid to onSubmitClick function for 
           checking wheather the user slove sudoku right or not.
        */
        onSubmitClick(curr_event, elements)
    );
});
