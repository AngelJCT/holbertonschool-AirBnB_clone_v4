function loadPlaces(place) {
    $('section.places').append(`
            <article>
              <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${place.max_guest}Guests</div>
                <div class="number_rooms">${place.number_rooms}Bedrooms</div>
                <div class="number_bathrooms">${place.number_bathrooms}Bathrooms</div>
              </div>
              <div class="description">
                ${place.description}
              </div>
            </article>`);
}

$(document).ready(function () {
  const amenityDict = {};
  $('input[type=checkbox]').click(function () {
    if ($(this).is(':checked')) {
      amenityDict[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenityDict[$(this).data('id')];
    }
    const amenityList = Object.values(amenityDict);
    if (amenityList.length > 0) {
      $('.amenities h4').text(Object.values(amenityDict).join(', '));
    } else {
      $('.amenities h4').html('&nbsp;');
    }
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  const fetchPlaces = function (amenityIds = []) {
    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ amenities: amenityIds }),
        success: function (data) {
            $('section.places').empty();
            for (const place of data) {
                $.ajax({
                    url: `http://0.0.0.0:5001/api/v1/places/${place.id}/amenities`,
                    type: 'GET',
                    success: (result) => {
                        let idArray = result.map(obj => obj.id);
                        if (amenityIds.every(value => idArray.includes(value))) {
                            loadPlaces(place);
                        }
                    },
                });
            }
        },
      });
  }
  $('button').click(function (){
    const amenityIds = Object.keys(amenityDict);
    fetchPlaces(amenityIds);
  });

    fetchPlaces();
});
