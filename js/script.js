var search = document.getElementById('search');
var matchList = document.getElementById('match-list');

// Search states.json and filter it
var searchStates = async function (searchText) {
	var res = await fetch('../data/states.json');
	var states = await res.json();

	//Get matches to current text input
	var matches = states.filter(function (state) {
		var regex = new RegExp('^' + searchText);
		return state.title.match(regex);
	});

	console.log(searchText.length);

	if (searchText.length === 0) {
		matches = [];
		matchList.innerHTML = '';
	}

	outputHtml(matches);
};

// Show results in HTML
var outputHtml = function (matches) {
	if (matches.length > 0) {
		var html = matches
			.map(function (match) {
				return '<div><p>' + match.title + '</p></div>';
			})
			.join('');

		console.log(html);
		matchList.innerHTML = html;
	}
};

search.addEventListener('input', function () {
	searchStates(search.value);
});
