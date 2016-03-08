predicateBy = function (prop){
	return function(a,b){
		if( a[prop] > b[prop]){
			return 1;
		}else if( a[prop] < b[prop] ){
			return -1;
		}
		return 0;
	}
}

//used to calculate the progress of the capture
getProgress=function (index) {
	var totalCards = 0;
	debugger;
	for(var key in CardData)
	{
		totalCards+=CardData[key].Cards.length;
	}
	return (index/totalCards)*100;
}