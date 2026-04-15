$css = [System.IO.File]::ReadAllText((Join-Path (Get-Location) 'assets/css/style.css'), [System.Text.Encoding]::UTF8)

# Remove comentarios CSS
$css = [regex]::Replace($css, '/\*.*?\*/', '', [System.Text.RegularExpressions.RegexOptions]::Singleline)
# Colapsa whitespace
$css = [regex]::Replace($css, '\s*\{\s*', '{')
$css = [regex]::Replace($css, '\s*\}\s*', '}')
$css = [regex]::Replace($css, '\s*:\s*', ':')
$css = [regex]::Replace($css, '\s*;\s*', ';')
$css = [regex]::Replace($css, '\s*,\s*', ',')
$css = [regex]::Replace($css, ';\}', '}')
$css = [regex]::Replace($css, '\s+', ' ')
$css = $css.Trim()

[System.IO.File]::WriteAllText((Join-Path (Get-Location) 'assets/css/style.css'), $css, [System.Text.Encoding]::UTF8)

$size = [math]::Round((Get-Item 'assets/css/style.css').Length / 1KB, 2)
Write-Host "style.css minificado: $size KiB"
