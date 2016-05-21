var hack = {
	init: function() {
		console.log('Lets get hacking!');
		hack.flipBoard();
		$('.ctrl-btn').click(function(){
			if ($(this).is('.ctrl-next')) {
				hack.moveToPanel(1);
			}
			else {
				hack.moveToPanel(-1);
			}
		});
	},

	// **** Deal with view states
	moveToPanel: function(step,val) {
		var currentPanel = $('.active-panel');
		var next = val === undefined ? parseInt(currentPanel.attr('data-order'), 10) + step : val;
		console.log(next);
		var nextPanel = $('.panel[data-order=' + next + ']');

		if (nextPanel.length) {
			currentPanel.fadeOut('slow', function() {
				nextPanel.fadeIn('slow', function() {
					currentPanel.removeClass('active-panel');
					nextPanel.addClass('active-panel');
					// Fire a custom event
					if(nextPanel.attr('data-event')) {
						jinglr.triggerEvent(nextPanel.attr('data-event'));
					}
				});
			});
		}
	},
	flipBoard: function() {
		var counter = 0,
			counterMax = 5;
	    $(".buddy").on("swiperight",function(){
	    	counter++;
	    	if (counter === counterMax) {
				hack.moveToPanel(1);
	    	}
	      $(this).addClass('rotate-left').delay(700).fadeOut(1);
	      $('.buddy').find('.status').remove();

	      $(this).append('<div class="stat us like">YES!</div>');      
	      if ( $(this).is(':last-child') ) {
	        $('.buddy:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
	       } else {
	          $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
	       }
	    });  

	   $(".buddy").on("swipeleft",function(){
    	counter++;
    	if (counter === counterMax) {
			hack.moveToPanel(1);
    	}
	    $(this).addClass('rotate-right').delay(700).fadeOut(1);
	    $('.buddy').find('.status').remove();
	    $(this).append('<div class="status dislike">NO!</div>');

	    if ( $(this).is(':last-child') ) {
	     $('.buddy:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
	     } else {
	        $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
	    } 
	  });
	}
}

$(document).ready(function() {
	hack.init();
});