import axios from 'axios';

function validateResponse (response, taxonomy) {
  const validSpecie = response.filter((specie) => {
    const resultScientificName = specie.scientificName
      ? specie.scientificName.toLowerCase()
      : undefined;
    const specieScientificName = taxonomy.scientificName
      ? taxonomy.scientificName.toLowerCase()
      : undefined;
    const resultCommonName = specie.commonNameSingle
      ? specie.commonNameSingle.toLowerCase()
      : undefined;
    const specieCommonName = taxonomy.commonName
      ? taxonomy.commonName.toLowerCase()
      : undefined;
    const scientificNameMatch = resultScientificName === specieScientificName;
    const commonNameMatch = resultCommonName === specieCommonName;
    return scientificNameMatch || commonNameMatch;
  });
  return validSpecie.length
    ? validSpecie
    : false;
}

function fetchALASpecies (taxonomy) {
  return axios.get('https://bie.ala.org.au/ws/search.json', {
    params: {
      q: taxonomy.scientificName,
    },
  }).catch(error => console.log(error));
}
const searchALASpecies = async (taxonomy) => {
  const response = await fetchALASpecies(taxonomy);
  const specieData = validateResponse(response.data.searchResults.results, taxonomy);
  if (!specieData.length) return false;
  const httpRegexp = /http:\/\//;
  const images = specieData.reduce((acc, specie) => {
    if (specie.imageUrl) {
      const image = {
        medium: specie.imageUrl.replace(httpRegexp, 'https://'),
        thumbnail: specie.thumbnailUrl.replace(httpRegexp, 'https://'),
        author: specie.author,
        source: specie.infoSourceName,
      };
      acc.images.push(image);
    }
    return acc;
  }, { images: [] });
  return images;
};

export default searchALASpecies;
