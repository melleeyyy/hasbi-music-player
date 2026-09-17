# Hasbi — Music Player 🎵

A clean, modern, **offline-friendly music player** that runs entirely in your browser. Pick songs from your device, build instant playlists, like your favourites, and play — no uploads, no accounts, no tracking. Your files never leave your device.

**Live app:** https://melleeyyy.github.io/hasbi-music-player/

## Features

- 🎶 **Instant library** — select any audio files on your phone or computer (MP3, M4A, WAV, OGG, FLAC, AAC, OPUS)
- 💾 **Persistent library** — songs are saved inside the browser (IndexedDB), so everything is still there when you close and reopen the app — playlists, likes, sorting and even the last played song and position
- 🖼️ **Full-screen Now Playing experience** — circular disc with a glowing blue–green progress ring, ambient gradients, "Next up" strip of upcoming songs
- 👆 **Gestures** — tap the left / right side of the Now Playing screen to jump 10 seconds back / forward; swipe left / right to change songs; swipe down (or drag the header) to dismiss
- ❤️ **Likes** — heart button on every song, in the mini player and in Now Playing; all liked songs live together in the **Liked Songs** playlist
- ▶️ **Mini player with full controls** — like, previous, play / pause and next, right on the compact bar
- 🗂️ **Playlists** — create named playlists, add songs from the ⋮ menu, the Now Playing screen or the "Add Songs" button inside a playlist, then Play All
- 🔀 **Shuffle** and three **repeat modes** (off / repeat all / repeat one)
- 🔃 **Sorting** — recently added, title A–Z / Z–A, shortest / longest first (remembered across visits)
- 🔍 **Search** across songs and playlists
- 📋 **Queue viewer** — see and jump to any song in the current queue
- 📱 **Background playback & lock-screen controls** — play / pause, next, previous and seek appear in the notification and on the lock screen (Media Session API; Chrome on Android is best supported)
- 🎨 **Dark glassmorphism design** — deep black theme with blue and green accents
- 📲 **Installable PWA** — "Add to Home screen" for an app-like experience with a splash screen
- 📴 **Works offline** — the app shell is cached by a service worker after your first visit
- ✨ **Polished UI** — custom SVG iconography, ripple feedback, smooth scrolling and animated transitions throughout, respects reduced-motion preferences
- 🔒 **100% private** — everything runs locally in your browser; nothing is uploaded
- 🗑️ Remove individual songs, or wipe everything with **Clear library** (in the sort menu)

## Tech

Plain **HTML + CSS + JavaScript** — no frameworks, no build step, no dependencies.

```
hasbi-music-player/
├── index.html            # App markup (incl. splash screen)
├── css/style.css         # Styles (dark glass theme, blue/green palette)
├── js/app.js             # Player, likes, playlists, sorting, gestures, media session
├── sw.js                 # Service worker (offline cache)
├── manifest.webmanifest  # PWA manifest
├── icons/                # App icons
├── LICENSE
└── README.md
```

## Usage

1. Open the app in any modern browser
2. Tap **＋ Add Songs** (or the floating + button) and choose audio files from your device
3. Tap any song to play — it opens in the full-screen Now Playing view
4. In Now Playing: tap the left / right side to skip 10 seconds, swipe left / right to change songs, swipe down to return to your library

Your library is saved automatically — close the app and come back later, everything will still be there.

### Keyboard shortcuts

| Key | Action |
| --- | --- |
| `Space` | Play / pause |
| `Shift + →` | Next song |
| `Shift + ←` | Previous song |
| `Esc` | Close sheet / menu / Now Playing |

### Likes

- Tap the **♥** button on any song, in the mini player, or in Now Playing
- All liked songs are collected under **Liked Songs** in the Playlists tab

### Playlists

1. Go to the **Playlists** tab → **New Playlist**
2. Add songs via the **⋮** menu on any song, the **playlist button** in Now Playing, or **Add Songs** inside a playlist
3. Open a playlist and press **Play All**

### Sorting

Tap the sort icon (top right) on the Songs tab or inside a playlist: recently added, title A–Z / Z–A, shortest / longest first. Your choice is remembered.

### Install as an app

- **Android (Chrome):** open the live site → menu → **Add to Home screen**
- **iOS (Safari):** open the live site → Share → **Add to Home Screen**
- **Desktop (Chrome/Edge):** install icon in the address bar

## Deploy your own

The app is a fully static site — host it anywhere:

- **GitHub Pages:** fork this repo → Settings → Pages → deploy from `main`
- **Netlify / Vercel / Cloudflare Pages:** drag and drop the folder

## Notes & limitations

- Your library lives in the browser's storage for this site. Clearing the browser's site data (or using private/incognito mode) will remove it
- Very large libraries depend on available browser storage; the app asks the browser for persistent storage to reduce the chance of cleanup
- Background playback and lock-screen controls depend on the browser (Chrome on Android is best supported)

## License

Released under the [MIT License](LICENSE) — free to use, modify, and distribute.
