(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const S = window.SITE || {};
  const R = S.randevu || {};
  const EMAIL = (R.eposta && R.eposta.trim()) || (S.iletisim && S.iletisim.eposta) || '';
  const SEANS_DK = R.seansDakika || 50;

  /* ---------- nav ---------- */
  const nav = $('[data-nav]');
  const hero = $('.hero');
  const mbar = $('[data-mbar]');
  const booking = $('#randevu');
  const closeSec = $('#iletisim');
  let lastY = scrollY;
  const onScroll = () => {
    const y = scrollY;
    const heroEnd = hero.offsetHeight - nav.offsetHeight;
    nav.classList.toggle('is-solid', y > heroEnd);
    const menuOpen = document.body.classList.contains('menu-open');
    const goingDown = y > lastY + 4;
    const goingUp = y < lastY - 4;
    if (!menuOpen && y > heroEnd + 200 && goingDown) nav.classList.add('is-hidden');
    if (goingUp || y < heroEnd) nav.classList.remove('is-hidden');
    lastY = y;

    if (mbar) {
      const vh = innerHeight;
      const b = booking.getBoundingClientRect();
      const c = closeSec.getBoundingClientRect();
      const inBooking = b.top < vh && b.bottom > 0;
      const inClose = c.top < vh;
      mbar.classList.toggle('is-on', y > heroEnd && !inBooking && !inClose);
    }
  };

  /* ---------- menu ---------- */
  const toggle = $('[data-menu-toggle]');
  const menu = $('[data-menu]');
  const label = toggle && $('.nav__toggle-label', toggle);
  const setMenu = open => {
    toggle.setAttribute('aria-expanded', String(open));
    label.textContent = open ? 'Kapat' : 'Menü';
    document.body.classList.toggle('menu-open', open);
    if (open) {
      menu.hidden = false;
      nav.classList.remove('is-hidden');
      requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add('is-open')));
      document.body.style.overflow = 'hidden';
    } else {
      menu.classList.remove('is-open');
      document.body.style.overflow = '';
      setTimeout(() => { if (!menu.classList.contains('is-open')) menu.hidden = true; }, reduced ? 0 : 700);
    }
  };
  if (toggle) {
    toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
    $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
    addEventListener('keydown', e => { if (e.key === 'Escape' && document.body.classList.contains('menu-open')) { setMenu(false); toggle.focus(); } });
  }

  /* ---------- current section in nav ---------- */
  const navLinks = $$('.nav__links a');
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      navLinks.forEach(a => a.classList.toggle('is-current', a.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main > section[id]').forEach(s => io.observe(s));

  /* ---------- image reveals ---------- */
  const reveal = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); reveal.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -12% 0px' });
  $$('[data-reveal]').forEach(el => reduced ? el.classList.add('is-in') : reveal.observe(el));

  /* ---------- pinned chapters ---------- */
  const proc = $('[data-chapters]');
  const chapters = $$('.chapter', proc);
  const pimgs = $$('.process__media img', proc);
  const bar = $('.progress', proc);
  let activeCh = 0;
  const setChapter = i => {
    if (i === activeCh) return;
    chapters.forEach((c, k) => c.classList.toggle('is-active', k === i));
    pimgs.forEach((im, k) => {
      im.classList.toggle('was-active', k === activeCh);
      im.classList.toggle('is-active', k === i);
    });
    activeCh = i;
  };
  const progressOf = sec => {
    const r = sec.getBoundingClientRect();
    const span = sec.offsetHeight - innerHeight;
    return span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
  };

  /* ---------- word highlight ---------- */
  const quote = $('[data-words]');
  const qText = $('[data-split]', quote);
  const keys = ((S.alinti && S.alinti.vurgu) || []).map(k => k.toLocaleLowerCase('tr'));
  const bare = w => w.toLocaleLowerCase('tr').replace(/[^\p{L}\p{N}]/gu, '');
  const words = qText.textContent.trim().split(/\s+/);
  qText.setAttribute('aria-label', qText.textContent.trim());
  qText.textContent = '';
  const wspans = words.map((w, i) => {
    const s = document.createElement('span');
    s.className = 'w' + (keys.includes(bare(w)) ? ' is-key' : '');
    s.textContent = w;
    s.setAttribute('aria-hidden', 'true');
    qText.append(s);
    if (i < words.length - 1) qText.append(' ');
    return s;
  });

  let ticking = false;
  const frame = () => {
    ticking = false;
    onScroll();
    if (!reduced) {
      const p = progressOf(proc);
      bar.style.setProperty('--p', p.toFixed(3));
      setChapter(Math.min(chapters.length - 1, Math.floor(p * chapters.length * 0.999)));

      const q = progressOf(quote);
      quote.style.setProperty('--qp', q.toFixed(3));
      const lit = Math.round(q * 1.25 * wspans.length);
      wspans.forEach((s, i) => s.classList.toggle('is-lit', i < lit));
    }
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
  addEventListener('resize', frame);
  frame();

  /* ---------- booking ---------- */
  const form = $('[data-booking]');
  const daysEl = $('[data-days]');
  const timesEl = $('[data-times]');
  const summary = $('[data-summary]');
  const done = $('[data-done]');
  const status = $('[data-status]');
  const submitBtn = $('[data-submit]');
  const DAYS = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
  const MONTHS = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
  const fullDate = new Intl.DateTimeFormat('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' });
  const SLOTS = R.saatler || {};
  const WEEKDAY_SLOTS = SLOTS.hafta || ['10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  const SAT_SLOTS = SLOTS.cumartesi || WEEKDAY_SLOTS;
  const CLOSED = R.kapaliGunler || [0];
  const DAY_COUNT = R.gunSayisi || 14;
  const MIN_HOURS = R.enYakinSaat ?? 2;
  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  const buildDays = () => {
    const d = new Date(); d.setHours(0, 0, 0, 0);
    const out = [];
    while (out.length < DAY_COUNT) {
      if (!CLOSED.includes(d.getDay())) out.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }
    daysEl.innerHTML = '';
    out.forEach(day => {
      const l = document.createElement('label'); l.className = 'day';
      l.innerHTML = `<input type="radio" name="gun" value="${iso(day)}"><span><small>${DAYS[day.getDay()]}</small><b>${day.getDate()}</b><small>${MONTHS[day.getMonth()]}</small></span>`;
      $('input', l).setAttribute('aria-label', fullDate.format(day));
      daysEl.append(l);
    });
  };

  const buildTimes = dateStr => {
    timesEl.innerHTML = '';
    if (!dateStr) { timesEl.innerHTML = '<p class="muted">Önce bir gün seç.</p>'; return; }
    const day = new Date(dateStr + 'T00:00');
    const slots = day.getDay() === 6 ? SAT_SLOTS : WEEKDAY_SLOTS;
    const now = new Date();
    slots.forEach(t => {
      const [h, m] = t.split(':').map(Number);
      const at = new Date(day); at.setHours(h, m);
      const l = document.createElement('label'); l.className = 'slot';
      l.innerHTML = `<input type="radio" name="saat" value="${t}"><span>${t}</span>`;
      if (at - now < MIN_HOURS * 3600e3) $('input', l).disabled = true;
      timesEl.append(l);
    });
  };

  const val = name => { const el = form.elements[name]; return el ? (el.value || '') : ''; };
  const showErr = (key, on) => {
    const e = $(`[data-err="${key}"]`, form); if (e) e.hidden = !on;
    const input = form.elements[key];
    if (input && input.setAttribute && !(input instanceof RadioNodeList)) input.setAttribute('aria-invalid', String(on));
  };

  const setSum = (k, text) => {
    const dd = $(`[data-s="${k}"]`, summary);
    if (!dd || dd.textContent === text) return;
    dd.textContent = text;
    dd.classList.remove('is-flash'); void dd.offsetWidth; dd.classList.add('is-flash');
  };
  const update = () => {
    setSum('konu', val('konu'));
    setSum('sekil', val('sekil'));
    const g = val('gun');
    setSum('gun', g ? fullDate.format(new Date(g + 'T00:00')) : 'Seçilmedi');
    setSum('saat', val('saat') || 'Seçilmedi');
  };

  if (form) {
    buildDays();
    buildTimes('');
    form.addEventListener('change', e => {
      if (e.target.name === 'gun') { buildTimes(e.target.value); showErr('gun', false); }
      if (e.target.name === 'saat') showErr('saat', false);
      if (['ad', 'eposta', 'onay'].includes(e.target.name)) validate(e.target.name);
      update();
    });

    // hizmet kartları formu doldurur
    $$('[data-service]').forEach(card => card.addEventListener('click', () => {
      const s = card.dataset.service;
      const r = $$('input[name="konu"]', form).find(i => i.value === s);
      if (r) r.checked = true;
      if (card.dataset.format) { const f = $$('input[name="sekil"]', form).find(i => i.value === card.dataset.format); if (f) f.checked = true; }
      update();
    }));

    const validate = only => {
      const checks = {
        gun: () => !!val('gun'),
        saat: () => !!val('saat'),
        ad: () => val('ad').trim().length >= 3,
        eposta: () => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val('eposta').trim()),
        onay: () => form.elements.onay.checked,
      };
      let first = null;
      Object.entries(checks).forEach(([k, fn]) => {
        if (only && k !== only) return;
        const ok = fn(); showErr(k, !ok);
        if (!ok && !first) first = k;
      });
      return first;
    };

    const swap = fn => (document.startViewTransition && !reduced) ? document.startViewTransition(fn) : fn();

    let lastBooking = null;
    const send = async () => {
      const bad = validate();
      if (bad) {
        const target = bad === 'gun' ? daysEl : bad === 'saat' ? timesEl : form.elements[bad];
        target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
        const focusable = target.focus ? target : $('input:not(:disabled)', target);
        setTimeout(() => focusable && focusable.focus({ preventScroll: true }), reduced ? 0 : 400);
        return;
      }
      if (val('_honey')) return;
      const data = {
        _subject: `Randevu talebi: ${val('ad').trim()} · ${val('gun')} ${val('saat')}`,
        _template: 'table',
        _captcha: 'false',
        'Ad soyad': val('ad').trim(),
        'E-posta': val('eposta').trim(),
        'Telefon': val('telefon').trim() || '-',
        'Konu': val('konu'),
        'Görüşme şekli': val('sekil'),
        'Gün': fullDate.format(new Date(val('gun') + 'T00:00')),
        'Saat': val('saat'),
        'Not': val('not').trim() || '-',
      };
      submitBtn.disabled = true;
      submitBtn.firstChild.textContent = 'Gönderiliyor… ';
      status.classList.remove('is-error');
      status.textContent = 'Talebin gönderiliyor.';
      try {
        const res = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || String(json.success) === 'false') throw new Error(json.message || res.status);
        lastBooking = { ...data, gunIso: val('gun') };
        swap(() => {
          summary.hidden = true;
          done.hidden = false;
          $('[data-done-text]', done).textContent = `${data['Gün']}, ${data['Saat']} için ${data['Konu'].toLocaleLowerCase('tr')} talebin bana ulaştı. Onay e-postası ${data['E-posta']} adresine gelecek.`;
        });
        done.focus();
      } catch (err) {
        const body = Object.entries(data).filter(([k]) => !k.startsWith('_')).map(([k, v]) => `${k}: ${v}`).join('\n');
        const mail = `mailto:${EMAIL}?subject=${encodeURIComponent(data._subject)}&body=${encodeURIComponent(body)}`;
        status.classList.add('is-error');
        status.innerHTML = '';
        status.append('Talep şu an gönderilemedi. ');
        const a = document.createElement('a'); a.href = mail; a.textContent = 'Bilgilerini e-postayla gönder';
        status.append(a, '.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.firstChild.textContent = 'Randevu talebini gönder ';
      }
    };

    form.addEventListener('submit', e => { e.preventDefault(); send(); });

    $('[data-again]').addEventListener('click', () => {
      swap(() => {
        form.reset(); buildTimes(''); update();
        done.hidden = true; summary.hidden = false;
        status.textContent = 'Talebin onaylanana kadar kesin randevu sayılmaz.';
      });
      form.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    });

    $('[data-ics]').addEventListener('click', () => {
      if (!lastBooking) return;
      const [h, m] = lastBooking['Saat'].split(':').map(Number);
      const start = new Date(lastBooking.gunIso + 'T00:00'); start.setHours(h, m);
      const end = new Date(start.getTime() + SEANS_DK * 60e3);
      const f = d => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
      const ics = [
        'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Psivio//Randevu//TR', 'BEGIN:VEVENT',
        `UID:${Date.now()}@psivio`, `DTSTAMP:${f(new Date())}`, `DTSTART:${f(start)}`, `DTEND:${f(end)}`,
        `SUMMARY:${((S.kisi && S.kisi.adSoyad) ? S.kisi.adSoyad + ' · ' : '')}${lastBooking['Konu']} (onay bekliyor)`,
        `DESCRIPTION:${lastBooking['Görüşme şekli']} görüşme. Onay e-postası bekleniyor.`,
        'END:VEVENT', 'END:VCALENDAR',
      ].join('\r\n');
      const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
      const a = document.createElement('a'); a.href = url; a.download = 'randevu.ics';
      document.body.append(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });

    update();
  }
})();
