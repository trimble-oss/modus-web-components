interface Translation {
  [key: string]: string;
}

const translations: Record<string, Translation> = {
  en: {
    showingResults: 'Showing result',
    pageView: 'Page View',
    sortAscending: 'Sort Ascending',
    sortDescending: 'Sort Descending',
    sortedAscending: 'Sorted Ascending',
    sortedDescending: 'Sorted Descending',
  },
  es: {
    showingResults: 'Mostrando resultado',
    pageView: 'Vista de página',
    sortAscending: 'Ordenar ascendente',
    sortDescending: 'Ordenar descendente',
    sortedAscending: 'Ordenado ascendente',
    sortedDescending: 'Ordenado descendente',
  },
  fr: {
    showingResults: 'Affichage des résultats',
    pageView: 'Vue de page',
    sortAscending: 'Trier par ordre croissant',
    sortDescending: 'Trier par ordre décroissant',
    sortedAscending: 'Tri croissant',
    sortedDescending: 'Tri décroissant',
  },
  de: {
    showingResults: 'Ergebnis anzeigen',
    pageView: 'Seitenansicht',
    sortAscending: 'Aufsteigend sortieren',
    sortDescending: 'Absteigend sortieren',
    sortedAscending: 'Aufsteigend sortiert',
    sortedDescending: 'Absteigend sortiert',
  },
  it: {
    showingResults: 'Visualizzazione dei risultati',
    pageView: 'Vista pagina',
    sortAscending: 'Ordina in ordine crescente',
    sortDescending: 'Ordina in ordine decrescente',
    sortedAscending: 'Ordinato in ordine crescente',
    sortedDescending: 'Ordinato in ordine decrescente',
  },
  fi: {
    showingResults: 'Näytetään tulokset',
    pageView: 'Sivunäkymä',
    sortAscending: 'Lajittele nousevassa järjestyksessä',
    sortDescending: 'Lajittele laskevassa järjestyksessä',
    sortedAscending: 'Lajiteltu nousevassa järjestyksessä',
    sortedDescending: 'Lajiteltu laskevassa järjestyksessä',
  },
};

function getTranslations(): Translation {
  const lang = navigator?.language?.slice(0, 2);
  return translations[lang] || translations['en'];
}

export { translations, getTranslations };
