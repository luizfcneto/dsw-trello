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

export const getBoardInfoAPI = async (userToken, boardToken) => {
    const url = `${process.env.API_URL}/board/list/${boardToken}`;
    try {
        const response = await axios.get(url, {
            headers: { 'Authorization': `Bearer ${userToken}`}
        });
        return response;
    }catch(error){
        console.error(`${error.name} - ${error.message}`);
        return error;
    }
}

export const updateBoardInfoAPI = async (userToken, boardToken, updateBoardRequest) => {
    const url = `${process.env.API_URL}/board/update/${boardToken}`;
    console.log(updateBoardRequest);
    try{
        const response = await axios.put(url, updateBoardRequest, {
            headers: { 'Authorization': `Bearer ${userToken}`}
        });
        return response;

    }catch(error){
        console.error(`${error.name} - ${error.message}`);
        return error;    
    }
}

export const createNewListAPI = async (userToken, boardToken, createNewListRequest) => {
    const url = `${process.env.API_URL}/list/save/${boardToken}`;
    try{
        const response = await axios.post(url, createNewListRequest, {
            headers: { 'Authorization': `Bearer ${userToken}`}
        });
        return response;

    }catch(error){
        console.error(`${error.name} - ${error.message}`);
        return error;    
    }
}

export const updateListInfoAPI = async (userToken, boardToken, updateListRequestBody) => {
    const url = `${process.env.API_URL}/list/save/${boardToken}`;
    console.log(updateListRequestBody);
    console.log(userToken);
    console.log(boardToken);
    try {
        const response = await axios.post(url, updateListRequestBody, {
            headers: { 'Authorization': `Bearer ${userToken}` }
        });
        return response;

    } catch(error) {
        console.error(`${error.name} - ${error.message}`);
    }
} 

export const removeListAPI = async (userToken, listId) => {
    const url = `${process.env.API_URL}/list/remove/${listId}`;
    console.log("Remover listId: ", listId);

    try {
        const response = await axios.delete(url, {
            headers: { 'Authorization': `Bearer ${userToken}` }
        });
        return response;

    } catch(error) {
        console.error(`${error.name} - ${error.message}`);
    }
} 

export const createNewCardAPI = async (userToken, cardRequestBody) => {
    const url = `${process.env.API_URL}/card/save/`;
    console.log("CLIENT: userToken: ", userToken);
    console.log("CLIENT: cardRequestBody: ", cardRequestBody);
    try{
        const response = await axios.post(url, cardRequestBody, {
            headers: { 'Authorization': `Bearer ${userToken}`}
        });
        return response;

    }catch(error){
        console.error(`${error.name} - ${error.message}`);
        return error;    
    }
}

export const updateCardAPI = async (userToken, updateCardRequestBody) => {
    console.log("CLIENT: userToken: ", userToken);
    console.log("CLIENT: updateCardRequestBody: ", updateCardRequestBody);
    const url = `${process.env.API_URL}/card/save/${updateCardRequestBody.card.id}`;

    try{
        const response = await axios.post(url, updateCardRequestBody, {
            headers: { 'Authorization': `Bearer ${userToken}`}
        });
        return response;

    }catch(error){
        console.error(`${error.name} - ${error.message}`);
        return error;    
    }
}

export const deleteCardAPI = async (userToken, cardId) => {
    console.log("CLIENT: userToken: ", userToken);
    console.log("CLIENT: cardId: ", cardId);
    const url = `${process.env.API_URL}/card/remove/${cardId}`;

    try{
        const response = await axios.delete(url, {
            headers: { 'Authorization': `Bearer ${userToken}`}
        });
        return response;

    }catch(error){
        console.error(`${error.name} - ${error.message}`);
        return error;    
    }
}