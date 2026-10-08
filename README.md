# Chaves Chaveiro

Site institucional estático para Matozinhos/MG. React + Vite + TypeScript, Tailwind CSS 4, Lucide React e Framer Motion. Sem backend, banco de dados, autenticação ou painel. Fontes Inter e Barlow Condensed hospedadas junto ao site.

## Executar

Requer Node.js 22.12+ (ou 24) e npm.

```sh
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

O build fica em `dist/`. Não abra o HTML com `file://`: use `npm run preview`.

## Estrutura

```text
src/
  App.tsx              Componentes, seções e rotas
  main.tsx             Entrada, fontes e schema Locksmith
  styles.css           Design system e responsividade
  config/company.ts    Dados, imagens, links de contato e mapa
  data/services.ts     Serviços, categorias e visibilidade
  data/reviews.ts       Três avaliações fornecidas
  data/social.ts        Redes oficiais
public/
  favicon.png          Símbolo da logo oficial
  images/README.md     Instruções para as imagens reais
tests/site.spec.ts     Fluxos, responsividade e contatos
.github/workflows/deploy.yml
```

## Conteúdo e imagens

Edite `src/config/company.ts` para alterar os dados. Todas as listagens de serviço vêm de `src/data/services.ts`; `enabled: false` oculta um serviço. O reparo em painéis está desativado até confirmação. As descrições são genéricas e não prometem procedimentos não confirmados. A listagem tem filtros e cada orçamento abre uma mensagem específica no WhatsApp.

As fotos de `img/` foram selecionadas e otimizadas para os cartões de serviços e a galeria. As cópias públicas ficam em `public/images/services/` e `public/images/gallery/`; os originais são preservados. Para gerar novamente as imagens e os ícones no Windows:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/prepare-images.ps1
```

A galeria é configurada em `src/data/gallery.ts`. Logo, foto do Márcio e foto do casal já estão em `public/images/`. O serviço de fechaduras digitais usa uma ilustração, pois não há fotografia correspondente nos arquivos enviados. As fotos abaixo da primeira tela carregam sob demanda.

## Google e domínio oficial

O domínio oficial é `https://chaveirochaves.com.br`. O build inclui canonical, metadados sociais, dados estruturados da empresa, `robots.txt`, `sitemap.xml`, `CNAME` e ícones derivados da logo oficial. O sitemap lista somente a página inicial: as seções usam rotas com fragmentos (`#/servicos` etc.), que não são páginas independentes para indexação.

Depois de publicar `dist/` na hospedagem:

1. Confira `https://chaveirochaves.com.br/robots.txt` e `https://chaveirochaves.com.br/sitemap.xml`.
2. Adicione o domínio ao Google Search Console e faça a verificação por DNS usando o registro TXT fornecido pelo Google.
3. Envie `sitemap.xml` na seção Sitemaps e solicite a indexação da página inicial pela inspeção de URL.

O arquivo HTML de verificação só pode ser incluído quando o Google fornecer o arquivo específico da sua conta. Sitemap e favicon tornam o site elegível para rastreamento e exibição da marca; a indexação e a exibição do ícone dependem do Google.

## Rotas

`/`, `#/servicos`, `#/sobre`, `#/avaliacoes`, `#/contato`. HashRouter mantém refresh e links diretos compatíveis com GitHub Pages. `#/servicos?categoria=automotivo` abre o filtro automotivo. URLs desconhecidas mostram uma página de retorno ao início.

## Publicar no GitHub Pages (recomendado)

1. Envie o projeto para um repositório GitHub, branch `main`, incluindo `package-lock.json`.
2. Em **Settings → Pages → Build and deployment**, selecione **GitHub Actions**.
3. O workflow publica a cada push em `main`; também pode ser executado em **Actions → Publicar no GitHub Pages → Run workflow**.
4. O endereço público aparece no ambiente `github-pages` ao concluir.

O workflow usa o caminho informado pelo GitHub Pages: `/marcio/` no endereço do repositório e `/` quando o domínio próprio estiver configurado em Settings → Pages. Assim, JavaScript, CSS e fotos carregam no endereço efetivo da publicação. Localmente o base padrão `./` permite testar em subpastas. O canonical mantém o domínio oficial e pode ser alterado com `VITE_SITE_URL`. Configure o domínio no GitHub Pages e os registros DNS no provedor do domínio.

### Alternativa: gh-pages

Configure o remoto `origin`, a autenticação GitHub e `.env.local` com o nome real do repositório e a URL final:

```dotenv
VITE_BASE_PATH=/NOME-DO-REPOSITORIO/
VITE_SITE_URL=https://USUARIO.github.io/NOME-DO-REPOSITORIO
```

```sh
npm run deploy
```

Esse comando faz o build e publica `dist/` na branch `gh-pages`. Nessa alternativa selecione **Deploy from a branch → gh-pages → /(root)** nas configurações do Pages e desative o workflow automático para evitar dois métodos publicando simultaneamente. Para site de usuário (`USUARIO.github.io`) ou domínio próprio, use base `/`. Configure o DNS e domínio em Settings → Pages somente quando o domínio definitivo for confirmado.

Referências: [Vite — deploy estático](https://vite.dev/guide/static-deploy.html), [GitHub — workflows de Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [Tailwind com Vite](https://tailwindcss.com/docs/installation/using-vite).

## Verificação de interface

```sh
npx playwright install chromium
npm run test:e2e
```

Testa 375, 430, 768, 1024, 1440 e 1920px, overflow, filtros, hash routes, recarregamento em subpasta, links de telefone/WhatsApp e menu por teclado. Capturas ficam em `test-results/`. O site respeita `prefers-reduced-motion`, possui foco visível, link para pular conteúdo e safe-area na barra mobile.

## Pendências para publicação definitiva

- Foto de fechadura digital e confirmação do escopo dos serviços, especialmente reparo em painéis.
- Link direto do perfil/avaliações Google. Atualmente o botão abre a busca pelo nome e endereço fornecidos; não foi inventado um place_id.
- Publicação das alterações, configuração do domínio na hospedagem e envio do sitemap ao Google Search Console.
- Dias de funcionamento e horário de abertura, caso se deseje exibir agenda completa. Hoje consta somente atendimento comercial até 17h30 e contato de urgência a qualquer hora.
- Links de Facebook e YouTube, se utilizados.

Nota 4,9, 200 avaliações e quase 10 anos são dados fornecidos pelo cliente, não sincronizados com o Google. Atualize-os no arquivo de configuração quando necessário. O protótipo não foi publicado automaticamente em uma conta externa.
