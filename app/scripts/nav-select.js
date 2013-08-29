(function ($) {
	'use strict';

	var $siteNav = $('#site-nav'),
		$select = $('<select />').appendTo($siteNav);

	// Create default option 'Go to...'
	$('<option />', {
		'selected': 'selected',
		'value'   : '',
		'text'    : 'Ga naar &hellip;'
	}).appendTo($select);

	// Populate dropdown with menu items
	$siteNav.find('a').each(function() {
		var $a = $(this);
		$('<option />', {
			'value'   : $a.attr('href'),
			'text'    : $a.text()
		}).appendTo($select);
	});

	$select.on('change', function() {
		window.location = $select.find('option:selected').val();
	});

})(jQuery);