import { useQuery } from "@tanstack/react-query";
import "./App.css";
import userService from "./Services/UserService";
import { AccountType } from "./Interfaces/User";
import UserFormModal from "./Components/UserFormModal";

function App() {
	const { data, error, status } = useQuery({
		queryKey: ["Users"],
		queryFn: () => userService.getAllUsers()
	});

	if (status === "pending")
		return (
			<div className="d-flex justify-content-center align-items-center">
				<div className="spinner-border" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>
		);

	if (error)
		return (
			<div className="alert alert-danger" role="alert">
				<strong>Error:</strong> {error.message}
			</div>
		);

	return (
		<div className="container">
			<h1>User Data</h1>

			<table className="table table-bordered table-hover">
				<thead className="table-light">
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Email</th>
						<th>Account Type</th>
					</tr>
				</thead>

				<tbody>
					{data.map((user) => (
						<tr
							key={user.id}
							style={{ cursor: "pointer" }}
							data-bs-toggle="modal"
							data-bs-target="#userDetailsModal">
							<td>{user.id}</td>
							<td>{user.name}</td>
							<td>{user.email}</td>
							<td>{AccountType[user.accountType]}</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className="button-container d-flex justify-content-end">
				<button
					className="btn btn-primary"
					data-bs-toggle="modal"
					data-bs-target="#userFormModal">
					New User
				</button>
			</div>
			<UserFormModal />
		</div>
	);
}
export default App;

