# Requisitos de Infraestrutura

## Ambiente de desenvolvimento
- **Sistema operacional:** Windows 10 ou Windows 11 64 bits (ambiente de referência; confirmar a versão efetivamente usada na entrega).
- **Linguagem:** TypeScript e JavaScript.
- **Runtime:** Node.js compatível com a versão instalada do Next.js (recomenda-se Node.js 20.9 ou superior).
- **Framework web:** Next.js 16.4.1, React 19.3.0.
- **ORM:** Prisma 5.22.
- **Banco de dados:** MySQL 8.0 ou compatível.
- **Navegador:** versão atual do Google Chrome, Microsoft Edge ou Firefox.
- **Editor recomendado:** Visual Studio Code.

## Configuração necessária
- Node.js e npm instalados.
- Servidor MySQL em execução e usuário com permissão para criar/alterar tabelas.
- Variável de ambiente `DATABASE_URL` configurada no arquivo `.env`.
- Dependências instaladas a partir de `package.json`.
- Cliente Prisma gerado após atualizar o schema.

## Observação
As versões do sistema operacional e do servidor MySQL devem ser confirmadas no computador de execução antes da entrega final; os valores acima são referências de compatibilidade, não uma medição automática do ambiente.
