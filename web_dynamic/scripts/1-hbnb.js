#!/usr/bin/node
$(document).ready(function () {
    const amenityDict = {};
    $('input[type=checkbox]').click(function () {
        if ($(this)) {
            amenityDict[$(this).data('id')] = $(this).data('name');
        }
        else {
            delete amenityDict[$(this).data('id')];
        }
        const amenityList = Object.values(amenityDict);
        if (amenityList.length > 0) {
            $('.amenities h4').text(Object.values(amenityDict).join(', '));
        }
        else {
            $('.amenities h4').html('&nbsp;');
        }
    });
});
