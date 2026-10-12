// Consent-only stage: intentionally contains no advertising loader or ad request.
const fc = window.googlefc = window.googlefc || {};
fc.callbackQueue = fc.callbackQueue || [];
let ready = false;
let reopen = new URLSearchParams(location.search).get('privacy-settings') === '1';
const danish = document.documentElement.lang === 'da';
const notice = document.createElement('p');
notice.className = 'note consent-status';
notice.setAttribute('role', 'status');
notice.hidden = true;
document.querySelector('footer')?.append(notice);
function openChoices() {
  if (ready && typeof fc.showRevocationMessage === 'function') {
    notice.hidden = true;
    fc.callbackQueue.push(fc.showRevocationMessage);
    return;
  }
  reopen = true;
  notice.hidden = false;
  notice.textContent = danish
    ? 'Privatlivsvalg indlæses. Hvis de ikke vises, kan du stadig bruge beregneren. Ingen annoncer er aktive.'
    : 'Privacy choices are loading. If they do not appear, you can still use the calculator. No ads are active.';
}
document.querySelectorAll('[data-privacy-settings]').forEach(link => {
  link.addEventListener('click', event => { event.preventDefault(); openChoices(); });
});
fc.callbackQueue.push({CONSENT_API_READY: () => {
  ready = true;
  if (reopen) { reopen = false; openChoices(); }
}});
const script = document.createElement('script');
script.async = true;
script.src = 'https://fundingchoicesmessages.google.com/i/pub-1398772381037303?ers=1';
script.onerror = () => {
  notice.hidden = false;
  notice.textContent = danish
    ? 'Privatlivsvalg kunne ikke indlæses. Ingen annoncer er aktive. Beregneren virker stadig.'
    : 'Privacy choices could not load. No ads are active. The calculator still works.';
};
document.head.append(script);
const marker = document.createElement('iframe');
marker.name = 'googlefcPresent';
marker.hidden = true;
marker.setAttribute('aria-hidden', 'true');
marker.style.display = 'none';
document.body.append(marker);
