$css = Get-Content 'assets/css/style.css' -Raw

# Remove bloco video-wrapper orfao
$css = $css -replace '(?s)\n\.video-wrapper \{\s*order: 1;\s*\}\s*\n@media \(min-width: 1024px\) \{\s*\.video-wrapper \{\s*order: 2;\s*\}\s*\}', ''

# Colapsa linhas em branco multiplas
$css = [regex]::Replace($css, '(\r?\n){3,}', "`r`n`r`n")

[System.IO.File]::WriteAllText((Join-Path (Get-Location) 'assets/css/style.css'), $css, [System.Text.Encoding]::UTF8)
Write-Host "Feito. Tamanho: $([math]::Round((Get-Item 'assets/css/style.css').Length / 1KB, 2)) KiB"
