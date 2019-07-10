/**
 * @description Change Home page slider's arrows active status
 */
function updateSliderArrowsStatus(
    cardsContainer,
    containerWidth,
    cardCount,
    cardWidth
) {
    if ($(cardsContainer).scrollLeft() + containerWidth < (cardCount * cardWidth) + 15) {
        $('#slide-right-container').addClass("active");
    } else {
        $('#slide-right-container').removeClass("active");
    }

    if ($(cardsContainer).scrollLeft() > 0) {
        $('#slide-left-container').addClass("active");
    } else {
        $('#slide-left-container').removeClass("active");
    }
}

/**
 * @description fill products' cards
 */
function loadCards(tabID, cards) {

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

    setTimeout(updateSliderArrowsStatus(div, containerWidth, cardCount, cardWidth), 1000);    

    //Remove scrollbars    
    //TODO theres still an issue in activating the arrows
    $('#slide-right-container').click(function (e) {
        if (($(div).scrollLeft() + containerWidth) < (cardCount * cardWidth) + 15) {
            $(div).animate({
                scrollLeft: $(div).scrollLeft() + cardWidth
            }, {
                    duration: speed,
                    complete: function () {
                        setTimeout(
                            updateSliderArrowsStatus(
                                div,
                                containerWidth,
                                cardCount,
                                cardWidth
                            ),
                            1005
                        );
                    }
                });
        }

    });
    $('#slide-left-container').click(function (e) {
        if (($(div).scrollLeft() + containerWidth) > containerWidth) {
            $(div).animate({
                scrollLeft: '-=' + cardWidth
            }, {
                    duration: speed,
                    complete: function () {
                        setTimeout(
                            updateSliderArrowsStatus(
                                div,
                                containerWidth,
                                cardCount,
                                cardWidth
                            ),
                            1005
                        );
                    }
                });
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
//======================================= end of old section
//======================================= New
let self = this;

$('#hot-tab > .products-list').slick({
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 4,
    arrows: true,
    // infinite: false, // TODO check why this is ruining slick
    // dots: true,
    prevArrow: '<button type="button" class="slick-prev"><i aria-label="Previous" class="left-arrow"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i aria-label="Next" class="right-arrow"></i></button>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });

  $('#hot-tab > .products-list').on('init', function(slick) {
    console.log(`Slick initialized: ${slick}`);
    self.moveDOMElement('#hot-tab button.slick-prev','.products-row #slides-nav');
    self.moveDOMElement('#hot-tab button.slick-next','.products-row #slides-nav');
  });
  self.moveDOMElement('#hot-tab button.slick-prev','.products-row #slides-nav');
  self.moveDOMElement('#hot-tab button.slick-next','.products-row #slides-nav');
  

  /**
   * @description Move DOM element from one section to the other
   */
  function moveDOMElement(fromLocation, toLocation) {
      let fragment = document.createDocumentFragment();
      let fromDOMElement = document.querySelector(fromLocation);
      let toDOMElement = document.querySelector(toLocation);
      if(fromDOMElement && toDOMElement) {
          fragment.append(fromDOMElement);
          toDOMElement.appendChild(fragment);
      }
  }