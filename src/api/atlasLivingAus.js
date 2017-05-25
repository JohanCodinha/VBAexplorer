import axios from 'axios';

const searchALASpecies = (taxonomy) => {
  const queriedSpecie = taxonomy;

  return axios.get('https://bie.ala.org.au/ws/search.json', {
    params: {
      q: taxonomy.scientificName,
    },
  })
    .then((res) => {
      const data = res.data.searchResults.results;
      // only return VicMuseum species matching the initial query
      const specie = data.find(s => s.scientificName === queriedSpecie.scientificName ||
          s.commonName === queriedSpecie.commonName);
      return specie;
    })
    .catch(error => console.log(error.message));
};

export default searchALASpecies;
