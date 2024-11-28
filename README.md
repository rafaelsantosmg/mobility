# Projeto Mobility

O projeto Mobility tem como objetivo o desenvolvimento de um aplicativo fullstack para gestão de rotas e motoristas de serviços de táxi por aplicativo. O sistema visa oferecer uma solução eficiente e prática tanto para usuários quanto para motoristas, promovendo maior organização e controle das operações.

### Funcionalidades principais

Histórico de viagens
O aplicativo incluirá uma funcionalidade dedicada ao acompanhamento do histórico de viagens. Entre os requisitos desta tela, destacam-se:

Um campo para informar o ID do usuário.
Um seletor de motorista, permitindo selecionar um motorista específico ou exibir viagens realizadas por todos os motoristas.
Um botão para aplicar o filtro e consultar as viagens.
Após o filtro, a lista de viagens deve exibir:
Data e hora da viagem.
Nome do motorista.
Origem e destino.
Distância percorrida.
Tempo da viagem.
Valor total.

### Tratamento de erros

O sistema prioriza a experiência do usuário, garantindo que todos os erros sejam devidamente tratados e exibidos de forma clara em cada tela. Assim, o usuário poderá identificar o problema e realizar novas tentativas, promovendo uma interação mais intuitiva e confiável.

## Stack utilizada

**Front-end:** React.JS com Vite, React Hooks, Context API, Tailwind.

**Back-end:** Node, Express, PostgreSql, Prisma, Joi.

## Aprendizados

## Rodando localmente

Clone o projeto

```bash
  git clone git@github.com:rafaelsantosmg/mobility.git
```

Entre no diretório do projeto

```bash
  cd mobility
```

Instale e rode o projeto com o script automatizado.

Certifique de ter o docker e docker-compose instalado em sua maquina se precisar de ajuda com a instalação pode seguir a documentação para o mesmo!

```bash
  chmod +x ./apps_install.sh
```

Esse comando deve instalar todas as dependencias e subir todos os containers necessários para funcionamento da Aplicação.

```bash
  ./apps_install.sh
```

Não esqueça de renomear os arquivos ```.env.example``` para ```.env``` nas pastas do frontend e backend e adicionar suas informacoes correspondentes

Apos a configuração das variáveis de ambiente! Rode o seguinte comando para subir os containers.

Certifique-se se estar dentro d pasta ```app``` para rodar o script do compose up

```bash
  cd app
  yarn run compose:up
```

Abra seu navegador com caminho "http://localhost:80" e tudo pronto!
