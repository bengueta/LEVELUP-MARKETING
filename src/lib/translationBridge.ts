type Language = 'he' | 'en';

const setCookie = (name: string, value: string, days = 30) => {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  const cookie = `${name}=${value};expires=${expires};path=/`;
  document.cookie = cookie;
  const hostname = window.location.hostname.replace(/^www\./, '');
  if (hostname) {
    document.cookie = `${name}=${value};expires=${expires};path=/;domain=.${hostname}`;
  }
};

const triggerComboChange = (lang: Language) => {
  const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo');
  if (combo) {
    combo.value = lang;
    combo.dispatchEvent(new Event('change'));
    return true;
  }
  return false;
};

export const applyGoogleTranslation = (lang: Language) => {
  const value = lang === 'en' ? '/he/en' : '/he/he';
  setCookie('googtrans', value);
  setCookie('googtrans', value, 30);

  if (triggerComboChange(lang)) return;

  const handler = () => triggerComboChange(lang);
  if ((window as any).google?.translate) {
    handler();
  } else {
    window.addEventListener('google-translate-ready', handler, { once: true });
  }
};


