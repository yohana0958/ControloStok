# Modelo de Dados — Controle de Estoque de Autopeças

O DER deve conter três entidades principais:

- **Usuario** (`id` PK, `nome`, `email` UNIQUE, `senha`)
- **Produto** (`id` PK, `codigo` UNIQUE, `descricao`, `marca`, `modelo`, `ano_fabricacao`, `veiculos_compativeis`, `quantidade`, `valor_unitario`, `estoque_minimo`)
- **Movimentacao** (`id` PK, `produto_id` FK, `usuario_id` FK, `tipo`, `quantidade`, `data_movimentacao`)

## Relacionamentos
- Um **Produto** pode ter zero ou muitas **Movimentacoes**; cada movimentação pertence a um produto (1:N).
- Um **Usuario** pode registrar zero ou muitas **Movimentacoes**; cada movimentação pertence a um usuário (1:N).

O histórico é preservado por chaves estrangeiras que impedem apagar produto ou usuário com movimentações relacionadas.
