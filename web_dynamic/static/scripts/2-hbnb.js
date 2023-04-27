$(document).ready(function (){
    const amenityDict = {};
    $('input[type=checkbox]').click(function (){
        if ($(this).is(':checked')){
            amenityDict[$(this).data('id')] = $(this).data('name');
        }
        else {
            delete amenityDict[$(this).data('id')];
        }
        const amenityList = Object.values(amenityDict);
        if (amenityList.length > 0){
            $('.amenities h4').text(Object.values(amenityDict).join(', '));
        }
        else {
            $('.amenities h4').html('&nbsp;');
        }
})
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
        console.log(data.status);
        if (data.status === "OK") {
            console.log('ok')
            $("DIV#api_status").addClass("available");
        } else {
            $("DIV#api_status").removeClass("available");
        }
    })
});