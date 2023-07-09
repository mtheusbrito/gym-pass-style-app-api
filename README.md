# GymPass Style App - API.


 API REST para aplicação para check-ins em academias. Utilizando SOLID, Design Patterns, Docker para iniciar o banco de dados, JWT e Refresh Token, RBAC e diversos outros conceitos.

Install all dependencies: 
```
npm install
```
Database up with docker:
```
docker compose up -d
```
Run Migrations:
```
npx prisma migrate dev
```

Run project: 
```
npm run start:dev
```
Run tests:
```
npm run test
```

## RF(Requisitos funcionais)

- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar
- [x] Deve ser possível obter o perfil de um usuário logado
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de check-ins
- [ ] Deve ser possível o usuário buscar academias próximas; 
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-in de um usuário;
- [ ] Deve ser possível realizar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;


## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-in no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto(100m) da academia;
- [ ] O check-in só pode ser validado até 20 min após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;



## RNFs(Requisitos não funcionais)

- [x] A senha do usuário precisa estar criptocrada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [ ] Todas listars de dados precisam estar paginadas com 20 items por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token)
 
