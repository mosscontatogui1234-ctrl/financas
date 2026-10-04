(() => {
'use strict';

/* =========================================================
   Controle Financeiro — app de celular (estilo A)
   ========================================================= */

const CHAVE = 'controle-financeiro:v1';

const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const MESES_CURTO = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

/* ---------- ícones (desenhos de linha) ---------- */
const ICONES = {
  mercado: '<path d="M3 4h2l2.4 11h11l2-8H6.2"/><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/>',
  comida: '<path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 3v3M12 3v3"/>',
  transporte: '<rect x="3" y="11" width="18" height="6" rx="2"/><path d="M6 11l2-5h8l2 5"/><circle cx="7.5" cy="19" r="1.5"/><circle cx="16.5" cy="19" r="1.5"/>',
  casa: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',
  assinatura: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9l5 3-5 3z"/>',
  saude: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
  lazer: '<rect x="2" y="7" width="20" height="11" rx="4"/><path d="M7 11v3M5.5 12.5h3"/><path d="M15.5 12h.01M18 13.5h.01"/>',
  trabalho: '<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 7l3 3"/>',
  outros: '<circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/>',
  luz: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  internet: '<path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><path d="M12 19.5h.01"/><path d="M2 9a14.5 14.5 0 0 1 20 0"/>',
  agua: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
  celular: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
  educacao: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>',
  presente: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v8h14v-8"/><path d="M12 8v12"/><path d="M12 8c-2-4-6-4-6-1.5S10 8 12 8zM12 8c2-4 6-4 6-1.5S14 8 12 8z"/>',
  roupa: '<path d="M8 3l4 2 4-2 5 4-3 3-2-1v12H8V9l-2 1-3-3z"/>',
  pet: '<circle cx="5" cy="10" r="2"/><circle cx="9" cy="5" r="2"/><circle cx="15" cy="5" r="2"/><circle cx="19" cy="10" r="2"/><path d="M8 17c0-3 2-5 4-5s4 2 4 5c0 2-2 3-4 3s-4-1-4-3z"/>',
  dinheiro: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 10v4M18 10v4"/>',
  video: '<path d="M22 8.5c0-1.5-1-2.6-2.4-2.8C17.6 5.4 14.8 5.2 12 5.2s-5.6.2-7.6.5C3 5.9 2 7 2 8.5v7c0 1.5 1 2.6 2.4 2.8 2 .3 4.8.5 7.6.5s5.6-.2 7.6-.5c1.4-.2 2.4-1.3 2.4-2.8z"/><path d="M10 9.5l5 2.5-5 2.5z"/>',
  venda: '<path d="M20 12l-8 8-9-9V4h7z"/><circle cx="7.5" cy="7.5" r="1.3"/>',
  cartao: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/>',
  calendario: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  inicio: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',
  extrato: '<path d="M9 6h12M9 12h12M9 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
  pizza: '<path d="M21 12A9 9 0 1 1 12 3v9z"/><path d="M15 3.5A9 9 0 0 1 20.5 9H15z"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  esquerda: '<path d="M15 6l-6 6 6 6"/>',
  direita: '<path d="M9 6l6 6-6 6"/>',
  voltar: '<path d="M15 6l-6 6 6 6"/>',
  fechar: '<path d="M6 6l12 12M18 6L6 18"/>',
  ajustes: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  busca: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  alerta: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h.01"/>',
  ok: '<path d="M5 12l5 5 9-10"/>',
  sino: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>',
  entrou: '<path d="M17 7L7 17"/><path d="M7 9v8h8"/>',
  saiu: '<path d="M7 17L17 7"/><path d="M9 7h8v8"/>',
  menos: '<path d="M5 12h14"/>',
  divida: '<path d="M4 7h16v12H4z"/><path d="M16 13h.01"/><path d="M4 7l12-4v4"/>',
  copia: '<path d="M12 3v12M7 10l5 5 5-5"/><path d="M4 21h16"/>',
  abrir: '<path d="M12 15V3M7 8l5-5 5 5"/><path d="M4 21h16"/>',
  lixo: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  lapis: '<path d="M4 20l4-1 11-11-3-3L5 16z"/>',
  estrela: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>'
};
const ICONES_ESCOLHA = ['mercado', 'comida', 'transporte', 'casa', 'assinatura', 'saude', 'lazer', 'trabalho', 'luz', 'internet', 'agua', 'celular', 'educacao', 'presente', 'roupa', 'pet', 'dinheiro', 'video', 'venda', 'cartao', 'divida', 'estrela', 'calendario', 'outros'];

function svg(nome, tam = 20, larg = 2) {
  return `<svg width="${tam}" height="${tam}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${larg}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONES[nome] || ICONES.outros}</svg>`;
}

/* ---------- cores das categorias (texto escuro + fundo claro) ---------- */
const CORES = {
  verde: { fg: '#3F5A24', bg: '#E3EAD3' },
  laranja: { fg: '#B4471F', bg: '#FDEDE6' },
  azul: { fg: '#2856B8', bg: '#E6EDFB' },
  ambar: { fg: '#9A5800', bg: '#FFF1D9' },
  roxo: { fg: '#6B3FA0', bg: '#F0E8FA' },
  rosa: { fg: '#B0306A', bg: '#FCE7F1' },
  teal: { fg: '#0E7480', bg: '#DFF2F3' },
  cinza: { fg: '#4E5B55', bg: '#ECEFED' }
};
const cor = (nome) => CORES[nome] || CORES.cinza;

/* ---------- datas e dinheiro ---------- */
const pad = (n) => String(n).padStart(2, '0');
const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const hoje = () => iso(new Date());
const mesDe = (data) => data.slice(0, 7);
const mesAtual = () => mesDe(hoje());
function somaMes(mes, n) {
  let [a, m] = mes.split('-').map(Number);
  m += n;
  while (m > 12) { m -= 12; a++; }
  while (m < 1) { m += 12; a--; }
  return `${a}-${pad(m)}`;
}
const diasNoMes = (mes) => { const [a, m] = mes.split('-').map(Number); return new Date(a, m, 0).getDate(); };
const dataNoMes = (mes, dia) => `${mes}-${pad(Math.min(Math.max(1, dia), diasNoMes(mes)))}`;
const somaMesesData = (data, n) => dataNoMes(somaMes(mesDe(data), n), Number(data.slice(8, 10)));
function somaDias(data, n) { const [a, m, d] = data.split('-').map(Number); return iso(new Date(a, m - 1, d + n)); }
function diasEntre(de, ate) {
  const [a1, m1, d1] = de.split('-').map(Number);
  const [a2, m2, d2] = ate.split('-').map(Number);
  return Math.round((Date.UTC(a2, m2 - 1, d2) - Date.UTC(a1, m1 - 1, d1)) / 86400000);
}
const nomeMes = (mes) => { const [a, m] = mes.split('-').map(Number); return `${MESES[m - 1]} ${a}`; };
const nomeMesSo = (mes) => MESES[Number(mes.slice(5, 7)) - 1].toLowerCase();
const diaMes = (data) => `${pad(Number(data.slice(8, 10)))}/${data.slice(5, 7)}`;
function dataBonita(data) {
  const h = hoje();
  const [a, m, d] = data.split('-').map(Number);
  const curto = `${pad(d)} ${MESES_CURTO[m - 1]}`;
  if (data === h) return `Hoje · ${curto}`;
  if (data === somaDias(h, -1)) return `Ontem · ${curto}`;
  if (data === somaDias(h, 1)) return `Amanhã · ${curto}`;
  return `${SEMANA[new Date(a, m - 1, d).getDay()]} · ${curto}`;
}
function quandoVence(data) {
  const n = diasEntre(hoje(), data);
  if (n < 0) return n === -1 ? 'venceu ontem' : `venceu há ${-n} dias`;
  if (n === 0) return 'vence hoje';
  if (n === 1) return 'vence amanhã';
  return `faltam ${n} dias`;
}

const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const NUM = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const din = (c) => BRL.format((c || 0) / 100).replace(/ /g, ' ');
const dinCurto = (c) => Math.abs(c) >= 100000 ? 'R$ ' + Math.round(c / 100).toLocaleString('pt-BR') : din(c);
const numTexto = (c) => NUM.format((c || 0) / 100);

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const novoId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

/* =========================================================
   Dados
   ========================================================= */
function categoriasPadrao() {
  return [
    { id: 'casa', nome: 'Casa', icone: 'casa', cor: 'ambar', tipo: 'saida', limite: 0 },
    { id: 'mercado', nome: 'Mercado', icone: 'mercado', cor: 'verde', tipo: 'saida', limite: 0 },
    { id: 'comida', nome: 'Comida fora', icone: 'comida', cor: 'laranja', tipo: 'saida', limite: 0 },
    { id: 'transporte', nome: 'Transporte', icone: 'transporte', cor: 'azul', tipo: 'saida', limite: 0 },
    { id: 'assinaturas', nome: 'Assinaturas', icone: 'assinatura', cor: 'roxo', tipo: 'saida', limite: 0 },
    { id: 'saude', nome: 'Saúde', icone: 'saude', cor: 'rosa', tipo: 'saida', limite: 0 },
    { id: 'lazer', nome: 'Lazer', icone: 'lazer', cor: 'teal', tipo: 'saida', limite: 0 },
    { id: 'trabalho-gasto', nome: 'Material de trabalho', icone: 'trabalho', cor: 'azul', tipo: 'saida', limite: 0 },
    { id: 'dividas', nome: 'Dívidas', icone: 'divida', cor: 'rosa', tipo: 'saida', limite: 0 },
    { id: 'outros', nome: 'Outros', icone: 'outros', cor: 'cinza', tipo: 'saida', limite: 0 },
    { id: 'freela', nome: 'Freela / trabalho', icone: 'trabalho', cor: 'verde', tipo: 'entrada', limite: 0 },
    { id: 'canal', nome: 'Canal (YouTube)', icone: 'video', cor: 'laranja', tipo: 'entrada', limite: 0 },
    { id: 'vendas', nome: 'Vendas', icone: 'venda', cor: 'azul', tipo: 'entrada', limite: 0 },
    { id: 'presente-e', nome: 'Presente / ajuda', icone: 'presente', cor: 'roxo', tipo: 'entrada', limite: 0 },
    { id: 'outros-e', nome: 'Outros', icone: 'outros', cor: 'cinza', tipo: 'entrada', limite: 0 }
  ];
}
function dadosVazios() {
  return { v: 1, lanc: [], cats: categoriasPadrao(), cartoes: [], contas: [], dividas: [], faturasPagas: {}, ajustes: { sons: true } };
}

let db = carregar();

function carregar() {
  try {
    const t = localStorage.getItem(CHAVE);
    if (t) return arrumar(JSON.parse(t));
  } catch (e) { console.error(e); }
  return dadosVazios();
}
function arrumar(d) {
  const base = dadosVazios();
  const r = Object.assign(base, d || {});
  for (const k of ['lanc', 'cats', 'cartoes', 'contas', 'dividas']) if (!Array.isArray(r[k])) r[k] = [];
  if (!r.faturasPagas || typeof r.faturasPagas !== 'object') r.faturasPagas = {};
  if (!r.ajustes || typeof r.ajustes !== 'object') r.ajustes = { sons: true };
  if (!r.cats.some((c) => c.id === 'outros')) r.cats.push(categoriasPadrao().find((c) => c.id === 'outros'));
  if (!r.cats.some((c) => c.id === 'outros-e')) r.cats.push(categoriasPadrao().find((c) => c.id === 'outros-e'));
  return r;
}
function salvar() {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(db));
  } catch (e) {
    alert('Não consegui guardar os dados neste aparelho. Faça uma cópia de segurança em Ajustes.');
  }
  atualizarLembretes();
}

/* ---------- lembretes (notificações) ----------
   O app guarda numa "gaveta" do celular (IndexedDB) a lista do que vai vencer.
   Uma vez por dia o Android acorda o sw.js, que lê essa lista e avisa. */
function idbAbrir() {
  return new Promise((ok, erro) => {
    const r = indexedDB.open('controle-financeiro', 1);
    r.onupgradeneeded = () => r.result.createObjectStore('kv');
    r.onsuccess = () => ok(r.result);
    r.onerror = () => erro(r.error);
  });
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
function listaLembretes() {
  const itens = [];
  for (const mes of [somaMes(mesAtual(), -1), mesAtual(), somaMes(mesAtual(), 1)]) {
    for (const c of compromissos(mes)) {
      if (c.pago || c.valor <= 0) continue;
      let titulo, id;
      if (c.tipo === 'fatura') { titulo = `Fatura do ${c.fatura.cartao.nome}`; id = 'f' + c.fatura.cartao.id; }
      else if (c.tipo === 'parcela') { titulo = `Parcela de ${c.divida.nome}${c.divida.pessoa ? ' (' + c.divida.pessoa + ')' : ''}`; id = 'p' + c.divida.id; }
      else { titulo = c.nome; id = 'c' + c.conta.id; }
      itens.push({ id: id + '|' + mes, data: c.data, titulo, corpo: `${din(c.valor)}${c.aprox ? ' (aproximado)' : ''} · vence ${diaMes(c.data)}` });
    }
  }
  return itens;
}
let lembreteTimer = 0;
function atualizarLembretes() {
  if (!('indexedDB' in window)) return;
  clearTimeout(lembreteTimer);
  lembreteTimer = setTimeout(() => {
    try { idbGuardar('lembretes', { geradoEm: hoje(), itens: listaLembretes() }).catch(() => {}); } catch (e) {}
  }, 300);
}
const suportaLembretes = () => 'Notification' in window && 'serviceWorker' in navigator && location.protocol.startsWith('http');
async function ligarLembretes() {
  if (!suportaLembretes()) { avisoRapido('Os lembretes funcionam no celular, com o app instalado'); return false; }
  const perm = await Notification.requestPermission();
  if (perm !== 'granted') { avisoRapido('O celular não deixou mandar notificações. Libere em Configurações › Apps › Finanças'); return false; }
  const reg = await navigator.serviceWorker.ready;
  if ('periodicSync' in reg) {
    try { await reg.periodicSync.register('lembretes', { minInterval: 12 * 60 * 60 * 1000 }); }
    catch (e) { avisoRapido('Instale o app na tela inicial para os lembretes funcionarem'); }
  }
  await idbGuardar('lembretesAtivos', true);
  atualizarLembretes();
  return true;
}
async function desligarLembretes() {
  try {
    const reg = await navigator.serviceWorker.ready;
    if ('periodicSync' in reg) await reg.periodicSync.unregister('lembretes');
  } catch (e) {}
  try { await idbGuardar('lembretesAtivos', false); } catch (e) {}
}

const catPorId = (id) => db.cats.find((c) => c.id === id) || db.cats.find((c) => c.id === 'outros');
const cartaoPorId = (id) => db.cartoes.find((c) => c.id === id);
const contaPorId = (id) => db.contas.find((c) => c.id === id);
const dividaPorId = (id) => db.dividas.find((c) => c.id === id);
const ordenarLanc = (a, b) => (b.data.localeCompare(a.data)) || (b.criado || 0) - (a.criado || 0);

/* ---------- contas do mês ---------- */
function totaisMes(mes) {
  let e = 0, s = 0;
  for (const l of db.lanc) {
    if (mesDe(l.data) !== mes) continue;
    if (l.tipo === 'entrada') e += l.valor; else s += l.valor;
  }
  return { entrou: e, saiu: s, sobrou: e - s };
}

/* Cartão: compra feita antes do dia de fechar entra na fatura daquele mês;
   no dia de fechar ou depois, vai para a próxima. */
function mesFechamento(cartao, data) {
  const m = mesDe(data);
  const dia = Number(data.slice(8, 10));
  const fecha = Math.min(cartao.fecha, diasNoMes(m));
  return dia < fecha ? m : somaMes(m, 1);
}
const venceNoMesSeguinte = (cartao) => cartao.vence <= cartao.fecha;
function mesVencimento(cartao, data) {
  const f = mesFechamento(cartao, data);
  return venceNoMesSeguinte(cartao) ? somaMes(f, 1) : f;
}
function fatura(cartao, mesV) {
  const mesF = venceNoMesSeguinte(cartao) ? somaMes(mesV, -1) : mesV;
  const itens = db.lanc.filter((l) => l.tipo === 'saida' && l.forma === 'cartao' && l.cartao === cartao.id && mesVencimento(cartao, l.data) === mesV);
  const total = itens.reduce((t, l) => t + l.valor, 0);
  const dataFecha = dataNoMes(mesF, cartao.fecha);
  const dataVence = dataNoMes(mesV, cartao.vence);
  const paga = !!db.faturasPagas[cartao.id + '|' + mesV];
  const h = hoje();
  let situacao = 'aberta';
  if (paga) situacao = 'paga';
  else if (h > dataVence) situacao = 'atrasada';
  else if (h >= dataFecha) situacao = 'fechada';
  return { cartao, mesV, itens, total, dataFecha, dataVence, paga, situacao };
}
function limiteUsado(cartao) {
  let t = 0;
  for (const l of db.lanc) {
    if (l.tipo !== 'saida' || l.forma !== 'cartao' || l.cartao !== cartao.id) continue;
    if (!db.faturasPagas[cartao.id + '|' + mesVencimento(cartao, l.data)]) t += l.valor;
  }
  return t;
}

const contaAtivaNoMes = (c, mes) => (!c.desde || c.desde <= mes) && (!c.ate || c.ate >= mes);
const pagamentoConta = (contaId, mes) => db.lanc.find((l) => l.contaFixa === contaId && l.mesConta === mes);

/* Tudo que vence no mês: contas fixas + faturas dos cartões */
function compromissos(mes) {
  const lista = [];
  for (const c of db.contas) {
    if (!contaAtivaNoMes(c, mes)) continue;
    const pag = pagamentoConta(c.id, mes);
    lista.push({ tipo: 'conta', conta: c, nome: c.nome, valor: pag ? pag.valor : c.valor, data: dataNoMes(mes, c.dia), pago: !!pag, aprox: !pag && c.aproximado });
  }
  for (const k of db.cartoes) {
    const f = fatura(k, mes);
    if (f.total > 0 || f.paga) lista.push({ tipo: 'fatura', fatura: f, nome: 'Fatura · ' + k.nome, valor: f.total, data: f.dataVence, pago: f.paga });
  }
  for (const d of db.dividas) {
    const k = parcelaNoMes(d, mes);
    if (!k) continue;
    const pag = pagamentoParcela(d.id, mes);
    lista.push({ tipo: 'parcela', divida: d, k, nome: d.nome, valor: pag ? pag.valor : valorDaParcela(d, k), data: dataNoMes(mes, d.dia || 10), pago: !!pag });
  }
  lista.sort((a, b) => a.data.localeCompare(b.data));
  return lista;
}
const faltaPagar = (mes) => compromissos(mes).filter((c) => !c.pago).reduce((t, c) => t + c.valor, 0);

function gastosPorCategoria(mes, tipo = 'saida') {
  const mapa = new Map();
  for (const l of db.lanc) {
    if (l.tipo !== tipo || mesDe(l.data) !== mes) continue;
    mapa.set(l.cat, (mapa.get(l.cat) || 0) + l.valor);
  }
  return [...mapa.entries()].map(([id, valor]) => ({ cat: catPorId(id), valor })).sort((a, b) => b.valor - a.valor);
}

function parcelamentos() {
  const grupos = new Map();
  for (const l of db.lanc) {
    if (!l.grupo) continue;
    if (!grupos.has(l.grupo)) grupos.set(l.grupo, []);
    grupos.get(l.grupo).push(l);
  }
  const h = hoje();
  const r = [];
  for (const [grupo, itens] of grupos) {
    itens.sort((a, b) => a.data.localeCompare(b.data));
    const futuras = itens.filter((l) => l.data > h);
    if (!futuras.length) continue;
    r.push({ grupo, desc: itens[0].desc, total: itens.length, pagas: itens.length - futuras.length, porMes: itens[itens.length - 1].valor, falta: futuras.reduce((t, l) => t + l.valor, 0), primeiro: itens[0] });
  }
  return r.sort((a, b) => b.falta - a.falta);
}
/* Dívida em parcelas (ex.: compra no cartão da irmã em 12x):
   inicio = mês da primeira parcela que ainda falta pagar; jaPagas = parcelas pagas antes de anotar no app. */
const mesesEntre = (a, b) => { const [ya, ma] = a.split('-').map(Number); const [yb, mb] = b.split('-').map(Number); return (yb - ya) * 12 + (mb - ma); };
const ehParcelada = (d) => d.parcelas > 0;
const valorParcelaBase = (d) => Math.floor(d.total / d.parcelas);
const valorDaParcela = (d, k) => k === d.parcelas ? d.total - valorParcelaBase(d) * (d.parcelas - 1) : valorParcelaBase(d);
function parcelaNoMes(d, mes) {
  if (!ehParcelada(d) || !d.inicio) return 0;
  const dif = mesesEntre(d.inicio, mes);
  const k = (d.jaPagas || 0) + 1 + dif;
  return dif >= 0 && k <= d.parcelas ? k : 0;
}
const pagamentoParcela = (dividaId, mes) => db.lanc.find((l) => l.divida === dividaId && l.mesConta === mes);
function situacaoDivida(d) {
  const pagamentos = db.lanc.filter((l) => l.divida === d.id);
  if (ehParcelada(d)) {
    const pagas = Math.min(d.parcelas, (d.jaPagas || 0) + pagamentos.length);
    let pago = pagamentos.reduce((t, l) => t + l.valor, 0);
    for (let k = 1; k <= Math.min(d.jaPagas || 0, d.parcelas); k++) pago += valorDaParcela(d, k);
    return { pago, falta: Math.max(0, d.total - pago), pagas };
  }
  const pago = (d.jaPago || 0) + pagamentos.reduce((t, l) => t + l.valor, 0);
  return { pago, falta: Math.max(0, d.total - pago) };
}
function totalDevendo() {
  return parcelamentos().reduce((t, p) => t + p.falta, 0) + db.dividas.reduce((t, d) => t + situacaoDivida(d).falta, 0);
}

function avisosDoMes(mes) {
  const r = [];
  const h = hoje();
  for (const c of compromissos(mes)) {
    if (c.pago || c.valor <= 0) continue;
    const n = diasEntre(h, c.data);
    const alvo = c.tipo === 'fatura' ? { acao: 'ir', tela: 'contas' } : c.tipo === 'parcela' ? { acao: 'pagarParcela', id: c.divida.id } : { acao: 'pagarConta', id: c.conta.id };
    const nome = c.tipo === 'parcela' ? `Parcela de ${c.nome}${c.divida.pessoa ? ' (' + c.divida.pessoa + ')' : ''}` : c.nome;
    if (n < 0) r.push({ cor: 'vermelho', icone: 'alerta', titulo: `${nome} está atrasada`, sub: `${din(c.valor)} · era dia ${diaMes(c.data)}`, ...alvo });
    else if (n <= 7) r.push({ cor: 'amarelo', icone: c.tipo === 'fatura' ? 'cartao' : 'calendario', titulo: `${nome} vence dia ${diaMes(c.data)}`, sub: `${din(c.valor)} · ${quandoVence(c.data)}`, ...alvo });
  }
  for (const g of gastosPorCategoria(mes)) {
    if (g.cat.limite > 0 && g.valor > g.cat.limite) {
      r.push({ cor: 'vermelho', icone: 'alerta', titulo: `${g.cat.nome} passou do limite`, sub: `${din(g.valor)} de ${din(g.cat.limite)}`, acao: 'ir', tela: 'gastos' });
    }
  }
  return r;
}

/* =========================================================
   Estado da tela
   ========================================================= */
const ui = {
  tela: 'inicio',
  mes: mesAtual(),
  filtro: 'tudo',
  busca: '',
  form: null,
  folha: null
};

const $app = document.getElementById('app');
const $folha = document.getElementById('folha');
const $toast = document.getElementById('aviso-rapido');

/* ---------- sons (notas criadas na hora, sem arquivos) ---------- */
let audio = null;
const SONS = {
  // [frequência, começa em (s), duração (s)]
  gasto: [[659.25, 0, 0.14], [987.77, 0.07, 0.3]],
  entrada: [[783.99, 0, 0.1], [1046.5, 0.07, 0.12], [1318.51, 0.14, 0.4]],
  pago: [[523.25, 0, 0.09], [659.25, 0.06, 0.09], [1046.5, 0.12, 0.42]],
  apagar: [[440, 0, 0.12], [329.63, 0.09, 0.28]],
  ligar: [[880, 0, 0.18]]
};
function som(tipo) {
  if (db.ajustes && db.ajustes.sons === false) return;
  try {
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
    if (audio.state === 'suspended') audio.resume();
    const agora = audio.currentTime + 0.01;
    const saida = audio.createGain();
    saida.gain.value = 0.5;
    saida.connect(audio.destination);
    for (const [freq, ini, dur] of SONS[tipo] || []) {
      // nota principal + um brilho mais fraco (fica com cara de sininho)
      for (const [mult, vol, forma] of [[1, 0.22, 'sine'], [2, 0.05, 'triangle']]) {
        const osc = audio.createOscillator();
        const g = audio.createGain();
        osc.type = forma;
        osc.frequency.value = freq * mult;
        g.gain.setValueAtTime(0.0001, agora + ini);
        g.gain.exponentialRampToValueAtTime(vol, agora + ini + 0.012);
        g.gain.exponentialRampToValueAtTime(0.0001, agora + ini + dur + 0.15);
        osc.connect(g); g.connect(saida);
        osc.start(agora + ini);
        osc.stop(agora + ini + dur + 0.2);
      }
    }
  } catch (e) { /* sem som neste aparelho */ }
}
let marcadoAgora = null; // bolinha que acabou de ser marcada (para dar o pulinho)

let toastTimer = 0;
function avisoRapido(texto) {
  $toast.textContent = texto;
  $toast.classList.add('mostrar');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $toast.classList.remove('mostrar'), 2200);
}

/* ---------- pedaços reaproveitados ---------- */
function navMes() {
  return `<div class="mes-nav">
    <button class="redondo sem-borda" data-acao="mes" data-n="-1" aria-label="Mês anterior">${svg('esquerda', 18)}</button>
    <button class="mes-nome" data-acao="mesHoje" aria-label="Voltar para este mês">${nomeMes(ui.mes)}</button>
    <button class="redondo sem-borda" data-acao="mes" data-n="1" aria-label="Próximo mês">${svg('direita', 18)}</button>
  </div>`;
}
function iconeCat(cat, tam = 38) {
  const c = cor(cat.cor);
  return `<span class="item-icone" style="width:${tam}px;height:${tam}px;border-radius:${tam / 2}px;background:${c.bg};color:${c.fg}">${svg(cat.icone, Math.round(tam * 0.47))}</span>`;
}
function formaTexto(l) {
  if (l.tipo === 'entrada') return '';
  if (l.forma === 'cartao') { const k = cartaoPorId(l.cartao); return k ? k.nome : 'Cartão'; }
  return { pix: 'Pix', debito: 'Débito', dinheiro: 'Dinheiro' }[l.forma] || '';
}
function itemLanc(l, comData) {
  const cat = catPorId(l.cat);
  const partes = [cat.nome];
  if (comData) partes.push(dataBonita(l.data).split(' · ')[0].toLowerCase());
  const f = formaTexto(l);
  if (f) partes.push(f);
  const parc = l.parc ? ` (${l.parc[0]}/${l.parc[1]})` : '';
  const valor = l.tipo === 'entrada' ? `<span class="item-valor num verde">+ ${din(l.valor)}</span>` : `<span class="item-valor num">− ${din(l.valor)}</span>`;
  return `<button class="item" data-acao="editar" data-id="${l.id}">
    ${iconeCat(cat)}
    <span class="item-texto"><span class="item-nome">${esc(l.desc)}${parc}</span><span class="item-sub">${esc(partes.join(' · '))}</span></span>
    ${valor}
  </button>`;
}
function nav() {
  const b = (tela, icone, nome) => `<button class="${ui.tela === tela ? 'ativo' : ''}" data-acao="ir" data-tela="${tela}" ${ui.tela === tela ? 'aria-current="page"' : ''}>${svg(icone, 22)}${nome}</button>`;
  return `<nav class="nav" aria-label="Menu">
    ${b('inicio', 'inicio', 'Início')}
    ${b('extrato', 'extrato', 'Extrato')}
    <button class="nav-mais" data-acao="novo" aria-label="Anotar gasto ou entrada">${svg('mais', 26, 2.6)}</button>
    ${b('gastos', 'pizza', 'Gastos')}
    ${b('contas', 'calendario', 'Contas')}
  </nav>`;
}

/* =========================================================
   Telas
   ========================================================= */
function telaInicio() {
  const t = totaisMes(ui.mes);
  const falta = faltaPagar(ui.mes);
  const ehAgora = ui.mes === mesAtual();
  const avisos = avisosDoMes(ui.mes);
  const ultimos = db.lanc.filter((l) => mesDe(l.data) === ui.mes && l.data <= (ehAgora ? hoje() : '9999')).sort(ordenarLanc).slice(0, 5);
  const nada = db.lanc.length === 0;

  const nome = (db.ajustes.nome || 'MOSS').trim() || 'MOSS';
  let html = `<header class="topo">
    <div class="ola">
      <span class="ola-avatar" aria-hidden="true">${esc(nome[0].toUpperCase())}</span>
      <span class="ola-texto"><span>Olá,</span><b>${esc(nome)}</b></span>
      <button class="redondo" data-acao="ir" data-tela="ajustes" aria-label="Ajustes">${svg('ajustes', 20)}</button>
    </div>
    <div class="saldo">
      <div class="mes-nav">
        <button class="redondo sem-borda" data-acao="mes" data-n="-1" aria-label="Mês anterior">${svg('esquerda', 16)}</button>
        <button class="mes-nome" data-acao="mesHoje" aria-label="Voltar para este mês">Sobrou em ${nomeMesSo(ui.mes)}${ui.mes.slice(0, 4) !== mesAtual().slice(0, 4) ? ' de ' + ui.mes.slice(0, 4) : ''}</button>
        <button class="redondo sem-borda" data-acao="mes" data-n="1" aria-label="Próximo mês">${svg('direita', 16)}</button>
      </div>
      <span class="saldo-valor num ${t.sobrou < 0 ? 'neg' : ''}">${t.sobrou < 0 ? '− ' : ''}${din(Math.abs(t.sobrou))}</span>
    </div>
    <div class="tres">
      <button data-acao="ir" data-tela="extrato" data-filtro="entrada"><span>Entrou</span><b class="num">${dinCurto(t.entrou)}</b></button>
      <button data-acao="ir" data-tela="extrato" data-filtro="saida"><span>Saiu</span><b class="num">${dinCurto(t.saiu)}</b></button>
      <button class="falta" data-acao="ir" data-tela="contas"><span>Falta pagar</span><b class="num">${dinCurto(falta)}</b></button>
    </div>
  </header>
  <div class="corpo">`;

  if (nada) {
    html += `<div class="vazio">
      <span class="item-icone" style="background:var(--verde-claro);color:var(--verde);width:52px;height:52px;border-radius:26px">${svg('dinheiro', 26)}</span>
      <b>Vamos começar?</b>
      <p>Anote o dinheiro que entrou este mês e cada gasto que fizer. Em Contas, cadastre seu cartão e as contas de todo mês (aluguel, luz, internet).</p>
      <button class="botao" data-acao="novo">${svg('mais', 20, 2.6)} Anotar o primeiro</button>
      <button class="link" data-acao="ir" data-tela="contas">Cadastrar cartão e contas</button>
    </div>`;
  }

  // depois de instalado no celular, pergunta uma vez se quer lembretes
  const instalado = window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;
  if (instalado && suportaLembretes() && db.ajustes.lembretes === undefined && !nada) {
    html += `<div class="vazio" style="align-items:stretch;text-align:left">
      <b>Quer ser avisado antes das contas vencerem?</b>
      <p>O celular manda uma notificação um dia antes e no dia: fatura, contas e parcelas.</p>
      <div class="botoes"><button class="botao sec pequeno" data-acao="naoQueroLembretes">Agora não</button><button class="botao pequeno" data-acao="alternarLembretes">Quero</button></div>
    </div>`;
  }

  if (avisos.length) {
    html += `<section class="secao"><h2 class="secao-titulo">Avisos</h2>`;
    for (const a of avisos) {
      html += `<button class="aviso ${a.cor}" data-acao="${a.acao}" ${a.tela ? `data-tela="${a.tela}"` : ''} ${a.id ? `data-id="${a.id}"` : ''}>
        ${svg(a.icone, 22)}<span><b>${esc(a.titulo)}</b><small class="num">${esc(a.sub)}</small></span>${svg('direita', 18)}
      </button>`;
    }
    html += `</section>`;
  }

  if (!nada) {
    html += `<section class="secao">
      <div class="secao-cab"><h2 class="secao-titulo">Últimos lançamentos</h2><button class="link" data-acao="ir" data-tela="extrato">Ver extrato</button></div>`;
    if (ultimos.length) html += `<div class="lista">${ultimos.map((l) => itemLanc(l, true)).join('')}</div>`;
    else html += `<div class="vazio"><p>Nada anotado em ${nomeMesSo(ui.mes)}.</p></div>`;
    html += `</section>`;
  }
  return html + `</div>`;
}

function telaExtrato() {
  let itens = db.lanc.filter((l) => mesDe(l.data) === ui.mes);
  const t = totaisMes(ui.mes);
  if (ui.filtro !== 'tudo') itens = itens.filter((l) => l.tipo === ui.filtro);
  const q = ui.busca.trim().toLowerCase();
  if (q) itens = itens.filter((l) => (l.desc + ' ' + catPorId(l.cat).nome).toLowerCase().includes(q));
  itens.sort(ordenarLanc);

  let html = `<header class="cab">
    <div class="cab-linha"><h1>Extrato</h1>${navMes()}</div>
    <div class="resumo-dois">
      <div><span>Entrou</span><b class="num verde">${din(t.entrou)}</b></div>
      <div><span>Saiu</span><b class="num">${din(t.saiu)}</b></div>
    </div>
    <label class="busca">${svg('busca', 18)}<input type="search" placeholder="Procurar" value="${esc(ui.busca)}" data-campo-busca aria-label="Procurar no extrato"></label>
    <div class="filtros" role="group" aria-label="Mostrar">
      ${['tudo', 'entrada', 'saida'].map((f) => `<button class="${ui.filtro === f ? 'sel' : ''}" data-acao="filtro" data-f="${f}" aria-pressed="${ui.filtro === f}">${{ tudo: 'Tudo', entrada: 'Entradas', saida: 'Saídas' }[f]}</button>`).join('')}
    </div>
  </header><div class="corpo" style="gap:12px">`;

  if (!itens.length) {
    html += `<div class="vazio"><p>${q ? 'Nada encontrado com esse nome.' : `Nada anotado em ${nomeMesSo(ui.mes)}.`}</p>${q ? '' : `<button class="botao pequeno" data-acao="novo">${svg('mais', 18, 2.6)} Anotar</button>`}</div>`;
  } else {
    let dia = null, grupo = [];
    const fechar = () => {
      if (!grupo.length) return;
      const soma = grupo.reduce((s, l) => s + (l.tipo === 'entrada' ? l.valor : -l.valor), 0);
      html += `<h3 class="dia-titulo"><span>${dataBonita(dia)}</span><span class="num">${soma >= 0 ? '+ ' : '− '}${din(Math.abs(soma))}</span></h3><div class="lista">${grupo.map((l) => itemLanc(l, false)).join('')}</div>`;
      grupo = [];
    };
    for (const l of itens) { if (l.data !== dia) { fechar(); dia = l.data; } grupo.push(l); }
    fechar();
  }
  return html + `</div>`;
}

function rosca(partes, total) {
  const r = 70, C = 2 * Math.PI * r;
  let acc = 0, s = '';
  const folga = partes.length > 1 ? 2 : 0;
  for (const p of partes) {
    const len = (p.valor / total) * C;
    s += `<circle cx="90" cy="90" r="70" fill="none" stroke="${p.cor}" stroke-width="24" stroke-dasharray="${Math.max(len - folga, 0.5).toFixed(2)} ${C.toFixed(2)}" stroke-dashoffset="${(-acc).toFixed(2)}" transform="rotate(-90 90 90)"/>`;
    acc += len;
  }
  return `<svg width="150" height="150" viewBox="0 0 180 180" role="img" aria-label="Gráfico dos gastos por categoria"><circle cx="90" cy="90" r="70" fill="none" stroke="#EEF1EF" stroke-width="24"/>${s}</svg>`;
}

function telaGastos() {
  const lista = gastosPorCategoria(ui.mes);
  const t = totaisMes(ui.mes);
  // no mês de agora, compara com o mês passado só até o mesmo dia (senão é injusto)
  const mesAnt = somaMes(ui.mes, -1);
  const ateDia = ui.mes === mesAtual() ? Number(hoje().slice(8, 10)) : 31;
  const anterior = db.lanc.filter((l) => l.tipo === 'saida' && mesDe(l.data) === mesAnt && Number(l.data.slice(8, 10)) <= ateDia).reduce((s, l) => s + l.valor, 0);
  const saiuAteDia = ateDia === 31 ? t.saiu : db.lanc.filter((l) => l.tipo === 'saida' && mesDe(l.data) === ui.mes && Number(l.data.slice(8, 10)) <= ateDia).reduce((s, l) => s + l.valor, 0);
  const estourou = lista.filter((g) => g.cat.limite > 0 && g.valor > g.cat.limite).length;
  const entradas = gastosPorCategoria(ui.mes, 'entrada');
  // categorias com limite mas sem gasto também aparecem
  const comLimite = db.cats.filter((c) => c.tipo === 'saida' && c.limite > 0 && !lista.some((g) => g.cat.id === c.id)).map((c) => ({ cat: c, valor: 0 }));

  let html = `<header class="cab">
    <div class="cab-linha"><h1>Gastos</h1>${navMes()}</div>
  </header><div class="corpo">`;

  if (!lista.length) {
    html += `<div class="vazio"><b>Nenhum gasto em ${nomeMesSo(ui.mes)}</b><p>Quando você anotar gastos, aqui aparece para onde foi o dinheiro.</p></div>`;
  } else {
    const comp = anterior > 0 ? Math.round(((saiuAteDia - anterior) / anterior) * 100) : null;
    html += `<section class="rosca-box">
      <div class="rosca">${rosca(lista.map((g) => ({ valor: g.valor, cor: cor(g.cat.cor).fg })), t.saiu)}
        <div class="rosca-meio"><span>Gastou</span><b class="num">${dinCurto(t.saiu)}</b></div>
      </div>
      <div class="rosca-info">
        <div><span>Maior gasto</span><b>${esc(lista[0].cat.nome)} · ${Math.round((lista[0].valor / t.saiu) * 100)}%</b></div>
        <div><span>Passaram do limite</span><b class="${estourou ? 'vermelho' : ''}">${estourou ? estourou + (estourou > 1 ? ' categorias' : ' categoria') : 'Nenhuma'}</b></div>
        ${comp === null ? '' : `<div><span>Comparado a ${nomeMesSo(mesAnt)}${ateDia < 31 ? ' até dia ' + ateDia : ''}</span><b class="${comp > 0 ? 'vermelho' : 'verde'}">${comp > 0 ? comp + '% a mais' : comp < 0 ? -comp + '% a menos' : 'igual'}</b></div>`}
      </div>
    </section>`;
  }

  const todas = lista.concat(comLimite);
  if (todas.length) {
    html += `<section class="secao"><div class="secao-cab"><h2 class="secao-titulo">Por categoria</h2><span class="dica">toque para pôr limite</span></div><div class="lista">`;
    for (const g of todas) {
      const c = cor(g.cat.cor);
      const pct = t.saiu ? Math.round((g.valor / t.saiu) * 100) : 0;
      let direita, largura, nota = '';
      if (g.cat.limite > 0) {
        direita = `${din(g.valor)} de ${din(g.cat.limite)}`;
        largura = Math.min(100, (g.valor / g.cat.limite) * 100);
        if (g.valor > g.cat.limite) nota = `<span class="cat-nota vermelho">Passou ${din(g.valor - g.cat.limite)} do limite</span>`;
        else nota = `<span class="cat-nota" style="color:var(--suave);font-weight:600">Ainda pode gastar ${din(g.cat.limite - g.valor)}</span>`;
      } else {
        direita = `${din(g.valor)} · ${pct}%`;
        largura = pct;
      }
      const corBarra = g.cat.limite > 0 && g.valor > g.cat.limite ? 'var(--perigo)' : c.fg;
      html += `<button class="cat-linha" data-acao="editarCategoria" data-id="${g.cat.id}">
        <span class="cat-topo"><span class="bolinha" style="background:${c.bg};color:${c.fg}">${svg(g.cat.icone, 15)}</span><b>${esc(g.cat.nome)}</b><span class="num">${direita}</span></span>
        <span class="barra"><i style="width:${largura}%;background:${corBarra}"></i></span>${nota}
      </button>`;
    }
    html += `</div></section>`;
  }

  if (entradas.length) {
    html += `<section class="secao"><h2 class="secao-titulo">De onde veio o dinheiro</h2><div class="lista">`;
    for (const g of entradas) {
      html += `<div class="item">${iconeCat(g.cat, 34)}<span class="item-texto"><span class="item-nome">${esc(g.cat.nome)}</span><span class="item-sub">${Math.round((g.valor / t.entrou) * 100)}% do que entrou</span></span><span class="item-valor num verde">${din(g.valor)}</span></div>`;
    }
    html += `</div></section>`;
  }
  return html + `</div>`;
}

function telaContas() {
  const comps = compromissos(ui.mes);
  const falta = comps.filter((c) => !c.pago).reduce((t, c) => t + c.valor, 0);
  const parc = parcelamentos();
  const h = hoje();

  let html = `<header class="cab">
    <div class="cab-linha"><h1>Contas</h1>${navMes()}</div>
    <span class="pequeno-texto">Falta pagar em ${nomeMesSo(ui.mes)}: <b class="num ${falta ? 'laranja' : 'verde'}">${din(falta)}</b></span>
  </header><div class="corpo">`;

  // cartões
  html += `<section class="secao"><div class="secao-cab"><h2 class="secao-titulo">Cartão de crédito</h2><button class="link" data-acao="editarCartao">+ Cartão</button></div>`;
  if (!db.cartoes.length) {
    html += `<div class="vazio"><p>Cadastre seu cartão para saber o valor da fatura e quando ela vence. As compras no cartão já vão sendo somadas sozinhas.</p><button class="botao pequeno" data-acao="editarCartao">${svg('cartao', 18)} Cadastrar cartão</button></div>`;
  }
  for (const k of db.cartoes) {
    const f = fatura(k, ui.mes);
    const usado = limiteUsado(k);
    const etiqueta = { aberta: 'Aberta', fechada: 'Fechada', paga: 'Paga', atrasada: 'Atrasada' }[f.situacao];
    const pctLim = k.limite > 0 ? Math.min(100, (usado / k.limite) * 100) : 0;
    let quando;
    if (f.paga) quando = `Vencimento ${diaMes(f.dataVence)}`;
    else if (f.situacao === 'aberta') quando = `Fecha ${diaMes(f.dataFecha)} · vence <b style="color:var(--texto)">${diaMes(f.dataVence)}</b>`;
    else quando = `Fechou ${diaMes(f.dataFecha)} · <b style="color:var(--texto)">vence ${diaMes(f.dataVence)} (${quandoVence(f.dataVence)})</b>`;
    html += `<div class="cartao-box">
      <div class="cartao-cab">
        <button class="cartao-nome" data-acao="editarCartao" data-id="${k.id}">${svg('cartao', 18)} ${esc(k.nome)} ${svg('lapis', 14)}</button>
        <span class="etiqueta ${f.situacao}">${etiqueta}</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:2px">
        <span class="rotulo">Fatura de ${nomeMesSo(ui.mes)}</span>
        <span class="fatura-valor num">${din(f.total)}</span>
        <span class="pequeno-texto">${quando}</span>
      </div>
      ${k.limite > 0 ? `<div style="display:flex;flex-direction:column;gap:6px">
        <span class="barra" style="height:6px"><i style="width:${pctLim}%;background:${pctLim > 90 ? 'var(--perigo)' : 'var(--verde)'}"></i></span>
        <span class="pequeno-texto" style="font-size:12px">Usou ${din(usado)} do limite de ${din(k.limite)} · livre ${din(Math.max(0, k.limite - usado))}</span>
      </div>` : ''}
      <div class="botoes">
        ${f.total > 0 ? (f.paga
          ? `<button class="botao sec pequeno" data-acao="faturaPaga" data-id="${k.id}" data-v="0">Desmarcar pagamento</button>`
          : `<button class="botao pequeno" data-acao="faturaPaga" data-id="${k.id}" data-v="1">${svg('ok', 18, 2.6)} Já paguei</button>`) : ''}
        <button class="botao sec pequeno" data-acao="verFatura" data-id="${k.id}">Ver compras (${f.itens.length})</button>
      </div>
    </div>`;
  }
  html += `</section>`;

  // contas do mês
  const fixas = comps.filter((c) => c.tipo === 'conta' || c.tipo === 'parcela');
  html += `<section class="secao"><div class="secao-cab"><h2 class="secao-titulo">Contas deste mês</h2><button class="link" data-acao="editarConta">+ Conta</button></div>`;
  if (!fixas.length) {
    html += `<div class="vazio"><p>Aluguel, luz, internet, celular… Cadastre uma vez e elas aparecem todo mês para você marcar quando pagar.</p><button class="botao pequeno" data-acao="editarConta">${svg('calendario', 18)} Cadastrar conta</button></div>`;
  } else {
    html += `<div class="lista">`;
    for (const c of fixas) {
      const n = diasEntre(h, c.data);
      const classe = c.pago ? 'sim' : n < 0 ? 'atraso' : n <= 3 ? 'alerta' : '';
      const parcela = c.tipo === 'parcela';
      const id = parcela ? c.divida.id : c.conta.id;
      const pagoEm = c.pago ? (parcela ? pagamentoParcela(id, ui.mes) : pagamentoConta(id, ui.mes)).data : '';
      const atrasoTxt = n < 0 ? ' · atrasada' : n <= 3 ? ' · ' + quandoVence(c.data) : '';
      let sub;
      if (parcela) sub = `parcela ${c.k} de ${c.divida.parcelas}${c.divida.pessoa ? ' · para ' + c.divida.pessoa : ''} · ${c.pago ? 'paga em ' + diaMes(pagoEm) : 'até ' + diaMes(c.data) + atrasoTxt}`;
      else sub = c.pago ? `paga em ${diaMes(pagoEm)}` : `vence ${diaMes(c.data)}${c.aprox ? ' · valor aproximado' : ''}${atrasoTxt}`;
      const acaoCheck = parcela ? (c.pago ? 'despagarParcela' : 'pagarParcela') : (c.pago ? 'despagarConta' : 'pagarConta');
      html += `<div class="item ${c.pago ? 'pago' : ''}">
        <button class="check ${classe} ${c.pago && marcadoAgora === id ? 'pop' : ''}" data-acao="${acaoCheck}" data-id="${id}" aria-label="${c.pago ? 'Desmarcar' : 'Marcar como paga'}: ${esc(c.nome)}"><i>${c.pago ? svg('ok', 14, 3) : ''}</i></button>
        <button class="item-texto" style="border:none;background:none;padding:0;text-align:left" data-acao="${parcela ? 'editarDivida' : 'editarConta'}" data-id="${id}"><span class="item-nome">${esc(c.nome)}</span><span class="item-sub ${n < 0 && !c.pago ? 'vermelho' : ''}">${esc(sub)}</span></button>
        <span class="item-valor num">${din(c.valor)}</span>
      </div>`;
    }
    html += `</div>`;
  }
  html += `</section>`;

  // devendo
  const devendo = totalDevendo();
  html += `<section class="secao"><div class="secao-cab"><h2 class="secao-titulo">O que estou devendo</h2><button class="link" data-acao="editarDivida">+ Dívida</button></div>`;
  if (!parc.length && !db.dividas.length) {
    html += `<div class="vazio"><p>Compras parceladas aparecem aqui sozinhas, inclusive as feitas no cartão de outra pessoa. Para um empréstimo ou dinheiro que você deve a alguém, toque em “+ Dívida”.</p></div>`;
  } else {
    html += `<div class="lista"><div class="item" style="padding-bottom:6px"><span class="item-texto"><span class="item-sub">Total que ainda falta pagar</span></span><span class="item-valor num laranja" style="font-size:16px">${din(devendo)}</span></div>`;
    for (const p of parc) {
      html += `<button class="cat-linha" data-acao="editar" data-id="${p.primeiro.id}">
        <span class="cat-topo"><b>${esc(p.desc)}</b><span class="num">faltam ${din(p.falta)}</span></span>
        <span class="barra" style="height:6px"><i style="width:${(p.pagas / p.total) * 100}%;background:var(--entrada)"></i></span>
        <span class="item-sub">Parcela ${p.pagas} de ${p.total} · ${din(p.porMes)} por mês${p.primeiro.forma === 'cartao' ? ' · no cartão' : ''}</span>
      </button>`;
    }
    for (const d of db.dividas) {
      const s = situacaoDivida(d);
      if (ehParcelada(d)) {
        const kAgora = parcelaNoMes(d, mesAtual());
        const pagaAgora = kAgora && pagamentoParcela(d.id, mesAtual());
        let esteMes = '';
        if (s.falta <= 0) esteMes = '<span class="verde">Tudo pago</span>';
        else if (kAgora) esteMes = pagaAgora ? `<span class="verde">Parcela deste mês já paga</span>` : `<span class="laranja">Parcela deste mês ainda não paga (até dia ${d.dia || 10})</span>`;
        else if (d.inicio > mesAtual()) esteMes = `Primeira parcela em ${nomeMesSo(d.inicio)}`;
        html += `<button class="cat-linha" data-acao="editarDivida" data-id="${d.id}">
          <span class="cat-topo"><b>${esc(d.nome)}${d.pessoa ? ` <span style="font-weight:500;color:var(--suave)">· ${esc(d.pessoa)}</span>` : ''}</b><span class="num">${s.falta ? 'faltam ' + din(s.falta) : '<span class="verde">quitada</span>'}</span></span>
          <span class="barra" style="height:6px"><i style="width:${(s.pagas / d.parcelas) * 100}%;background:var(--entrada)"></i></span>
          <span class="item-sub">${s.pagas} de ${d.parcelas} parcelas pagas · ${din(valorParcelaBase(d))} por mês · faltam ${d.parcelas - s.pagas}</span>
          ${esteMes ? `<span class="cat-nota">${esteMes}</span>` : ''}
        </button>`;
        continue;
      }
      html += `<div class="cat-linha">
        <span class="cat-topo"><b>${esc(d.nome)}${d.pessoa ? ` <span style="font-weight:500;color:var(--suave)">· ${esc(d.pessoa)}</span>` : ''}</b><span class="num">${s.falta ? 'faltam ' + din(s.falta) : '<span class="verde">quitada</span>'}</span></span>
        <span class="barra" style="height:6px"><i style="width:${d.total ? Math.min(100, (s.pago / d.total) * 100) : 0}%;background:var(--entrada)"></i></span>
        <span class="item-sub">Pagou ${din(s.pago)} de ${din(d.total)}</span>
        <span class="botoes" style="margin-top:4px">
          ${s.falta ? `<button class="botao pequeno" data-acao="pagarDivida" data-id="${d.id}">Paguei uma parte</button>` : ''}
          <button class="botao sec pequeno" data-acao="editarDivida" data-id="${d.id}">Editar</button>
        </span>
      </div>`;
    }
    html += `</div>`;
  }
  return html + `</section></div>`;
}

function telaAnotar() {
  const f = ui.form;
  const ehSaida = f.tipo === 'saida';
  const cats = db.cats.filter((c) => c.tipo === f.tipo);
  const h = hoje(), ontem = somaDias(h, -1);
  const outraData = f.data !== h && f.data !== ontem;

  let formas = '';
  if (ehSaida) {
    const op = [['pix', 'Pix'], ['debito', 'Débito'], ['dinheiro', 'Dinheiro']].map(([v, n]) => `<button class="chip ${f.forma === v ? 'sel' : ''}" data-acao="forma" data-f="${v}" aria-pressed="${f.forma === v}">${n}</button>`);
    for (const k of db.cartoes) op.push(`<button class="chip ${f.forma === 'cartao' && f.cartao === k.id ? 'sel' : ''}" data-acao="forma" data-f="cartao" data-k="${k.id}" aria-pressed="${f.forma === 'cartao' && f.cartao === k.id}">${svg('cartao', 16)} ${esc(k.nome)}</button>`);
    if (!db.cartoes.length) op.push(`<button class="chip" data-acao="editarCartao">${svg('mais', 16)} Meu cartão de crédito</button>`);
    if (!f.id) op.push(`<button class="chip ${f.forma === 'outro' ? 'sel' : ''}" data-acao="forma" data-f="outro" aria-pressed="${f.forma === 'outro'}">${svg('cartao', 16)} Cartão de outra pessoa</button>`);
    formas = `<div class="campo"><span class="campo-nome">Pagou com</span><div class="chips">${op.join('')}</div></div>`;
  }
  const deOutro = ehSaida && f.forma === 'outro';
  const proxMes = somaMes(mesAtual(), 1);
  const blocoOutro = deOutro ? `
    <div class="campo">
      <label for="campo-pessoa">De quem é o cartão?</label>
      <input id="campo-pessoa" class="entrada-texto" data-campo="pessoa" value="${esc(f.pessoa || '')}" placeholder="Ex.: minha irmã" autocomplete="off" maxlength="30">
    </div>
    <div class="campo"><span class="campo-nome">Parcelas</span>
      <div class="contador">
        <button class="redondo" data-acao="parcelas" data-n="-1" aria-label="Menos parcelas">${svg('menos', 18)}</button>
        <b class="num">${f.parcelas}x</b>
        <button class="redondo" data-acao="parcelas" data-n="1" aria-label="Mais parcelas">${svg('mais', 18)}</button>
        <span class="dica num" data-dica-parcela>${f.parcelas > 1 ? `${f.parcelas}x de ${din(Math.floor(f.valor / f.parcelas))}` : 'À vista'}</span>
      </div>
    </div>
    <div class="campo"><span class="campo-nome">Quantas você já pagou para a pessoa?</span>
      <div class="contador">
        <button class="redondo" data-acao="jaPagas" data-n="-1" aria-label="Menos">${svg('menos', 18)}</button>
        <b class="num">${f.jaPagas || 0}</b>
        <button class="redondo" data-acao="jaPagas" data-n="1" aria-label="Mais">${svg('mais', 18)}</button>
        <span class="dica">${f.jaPagas ? `faltam ${f.parcelas - f.jaPagas}` : 'nenhuma ainda'}</span>
      </div>
    </div>
    <div class="campo"><span class="campo-nome">A próxima parcela que você vai pagar é</span>
      <div class="chips">
        <button class="chip ${!f.inicioProx ? 'sel' : ''}" data-acao="inicioOutro" data-v="0">Este mês (${nomeMesSo(mesAtual())})</button>
        <button class="chip ${f.inicioProx ? 'sel' : ''}" data-acao="inicioOutro" data-v="1">Mês que vem (${nomeMesSo(proxMes)})</button>
      </div>
    </div>
    <div class="campo">
      <label for="campo-dia-outro">Você paga para a pessoa todo dia</label>
      <input id="campo-dia-outro" class="entrada-texto num" type="number" inputmode="numeric" min="1" max="31" data-campo="diaOutro" value="${f.diaOutro || ''}" placeholder="Ex.: 10" style="max-width:140px">
    </div>
    <p class="dica" style="margin:0">Fica em Contas: todo mês aparece a parcela para você marcar quando pagar. Ela não entra no seu cartão.</p>` : '';

  const porParcela = f.parcelas > 1 ? Math.floor(f.valor / f.parcelas) : f.valor;
  const editando = !!f.id;
  const ehConta = editando && (f.contaFixa || f.divida);

  return `<div class="form">
    <div class="form-cab">
      <button class="redondo" data-acao="voltar" aria-label="Voltar">${svg('voltar', 20)}</button>
      <h1>${editando ? 'Editar' : 'Anotar'}</h1>
    </div>
    ${ehConta ? '' : `<div class="filtros" role="group" aria-label="Tipo">
      <button class="${ehSaida ? 'sel' : ''}" data-acao="tipo" data-t="saida" aria-pressed="${ehSaida}">Gastei</button>
      <button class="${!ehSaida ? 'sel' : ''}" data-acao="tipo" data-t="entrada" aria-pressed="${!ehSaida}">Recebi</button>
    </div>`}
    <div class="valor-box">
      <label for="campo-valor">${f.parcelas > 1 ? 'Valor total da compra' : 'Quanto?'}</label>
      <div class="valor-linha"><span>R$</span><input id="campo-valor" class="valor-grande ${ehSaida ? '' : 'entrada'}" inputmode="numeric" autocomplete="off" data-dinheiro="valor" value="${numTexto(f.valor)}"></div>
    </div>
    <div class="campo">
      <label for="campo-desc">${ehSaida ? 'Com o quê?' : 'De onde veio?'}</label>
      <input id="campo-desc" class="entrada-texto" data-campo="desc" value="${esc(f.desc)}" placeholder="${ehSaida ? 'Ex.: mercado, lanche, gasolina' : 'Ex.: freela, AdSense, venda de print'}" autocomplete="off" maxlength="60">
    </div>
    <div class="campo"><span class="campo-nome">Categoria</span>
      <div class="grade-cats">
        ${cats.map((c) => { const k = cor(c.cor); return `<button class="cat-btn ${f.cat === c.id ? 'sel' : ''}" data-acao="cat" data-id="${c.id}" aria-pressed="${f.cat === c.id}"><span style="color:${k.fg}">${svg(c.icone, 22)}</span>${esc(c.nome)}</button>`; }).join('')}
        <button class="cat-btn" data-acao="editarCategoria" data-tipo="${f.tipo}"><span style="color:var(--suave)">${svg('mais', 22)}</span>Nova</button>
      </div>
    </div>
    ${ehConta ? '' : formas}
    ${blocoOutro}
    <div class="campo ${deOutro ? 'esconder' : ''}"><span class="campo-nome">Quando</span>
      <div class="chips">
        <button class="chip ${f.data === h ? 'sel' : ''}" data-acao="data" data-d="${h}">Hoje</button>
        <button class="chip ${f.data === ontem ? 'sel' : ''}" data-acao="data" data-d="${ontem}">Ontem</button>
        <label class="chip ${outraData ? 'sel' : ''}">${svg('calendario', 16)}<input type="date" value="${f.data}" data-campo-data aria-label="Escolher data"></label>
      </div>
    </div>
    ${ehSaida && !ehConta && !deOutro ? `<div class="campo"><span class="campo-nome">Parcelas</span>
      <div class="contador">
        <button class="redondo" data-acao="parcelas" data-n="-1" aria-label="Menos parcelas">${svg('menos', 18)}</button>
        <b class="num">${f.parcelas}x</b>
        <button class="redondo" data-acao="parcelas" data-n="1" aria-label="Mais parcelas">${svg('mais', 18)}</button>
        <span class="dica num" data-dica-parcela>${f.parcelas > 1 ? `${f.parcelas}x de ${din(porParcela)}` : 'À vista'}</span>
      </div>
    </div>` : ''}
    <div class="form-fim">
      <button class="botao" data-acao="salvarLanc">${editando ? 'Salvar mudanças' : deOutro ? 'Salvar compra' : ehSaida ? 'Salvar gasto' : 'Salvar entrada'}</button>
      ${editando ? `<button class="botao perigo" data-acao="apagarLanc">${svg('lixo', 18)} Apagar${f.grupo ? ' (todas as parcelas)' : ''}</button>` : ''}
    </div>
  </div>`;
}

function telaAjustes() {
  const linha = (acao, icone, titulo, sub, extra = '') => `<button class="linha-ajuste" data-acao="${acao}" ${extra}>
    <span class="item-icone" style="background:var(--verde-claro);color:var(--verde)">${svg(icone, 18)}</span>
    <span class="item-texto"><span class="item-nome">${titulo}</span>${sub ? `<span class="item-sub">${sub}</span>` : ''}</span>${svg('direita', 18)}</button>`;
  const cats = (tipo) => db.cats.filter((c) => c.tipo === tipo).map((c) => `<button class="linha-ajuste" data-acao="editarCategoria" data-id="${c.id}">${iconeCat(c, 34)}<span class="item-texto"><span class="item-nome">${esc(c.nome)}</span>${c.limite > 0 ? `<span class="item-sub num">Limite por mês: ${din(c.limite)}</span>` : ''}</span>${svg('direita', 18)}</button>`).join('');
  return `<header class="cab"><div class="cab-linha">
      <button class="redondo" data-acao="voltar" aria-label="Voltar">${svg('voltar', 20)}</button>
      <h1 style="flex-grow:1">Ajustes</h1></div></header>
  <div class="corpo">
    <section class="secao"><div class="secao-cab"><h2 class="secao-titulo">Categorias de gasto</h2><button class="link" data-acao="editarCategoria" data-tipo="saida">+ Nova</button></div><div class="lista">${cats('saida')}</div></section>
    <section class="secao"><div class="secao-cab"><h2 class="secao-titulo">Categorias de entrada</h2><button class="link" data-acao="editarCategoria" data-tipo="entrada">+ Nova</button></div><div class="lista">${cats('entrada')}</div></section>
    <section class="secao"><h2 class="secao-titulo">Você</h2>
      <div class="lista">${linha('editarNome', 'lapis', 'Seu nome', esc(db.ajustes.nome || 'MOSS'))}</div>
    </section>
    <section class="secao"><h2 class="secao-titulo">Sons e animações</h2>
      <div class="lista">
        <button class="linha-ajuste" data-acao="alternarSons" aria-pressed="${db.ajustes.sons !== false}">
          <span class="item-icone" style="background:var(--verde-claro);color:var(--verde)">${svg('sino', 18)}</span>
          <span class="item-texto"><span class="item-nome">Sons do app</span><span class="item-sub">ao salvar, receber, pagar e apagar</span></span>
          <span class="chave ${db.ajustes.sons !== false ? 'ligada' : ''}"></span>
        </button>
        <button class="linha-ajuste" data-acao="alternarAnimacoes" aria-pressed="${db.ajustes.animacoes !== false}">
          <span class="item-icone" style="background:var(--verde-claro);color:var(--verde)">${svg('estrela', 18)}</span>
          <span class="item-texto"><span class="item-nome">Animações</span><span class="item-sub">abertura do app e movimentos</span></span>
          <span class="chave ${db.ajustes.animacoes !== false ? 'ligada' : ''}"></span>
        </button>
      </div>
    </section>
    <section class="secao"><h2 class="secao-titulo">Lembretes</h2>
      <p class="pequeno-texto" style="margin:0">O celular avisa um dia antes, no dia e se atrasar: fatura, contas do mês e parcelas. Mais ou menos uma vez por dia, na hora que o Android escolher.</p>
      <div class="lista">
        <button class="linha-ajuste" data-acao="alternarLembretes" aria-pressed="${!!db.ajustes.lembretes}">
          <span class="item-icone" style="background:var(--verde-claro);color:var(--verde)">${svg('calendario', 18)}</span>
          <span class="item-texto"><span class="item-nome">Lembretes de contas</span><span class="item-sub">${suportaLembretes() ? (db.ajustes.lembretes ? 'ligados' : 'desligados') : 'funciona no celular, com o app instalado'}</span></span>
          <span class="chave ${db.ajustes.lembretes ? 'ligada' : ''}"></span>
        </button>
        ${db.ajustes.lembretes ? linha('testarLembrete', 'sino', 'Testar lembrete', 'manda uma notificação de exemplo agora') : ''}
      </div>
    </section>
    <section class="secao"><h2 class="secao-titulo">Cópia de segurança</h2>
      <p class="pequeno-texto" style="margin:0">Seus dados ficam guardados só neste aparelho. Salve uma cópia de vez em quando (e mande para você mesmo por e-mail ou guarde no Drive). Se trocar de celular, é com ela que você recupera tudo.</p>
      <div class="lista">
        ${linha('salvarCopia', 'copia', 'Salvar cópia', `${db.lanc.length} lançamentos`)}
        ${linha('abrirCopia', 'abrir', 'Abrir uma cópia', 'troca os dados atuais pelos da cópia')}
      </div>
    </section>
    <section class="secao"><h2 class="secao-titulo">Testes</h2>
      <div class="lista">
        ${linha('exemplo', 'estrela', 'Ver com dados de exemplo', 'para conhecer o app; apaga o que estiver anotado')}
        ${linha('apagarTudo', 'lixo', 'Apagar tudo', 'começa do zero')}
      </div>
    </section>
    <p class="pequeno-texto" style="text-align:center;margin:0 0 8px">Controle Financeiro · versão 0.5</p>
  </div>`;
}

/* ---------- desenhar ---------- */
const TELAS = { inicio: telaInicio, extrato: telaExtrato, gastos: telaGastos, contas: telaContas, anotar: telaAnotar, ajustes: telaAjustes };
const SEM_NAV = ['anotar', 'ajustes'];

function render() {
  const fn = TELAS[ui.tela] || telaInicio;
  const comNav = !SEM_NAV.includes(ui.tela);
  $app.className = 'app' + (comNav ? '' : ' sem-nav');
  $app.innerHTML = fn() + (comNav ? nav() : '');
  marcadoAgora = null;
  const v = document.getElementById('campo-valor');
  if (v) ajustarLargura(v);
}
// o campo do valor grande cresce com o número, para ficar centralizado
function ajustarLargura(el) {
  el.style.width = (el.value.length + 0.3) + 'ch';
}

/* =========================================================
   Folhas (janelinhas que sobem de baixo)
   ========================================================= */
function abrirFolha(tipo, dados = {}) {
  const jaAberta = !!ui.folha;
  ui.folha = { tipo, ...dados };
  if (!jaAberta) history.pushState({ tela: ui.tela, folha: true }, '');
  renderFolha();
  const primeiro = $folha.querySelector('[data-foco]');
  if (primeiro) setTimeout(() => primeiro.focus(), 50);
}
let depoisDeFechar = null;
function fecharFolha(depois) {
  if (!ui.folha) { if (typeof depois === 'function') depois(); return; }
  if (history.state && history.state.folha) { depoisDeFechar = typeof depois === 'function' ? depois : null; history.back(); }
  else { ui.folha = null; renderFolha(); if (typeof depois === 'function') depois(); }
}
function campoDinheiro(nome, rotulo, valor, foco) {
  return `<div class="campo"><label for="f-${nome}">${rotulo}</label><input id="f-${nome}" class="entrada-texto num" inputmode="numeric" autocomplete="off" data-dinheiro="${nome}" value="${valor ? 'R$ ' + numTexto(valor) : ''}" placeholder="R$ 0,00" ${foco ? 'data-foco' : ''}></div>`;
}
function campoTexto(nome, rotulo, valor, extra = '') {
  return `<div class="campo"><label for="f-${nome}">${rotulo}</label><input id="f-${nome}" class="entrada-texto" data-campo="${nome}" value="${esc(valor)}" autocomplete="off" ${extra}></div>`;
}
function campoDia(nome, rotulo, valor, min = 1, max = 31) {
  return `<div class="campo"><label for="f-${nome}">${rotulo}</label><input id="f-${nome}" class="entrada-texto num" type="number" inputmode="numeric" min="${min}" max="${max}" data-campo="${nome}" value="${valor === 0 ? '0' : valor || ''}"></div>`;
}
function escolhaForma(f) {
  const op = [['pix', 'Pix'], ['debito', 'Débito'], ['dinheiro', 'Dinheiro']].map(([v, n]) => `<button class="chip ${f.forma === v ? 'sel' : ''}" data-acao="folhaForma" data-f="${v}">${n}</button>`);
  return `<div class="campo"><span class="campo-nome">Pagou com</span><div class="chips">${op.join('')}</div></div>`;
}

function renderFolha() {
  const f = ui.folha;
  if (!f) { $folha.innerHTML = ''; return; }
  let corpo = '';
  if (f.tipo === 'categoria') {
    corpo = `<h2>${f.id ? 'Editar categoria' : 'Nova categoria'}</h2>
      ${campoTexto('nome', 'Nome', f.nome, 'maxlength="24" data-foco')}
      ${f.tipoCat === 'saida' ? campoDinheiro('limite', 'Limite por mês (deixe vazio para não ter limite)', f.limite) : ''}
      <div class="campo"><span class="campo-nome">Desenho</span><div class="grade-icones">${ICONES_ESCOLHA.map((i) => `<button class="${f.icone === i ? 'sel' : ''}" data-acao="folhaIcone" data-i="${i}" aria-label="${i}">${svg(i, 20)}</button>`).join('')}</div></div>
      <div class="campo"><span class="campo-nome">Cor</span><div class="grade-cores">${Object.keys(CORES).map((k) => `<button class="${f.cor === k ? 'sel' : ''}" data-acao="folhaCor" data-c="${k}" aria-label="${k}"><i style="background:${CORES[k].fg}"></i></button>`).join('')}</div></div>
      <button class="botao" data-acao="salvarCategoria">Salvar</button>
      ${f.id && f.id !== 'outros' && f.id !== 'outros-e' ? `<button class="botao perigo" data-acao="apagarCategoria">Apagar categoria</button>` : ''}`;
  } else if (f.tipo === 'cartao') {
    corpo = `<h2>${f.id ? 'Editar cartão' : 'Novo cartão de crédito'}</h2>
      ${campoTexto('nome', 'Nome do cartão', f.nome, 'maxlength="20" placeholder="Ex.: Nubank, Inter" data-foco')}
      ${campoDinheiro('limite', 'Limite total', f.limite)}
      <div class="dois-campos">${campoDia('fecha', 'Dia que fecha', f.fecha)}${campoDia('vence', 'Dia que vence', f.vence)}</div>
      <p>Esses dias aparecem no app do banco, na fatura. Compras feitas a partir do dia que fecha vão para a fatura seguinte.</p>
      <button class="botao" data-acao="salvarCartao">Salvar</button>
      ${f.id ? `<button class="botao perigo" data-acao="apagarCartao">Apagar cartão</button>` : ''}`;
  } else if (f.tipo === 'conta') {
    const cats = db.cats.filter((c) => c.tipo === 'saida');
    corpo = `<h2>${f.id ? 'Editar conta' : 'Nova conta de todo mês'}</h2>
      ${campoTexto('nome', 'Nome', f.nome, 'maxlength="30" placeholder="Ex.: Aluguel, Luz, Internet" data-foco')}
      <div class="dois-campos">${campoDinheiro('valor', 'Valor', f.valor)}${campoDia('dia', 'Vence todo dia', f.dia)}</div>
      <label class="marcar"><input type="checkbox" data-campo-check="aproximado" ${f.aproximado ? 'checked' : ''}> O valor muda todo mês (luz, água…)</label>
      <div class="campo"><label for="f-cat">Categoria</label><select id="f-cat" class="entrada-texto" data-campo="cat">${cats.map((c) => `<option value="${c.id}" ${f.cat === c.id ? 'selected' : ''}>${esc(c.nome)}</option>`).join('')}</select></div>
      <button class="botao" data-acao="salvarConta">Salvar</button>
      ${f.id ? `<button class="botao perigo" data-acao="apagarConta">Parar de cobrar esta conta</button>` : ''}`;
  } else if (f.tipo === 'pagarConta') {
    const c = contaPorId(f.id);
    corpo = `<h2>Pagar ${esc(c.nome)}</h2>
      <p>Vai entrar como gasto em ${nomeMesSo(ui.mes)}${c.aproximado ? '. Confira o valor certo na conta' : ''}.</p>
      ${campoDinheiro('valor', 'Valor pago', f.valor, true)}
      ${escolhaForma(f)}
      <button class="botao" data-acao="confirmarPagarConta">${svg('ok', 18, 2.6)} Marcar como paga</button>`;
  } else if (f.tipo === 'divida') {
    const emParcelas = f.modo === 'parcelas';
    const proxMes = somaMes(mesAtual(), 1);
    corpo = `<h2>${f.id ? 'Editar dívida' : 'Nova dívida'}</h2>
      ${f.id ? '' : `<p>Para empréstimos, dinheiro que você deve a alguém ou compras no cartão de outra pessoa. Compras parceladas no seu cartão não precisam: elas aparecem sozinhas.</p>
      <div class="filtros" role="group" aria-label="Como paga">
        <button class="${!emParcelas ? 'sel' : ''}" data-acao="modoDivida" data-m="solto">Pago quando der</button>
        <button class="${emParcelas ? 'sel' : ''}" data-acao="modoDivida" data-m="parcelas">Parcelas todo mês</button>
      </div>`}
      ${campoTexto('nome', 'O que é', f.nome, `maxlength="30" placeholder="${emParcelas ? 'Ex.: Fone novo' : 'Ex.: Empréstimo'}" data-foco`)}
      ${campoTexto('pessoa', 'Para quem você deve', f.pessoa || '', 'maxlength="30" placeholder="Ex.: minha irmã"')}
      ${emParcelas ? `
        ${campoDinheiro('total', 'Valor total da compra', f.total)}
        <div class="dois-campos">${campoDia('parcelas', 'Quantas parcelas', f.parcelas, 1, 120)}${campoDia('jaPagas', f.id ? 'Pagas antes de usar o app' : 'Quantas já paguei', f.jaPagas, 0, 120)}</div>
        ${campoDia('dia', 'Pago para a pessoa todo dia', f.dia)}
        ${f.id ? '' : `<div class="campo"><span class="campo-nome">A próxima parcela que você vai pagar é</span><div class="chips">
          <button class="chip ${!f.inicioProx ? 'sel' : ''}" data-acao="folhaInicio" data-v="0">Este mês</button>
          <button class="chip ${f.inicioProx ? 'sel' : ''}" data-acao="folhaInicio" data-v="1">Mês que vem (${nomeMesSo(proxMes)})</button>
        </div></div>`}`
      : `<div class="dois-campos">${campoDinheiro('total', 'Valor total', f.total)}${campoDinheiro('jaPago', 'Já paguei antes', f.jaPago)}</div>`}
      <button class="botao" data-acao="salvarDivida">Salvar</button>
      ${f.id ? `<button class="botao perigo" data-acao="apagarDivida">Apagar dívida</button>` : ''}`;
  } else if (f.tipo === 'pagarParcela') {
    const d = dividaPorId(f.id);
    const k = parcelaNoMes(d, ui.mes);
    corpo = `<h2>Pagar parcela ${k} de ${d.parcelas}</h2>
      <p>${esc(d.nome)}${d.pessoa ? ' · para ' + esc(d.pessoa) : ''}. Vai entrar como gasto em ${nomeMesSo(ui.mes)}.</p>
      ${campoDinheiro('valor', 'Valor pago', f.valor, true)}
      ${escolhaForma(f)}
      <button class="botao" data-acao="confirmarPagarParcela">${svg('ok', 18, 2.6)} Marcar como paga</button>`;
  } else if (f.tipo === 'pagarDivida') {
    const d = dividaPorId(f.id);
    corpo = `<h2>Pagar parte: ${esc(d.nome)}</h2>
      <p>Faltam ${din(situacaoDivida(d).falta)}. O valor entra como gasto em “Dívidas”.</p>
      ${campoDinheiro('valor', 'Quanto pagou', f.valor, true)}
      ${escolhaForma(f)}
      <button class="botao" data-acao="confirmarPagarDivida">Salvar pagamento</button>`;
  } else if (f.tipo === 'fatura') {
    const k = cartaoPorId(f.id);
    const ft = fatura(k, ui.mes);
    corpo = `<h2>Compras na fatura · ${esc(k.nome)}</h2>
      <p>Fatura que vence ${diaMes(ft.dataVence)}: ${din(ft.total)}</p>
      ${ft.itens.length ? `<div class="lista">${ft.itens.sort(ordenarLanc).map((l) => itemLanc(l, true)).join('')}</div>` : '<p>Nenhuma compra nesta fatura.</p>'}`;
  } else if (f.tipo === 'nome') {
    corpo = `<h2>Como quer ser chamado?</h2>
      ${campoTexto('nome', 'Nome', f.nome, 'maxlength="20" data-foco')}
      <button class="botao" data-acao="salvarNome">Salvar</button>`;
  } else if (f.tipo === 'confirmar') {
    corpo = `<h2>${esc(f.titulo)}</h2><p>${esc(f.texto)}</p>
      <div class="botoes"><button class="botao sec" data-acao="fecharFolha">Cancelar</button><button class="botao ${f.perigo ? 'perigo' : ''}" data-acao="confirmarSim">${esc(f.sim)}</button></div>`;
  }
  $folha.innerHTML = `<div class="folha-fundo" data-acao="fundoFolha"><div class="folha-painel" role="dialog" aria-modal="true">
    <div class="folha-alca"></div>${corpo}
    ${f.tipo !== 'confirmar' ? `<button class="botao sec" data-acao="fecharFolha">Fechar</button>` : ''}
  </div></div>`;
}

let aoConfirmar = null;
function confirmar(titulo, texto, sim, fn, perigo = true) {
  aoConfirmar = fn;
  abrirFolha('confirmar', { titulo, texto, sim, perigo });
}

/* =========================================================
   Navegação (botão voltar do celular funciona)
   ========================================================= */
function ir(tela, empilhar = true) {
  ui.tela = tela;
  if (empilhar) history.pushState({ tela }, '');
  render();
  window.scrollTo(0, 0);
}
window.addEventListener('popstate', (e) => {
  if (ui.folha) {
    ui.folha = null; renderFolha();
    const fn = depoisDeFechar; depoisDeFechar = null;
    if (fn) fn();
    return;
  }
  const tela = (e.state && e.state.tela) || 'inicio';
  if (ui.tela === 'anotar' && tela !== 'anotar') ui.form = null;
  if (tela === 'anotar' && !ui.form) { ui.tela = 'inicio'; render(); return; }
  ui.tela = tela;
  render();
  window.scrollTo(0, 0);
});

function abrirFormulario(form) {
  ui.form = form;
  ir('anotar');
  if (!form.id) setTimeout(() => { const v = document.getElementById('campo-valor'); if (v) { v.focus(); v.select(); } }, 60);
}

/* =========================================================
   Ações (cada botão tem um data-acao)
   ========================================================= */
const ACOES = {
  ir(d) {
    if (d.filtro) ui.filtro = d.filtro;
    if (ui.folha) { ui.folha = null; renderFolha(); }
    if (d.tela !== ui.tela) ir(d.tela); else render();
  },
  voltar() { history.back(); },
  mes(d) { ui.mes = somaMes(ui.mes, Number(d.n)); render(); },
  mesHoje() { ui.mes = mesAtual(); render(); },
  filtro(d) { ui.filtro = d.f; render(); },

  novo() {
    const h = hoje();
    const data = ui.mes === mesAtual() ? h : dataNoMes(ui.mes, 1);
    abrirFormulario({ id: null, tipo: ui.tela === 'extrato' && ui.filtro === 'entrada' ? 'entrada' : 'saida', valor: 0, desc: '', cat: null, forma: 'pix', cartao: null, data, parcelas: 1, pessoa: '', jaPagas: 0, inicioProx: true, diaOutro: '' });
  },
  editar(d) {
    const l = db.lanc.find((x) => x.id === d.id);
    if (!l) return;
    if (ui.folha) { fecharFolha(() => ACOES.editar(d)); return; }
    if (l.grupo) {
      const grupo = db.lanc.filter((x) => x.grupo === l.grupo).sort((a, b) => a.data.localeCompare(b.data));
      abrirFormulario({ id: l.id, grupo: l.grupo, tipo: 'saida', valor: grupo.reduce((t, x) => t + x.valor, 0), desc: l.desc, cat: l.cat, forma: l.forma, cartao: l.cartao, data: grupo[0].data, parcelas: grupo.length });
    } else {
      abrirFormulario({ id: l.id, tipo: l.tipo, valor: l.valor, desc: l.desc, cat: l.cat, forma: l.forma || 'pix', cartao: l.cartao || null, data: l.data, parcelas: 1, contaFixa: l.contaFixa, divida: l.divida });
    }
  },
  tipo(d) {
    if (ui.form.tipo === d.t) return;
    ui.form.tipo = d.t;
    ui.form.cat = null;
    if (d.t === 'entrada') ui.form.parcelas = 1;
    render();
  },
  cat(d) { ui.form.cat = d.id; render(); },
  forma(d) { ui.form.forma = d.f; ui.form.cartao = d.k || null; if (d.f !== 'cartao' && ui.form.parcelas > 1) { /* parcelado também vale para carnê/boleto */ } render(); },
  data(d) { ui.form.data = d.d; render(); },
  parcelas(d) {
    ui.form.parcelas = Math.min(48, Math.max(1, ui.form.parcelas + Number(d.n)));
    ui.form.jaPagas = Math.min(ui.form.jaPagas || 0, ui.form.parcelas - 1);
    render();
  },
  jaPagas(d) { ui.form.jaPagas = Math.min(ui.form.parcelas - 1, Math.max(0, (ui.form.jaPagas || 0) + Number(d.n))); render(); },
  inicioOutro(d) { ui.form.inicioProx = d.v === '1'; render(); },

  salvarLanc() {
    const f = ui.form;
    if (!(f.valor > 0)) { avisoRapido('Coloque o valor'); document.getElementById('campo-valor').focus(); return; }
    if (!f.cat) { avisoRapido('Escolha uma categoria'); return; }
    if (!f.data) { avisoRapido('Escolha a data'); return; }
    const desc = f.desc.trim() || catPorId(f.cat).nome;
    if (f.tipo === 'saida' && f.forma === 'outro' && !f.id) {
      const pessoa = (f.pessoa || '').trim();
      const dia = Number(f.diaOutro);
      if (!pessoa) { avisoRapido('Escreva de quem é o cartão'); document.getElementById('campo-pessoa').focus(); return; }
      if (!(dia >= 1 && dia <= 31)) { avisoRapido('Coloque o dia que você paga (1 a 31)'); document.getElementById('campo-dia-outro').focus(); return; }
      db.dividas.push({ id: novoId(), nome: desc, pessoa, total: f.valor, parcelas: f.parcelas, jaPagas: f.jaPagas || 0, inicio: f.inicioProx ? somaMes(mesAtual(), 1) : mesAtual(), dia, cat: f.cat, criado: Date.now() });
      salvar();
      som('gasto');
      avisoRapido('Anotado! Está em Contas');
      history.back();
      return;
    }
    const base = { tipo: f.tipo, desc, cat: f.cat, criado: Date.now() };
    if (f.tipo === 'saida') { base.forma = f.forma; if (f.forma === 'cartao') base.cartao = f.cartao; }

    // apaga o antigo (ou o grupo de parcelas) antes de gravar de novo
    let antigo = null;
    if (f.id) {
      antigo = db.lanc.find((x) => x.id === f.id);
      if (f.grupo) db.lanc = db.lanc.filter((x) => x.grupo !== f.grupo);
      else db.lanc = db.lanc.filter((x) => x.id !== f.id);
    }
    if (f.tipo === 'saida' && f.parcelas > 1) {
      const grupo = novoId();
      const parte = Math.floor(f.valor / f.parcelas);
      const resto = f.valor - parte * f.parcelas;
      for (let k = 0; k < f.parcelas; k++) {
        db.lanc.push({ ...base, id: novoId(), valor: parte + (k === 0 ? resto : 0), data: somaMesesData(f.data, k), grupo, parc: [k + 1, f.parcelas] });
      }
    } else {
      const l = { ...base, id: f.id && !f.grupo ? f.id : novoId(), valor: f.valor, data: f.data };
      if (antigo && antigo.contaFixa) { l.contaFixa = antigo.contaFixa; l.mesConta = antigo.mesConta; l.forma = antigo.forma; }
      if (antigo && antigo.divida) { l.divida = antigo.divida; l.forma = antigo.forma; if (antigo.mesConta) l.mesConta = antigo.mesConta; if (antigo.parc) l.parc = antigo.parc; }
      if (antigo && antigo.criado) l.criado = antigo.criado;
      db.lanc.push(l);
    }
    salvar();
    som(f.tipo === 'entrada' ? 'entrada' : 'gasto');
    ui.mes = mesDe(f.data);
    avisoRapido(f.id ? 'Mudanças salvas' : f.tipo === 'saida' ? 'Gasto anotado' : 'Entrada anotada');
    history.back();
  },
  apagarLanc() {
    const f = ui.form;
    const n = f.grupo ? db.lanc.filter((x) => x.grupo === f.grupo).length : 1;
    confirmar('Apagar?', n > 1 ? `Isso apaga as ${n} parcelas de “${f.desc}”.` : `“${f.desc || 'Este lançamento'}” vai sumir do extrato.`, 'Apagar', () => {
      db.lanc = f.grupo ? db.lanc.filter((x) => x.grupo !== f.grupo) : db.lanc.filter((x) => x.id !== f.id);
      salvar();
      som('apagar');
      avisoRapido('Apagado');
      fecharFolha(() => history.back());
    });
  },

  /* categorias */
  editarCategoria(d) {
    const c = d.id ? db.cats.find((x) => x.id === d.id) : null;
    abrirFolha('categoria', c ? { id: c.id, nome: c.nome, icone: c.icone, cor: c.cor, limite: c.limite || 0, tipoCat: c.tipo } : { id: null, nome: '', icone: 'estrela', cor: 'verde', limite: 0, tipoCat: d.tipo || 'saida' });
  },
  folhaIcone(d) { ui.folha.icone = d.i; renderFolha(); },
  folhaCor(d) { ui.folha.cor = d.c; renderFolha(); },
  salvarCategoria() {
    const f = ui.folha;
    if (!f.nome.trim()) { avisoRapido('Dê um nome'); return; }
    if (f.id) Object.assign(db.cats.find((x) => x.id === f.id), { nome: f.nome.trim(), icone: f.icone, cor: f.cor, limite: f.limite || 0 });
    else {
      const nova = { id: novoId(), nome: f.nome.trim(), icone: f.icone, cor: f.cor, tipo: f.tipoCat, limite: f.limite || 0 };
      db.cats.splice(db.cats.filter((c) => c.tipo === f.tipoCat).length - 1 + db.cats.findIndex((c) => c.tipo === f.tipoCat), 0, nova);
      if (ui.form && ui.tela === 'anotar' && ui.form.tipo === f.tipoCat) ui.form.cat = nova.id;
    }
    salvar();
    fecharFolha(render);
    avisoRapido('Categoria salva');
  },
  apagarCategoria() {
    const f = ui.folha;
    const usados = db.lanc.filter((l) => l.cat === f.id).length;
    const destino = f.tipoCat === 'entrada' ? 'outros-e' : 'outros';
    confirmar('Apagar categoria?', usados ? `${usados} lançamentos dela vão para “Outros”.` : 'Ela não tem nenhum lançamento.', 'Apagar', () => {
      for (const l of db.lanc) if (l.cat === f.id) l.cat = destino;
      for (const c of db.contas) if (c.cat === f.id) c.cat = 'outros';
      db.cats = db.cats.filter((c) => c.id !== f.id);
      if (ui.form && ui.form.cat === f.id) ui.form.cat = null;
      salvar(); fecharFolha(render);
    });
  },

  /* cartões */
  editarCartao(d) {
    const k = d.id ? cartaoPorId(d.id) : null;
    abrirFolha('cartao', k ? { ...k } : { id: null, nome: '', limite: 0, fecha: '', vence: '' });
  },
  salvarCartao() {
    const f = ui.folha;
    const fecha = Number(f.fecha), vence = Number(f.vence);
    if (!f.nome.trim()) { avisoRapido('Dê um nome ao cartão'); return; }
    if (!(fecha >= 1 && fecha <= 31) || !(vence >= 1 && vence <= 31)) { avisoRapido('Coloque os dias (de 1 a 31)'); return; }
    const dados = { nome: f.nome.trim(), limite: f.limite || 0, fecha, vence };
    if (f.id) Object.assign(cartaoPorId(f.id), dados);
    else {
      const k = { id: novoId(), ...dados };
      db.cartoes.push(k);
      if (ui.form && ui.tela === 'anotar') { ui.form.forma = 'cartao'; ui.form.cartao = k.id; }
    }
    salvar(); fecharFolha(render);
    avisoRapido('Cartão salvo');
  },
  apagarCartao() {
    const f = ui.folha;
    const usados = db.lanc.filter((l) => l.cartao === f.id).length;
    if (usados) { avisoRapido(`Esse cartão tem ${usados} compras anotadas; não dá para apagar`); return; }
    confirmar('Apagar cartão?', `“${f.nome}” vai sair da lista.`, 'Apagar', () => {
      db.cartoes = db.cartoes.filter((k) => k.id !== f.id);
      salvar(); fecharFolha(render);
    });
  },
  faturaPaga(d) {
    const chave = d.id + '|' + ui.mes;
    if (d.v === '1') { db.faturasPagas[chave] = true; som('pago'); avisoRapido('Fatura marcada como paga'); }
    else delete db.faturasPagas[chave];
    salvar(); render();
  },
  verFatura(d) { abrirFolha('fatura', { id: d.id }); },

  /* contas fixas */
  editarConta(d) {
    const c = d.id ? contaPorId(d.id) : null;
    abrirFolha('conta', c ? { ...c } : { id: null, nome: '', valor: 0, dia: '', aproximado: false, cat: 'casa' });
  },
  salvarConta() {
    const f = ui.folha;
    const dia = Number(f.dia);
    if (!f.nome.trim()) { avisoRapido('Dê um nome à conta'); return; }
    if (!(dia >= 1 && dia <= 31)) { avisoRapido('Coloque o dia do vencimento (1 a 31)'); return; }
    const dados = { nome: f.nome.trim(), valor: f.valor || 0, dia, aproximado: !!f.aproximado, cat: f.cat || 'casa' };
    if (f.id) Object.assign(contaPorId(f.id), dados);
    else db.contas.push({ id: novoId(), desde: ui.mes < mesAtual() ? ui.mes : mesAtual(), ...dados });
    salvar(); fecharFolha(render);
    avisoRapido('Conta salva');
  },
  apagarConta() {
    const f = ui.folha;
    const temPag = db.lanc.some((l) => l.contaFixa === f.id);
    confirmar('Parar de cobrar?', temPag ? `“${f.nome}” some a partir de ${nomeMesSo(ui.mes)}. Os pagamentos antigos continuam no extrato.` : `“${f.nome}” vai sair da lista.`, 'Parar', () => {
      if (temPag) contaPorId(f.id).ate = somaMes(ui.mes, -1);
      else db.contas = db.contas.filter((c) => c.id !== f.id);
      salvar(); fecharFolha(render);
    });
  },
  pagarConta(d) {
    const c = contaPorId(d.id);
    if (!c || pagamentoConta(c.id, ui.mes)) return;
    abrirFolha('pagarConta', { id: c.id, valor: c.valor, forma: 'pix' });
  },
  folhaForma(d) { ui.folha.forma = d.f; renderFolha(); },
  confirmarPagarConta() {
    const f = ui.folha;
    const c = contaPorId(f.id);
    if (!(f.valor > 0)) { avisoRapido('Coloque o valor pago'); return; }
    const h = hoje();
    const data = ui.mes === mesAtual() ? h : dataNoMes(ui.mes, c.dia);
    db.lanc.push({ id: novoId(), tipo: 'saida', valor: f.valor, desc: c.nome, cat: c.cat || 'casa', data, forma: f.forma, contaFixa: c.id, mesConta: ui.mes, criado: Date.now() });
    salvar(); som('pago');
    fecharFolha(() => { marcadoAgora = c.id; render(); });
    avisoRapido(`${c.nome} paga`);
  },
  despagarConta(d) {
    const c = contaPorId(d.id);
    const pag = pagamentoConta(d.id, ui.mes);
    if (!pag) return;
    confirmar('Desmarcar pagamento?', `O gasto de ${din(pag.valor)} com “${c.nome}” sai do extrato.`, 'Desmarcar', () => {
      db.lanc = db.lanc.filter((l) => l.id !== pag.id);
      salvar(); fecharFolha(render);
    });
  },

  /* dívidas */
  editarDivida(d) {
    const x = d.id ? dividaPorId(d.id) : null;
    abrirFolha('divida', x ? { ...x, modo: ehParcelada(x) ? 'parcelas' : 'solto' } : { id: null, nome: '', pessoa: '', total: 0, jaPago: 0, modo: 'solto', parcelas: '', jaPagas: '', dia: '', inicioProx: false });
  },
  modoDivida(d) { ui.folha.modo = d.m; renderFolha(); },
  folhaInicio(d) { ui.folha.inicioProx = d.v === '1'; renderFolha(); },
  salvarDivida() {
    const f = ui.folha;
    if (!f.nome.trim()) { avisoRapido('Dê um nome'); return; }
    if (!(f.total > 0)) { avisoRapido('Coloque o valor total'); return; }
    let dados;
    if (f.modo === 'parcelas') {
      const parcelas = Number(f.parcelas), jaPagas = Number(f.jaPagas || 0), dia = Number(f.dia);
      if (!(parcelas >= 1 && parcelas <= 120)) { avisoRapido('Coloque quantas parcelas são'); return; }
      if (!(jaPagas >= 0 && jaPagas <= parcelas)) { avisoRapido('As parcelas pagas não podem passar do total'); return; }
      if (!(dia >= 1 && dia <= 31)) { avisoRapido('Coloque o dia que você paga (1 a 31)'); return; }
      dados = { nome: f.nome.trim(), pessoa: (f.pessoa || '').trim(), total: f.total, parcelas, jaPagas, dia };
      if (!f.id) { dados.inicio = f.inicioProx ? somaMes(mesAtual(), 1) : mesAtual(); dados.cat = 'dividas'; }
    } else {
      dados = { nome: f.nome.trim(), pessoa: (f.pessoa || '').trim(), total: f.total, jaPago: f.jaPago || 0 };
    }
    if (f.id) Object.assign(dividaPorId(f.id), dados);
    else db.dividas.push({ id: novoId(), criado: Date.now(), ...dados });
    salvar(); fecharFolha(render);
    avisoRapido('Dívida salva');
  },
  pagarParcela(d) {
    const x = dividaPorId(d.id);
    if (!x) return;
    const k = parcelaNoMes(x, ui.mes);
    if (!k || pagamentoParcela(x.id, ui.mes)) return;
    abrirFolha('pagarParcela', { id: x.id, valor: valorDaParcela(x, k), forma: 'pix' });
  },
  confirmarPagarParcela() {
    const f = ui.folha;
    const x = dividaPorId(f.id);
    const k = parcelaNoMes(x, ui.mes);
    if (!(f.valor > 0)) { avisoRapido('Coloque o valor pago'); return; }
    const data = ui.mes === mesAtual() ? hoje() : dataNoMes(ui.mes, x.dia || 10);
    const cat = x.cat && db.cats.some((c) => c.id === x.cat) ? x.cat : (db.cats.some((c) => c.id === 'dividas') ? 'dividas' : 'outros');
    db.lanc.push({ id: novoId(), tipo: 'saida', valor: f.valor, desc: `${x.nome}${x.pessoa ? ' · para ' + x.pessoa : ''}`, parc: [k, x.parcelas], cat, data, forma: f.forma, divida: x.id, mesConta: ui.mes, criado: Date.now() });
    salvar(); som('pago');
    fecharFolha(() => { marcadoAgora = x.id; render(); });
    avisoRapido(`Parcela ${k} de ${x.parcelas} paga`);
  },
  despagarParcela(d) {
    const x = dividaPorId(d.id);
    const pag = pagamentoParcela(d.id, ui.mes);
    if (!pag) return;
    confirmar('Desmarcar pagamento?', `A parcela de ${din(pag.valor)} de “${x.nome}” volta a ficar como não paga e sai do extrato.`, 'Desmarcar', () => {
      db.lanc = db.lanc.filter((l) => l.id !== pag.id);
      salvar(); fecharFolha(render);
    });
  },
  apagarDivida() {
    const f = ui.folha;
    confirmar('Apagar dívida?', 'Os pagamentos que você já anotou continuam no extrato.', 'Apagar', () => {
      for (const l of db.lanc) if (l.divida === f.id) delete l.divida;
      db.dividas = db.dividas.filter((x) => x.id !== f.id);
      salvar(); fecharFolha(render);
    });
  },
  pagarDivida(d) { abrirFolha('pagarDivida', { id: d.id, valor: 0, forma: 'pix' }); },
  confirmarPagarDivida() {
    const f = ui.folha;
    const x = dividaPorId(f.id);
    if (!(f.valor > 0)) { avisoRapido('Coloque quanto pagou'); return; }
    db.lanc.push({ id: novoId(), tipo: 'saida', valor: f.valor, desc: x.nome, cat: db.cats.some((c) => c.id === 'dividas') ? 'dividas' : 'outros', data: hoje(), forma: f.forma, divida: x.id, criado: Date.now() });
    salvar(); som('pago'); fecharFolha(render);
    avisoRapido('Pagamento anotado');
  },

  /* folha */
  fecharFolha() { fecharFolha(); },
  fundoFolha(d, el, ev) { if (ev.target === el) fecharFolha(); },
  confirmarSim() { const fn = aoConfirmar; aoConfirmar = null; if (fn) fn(); },

  /* ajustes */
  alternarSons() {
    db.ajustes.sons = db.ajustes.sons === false;
    salvar(); render();
    if (db.ajustes.sons) som('ligar');
  },
  alternarLembretes() {
    if (db.ajustes.lembretes) {
      db.ajustes.lembretes = false; salvar(); render();
      desligarLembretes();
      avisoRapido('Lembretes desligados');
    } else {
      ligarLembretes().then((ok) => {
        db.ajustes.lembretes = ok ? true : (db.ajustes.lembretes === undefined ? undefined : false);
        salvar(); render();
        if (ok) { som('ligar'); avisoRapido('Lembretes ligados'); }
      }).catch(() => avisoRapido('Não deu para ligar os lembretes'));
    }
  },
  naoQueroLembretes() { db.ajustes.lembretes = false; salvar(); render(); },
  testarLembrete() {
    if (!suportaLembretes() || Notification.permission !== 'granted') { avisoRapido('Ligue os lembretes primeiro (no celular)'); return; }
    const prox = listaLembretes().filter((l) => l.data >= hoje()).sort((a, b) => a.data.localeCompare(b.data))[0];
    navigator.serviceWorker.ready.then((reg) => reg.showNotification(prox ? `Exemplo · ${prox.titulo}` : 'Assim chega o lembrete', {
      body: prox ? prox.corpo : 'Ex.: Fatura vence amanhã · R$ 1.472,00',
      icon: 'icones/icone-192.png', badge: 'icones/badge-96.png', tag: 'teste', data: { tela: 'contas' }
    })).then(() => avisoRapido('Notificação enviada'));
  },
  editarNome() { abrirFolha('nome', { nome: db.ajustes.nome || 'MOSS' }); },
  salvarNome() {
    const n = (ui.folha.nome || '').trim();
    if (!n) { avisoRapido('Escreva um nome'); return; }
    db.ajustes.nome = n.slice(0, 20);
    salvar(); fecharFolha(render);
  },
  alternarAnimacoes() {
    db.ajustes.animacoes = db.ajustes.animacoes === false;
    document.documentElement.classList.toggle('sem-animacao', db.ajustes.animacoes === false);
    salvar(); render();
  },
  salvarCopia() {
    const texto = JSON.stringify(db, null, 1);
    const blob = new Blob([texto], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `controle-financeiro-copia-${hoje()}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    avisoRapido('Cópia salva');
  },
  abrirCopia() {
    const inp = document.createElement('input');
    inp.type = 'file';
    inp.accept = '.json,application/json';
    inp.onchange = () => {
      const arq = inp.files[0];
      if (!arq) return;
      arq.text().then((t) => {
        let d;
        try { d = JSON.parse(t); } catch (e) { avisoRapido('Esse arquivo não é uma cópia do app'); return; }
        if (!d || !Array.isArray(d.lanc)) { avisoRapido('Esse arquivo não é uma cópia do app'); return; }
        confirmar('Abrir esta cópia?', `Ela tem ${d.lanc.length} lançamentos. O que está no app agora será trocado por ela.`, 'Abrir cópia', () => {
          db = arrumar(d); salvar(); fecharFolha(render); avisoRapido('Cópia aberta');
        }, false);
      });
    };
    inp.click();
  },
  exemplo() {
    confirmar('Ver com dados de exemplo?', 'Tudo que estiver anotado agora será trocado por valores inventados. Depois é só usar “Apagar tudo”.', 'Usar exemplo', () => {
      const aj = db.ajustes; db = dadosExemplo(); db.ajustes = aj; salvar(); ui.mes = mesAtual(); fecharFolha(() => ir('inicio'));
    });
  },
  apagarTudo() {
    confirmar('Apagar tudo?', 'Todos os lançamentos, cartões, contas e dívidas somem deste aparelho. Se quiser, salve uma cópia antes.', 'Apagar tudo', () => {
      const aj = db.ajustes; db = dadosVazios(); db.ajustes = aj; salvar(); ui.mes = mesAtual(); fecharFolha(() => ir('inicio'));
    });
  }
};

document.addEventListener('click', (ev) => {
  const el = ev.target.closest('[data-acao]');
  if (!el) return;
  const fn = ACOES[el.dataset.acao];
  if (!fn) return;
  if (el.dataset.acao !== 'fundoFolha') ev.preventDefault();
  fn(el.dataset, el, ev);
});

/* ---------- digitação ---------- */
function lerDinheiro(el) {
  const digitos = el.value.replace(/\D/g, '').replace(/^0+/, '').slice(0, 10);
  return Number(digitos || 0);
}
document.addEventListener('input', (ev) => {
  const el = ev.target;
  if (el.dataset.dinheiro) {
    const centavos = lerDinheiro(el);
    const alvo = el.closest('#folha') ? ui.folha : ui.form;
    if (!alvo) return;
    alvo[el.dataset.dinheiro] = centavos;
    const naFolha = !!el.closest('#folha');
    el.value = naFolha ? (centavos ? 'R$ ' + numTexto(centavos) : '') : numTexto(centavos);
    if (!naFolha) {
      ajustarLargura(el);
      const dica = document.querySelector('[data-dica-parcela]');
      if (dica && ui.form.parcelas > 1) dica.textContent = `${ui.form.parcelas}x de ${din(Math.floor(centavos / ui.form.parcelas))}`;
    }
    return;
  }
  if (el.dataset.campo) {
    const alvo = el.closest('#folha') ? ui.folha : ui.form;
    if (alvo) alvo[el.dataset.campo] = el.value;
    return;
  }
  if ('campoBusca' in el.dataset) {
    ui.busca = el.value;
    const pos = el.selectionStart;
    render();
    const novo = document.querySelector('[data-campo-busca]');
    if (novo) { novo.focus(); try { novo.setSelectionRange(pos, pos); } catch (e) {} }
  }
});
document.addEventListener('change', (ev) => {
  const el = ev.target;
  if ('campoData' in el.dataset && el.value) { ui.form.data = el.value; render(); }
  if (el.dataset.campoCheck && ui.folha) ui.folha[el.dataset.campoCheck] = el.checked;
  if (el.tagName === 'SELECT' && el.dataset.campo && ui.folha) ui.folha[el.dataset.campo] = el.value;
});
// no valor grande, o cursor fica sempre no fim (como nos apps de banco)
document.addEventListener('focusin', (ev) => {
  const el = ev.target;
  if (el.dataset && el.dataset.dinheiro) setTimeout(() => { try { const n = el.value.length; el.setSelectionRange(n, n); } catch (e) {} }, 0);
});
document.addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape' && ui.folha) fecharFolha();
  if (ev.key === 'Enter' && ev.target.tagName === 'INPUT' && ui.tela === 'anotar' && !ui.folha) { ev.target.blur(); }
});

/* =========================================================
   Dados de exemplo (inventados, só para conhecer o app)
   ========================================================= */
function dadosExemplo() {
  const d = dadosVazios();
  const m = mesAtual(), ant = somaMes(m, -1);
  const h = hoje();
  const dia = (mes, n) => dataNoMes(mes, n);
  const ate = (mes, n) => { const x = dia(mes, n); return x <= h ? x : null; };
  d.cats.find((c) => c.id === 'casa').limite = 150000;
  d.cats.find((c) => c.id === 'mercado').limite = 90000;
  d.cats.find((c) => c.id === 'comida').limite = 35000;
  d.cats.find((c) => c.id === 'transporte').limite = 45000;
  d.cats.find((c) => c.id === 'assinaturas').limite = 20000;
  const k = { id: 'cartao1', nome: 'Cartão roxo', limite: 500000, fecha: 3, vence: 10 };
  d.cartoes.push(k);
  d.contas.push(
    { id: 'aluguel', nome: 'Aluguel', valor: 110000, dia: 1, cat: 'casa', aproximado: false, desde: ant },
    { id: 'celular', nome: 'Conta do celular', valor: 5990, dia: 2, cat: 'casa', aproximado: false, desde: ant },
    { id: 'internet', nome: 'Internet', valor: 11990, dia: 15, cat: 'casa', aproximado: false, desde: ant },
    { id: 'luz', nome: 'Conta de luz', valor: 23000, dia: 20, cat: 'casa', aproximado: true, desde: ant }
  );
  let n = 0;
  const add = (o) => { if (o.data) d.lanc.push({ id: 'ex' + (n++), criado: n, forma: 'pix', ...o }); };
  for (const mes of [ant, m]) {
    const passado = mes === ant;
    const dt = (x) => passado ? dia(mes, x) : ate(mes, x);
    add({ tipo: 'entrada', valor: 240000, desc: 'Freela de ilustração', cat: 'freela', data: dt(2) });
    add({ tipo: 'entrada', valor: 165000, desc: 'AdSense do canal', cat: 'canal', data: dt(passado ? 22 : 1) });
    add({ tipo: 'entrada', valor: 32000, desc: 'Venda de prints', cat: 'vendas', data: dt(3) });
    add({ tipo: 'saida', valor: 110000, desc: 'Aluguel', cat: 'casa', data: dt(1), contaFixa: 'aluguel', mesConta: mes });
    add({ tipo: 'saida', valor: 5990, desc: 'Conta do celular', cat: 'casa', data: dt(2), contaFixa: 'celular', mesConta: mes });
    if (passado) {
      add({ tipo: 'saida', valor: 11990, desc: 'Internet', cat: 'casa', data: dt(15), contaFixa: 'internet', mesConta: mes });
      add({ tipo: 'saida', valor: 21870, desc: 'Conta de luz', cat: 'casa', data: dt(19), contaFixa: 'luz', mesConta: mes });
      add({ tipo: 'entrada', valor: 48000, desc: 'Venda de prints', cat: 'vendas', data: dt(18) });
      d.faturasPagas[k.id + '|' + mes] = true;
    }
    add({ tipo: 'saida', valor: 2190, desc: 'Música (assinatura)', cat: 'assinaturas', data: dt(2), forma: 'cartao', cartao: k.id });
    add({ tipo: 'saida', valor: 4490, desc: 'Streaming de filmes', cat: 'assinaturas', data: dt(5), forma: 'cartao', cartao: k.id });
    add({ tipo: 'saida', valor: 18300, desc: 'Programa de desenho', cat: 'assinaturas', data: dt(passado ? 6 : 3), forma: 'cartao', cartao: k.id });
    add({ tipo: 'saida', valor: 8640, desc: 'Mercado do bairro', cat: 'mercado', data: dt(passado ? 8 : 4), forma: 'cartao', cartao: k.id });
    add({ tipo: 'saida', valor: 4290, desc: 'Delivery', cat: 'comida', data: dt(passado ? 9 : 4), forma: 'cartao', cartao: k.id });
    add({ tipo: 'saida', valor: 2350, desc: 'Corrida de aplicativo', cat: 'transporte', data: dt(3), forma: 'debito' });
    add({ tipo: 'saida', valor: 31270, desc: 'Compra do mês', cat: 'mercado', data: dt(passado ? 12 : 2), forma: 'debito' });
    add({ tipo: 'saida', valor: 6800, desc: 'Lanche com a galera', cat: 'comida', data: dt(passado ? 13 : 3), forma: 'cartao', cartao: k.id });
    add({ tipo: 'saida', valor: 25000, desc: 'Gasolina', cat: 'transporte', data: dt(passado ? 14 : 1), forma: 'cartao', cartao: k.id });
    add({ tipo: 'saida', valor: 30000, desc: 'Consulta', cat: 'saude', data: dt(passado ? 16 : 2), forma: 'pix' });
    if (passado) {
      add({ tipo: 'saida', valor: 26500, desc: 'Feira e açougue', cat: 'mercado', data: dt(20), forma: 'dinheiro' });
      add({ tipo: 'saida', valor: 12000, desc: 'Pizza', cat: 'comida', data: dt(24), forma: 'cartao', cartao: k.id });
      add({ tipo: 'saida', valor: 9000, desc: 'Cinema', cat: 'lazer', data: dt(26), forma: 'cartao', cartao: k.id });
    }
  }
  // parcelados
  const parcelar = (desc, cat, total, vezes, inicio) => {
    const g = 'g' + desc.length + vezes;
    for (let i = 0; i < vezes; i++) d.lanc.push({ id: 'ex' + (n++), criado: n, tipo: 'saida', valor: total / vezes, desc, cat, data: somaMesesData(inicio, i), forma: 'cartao', cartao: k.id, grupo: g, parc: [i + 1, vezes] });
  };
  parcelar('Mesa digitalizadora', 'trabalho-gasto', 189900, 10, dia(somaMes(m, -3), 2));
  parcelar('Celular novo', 'outros', 150000, 12, dia(somaMes(m, -6), 2));
  for (let i = 1; i <= 7; i++) d.faturasPagas[k.id + '|' + somaMes(m, -i)] = true;
  d.dividas.push({ id: 'div1', nome: 'Empréstimo', pessoa: 'minha mãe', total: 60000, jaPago: 20000 });
  d.dividas.push({ id: 'irma', nome: 'Fone novo', pessoa: 'minha irmã', total: 120000, parcelas: 12, jaPagas: 4, inicio: m, dia: 10, cat: 'outros' });
  return d;
}

/* =========================================================
   Começo
   ========================================================= */
// aberto por uma notificação? vai direto para a tela certa
const telaPedida = new URLSearchParams(location.search).get('tela');
history.replaceState({ tela: 'inicio' }, '');
if (telaPedida && TELAS[telaPedida] && telaPedida !== 'anotar' && telaPedida !== 'inicio') { ui.tela = telaPedida; history.pushState({ tela: telaPedida }, ''); }
render();
atualizarLembretes();
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', (e) => {
    if (e.data && e.data.tela && TELAS[e.data.tela]) { ui.mes = mesAtual(); if (ui.folha) { ui.folha = null; renderFolha(); } ir(e.data.tela); }
  });
}

// abertura: o anel se desenha; quando some, a tela entra em partes
(() => {
  const ab = document.getElementById('abertura');
  if (!ab) return;
  // usa a chave do próprio app (o Windows dele está com animações desligadas para ficar mais rápido)
  if (db.ajustes.animacoes === false) { document.documentElement.classList.add('sem-animacao'); ab.remove(); return; }
  setTimeout(() => {
    $app.classList.add('entrando');
    setTimeout(() => $app.classList.remove('entrando'), 1100);
  }, 1250);
  setTimeout(() => ab.remove(), 1750);
})();

// pede para o celular não apagar os dados sozinho quando faltar espaço
if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
// funcionar sem internet (só quando estiver no site)
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
// virou o dia com o app aberto? redesenha
document.addEventListener('visibilitychange', () => { if (!document.hidden && !ui.folha && ui.tela !== 'anotar') render(); });

window.__cf = { get db() { return db; }, ui, ACOES, render, fatura, compromissos, totaisMes, parcelamentos, listaLembretes };
})();
