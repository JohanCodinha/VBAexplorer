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

export const searchArea = (state) => {
  const position = state.position;
  if (position.latitude || position.longitude) {
    return {
      lat: position.latitude,
      long: position.longitude,
      rad: state.searchRadius,
    };
  }
  return false;
};

export const searchRadius = state => state.searchRadius;

export const accesToken = (state) => {
  const token = state.token;
  if (token && (Date.now() - token.timestamp) < (28 * 60 * 1000)) {
    console.log(`Token aged : ${(Date.now() - token.timestamp) / 1000}s requested`);
    return token.value;
  }
  return false;
};

export const species = state => state.species;
export const speciesData = state => state.speciesData;
export const records = (state) => {
  // calcul distance from record to user's position.
  const storeRecords = state.records;
  if (!storeRecords.length) return [];
  const userLat = state.position.latitude;
  const userLon = state.position.longitude;

  const recordsWithDistance = storeRecords.map((record) => {
    const recordLat = record.latitudeddNum;
    const recordLon = record.longitudeddNum;
    const distance = distanceBetweenCoordinates(userLat, userLon, recordLat, recordLon);
    return Object.assign({}, record, { distance });
  });
  return recordsWithDistance;
};

