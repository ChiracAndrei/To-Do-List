

document.addEventListener("DOMContentLoaded", () => {

    let list = document.getElementById("in_progress_list");

    let liEl = list.appendChild(document.createElement("li"));
    liEl.style.display = "none";

    liEl.textContent = "Nici un task in progres";

    window.addEventListener("click", () => {
        if (list.childElementCount == 1) {
            liEl.style.display = "block";
        } else {
            liEl.style.display = "none";
        }
    });

    fetch('http://127.0.0.1:5500/initial/progres.json')
        .then((response) => response.json())
        .then((data) => {
            const tasks = data.tasks
            tasks.forEach((task) => {

                let contentList = list.appendChild(document.createElement("li"));
                let h3El = contentList.appendChild(document.createElement("h3"));
                let p1El = contentList.appendChild(document.createElement("p"));
                let butonEl = contentList.appendChild(document.createElement("button"));

                h3El.innerHTML = task.title;
                p1El.innerHTML = task.description;
                butonEl.textContent = "Task finalizat";


                butonEl.setAttribute("class", "deleteTask")

                butonEl.addEventListener("click", function () {
                    contentList.remove();

                });
            });
        });

    let btn_Poluare = document.getElementById("get_external_task");
    function taskuri() {
        document.getElementById("external_task_list").style.display = "block"

        async function externalList() {
            const response = await fetch("http://127.0.0.1:5500/initial/extern.json");
            const data = await response.json();
            let tasks = data.tasks;

            tasks.forEach((task) => {
                let exList = document.getElementById("external_task_list");


                let contentExList = exList.appendChild(document.createElement("li"))

                contentExList.appendChild(document.createElement("h3")).textContent = task.title;
                contentExList.appendChild(document.createElement("p")).textContent = task.description;

                let moveBtn = contentExList.appendChild(document.createElement("button"));

                moveBtn.textContent = "Muta acest task in lista de taskuri in progres";
                moveBtn.setAttribute("class", "moveBtn")

                if (task.title === undefined || task.description === undefined) {
                    contentExList.remove();
                }


                contentExList.querySelector(".moveBtn").addEventListener("click", function () {
                    contentExList.remove();
                    list.appendChild(contentExList);
                    moveBtn.innerHTML = "Task finalizat";

                    moveBtn.addEventListener("click", function () {
                        contentExList.remove();
                    });
                    if (exList.childElementCount == 0) {
                        count.textContent = "Nici un task prezent"
                    }
                });
            });
            return tasks;
        }
        externalList();
    };

    btn_Poluare.addEventListener("click", () => { setTimeout(() => { taskuri() }, 5000) });

    function startTimer() {
        let numar = 5;
        const timer = setInterval(function () {
            numar--;

            count.innerHTML = `Task-urile externe vor fi aduse in ${numar} secunde!`;
            if (numar === 0) {
                clearInterval(timer);
                count.textContent = "Ati primit un set de sarcinii";
            }
        }, 1000);
    }
    btn_Poluare.onclick = function () {
        startTimer();
    };

    let btnInput = document.getElementById("btn_add");

    btnInput.textContent = " Adauga task"


    btnInput.addEventListener("click", () => {




        let titleInput = document.getElementById("titleInput");

        let textarea = document.getElementById("details");

        if (titleInput.value === '' || textarea.value === '') {
            alert("Informatii invalide. Asigurate ca ai completat toate campurile.");

        } else {

            let li = list.appendChild(document.createElement("li"));

            let h3 = li.appendChild(document.createElement("h3"));
            let p1 = li.appendChild(document.createElement("p"));
            let buton = li.appendChild(document.createElement("button"));

            h3.innerHTML = titleInput.value;
            p1.innerHTML = textarea.value;
            buton.textContent = "Task finalizat";

            li.setAttribute("class", "progresTask");
            buton.setAttribute("class", "deleteTask");

            buton.addEventListener("click", function () {
                li.remove();
            });

        }
        textarea.value = '';
        titleInput.value = '';
    });

});