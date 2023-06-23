

export const enableCors = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Substitua com a origem permitida do seu frontend
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Especifique os métodos permitidos
    res.header('Access-Control-Allow-Headers', 'Content-Type'); // Especifique os cabeçalhos permitidos
    next();
}