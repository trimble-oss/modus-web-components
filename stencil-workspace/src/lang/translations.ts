interface Translation {
  [key: string]: string;
}

const translations: Record<string, Translation> = {
  en: {
    showingResult: 'Showing result',
    of: 'of',
    pageView: 'Page View',
    pleaseSelect: 'Please select',
    sortAscending: 'Sort Ascending',
    sortDescending: 'Sort Descending',
    sortedAscending: 'Sorted Ascending',
    sortedDescending: 'Sorted Descending',
  },
  es: {
    showingResult: 'Mostrando resultado',
    of: 'de',
    pageView: 'Vista de página',
    pleaseSelect: 'Por favor seleccione',
    sortAscending: 'Ordenar de forma ascendente',
    sortDescending: 'Ordenar de forma descendente',
    sortedAscending: 'Ordenado de forma ascendente',
    sortedDescending: 'Ordenado de forma descendente',
  },
  fr: {
    showingResult: 'Afficher le résultat',
    of: 'de',
    pageView: 'Prévisualisation',
    pleaseSelect: 'Veuillez sélectionner',
    sortAscending: 'Trier par ordre croissant',
    sortDescending: 'Trier par ordre décroissant',
    sortedAscending: 'Trié par ordre croissant',
    sortedDescending: 'Trié par ordre décroissant',
  },
  de: {
    showingResult: 'Ergebnis anzeigen',
    of: 'von',
    pageView: 'Seitenansicht',
    pleaseSelect: 'Bitte auswählen',
    sortAscending: 'Aufsteigend sortieren',
    sortDescending: 'Absteigend sortieren',
    sortedAscending: 'Aufsteigend sortiert',
    sortedDescending: 'Absteigend sortiert',
  },
  it: {
    showingResult: 'Visualizzazione del risultato',
    of: 'di',
    pageView: 'Vista della pagina',
    pleaseSelect: 'Per favore seleziona',
    sortAscending: 'Ordina in ordine crescente',
    sortDescending: 'Ordina in ordine decrescente',
    sortedAscending: 'Ordinato in ordine crescente',
    sortedDescending: 'Ordinato in ordine decrescente',
  },
  fi: {
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

function getTranslations(): Translation {
  let lang = document.documentElement.lang || navigator?.language?.slice(0, 2);

  if (!lang || lang.trim() === '') {
    return translations['en'];
  }

  lang = lang?.toLowerCase();
  const primaryLang = lang.split('-')[0];

  return translations[lang] || translations[primaryLang] || translations['en'];
}

export { translations, getTranslations };
