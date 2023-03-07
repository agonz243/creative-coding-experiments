$(document).ready(function(){
	var words = 
		{

		story:{
			"origin": ["#introduction# #plot# #resolution# #moral#"],
			"introduction": ["Once upon a time, in a far-off land, there lived a #character#."],
			"plot": ["#character# went on a #journey# to find #goal#."],
			"resolution": ["#character.capitalize# finally found #goal# and returned home safe and sound."],
			"moral": ["The lesson of this story is #lesson#."],
			"character": ["princess", "wizard", "knight", "dragon", "fairy"],
			"journey": ["quest", "adventure", "voyage"],
			"goal": ["a treasure", "a magical amulet", "a lost friend"],
			"lesson": ["that it's important to be brave and persistent, even when things seem difficult", "that true friends are always there to help you", "that magic can be found in unexpected places"]
		  }
	};

	$('#buttonTrigger').click(function(){
		loadGrammar();
	});
	
	function loadGrammar(){
		var grammar = tracery.createGrammar(words["story"]);
		$('#output').html("<div>"+grammar.flatten('#origin#')+"</div>");
		console.log("finished loading!");
	}

	setTimeout(function() {
        loadGrammar();
    }, 10);

});