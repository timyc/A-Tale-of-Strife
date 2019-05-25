// On page load
$(function() {
	if (Cookies.get('gameData')) {
		var loadData = Cookies.getJSON('gameData');
		level = loadData.level;
		health = ((loadData.health)*level)+yourArmorStats;
		stamina = ((loadData.stamina)*level);
		damage = (loadData.damage)+yourWeaponStats;
		yourWeapon = loadData.yourWeapon;
		yourWeaponStats = loadData.yourWeaponStats;
		yourArmor = loadData.yourArmor;
		yourArmorStats = loadData.yourArmorStats;
		b1Clicks = loadData.b1Clicks;
		b2Clicks = loadData.b2Clicks;
		grainR = loadData.grainR;
		ironR = loadData.ironR;
		curLoc = loadData.curLoc;
		curDesc = loadData.curDesc;
		curActions = loadData.curActions;
	}
    document.getElementById('placeName').innerHTML = curLoc;
    document.getElementById('placeDesc').innerHTML = curDesc;
    document.getElementById('placeActions').innerHTML = curActions;
    document.getElementById('stats').innerHTML = '<li class="list-group-item">Level: ' + level + '</li><li class="list-group-item">Health: ' + health + '</li><li class="list-group-item">Stamina: ' + stamina + '</li><li class="list-group-item">Damage: ' + damage + '</li>';
    document.getElementById('equipments').innerHTML = '<li class="list-group-item">Weapon: ' + yourWeapon + '</li><li class="list-group-item">Armor: ' + yourArmor + '</li>';
    if (curLoc == locations[0]) {
    	$('<li class="list-group-item"><b>[' + formatAMPM(new Date) + ']</b> Wherever you look, farmland dominates your view.</li><br />').hide().prependTo("#story").fadeIn(1000);
    	tStories++;
		if (tStories >= 5) {
    		$('#story li:last').remove();
    		tStories--;
    	}
    } else if (curLoc == locations[1]) {
    	$('<li class="list-group-item"><b>[' + formatAMPM(new Date) + ']</b> The air here is musty.</li><br />').hide().prependTo("#story").fadeIn(1000);
    	tStories++;
		if (tStories >= 5) {
    		$('#story li:last').remove();
    		tStories--;
    	}
    }
});