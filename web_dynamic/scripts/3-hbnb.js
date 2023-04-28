/* Request http://0.0.0.0:5001/api/v1/places_search/:
Description of this endpoint here. If this endpoint is not available, you will have to add it to the API (you can work all together for creating this endpoint)
Send a POST request with Content-Type: application/json and an empty dictionary in the body - cURL version: curl "http://0.0.0.0:5001/api/v1/places_search" -XPOST -H "Content-Type: application/json" -d '{}'
Loop into the result of the request and create an article tag representing a Place in the section.places. (you can remove the Owner tag in the place description)
*/
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
        if (data.status === "OK") {
            $("DIV#api_status").addClass("available");
        } else {
            $("DIV#api_status").removeClass("available");
        }
  });
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (data) {
      for (const place of data) {
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
          </article>`)};
    }
  });
});
