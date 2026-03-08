const mainContainer = document.getElementById("main-container")
const openContainer = document.getElementById("open-container")
const closeContainer = document.getElementById("close-container")

const allIssue = document.getElementById("all-issue")
const openIssue = document.getElementById("open-issue")
const closeIssue = document.getElementById("close-issue")

const issueCounter = document.getElementById("Issue-counter")



const countMainContainer = mainContainer.children.length;
issueCounter.innerText = countMainContainer;

const loadingSpinner = document.getElementById("loadingSpinner");



function allContainer() {
    const countMainContainer = mainContainer.children.length;
    issueCounter.innerText = countMainContainer;

    allIssue.className = "border bg-[#4A00FF] rounded w-[120px] h-10 text-white hover:cursor-pointer"
    openIssue.className = "border border-[#E4E4E7] rounded w-[120px] h-10 text-[#64748B] hover:cursor-pointer hover:bg-gray-200"
    closeIssue.className = "border border-[#E4E4E7] rounded w-[120px] h-10 text-[#64748B] hover:cursor-pointer hover:bg-gray-200"

    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");

    mainContainer.classList.remove("hidden");
    mainContainer.classList.add("grid");

    openContainer.classList.remove("grid");
    openContainer.classList.add("hidden");

    closeContainer.classList.remove("grid");
    closeContainer.classList.add("hidden");

    loadingSpinner.classList.add("hidden");
    loadingSpinner.classList.remove("flex");
}

function openedContainer() {
    const countMainContainer = openContainer.children.length;
    issueCounter.innerText = countMainContainer;

    allIssue.className = "border border-[#E4E4E7] rounded w-[120px] h-10 text-[#64748B] hover:cursor-pointer hover:bg-gray-200"
    openIssue.className = "border bg-[#4A00FF] rounded w-[120px] h-10 text-white hover:cursor-pointer"
    closeIssue.className = "border border-[#E4E4E7] rounded w-[120px] h-10 text-[#64748B] hover:cursor-pointer hover:bg-gray-200"

    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");

    openContainer.classList.remove("hidden");
    openContainer.classList.add("grid");

    mainContainer.classList.remove("grid");
    mainContainer.classList.add("hidden");

    closeContainer.classList.remove("grid");
    closeContainer.classList.add("hidden");

    loadingSpinner.classList.add("hidden");
    loadingSpinner.classList.remove("flex");
}

function closedContainer() {
    const countMainContainer = closeContainer.children.length;
    issueCounter.innerText = countMainContainer;

    allIssue.className = "border border-[#E4E4E7] rounded w-[120px] h-10 text-[#64748B] hover:cursor-pointer hover:bg-gray-200"
    openIssue.className = "border border-[#E4E4E7] rounded w-[120px] h-10 text-[#64748B] hover:cursor-pointer hover:bg-gray-200"
    closeIssue.className = "border bg-[#4A00FF] rounded w-[120px] h-10 text-white hover:cursor-pointer"

    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");

    closeContainer.classList.remove("hidden");
    closeContainer.classList.add("grid");

    openContainer.classList.remove("grid");
    openContainer.classList.add("hidden");

    mainContainer.classList.remove("grid");
    mainContainer.classList.add("hidden");

    loadingSpinner.classList.add("hidden");
    loadingSpinner.classList.remove("flex");
}



const searchInput = document.querySelector("[data-search]")
let users = []

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();

    users.forEach(user => {
        const isMatch = user.name.toLowerCase().includes(value);
        user.element.classList.toggle("hidden", !isMatch);
    });
});







async function loadData() {
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const result = await res.json();

    loadingSpinner.classList.add("hidden");
    loadingSpinner.classList.remove("flex");
    displayAllElement(result.data);

    allContainer();
}

function displayAllElement(issues) {
    console.log("Displaying issues:", issues);

    users = issues.map(issue => {

        let priorityColor = "";
        let BorderColor = "";
        let statusImg = "";
        let hasBug = "";
        let help = "";
        let enhancement = "";
        let goodFirstIssue = "";
        let documented = ""


        if (issue.labels.includes("bug") === true) {
            hasBug = `<div class="rounded-full px-3 py-1 bg-red-200 text-red-500 text-[15px] flex items-center gap-1"><img src="assets/Vector (1).png" alt=""> BUG</div>`
        }

        if (issue.labels.includes("enhancement") === true) {
            enhancement = `<div class="rounded-full px-3 py-1 bg-green-200 text-green-500 text-[15px] flex items-center gap-1"><img src="assets/Vector-3.png" alt=""> ENHANCEMENT</div>`
        }
        if (issue.labels.includes("help wanted") === true) {
            help = `<div class="rounded-full px-3 py-1 bg-orange-200 text-orange-500 text-[15px] flex items-center gap-1"><img src="assets/Vector.png" alt=""> HELP WANTED</div>`
        }

        if (issue.labels.includes("documentation") === true) {
            documented = `<div class="rounded-full px-3 py-1 bg-blue-200 text-blue-500 text-[15px] flex items-center gap-1"><i class="fa-regular fa-clipboard"></i> DOCUMENTED</div>`
        }

        if (issue.labels.includes("good first issue") === true) {
            goodFirstIssue = `<div class="rounded-full px-3 py-1 bg-gray-200 text-gray-500 text-[15px] flex items-center gap-1">GOOD FIRST ISSUE</div>`
        }

        if (issue.status.toLowerCase() === "open") {
            borderColor = "border-green-600";
            statusImg = "/assets/Open-Status.png"

        } else {
            borderColor = "border-purple-600";
            statusImg = "/assets/Closed- Status .png"
        }

        if (issue.priority.toLowerCase() === "high") {
            priorityColor = "bg-red-200 text-red-500";
        } else if (issue.priority.toLowerCase() === "medium") {
            priorityColor = "bg-orange-100 text-orange-600";
        } else {
            priorityColor = "bg-gray-100 text-gray-600";
        }

        console.log(issue);
        const card = document.createElement("div");
        card.className = `shadow bg-white rounded border-t-6 ${borderColor} hover:cursor-pointer`;
        card.innerHTML = `<div class="flex flex-wrap items-center justify-between p-5">
                        <img src="${statusImg}" alt="">
                        <div class="rounded-full px-7 py-1 ${priorityColor}  text-[15px]" id = "priority">${issue.priority.toUpperCase()}</div>
                    </div>

                    <div class="px-5 min-h-50">
                        <p class="line-clamp-2 font-semibold text-2xl mb-3 min-h-15">${issue.title}</p>
                        <p class="line-clamp-2 text-[#64748B] mb-4">${issue.description}</p>

                        <div class="flex flex-wrap items-center  gap-2 pb-5">
                            ${hasBug}
                            ${enhancement}
                            ${help}
                            ${goodFirstIssue}
                            ${documented}
                        </div>
                        </div>

                        <div class="border-t border-gray-200 p-5">
                            <p class="text-[#64748B] pb-1">#${issue.id} by ${issue.author}</p>
                            <p class="text-[#64748B]">${issue.updatedAt.replace('T', ' T:').replace('Z', ' ')}</p>
                        </div>`;


        mainContainer.appendChild(card)
        if (issue.status.toLowerCase() === "open") {
            const openClone = card.cloneNode(true);
            openContainer.appendChild(openClone);
        }
        else if (issue.status.toLowerCase() === "closed") {
            const closedClone = card.cloneNode(true);
            closeContainer.appendChild(closedClone);
        }

        allContainer();

        return { name: issue.title, element: card }
    });
}


allContainer();
loadData();