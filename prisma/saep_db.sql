CREATE DATABASE IF NOT EXISTS saep_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE saep_db;

CREATE TABLE IF NOT EXISTS Usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Produto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(50) NOT NULL UNIQUE,
  descricao VARCHAR(255) NOT NULL,
  marca VARCHAR(100) NOT NULL,
  modelo VARCHAR(100) NOT NULL,
  ano_fabricacao INT NOT NULL,
  veiculos_compativeis VARCHAR(500) NOT NULL,
  quantidade INT NOT NULL DEFAULT 0,
  valor_unitario DECIMAL(10,2) NOT NULL,
  estoque_minimo INT NOT NULL DEFAULT 10
);

CREATE TABLE IF NOT EXISTS Movimentacao (
  id INT AUTO_INCREMENT PRIMARY KEY,
  produto_id INT NOT NULL,
  usuario_id INT NOT NULL,
  tipo ENUM('ENTRADA','SAIDA') NOT NULL,
  quantidade INT NOT NULL,
  data_movimentacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_movimentacao_produto FOREIGN KEY (produto_id) REFERENCES Produto(id),
  CONSTRAINT fk_movimentacao_usuario FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

INSERT INTO Usuario (nome,email,senha) VALUES
('Administrador SAEP','admin@saep.local','123456'),
('Ana Oliveira','ana@saep.local','ana123'),
('Carlos Souza','carlos@saep.local','carlos123');

INSERT INTO Produto (codigo,descricao,marca,modelo,ano_fabricacao,veiculos_compativeis,quantidade,valor_unitario,estoque_minimo) VALUES
('AUT-001','Filtro de óleo','Tecfil',' PSL55','2020','Fiat Uno; Fiat Palio',20,32.90,5),
('AUT-002','Pastilha de freio dianteira','Fras-le','PD/123','2022','Chevrolet Onix; Chevrolet Prisma',12,89.90,4),
('AUT-003','Vela de ignição','NGK','BKR6E','2021','Volkswagen Gol; Volkswagen Fox',3,24.50,5);

INSERT INTO Movimentacao (produto_id,usuario_id,tipo,quantidade,data_movimentacao) VALUES
(1,1,'ENTRADA',20,'2026-10-20 09:00:00'),
(2,2,'ENTRADA',12,'2026-10-20 09:15:00'),
(3,3,'SAIDA',2,'2026-10-20 10:00:00');
