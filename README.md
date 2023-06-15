# PI III Backend

![GitHub repo size](https://img.shields.io/github/repo-size/eduardo-ibarr/pi-iii-backend?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/eduardo-ibarr/pi-iii-backend?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/eduardo-ibarr/pi-iii-backend?style=for-the-badge)
![Bitbucket open issues](https://img.shields.io/bitbucket/issues/eduardo-ibarr/pi-iii-backend?style=for-the-badge)
![Bitbucket open pull requests](https://img.shields.io/bitbucket/pr-raw/eduardo-ibarr/pi-iii-backend?style=for-the-badge)

> API Restful para o controle de agentes, requisitantes, setores, tickets e categorias, utilizados no pi-iii-frontend.

### Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas nas seguintes tarefas:

- [ ] Adição de testes unitários

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Você instalou a versão mais recente do `Node.js`.
- Você possui um banco de dados Postgres rodando localmente na sua máquina (execute os arquivos SQL presentes na pasta `src\api\database` no seu banco de dados para configurá-lo).

## 🚀 Instalando o pi-iii-backend

Para instalar o pi-iii-backend, siga estas etapas:

1. Clone este repositório em sua máquina.

2. Abra um terminal na pasta do projeto e execute o seguinte comando:

```
npm install
```

## ☕ Usando o pi-iii-backend

Para usar o pi-iii-backend, siga estas etapas:

1. Configure as variáveis de ambiente do backend. (são dados de conexão do Postgres, crie um banco de dados de teste na sua máquina e adicione as informações de conexão em um `.env` como no `.env.example`, além da secret, que pode ser gerada conforme a sua vontade, e os salt rounds).

2. Abra o terminal na pasta do pi-iii-backend, e digite o seguinte comando:

```
npm run dev
```
