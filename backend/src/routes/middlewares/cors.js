
export const enableCors = async (req, res, next) => {
    // Substituir com a origem permitida do front
    res.header('Access-Control-Allow-Origin', '*');

    // Especificar os métodos permitidos
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); 
    
    // Especificar os cabeçalhos permitidos
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
    next();
}