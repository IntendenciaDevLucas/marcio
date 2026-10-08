# Imagens oficiais

Os arquivos já estão presentes nos caminhos abaixo.

- brand/logo.png: logo oficial transparente.
- hero/marcio.png: Márcio de jaqueta preta segurando uma chave, composição vertical.
- about/casal.png: casal responsável pela empresa.
- services/automotivo.jpg, residencial.jpg, codificadas.jpg, canivete.jpg, reparos.jpg.
- gallery/*.jpg: oito registros reais, configurados em src/data/gallery.ts.

As cópias JPEG de img/ são redimensionadas para no máximo 1200px com qualidade 88. Os originais são preservados. Execute scripts/prepare-images.ps1 no Windows para gerar novamente as fotos e os ícones da logo. Fechaduras digitais usam uma ilustração enquanto não houver foto específica. Caminhos são sensíveis a maiúsculas na hospedagem. Para trocar fotos, atualize src/config/company.ts, src/data/services.ts ou src/data/gallery.ts. A logo oficial é usada nos metadados de compartilhamento.
