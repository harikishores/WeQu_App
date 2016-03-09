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
	for(var key in CardData)
	{
		totalCards+=CardData[key].Cards.length;
	}
	return (index/totalCards)*100;
}

findElement = function (arr, propName, propValue) {
	for (var i=0; i < arr.length; i++)
	{
		if (arr[i][propName] == propValue) 
			return arr[i];
	}
	return null;
}