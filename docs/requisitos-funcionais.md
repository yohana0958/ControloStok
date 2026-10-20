# Documento de Requisitos Funcionais — Controle de Estoque de Autopeças

## Objetivo
Controlar o cadastro de autopeças, entradas, saídas, níveis mínimos de estoque e histórico de movimentações, identificando o usuário responsável e a data de cada operação.

## Atores
- **Funcionário autenticado:** consulta produtos, cadastra e altera produtos e registra entradas/saídas.
- **Sistema:** valida dados, atualiza quantidades e alerta sobre estoque baixo.

## Requisitos funcionais
- **RF01 — Autenticação:** permitir acesso por e-mail e senha; rejeitar credenciais inválidas com mensagem explicativa.
- **RF02 — Sessão:** exibir o nome do usuário autenticado e permitir sair, retornando à tela de login.
- **RF03 — Cadastro de produtos:** cadastrar código único, descrição, marca, modelo, ano de fabricação, veículos compatíveis, quantidade, preço unitário e estoque mínimo.
- **RF04 — Consulta:** listar produtos em ordem alfabética e permitir pesquisa por código ou descrição.
- **RF05 — Edição:** permitir alterar os dados de um produto existente, validando os campos.
- **RF06 — Exclusão:** permitir excluir produtos sem movimentações associadas; informar quando a exclusão não for permitida.
- **RF07 — Entrada:** registrar produto, quantidade, data e usuário responsável; somar a quantidade ao estoque.
- **RF08 — Saída:** registrar produto, quantidade, data e usuário responsável; impedir saída maior que o saldo disponível.
- **RF09 — Histórico:** manter registro de cada movimentação com produto, tipo, quantidade, data e responsável.
- **RF10 — Estoque mínimo:** alertar quando o saldo ficar igual ou inferior ao mínimo configurado.
- **RF11 — Validação:** impedir campos obrigatórios vazios, valores negativos e quantidades de movimentação menores ou iguais a zero.
- **RF12 — Persistência:** armazenar dados em banco relacional MySQL chamado `saep_db`.

## Regras de negócio
- O código do produto e o e-mail do usuário devem ser únicos.
- Toda movimentação deve referenciar um produto e um usuário existentes.
- Uma saída nunca pode deixar o estoque negativo.
- A data da movimentação deve ser registrada no histórico.
- A quantidade em estoque é atualizada conforme o tipo de movimentação.
- Produtos com histórico não devem ser apagados, para preservar a rastreabilidade.

## Requisitos não funcionais
- Interface web responsiva e de uso simples.
- Persistência relacional com chaves primárias e estrangeiras.
- Mensagens de erro claras, sem expor dados sensíveis.
- Código organizado em entidades, repositórios, serviços e rotas de API.
