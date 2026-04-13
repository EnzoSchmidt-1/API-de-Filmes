const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());

//---------------------------------------------------------------------

const db = require('./database'); 


// GET /api/filmes - Listar todos
app.get('/api/filmes', (req, res) => {
    try {
        // Preparar query
        const stmt = db.prepare('SELECT * FROM filmes');
        
        // Executar e pegar todos os resultados
        const filmes = stmt.all();
        
        // Retornar array (pode ser vazio [])
        res.json(filmes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao buscar filmes' });
    }
});

//---------------------------------------------------------------------

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});