$imageUrls = @(
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?w=800&h=800&fit=crop"
)

$imageNames = @(
    "meditation-hero.jpg",
    "guided-meditation.jpg",
    "time-meditation.jpg",
    "progress-meditation.jpg"
)

for ($i = 0; $i -lt $imageUrls.Count; $i++) {
    $url = $imageUrls[$i]
    $output = "public/images/$($imageNames[$i])"
    Write-Host "Downloading $($imageNames[$i])..."
    Invoke-WebRequest -Uri $url -OutFile $output
}

# Create images directory if it doesn't exist
if (-not (Test-Path "public/images")) {
    New-Item -ItemType Directory -Path "public/images" -Force
}

# Download meditation guide image
$imageUrl = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000"
$output = "public/images/meditation-guide.jpg"

Write-Host "Downloading meditation guide image..."
try {
    Invoke-WebRequest -Uri $imageUrl -OutFile $output
    Write-Host "Successfully downloaded meditation guide image"
} catch {
    Write-Host "Failed to download meditation guide image: $_"
} 