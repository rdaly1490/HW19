$(document).ready(function() {
	var rowString = $("#movie-row").html();
	var buildResultRow = _.template(rowString);

    var App = Backbone.Router.extend ({
        
        routes: {
        	"": "home",
            'home': 'home',
            'search/:query': 'search',
            "watching": "watching"
        },

        home: function() {
            $(".page").hide();
            $("#home").show();
        },

        search: function(query) {
            $(".page").hide();
            $("#search").show();
        	$.get (
        		"http://www.omdbapi.com/?",
        		{
        			s: query
        		},
        		getMovies,
        		"json"
        	);
        	function getMovies(movies) {
                var watchArray = [];
        		console.log(movies);
        		for (var i = 0; i < movies.Search.length; i++) {
        			$("#results").append(buildResultRow(movies.Search[i]));
        		}
                $(".movie-row").on("click", function(e) {
                    var $clicked = ($(e.target)).clone();
                    watchArray.push($clicked);  
                    console.log(watchArray);
                    $("#watch").append($clicked);
                 });
            }
        },

        watching: function() {
            $(".page").hide();
            $("#watching").show();
            $("#my-watch-list").html($("#watch").html());
        }

    });


    var myRouter = new App();
    Backbone.history.start();

    $("#search-form").on("submit", function(e) {
        e.preventDefault();
        $("#results").html("");
        var query = $("#query").val()
        myRouter.navigate("search/"+query, {trigger: true});
        $("#query").val("")
    });

    $("#search-btn").on("click", function(e) {
        e.preventDefault();
        $("#results").html("");
        var query = $("#query").val()
        myRouter.navigate("search/"+query, {trigger: true});
        $("#query").val("")
    })




});