import i18n from 'i18n';

export const defaultLocale = 'fr';

i18n.configure({
  directory      : __dirname + '/locales',
  defaultLocale,
  objectNotation : true,
});

export default i18n;

export function getLocale() {
  return process.env.WH_LOCALE || defaultLocale;
}
