const mainContainer = document.getElementById("main-container")




async function loadData() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const result = await res.json();


    displayAllElement(result.data);
}

function displayAllElement(issues) {
    console.log("Displaying issues:", issues);

    issues.map(issue => {
        console.log(issue);
        const card = document.createElement("div");
        card.className = "shadow bg-white rounded border-t-6 border-green-600";
        card.innerHTML = `<div class="flex items-center justify-between p-5">
                        <img src="/assets/Open-Status.png" alt="">
                        <div class="rounded-full px-7 py-1 bg-red-200 text-red-500 text-[15px]">HIGH</div>
                    </div>

                    <div class="px-5">
                        <p class="font-semibold text-2xl mb-3">Fix navigation menu on mobile devices</p>
                        <p class="line-clamp-2 text-[#64748B] mb-4">The navigation menu doesn't collapse properly on mobile devices</p>

                        <div class="flex items-center gap-2 pb-5">
                            <div class="rounded-full px-3 py-1 bg-red-200 text-red-500 text-[15px] flex items-center gap-1"><img src="assets/Vector (1).png" alt=""> BUG</div>

                            <div class="rounded-full px-3 py-1 bg-orange-200 text-orange-500 text-[15px] flex items-center gap-1"><img src="assets/Vector.png" alt=""> HELP WANTED</div>
                        </div>
                        </div>

                        <div class="border-t border-gray-200 p-5">
                            <p class="text-[#64748B] pb-1">#1 by john_doe</p>
                            <p class="text-[#64748B]">1/15/2024</p>
                        </div>`;

        mainContainer.appendChild(card)
    });
}

loadData();