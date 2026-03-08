const mainContainer = document.getElementById("main-container")




async function loadData() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const result = await res.json();


    displayAllElement(result.data);
}

function displayAllElement(issues) {
    console.log("Displaying issues:", issues);

    issues.map(issue => {

        let priorityColor = "";
        let BorderColor = "";
        let statusImg = "";

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
        card.className = `shadow bg-white rounded border-t-6 ${borderColor}`;
        card.innerHTML = `<div class="flex items-center justify-between p-5">
                        <img src="${statusImg}" alt="">
                        <div class="rounded-full px-7 py-1 ${priorityColor}  text-[15px]" id = "priority">${issue.priority.toUpperCase()}</div>
                    </div>

                    <div class="px-5 h-50">
                        <p class="font-semibold text-2xl mb-3 h-15">${issue.title}</p>
                        <p class="line-clamp-2 text-[#64748B] mb-4">${issue.description}</p>

                        <div class="flex items-center gap-2 pb-5">
                            <div class="rounded-full px-3 py-1 bg-red-200 text-red-500 text-[15px] flex items-center gap-1"><img src="assets/Vector (1).png" alt=""> BUG</div>

                            <div class="rounded-full px-3 py-1 bg-orange-200 text-orange-500 text-[15px] flex items-center gap-1"><img src="assets/Vector.png" alt=""> HELP WANTED</div>
                        </div>
                        </div>

                        <div class="border-t border-gray-200 p-5">
                            <p class="text-[#64748B] pb-1">#${issue.id} by ${issue.author}</p>
                            <p class="text-[#64748B]">${issue.updatedAt.replace('T', ' T:').replace('Z', ' ')}</p>
                        </div>`;

        mainContainer.appendChild(card)
    });
}

loadData();