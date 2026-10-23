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
  components/          Cards, galerias, páginas de serviços e fundo do Hero
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

Edite `src/config/company.ts` para alterar os dados. Todas as listagens de serviço vêm de `src/data/services.ts`; `enabled: false` oculta um serviço. Os quatro textos enviados na pasta LUCAS em outubro de 2026 foram incorporados, incluindo os pequenos reparos em painéis agora confirmados. Cada categoria tem descrição, lista de serviços, galeria com ampliação e orçamento específico pelo WhatsApp.

As fotos do Márcio e do casal já estão no projeto. O Hero preserva a imagem inteira, incluindo o logo, com um fundo ampliado e desfocado da mesma foto. Para trocar os arquivos institucionais, mantenha os caminhos:

- `public/images/brand/logo.png`
- `public/images/hero/marcio.png`
- `public/images/about/casal.png`

A galeria da página inicial usa oito fotos de `img/`, configuradas em `src/data/gallery.ts`. A foto da fechadura digital também está na galeria do serviço Residencial. As cópias JPEG e os ícones podem ser gerados novamente, preservando os originais, com:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/prepare-images.ps1
```

As 17 imagens da pasta LUCAS foram convertidas em WebP, sem alterar os originais: aproximadamente 20 MB viraram 2,2 MB, incluindo miniaturas. O mapeamento dos arquivos de origem está em `scripts/import-service-media.mjs`; instruções em `public/images/services/README.md`. Os cards usam miniaturas e as galerias exibem as imagens inteiras. Artes ilustrativas e referências são identificadas nas legendas. O hero carrega prioritariamente; cards, miniaturas e mapa usam lazy loading. O mapa requer conexão externa; o botão de rota permanece disponível.

## Google e domínio oficial

O domínio oficial é `https://chaveirochaves.com.br`. O build inclui canonical, metadados sociais, dados estruturados da empresa, `robots.txt`, `sitemap.xml`, `CNAME` e ícones derivados da logo oficial. O sitemap lista somente a página inicial: as seções usam rotas com fragmentos (`#/servicos` etc.), que não são páginas independentes para indexação.

Depois de publicar `dist/` na hospedagem:

1. Confira `https://chaveirochaves.com.br/robots.txt` e `https://chaveirochaves.com.br/sitemap.xml`.
2. Adicione o domínio ao Google Search Console e faça a verificação por DNS usando o registro TXT fornecido pelo Google.
3. Envie `sitemap.xml` na seção Sitemaps e solicite a indexação da página inicial pela inspeção de URL.

O arquivo HTML de verificação só pode ser incluído quando o Google fornecer o arquivo específico da sua conta. Sitemap e favicon tornam o site elegível para rastreamento e exibição da marca; a indexação e a exibição do ícone dependem do Google.

## Rotas

`/`, `#/servicos`, `#/servicos/:serviceId`, `#/sobre`, `#/avaliacoes`, `#/contato`. Os serviços são `canivete`, `presenca`, `residencial`, `reparos`, `centrais` e `paineis`. Fechaduras digitais, tetra e controles de portão estão na categoria Residencial. HashRouter mantém refresh e links diretos compatíveis com GitHub Pages. `#/servicos?categoria=automotivo` e `#/servicos?categoria=residencial` abrem o filtro correspondente. URLs desconhecidas mostram uma página de retorno.

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

Testa 375, 430, 768, 1024, 1440 e 1920px, overflow, filtros, hash routes, recarregamento em subpasta, links de telefone/WhatsApp, galerias com teclado e carregamento das fotos. Capturas ficam em `test-results/`. O site respeita `prefers-reduced-motion`, possui foco visível, link para pular conteúdo e safe-area na barra mobile.

## Pendências para publicação definitiva

- Link direto do perfil/avaliações Google. Atualmente o botão abre a busca pelo nome e endereço fornecidos; não foi inventado um place_id.
- Publicação das alterações, configuração do domínio na hospedagem e envio do sitemap ao Google Search Console.
- Dias de funcionamento e horário de abertura, caso se deseje exibir agenda completa. A loja fica aberta até 17h30. Após esse horário, o atendimento depende de disponibilidade, a consultar pelo WhatsApp ou telefone; não há promessa de atendimento 24h.
- Links de Facebook e YouTube, se utilizados.

Nota 4,9, 200 avaliações e quase 10 anos são dados fornecidos pelo cliente, não sincronizados com o Google. Atualize-os no arquivo de configuração quando necessário. O protótipo não foi publicado automaticamente em uma conta externa.
