// api url: https://remoteok.com/api

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) {
		const data = JSON.parse(xhttp.responseText);
		// console.log(data);
		const containerArea = document.querySelector(".container");

		data.slice(1).forEach((job, i) => {
			console.log(job);
			const jobArea = document.createElement("section");
			jobArea.classList = "hover:cursor-pointer mb-3";
			if (job.position) {
				jobArea.innerHTML = `
            <div class="jobs flex justify-between items-center bg-gray-100 hover:bg-gray-50 py-6 px-5 rounded-xl">
					<div class="company-logo w-1/12">
						<img
							src="${job.company_logo}"
							alt="${job.company}"
							class="rounded-full border-2 border-gray-300 h-[60px] w-[60px] object-center object-contain"
						/>
					</div>
					<div class="job-info w-1/3">
						<h4 class="text-gray-800 font-extrabold text-md">${job.position}</h4>
						<p class="text-gray-800 text-md mb-2">${job.company}</p>
						<p class="flex gap-2 items-center">
							<span class="rounded-full py-0.5 px-2.5 text-sm border border-gray-600">${
								job.location ? job.location : "Worldwide"
							}</span>
							<span class="rounded-full py-0.5 px-2.5 text-sm border border-gray-600">${
								(job.salary_min === 0) & (job.salary_max === 0)
									? "Negotiable"
									: job.salary_min === job.salary_max
									? job.salary_max
									: "$" + job.salary_min + " - $" + job.salary_max
							}</span>
						</p>
					</div>
					<div class="job-tags w-1/3">
						<div class="flex gap-2 items-center flex-wrap">${job.tags
							.map((tag) => {
								return `<span
								class="rounded-full py-0.5 px-2.5 items-stretch text-sm border-2 border-gray-600 hover:bg-gray-600 hover:text-gray-50 transition duration-150">${tag}</span>`;
							})
							.join("")}
							
						</div>
					</div>
					<div class="job-apply-section w-1/12">
						<p class="text-gray-800 text-md">
                            ${new Date(job.date).toLocaleString()}
                        </p>
					</div>
					<div class="job-apply-section w-1/12">
						<a
							href="${job.apply_url}"
							class="bg-rose-700 w-full inline-block text-center rounded-lg px-6 py-3 text-green-50 hover:bg-rose-600 transition duration-300">
                            Apply
                        </a>
					</div>
				</div>
            `;
			}
			containerArea.appendChild(jobArea);
		});
	}
};
xhttp.open("GET", "https://remoteok.com/api", true);
xhttp.send();
