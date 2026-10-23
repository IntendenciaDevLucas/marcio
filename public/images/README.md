# Imagens do site

Os arquivos institucionais usam os caminhos abaixo. Ao substituir uma foto, o site a utiliza após recarregar.

- brand/logo.png: logo oficial transparente.
- hero/marcio.png: Márcio de jaqueta preta segurando uma chave, composição vertical.
- about/casal.png: casal responsável pela empresa.
- services/: 17 fotos enviadas pelo cliente, com versões WebP e miniaturas. Consulte `services/README.md` para os nomes e o mapeamento de origem.

Não foram geradas pessoas. Caminhos são sensíveis a maiúsculas no GitHub Pages. Para trocar a extensão das fotos, atualize `src/config/company.ts` ou `src/data/services.ts`. O Hero preserva a foto principal inteira com `object-fit: contain`; a camada desfocada preenche o fundo. As galerias também preservam a proporção e permitem ampliar. Os cards usam enquadramentos definidos em `imagePosition` nos dados. Adicionar imagem social oficial e metadados `og:image`/`twitter:image` quando disponível.
