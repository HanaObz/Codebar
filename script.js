// TV Schedule example

function formatDate(start, end) {

    var start_date = new Date(start);
    var end_date = new Date(end);

    var day = start_date.getDate();
    var month = start_date.getMonth() + 1; // the returned months are 0-11
    var year = start_date.getFullYear();

    var start_hour = start_date.getHours();
    var start_mins = start_date.getMinutes();

    var end_hour = end_date.getHours();
    var end_mins = end_date.getMinutes();

    var date = day + "/" + month + "/" + year + " ";

    // add leading 0 and return last two characters to make sure we use 00:00 format
    date +=  ("0"+start_hour).slice(-2) + ":" + ("0"+start_mins).slice(-2) + " - " +
    ('0' + end_hour).slice(-2) + ":" +  ( "0" + end_mins).slice(-2);

    return date;
}

function addItem(category){
    $('#genres').append("<li id = 'key'>"  + category.key + "</li>");

};

function formattedDate(date){
    date = new Date(date)

    formatted_date = ""

    hours = date.getHours()

    formatted_date += hours

    formatted_date += ":"

    formatted_date += date.getMinutes()

    if(hours > 12){
        formatted_date += " PM"
    } else {
        formatted_date += " AM"
    }

    return formatted_date
}

function addInfo(broadcast){

    info = "<li>"
    info += "<h2>" + broadcast.programme.display_titles.title + "</h2>";
    info += "<p>" + broadcast.programme.short_synopsis + "</p>";
    info += "<img src = 'http://ichef.bbci.co.uk/images/ic/272x153/" + broadcast.programme.image.pid + ".jpg' />";
    info += "<p>" + formattedDate(broadcast.start) + "</p>";
    info += "<p>" + formattedDate(broadcast.end) + "</p>";
    info += "<p>" + broadcast.duration/60 + " Minutes</p>";
    info += "<p>" + broadcast.service.title + "</p>";
    info += "</li>"


    $('#programmes').append(info)
}

function clearInfo(){
    $('#programmes').empty();
}

function retrieveGenres(){
    $.ajax({
        url: 'http://www.bbc.co.uk/tv/programmes/genres.json',
        dataType: 'json'
    }).done(function(data){ 
        $.each(data, function(index, item) {
            $.each(item, function(index, category) {
                addItem(category); 
           });
        })
        $('#genres li').on('click', function(event){
            $('#genres li').removeClass('active');
            genre = $(event.target).text();
            getTomorrowsSchedule(genre);
            activate = $(event.target);
            activate.addClass('active');
        });
    })
};



function getTomorrowsSchedule(genre){
    $.ajax({
        url: "http://www.bbc.co.uk/tv/programmes/genres/" + genre + "/schedules/tomorrow.json",
        dataType: 'json'
    }).done(function(data){
        clearInfo()
        $.each(data.broadcasts, function(index, broadcast){
            addInfo(broadcast);
        })
    })
}

retrieveGenres()



