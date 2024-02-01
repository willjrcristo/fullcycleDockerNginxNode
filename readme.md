Link para aplicação direto no container node:
http://localhost:3001

Link para aplicação através do nginx:
http://localhost:8080/

A barra no final é importante neste caso

Sem a barra é possível evidenciar que o NGINX está rodando por trás


No docker compose o mapeamento do volume foi comentado, tendo em vista que o produto está pronto (em modo de produção), em uma eventual manutenção, basta descomentar as linhas (em um cenário real, teríamos um arquivo separado para os ambientes de desenvolvimento e produção)


Para evitar quebra da aplicação caso o banco de dados não esteja pronto ( ou venha a cair após já ter sido inicializado) fiz um tratamento de erro na obtenção da conexão.

Também foi acrescentada a dependência do db para inicializar o app