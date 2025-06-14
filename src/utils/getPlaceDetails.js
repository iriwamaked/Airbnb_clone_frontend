export const getPlaceDetails = (placeId) => {
  return new Promise((resolve, reject) => {
    const service = new window.google.maps.places.PlacesService(document.createElement('div'));

    const request = {
      placeId,
      fields: ['address_components', 'geometry'],
    };

    service.getDetails(request, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        resolve(place);
      } else {
        reject(`Place details request failed. Status: ${status}`);
      }
    });
  });
};
