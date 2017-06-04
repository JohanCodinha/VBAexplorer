import axios from 'axios';

function validateResponse (response, taxonomy) {
  const validSpecie = response.data.find((specie) => {
    const resultScientificName = specie.taxonomy.taxonName.toLowerCase();
    const specieScientificName = taxonomy.scientificName.toLowerCase();
    const specieCommonName = taxonomy.commonName.toLowerCase();
    const resultCommonName = specie.taxonomy.commonName.toLowerCase();
    const scientificNameMatch = resultScientificName === specieScientificName;
    const commonNameMatch = resultCommonName === specieCommonName;
    return scientificNameMatch || commonNameMatch;
  });
  return validSpecie || false;
}

function fetchMuseumSpecies (taxonomy) {
  return axios.get('https://collections.museumvictoria.com.au/api/search', {
    params: {
      query: taxonomy.scientificName,
      recordtype: 'species',
    },
  }).catch(error => console.log(error));
}

const searchMuseumSpecies = async (taxonomy) => {
  const response = await fetchMuseumSpecies(taxonomy);
  const specie = validateResponse(response, taxonomy);
  if (!specie) return false;

  const specieData = {
    distribution: specie.distribution,
    habitat: specie.habitat,
    biology: specie.biology,
    generalDescription: specie.generalDescription,
    images: specie.media.slice(0, specie.media.length - 1).map((media) => {
      const image = {
        alternativeText: media.alternativeText,
        medium: media.medium.uri,
        thumbnail: media.thumbnail.uri,
        caption: media.caption,
        creator: media.creators[0],
        source: media.sources[0],
      };
      return image;
    }),
  };
  // console.log(specieData);
  return specieData;
};

export default searchMuseumSpecies;
