import { useEffect, useState } from "react";
import './App.css';
import type { User } from "./Interfaces/User";
import userService from "./Services/UserService";
import type { AxiosError } from "axios";

function App() {
	const [users, setUsers] = useState<User[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		userService.getAllUsers()
			.then((userList) => setUsers(userList))
			.catch((err: AxiosError) => setError(err.message))
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	if (isLoading) {
		return (
			<div className="container mt-5">
				<div
					className="d-flex justify-content-center align-items-center"
				>
					<div
						className="spinner-border"
						role="status"
					>
						<span className="visually-hidden">Loading...</span>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="container mt-5">
				<div
					className="alert alert-danger"
					role="alert"
				>
					<strong>Error:</strong> {error}
				</div>
			</div>
		);
	}

	return (
		<div className="container mt-5">
			<h1>User List</h1>

			<table className="table table-bordered">
				<thead className="table-light">
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Email</th>
						<th>Account Type</th>
					</tr>
				</thead>

				<tbody>
					{users.length === 0 ? (
						<tr>
							<td colSpan={4} className="text-center">No users found</td>
						</tr>
					) : users.map((user) => (
						<tr key={user.id}>
							<td>{user.id}</td>
							<td>{user.name}</td>
							<td>{user.email}</td>
							<td>{user.accountType}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default App;
