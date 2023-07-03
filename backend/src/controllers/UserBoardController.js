import { userBoard } from '../models/userBoard.js';

export default { 

    async postUserBoard(){
        try {
            await BoardUser.create({ UserId: userId, BoardId: boardId });
            res.status(201).send('Associação entre usuário e quadro criada com sucesso.');
          } catch (error) {
            res.status(500).send('Erro ao criar associação entre usuário e quadro.');
          }
    },

    async getBoards(req, res, next){
        const userId = req.params.id;
        try {
            const userBoards = await BoardUser.findAll({
                where: { UserId: userId },
                include: [Board]
            });

            res.status(200).json({
                board: userBoards
            });
        } catch (error) {
            res.status(500).send('Erro ao obter os quadros do usuário.');
        }
    }

}
