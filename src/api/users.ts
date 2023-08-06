import { IUserData } from "../types/type";

export const getUsers = async (): Promise<IUserData[]> => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
};
