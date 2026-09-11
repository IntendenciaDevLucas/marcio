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
  favicon.svg          Símbolo provisório de chave
  images/README.md     Instruções para as imagens reais
tests/site.spec.ts     Fluxos, responsividade e contatos
.github/workflows/deploy.yml
```

## Conteúdo e imagens

Edite `src/config/company.ts` para alterar os dados. Todas as listagens de serviço vêm de `src/data/services.ts`; `enabled: false` oculta um serviço. O reparo em painéis está desativado até confirmação. As descrições são genéricas e não prometem procedimentos não confirmados. A listagem tem filtros e cada orçamento abre uma mensagem específica no WhatsApp.

As imagens reais não acompanharam o briefing. Há placeholders identificados; a chave do hero é uma ilustração em CSS, não uma foto do proprietário. O logo tipográfico também é provisório. Adicione:

- `public/images/brand/logo.png`
- `public/images/hero/marcio.png`
- `public/images/about/casal.png`
- Fotografias em `public/images/services/`, conforme `services.ts`.

Os arquivos passam a ser usados automaticamente ao recarregar. Use imagens otimizadas; WebP é recomendado e pode ser configurado nos dados. O hero carrega prioritariamente; as demais imagens e o mapa usam lazy loading. Não foram inventados rostos, avaliações, datas ou horários de abertura. O mapa requer conexão externa; o botão de rota permanece disponível.

## Rotas

`/`, `#/servicos`, `#/sobre`, `#/avaliacoes`, `#/contato`. HashRouter mantém refresh e links diretos compatíveis com GitHub Pages. `#/servicos?categoria=automotivo` abre o filtro automotivo. URLs desconhecidas mostram uma página de retorno ao início.

## Publicar no GitHub Pages (recomendado)

1. Envie o projeto para um repositório GitHub, branch `main`, incluindo `package-lock.json`.
2. Em **Settings → Pages → Build and deployment**, selecione **GitHub Actions**.
3. O workflow publica a cada push em `main`; também pode ser executado em **Actions → Publicar no GitHub Pages → Run workflow**.
4. O endereço público aparece no ambiente `github-pages` ao concluir.

O workflow obtém o caminho e a URL reais de `actions/configure-pages`. Isso configura assets, canonical e `og:url` tanto em repositórios quanto em domínio próprio. Não há URL fictícia ou domínio antigo fixado como canonical. Localmente o base padrão `./` permite hospedagem em subpastas. Configure `.env.local` conforme `.env.example` para um build manual com URL final.

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

- Logo, layout de referência, foto do Márcio e foto do casal.
- Fotografias e confirmação do escopo dos serviços, especialmente reparo em painéis.
- Link direto do perfil/avaliações Google. Atualmente o botão abre a busca pelo nome e endereço fornecidos; não foi inventado um place_id.
- URL final do repositório ou domínio. Canonical é emitido quando `VITE_SITE_URL` está configurado (automático no workflow).
- Imagem oficial para compartilhamento: Open Graph e Twitter Card textuais já existem; adicionar `og:image` e `twitter:image` com URL absoluta quando a arte for fornecida.
- Dias de funcionamento e horário de abertura, caso se deseje exibir agenda completa. Hoje consta somente atendimento comercial até 17h30 e contato de urgência a qualquer hora.
- Links de Facebook e YouTube, se utilizados.

Nota 4,9, 200 avaliações e quase 10 anos são dados fornecidos pelo cliente, não sincronizados com o Google. Atualize-os no arquivo de configuração quando necessário. O protótipo não foi publicado automaticamente em uma conta externa.
