//updateScore on the go
updateScore = function (categoryIndex, gameIndex) {
    // debugger;
	var groupName = CardData[categoryIndex].Cards[0].GroupName;
	if(groupName)
	{
        $("input[name='"+groupName+"']:checked").each(function(index, elem){
            //pushing selected cards to the app data namely GameData
            // debugger;
            if($(elem).is(':checked')){
                if($.inArray($(elem).val(),GameData[gameIndex].SelectedCards) == -1)
                    GameData[gameIndex].SelectedCards.push($(elem).val());        
            }
            // else{
            //     GameData[gameIndex].SelectedCards = jQuery.grep(GameData[gameIndex].SelectedCards, function(value){
            //        return value != $(elem).val(); 
            //     });
            // }
        });
        return true;
	}
	return false;
}