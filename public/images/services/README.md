# Fotografias de serviços

17 imagens fornecidas pelo cliente na pasta `Downloads/LUCAS`, organizadas em outubro de 2026. As versões `.webp` têm até 1600px no maior lado; as versões `-thumb.webp`, até 640px. Não há ampliação, recorte ou alteração de conteúdo na conversão. Os originais permanecem na pasta de origem.

Mapeamento dos nomes originais: `scripts/import-service-media.mjs`.

Para reimportar, com Chromium do Playwright instalado:

```powershell
node scripts/import-service-media.mjs 'C:\Users\x17859816\Downloads\LUCAS'
```

Os dados, legendas e enquadramentos dos cards ficam em `src/data/services.ts`. Nas galerias, todas as fotos são exibidas inteiras e podem ser ampliadas. A arte `chaves-apresentacao` e a referência `fechadura-referencia` são identificadas nas legendas; não são apresentadas como registros de atendimentos.

Os quatro textos recebidos confirmam programação de chaves canivete/presença, reparos automotivos, reset/decode de centrais da linha leve, pequenos reparos em painéis/controles e serviços residenciais (incluindo instalação de fechaduras digitais). O texto foi revisado para clareza, sem acrescentar serviços ou prometer compatibilidade irrestrita.
