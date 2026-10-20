# Plano de Testes — Controle de Estoque de Autopeças

## Ambiente e ferramentas
- Aplicação web Next.js com TypeScript.
- Banco de dados MySQL, banco `saep_db`.
- Navegador atualizado (Chrome ou Edge).
- Testes funcionais manuais pela interface e verificação dos registros no banco.

## Casos de teste
| ID | Cenário | Procedimento | Resultado esperado |
|---|---|---|---|
| CT01 | Login válido | Informar e-mail e senha cadastrados | Abrir dashboard e exibir nome do usuário |
| CT02 | Login inválido | Informar senha incorreta | Exibir mensagem de falha e permanecer no login |
| CT03 | Cadastro válido | Preencher todos os campos do produto | Produto salvo e exibido na listagem |
| CT04 | Código duplicado | Cadastrar código já existente | Operação rejeitada com mensagem compreensível |
| CT05 | Campos obrigatórios | Tentar salvar campos obrigatórios vazios | Navegador/servidor impede o cadastro |
| CT06 | Pesquisa | Pesquisar por código ou descrição | Listar somente produtos correspondentes |
| CT07 | Edição | Alterar dados de um produto | Alterações persistidas após recarregar a lista |
| CT08 | Exclusão com histórico | Tentar excluir produto movimentado | Exclusão bloqueada para preservar histórico |
| CT09 | Entrada de estoque | Registrar entrada positiva | Quantidade aumenta e movimentação é registrada |
| CT10 | Saída válida | Registrar saída menor ou igual ao saldo | Quantidade diminui e movimentação é registrada |
| CT11 | Saída acima do saldo | Informar quantidade maior que o estoque | Operação rejeitada e estoque não fica negativo |
| CT12 | Quantidade inválida | Informar zero ou valor negativo na movimentação | Operação rejeitada |
| CT13 | Estoque mínimo | Fazer o saldo ficar igual ou abaixo do mínimo | Sistema apresenta alerta de estoque baixo |
| CT14 | Histórico | Consultar movimentações realizadas | Mostrar produto, tipo, quantidade, data e responsável |
| CT15 | Logout | Clicar em Sair | Remover sessão local e voltar ao login |

## Registro de execução
Preencher durante a avaliação:
- Data/hora:
- Responsável pelo teste:
- Versões reais do Node.js, MySQL e sistema operacional:
- Resultado por caso: Aprovado / Reprovado / Não executado
- Evidência (captura de tela ou observação):
