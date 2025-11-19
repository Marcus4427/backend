# TODO - API RESTful de Usuários

## ✅ Concluído
- [x] Adicionar operações CRUD faltantes (GET para listar/buscar, PUT para atualizar)
- [x] Implementar validações robustas (formato email, senha forte, unicidade)
- [x] Expandir testes para novos endpoints e cenários de erro
- [x] Atualizar Swagger com novos endpoints, exemplos e status
- [x] Garantir boas práticas REST (códigos HTTP adequados, versionamento opcional)
- [x] Verificar se entidade "usuários" atende; se não, ajustar para outra (mas usuários é válido)

## 🔄 Próximos Passos
- [x] Executar testes para verificar se tudo funciona corretamente
- [ ] Verificar se a documentação Swagger está acessível e atualizada
- [ ] Testar endpoints manualmente via Postman ou similar
- [ ] Verificar se o MongoDB está conectado corretamente
- [ ] Verificar se as variáveis de ambiente estão configuradas (SECRET, MONGO_URI)

## 📋 Detalhes Técnicos
- **Validações implementadas**: Joi para email, senha mínima 6 caracteres, unicidade de email
- **Segurança**: JWT para autenticação, bcrypt para hash de senhas
- **Estrutura**: MVC com controllers, models, routes, middlewares
- **Testes**: Jest + Supertest com cobertura completa dos endpoints
- **Documentação**: Swagger/OpenAPI 3.0

## 🚀 Como executar
1. Instalar dependências: `npm install`
2. Configurar variáveis de ambiente (.env)
3. Executar testes: `npm test`
4. Iniciar servidor: `npm start`
5. Acessar documentação: http://localhost:3000/api-docs
