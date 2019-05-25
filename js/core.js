// On page load
$(function() {
	if (Cookies.get('gameData')) {
		var loadData = Cookies.getJSON('gameData');
		level = loadData.level;
		health = ((loadData.health)*level)+yourArmorStats;
		maxHealth = ((loadData.maxHealth)*level)+yourArmorStats;
		stamina = ((loadData.stamina)*level);
		maxStamina = ((loadData.maxStamina)*level);
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
	$($.parseHTML(curLoc)).appendTo("#placeName");
	$($.parseHTML(curDesc)).appendTo("#placeDesc");
	$($.parseHTML(curActions)).appendTo("#placeActions");
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

function initializeCombat() {
	document.getElementById('yourName').innerHTML = 'You';
	document.getElementById('playerCombatHP').innerHTML = 'Your Health: <div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" aria-valuenow="' + health + '" aria-valuemin="0" aria-valuemax="' + maxHealth + '" style="width: ' + (health/maxHealth)*100 + '%"></div></div><br />';
	document.getElementById('playerCombatSP').innerHTML = 'Your Stamina: <div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="' + stamina + '" aria-valuemin="0" aria-valuemax="' + maxStamina + '" style="width: ' + (stamina/maxStamina)*100 + '%"></div></div><br />';
	if (curLoc = locations[0]) {
		enemyHealth = 50;
		enemyMaxHealth = enemyHealth;
		enemyStamina = 100;
		enemyMaxStamina = enemyStamina;
		enemyDamage = 5;
		document.getElementById('enemyName').innerHTML = 'Rat';
		document.getElementById('enemyCombatHP').innerHTML = 'Enemy Health: <div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" aria-valuenow="' + enemyHealth + '" aria-valuemin="0" aria-valuemax="' + enemyMaxHealth + '" style="width: ' + (enemyHealth/enemyMaxHealth)*100 + '%"></div></div><br />';
		document.getElementById('enemyCombatSP').innerHTML = 'Enemy Stamina: <div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="' + enemyStamina + '" aria-valuemin="0" aria-valuemax="' + enemyMaxStamina + '" style="width: ' + (enemyStamina/enemyMaxStamina)*100 + '%"></div></div><br />';
		document.getElementById('combatButtons').innerHTML = '<button id="combatButton1" align="center">Normal Attack</button>';
	}
	doBattle= setInterval(function(){ 
		var newEnemyDamage = Math.floor(Math.random() * ((enemyDamage + Math.floor(enemyDamage/2)) - (enemyDamage - Math.floor(enemyDamage/2)))) + (enemyDamage - Math.floor(enemyDamage/2));
		health -= newEnemyDamage;
		document.getElementById('playerCombatHP').innerHTML = 'Your Health: <div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" aria-valuenow="' + health + '" aria-valuemin="0" aria-valuemax="' + maxHealth + '" style="width: ' + (health/maxHealth)*100 + '%"></div></div><br />';
		document.getElementById('playerCombatSP').innerHTML = 'Your Stamina: <div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="' + stamina + '" aria-valuemin="0" aria-valuemax="' + maxStamina + '" style="width: ' + (stamina/maxStamina)*100 + '%"></div></div><br />';
		document.getElementById('enemyCombatHP').innerHTML = 'Enemy Health: <div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" aria-valuenow="' + enemyHealth + '" aria-valuemin="0" aria-valuemax="' + enemyMaxHealth + '" style="width: ' + (enemyHealth/enemyMaxHealth)*100 + '%"></div></div><br />';
		document.getElementById('enemyCombatSP').innerHTML = 'Enemy Stamina: <div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="' + enemyStamina + '" aria-valuemin="0" aria-valuemax="' + enemyMaxStamina + '" style="width: ' + (enemyStamina/enemyMaxStamina)*100 + '%"></div></div><br />';
		$($.parseHTML('<li>- The ' + document.getElementById('enemyName').innerHTML + ' did ' + newEnemyDamage + ' damage to you -</li>')).hide().prependTo("#combatLog").fadeIn(1000);
		tCLogs++;
		if (tCLogs >= 5) {
    		$('#combatLog li:last').remove();
    		tCLogs--;
    	}
		if (health < 1) {
			clearInterval(doBattle);
			document.getElementById('yourName').innerHTML = '';
			document.getElementById('enemyName').innerHTML = '';
			document.getElementById('playerCombatHP').innerHTML = '';
			document.getElementById('playerCombatSP').innerHTML = '';
			document.getElementById('enemyCombatHP').innerHTML = '';
			document.getElementById('enemyCombatSP').innerHTML = '';
			document.getElementById('combatButtons').innerHTML = '';
			document.getElementById('combatResults').innerHTML = 'You died.';
		} else if (enemyHealth < 1) {
			clearInterval(doBattle);
			document.getElementById('yourName').innerHTML = '';
			document.getElementById('enemyName').innerHTML = '';
			document.getElementById('playerCombatHP').innerHTML = '';
			document.getElementById('playerCombatSP').innerHTML = '';
			document.getElementById('enemyCombatHP').innerHTML = '';
			document.getElementById('enemyCombatSP').innerHTML = '';
			document.getElementById('combatButtons').innerHTML = '';
			document.getElementById('combatResults').innerHTML = 'You have slain the enemy.';
		}
	}, 3000);
}