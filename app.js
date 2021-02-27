fetch("http://jsonplaceholder.typicode.com/users")
	.then((res) => res.json())
	.then((data) => loadUsers(data));

const rowBgColors = [
	"table-primary",
	"table-secondary",
	"table-success",
	"table-danger",
	"table-warning",
	"table-info",
];

function loadUsers(users) {
	const table = document.createElement("table");
	table.className = "table table-hover";
	table.innerHTML = `<thead>
        <tr>
            <th scope="col"># </th>
            <th scope="col">Name </th>
            <th scope="col">User Name </th>
            <th scope="col">Email</th>
            <th scope="col">Phone </th>
        </tr>
        <tr> 
            <th> </th>
            <th>
                <input data-field="name" class="form-control"> </input>
            </th>
            <th>
                <input data-field="username" class="form-control"> </input>
            </th>
            <th>
                <input data-field="email" class="form-control"> </input>
            </th>
            <th>
                <input data-field="phone" class="form-control"> </input>
            </th>

        </tr>
    </thead>
    `;

	const tbody = document.createElement("tbody");
	table.append(tbody);
	renderUsers(users);
	document.body.append(table);

	const inputs = document.querySelectorAll("input");
	inputs.forEach((input) => {
		input.addEventListener("input", (event) => {
			filterTable(event.target.dataset.field, event.target.value);
		});

		/*input.addEventListener("keyup", (event) => {
			if (event.keyCode === 13) {
				filterTable(event.target.dataset.field, event.target.value);
			}
		});*/
	});

	function randomColor(colors) {
		const colorIndex = Math.floor(Math.random() * rowBgColors.length);
		return colors[colorIndex];
	}
	function renderUsers(users) {
		const content = users
			.map(
				(user, index) =>
					`
                    <tr class="${randomColor(rowBgColors)}"> 
                        <th> ${index + 1} </th>
                        <td> ${user.name} </td> 
                        <td> ${user.username} </td> 
                        <td> ${user.email} </td> 
                        <td> ${user.phone} </td> 
                    </tr>
                `
			)
			.join("");

		tbody.innerHTML = content;
	}

	function filterTable(field, value) {
		const newUsers = users.filter((user) => {
			return user[field].toLowerCase().includes(value.toLowerCase());
		});
		renderUsers(newUsers);
	}
}
