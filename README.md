# Svara — Music Player 🎵

A clean, modern, **offline-friendly music player** that runs entirely in your browser. Pick songs from your device, build instant playlists, and play — no uploads, no accounts, no tracking. Your files never leave your device.

**Live demo:** https://melleeyyy.github.io/svara-music-player/

## Features

- 🎶 **Instant library** — select any audio files on your phone or computer (MP3, M4A, WAV, OGG, FLAC, AAC, OPUS)
- 💾 **Persistent library** — songs are saved inside the browser (IndexedDB), so everything is still there when you close and reopen the app — playlists, sorting and even the last played song and position
- 🖼️ **Full-screen Now Playing experience** — animated spinning disc, ambient gradients, swipe the header down to dismiss
- ▶️ **Mini player** — compact bar with progress line; tap it any time to jump into Now Playing
- 🗂️ **Playlists** — create named playlists, add/remove songs from the ⋮ menu, Play All from a playlist
- 🔀 **Shuffle** and three **repeat modes** (off / repeat all / repeat one)
- 🔃 **Sorting** — recently added, title A–Z / Z–A, shortest / longest first (remembered across visits)
- 🔍 **Search** across songs and playlists
- 📋 **Queue viewer** — see and jump to any song in the current queue
- 📱 **Background playback** — on Android, song info and controls appear in the notification & lock screen (Media Session API)
- 📲 **Installable PWA** — "Add to Home screen" for an app-like experience
- 📴 **Works offline** — the app shell is cached by a service worker after your first visit
- ✨ **Polished UI** — custom SVG iconography, ripple feedback, smooth scrolling and animated transitions throughout, respects reduced-motion preferences
- 🔒 **100% private** — everything runs locally in your browser; nothing is uploaded
- 🗑️ Remove individual songs, or wipe everything with **Clear library** (in the sort menu)

## Tech

Plain **HTML + CSS + JavaScript** — no frameworks, no build step, no dependencies.

```
svara-music-player/
├── index.html            # App markup
├── css/style.css         # Styles (dark glass theme, mobile-first)
├── js/app.js             # Player, playlists, sorting, Now Playing logic
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
4. Swipe the Now Playing header down (or tap the chevron) to return to your library

Your library is saved automatically — close the app and come back later, everything will still be there.

### Keyboard shortcuts

| Key | Action |
| --- | --- |
| `Space` | Play / pause |
| `Shift + →` | Next song |
| `Shift + ←` | Previous song |
| `Esc` | Close sheet / menu / Now Playing |

### Playlists

1. Go to the **Playlists** tab → **New Playlist**
2. On any song, tap the **⋮** menu → **Add to playlist**
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
- Background playback depends on the browser (Chrome on Android is best supported)

## License

Released under the [MIT License](LICENSE) — free to use, modify, and distribute.
