$html = [System.IO.File]::ReadAllText((Join-Path (Get-Location) 'index.html'), [System.Text.Encoding]::UTF8)

# Extrai o conteudo entre <style> e </style>
$match = [regex]::Match($html, '(?s)<style>(.*?)</style>')
if (-not $match.Success) { Write-Host "Nenhum <style> encontrado"; exit }

$css = $match.Groups[1].Value

# Minificacao: remove comentarios
$css = [regex]::Replace($css, '/\*.*?\*/', '', [System.Text.RegularExpressions.RegexOptions]::Singleline)
# Remove espacos em branco desnecessarios
$css = [regex]::Replace($css, '\s*\{\s*', '{')
$css = [regex]::Replace($css, '\s*\}\s*', '}')
$css = [regex]::Replace($css, '\s*:\s*', ':')
$css = [regex]::Replace($css, '\s*;\s*', ';')
$css = [regex]::Replace($css, '\s*,\s*', ',')
$css = [regex]::Replace($css, ';\}', '}')
$css = [regex]::Replace($css, '\s+', ' ')
$css = $css.Trim()

# Substitui o bloco <style> pelo minificado
$minified = "<style>$css</style>"
$html = [regex]::Replace($html, '(?s)<style>.*?</style>', $minified)

[System.IO.File]::WriteAllText((Join-Path (Get-Location) 'index.html'), $html, [System.Text.Encoding]::UTF8)

$styleSize = [System.Text.Encoding]::UTF8.GetByteCount($css) / 1KB
Write-Host "CSS inline minificado: $([math]::Round($styleSize, 2)) KiB"
Write-Host "Feito."
