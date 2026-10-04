// Guarda os arquivos do app no celular para abrir sem internet
// e manda os lembretes de contas (uma vez por dia, quando o Android acordar o app).
const VERSAO = 'cf-0.5';
const ARQUIVOS = [
  './', 'index.html', 'estilo.css', 'app.js', 'manifest.json',
  'fontes/fraunces-latin.woff2', 'fontes/fraunces-latin-ext.woff2', 'fontes/manrope-latin.woff2', 'fontes/manrope-latin-ext.woff2',
  'icones/icone.svg', 'icones/icone-180.png', 'icones/icone-192.png', 'icones/icone-512.png', 'icones/badge-96.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSAO).then((c) => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSAO).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
// Tenta a internet primeiro (pega versão nova); sem internet, usa a cópia guardada.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then((r) => {
      const copia = r.clone();
      caches.open(VERSAO).then((c) => c.put(e.request, copia)).catch(() => {});
      return r;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});

/* ---------- lembretes ---------- */
function idbAbrir() {
  return new Promise((ok, erro) => {
    const r = indexedDB.open('controle-financeiro', 1);
    r.onupgradeneeded = () => r.result.createObjectStore('kv');
    r.onsuccess = () => ok(r.result);
    r.onerror = () => erro(r.error);
  });
}
async function idbLer(chave) {
  const d = await idbAbrir();
  const v = await new Promise((ok, erro) => {
    const r = d.transaction('kv').objectStore('kv').get(chave);
    r.onsuccess = () => ok(r.result);
    r.onerror = () => erro(r.error);
  });
  d.close();
  return v;
}
async function idbGuardar(chave, valor) {
  const d = await idbAbrir();
  await new Promise((ok, erro) => {
    const t = d.transaction('kv', 'readwrite');
    t.objectStore('kv').put(valor, chave);
    t.oncomplete = ok;
    t.onerror = () => erro(t.error);
  });
  d.close();
}
const pad = (n) => String(n).padStart(2, '0');
const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
function diasEntre(de, ate) {
  const [a1, m1, d1] = de.split('-').map(Number);
  const [a2, m2, d2] = ate.split('-').map(Number);
  return Math.round((Date.UTC(a2, m2 - 1, d2) - Date.UTC(a1, m1 - 1, d1)) / 86400000);
}

async function verificarLembretes() {
  if (!(await idbLer('lembretesAtivos'))) return;
  const lista = await idbLer('lembretes');
  if (!lista || !lista.itens) return;
  const avisados = (await idbLer('avisados')) || {};
  const h = iso(new Date());
  for (const it of lista.itens) {
    const n = diasEntre(h, it.data);
    let quando = null, titulo;
    if (n === 1) { quando = 'amanha'; titulo = `Vence amanhã: ${it.titulo}`; }
    else if (n === 0) { quando = 'hoje'; titulo = `Vence hoje: ${it.titulo}`; }
    else if (n < 0 && n >= -3) { quando = 'atrasada'; titulo = `Atrasada: ${it.titulo}`; }
    if (!quando) continue;
    const chave = it.id + '|' + quando;
    if (avisados[chave]) continue;
    await self.registration.showNotification(titulo, {
      body: it.corpo + ' · toque para ver suas contas',
      icon: 'icones/icone-192.png',
      badge: 'icones/badge-96.png',
      tag: it.id,
      data: { tela: 'contas' }
    });
    avisados[chave] = h;
  }
  // esquece avisos com mais de 60 dias
  for (const k of Object.keys(avisados)) if (diasEntre(avisados[k], h) > 60) delete avisados[k];
  await idbGuardar('avisados', avisados);
}

self.addEventListener('periodicsync', (e) => {
  if (e.tag === 'lembretes') e.waitUntil(verificarLembretes());
});

// tocou na notificação: abre o app direto em Contas
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const tela = (e.notification.data && e.notification.data.tela) || 'contas';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((lista) => {
    for (const c of lista) {
      if ('focus' in c) { c.postMessage({ tela }); return c.focus(); }
    }
    return self.clients.openWindow('./?tela=' + tela);
  }));
});
