// ============================================================
// sw.js — Service Worker(オフラインでも動くようにする仕組み)
// 役割: ゲームのファイルを端末に保存し、オフラインでも起動できるようにする。
// ★更新を公開するときは、下の CACHE_VERSION を必ず1つ上げること(上げないと iPad に反映されない)
// ============================================================

const CACHE_VERSION = "v2";  // ← 更新のたびに v3, v4, ... と上げる
const CACHE_NAME = "geopuzzle-" + CACHE_VERSION;

// 保存するファイルの一覧(ファイルを増やしたらここにも足す)
const FILES = [
  "./",
  "./index.html",
  "./config.js",
  "./data.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

// インストール時: 全ファイルを保存する
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES))
      .then(() => self.skipWaiting())
  );
});

// 有効化時: 古いバージョンの保存データを消す
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// 通信時: まず保存したファイルを使い、なければネットワークから取る(キャッシュファースト)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true })
      .then(hit => hit || fetch(event.request))
  );
});
