import { instance } from "./axios_instance.js";

async function onSubmitClick(curr_event, elements) {
    let task = []; // user task
    let count = 0;
    let nums = [];

    // Getting User Answer and store into task array
    Array.from(elements).forEach(function (element) {
        let num = element.innerHTML.trim() || 0;
        nums.push(parseInt(num));
        count++;
        if (count === 9) {
            task.push(nums);
            nums = [];
            count = 0;
        }
    });

    // Verifiying user response (that is task array) from API
    let request = await instance.post("/verifier", {
        task: task,
    });

    // Getting response as Valid answer or not
    if (request.data.isValid) {
        swal.fire("Congrats!", ", You Won!", "success").then(function () {
            location.reload();
        });
    } else {
        /**
         * If answer is wrong then, there are Two options
         * Retry:
                Same Code and try again.
         * Reset:
                Reset Sudoku.
         */
        swal.fire({
            title: " Oops!",
            text: " Wrong answer! Try again.",
            showDenyButton: true,
            confirmButtonText: "Retry",
            denyButtonText: `Reset`,
        }).then((result) => {
            if (!result.isConfirmed) {
                location.reload();
            }
        });
    }
}

export default onSubmitClick;
