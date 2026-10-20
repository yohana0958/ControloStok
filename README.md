# ControloStok — Controle de Estoque de Autopeças

Aplicação web para cadastro de autopeças, acompanhamento de estoque, registro de entradas e saídas e histórico de movimentações com usuário responsável e data.

## Tecnologias
- Next.js e React
- TypeScript
- Prisma ORM
- MySQL
- Tailwind CSS e SweetAlert2

## Configuração local
1. Instale Node.js compatível com o Next.js do projeto e MySQL.
2. Crie o banco de dados `saep_db), ou execute o script `prisma/saep_db.sql` em um ambiente de avaliação limpo.
3. Configure a variável `DATABASE_URL` no arquivo `.env`, apontando para o banco `saep_db`.
4. Instale as dependências com `npm install`.
5. Gere o Prisma Client com `npx prisma generate`.
6. Para aplicar as migrations existentes em um banco já configurado, use `npx prisma migrate deploy`.
7. Inicie o projeto com `npm run dev` e acesse `http://localhost:3000`.

> Não execute o script SQL de criação sobre um banco de produção com dados que precisam ser preservados. Os usuários de demonstração do script usam senhas simples apenas para avaliação local; não reutilize essas credenciais em produção.

## Estrutura de entregáveis SAEP
- `docs/requisitos-funcionais.md`: requisitos funcionais e regras de negócio.
- `docs/requisitos-infraestrutura.md`: requisitos de infraestrutura.
- `docs/casos-de-teste.md`: plano de testes.
- `docs/modelo-relacional.md`: descrição textual do DER.
- `docs/der.mmd`: fonte Mermaid editável do DER.
- `prisma/saep_db.sql`: criação e população do banco de dados de demonstração.

## Observação
Confirme as versões reais de Node.js, MySQL e sistema operacional no computador da avaliação. Execute os casos de teste e registre seus resultados antes da entrega final.
