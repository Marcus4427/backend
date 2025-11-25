# GitHub Checklist (API) — Quick Reference

Use este checklist quando for trabalhar na pasta `api/` e enviar mudanças para o GitHub. Feito para PowerShell no Windows.

1) Preparar (local)
- Abrir PowerShell na raiz do repositório:
  ```powershell
  cd 'c:\Users\marcu\Desktop\Backend\backend\backend-1'
  git status
  ```
- Atualizar branch base (ex.: `develop`):
  ```powershell
  git checkout develop
  git pull origin develop
  ```

2) Criar Issue no GitHub
- New issue → título claro → descrição + passos → labels (feature/docs/test) → assignees/milestone.
- Exemplo título: `docs(api): atualizar README e adicionar .env.example`.

3) Criar branch (nome claro)
- Convenção: `feature/<descr>` | `fix/<descr>` | `chore/<descr>`
  ```powershell
  git checkout -b feature/api-readme
  ```

4) Trabalhar e commitar em partes (commits pequenos)
- Adicionar arquivo inteiro:
  ```powershell
  git add api/.env.example
  git commit -m "docs(api): add .env.example"
  ```
- Staging parcial (interativo) para dividir alterações dentro de um arquivo:
  ```powershell
  git add -p api/README.md
  # responda y/n/a/d/e para cada hunk
  ```
- Mensagens de commit claras: `feat:`, `fix:`, `docs:`, `test:`.

5) Verificar histórico local
```powershell
git log --oneline --graph -n 20
```

6) Subir branch para o remote
```powershell
git push -u origin feature/api-readme
```

7) Abrir Pull Request (PR)
- No GitHub: Compare & pull request → base: `develop` → head: sua branch
- No corpo do PR: referencie Issue `Closes #<n>`, descreva mudanças, passos para testar localmente, critérios de aceitação e screenshots se aplicável.
- Adicione reviewers e labels.

8) Trabalhinho adicional (push dentro do PR)
- Continue commitando na mesma branch; `git push` atualiza o PR automaticamente.

9) Resolver conflitos (se necessário)
- Atualizar base local e mesclar:
  ```powershell
  git checkout develop
  git pull origin develop
  git checkout feature/api-readme
  git merge develop
  # resolver conflitos nos arquivos, depois:
  git add <arquivos_resolvidos>
  git commit -m "chore(api): resolve merge conflicts"
  git push
  ```

10) Revisão e Merge
- Checklist antes do merge:
  - Testes passam localmente (`npm test` ou `npx jest --runInBand`)
  - Swagger OK (/api-docs)
  - Revisores aprovaram
  - Nenhum conflito pendente
- Merge no GitHub: preferir `Squash and merge` para histórico limpo (ou conforme política do projeto).

11) Limpeza pós-merge
```powershell
git checkout develop
git pull origin develop
git branch -d feature/api-readme
git push origin --delete feature/api-readme   # opcional
```

12) Dicas rápidas
- Para rodar testes sem modo watch (útil para CI):
  ```powershell
  npx jest --runInBand
  ```
- Para adicionar um commit sem incluir mudanças acidentais:
  ```powershell
  git restore --staged <file>   # remove do stage
  git restore <file>            # desfaz alterações locais (se desejar)
  ```
- Para renomear uma branch local antes do push:
  ```powershell
  git branch -m feature/old-name feature/new-name
  git push origin -u feature/new-name
  git push origin --delete feature/old-name
  ```

13) Exemplo mínimo (fluxo rápido)
```powershell
# atualizar base
git checkout develop
git pull origin develop
# criar branch
git checkout -b feature/api-env-example
# criar arquivo
echo "MONGODB_USER=\nMONGODB_PASSWORD=\nMONGODB_HOST=\nMONGODB_DATABASE=\nJWT_SECRET=\nJWT_EXPIRES=3600\nPORT=3000" > api/.env.example
git add api/.env.example
git commit -m "docs(api): add .env.example"
git push -u origin feature/api-env-example
# abrir PR no GitHub
```

---
Arquivo criado por checklist automático — siga os passos e marque cada item conforme concluir. Boa entrega! 
