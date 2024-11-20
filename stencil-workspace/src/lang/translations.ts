interface Translation {
  [key: string]: string;
}

const translations: Record<string, Translation> = {
  en: {
    showingResult: 'Showing result',
    pageView: 'Page View',
    sortAscending: 'Sort Ascending',
    sortDescending: 'Sort Descending',
    sortedAscending: 'Sorted Ascending',
    sortedDescending: 'Sorted Descending',
  },
  es: {
    showingResult: 'Mostrando resultado',
    pageView: 'Vista de página',
    sortAscending: 'Ordenar de forma ascendente',
    sortDescending: 'Ordenar de forma descendente',
    sortedAscending: 'Ordenado de forma ascendente',
    sortedDescending: 'Ordenado de forma descendente',
  },
  fr: {
    showingResult: 'Afficher le résultat',
    pageView: 'Prévisualisation',
    sortAscending: 'Trier par ordre croissant',
    sortDescending: 'Trier par ordre décroissant',
    sortedAscending: 'Trié par ordre croissant',
    sortedDescending: 'Trié par ordre décroissant',
  },
  de: {
    showingResult: 'Ergebnis anzeigen',
    pageView: 'Seitenansicht',
    sortAscending: 'Aufsteigend sortieren',
    sortDescending: 'Absteigend sortieren',
    sortedAscending: 'Aufsteigend sortiert',
    sortedDescending: 'Absteigend sortiert',
  },
  it: {
    showingResult: 'Visualizzazione del risultato',
    pageView: 'Vista della pagina',
    sortAscending: 'Ordina in ordine crescente',
    sortDescending: 'Ordina in ordine decrescente',
    sortedAscending: 'Ordinato in ordine crescente',
    sortedDescending: 'Ordinato in ordine decrescente',
  },
  fi: {
    showingResult: 'Näytetään tulos',
    pageView: 'Sivunäkymä',
    sortAscending: 'Lajittele kasvavaan järjestykseen',
    sortDescending: 'Lajittele vähenevään järjestykseen',
    sortedAscending: 'Lajiteltu nousevassa järjestyksessä',
    sortedDescending: 'Lajiteltu laskevassa järjestyksessä',
  },
};

function getTranslations(): Translation {
  let lang = navigator?.language?.slice(0, 2);
  if (!lang) {
    lang = document.documentElement.lang?.slice(0, 2);
  }
  return translations[lang] || translations['en'];
}

export { translations, getTranslations };
