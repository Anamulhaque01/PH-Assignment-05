const mainContainer = document.getElementById("main-container");
const openContainer = document.getElementById("open-container");
const closeContainer = document.getElementById("close-container");
const allIssue = document.getElementById("all-issue");
const openIssue = document.getElementById("open-issue");
const closeIssue = document.getElementById("close-issue");
const issueCounter = document.getElementById("Issue-counter");
const loadingSpinner = document.getElementById("loadingSpinner");
const searchInput = document.querySelector("[data-search]");

let users = [];

function updateSearchCount() {
    let activeContainer;
    if (!mainContainer.classList.contains("hidden")) activeContainer = mainContainer;
    else if (!openContainer.classList.contains("hidden")) activeContainer = openContainer;
    else activeContainer = closeContainer;
    const visibleCards = activeContainer.querySelectorAll('.shadow:not(.hidden)').length;
    issueCounter.innerText = visibleCards;
}

function allContainer() {
    allIssue.className = "border bg-[#4A00FF] rounded w-[120px] h-10 text-white hover:cursor-pointer";
    openIssue.className = "border border-[#E4E4E7] rounded w-[120px] h-10 text-[#64748B] hover:cursor-pointer hover:bg-gray-200";
    closeIssue.className = "border border-[#E4E4E7] rounded w-[120px] h-10 text-[#64748B] hover:cursor-pointer hover:bg-gray-200";
    mainContainer.classList.replace("hidden", "grid");
    openContainer.classList.replace("grid", "hidden");
    closeContainer.classList.replace("grid", "hidden");
    updateSearchCount();
}

function openedContainer() {
    allIssue.className = "border border-[#E4E4E7] rounded w-[120px] h-10 text-[#64748B] hover:cursor-pointer hover:bg-gray-200";
    openIssue.className = "border bg-[#4A00FF] rounded w-[120px] h-10 text-white hover:cursor-pointer";
    closeIssue.className = "border border-[#E4E4E7] rounded w-[120px] h-10 text-[#64748B] hover:cursor-pointer hover:bg-gray-200";
    openContainer.classList.replace("hidden", "grid");
    mainContainer.classList.replace("grid", "hidden");
    closeContainer.classList.replace("grid", "hidden");
    updateSearchCount();
}

function closedContainer() {
    allIssue.className = "border border-[#E4E4E7] rounded w-[120px] h-10 text-[#64748B] hover:cursor-pointer hover:bg-gray-200";
    openIssue.className = "border border-[#E4E4E7] rounded w-[120px] h-10 text-[#64748B] hover:cursor-pointer hover:bg-gray-200";
    closeIssue.className = "border bg-[#4A00FF] rounded w-[120px] h-10 text-white hover:cursor-pointer";
    closeContainer.classList.replace("hidden", "grid");
    openContainer.classList.replace("grid", "hidden");
    mainContainer.classList.replace("grid", "hidden");
    updateSearchCount();
}

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    users.forEach(user => {
        const isMatch = user.name.toLowerCase().includes(value);
        user.element.classList.toggle("hidden", !isMatch);
    });
    updateSearchCount();
});

async function loadData() {
    loadingSpinner.classList.replace("hidden", "flex");
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const result = await res.json();
    loadingSpinner.classList.replace("flex", "hidden");
    displayAllElement(result.data);
    allContainer();
}

function displayAllElement(issues) {
    mainContainer.innerHTML = "";
    openContainer.innerHTML = "";
    closeContainer.innerHTML = "";
    users = [];

    issues.forEach(issue => {
        let priorityColor = "";
        let statusImg = "";
        let labelsHTML = "";

        if (issue.labels.includes("bug")) labelsHTML += `<div class="rounded-full px-3 py-1 bg-red-200 text-red-500 text-[15px] flex items-center gap-1"><img src="assets/Vector (1).png" alt=""> BUG</div>`;
        if (issue.labels.includes("enhancement")) labelsHTML += `<div class="rounded-full px-3 py-1 bg-green-200 text-green-500 text-[15px] flex items-center gap-1"><img src="assets/Vector-3.png" alt=""> ENHANCEMENT</div>`;
        if (issue.labels.includes("help wanted")) labelsHTML += `<div class="rounded-full px-3 py-1 bg-orange-200 text-orange-500 text-[15px] flex items-center gap-1"><img src="assets/Vector.png" alt=""> HELP WANTED</div>`;
        if (issue.labels.includes("documentation")) labelsHTML += `<div class="rounded-full px-3 py-1 bg-blue-200 text-blue-500 text-[15px] flex items-center gap-1"><i class="fa-regular fa-clipboard"></i> DOCUMENTED</div>`;
        if (issue.labels.includes("good first issue")) labelsHTML += `<div class="rounded-full px-3 py-1 bg-gray-200 text-gray-500 text-[15px] flex items-center gap-1">GOOD FIRST ISSUE</div>`;

        let borderColor = issue.status.toLowerCase() === "open" ? "border-green-600" : "border-purple-600";
        statusImg = issue.status.toLowerCase() === "open" ? "/assets/Open-Status.png" : "/assets/Closed- Status .png";

        if (issue.priority.toLowerCase() === "high") priorityColor = "bg-red-200 text-red-500";
        else if (issue.priority.toLowerCase() === "medium") priorityColor = "bg-orange-100 text-orange-600";
        else priorityColor = "bg-gray-100 text-gray-600";

        const card = document.createElement("div");
        card.className = `shadow bg-white rounded border-t-6 ${borderColor} hover:cursor-pointer`;
        card.innerHTML = `
            <div class="flex flex-wrap items-center justify-between p-5">
                <img src="${statusImg}" alt="">
                <div class="rounded-full px-7 py-1 ${priorityColor} text-[15px]">${issue.priority.toUpperCase()}</div>
            </div>
            <div class="px-5 min-h-50">
                <p class="line-clamp-2 font-semibold text-2xl mb-3 min-h-15">${issue.title}</p>
                <p class="line-clamp-2 text-[#64748B] mb-4">${issue.description}</p>
                <div class="flex flex-wrap items-center gap-2 pb-5">${labelsHTML}</div>
            </div>
            <div class="border-t border-gray-200 p-5">
                <p class="text-[#64748B] pb-1">#${issue.id} by ${issue.author}</p>
                <p class="text-[#64748B]">${issue.updatedAt.replace('T', ' T:').replace('Z', ' ')}</p>
            </div>`;

        const openModal = () => {
            const modal = document.getElementById("my_modal_1");
            const statusElement = document.getElementById("modal-status");

            document.getElementById("modal-title").innerText = issue.title;
            document.getElementById("modal-description").innerText = issue.description;

            if (issue.status.toLowerCase() === "open") {
                statusElement.innerText = "Opened";
                statusElement.className = "text-white rounded-full px-3 bg-green-600";
            } else {
                statusElement.innerText = "Closed";
                statusElement.className = "text-white rounded-full px-3 bg-purple-600";
            }

            document.getElementById("modal-author").innerText = `Opened by ${issue.author}`;
            document.getElementById("modal-date").innerText = issue.updatedAt.split('T')[0];
            document.getElementById("modal-labels").innerHTML = labelsHTML;
            document.getElementById("modal-assignee").innerText = issue.assignee;
            document.getElementById("modal-priority").innerHTML = `<div class="rounded-full px-7 py-1 ${priorityColor} text-[15px]">${issue.priority.toUpperCase()}</div>`;

            modal.showModal();
        };

        card.addEventListener("click", openModal);
        mainContainer.appendChild(card);
        users.push({ name: issue.title, element: card });

        if (issue.status.toLowerCase() === "open") {
            const clone = card.cloneNode(true);
            clone.addEventListener("click", openModal);
            openContainer.appendChild(clone);
            users.push({ name: issue.title, element: clone });
        } else {
            const clone = card.cloneNode(true);
            clone.addEventListener("click", openModal);
            closeContainer.appendChild(clone);
            users.push({ name: issue.title, element: clone });
        }
    });
}

loadData();