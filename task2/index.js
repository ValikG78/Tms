const drawList = (dataType) => {
	const todoSection = document.querySelector("#todo");

	todoSection.innerHTML = "";

	dataType.forEach((element) => {
	todoSection.innerHTML += `
				<div class="card">
				<span>Title:</span>
					<span class="title">${element.title}</span>
					</br>
					<span>Description:</span>
					<span class="description">${element.description}</span>
					</br>
					<button class = "editButton">Edit</button>
					<button class="deleteButton">Delete</button>
					<button class="nextButton">Next</button>
				</div>
			`;
	});
};

const init = () => {
	const modalWrapper = document.querySelector(".wrapper");
	const todoList = document.querySelector(".todoList");
	const form = document.querySelector("#form");
	const inputTitle = document.querySelector("#inputTitle");
	const inputModalDescription = document.querySelector("#inputDescription");
	const addCardButton = document.querySelector("#addCardButton");

	const data = {
	todo: [],
	inProgress: [],
	done: [],
	};

	addCardButton.addEventListener("click", (event) => {
	  event.preventDefault(); // препятствует перезагрузке страницы при нажатии на кнопку в форме

	data.todo.push({
		title: inputTitle.value,
		description: inputDescription.value,
	});

	form.reset();

	drawList(data.todo);

	todoList.addEventListener("click", (event) => {
		switch (event.target.classList.value) {
		case "deleteButton":
			const card = event.target.closest(".card");
			const title = card.querySelector(".title").textContent;
			const description = card.querySelector(".description").textContent;

			data.todo.forEach((el, i) => {
			if (el.title === title && el.description === description) {
				data.todo.splice(i, 1);
			}
			});

			drawList(data.todo);

			break;
		case "editButton":
			modalWrapper.style.display = "block";
			const closeButton = document.querySelector("#closeButton")
			closeButton.addEventListener("click", () => {
				modalWrapper.style.display = "none"
			});
			
			const cardM = event.target.closest(".card");
			const titleM = cardM.querySelector(".title").textContent;
			const descriptionM = cardM.querySelector(".description").textContent;
			const inputModalTitle = document.querySelector("#inputModalTitle");
			const inputModalDescription = document.querySelector("#inputModalDescription");
			inputModalTitle.value = titleM;
			inputModalDescription.value = descriptionM;
			const modalSubmit = document.querySelector("#modalSubmit");
			modalSubmit.addEventListener("click", () => {
				data.todo.forEach((el, i) => {
					if (el.title === titleM && el.description === descriptionM) {
						data.todo.splice(i, 1, {title:inputModalTitle.value, description:inputModalDescription.value});
					}
					});
					modalWrapper.style.display = 'none';
					drawList(data.todo)
			});
			break;
		default:
			break;
		}
	});
	});
	
};

init();