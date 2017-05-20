const toRad = value => (value * Math.PI) / 180;

const distanceBetweenCoordinates = (lat1, lon1, lat2, lon2) => {
  const earthRadiusKm = 6371;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const lat1Rad = toRad(lat1);
  const lat2Rad = toRad(lat2);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
};

export const accesToken = (state) => {
  const token = state.token;
  const tokenLifetime = Date.now() - token.timestamp;
  debugger;
  if (token && tokenLifetime < (28 * 60 * 1000)) {
    return token.value;
  }
  return new Error('no valid token available in store.');
};

export const species = (state) => {
  if (!(state.species.length > 0)) return [];
  // countOfSightings
  const speciesList = state.species.reduce((accu, specie) => {
    if (Object.prototype.hasOwnProperty.call(specie, 'countOfSightings') && specie.countOfSightings > 0) {
      return [...accu, specie];
    }
    return accu;
  });
  if (!Array.isArray(speciesList)) return [speciesList];
  return speciesList;
};

export const records = (state) => {
  // calcul distance from record to user's position.
  const storeRecords = state.records;
  if (!storeRecords.length) return [];
  const userLat = state.position.lat;
  const userLon = state.position.long;

  const recordsWithDistance = storeRecords.map((record) => {
    const recordLat = record.latitudeddNum;
    const recordLon = record.longitudeddNum;

    const distance = distanceBetweenCoordinates(userLat, userLon, recordLat, recordLon);
    return Object.assign({}, record, { distance });
  });
  return recordsWithDistance;
};

