# Caderno Digital - Analisador de Anotações Escolares

Este é um aplicativo web que permite aos estudantes fazer upload de imagens de suas anotações escolares e obter análises detalhadas geradas por IA. O sistema usa a API da OpenAI (GPT-4o com visão) para processar as imagens e fornecer conteúdo educacional relevante.

## Funcionalidades

- 📸 Upload de imagens do caderno
- 📝 Transcrição do conteúdo manuscrito
- 📚 Geração de resumo didático
- 📋 Extração de pontos principais
- 🔍 Destaque de conceitos importantes
- ✏️ Criação de exercícios com respostas

## Tecnologias

- Next.js 14+
- TypeScript
- TailwindCSS
- OpenAI API (GPT-4o)
- Axios

## Requisitos

- Node.js 18.17.0 ou superior
- Uma chave de API da OpenAI

## Configuração

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/caderno-ai.git
   cd caderno-ai
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env.local` na raiz do projeto com a seguinte variável:
   ```
   OPENAI_API_KEY=sua-chave-da-api-da-openai
   ```

4. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Acesse o aplicativo em `http://localhost:3000`

## Deploy na Vercel

Este projeto está pronto para ser implantado na Vercel. Ao fazer o deploy, lembre-se de adicionar a variável de ambiente `OPENAI_API_KEY` nas configurações do projeto.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/seu-usuario/caderno-ai)

## Uso

1. Acesse a página inicial
2. Faça upload de uma imagem com suas anotações escolares
3. Clique no botão "Analisar Anotação"
4. Aguarde o processamento
5. Explore os resultados nas diferentes abas:
   - Resumo
   - Transcrição
   - Tópicos
   - Importante Saber
   - Exercícios

## Licença

Este projeto está licenciado sob a licença MIT.
