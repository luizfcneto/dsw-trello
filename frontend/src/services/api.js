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

export const getUserByToken = async (token) => {
    const url = `${process.env.API_URL}/user/`;
    try {
        const response = await axios.get(url, {
            headers: { 'Authorization': `Bearer ${token}`}
        })
        return response.data;

    }catch(error){
        console.error(`${error.name} - ${error.message}`);
        return error;
    }

}   

export const getUserCollectionBoards = async (token) => {
    const url = `${process.env.API_URL}/collection/user/boards`;
    try{
        const response = await axios.get(url, {
            headers: { 'Authorization': `Bearer ${token}`}
        });
        console.log(response);
        return response.data;

    }catch(error){
        console.error(`${error.name} - ${error.message}`);
        return error;
    }
}

export const createBoardCollection = async (token, request) => {
    const url = `${process.env.API_URL}/board/`;
    try{
        const response = await axios.post(url, request, {
            headers: { 'Authorization': `Bearer ${token}`}
        });
        return response.data;
    }catch(error){
        console.error(`${error.name} - ${error.message}`);
        return error;
    }
}

export const getUserRecoveryToken = async (request) => {
    const url = `${process.env.API_URL}/user/recoverPassword`;
    try {
        const response = await axios.post(url, request);
        return response;
    } catch(error) {
        console.error(`${error.name} - ${error.message}`);
        return error;
    }
}

export const saveUserPasswordRecoveryToken = async (request) => {
    const url = `${process.env.API_URL}/user/savePassword`;
    try {
        const response = await axios.post(url, request);
        return response;
    }catch(error){
        console.error(`${error.name} - ${error.message}`);
        return error;
    }
}