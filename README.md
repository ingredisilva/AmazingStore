# Documentação do Projeto

Dominio: https://amazingstore.vercel.app/

Este projeto é uma aplicação de e-commerce desenvolvida com Next.js e Redux para gerenciamento de estado. A aplicação inclui funcionalidades como exibição de produtos, filtro por categoria, barra de pesquisa, carrinho de compras e modal de carrinho.

### Funcionalidades:

1. Exibição de Produtos
Cada produto é exibido em um card, que mostra uma imagem, título, descrição truncada, preço e um botão para adicionar ao carrinho.
O layout dos cards é responsivo, adaptando-se a diferentes tamanhos de tela.
2. Barra de Pesquisa
A barra de pesquisa permite filtrar produtos pelo nome. O estado da pesquisa é controlado pelo componente pai, que realiza o filtro sobre a lista de produtos.
3. Filtro por Categoria
Um conjunto de checkboxes permite filtrar produtos com base em suas categorias.
Ao selecionar ou desmarcar uma categoria, a lista de produtos exibida é atualizada em tempo real.
4. Carrinho de Compras
O carrinho pode ser acessado a partir de um ícone no cabeçalho, que exibe o número de itens no carrinho.
Dentro do modal do carrinho, os itens adicionados são listados com informações sobre a quantidade e o valor total.
É possível acessar a página de checkout diretamente a partir do modal.
5. Modal do Carrinho
O modal do carrinho aparece ao clicar no ícone do carrinho.
O modal pode ser fechado clicando no botão de fechar ou fora do modal (overlay).
Mostra uma lista dos itens adicionados e um botão para redirecionar à página de checkout.
6. Adicionar ao Carrinho
Os produtos podem ser adicionados ao carrinho a partir da página de listagem de produtos ou da página de detalhes do produto.
A quantidade de itens é ajustada e refletida no valor total do carrinho.
7. Controle de Quantidade
Na página do carrinho, os usuários podem aumentar ou diminuir a quantidade de cada item, e o valor total é atualizado automaticamente.
8. Skeleton Loading e Spinner
9. Um skeleton loader é exibido enquanto os produtos estão sendo carregados.
10. Um spinner aparece quando uma busca está sendo realizada.

##Testes
Como Executar os Testes

Instale as dependências do projeto:

- git Clone
- npm install
- npm run dev

**Execute os testes com o comando:**

npm test

**Cobertura de Testes**

Barra de Pesquisa: Testa se o input de pesquisa está presente e funcional.

Filtro por Categoria: Verifica o comportamento dos checkboxes de categorias e se a lista de produtos é filtrada corretamente.

**##ToDO**

Modal do Carrinho: Garante que o modal abre e fecha corretamente ao clicar no ícone do carrinho e fora do modal.

Adicionar ao Carrinho: Testa se o botão de "Adicionar ao Carrinho" funciona e se os itens são corretamente adicionados ao estado do Redux.

**##Estrutura de Diretórios**

- components/: Contém componentes reutilizáveis como ProductCard, SearchBar, CategoryFilter, Header, e CartModal.
- features/: Contém o slice de Redux para gerenciamento do estado do carrinho.
- lib/: Contém funções auxiliares, como getProdutos para buscar dados da API e truncateText.
- pages/: Páginas da aplicação como a página de produtos e a página de checkout.

**##Tecnologias:**

- Nextjs 14
- StyledComponents
- Redux
