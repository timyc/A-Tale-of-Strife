// On page load
$(function() {
	if (Cookies.get('gameData')) {
		var loadData = Cookies.getJSON('gameData');
		level = loadData.level;
		experience = loadData.experience;
		health = loadData.health;
		maxHealth = loadData.maxHealth;
		stamina = loadData.stamina;
		maxStamina = loadData.maxStamina;
		damage = loadData.damage;
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
    document.getElementById('stats').innerHTML = '<li class="list-group-item">Level: ' + level + ' (' + experience + '/' + reqExp[level] + ')</li><li class="list-group-item">Health: ' + health + '/' + maxHealth + '</li><li class="list-group-item">Stamina: ' + stamina + '/' + maxStamina + '</li><li class="list-group-item">Damage: ' + damage + '</li>';
    document.getElementById('equipments').innerHTML = '<li class="list-group-item">Weapon: ' + yourWeapon + '</li><li class="list-group-item">Armor: ' + yourArmor + '</li>';
    if (curLoc == locations[0]) {
    	$('<li class="list-group-item"><b>[' + formatAMPM(new Date) + ']</b> Wherever you look, farmland dominates your view.</li><br />').hide().prependTo("#story").fadeIn(1000);
    	tStories++;
		if (tStories > 5) {
    		$('#story li:last').remove();
    		tStories--;
    	}
    } else if (curLoc == locations[1]) {
    	$('<li class="list-group-item"><b>[' + formatAMPM(new Date) + ']</b> The air here is musty.</li><br />').hide().prependTo("#story").fadeIn(1000);
    	tStories++;
		if (tStories > 5) {
    		$('#story li:last').remove();
    		tStories--;
    	}
    }
    if (grainR > 0) {
    	document.getElementById('resources').innerHTML += "<li id='grainR' class='list-group-item'>Grains: <span id='grainID'>" + grainR + "</span></li>";
    }
    if (ironR > 0) {
    	document.getElementById('resources').innerHTML += "<li id='ironR' class='list-group-item'>Iron ingots: <span id='ironID'>" + ironR + "</span></li>";
    }
});

function initializeCombat() {
	$("#playerImageContainer").show();
	document.getElementById('yourName').innerHTML = 'You';
	document.getElementById('playerImage').innerHTML = '<img src="img/player.png" class="img-fluid rounded mx-auto d-block" style="max-height:300px !important;" />';
	document.getElementById('playerCombatHP').innerHTML = 'Your Health: <div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" aria-valuenow="' + health + '" aria-valuemin="0" aria-valuemax="' + maxHealth + '" style="width: ' + (health/maxHealth)*100 + '%"></div></div><br />';
	document.getElementById('playerCombatSP').innerHTML = 'Your Stamina: <div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="' + stamina + '" aria-valuemin="0" aria-valuemax="' + maxStamina + '" style="width: ' + (stamina/maxStamina)*100 + '%"></div></div><br />';
	if (curLoc = locations[0]) {
		enemyHealth = 50;
		enemyMaxHealth = enemyHealth;
		enemyStamina = 100;
		enemyMaxStamina = enemyStamina;
		enemyDamage = 5;
		$("#enemyImageContainer").show();
		document.getElementById('enemyName').innerHTML = 'Rat';
		document.getElementById('enemyImage').innerHTML = '<img src="img/rat.png" class="img-fluid rounded mx-auto d-block" style="max-height:300px !important;" />';
		document.getElementById('enemyCombatHP').innerHTML = 'Enemy Health: <div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" aria-valuenow="' + enemyHealth + '" aria-valuemin="0" aria-valuemax="' + enemyMaxHealth + '" style="width: ' + (enemyHealth/enemyMaxHealth)*100 + '%"></div></div><br />';
		document.getElementById('enemyCombatSP').innerHTML = 'Enemy Stamina: <div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="' + enemyStamina + '" aria-valuemin="0" aria-valuemax="' + enemyMaxStamina + '" style="width: ' + (enemyStamina/enemyMaxStamina)*100 + '%"></div></div><br />';
		document.getElementById('combatButtons').innerHTML = '<button id="combatButton1" align="center">Normal Attack</button>&nbsp; <button id="combatButton2" align="center">Power Attack</button>';
	}
	doBattle= setInterval(function(){ 
		var newEnemyDamage = Math.floor(Math.random() * ((enemyDamage + Math.floor(enemyDamage/2)) - (enemyDamage - Math.floor(enemyDamage/2)))) + (enemyDamage - Math.floor(enemyDamage/2));
		health -= newEnemyDamage;
		document.getElementById('playerCombatHP').innerHTML = 'Your Health: <div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" aria-valuenow="' + health + '" aria-valuemin="0" aria-valuemax="' + maxHealth + '" style="width: ' + (health/maxHealth)*100 + '%"></div></div><br />';
		document.getElementById('playerCombatSP').innerHTML = 'Your Stamina: <div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="' + stamina + '" aria-valuemin="0" aria-valuemax="' + maxStamina + '" style="width: ' + (stamina/maxStamina)*100 + '%"></div></div><br />';
		document.getElementById('enemyCombatHP').innerHTML = 'Enemy Health: <div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" aria-valuenow="' + enemyHealth + '" aria-valuemin="0" aria-valuemax="' + enemyMaxHealth + '" style="width: ' + (enemyHealth/enemyMaxHealth)*100 + '%"></div></div><br />';
		document.getElementById('enemyCombatSP').innerHTML = 'Enemy Stamina: <div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="' + enemyStamina + '" aria-valuemin="0" aria-valuemax="' + enemyMaxStamina + '" style="width: ' + (enemyStamina/enemyMaxStamina)*100 + '%"></div></div><br />';
		$('#playerIContainer').effect('shake');
		$($.parseHTML('<li>- The ' + document.getElementById('enemyName').innerHTML + ' did ' + newEnemyDamage + ' damage to you -</li>')).hide().prependTo("#combatLog").fadeIn(1000);
		tCLogs++;
		if (tCLogs > 5) {
    		$('#combatLog li:last').remove();
    		tCLogs--;
    	}
		if (health < 1) {
			clearInterval(doBattle);
			clearBattle();
			document.getElementById('combatResults').innerHTML = 'You died. <button class="blankButton" id="exitCombat">[exit]</button>';
			saveGame();
		} else if (enemyHealth < 1) {
			clearInterval(doBattle);
			clearBattle();
			if (curLoc = locations[0]) {
				experience += 25;
				if (experience >= reqExp[level]) {
                    levelUp();
                }
			}
			document.getElementById('combatResults').innerHTML = 'You have slain the enemy. <button class="blankButton" id="exitCombat">[exit]</button>';
			saveGame();
		}
	}, 3000);
}

function doChat() {
	var chatContent = document.getElementById('chatSequence').innerHTML;
	document.getElementById('chatSequence').value = "";
}

function levelUp() {
	level++;
	experience = 0;
	maxHealth += 100;
	health = maxHealth;
	stamina = maxStamina;
	damage += 5;
	document.getElementById('stats').innerHTML = '<li class="list-group-item">Level: ' + level + ' (' + experience + '/' + reqExp[level] + ')</li><li class="list-group-item">Health: ' + health + '/' + maxHealth + '</li><li class="list-group-item">Stamina: ' + stamina + '/' + maxStamina + '</li><li class="list-group-item">Damage: ' + damage + '</li>';
	$($.parseHTML('<li class="list-group-item"><b>[' + formatAMPM(new Date) + ']</b> You feel refreshed and more powerful.</li><br />')).hide().prependTo("#story").fadeIn(1000);
	tStories++;
	if (tStories > 5) {
    	$('#story li:last').remove();
    	tStories--;
    }
	saveGame();
}