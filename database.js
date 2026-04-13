
// database.js
const Database = require('better-sqlite3');

const db = new Database('filmes.db');

// SQL para criar tabela
const createTableSQL = `
    CREATE TABLE IF NOT EXISTS filmes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo VARCHAR(100) NOT NULL,
        ano INTEGER(4) NOT NULL,
        diretor VARCHAR(50) NOT NULL,
        genero VARCHAR(100) NOT NULL,
        nota INTEGER(2,1),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

// Executar SQL
db.exec(createTableSQL);

console.log('Banco de dados ON!');

// Exportar para usar em outros arquivos
module.exports = db;
                            