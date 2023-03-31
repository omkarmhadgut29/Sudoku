import { instance } from "./axios_instance.js";

function getDiv(array, i, index) {
    // ${index === 8 ? "border__bottom" : ""}
    let flag = [];
    array.map((element) => {
        if (element === 0) {
            flag.push(false);
        } else {
            flag.push(true);
        }
    });
    let html = `
    <div class="col-md-4 ${index === 8 ? "" : "border__bottom_sm"} ">
        <div class="row">
            <div class="col-md-4 border__right_sm element ${
                array[0] === 0 ? "not__null" : ""
            }">
                ${array[0] === 0 ? "" : array[0]}
            </div>
            <div class="col-md-4 border__right_sm element ${
                array[1] === 0 ? "not__null" : ""
            }">
                ${array[1] === 0 ? "" : array[1]}
            </div>
            <div class="col-md-4 ${i === 6 ? "" : "border__right"} element ${
        array[2] === 0 ? "not__null" : ""
    }">
                ${array[2] === 0 ? "" : array[2]}
            </div>
        </div>
    </div>
  `;

    return html;
}

async function RenderSudoku(level) {
    const request = await instance.get("/generator", { fill: level });
    const tasks = request.data.task;

    let html = `<div class="row row_border_x">`;
    let count = 0;
    tasks.map((array, index) => {
        html =
            html +
            `<div class="row main__row ${
                (index + 1) % 3 === 0 && index != 8 ? "border__bottom" : ""
            } ">`;
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
