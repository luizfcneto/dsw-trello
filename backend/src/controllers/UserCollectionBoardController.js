import { userBoardRepository } from "../services/UserBoardServices.js";

export default {
    async getAllUserCollectionBoards(req, res, next){
        const userId = req.headers.userId;
        console.log('getAllUserCollectionBoards executada, id: ', userId);
        try{
            const userCollectionBoards = await userBoardRepository.getAllUserCollectionsBoards(userId);
            res.status(200).json({
                collectionBoards: userCollectionBoards.collections
            })

        }catch(error){
            console.error(`${error.name} - ${error.message}`);
            res.status(500).json({
                message: "Something went wrong, try again later..."
            });
        }
    }

}