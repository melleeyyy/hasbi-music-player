# Svara — Music Player 🎵

A clean, modern, **offline-friendly music player** that runs entirely in your browser. Pick songs from your device, build an instant playlist, and play — no uploads, no accounts, no tracking. Your files never leave your device.

**Live demo:** https://melleeyyy.github.io/svara-music-player/

## Features

- 🎶 **Instant playlist** — select any audio files on your phone or computer (MP3, M4A, WAV, OGG, FLAC, AAC, OPUS)
- ▶️ **Full playback controls** — play/pause, next/previous, seek bar with time display
- 🔀 **Shuffle** and three **repeat modes** (off / repeat all / repeat one)
- 🔍 **Search** to find songs in long playlists
- 🗑️ Remove individual songs or clear the whole playlist
- 📱 **Background playback** — on Android, song info and controls appear in the notification & lock screen (Media Session API)
- 📲 **Installable PWA** — "Add to Home screen" for an app-like experience
- 📴 **Works offline** — the app shell is cached by a service worker after your first visit
- 🔒 **100% private** — everything runs locally in your browser; nothing is uploaded

## Tech

Plain **HTML + CSS + JavaScript** — no frameworks, no build step, no dependencies.

```
svara-music-player/
├── index.html            # App markup
├── css/style.css         # Styles (dark theme, mobile-first)
├── js/app.js             # Player logic
├── sw.js                 # Service worker (offline cache)
├── manifest.webmanifest  # PWA manifest
├── icons/                # App icons
├── LICENSE
└── README.md
```

## Usage

1. Open the app (or the `index.html` file) in any modern browser
2. Tap **＋ Add Songs** and choose audio files from your device
3. Play! Use the search box, shuffle, and repeat controls as needed

### Keyboard shortcuts

| Key | Action |
| --- | --- |
| `Space` | Play / pause |
| `Shift + →` | Next song |
| `Shift + ←` | Previous song |

### Install as an app

- **Android (Chrome):** open the live site → menu → **Add to Home screen**
- **iOS (Safari):** open the live site → Share → **Add to Home Screen**
- **Desktop (Chrome/Edge):** install icon in the address bar

## Deploy your own

The app is a fully static site — host it anywhere:

- **GitHub Pages:** fork this repo → Settings → Pages → deploy from `main`
- **Netlify / Vercel / Cloudflare Pages:** drag and drop the folder

## Notes & limitations

- Browsers don't allow a web page to remember locally-picked files after it is closed, so you re-pick your songs on each visit
- Background playback depends on the browser (Chrome on Android is best supported)

## License

Released under the [MIT License](LICENSE) — free to use, modify, and distribute.
