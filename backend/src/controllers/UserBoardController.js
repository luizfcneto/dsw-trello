import { userBoardRepository } from '../services/UserBoardServices.js';

export default { 

    async getBoards(req, res, next){
        const userId = req.params.userId;
        try {
            const userBoards = await userBoardRepository.findAll(userId);

            res.status(200).json({
                board: userBoards
            });
        } catch (error) {
            console.log(error)
            res.status(500).send('Erro ao obter os quadros do usuário.');
        }
    }
}
