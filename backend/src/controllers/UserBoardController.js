import { userBoardRepository } from '../services/UserBoardServices.js';

export default { 

    async getAllUserBoards(req, res, next){
        const userId = req.params.userId;
        try {
            const userBoards = await userBoardRepository.getAllBoardsOfUser(userId);

            res.status(200).json({
                boards: userBoards.boards
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "Erro ao obter os quadros do usuário."
            });
        }
    }
}
