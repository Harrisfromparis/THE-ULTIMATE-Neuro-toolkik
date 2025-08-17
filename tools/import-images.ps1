# tools/import-images.ps1
# Copies a list of images into public/images/programs/, deduplicates by SHA256,
# and renames uniques to sausage-dog-01.jpg, sausage-dog-02.jpg, ...

$sources = @(
 'C:\Users\Elain\Pictures\ImageCreator_20250719125037.jpg',
 'C:\Users\Elain\Pictures\ImageCreator_20250719125038.jpg',
 'C:\Users\Elain\Pictures\ImageCreator_20250719125039.jpg',
 'C:\Users\Elain\Pictures\ImageCreator_20250719125040.jpg',
 'C:\Users\Elain\Pictures\ImageCreator_20250719125041.jpg',
 'C:\Users\Elain\Pictures\ImageCreator_20250719125042.jpg',
 'C:\Users\Elain\Pictures\ImageCreator_20250719125043 (2).jpg',
 'C:\Users\Elain\Pictures\ImageCreator_20250719125043.jpg',
 'C:\Users\Elain\Pictures\ImageCreator_20250719125045 (2).jpg',
 'C:\Users\Elain\Pictures\ImageCreator_20250719125045.jpg',
 'C:\Users\Elain\Pictures\ImageCreator_20250719125046.jpg',
 'C:\Users\Elain\Pictures\ImageCreator_20250719125047.jpg',
 'C:\Users\Elain\Pictures\ImageCreator_20250719125048.jpg',
 'C:\Users\Elain\Pictures\ImageCreator_20250719125050.jpg',
 'C:\Users\Elain\Pictures\ImageCreator_20250719125051.jpg',
 'C:\Users\Elain\Pictures\ImageCreator_20250719125054.jpg',
 'C:\Users\Elain\Pictures\ImageCreator_20250719125055.jpg',
 'C:\Users\Elain\Pictures\ImageCreator_20250719125056.jpg',
 'C:\Users\Elain\Pictures\IMG-20250718-WA0004.jpg',
 'C:\Users\Elain\Pictures\ImageCreator_20250719125035.jpg',
 'C:\Users\Elain\Pictures\ImageCreator_20250719125036.jpg'
)

$dest = Join-Path -Path (Get-Location) -ChildPath 'public\images\programs'
if (-not (Test-Path $dest)) { New-Item -ItemType Directory -Force -Path $dest | Out-Null }

$seen = @{}
$index = 1

Write-Host "Starting import to: $dest`n"
foreach ($f in $sources) {
    if (-not (Test-Path -LiteralPath $f)) {
        Write-Host "Missing: $f" -ForegroundColor Yellow
        continue
    }
    try {
        $h = (Get-FileHash -LiteralPath $f -Algorithm SHA256).Hash
    } catch {
        Write-Host "Hash failed for: $f; skipping" -ForegroundColor Red
        continue
    }
    if ($seen.ContainsKey($h)) {
        Write-Host "Duplicate skipped: $f" -ForegroundColor DarkGray
        continue
    }
    $seen[$h] = $true
    $ext = [IO.Path]::GetExtension($f).ToLower()
    $name = ('sausage-dog-{0:D2}' -f $index) + $ext
    $index++
    $destPath = Join-Path $dest $name
    Copy-Item -LiteralPath $f -Destination $destPath -Force
    Write-Host "Copied: $f -> $name" -ForegroundColor Green
}

Write-Host ("`nResulting files in " + $dest + ":`n")
Get-ChildItem -Path $dest | Select-Object Name,Length | Format-Table -AutoSize
