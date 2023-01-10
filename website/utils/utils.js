import axios from "axios";

export const checkIfUserLogged = async () => {
    try {
        const response = await axios.get("/api/session");
        return response.data
    }
    catch (e) {
        throw new Error("User Not Connected");
    }
}