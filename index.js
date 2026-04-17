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

//---------------------------------------------------------------------
//Segunda adição

// GET /api/filmes/:id 
app.get('/api/filmes/:id', (req, res) => {
  console.log("verificado com sucesso")
    try {
        // 1. Pegar ID da URL
        const id = parseInt(req.params.id);
        
        // 2. Preparar query com WHERE
        const stmt = db.prepare('SELECT * FROM filmes WHERE id = ?');
        
        // 3. Executar (retorna 1 objeto ou undefined)
        const filme = stmt.get(id);
        
        // 4. Verificar se encontrou
        if (!filme) {
            return res.status(404).json({ 
                erro: 'Filme não encontrado' 
            });
        }
        
        // 5. Retornar filme
        res.json(filme);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao buscar filme' });
    }
});

// POST 
app.post('/api/filmes', (req, res) => {
    try {
        // 1. Pegar dados do body
        const { titulo, ano, diretor, genero, nota =null} = req.body;
        
        // 2. Validações (igual antes!)
        if (!titulo || !ano || !diretor || !genero) {
            return res.status(400).json({ 
                erro: 'Campos obrigatórios faltando' 
            });
        }
        
        if (typeof ano !== 'number' || ano <= 0) {
            return res.status(400).json({ 
                erro: 'Ano inválido' 
            });
        }
        
        // 3. Preparar INSERT
        const stmt = db.prepare(`INSERT INTO filmes (titulo, ano, diretor, genero, nota) VALUES (?, ?, ?, ?, ?)`);
        
        // 4. Executar INSERT
        const result = stmt.run(titulo, ano, diretor, genero, nota)      
        // 5. Pegar ID gerado
        const id = result.lastInsertRowid;
        
        // 6. Buscar filme criado (para retornar completo)
        const filmeCriado = db.prepare(
            'SELECT * FROM filmes WHERE id = ?'
        ).get(id);
        
        // 7. Retornar 201 Created
        res.status(201).json(filmeCriado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao criar filme' });
    }
});

// DELETE
app.delete('/api/filmes/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const stmt = db.prepare('DELETE FROM filmes WHERE id = ?');
        stmt.run(id);
        res.json({ mensagem: 'Filme deletado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao deletar filme' });
    }
});

//PUT - update total
app.put('/api/filmes/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { titulo, ano, diretor, genero, nota } = req.body;
        const stmt = db.prepare('UPDATE filmes SET titulo = ?, ano = ?, diretor = ?, genero = ?, nota = ? WHERE id = ?');
        stmt.run(titulo, ano, diretor, genero, nota, id);
        const filmeAtualizado = db.prepare('SELECT * FROM filmes WHERE id = ?').get(id);
        res.json(filmeAtualizado);
    }catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao atualizar filme' });
        }
});
//----------------------------------------------------------------------

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});