import axios from 'axios';

const searchHerbariumSpecies = (taxonomy) => {
  const queriedSpecie = taxonomy;
  return axios
    .get('https://vicflora.rbg.vic.gov.au/api/images', {
      params: {
        'filter[species]': taxonomy.scientificName,
      },
    })
    .then((res) => {
      if (res.data.data === []) return false;
      // only return species matching the initial query scientifique name or common name;
      const specie = res.data.data.filter(s => s.scientificName === queriedSpecie.scientificName);
      return specie;
    })
    .catch(error => console.log(error.message));
};

export default searchHerbariumSpecies;
