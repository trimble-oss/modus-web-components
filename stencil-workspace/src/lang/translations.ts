interface Translation {
  [key: string]: string;
}

const translationStore: Record<string, Translation> = {
  'en-US': {
    showingResult: 'Showing result',
    of: 'of',
    pageView: 'Page View',
    pleaseSelect: 'Please select',
    sortAscending: 'Sort Ascending',
    sortDescending: 'Sort Descending',
    sortedAscending: 'Sorted Ascending',
    sortedDescending: 'Sorted Descending',
  },
  'es-ES': {
    showingResult: 'Mostrando resultado',
    of: 'de',
    pageView: 'Vista de página',
    pleaseSelect: 'Por favor seleccione',
    sortAscending: 'Ordenar de forma ascendente',
    sortDescending: 'Ordenar de forma descendente',
    sortedAscending: 'Ordenado de forma ascendente',
    sortedDescending: 'Ordenado de forma descendente',
  },
  'fr-FR': {
    showingResult: 'Afficher le résultat',
    of: 'de',
    pageView: 'Prévisualisation',
    pleaseSelect: 'Veuillez sélectionner',
    sortAscending: 'Trier par ordre croissant',
    sortDescending: 'Trier par ordre décroissant',
    sortedAscending: 'Trié par ordre croissant',
    sortedDescending: 'Trié par ordre décroissant',
  },
  'de-DE': {
    showingResult: 'Ergebnis anzeigen',
    of: 'von',
    pageView: 'Seitenansicht',
    pleaseSelect: 'Bitte auswählen',
    sortAscending: 'Aufsteigend sortieren',
    sortDescending: 'Absteigend sortieren',
    sortedAscending: 'Aufsteigend sortiert',
    sortedDescending: 'Absteigend sortiert',
  },
  'it-IT': {
    showingResult: 'Visualizzazione del risultato',
    of: 'di',
    pageView: 'Vista della pagina',
    pleaseSelect: 'Per favore seleziona',
    sortAscending: 'Ordina in ordine crescente',
    sortDescending: 'Ordina in ordine decrescente',
    sortedAscending: 'Ordinato in ordine crescente',
    sortedDescending: 'Ordinato in ordine decrescente',
  },
  'fi-FI': {
    showingResult: 'Näytetään tulos',
    of: '/',
    pageView: 'Sivunäkymä',
    pleaseSelect: 'Valitse',
    sortAscending: 'Lajittele kasvavaan järjestykseen',
    sortDescending: 'Lajittele vähenevään järjestykseen',
    sortedAscending: 'Lajiteltu nousevassa järjestyksessä',
    sortedDescending: 'Lajiteltu laskevassa järjestyksessä',
  },
};

const langMap: Record<string, string> = {
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
  de: 'de-DE',
  it: 'it-IT',
  fi: 'fi-FI',
};

let translations = translationStore['en-US'];

function getTranslations(): void {
  const lang = document.documentElement.lang || navigator?.language;
  if (translationStore[lang]) {
    translations = translationStore[lang];
  } else {
    const baseLang = lang.split('-')[0];
    const mappedLang = langMap[baseLang] || 'en-US';
    translations = translationStore[mappedLang];
  }
}

function translate(key: string): string {
  return translations[key];
}

export { translations, getTranslations, translate };
