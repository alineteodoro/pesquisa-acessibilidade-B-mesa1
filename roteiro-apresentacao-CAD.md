## PARTE 1 — PRODUTO (Aline, Marcato, David)

### 1. O problema (quem abre: sugestão Aline)
- Desenvolvedores usam responsividade de forma superficial (só media query, sem pensar em navegação por teclado ou leitor de tela).
- Abuso de `<div>` genérica em vez de elementos semânticos (`<nav>`, `<main>`, `<button>`, `<label>`), o que quebra a experiência de quem usa leitor de tela.
- Consequência real: empresas perdem clientes e sofrem risco jurídico (LBI, processos), mas continuam tratando acessibilidade como "depois a gente vê".

### 2. Para que o CAD existe (Marcato)
- Frase-chave do grupo, usem quase literal: *"Acessibilidade não deveria ser diferencial, deveria ser obrigação."*
- O CAD nasce para fechar essa lacuna de conhecimento: um curso prático, não só teórico, com trilhas que o desenvolvedor aplica direto no próprio produto.
- Público: devs e times de produto que querem evitar punição e, principalmente, incluir usuários reais.

### 3. Apresentação do Figma (David)
- Mostrem as telas principais na ordem de navegação real do usuário: Login → Cursos → Meus Cursos → Comunidade → Perfil → Ajuda.
- Justifiquem decisões de design ligadas à acessibilidade: contraste de cores escolhido (idealmente ≥ 4.5:1 para texto normal, ≥ 3:1 para texto grande — testem no Lighthouse), tamanho de fonte, área de toque dos botões, foco visível.

### 4. Explicação da plataforma de cursos (David + Aline)
Percorram as áreas exatamente na lógica do produto:
- **Cursos**: descoberta de novos cursos além dos que o usuário já faz.
- **Meus Cursos**: cursos em andamento, filtrados pelo usuário logado.
- **Comunidade**: comentários, avaliação de comentários, moderação.
- **Perfil**: dados da própria conta.
- **Ajuda**: sugestões de funcionalidades de acessibilidade.

## PARTE 2 — CÓDIGO (Davi, Mezini)

### 5. Estrutura do banco (Davi)
- PostgreSQL, modelagem pensada em torno de: usuários, cursos, matrícula/progresso, comentários da comunidade.
- Expliquem a decisão de desativar `synchronize` automático do TypeORM (`DB_SYNCHRONIZE=false`) — isso é maturidade de engenharia, não só "boa prática genérica". Contem o caso real: o sync automático já apagou dados de estrelas/avaliações. É uma ótima história de "aprendemos na prática".
- Se já tiverem o diagrama de entidades (mesmo que simples), mostrem — ajuda muito a visualizar a relação usuário↔curso↔progresso.

### 6. Backend (Mezini)
- Stack: Node.js + TypeScript com NestJS.
- Segurança: autenticação JWT, senhas com bcryptjs, hash nunca exposto nas respostas de listagem de usuários.
- CORS habilitado para o front rodar em porta separada.
- Rotas: leitura de curso pública, escrita (criar/editar/excluir) protegida por autenticação.

### 7. Frontend (Mezini + Davi)
- HTML, CSS e JavaScript puro, com um `app.js` compartilhado entre páginas para login, busca e preferências de acessibilidade.
- Recursos de acessibilidade já implementados: foco visível consistente, `prefers-reduced-motion` respeitado.
- Recursos planejados e ainda não feitos: `aria-live` para mensagens de sucesso/erro, legenda e transcrição de videoaula, botão "concluir aula".

## Encerramento (Aline)
- Resumam em uma frase o estágio real do projeto: autenticação e segurança prontas, integração de dados em andamento, acessibilidade básica implementada e testes formais (Lighthouse, teclado, zoom) como próximo passo imediato antes da entrega.
- Abram para perguntas.