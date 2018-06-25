/**
 * @description Change Home page slider's arrows active status
 */
function updateSliderArrowsStatus(
    cardsContainer,
    containerWidth,
    cardCount,
    cardWidth
) {

    console.log(`
    ********************************
    Container: ${cardsContainer}
    Conatiner Width: ${containerWidth}
    Card Count: ${cardCount}
    Card Width: ${cardWidth}
    `);
    console.log(`
    Is there items on the right?
    Is ${$(cardsContainer).scrollLeft() + containerWidth} < ${(cardCount * cardWidth) + 15}
    `);
    if ($(cardsContainer).scrollLeft() + containerWidth < (cardCount * cardWidth) + 15) {
        console.log('Yes, add right active class');
        $('#slide-right-container').addClass("active");
    } else {
        $('#slide-right-container').removeClass("active");
    }

    console.log(`
    Is there items on the left?
    Is ${$(cardsContainer).scrollLeft() + containerWidth} > ${containerWidth}
    `);

    if ($(cardsContainer).scrollLeft() > 0) {
        console.log('Yes, add left active class');
        $('#slide-left-container').addClass("active");
    } else {
        $('#slide-left-container').removeClass("active");
    }
}

/**
 * @description fill products' cards
 */
function loadCards(tabID, cards){

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
    let speed = 1000;
    let containerWidth = $('#products-slider').width();
    let cardWidth = 250;
    
    updateSliderArrowsStatus(div, containerWidth, cardCount, cardWidth);

    //Remove scrollbars    
    //TODO theres still an issue in activating the arrows
    $('#slide-right-container').click(function (e) {        
        if (($(div).scrollLeft() + containerWidth) < (cardCount * cardWidth) + 15) {
            $(div).animate({
                scrollLeft: $(div).scrollLeft() + cardWidth
            }, {
                duration: speed,
                complete: updateSliderArrowsStatus(div, containerWidth, cardCount, cardWidth)
            });
        }  
        updateSliderArrowsStatus(div, containerWidth, cardCount, cardWidth);
    });
    $('#slide-left-container').click(function (e) {        
        if (($(div).scrollLeft() + containerWidth) > containerWidth) {
            $(div).animate({
                scrollLeft: '-=' + cardWidth
            },  {
                duration: speed,
                complete: updateSliderArrowsStatus(div, containerWidth, cardCount, cardWidth)
            });            
        }     
        updateSliderArrowsStatus(div, containerWidth, cardCount, cardWidth);
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