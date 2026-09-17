/* ============================================================
   Hasbi — Music Player · v4
   Glassmorphism UI · Likes · Gestures · Media Session
   License: MIT
   ============================================================ */
(function () {
  'use strict';

  /* ==================== icons ==================== */
  var ICONS = {
    back: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z',
    sort: 'M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z',
    music: 'M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z',
    search: 'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
    close: 'M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
    add: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
    play: 'M8 5v14l11-7z',
    pause: 'M6 19h4V5H6v14zm8-14v14h4V5h-4z',
    prev: 'M6 6h2v12H6V6zm3.5 6 8.5 6V6l-8.5 6z',
    next: 'M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z',
    shuffle: 'M10.59 9.17 5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z',
    repeat: 'M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z',
    repeatOne: 'M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zm-4-2V9h-1l-2 1v1h1.5v4H13z',
    queue: 'M19 9H2v2h17V9zm0-4H2v2h17V5zM2 15h13v-2H2v2zm15-2v6l5-3-5-3z',
    chevronDown: 'M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z',
    trash: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z',
    check: 'M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
    playlist: 'M10 6h10v2H10V6zm0 4h10v2H10v-2zm0 4h7v2h-7v-2zm-4 4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z',
    more: 'M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z',
    heart: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.87-8.55 11.54L12 21.35z',
    heartO: 'M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.87 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z'
  };
  function icon(name, size) {
    return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="currentColor" aria-hidden="true"><path d="' + ICONS[name] + '"/></svg>';
  }

  /* ==================== elements ==================== */
  function $(id) { return document.getElementById(id); }
  var audio = $('audio');
  var fileInput = $('fileInput');
  var searchBox = $('searchBox');
  var tabsEl = $('tabs');
  var songList = $('songList');
  var plGrid = $('plGrid');
  var pdHero = $('pdHero');
  var pdList = $('pdList');
  var sortMenu = $('sortMenu');
  var sheetEl = $('sheet');
  var sheetBody = $('sheetBody');
  var sheetBackdrop = $('sheetBackdrop');
  var nowPlaying = $('nowPlaying');
  var npHeader = $('npHeader');
  var npRing = $('npRing');
  var npDisc = $('npDisc');
  var toastEl = $('toast');
  var seek = $('seek');
  var curTime = $('curTime');
  var totTime = $('totTime');
  var miniPlayer = $('miniPlayer');
  var miniProgress = $('miniProgress');

  /* inject static icons */
  $('backBtn').innerHTML = icon('back', 22);
  $('sortBtn').innerHTML = icon('sort', 22);
  $('searchIcon').innerHTML = icon('search', 18);
  $('clearSearchBtn').innerHTML = icon('close', 16);
  $('emptyIcon1').innerHTML = icon('music', 30);
  $('emptyIcon2').innerHTML = icon('playlist', 30);
  $('fabBtn').innerHTML = icon('add', 26);
  $('miniArt').innerHTML = icon('music', 20);
  $('miniPrev').innerHTML = icon('prev', 20);
  $('miniNext').innerHTML = icon('next', 20);
  $('npClose').innerHTML = icon('chevronDown', 28);
  $('npQueue').innerHTML = icon('queue', 20);
  $('npPl').innerHTML = icon('playlist', 20);
  $('npDiscInner').innerHTML = icon('music', 62);
  $('prevBtn').innerHTML = icon('prev', 30);
  $('nextBtn').innerHTML = icon('next', 30);
  $('shuffleBtn').innerHTML = icon('shuffle', 22);

  /* ==================== state ==================== */
  var uidSeq = 1;
  var plSeq = 1;
  var tracks = [];        // {uid, name, url, dur, addedAt, file}
  var playlists = [];     // {id, name, uids: []}
  var liked = [];         // uids of liked songs
  var view = 'songs';     // 'songs' | 'playlists'
  var playlistCtx = null; // playlist id (or 'liked') when viewing a playlist, else null
  var sortMode = 'added';
  var queue = [];
  var queueLabel = 'All songs';
  var currentUid = null;
  var shuffle = false;
  var repeat = 0;         // 0 off · 1 all · 2 one
  var seeking = false;
  var toastTimer = null;
  var npIsOpen = false;
  var lastPosSave = 0;
  var lastPosState = 0;

  try {
    sortMode = localStorage.getItem('svara.sort') || 'added';
    shuffle = localStorage.getItem('svara.shuffle') === '1';
    repeat = parseInt(localStorage.getItem('svara.repeat') || '0', 10) || 0;
  } catch (e) { /* storage unavailable */ }
  try {
    var savedLiked = JSON.parse(localStorage.getItem('svara.liked') || '[]');
    if (Array.isArray(savedLiked)) liked = savedLiked;
  } catch (e) { liked = []; }

  var SORTS = [
    { id: 'added',      label: 'Recently added' },
    { id: 'title-asc',  label: 'Title A–Z' },
    { id: 'title-desc', label: 'Title Z–A' },
    { id: 'dur-asc',    label: 'Shortest first' },
    { id: 'dur-desc',   label: 'Longest first' }
  ];

  /* ==================== helpers ==================== */
  function fmt(s) {
    if (!isFinite(s) || s < 0) s = 0;
    var m = Math.floor(s / 60), x = Math.floor(s % 60);
    return m + ':' + (x < 10 ? '0' : '') + x;
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return '&#' + c.charCodeAt(0) + ';';
    });
  }
  function prettyName(filename) {
    return filename.replace(/\.[^.]+$/, '').replace(/_+/g, ' ').trim();
  }
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2200);
  }
  function save(key, val) {
    try { localStorage.setItem(key, val); } catch (e) { /* ignore */ }
  }
  function byUid(u) {
    for (var i = 0; i < tracks.length; i++) if (tracks[i].uid === u) return tracks[i];
    return null;
  }
  function compare(a, b) {
    switch (sortMode) {
      case 'title-asc':  return a.name.localeCompare(b.name);
      case 'title-desc': return b.name.localeCompare(a.name);
      case 'dur-asc':    return (a.dur || 0) - (b.dur || 0);
      case 'dur-desc':   return (b.dur || 0) - (a.dur || 0);
      default:           return b.addedAt - a.addedAt;
    }
  }
  function searchQuery() { return searchBox.value.trim().toLowerCase(); }

  function isLiked(u) { return liked.indexOf(u) > -1; }
  function persistLiked() { save('svara.liked', JSON.stringify(liked)); }
  function toggleLike(u) {
    if (u === null || u === undefined) return;
    var i = liked.indexOf(u);
    if (i > -1) { liked.splice(i, 1); toast('Removed from Liked songs'); }
    else { liked.push(u); toast('Added to Liked songs'); }
    persistLiked();
    updateLikeUI();
    render();
  }
  function updateLikeUI() {
    var cur = currentUid !== null && isLiked(currentUid);
    $('npLike').innerHTML = icon(cur ? 'heart' : 'heartO', 20);
    $('npLike').classList.toggle('on', cur);
    $('miniLike').innerHTML = icon(cur ? 'heart' : 'heartO', 20);
    $('miniLike').classList.toggle('on', cur);
  }

  function currentCtxUids() {
    if (playlistCtx === 'liked') {
      var lk = [];
      liked.forEach(function (u) { if (byUid(u)) lk.push(u); });
      return lk;
    }
    if (playlistCtx !== null) {
      var pl = getPlaylist(playlistCtx);
      if (!pl) return [];
      var live = [];
      pl.uids.forEach(function (u) { if (byUid(u)) live.push(u); });
      return live;
    }
    var uids = [];
    tracks.forEach(function (t) { uids.push(t.uid); });
    return uids;
  }
  function getPlaylist(id) {
    for (var i = 0; i < playlists.length; i++) if (playlists[i].id === id) return playlists[i];
    return null;
  }
  function buildQueue() {
    queue = currentCtxUids().map(byUid).sort(compare).map(function (t) { return t.uid; });
    if (playlistCtx === 'liked') queueLabel = 'Liked songs';
    else {
      var pl = playlistCtx !== null ? getPlaylist(playlistCtx) : null;
      queueLabel = pl ? pl.name : 'All songs';
    }
  }

  /* ==================== persistence (IndexedDB + localStorage) ====================
     Audio files are stored as blobs in IndexedDB, so the library survives
     closing the app. Playlists, likes and playback position go to localStorage. */
  var DB = null;
  function idbOpen() {
    return new Promise(function (resolve) {
      if (!window.indexedDB) { resolve(null); return; }
      try {
        var req = window.indexedDB.open('svara-db', 1);
        req.onupgradeneeded = function (e) { e.target.result.createObjectStore('tracks', { keyPath: 'uid' }); };
        req.onsuccess = function (e) { DB = e.target.result; resolve(DB); };
        req.onerror = function () { resolve(null); };
      } catch (e) { resolve(null); }
    });
  }
  function idbPut(rec) {
    if (!DB) return;
    try { DB.transaction('tracks', 'readwrite').objectStore('tracks').put(rec); } catch (e) {}
  }
  function idbDelete(uid) {
    if (!DB) return;
    try { DB.transaction('tracks', 'readwrite').objectStore('tracks').delete(uid); } catch (e) {}
  }
  function idbClear() {
    if (!DB) return;
    try { DB.transaction('tracks', 'readwrite').objectStore('tracks').clear(); } catch (e) {}
  }
  function idbGetAll() {
    return new Promise(function (resolve) {
      if (!DB) { resolve([]); return; }
      try {
        var req = DB.transaction('tracks').objectStore('tracks').getAll();
        req.onsuccess = function () { resolve(req.result || []); };
        req.onerror = function () { resolve([]); };
      } catch (e) { resolve([]); }
    });
  }
  function persistPlaylists() {
    save('svara.playlists', JSON.stringify(playlists));
  }
  function savePos() {
    if (currentUid !== null && audio.currentTime > 0) save('svara.pos', String(Math.floor(audio.currentTime)));
  }

  /* ==================== ripple ==================== */
  document.addEventListener('pointerdown', function (e) {
    var el = e.target.closest ? e.target.closest('.rippleable') : null;
    if (!el) return;
    var rect = el.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height);
    var r = document.createElement('span');
    r.className = 'ripple';
    r.style.width = r.style.height = size + 'px';
    r.style.left = (e.clientX - rect.left - size / 2) + 'px';
    r.style.top = (e.clientY - rect.top - size / 2) + 'px';
    el.appendChild(r);
    setTimeout(function () { if (r.parentNode) r.parentNode.removeChild(r); }, 600);
  });

  /* ==================== splash ==================== */
  window.addEventListener('load', function () {
    setTimeout(function () {
      var s = $('splash');
      if (s && s.parentNode) s.parentNode.removeChild(s);
    }, 1800);
  });

  /* ==================== add files ==================== */
  function addFiles(fileList) {
    var newUids = [];
    for (var i = 0; i < fileList.length; i++) {
      var f = fileList[i];
      if (f.type.indexOf('audio') === 0 || /\.(mp3|m4a|wav|ogg|oga|flac|aac|opus|wma)$/i.test(f.name)) {
        var uid = uidSeq++;
        var addedAt = Date.now() + i;
        var name = prettyName(f.name);
        newUids.push(uid);
        tracks.push({ uid: uid, name: name, url: URL.createObjectURL(f), dur: null, addedAt: addedAt, file: f });
        idbPut({ uid: uid, name: name, dur: null, addedAt: addedAt, blob: f });
      }
    }
    if (!newUids.length) { toast('No audio files found'); return; }
    render();
    if (currentUid === null) {
      buildQueue();
      playUid(newUids[newUids.length - 1], true);
    } else {
      toast(newUids.length + ' song' + (newUids.length > 1 ? 's' : '') + ' added to library');
    }
  }
  $('fabBtn').addEventListener('click', function () { fileInput.click(); });
  $('addBtn').addEventListener('click', function () { fileInput.click(); });
  fileInput.addEventListener('change', function () { addFiles(fileListSafe(fileInput)); fileInput.value = ''; });
  function fileListSafe(input) {
    // Convert FileList to a real array before the input resets
    var out = [];
    for (var i = 0; i < input.files.length; i++) out.push(input.files[i]);
    return out;
  }
  document.addEventListener('dragover', function (e) { e.preventDefault(); });
  document.addEventListener('drop', function (e) {
    e.preventDefault();
    if (e.dataTransfer && e.dataTransfer.files) addFiles(e.dataTransfer.files);
  });

  /* ==================== playback ==================== */
  function playUid(u, openNowPlaying) {
    var t = byUid(u);
    if (!t) return;
    if (queue.indexOf(u) === -1) buildQueue();
    currentUid = u;
    audio.src = t.url;
    save('svara.last', String(u));
    $('npTitle').textContent = t.name;
    $('miniName').textContent = t.name;
    $('npSub').textContent = t.dur ? 'Local file · ' + fmt(t.dur) : 'Local file';
    $('miniSub').textContent = queueLabel;
    $('npLabel').textContent = queueLabel;
    updateMediaSession(t);
    updateLikeUI();
    renderNextUp();
    miniPlayer.hidden = false;
    audio.play().catch(function () { /* autoplay blocked */ });
    render();
    if (openNowPlaying) openNP();
    scrollCurrentIntoView();
  }

  function indexInQueue() { return queue.indexOf(currentUid); }

  function nextTrack(auto) {
    if (!queue.length) return;
    if (auto && repeat === 2) { audio.currentTime = 0; audio.play(); return; }
    var n;
    if (shuffle && queue.length > 1) {
      do { n = Math.floor(Math.random() * queue.length); } while (queue[n] === currentUid);
    } else {
      n = indexInQueue() + 1;
      if (n >= queue.length) {
        if (auto && repeat === 0) { audio.pause(); return; }
        n = 0;
      }
    }
    playUid(queue[n], false);
  }

  function prevTrack() {
    if (!queue.length) return;
    if (audio.currentTime > 3) { audio.currentTime = 0; return; }
    var n;
    if (shuffle && queue.length > 1) {
      do { n = Math.floor(Math.random() * queue.length); } while (queue[n] === currentUid);
    } else {
      n = indexInQueue() - 1;
      if (n < 0) n = queue.length - 1;
    }
    playUid(queue[n], false);
  }

  function togglePlay() {
    if (currentUid === null) {
      buildQueue();
      if (queue.length) playUid(queue[0], true);
      return;
    }
    if (audio.paused) audio.play().catch(function () {});
    else audio.pause();
  }

  function stopPlayback() {
    audio.pause();
    audio.removeAttribute('src');
    currentUid = null;
    miniPlayer.hidden = true;
    closeNP();
    render();
  }

  function removeTrack(uid) {
    var t = byUid(uid);
    if (!t) return;
    URL.revokeObjectURL(t.url);
    tracks.splice(tracks.indexOf(t), 1);
    idbDelete(uid);
    playlists.forEach(function (p) {
      var i = p.uids.indexOf(uid);
      if (i > -1) p.uids.splice(i, 1);
    });
    var li = liked.indexOf(uid);
    if (li > -1) liked.splice(li, 1);
    persistLiked();
    persistPlaylists();
    if (currentUid === uid) {
      buildQueue();
      if (queue.length) playUid(queue[0], npIsOpen);
      else stopPlayback();
    } else {
      buildQueue();
    }
    render();
  }

  function clearLibrary() {
    stopPlayback();
    tracks.forEach(function (t) { URL.revokeObjectURL(t.url); });
    tracks = [];
    playlists.forEach(function (p) { p.uids = []; });
    liked = [];
    persistLiked();
    persistPlaylists();
    save('svara.last', '0');
    save('svara.pos', '0');
    idbClear();
    buildQueue();
    render();
    toast('Library cleared');
  }

  /* ==================== audio events ==================== */
  audio.addEventListener('play', function () { updatePlayUI(); });
  audio.addEventListener('pause', function () { updatePlayUI(); });
  audio.addEventListener('ended', function () { nextTrack(true); });
  audio.addEventListener('error', function () {
    if (currentUid !== null) toast('This file cannot be played');
  });
  audio.addEventListener('loadedmetadata', function () {
    totTime.textContent = fmt(audio.duration);
    var t = currentUid !== null ? byUid(currentUid) : null;
    if (t && !t.dur) {
      t.dur = audio.duration;
      idbPut({ uid: t.uid, name: t.name, dur: t.dur, addedAt: t.addedAt, blob: t.file });
      $('npSub').textContent = 'Local file · ' + fmt(t.dur);
      render();
    }
    updatePositionState();
  });
  audio.addEventListener('timeupdate', function () {
    if (seeking) return;
    curTime.textContent = fmt(audio.currentTime);
    if (isFinite(audio.duration) && audio.duration > 0) {
      var p = (audio.currentTime / audio.duration) * 1000;
      seek.value = p;
      seek.style.setProperty('--p', (p / 10) + '%');
      miniProgress.style.width = (p / 10) + '%';
      npRing.style.setProperty('--np', (p / 10) + '%');
    }
    var now = Date.now();
    if (now - lastPosSave > 5000) { lastPosSave = now; savePos(); }
    if (now - lastPosState > 1000) { lastPosState = now; updatePositionState(); }
  });
  audio.addEventListener('pause', savePos);
  window.addEventListener('pagehide', savePos);

  function updatePlayUI() {
    var playing = !audio.paused && !audio.ended;
    $('playBtn').innerHTML = icon(playing ? 'pause' : 'play', 34);
    $('miniPlay').innerHTML = icon(playing ? 'pause' : 'play', 22);
    if (playing) { npDisc.classList.add('playing'); $('miniArt').classList.add('spin'); }
    else { npDisc.classList.remove('playing'); $('miniArt').classList.remove('spin'); }
    render();
    if (navigator.mediaSession) {
      try { navigator.mediaSession.playbackState = playing ? 'playing' : 'paused'; } catch (e) {}
    }
  }

  /* ==================== seek bar ==================== */
  seek.addEventListener('input', function () {
    seeking = true;
    var p = seek.value / 1000;
    seek.style.setProperty('--p', (p * 100) + '%');
    npRing.style.setProperty('--np', (p * 100) + '%');
    curTime.textContent = fmt(p * (audio.duration || 0));
  });
  seek.addEventListener('change', function () {
    if (isFinite(audio.duration)) audio.currentTime = (seek.value / 1000) * audio.duration;
    seeking = false;
    updatePositionState();
  });

  /* ==================== rendering ==================== */
  function render() {
    var detail = playlistCtx !== null;
    $('backBtn').hidden = !detail;
    $('sortBtn').hidden = view === 'playlists' && !detail;
    tabsEl.hidden = detail;
    $('songsView').hidden = detail || view !== 'songs';
    $('playlistsView').hidden = detail || view !== 'playlists';
    $('playlistDetail').hidden = !detail;
    if (detail) renderDetail();
    else if (view === 'songs') renderSongs();
    else renderPlaylists();
  }

  function renderSongs() {
    var q = searchQuery();
    var playing = !audio.paused && !audio.ended;
    songList.innerHTML = '';
    var sorted = tracks.slice().sort(compare);
    var shown = 0;
    sorted.forEach(function (t) {
      if (q && t.name.toLowerCase().indexOf(q) === -1) return;
      shown++;
      songList.appendChild(rowEl(t, false, playing));
    });
    $('songsEmpty').hidden = tracks.length > 0;
    $('noResults').hidden = !(tracks.length > 0 && shown === 0 && q);
  }

  function renderPlaylists() {
    var q = searchQuery();
    plGrid.innerHTML = '';
    var shown = 0;

    /* Liked songs (auto playlist, always first) */
    var lkLi = document.createElement('li');
    lkLi.className = 'pl-card liked rippleable';
    lkLi.innerHTML =
      '<div class="pl-art liked">' + icon('heart', 32) + '</div>' +
      '<div class="pl-name">Liked Songs</div>' +
      '<div class="pl-count">' + liked.length + ' song' + (liked.length === 1 ? '' : 's') + '</div>';
    lkLi.addEventListener('click', function () { openPlaylist('liked'); });
    plGrid.appendChild(lkLi);

    var newLi = document.createElement('li');
    newLi.className = 'pl-card new rippleable';
    newLi.innerHTML = '<div class="pl-art">' + icon('add', 30) + '</div><div class="pl-name">New Playlist</div><div class="pl-count">Create one</div>';
    newLi.addEventListener('click', function () { newPlaylistSheet(null); });
    plGrid.appendChild(newLi);

    playlists.forEach(function (p) {
      if (q && p.name.toLowerCase().indexOf(q) === -1) return;
      shown++;
      var li = document.createElement('li');
      li.className = 'pl-card rippleable';
      li.innerHTML =
        '<div class="pl-art">' + icon('playlist', 34) + '</div>' +
        '<div class="pl-name">' + escapeHtml(p.name) + '</div>' +
        '<div class="pl-count">' + p.uids.length + ' song' + (p.uids.length === 1 ? '' : 's') + '</div>';
      li.addEventListener('click', function () { openPlaylist(p.id); });
      plGrid.appendChild(li);
    });
    $('plEmpty').hidden = playlists.length > 0;
  }

  function renderDetail() {
    if (playlistCtx === 'liked') { renderLikedDetail(); return; }
    var pl = getPlaylist(playlistCtx);
    if (!pl) { playlistCtx = null; render(); return; }
    var live = pl.uids.filter(function (u) { return !!byUid(u); });
    var q = searchQuery();
    var playing = !audio.paused && !audio.ended;

    pdHero.innerHTML =
      '<div class="pd-art">' + icon('playlist', 40) + '</div>' +
      '<div class="pd-meta">' +
      '<div class="pd-name">' + escapeHtml(pl.name) + '</div>' +
      '<div class="pd-count">' + live.length + ' song' + (live.length === 1 ? '' : 's') + '</div>' +
      '<div class="pd-actions">' +
      '<button class="btn primary rippleable" id="pdPlayAll">' + icon('play', 18) + ' Play All</button>' +
      '<button class="btn ghost rippleable" id="pdAddSongs">' + icon('add', 16) + ' Add Songs</button>' +
      '<button class="btn ghost rippleable" id="pdDelete">' + icon('trash', 16) + ' Delete</button>' +
      '</div></div>';

    pdList.innerHTML = '';
    var sorted = live.map(byUid).sort(compare);
    var shown = 0;
    sorted.forEach(function (t) {
      if (q && t.name.toLowerCase().indexOf(q) === -1) return;
      shown++;
      pdList.appendChild(rowEl(t, true, playing));
    });
    if (!live.length) {
      var li = document.createElement('li');
      li.className = 'empty slim';
      li.innerHTML = '<div class="empty-title">This playlist is empty</div><div class="empty-sub">Tap "Add Songs" above, or use the \u22EE menu on any song</div>';
      pdList.appendChild(li);
    }
    $('pdPlayAll').addEventListener('click', function () {
      buildQueue();
      if (queue.length) playUid(queue[0], true);
      else toast('This playlist has no songs yet');
    });
    $('pdAddSongs').addEventListener('click', function () { songPickerSheet(pl.id); });
    $('pdDelete').addEventListener('click', function () {
      if (confirm('Delete playlist "' + pl.name + '"? Songs stay in your library.')) {
        playlists.splice(playlists.indexOf(pl), 1);
        playlistCtx = null;
        persistPlaylists();
        render();
        toast('Playlist deleted');
      }
    });
  }

  function renderLikedDetail() {
    var live = liked.filter(function (u) { return !!byUid(u); });
    var q = searchQuery();
    var playing = !audio.paused && !audio.ended;

    pdHero.innerHTML =
      '<div class="pd-art liked">' + icon('heart', 40) + '</div>' +
      '<div class="pd-meta">' +
      '<div class="pd-name">Liked Songs</div>' +
      '<div class="pd-count">' + live.length + ' song' + (live.length === 1 ? '' : 's') + '</div>' +
      '<div class="pd-actions">' +
      '<button class="btn primary rippleable" id="pdPlayAll">' + icon('play', 18) + ' Play All</button>' +
      '</div></div>';

    pdList.innerHTML = '';
    var sorted = live.map(byUid).sort(compare);
    var shown = 0;
    sorted.forEach(function (t) {
      if (q && t.name.toLowerCase().indexOf(q) === -1) return;
      shown++;
      pdList.appendChild(rowEl(t, true, playing));
    });
    if (!live.length) {
      var li = document.createElement('li');
      li.className = 'empty slim';
      li.innerHTML = '<div class="empty-title">No liked songs yet</div><div class="empty-sub">Tap the \u2665 button while a song is playing to like it</div>';
      pdList.appendChild(li);
    }
    $('pdPlayAll').addEventListener('click', function () {
      buildQueue();
      if (queue.length) playUid(queue[0], true);
      else toast('No liked songs yet');
    });
  }

  function rowEl(t, inPlaylist, playing) {
    var li = document.createElement('li');
    var isCur = t.uid === currentUid;
    li.className = 'row rippleable' + (isCur ? ' current' : '') + (isCur && playing ? ' playing' : '');
    li.innerHTML =
      '<div class="row-art">' +
      '<span class="note">' + icon('music', 20) + '</span>' +
      '<span class="eq"><i></i><i></i><i></i></span>' +
      '</div>' +
      '<div class="meta"><div class="name">' + escapeHtml(t.name) + '</div>' +
      '<div class="sub">' + (t.dur ? fmt(t.dur) : 'Local file') + '</div></div>' +
      '<button class="icon-btn small like-row" aria-label="Like">' + icon(isLiked(t.uid) ? 'heart' : 'heartO', 19) + '</button>' +
      '<button class="icon-btn small more-btn" aria-label="Song options">' + icon('more', 20) + '</button>';
    li.addEventListener('click', function (e) {
      if (e.target.closest('.like-row')) return;
      buildQueue(); playUid(t.uid, true);
    });
    li.querySelector('.like-row').addEventListener('click', function (e) {
      e.stopPropagation();
      toggleLike(t.uid);
    });
    li.querySelector('.more-btn').addEventListener('click', function (e) {
      e.stopPropagation();
      songMenuSheet(t.uid, inPlaylist);
    });
    return li;
  }

  function scrollCurrentIntoView() {
    setTimeout(function () {
      var el = songList.querySelector('.row.current') || pdList.querySelector('.row.current');
      if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 60);
  }

  /* ==================== navigation ==================== */
  function openPlaylist(id) { playlistCtx = id; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  $('backBtn').addEventListener('click', function () { playlistCtx = null; render(); });

  tabsEl.addEventListener('click', function (e) {
    var tab = e.target.closest('.tab');
    if (!tab) return;
    view = tab.getAttribute('data-view');
    tabsEl.classList.toggle('second', view === 'playlists');
    Array.prototype.forEach.call(tabsEl.querySelectorAll('.tab'), function (t) {
      t.classList.toggle('active', t === tab);
    });
    render();
  });

  searchBox.addEventListener('input', function () {
    $('clearSearchBtn').hidden = !searchBox.value;
    render();
  });
  $('clearSearchBtn').addEventListener('click', function () {
    searchBox.value = '';
    $('clearSearchBtn').hidden = true;
    render();
  });

  /* ==================== sort menu ==================== */
  $('sortBtn').addEventListener('click', function (e) {
    e.stopPropagation();
    renderSortMenu();
    sortMenu.classList.toggle('open');
  });
  function renderSortMenu() {
    sortMenu.innerHTML = '';
    SORTS.forEach(function (s) {
      var b = document.createElement('button');
      b.className = 'sort-item';
      b.innerHTML = escapeHtml(s.label) +
        '<span class="check' + (sortMode === s.id ? '' : ' empty-check') + '">' + icon('check', 18) + '</span>';
      b.addEventListener('click', function () {
        sortMode = s.id;
        save('svara.sort', sortMode);
        buildQueue();
        render();
        sortMenu.classList.remove('open');
      });
      sortMenu.appendChild(b);
    });
    if (tracks.length) {
      var sep = document.createElement('div');
      sep.className = 'sort-sep';
      sortMenu.appendChild(sep);
      var clear = document.createElement('button');
      clear.className = 'sort-item danger';
      clear.innerHTML = icon('trash', 18) + 'Clear library';
      clear.addEventListener('click', function () {
        sortMenu.classList.remove('open');
        if (confirm('Remove ALL songs from your library? This cannot be undone.')) clearLibrary();
      });
      sortMenu.appendChild(clear);
    }
  }
  document.addEventListener('click', function (e) {
    if (!sortMenu.classList.contains('open')) return;
    if (!e.target.closest('#sortMenu') && !e.target.closest('#sortBtn')) sortMenu.classList.remove('open');
  });

  /* ==================== sheets ==================== */
  function openSheet(html, wire) {
    sheetBody.innerHTML = html;
    sheetEl.classList.add('open');
    sheetBackdrop.classList.add('open');
    if (wire) wire(sheetBody);
  }
  function closeSheet() {
    sheetEl.classList.remove('open');
    sheetBackdrop.classList.remove('open');
  }
  sheetBackdrop.addEventListener('click', closeSheet);

  function songMenuSheet(uid, inPlaylist) {
    var t = byUid(uid);
    if (!t) return;
    openSheet(
      '<div class="sheet-title">' + escapeHtml(t.name) + '</div>' +
      '<button class="sheet-item" data-a="play">' + icon('play', 20) + 'Play</button>' +
      '<button class="sheet-item" data-a="like">' + icon(isLiked(uid) ? 'heart' : 'heartO', 20) + (isLiked(uid) ? 'Remove from Liked songs' : 'Add to Liked songs') + '</button>' +
      '<button class="sheet-item" data-a="add">' + icon('playlist', 20) + 'Add to playlist</button>' +
      (inPlaylist && playlistCtx !== 'liked' ? '<button class="sheet-item danger" data-a="rmpl">' + icon('close', 20) + 'Remove from this playlist</button>' : '') +
      (inPlaylist && playlistCtx === 'liked' ? '<button class="sheet-item danger" data-a="rmlike">' + icon('close', 20) + 'Remove from Liked songs</button>' : '') +
      '<button class="sheet-item danger" data-a="rmlib">' + icon('trash', 20) + 'Remove from library</button>',
      function (root) {
        root.addEventListener('click', function (e) {
          var b = e.target.closest('.sheet-item');
          if (!b) return;
          var a = b.getAttribute('data-a');
          closeSheet();
          if (a === 'play') { buildQueue(); playUid(uid, true); }
          else if (a === 'like') toggleLike(uid);
          else if (a === 'rmlike') toggleLike(uid);
          else if (a === 'add') addToPlaylistSheet(uid);
          else if (a === 'rmpl') {
            var pl = getPlaylist(playlistCtx);
            if (pl) {
              var i = pl.uids.indexOf(uid);
              if (i > -1) pl.uids.splice(i, 1);
              persistPlaylists();
              buildQueue();
              render();
            }
          }
          else if (a === 'rmlib') { removeTrack(uid); toast('Removed from library'); }
        });
      }
    );
  }

  function addToPlaylistSheet(uid) {
    var html = '<div class="sheet-title">Add to playlist</div>';
    if (!playlists.length) {
      html += '<div class="sheet-title" style="text-transform:none;letter-spacing:0;font-size:13px;color:#8b95ad;padding-top:0">No playlists yet — create one below</div>';
    }
    playlists.forEach(function (p) {
      var inPl = p.uids.indexOf(uid) > -1;
      html += '<button class="sheet-item" data-id="' + p.id + '">' + icon('playlist', 20) +
        escapeHtml(p.name) +
        (inPl ? '<span class="sheet-check">' + icon('check', 18) + '</span>' : '') +
        '</button>';
    });
    html += '<button class="sheet-item" data-a="new">' + icon('add', 20) + 'New playlist</button>';
    openSheet(html, function (root) {
      root.addEventListener('click', function (e) {
        var b = e.target.closest('.sheet-item');
        if (!b) return;
        if (b.getAttribute('data-a') === 'new') { newPlaylistSheet(uid); return; }
        var id = parseInt(b.getAttribute('data-id'), 10);
        var pl = getPlaylist(id);
        if (!pl) return;
        var i = pl.uids.indexOf(uid);
        if (i > -1) { pl.uids.splice(i, 1); toast('Removed from "' + pl.name + '"'); }
        else { pl.uids.push(uid); toast('Added to "' + pl.name + '"'); }
        persistPlaylists();
        closeSheet();
        render();
      });
    });
  }

  function songPickerSheet(plId) {
    var pl = getPlaylist(plId);
    if (!pl) return;
    var html = '<div class="sheet-title">Add songs · ' + escapeHtml(pl.name) + '</div>';
    if (!tracks.length) {
      html += '<div class="sheet-title" style="text-transform:none;letter-spacing:0;font-size:13px;color:#8b95ad;padding-top:0">No songs in your library yet — add some first</div>';
    }
    tracks.slice().sort(compare).forEach(function (t) {
      var inPl = pl.uids.indexOf(t.uid) > -1;
      html += '<button class="sheet-item" data-uid="' + t.uid + '">' + icon('music', 20) +
        '<span class="q-name">' + escapeHtml(t.name) + '</span>' +
        '<span class="q-dur">' + (t.dur ? fmt(t.dur) : '') + '</span>' +
        (inPl ? '<span class="sheet-check">' + icon('check', 18) + '</span>' : '') +
        '</button>';
    });
    openSheet(html, function (root) {
      root.addEventListener('click', function (e) {
        var b = e.target.closest('.sheet-item');
        if (!b || !b.getAttribute('data-uid')) return;
        var uid = parseInt(b.getAttribute('data-uid'), 10);
        var i = pl.uids.indexOf(uid);
        if (i > -1) {
          pl.uids.splice(i, 1);
          var chk = b.querySelector('.sheet-check');
          if (chk) b.removeChild(chk);
        } else {
          pl.uids.push(uid);
          var s = document.createElement('span');
          s.className = 'sheet-check';
          s.innerHTML = icon('check', 18);
          b.appendChild(s);
        }
        persistPlaylists();
        buildQueue();
        render();
      });
    });
  }

  function newPlaylistSheet(uidToAdd) {
    openSheet(
      '<div class="sheet-title">New playlist</div>' +
      '<input class="sheet-input" id="plNameInput" placeholder="Playlist name" maxlength="40" autocomplete="off">' +
      '<button class="btn primary full" id="plCreateBtn">Create Playlist</button>',
      function (root) {
        var input = root.querySelector('#plNameInput');
        input.focus();
        function create() {
          var name = input.value.trim() || ('My Playlist ' + plSeq);
          var pl = { id: plSeq++, name: name, uids: [] };
          if (uidToAdd !== null && uidToAdd !== undefined) pl.uids.push(uidToAdd);
          playlists.push(pl);
          persistPlaylists();
          closeSheet();
          render();
          toast('Playlist "' + name + '" created' + (pl.uids.length ? ' with 1 song' : ''));
        }
        root.querySelector('#plCreateBtn').addEventListener('click', create);
        input.addEventListener('keydown', function (e) { if (e.key === 'Enter') create(); });
      }
    );
  }
  $('newPlBtn').addEventListener('click', function () { newPlaylistSheet(null); });

  function queueSheet() {
    if (!queue.length) { toast('Nothing in the queue'); return; }
    var html = '<div class="sheet-title">Playing from · ' + escapeHtml(queueLabel) + '</div>';
    queue.forEach(function (u, i) {
      var t = byUid(u);
      if (!t) return;
      var cur = u === currentUid;
      html += '<button class="sheet-item' + (cur ? ' current' : '') + '" data-uid="' + u + '">' +
        (cur ? icon('play', 20) : '<span class="q-idx">' + (i + 1) + '</span>') +
        '<span class="q-name">' + escapeHtml(t.name) + '</span>' +
        (t.dur ? '<span class="q-dur">' + fmt(t.dur) + '</span>' : '') +
        '</button>';
    });
    openSheet(html, function (root) {
      root.addEventListener('click', function (e) {
        var b = e.target.closest('.sheet-item');
        if (!b || !b.getAttribute('data-uid')) return;
        closeSheet();
        playUid(parseInt(b.getAttribute('data-uid'), 10), false);
      });
    });
  }
  $('npQueue').addEventListener('click', queueSheet);

  /* ==================== now playing ==================== */
  function openNP() { nowPlaying.classList.add('open'); npIsOpen = true; renderNextUp(); }
  function closeNP() { nowPlaying.classList.remove('open'); npIsOpen = false; }
  $('npClose').addEventListener('click', closeNP);
  $('miniArt').addEventListener('click', openNP);
  $('miniMeta').addEventListener('click', openNP);

  /* next up strip inside Now Playing */
  function renderNextUp() {
    var el = $('npNextUp');
    if (!el) return;
    el.innerHTML = '';
    var idx = indexInQueue();
    if (idx < 0) return;
    var upcoming = queue.slice(idx + 1);
    if (!upcoming.length) upcoming = queue.slice(0, idx);
    if (!upcoming.length) { el.hidden = true; return; }
    el.hidden = false;
    var label = document.createElement('div');
    label.className = 'nextup-label';
    label.textContent = 'NEXT UP';
    el.appendChild(label);
    var strip = document.createElement('div');
    strip.className = 'nextup-strip';
    upcoming.slice(0, 12).forEach(function (u) {
      var t = byUid(u);
      if (!t) return;
      var card = document.createElement('button');
      card.className = 'nextup-card rippleable';
      card.innerHTML =
        '<span class="nextup-art">' + icon('music', 16) + '</span>' +
        '<span class="nextup-name">' + escapeHtml(t.name) + '</span>' +
        '<span class="nextup-dur">' + (t.dur ? fmt(t.dur) : '') + '</span>';
      card.addEventListener('click', function () { playUid(u, false); });
      strip.appendChild(card);
    });
    el.appendChild(strip);
  }

  /* gestures on the Now Playing screen:
     - tap left half  = jump back 10 seconds
     - tap right half = jump forward 10 seconds
     - swipe left     = next song
     - swipe right    = previous song
     - swipe down     = close Now Playing */
  function skipBy(sec) {
    if (currentUid === null || !isFinite(audio.duration)) return;
    var t = Math.min(Math.max(audio.currentTime + sec, 0), audio.duration);
    try { audio.currentTime = t; } catch (e) { return; }
    curTime.textContent = fmt(t);
    var b = $('skipBadge');
    b.textContent = (sec > 0 ? '+' : '\u2212') + '10s';
    b.classList.remove('show');
    void b.offsetWidth;
    b.classList.add('show');
  }

  (function () {
    var x0 = 0, y0 = 0, moved = false, active = false;
    nowPlaying.addEventListener('pointerdown', function (e) {
      if (e.target.closest('button, input, .np-header, .np-nextup')) return;
      active = true; moved = false;
      x0 = e.clientX; y0 = e.clientY;
    });
    nowPlaying.addEventListener('pointermove', function (e) {
      if (!active) return;
      if (Math.abs(e.clientX - x0) > 12 || Math.abs(e.clientY - y0) > 12) moved = true;
    });
    function up(e) {
      if (!active) return;
      active = false;
      var dx = e.clientX - x0, dy = e.clientY - y0;
      if (!moved) {
        skipBy(e.clientX < window.innerWidth / 2 ? -10 : 10);
      } else if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.4) {
        if (dx < 0) nextTrack(false);
        else prevTrack();
      } else if (dy > 130 && Math.abs(dy) > Math.abs(dx)) {
        closeNP();
      }
    }
    nowPlaying.addEventListener('pointerup', up);
    nowPlaying.addEventListener('pointercancel', function () { active = false; });
  })();

  /* drag the header down to close */
  (function () {
    var startY = 0, dy = 0, dragging = false;
    npHeader.addEventListener('pointerdown', function (e) {
      if (e.target.closest('button')) return;
      dragging = true;
      startY = e.clientY;
      dy = 0;
      nowPlaying.style.transition = 'none';
      npHeader.setPointerCapture(e.pointerId);
    });
    npHeader.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      dy = Math.max(0, e.clientY - startY);
      nowPlaying.style.transform = 'translateY(' + dy + 'px)';
    });
    function end() {
      if (!dragging) return;
      dragging = false;
      nowPlaying.style.transition = '';
      nowPlaying.style.transform = '';
      if (dy > 110) closeNP();
    }
    npHeader.addEventListener('pointerup', end);
    npHeader.addEventListener('pointercancel', end);
  })();

  /* ==================== controls ==================== */
  $('playBtn').addEventListener('click', togglePlay);
  $('miniPlay').addEventListener('click', togglePlay);
  $('nextBtn').addEventListener('click', function () { nextTrack(false); });
  $('miniNext').addEventListener('click', function () { nextTrack(false); });
  $('prevBtn').addEventListener('click', prevTrack);
  $('miniPrev').addEventListener('click', prevTrack);
  $('npLike').addEventListener('click', function () {
    if (currentUid === null) { toast('Play a song first'); return; }
    toggleLike(currentUid);
  });
  $('miniLike').addEventListener('click', function () {
    if (currentUid === null) { toast('Play a song first'); return; }
    toggleLike(currentUid);
  });
  $('npPl').addEventListener('click', function () {
    if (currentUid === null) { toast('Play a song first'); return; }
    addToPlaylistSheet(currentUid);
  });

  $('shuffleBtn').addEventListener('click', function () {
    shuffle = !shuffle;
    save('svara.shuffle', shuffle ? '1' : '0');
    $('shuffleBtn').classList.toggle('on', shuffle);
    toast(shuffle ? 'Shuffle on' : 'Shuffle off');
  });
  $('repeatBtn').addEventListener('click', function () {
    repeat = (repeat + 1) % 3;
    save('svara.repeat', String(repeat));
    updateRepeatUI();
    toast(repeat === 0 ? 'Repeat off' : repeat === 1 ? 'Repeat all songs' : 'Repeat current song');
  });
  function updateRepeatUI() {
    $('repeatBtn').innerHTML = icon(repeat === 2 ? 'repeatOne' : 'repeat', 22);
    $('repeatBtn').classList.toggle('on', repeat > 0);
  }

  /* ==================== media session (lock screen / notification) ==================== */
  function updateMediaSession(t) {
    if (!('mediaSession' in navigator)) return;
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: t.name,
        artist: 'Hasbi Music Player',
        album: queueLabel
      });
      navigator.mediaSession.setActionHandler('play', function () { audio.play(); });
      navigator.mediaSession.setActionHandler('pause', function () { audio.pause(); });
      navigator.mediaSession.setActionHandler('previoustrack', prevTrack);
      navigator.mediaSession.setActionHandler('nexttrack', function () { nextTrack(false); });
      try {
        navigator.mediaSession.setActionHandler('seekbackward', function () { skipBy(-10); });
        navigator.mediaSession.setActionHandler('seekforward', function () { skipBy(10); });
      } catch (e2) { /* not supported everywhere */ }
      try {
        navigator.mediaSession.setActionHandler('stop', function () { audio.pause(); });
      } catch (e2) { /* optional */ }
      navigator.mediaSession.setActionHandler('seekto', function (d) {
        if (d.seekTime != null) audio.currentTime = d.seekTime;
      });
    } catch (e) { /* not supported */ }
  }
  function updatePositionState() {
    if (!('mediaSession' in navigator) || !navigator.mediaSession.setPositionState) return;
    try {
      if (isFinite(audio.duration) && audio.duration > 0) {
        navigator.mediaSession.setPositionState({
          duration: audio.duration,
          playbackRate: audio.playbackRate || 1,
          position: Math.min(audio.currentTime, audio.duration)
        });
      }
    } catch (e) { /* ignore */ }
  }

  /* ==================== keyboard ==================== */
  document.addEventListener('keydown', function (e) {
    var typing = e.target === searchBox || e.target.classList && e.target.classList.contains('sheet-input');
    if (typing) return;
    if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
    else if (e.code === 'ArrowRight' && e.shiftKey) nextTrack(false);
    else if (e.code === 'ArrowLeft' && e.shiftKey) prevTrack();
    else if (e.key === 'Escape') {
      if (sheetEl.classList.contains('open')) closeSheet();
      else if (sortMenu.classList.contains('open')) sortMenu.classList.remove('open');
      else if (npIsOpen) closeNP();
    }
  });

  /* ==================== init ==================== */
  $('shuffleBtn').classList.toggle('on', shuffle);
  updateRepeatUI();
  updateLikeUI();
  updatePlayUI();
  closeNP();
  buildQueue();
  render();

  /* restore the saved library (IndexedDB) + playlists + likes + last song */
  idbOpen().then(function () {
    if (navigator.storage && navigator.storage.persist) {
      try { navigator.storage.persist().catch(function () {}); } catch (e) {}
    }
    return idbGetAll();
  }).then(function (recs) {
    recs.sort(function (a, b) { return (a.addedAt || 0) - (b.addedAt || 0); });
    recs.forEach(function (rec) {
      if (!rec || !rec.blob) return;
      tracks.push({ uid: rec.uid, name: rec.name, url: URL.createObjectURL(rec.blob), dur: rec.dur, addedAt: rec.addedAt || Date.now(), file: rec.blob });
      if (rec.uid >= uidSeq) uidSeq = rec.uid + 1;
    });
    try {
      var savedPl = JSON.parse(localStorage.getItem('svara.playlists') || '[]');
      if (Array.isArray(savedPl)) {
        savedPl.forEach(function (p) {
          if (p && p.name) {
            playlists.push({ id: p.id, name: p.name, uids: Array.isArray(p.uids) ? p.uids : [] });
            if (p.id >= plSeq) plSeq = p.id + 1;
          }
        });
      }
    } catch (e) { /* ignore */ }
    try {
      var savedLiked2 = JSON.parse(localStorage.getItem('svara.liked') || '[]');
      if (Array.isArray(savedLiked2)) liked = savedLiked2.filter(function (u) { return !!byUid(u); });
    } catch (e) { /* ignore */ }
    buildQueue();
    render();

    /* bring back the last played song — paused, at its saved position */
    var lastUid = parseInt(localStorage.getItem('svara.last') || '0', 10);
    var t = byUid(lastUid);
    if (t) {
      currentUid = lastUid;
      audio.src = t.url;
      $('npTitle').textContent = t.name;
      $('miniName').textContent = t.name;
      $('npSub').textContent = t.dur ? 'Local file · ' + fmt(t.dur) : 'Local file';
      $('miniSub').textContent = queueLabel;
      $('npLabel').textContent = queueLabel;
      miniPlayer.hidden = false;
      updateLikeUI();
      updatePlayUI();
      var pos = parseFloat(localStorage.getItem('svara.pos') || '0');
      if (isFinite(pos) && pos > 0) {
        audio.addEventListener('loadedmetadata', function once() {
          audio.removeEventListener('loadedmetadata', once);
          try { audio.currentTime = Math.min(pos, Math.max(0, (audio.duration || pos) - 1)); } catch (e) {}
        });
      }
    }
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    });
  }
})();
