import axios from 'axios';

const searchMuseumSpecies = (taxonomy) => {
  const queriedSpecie = taxonomy;
  return axios
    .get('https://collections.museumvictoria.com.au/api/search', {
      params: {
        query: taxonomy.scientificName,
        recordtype: 'species',
      },
    })
    .then((res) => {
      // only return species matching the initial query scientifique name or common name;
      const specie = res.data.find(s => s.taxonomy.taxonName === queriedSpecie.scientificName ||
          s.taxonomy.commonName === queriedSpecie.commonName);
      return specie;
    })
    .catch(error => console.log(error.message));
};

export default searchMuseumSpecies;
