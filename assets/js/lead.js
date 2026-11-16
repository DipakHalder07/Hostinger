/* =========================================================================
   Digital Grove: Website Design in Siliguri landing page
   Lead capture (HubSpot Forms API), WhatsApp, tracking, UX helpers.
   No dependencies.
   ========================================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     CONFIG: edit these values
     hubspotFormGuid: create a form in HubSpot (Marketing → Forms) with the
     fields firstname, phone, message, then copy its Form ID (GUID) here.
     Until it is set, leads go to the thank-you page and WhatsApp only.
     --------------------------------------------------------------------- */
  var CONFIG = {
    whatsappNumber: '918617513004',
    hubspotPortalId: '245081602',
    hubspotFormGuid: '', // e.g. 'a1b2c3d4-....' (REQUIRED for HubSpot leads)
    hubspotRegion: '', // leave empty to use the global api.hsforms.com endpoint (set 'eu1' only for EU-hosted portals)
    thankYouUrl: 'thank-you.html',
    defaultWaText: 'Hi Digital Grove, I want a website for my business in Siliguri. Please share details.'
  };

  window.dataLayer = window.dataLayer || [];
  function track(event, params) {
    var payload = { event: event };
    for (var k in params) if (Object.prototype.hasOwnProperty.call(params, k)) payload[k] = params[k];
    window.dataLayer.push(payload);
  }

  /* ---------- Safe storage ---------- */
  function store(key, val) { try { sessionStorage.setItem(key, val); } catch (e) { } }
  function read(key) { try { return sessionStorage.getItem(key); } catch (e) { return null; } }

  /* ---------- Capture UTM / click IDs for attribution ---------- */
  var ATTR_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'gbraid', 'wbraid', 'fbclid'];
  var params = new URLSearchParams(window.location.search);
  ATTR_KEYS.forEach(function (k) { var v = params.get(k); if (v) store('dg_' + k, v.slice(0, 200)); });
  function attribution() {
    var out = {};
    ATTR_KEYS.forEach(function (k) { var v = read('dg_' + k); if (v) out[k] = v; });
    return out;
  }

  /* ---------- WhatsApp links with prefilled text ---------- */
  function waUrl(text) {
    return 'https://wa.me/' + CONFIG.whatsappNumber + '?text=' + encodeURIComponent(text || CONFIG.defaultWaText);
  }
  document.querySelectorAll('[data-wa]').forEach(function (a) { a.href = waUrl(); });

  /* ---------- Click tracking ---------- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('a, button');
    if (!el) return;
    var t = el.getAttribute('data-track');
    var loc = el.getAttribute('data-cta') || el.getAttribute('data-wa') || '';
    if (t === 'whatsapp') track('click_whatsapp', { cta_location: loc });
    else if (t === 'call') track('click_call', { cta_location: loc });
    else if (t === 'email') track('click_email', { cta_location: loc });
    else if (el.hasAttribute('data-cta')) track('cta_click', { cta_location: loc });

    // Plan buttons: pre-fill "I need" + remember the plan
    var plan = el.getAttribute('data-plan');
    if (plan) {
      store('dg_plan', plan);
      var need = document.getElementById('lead-need');
      if (need) need.value = plan === 'Ecommerce' ? 'Online store' : (plan === 'Business' ? 'Website + SEO' : 'New website');
    }
  });

  /* ---------- Form validation + submit ---------- */
  function cleanPhone(v) {
    var d = (v || '').replace(/\D/g, '');
    if (d.length === 12 && d.indexOf('91') === 0) d = d.slice(2);
    if (d.length === 11 && d.charAt(0) === '0') d = d.slice(1);
    return d;
  }
  function setInvalid(input, bad) {
    var field = input.closest('.field');
    if (field) field.classList.toggle('is-invalid', bad);
    input.setAttribute('aria-invalid', bad ? 'true' : 'false');
  }
  function getCookie(name) {
    var m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : undefined;
  }

  var started = {};
  document.querySelectorAll('.lead-form').forEach(function (form) {
    var formId = form.getAttribute('data-form-id');

    form.addEventListener('input', function (e) {
      if (!started[formId]) { started[formId] = true; track('form_start', { form_id: formId }); }
      if (e.target.closest('.field.is-invalid')) setInvalid(e.target, false);
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('.form-status');
      status.className = 'form-status'; status.textContent = '';

      // Honeypot (bots fill hidden fields)
      var hp = form.querySelector('.hp-field');
      if (hp && hp.value) return;

      var name = form.elements.firstname;
      var phone = form.elements.phone;
      var type = form.elements.business_type;
      var ok = true;

      var nameBad = name.value.trim().length < 2; setInvalid(name, nameBad); ok = ok && !nameBad;
      var digits = cleanPhone(phone.value);
      var phoneBad = !/^[6-9]\d{9}$/.test(digits); setInvalid(phone, phoneBad); ok = ok && !phoneBad;
      var typeBad = !type.value; setInvalid(type, typeBad); ok = ok && !typeBad;

      if (!ok) {
        var first = form.querySelector('[aria-invalid="true"]');
        if (first) first.focus();
        track('form_error', { form_id: formId });
        return;
      }

      var need = form.elements.need ? form.elements.need.value : '';
      var extra = form.elements.message ? form.elements.message.value.trim() : '';
      var plan = read('dg_plan') || '';
      var attr = attribution();
      var attrText = Object.keys(attr).map(function (k) { return k + '=' + attr[k]; }).join(', ');

      var message = [
        'Business type: ' + type.value,
        need ? 'Needs: ' + need : '',
        plan ? 'Plan clicked: ' + plan : '',
        extra ? 'Message: ' + extra : '',
        'Form: Website Design Siliguri LP (' + formId + ')',
        attrText ? 'Source: ' + attrText : ''
      ].filter(Boolean).join('\n');

      var lead = { name: name.value.trim(), phone: '+91' + digits, type: type.value, need: need };

      var btn = form.querySelector('button[type="submit"]');
      btn.setAttribute('aria-busy', 'true');
      var btnHtml = btn.innerHTML; btn.textContent = 'Sending…';

      function done() {
        track('generate_lead', { form_id: formId, business_type: type.value, need: need || '(none)', plan: plan || '(none)' });
        store('dg_lead', JSON.stringify(lead));
        // Small delay lets tags fire before navigation
        setTimeout(function () { window.location.href = CONFIG.thankYouUrl; }, 300);
      }
      function fail() {
        btn.removeAttribute('aria-busy'); btn.innerHTML = btnHtml;
        status.className = 'form-status is-error';
        status.innerHTML = 'Sorry, something went wrong. Please <a href="' + waUrl('Hi, I am ' + lead.name + '. I need a website (' + lead.type + '). My number: ' + lead.phone) + '" target="_blank" rel="noopener"><strong>message us on WhatsApp</strong></a> or call +91 86175 13004.';
      }

      if (!CONFIG.hubspotFormGuid) { done(); return; }

      var host = CONFIG.hubspotRegion ? 'https://api-' + CONFIG.hubspotRegion + '.hsforms.com' : 'https://api.hsforms.com';
      var body = {
        fields: [
          { objectTypeId: '0-1', name: 'firstname', value: lead.name },
          { objectTypeId: '0-1', name: 'phone', value: lead.phone },
          { objectTypeId: '0-1', name: 'message', value: message }
        ],
        context: { pageUri: window.location.href, pageName: document.title }
      };
      var hutk = getCookie('hubspotutk');
      if (hutk) body.context.hutk = hutk;

      fetch(host + '/submissions/v3/integration/submit/' + CONFIG.hubspotPortalId + '/' + CONFIG.hubspotFormGuid, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }).then(function (r) { if (r.ok) done(); else fail(); }).catch(fail);
    });
  });

  /* ---------- Scroll-depth tracking ---------- */
  var depths = [25, 50, 75, 90], hit = {};
  window.addEventListener('scroll', function () {
    var h = document.documentElement;
    var pct = (h.scrollTop + window.innerHeight) / h.scrollHeight * 100;
    depths.forEach(function (d) { if (pct >= d && !hit[d]) { hit[d] = true; track('scroll_depth', { percent: d }); } });
  }, { passive: true });

  /* ---------- Thank-you page personalisation ---------- */
  var ty = document.querySelector('[data-ty]');
  if (ty) {
    var lead = null; try { lead = JSON.parse(read('dg_lead') || 'null'); } catch (e) { }
    var nameEl = document.querySelector('[data-ty-name]');
    if (lead && nameEl) nameEl.textContent = ', ' + lead.name.split(' ')[0];
    var waBtn = document.querySelector('[data-ty-wa]');
    if (waBtn) {
      waBtn.href = waUrl(lead
        ? 'Hi Digital Grove, I just requested a website quote. Name: ' + lead.name + ', Business: ' + lead.type + (lead.need ? ', Need: ' + lead.need : '') + '.'
        : CONFIG.defaultWaText);
    }
  }
})();
