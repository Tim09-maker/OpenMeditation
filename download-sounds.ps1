$soundUrls = @(
    "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0c6ff1bab.mp3?filename=forest-birds-ambience-1210.mp3",
    "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8f1a3a3.mp3?filename=rain-and-thunder-storm-2392.mp3",
    "https://cdn.pixabay.com/download/audio/2022/01/18/audio_0c6ff1bab.mp3?filename=ocean-waves-loop-1195.mp3",
    "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8f1a3a3.mp3?filename=meditation-bell-sound-2305.mp3"
)

$soundNames = @(
    "forest.mp3",
    "rain.mp3",
    "ocean.mp3",
    "bells.mp3"
)

# Create sounds directory if it doesn't exist
if (-not (Test-Path "public/sounds")) {
    New-Item -ItemType Directory -Path "public/sounds" -Force
}

for ($i = 0; $i -lt $soundUrls.Count; $i++) {
    $url = $soundUrls[$i]
    $output = "public/sounds/$($soundNames[$i])"
    Write-Host "Downloading $($soundNames[$i])..."
    try {
        Invoke-WebRequest -Uri $url -OutFile $output
        Write-Host "Successfully downloaded $($soundNames[$i])"
    } catch {
        Write-Host "Failed to download $($soundNames[$i]): $_"
    }
} 