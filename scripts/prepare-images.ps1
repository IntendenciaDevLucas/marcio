Add-Type -AssemblyName System.Drawing
$projectRoot = Split-Path $PSScriptRoot -Parent
$sourceFiles = @(Get-ChildItem (Join-Path $projectRoot 'img') -Filter *.jpeg | Sort-Object Name)
$selections = @{
  'services/automotivo' = 4
  'services/residencial' = 1
  'services/codificadas' = 20
  'services/canivete' = 6
  'services/reparos' = 3
  'gallery/chaves-jeep' = 20
  'gallery/chave-presencial' = 6
  'gallery/chaves-codificadas' = 2
  'gallery/chave-hyundai' = 4
  'gallery/chave-fiat' = 13
  'gallery/chave-volkswagen' = 8
  'gallery/fechadura-residencial' = 1
  'gallery/atendimento-caminhao' = 10
}
$digitalLock = Join-Path $projectRoot 'img/fechadura_eletronica.png'
if (Test-Path $digitalLock) {
  $selections['services/digitais'] = $sourceFiles.Count
  $sourceFiles += Get-Item -LiteralPath $digitalLock
}
$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
$quality = New-Object System.Drawing.Imaging.EncoderParameters 1
$quality.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality),([long]88)
foreach ($entry in $selections.GetEnumerator()) {
  $source = [System.Drawing.Image]::FromFile($sourceFiles[$entry.Value].FullName)
  $scale = [math]::Min(1, 1200 / [math]::Max($source.Width, $source.Height))
  $bitmap = New-Object System.Drawing.Bitmap ([int]($source.Width * $scale)),([int]($source.Height * $scale))
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.DrawImage($source, 0, 0, $bitmap.Width, $bitmap.Height)
  $target = Join-Path $projectRoot "public/images/$($entry.Key).jpg"
  New-Item -ItemType Directory -Force -Path (Split-Path $target -Parent) | Out-Null
  $bitmap.Save($target, $encoder, $quality)
  $graphics.Dispose(); $bitmap.Dispose(); $source.Dispose()
}
# Use the recognizable symbol from the official logo for small browser/search icons.
$logo = [System.Drawing.Image]::FromFile((Join-Path $projectRoot 'public/images/brand/logo.png'))
foreach ($size in @(96, 180)) {
  $bitmap = New-Object System.Drawing.Bitmap $size,$size
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.Clear([System.Drawing.Color]::FromArgb(16,17,19))
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $destination = New-Object System.Drawing.Rectangle 4,4,($size-8),($size-8)
  $crop = New-Object System.Drawing.Rectangle 52,46,250,210
  $graphics.DrawImage($logo,$destination,$crop,[System.Drawing.GraphicsUnit]::Pixel)
  $file = if ($size -eq 96) { 'favicon.png' } else { 'apple-touch-icon.png' }
  $bitmap.Save((Join-Path $projectRoot "public/$file"),[System.Drawing.Imaging.ImageFormat]::Png)
  $graphics.Dispose(); $bitmap.Dispose()
}
$logo.Dispose(); $quality.Dispose()
