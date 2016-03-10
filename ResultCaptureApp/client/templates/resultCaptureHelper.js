//updateScore on the go
updateScore = function (categoryIndex, gameIndex) {
	var groupName = CardData[categoryIndex].Cards[0].GroupName;
	if(groupName)
	{
		var selectedCard = $("input[name='"+groupName+"']:checked").val();
		if(selectedCard){
			GameData[gameIndex].SelectedCards.push(selectedCard);
			console.log('Score Updated');
			console.log(GameData);
			return true;
		}
	}
	return false;
}