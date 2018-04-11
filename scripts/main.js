$(function () {
    // Toggle search box
    $('.app-search').click(() => {
        $('#search-box').toggleClass('show');
    });

    //Toggle my cart window
    $('.mycart-header').click(() => {
        $('#mycart').toggleClass('active');
    });
});