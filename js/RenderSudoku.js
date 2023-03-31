import { instance } from "./axios_instance.js";

// Getting set of 3 elements of row
function getDiv(array, i, index) {
    let html = `
    <div class="col-md-4 ${index === 8 ? "" : "border__bottom_sm"} "> 
        <div class="row">
            <div class="col-md-4 border__right_sm element ${
                array[0] === 0 ? "number_not_present" : ""
            }">
                ${array[0] === 0 ? "" : array[0]}
            </div>
            <div class="col-md-4 border__right_sm element ${
                array[1] === 0 ? "number_not_present" : ""
            }">
                ${array[1] === 0 ? "" : array[1]}
            </div>
            <div class="col-md-4 ${i === 6 ? "" : "border__right"} element ${
        array[2] === 0 ? "number_not_present" : ""
    }">
                ${array[2] === 0 ? "" : array[2]}
            </div>
        </div>
    </div>
  `;

    return html;
}

// This function return the string of sudoku grid
async function RenderSudoku(level) {
    // Calling API from 'axios' instance.
    const request = await instance.get("/generator", { fill: level });
    // Extracting task from API request
    const tasks = request.data.task;

    // Creating Sudoku grid
    let html = `<div class="row row_border_x">`;

    // Iterating task Array and getting array of row
    tasks.map((array, index) => {
        // For 3rd row and 6th row adding border
        html =
            html +
            `<div class="row main__row ${
                (index + 1) % 3 === 0 && index != 8 ? "border__bottom" : ""
            } ">`;

        // Iterating each row
        for (let i = 0; i < array.length; i = i + 3) {
            html =
                html + getDiv([array[i], array[i + 1], array[i + 2]], i, index);
        }

        html = html + `</div>`;
    });

    html = html + "</div>";

    return html;
}

export default RenderSudoku;
