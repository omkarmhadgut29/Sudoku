import { instance } from "./axios_instance.js";

async function onSubmitClick(curr_event, elements) {
    let task = [];
    let count = 0;
    let nums = [];
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
    let request = await instance.post("/verifier", {
        task: task,
    });
    if (request.data.isValid) {
        swal.fire("Congrats!", ", You Won!", "success").then(function () {
            location.reload();
        });
    } else {
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
