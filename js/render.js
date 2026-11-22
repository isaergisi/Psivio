/* site.config.js içindeki içeriği sayfaya yerleştirir. Bu dosyayı düzenlemen gerekmez. */
(() => {
  'use strict';
  const S = window.SITE || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const get = path => path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), S);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  // **kalın**, *italik*
  const md = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>');
  const plain = s => String(s ?? '').replace(/\*/g, '');
  const filled = v => v != null && String(v).trim() !== '';

  const kisi = S.kisi || {};
  const ilt = S.iletisim || {};
  const igUrl = filled(ilt.instagram) ? `https://www.instagram.com/${String(ilt.instagram).replace(/^@/, '')}/` : '';
  const kose = (S.yazilar && S.yazilar.kose) || {};
  const hasKose = filled(kose.url);

  /* ---- başlık ve açıklama ---- */
  if (S.seo) {
    if (filled(S.seo.baslik)) document.title = S.seo.baslik;
    const d = $('meta[name="description"]');
    if (d && filled(S.seo.aciklama)) d.content = S.seo.aciklama;
  }

  /* ---- basit metinler ---- */
  $$('[data-k]').forEach(el => {
    const v = get(el.dataset.k);
    if (filled(v)) el.innerHTML = md(v);
    else (el.closest('li') || el).hidden = true;
  });
  $$('[data-src]').forEach(img => { const v = get(img.dataset.src); if (filled(v)) img.src = v; });
  $$('[data-alt]').forEach(img => { img.alt = get(img.dataset.alt) || ''; });
  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  $$('[data-brand]').forEach(a => a.setAttribute('aria-label', `${kisi.adSoyad || ''}, ana sayfa`));

  /* ---- e-posta ---- */
  $$('[data-mail]').forEach(a => { a.href = `mailto:${ilt.eposta}`; a.textContent = ilt.eposta; });
  $$('[data-mail-link]').forEach(a => { a.href = `mailto:${ilt.eposta}`; });

  /* ---- hero başlığı ---- */
  const title = $('[data-hero-title]');
  title.innerHTML = ((S.hero && S.hero.satirlar) || []).map(l => `<span class="line"><span>${md(l)}</span></span>`).join('');

  /* ---- hakkımda bilgileri ---- */
  $('[data-facts]').innerHTML = ((S.hakkimda && S.hakkimda.bilgiler) || [])
    .map(b => `<div><dt>${esc(b.etiket)}</dt><dd>${md(b.deger)}</dd></div>`).join('');

  /* ---- hizmet kartları ---- */
  $('[data-services]').innerHTML = ((S.hizmetler && S.hizmetler.liste) || []).map((h, i) => `
    <a class="card" href="#randevu" data-service="${esc(h.ad)}"${h.sekil ? ` data-format="${esc(h.sekil)}"` : ''}>
      <figure class="card__img frame" data-reveal><img src="${esc(h.gorsel)}" alt="${esc(h.alt || '')}" width="1200" height="1500" loading="lazy" decoding="async"></figure>
      <div class="card__body">
        <span class="card__no">${String(i + 1).padStart(2, '0')}</span>
        <h3>${md(h.ad)}</h3>
        <p>${md(h.metin)}</p>
        <span class="card__cta">Bu konu için randevu al <span aria-hidden="true">→</span></span>
      </div>
    </a>`).join('');

  /* ---- süreç adımları ---- */
  const adimlar = (S.surec && S.surec.adimlar) || [];
  $('[data-steps]').innerHTML = adimlar.map((a, i) => `
    <li class="chapter${i === 0 ? ' is-active' : ''}" data-chapter="${i}">
      <span class="chapter__no">${String(i + 1).padStart(2, '0')}</span>
      <h3>${md(a.ad)}</h3>
      <p>${md(a.metin)}</p>
    </li>`).join('');
  $('[data-step-media]').innerHTML = adimlar.map((a, i) =>
    `<img${i === 0 ? ' class="is-active"' : ''} src="${esc(a.gorsel)}" alt="" width="1400" height="1600" loading="lazy" decoding="async">`).join('');
  $('[data-chapters]').style.height = `${Math.max(2, adimlar.length) * 100}vh`;

  /* ---- alıntı ---- */
  $('[data-split]').textContent = plain(S.alinti && S.alinti.metin);

  /* ---- yazılar: köşe kartı + notlar ---- */
  const writing = $('[data-writing]');
  if (hasKose) {
    writing.insertAdjacentHTML('afterbegin', `
      <a class="feature" href="${esc(kose.url)}" target="_blank" rel="noopener">
        <figure class="feature__img frame"><img src="${esc(kose.gorsel)}" alt="" width="1000" height="1250" loading="lazy" decoding="async"></figure>
        <div class="feature__body">
          ${filled(kose.etiket) ? `<span class="tag">${esc(kose.etiket)}</span>` : ''}
          <h3>${md(kose.ad)}</h3>
          ${filled(kose.metin) ? `<p>${md(kose.metin)}</p>` : ''}
          <span class="card__cta">Yazıları oku <span aria-hidden="true">↗</span></span>
        </div>
      </a>`);
  } else {
    writing.classList.add('no-feature');
  }
  const notlar = (S.yazilar && S.yazilar.notlar) || [];
  const noteTag = igUrl ? 'a' : 'div';
  $('[data-notes]').innerHTML = notlar.map(n => `
    <${noteTag} class="note"${igUrl ? ` href="${igUrl}" target="_blank" rel="noopener"` : ''}>
      <figure class="frame"><img src="${esc(n.gorsel)}" alt="${esc(n.alt || '')}" width="1000" height="1250" loading="lazy" decoding="async"></figure>
      <p class="note__line">${md(n.metin)}</p>
    </${noteTag}>`).join('');
  if (!notlar.length && !hasKose) writing.hidden = true;

  /* ---- yazı listesi ---- */
  const liste = (S.yazilar && S.yazilar.liste) || [];
  const ul = $('[data-articles]');
  if (liste.length) {
    const fmt = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
    ul.innerHTML = liste.map(y => {
      const inner = `${filled(y.tarih) ? `<time datetime="${esc(y.tarih)}">${fmt.format(new Date(y.tarih + 'T00:00'))}</time>` : ''}
        <strong>${md(y.baslik)}</strong>${filled(y.ozet) ? `<p>${md(y.ozet)}</p>` : ''}`;
      return `<li>${filled(y.url)
        ? `<a class="art" href="${esc(y.url)}" target="_blank" rel="noopener">${inner}</a>`
        : `<article class="art">${inner}</article>`}</li>`;
    }).join('');
    ul.hidden = false;
  }

  const igFollow = $('[data-ig-follow]');
  if (igUrl) {
    igFollow.href = igUrl;
    igFollow.innerHTML = `Instagram'da @${esc(String(ilt.instagram).replace(/^@/, ''))} hesabını takip et <span aria-hidden="true">↗</span>`;
    igFollow.hidden = false;
  }

  /* ---- randevu seçenekleri ---- */
  const R = S.randevu || {};
  const chips = (name, items) => items.map((v, i) =>
    `<label class="chip"><input type="radio" name="${name}" value="${esc(v)}"${i === 0 ? ' checked' : ''}><span>${esc(v)}</span></label>`).join('');
  $('[data-topics]').innerHTML = chips('konu', R.konular || ['Ön görüşme']);
  $('[data-formats]').innerHTML = chips('sekil', R.sekiller || ['Online']);

  /* ---- SSS ---- */
  $('[data-faq]').innerHTML = ((S.sss && S.sss.sorular) || [])
    .map(q => `<details><summary>${md(q.s)}</summary><p>${md(q.c)}</p></details>`).join('');

  /* ---- kapanış bağlantıları ---- */
  const links = [];
  if (igUrl) links.push(['Instagram', '@' + String(ilt.instagram).replace(/^@/, ''), igUrl, '↗']);
  if (filled(ilt.linkedin)) links.push(['LinkedIn', kisi.adSoyad, ilt.linkedin, '↗']);
  if (filled(ilt.telefon)) links.push(['Telefon', ilt.telefon, 'tel:' + String(ilt.telefon).replace(/[^\d+]/g, ''), '→']);
  if (hasKose) links.push([kose.etiket || 'Yazılar', plain(kose.ad), kose.url, '↗']);
  links.push(['Randevu', 'Formu doldur', '#randevu', '→']);
  $('[data-close-links]').innerHTML = links.map(([k, v, href, ic]) => {
    const ext = /^https?:/.test(href);
    return `<li><a href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ''}><span>${esc(k)}</span>${esc(v)} <i aria-hidden="true">${ic}</i></a></li>`;
  }).join('');
  $('[data-close-links]').style.setProperty('--cols', Math.min(links.length, 4));
})();
