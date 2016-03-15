Template.dashboard.rendered =function(){
	// if(!Meteor.userId())
	// 	Router.go('/');
	var chartLabels = [];
	for(var k in CardData)
		chartLabels.push(CardData[k].CategoryName);

	var radarChartData = {
		labels: chartLabels,
		datasets: [
		{
			label: "My First dataset",
			fillColor: "rgba(220,220,220,0.2)",
			strokeColor: "rgba(220,220,220,1)",
			pointColor: "rgba(220,220,220,1)",
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(220,220,220,1)",
			data: [65,59,90,81,56,55]
		},
			// {
			// 	label: "My Second dataset",
			// 	fillColor: "rgba(151,187,205,0.2)",
			// 	strokeColor: "rgba(151,187,205,1)",
			// 	pointColor: "rgba(151,187,205,1)",
			// 	pointStrokeColor: "#fff",
			// 	pointHighlightFill: "#fff",
			// 	pointHighlightStroke: "rgba(151,187,205,1)",
			// 	data: [28,48,40,19,96,27]
			// }
			]
		};
		window.myRadar = new Chart(document.getElementById("canvas").getContext("2d")).Radar(radarChartData, {
			responsive: true
		});
	}	
// Template.dashboard.isActive = function () {
//     return Meteor.user() && Meteor.user().profile.isActive;
// }
Template.dashboard.events({
	'click span.skillMenuItem':function(event){
		event.preventDefault();
		$(".overviewTab").hide();
		$(".skillsTab").show();
		$(".ProgressTab").hide();
	},

	'click span.progessMenuIem':function(event){
		event.preventDefault();
		$(".overviewTab").hide();
		$(".skillsTab").hide();
		$(".ProgressTab").show();
	},

	'click span.overviewMenuItem':function(event){
		event.preventDefault();
		$(".overviewTab").show();
		$(".skillsTab").hide();
		$(".ProgressTab").hide();
	},

	'click #captureBtn':function(event){
		Router.go('FriendGameList');
	}
});	