import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./App.css";
import userService from "./Services/UserService";
import { AccountType, type NewUser } from "./Interfaces/User";
import { useForm } from "react-hook-form";

type FormData = {
	Name: string;
	Email: string;
	Password: string;
	AccountType: AccountType;
};

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
					{data.map((user) => (
						<tr key={user.id}>
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

function UserFormModal() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<FormData>();

	const queryClient = useQueryClient();

	const createUserMutation = useMutation({
		mutationFn: (newUser: NewUser) => userService.createUser(newUser),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["Users"] });
			reset();
		},
		onError: (error) => {
			console.error(error);
			alert("Failed to create user. Please try again.");
		}
	});

	const onSubmit = handleSubmit((data) => {
		const newUser: NewUser = {
			name: data.Name,
			email: data.Email,
			password: data.Password,
			accountType: Number(data.AccountType)
		};

		createUserMutation.mutate(newUser);
	});

	return (
		<div className="modal fade" id="userFormModal" tabIndex={-1}>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="userFormModalLabel">
							New User
						</h5>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"></button>
					</div>

					<form onSubmit={onSubmit}>
						<div className="modal-body">
							<div className="mb-3">
								<label htmlFor="name" className="form-label">
									Name
								</label>
								<input
									type="text"
									className={`form-control ${
										errors.Name ? "is-invalid" : ""
									}`}
									id="name"
									{...register("Name", {
										required: "Name is required"
									})}
								/>
								{errors.Name && (
									<div className="invalid-feedback">
										{errors.Name.message}
									</div>
								)}
							</div>

							<div className="mb-3">
								<label htmlFor="email" className="form-label">
									Email
								</label>
								<input
									type="email"
									className={`form-control ${
										errors.Email ? "is-invalid" : ""
									}`}
									id="email"
									{...register("Email", {
										required: "Email is required",
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
											message: "Invalid email address"
										}
									})}
								/>
								{errors.Email && (
									<div className="invalid-feedback">
										{errors.Email.message}
									</div>
								)}
							</div>

							<div className="mb-3">
								<label
									htmlFor="password"
									className="form-label">
									Password
								</label>
								<input
									type="password"
									className={`form-control ${
										errors.Password ? "is-invalid" : ""
									}`}
									id="password"
									{...register("Password", {
										required: "Password is required",
										minLength: {
											value: 6,
											message:
												"Password must be at least 6 characters"
										}
									})}
								/>
								{errors.Password && (
									<div className="invalid-feedback">
										{errors.Password.message}
									</div>
								)}
							</div>

							<div className="mb-3">
								<label
									htmlFor="accountType"
									className="form-label">
									Account Type
								</label>
								<select
									id="accountType"
									className={`form-select ${
										errors.AccountType ? "is-invalid" : ""
									}`}
									{...register("AccountType", {
										required: "Account type is required",
										valueAsNumber: true
									})}>
									<option value="">
										Select account type...
									</option>
									<option value={AccountType.Guest}>
										Guest
									</option>
									<option value={AccountType.User}>
										User
									</option>
									<option value={AccountType.Admin}>
										Admin
									</option>
								</select>
								{errors.AccountType && (
									<div className="invalid-feedback">
										{errors.AccountType.message}
									</div>
								)}
							</div>
						</div>

						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal">
								Close
							</button>
							<button
								type="submit"
								className="btn btn-primary"
								disabled={createUserMutation.isPending}>
								{createUserMutation.isPending ? (
									<>
										<span
											className="spinner-border spinner-border-sm me-2"
											role="status"></span>
										Saving...
									</>
								) : (
									"Save User"
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default App;

