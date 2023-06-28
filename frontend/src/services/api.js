import axios from "axios";

export const createUser = async (user) => {
    const url = `${process.env.API_URL}/user/`;
    try{
        const response = await axios.post(url, user);
        return response;

    }catch(error){
        console.error(`${error.name} - ${error.message}`);
        return error;
    }
}

export const doLogin = async (login) => {
    const url = `${process.env.API_URL}/user/login`;
    try{
        const response = await axios.post(url, login);
        return response;

    }catch(error){
        console.error(`${error.name} - ${error.message}`);
        return error;
    }
}