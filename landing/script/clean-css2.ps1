$css = [System.IO.File]::ReadAllText((Join-Path (Get-Location) 'assets/css/style.css'), [System.Text.Encoding]::UTF8)

# Remove carousel-container (bloco gigante)
$css = [regex]::Replace($css, '(?s)\.carousel-container \{.+?\n\}(\r?\n)+', '')

# Remove partners-section e todos os blocos relacionados ate logos-area
$css = [regex]::Replace($css, '(?s)\.partners-section \{.+?\.logos-area \{\s*display: flex;\s*justify-content: center;\s*\}', '')

# Remove section-header-beneficios, section-title-beneficios, section-subtitle-beneficios
$css = [regex]::Replace($css, '(?s)\.section-header-beneficios \{.+?\}(\r?\n)+', '')
$css = [regex]::Replace($css, '(?s)\.section-title-beneficios \{.+?\}(\r?\n)+', '')
$css = [regex]::Replace($css, '(?s)\.section-title-beneficios span \{.+?\}(\r?\n)+', '')
$css = [regex]::Replace($css, '(?s)\.section-subtitle-beneficios \{.+?\}(\r?\n)+', '')

# Remove .container duplicado (max-width: 1100px - o de cantinas)
$css = [regex]::Replace($css, '(?s)\.container \{\s*max-width: 1100px;\s*margin: 0 auto;\s*\}(\r?\n)+', '')

# Colapsa linhas em branco multiplas
$css = [regex]::Replace($css, '(\r?\n){3,}', "`r`n`r`n")

[System.IO.File]::WriteAllText((Join-Path (Get-Location) 'assets/css/style.css'), $css, [System.Text.Encoding]::UTF8)

$size = [math]::Round((Get-Item 'assets/css/style.css').Length / 1KB, 2)
Write-Host "Feito. Tamanho final: $size KiB"
