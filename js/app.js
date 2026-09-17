/* ============================================================
   Svara — Music Player
   A clean, offline-friendly player for local audio files.
   License: MIT
   ============================================================ */
(function () {
  'use strict';

  var audio = document.getElementById('audio');
  var fileInput = document.getElementById('fileInput');
  var addBtn = document.getElementById('addBtn');
  var playlistEl = document.getElementById('playlist');
  var playerEl = document.getElementById('player');
  var emptyState = document.getElementById('emptyState');
  var addBtnWrap = document.getElementById('addBtnWrap');
  var toolbar = document.getElementById('toolbar');
  var searchBox = document.getElementById('searchBox');
  var shuffleBtn = document.getElementById('shuffleBtn');
  var repeatBtn = document.getElementById('repeatBtn');
  var clearBtn = document.getElementById('clearBtn');
  var nowName = document.getElementById('nowName');
  var nowSub = document.getElementById('nowSub');
  var seek = document.getElementById('seek');
  var curTime = document.getElementById('curTime');
  var totTime = document.getElementById('totTime');
  var playBtn = document.getElementById('playBtn');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var toastEl = document.getElementById('toast');

  var tracks = [];          // {name, url, dur, file}
  var current = -1;
  var shuffle = false;
  var repeat = 0;           // 0 = off, 1 = all, 2 = one
  var seeking = false;
  var toastTimer = null;

  /* ---------- helpers ---------- */
  function fmt(s) {
    if (!isFinite(s) || s < 0) s = 0;
    var m = Math.floor(s / 60), x = Math.floor(s % 60);
    return m + ':' + (x < 10 ? '0' : '') + x;
  }

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2200);
  }

  function prettyName(filename) {
    return filename.replace(/\.[^.]+$/, '').replace(/[_]+/g, ' ').trim();
  }

  /* ---------- add files ---------- */
  function addFiles(fileList) {
    var added = 0;
    for (var i = 0; i < fileList.length; i++) {
      var f = fileList[i];
      if (f.type.indexOf('audio') === 0 || /\.(mp3|m4a|wav|ogg|oga|flac|aac|opus|wma)$/i.test(f.name)) {
        tracks.push({ name: prettyName(f.name), url: URL.createObjectURL(f), dur: null, file: f });
        added++;
      }
    }
    if (!added) { toast('No audio files found'); return; }
    emptyState.style.display = 'none';
    addBtnWrap.style.display = 'none';
    toolbar.style.display = 'flex';
    playerEl.classList.add('show');
    renderList();
    if (current === -1) load(0, true);
    else toast(added + ' song' + (added > 1 ? 's' : '') + ' added');
  }

  addBtn.addEventListener('click', function () { fileInput.click(); });
  fileInput.addEventListener('change', function () {
    addFiles(fileInput.files);
    fileInput.value = '';
  });

  /* drag & drop (desktop) */
  document.addEventListener('dragover', function (e) { e.preventDefault(); });
  document.addEventListener('drop', function (e) {
    e.preventDefault();
    if (e.dataTransfer && e.dataTransfer.files) addFiles(e.dataTransfer.files);
  });

  /* ---------- render playlist ---------- */
  function renderList() {
    var q = searchBox.value.trim().toLowerCase();
    playlistEl.innerHTML = '';
    tracks.forEach(function (t, i) {
      if (q && t.name.toLowerCase().indexOf(q) === -1) return;
      var li = document.createElement('li');
      li.className = 'track' + (i === current ? ' current' : '') + (i === current && !audio.paused ? ' playing' : '');
      li.innerHTML =
        '<div class="num">' + (i + 1) + '</div>' +
        '<div class="eq"><span></span><span></span><span></span></div>' +
        '<div class="meta"><div class="tname"></div><div class="tdur"></div></div>' +
        '<button class="del" title="Remove" aria-label="Remove song">✕</button>';
      li.querySelector('.tname').textContent = t.name;
      li.querySelector('.tdur').textContent = t.dur ? fmt(t.dur) : 'Local file';
      li.addEventListener('click', function () { load(i, true); });
      li.querySelector('.del').addEventListener('click', function (e) {
        e.stopPropagation();
        removeTrack(i);
      });
      playlistEl.appendChild(li);
    });
  }

  function removeTrack(i) {
    if (tracks.length === 1) { clearAll(); return; }
    var wasCurrent = (i === current);
    URL.revokeObjectURL(tracks[i].url);
    tracks.splice(i, 1);
    if (i < current) current--;
    else if (i === current) {
      current = Math.min(current, tracks.length - 1);
      load(current, wasCurrent);
    }
    renderList();
  }

  function clearAll() {
    tracks.forEach(function (t) { URL.revokeObjectURL(t.url); });
    tracks = [];
    current = -1;
    audio.pause();
    audio.removeAttribute('src');
    playerEl.classList.remove('show');
    toolbar.style.display = 'none';
    emptyState.style.display = 'block';
    addBtnWrap.style.display = 'block';
    playlistEl.innerHTML = '';
    toast('Playlist cleared');
  }

  clearBtn.addEventListener('click', function () {
    if (confirm('Remove all songs from the playlist?')) clearAll();
  });

  searchBox.addEventListener('input', renderList);

  /* ---------- playback ---------- */
  function load(i, autoplay) {
    if (i < 0 || i >= tracks.length) return;
    current = i;
    var t = tracks[i];
    audio.src = t.url;
    nowName.textContent = t.name;
    nowSub.textContent = (i + 1) + ' / ' + tracks.length + ' · Local file';
    renderList();
    updateMediaSession(t);
    if (autoplay) audio.play().catch(function () {});
  }

  function nextTrack(auto) {
    if (!tracks.length) return;
    if (auto && repeat === 2) { audio.currentTime = 0; audio.play(); return; }
    var n;
    if (shuffle && tracks.length > 1) {
      do { n = Math.floor(Math.random() * tracks.length); } while (n === current);
    } else {
      n = current + 1;
      if (n >= tracks.length) {
        if (auto && repeat === 0) { audio.pause(); playBtn.textContent = '▶'; return; }
        n = 0;
      }
    }
    load(n, true);
  }

  function prevTrack() {
    if (!tracks.length) return;
    if (audio.currentTime > 3) { audio.currentTime = 0; return; }
    var n;
    if (shuffle && tracks.length > 1) {
      do { n = Math.floor(Math.random() * tracks.length); } while (n === current);
    } else {
      n = current - 1 < 0 ? tracks.length - 1 : current - 1;
    }
    load(n, true);
  }

  playBtn.addEventListener('click', function () { togglePlay(); });
  nextBtn.addEventListener('click', function () { nextTrack(false); });
  prevBtn.addEventListener('click', prevTrack);

  function togglePlay() {
    if (current === -1 && tracks.length) { load(0, true); return; }
    if (audio.paused) audio.play().catch(function () {});
    else audio.pause();
  }

  /* ---------- audio events ---------- */
  audio.addEventListener('play', function () {
    playBtn.textContent = '⏸';
    renderList();
    if (navigator.mediaSession) navigator.mediaSession.playbackState = 'playing';
  });
  audio.addEventListener('pause', function () {
    playBtn.textContent = '▶';
    renderList();
    if (navigator.mediaSession) navigator.mediaSession.playbackState = 'paused';
  });
  audio.addEventListener('ended', function () { nextTrack(true); });
  audio.addEventListener('error', function () {
    if (current >= 0) toast('This file cannot be played');
  });

  audio.addEventListener('loadedmetadata', function () {
    totTime.textContent = fmt(audio.duration);
    if (current >= 0 && !tracks[current].dur) {
      tracks[current].dur = audio.duration;
      renderList();
    }
  });

  audio.addEventListener('timeupdate', function () {
    if (seeking) return;
    curTime.textContent = fmt(audio.currentTime);
    if (isFinite(audio.duration) && audio.duration > 0) {
      var p = (audio.currentTime / audio.duration) * 1000;
      seek.value = p;
      seek.style.setProperty('--p', (p / 10) + '%');
    }
  });

  /* ---------- seek bar ---------- */
  seek.addEventListener('input', function () {
    seeking = true;
    var p = seek.value / 1000;
    seek.style.setProperty('--p', (p * 100) + '%');
    curTime.textContent = fmt(p * (audio.duration || 0));
  });
  seek.addEventListener('change', function () {
    if (isFinite(audio.duration)) audio.currentTime = (seek.value / 1000) * audio.duration;
    seeking = false;
  });

  /* ---------- shuffle / repeat ---------- */
  shuffleBtn.addEventListener('click', function () {
    shuffle = !shuffle;
    shuffleBtn.classList.toggle('on', shuffle);
    toast(shuffle ? 'Shuffle on' : 'Shuffle off');
  });
  repeatBtn.addEventListener('click', function () {
    repeat = (repeat + 1) % 3;
    repeatBtn.classList.toggle('on', repeat > 0);
    repeatBtn.textContent = repeat === 2 ? '🔂' : '🔁';
    toast(repeat === 0 ? 'Repeat off' : repeat === 1 ? 'Repeat all songs' : 'Repeat current song');
  });

  /* ---------- media session (lock screen / notification) ---------- */
  function updateMediaSession(t) {
    if (!('mediaSession' in navigator)) return;
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: t.name,
        artist: 'Svara Music Player',
        album: 'Local files'
      });
      navigator.mediaSession.setActionHandler('play', function () { audio.play(); });
      navigator.mediaSession.setActionHandler('pause', function () { audio.pause(); });
      navigator.mediaSession.setActionHandler('previoustrack', prevTrack);
      navigator.mediaSession.setActionHandler('nexttrack', function () { nextTrack(false); });
      navigator.mediaSession.setActionHandler('seekto', function (d) {
        if (d.seekTime != null) audio.currentTime = d.seekTime;
      });
    } catch (e) { /* not supported */ }
  }

  /* ---------- keyboard ---------- */
  document.addEventListener('keydown', function (e) {
    if (e.target === searchBox) return;
    if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
    else if (e.code === 'ArrowRight' && e.shiftKey) nextTrack(false);
    else if (e.code === 'ArrowLeft' && e.shiftKey) prevTrack();
  });

  /* ---------- register service worker (offline support) ---------- */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    });
  }
})();
