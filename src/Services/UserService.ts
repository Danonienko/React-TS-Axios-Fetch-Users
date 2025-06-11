import axios from "axios";
import type { NewUser, User } from "../Interfaces/User";

const API_URL = "http://localhost:5015/api/users";

const userService = {
	getAllUsers: async (): Promise<User[]> => {
		try {
			const response = await axios.get<User[]>(API_URL);
			return response.data;
		} catch (error) {
			console.error("Error fetching users:", error);
			throw error;
		}
	},

	getUserById: async (id: number): Promise<User> => {
		try {
			const response = await axios.get<User>(`${API_URL}/${id}`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching user with ID ${id}:`, error);
			throw error;
		}
	},

	createUser: async (user: NewUser): Promise<User> => {
		try {
			const response = await axios.post<User>(API_URL, user);
			return response.data;
		} catch (error) {
			console.error("Error creating user:", error);
			throw error;
		}
	},

	updateUser: async (id: number, user: User): Promise<User> => {
		try {
			const response = await axios.put<User>(`${API_URL}/${id}`, user);
			return response.data;
		} catch (error) {
			console.error(`Error updating user with ID ${id}:`, error);
			throw error;
		}
	},

	deleteUser: async (id: number): Promise<void> => {
		try {
			await axios.delete(`${API_URL}/${id}`);
		} catch (error) {
			console.error(`Error deleting user with ID ${id}:`, error);
			throw error;
		}
	}
};

export default userService;
