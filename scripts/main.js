/**
 * @description Change Home page slider's arrows active status
 */
function updateSliderArrowsStatus(
    slidesDiv,
    containerWidth,
    cardCount,
    cardWidth
) {
    if ($(slidesDiv).scrollLeft() + containerWidth < cardCount * cardWidth) {
        $('#slide-right-container').addClass("active");
    } else {
        $('#slide-right-container').removeClass("active");
    }

    if ($(slidesDiv).scrollLeft() + containerWidth > containerWidth) {
        $('#slide-left-container').addClass("active");
    } else {
        $('#slide-left-container').removeClass("active");
    }
}

$(function () {
    // Toggle search box
    $('.app-search').click(() => {
        $('#search-box').toggleClass('show');
    });

    //Toggle my cart window
    $('.mycart-header').click(() => {
        $('#mycart').toggleClass('active');
    });

    // Scroll products' slider left/right        
    let div = $('#productsTabContent');
    let cardCount = $(div).find('.tab-pane').children('.app-card-container').length;
    let speed = 1500;
    let containerWidth = $('#products-slider').width();
    let cardWidth = 250;
    updateSliderArrowsStatus(div, containerWidth, cardCount, cardWidth);

    //Remove scrollbars    
    $('#slide-right-container').click(function (e) {
        if (($(div).scrollLeft() + containerWidth) < (cardCount * cardWidth)) {
            $(div).animate({
                scrollLeft: $(div).scrollLeft() + containerWidth
            }, speed,
                updateSliderArrowsStatus(div, containerWidth, cardCount, cardWidth));
        }else {
            updateSliderArrowsStatus(div, containerWidth, cardCount, cardWidth);
        }        
    });
    $('#slide-left-container').click(function (e) {
        if (($(div).scrollLeft() + containerWidth) > containerWidth) {
            $(div).animate({
                scrollLeft: '-=' + containerWidth
            }, speed,
                updateSliderArrowsStatus(div, containerWidth, cardCount, cardWidth));
        } else {
            updateSliderArrowsStatus(div, containerWidth, cardCount, cardWidth);
        }        
    });




    // If resize action ocurred then update the container width value
    $(window).resize(function () {
        try {
            containerWidth = $('#products-slider').width();
            updateSliderArrowsStatus(div, containerWidth, cardCount, cardWidth);
        } catch (error) {
            console.log(`Error occured while trying to get updated slider container width: 
            ${error}`);
        }
    });
});