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
		yourArmor = loadData.yourArmor;
		b1Clicks = loadData.b1Clicks;
		b2Clicks = loadData.b2Clicks;
		grainR = loadData.grainR;
		ironR = loadData.ironR;
		canMine = loadData.canMine;
		curLoc = loadData.curLoc;
		curDesc = loadData.curDesc;
		curActions = loadData.curActions;
		check1 = loadData.check1;
		check2 = loadData.check2;
		check3 = loadData.check3;
		check4 = loadData.check4;
		check5 = loadData.check5;
	}
	$($.parseHTML(curLoc)).appendTo("#placeName");
	$($.parseHTML(curDesc)).appendTo("#placeDesc");
	$($.parseHTML(curActions)).appendTo("#placeActions");
    document.getElementById('stats').innerHTML = '<li class="list-group-item">Level: ' + level + ' (' + experience + '/' + reqExp[level] + ')</li><li class="list-group-item">Health: ' + health + '/' + maxHealth + '</li><li class="list-group-item">Stamina: ' + stamina + '/' + maxStamina + '</li><li class="list-group-item">Damage: ' + damage + '</li>';
    document.getElementById('equipments').innerHTML = '<li class="list-group-item">Weapon: ' + yourWeapon + '</li><li class="list-group-item">Armor: ' + yourArmor + '</li>';
    if (curLoc == locations[0]) {
    	chatMessage('Everywhere you look, farmland dominates your view.');
    	tStories++;
		if (tStories > 5) {
    		$('#story li:last').remove();
    		tStories--;
    	}
    } else if (curLoc == locations[1]) {
    	chatMessage('The air here is musty.');
    }
    if (grainR > 0) {
    	document.getElementById('resources').innerHTML += "<li id='grainR' class='list-group-item'>Grains: <span id='grainID'>" + grainR + "</span></li>";
    }
    if (ironR > 0) {
    	document.getElementById('resources').innerHTML += "<li id='ironR' class='list-group-item'>Iron ingots: <span id='ironID'>" + ironR + "</span></li>";
    }
    if (canMine == 1) {
    	$('<button class="cooldown2">Mine Iron</button>').hide().appendTo("#buttonsCol").fadeIn(1000);
    }
});

function initializeCombat() {
	$("#playerImageContainer").show();
	document.getElementById('yourName').innerHTML = 'You';
	document.getElementById('playerImage').innerHTML = '<img src="img/player.png" class="img-fluid rounded mx-auto d-block" style="max-height:300px !important;" />';
	selfStatsUpdate();
	if (curLoc = locations[0]) {
		enemyName = "Rat";
		enemyHealth = 50;
		enemyMaxHealth = enemyHealth;
		enemyStamina = 100;
		enemyMaxStamina = enemyStamina;
		enemyDamage = 5;
		getEnemyInfo();
	} else if (ironR == 5 && check2 == 0) {
		enemyName = "Radioactive Wanderer";
		enemyHealth = 50;
		enemyMaxHealth = enemyHealth;
		enemyStamina = 100;
		enemyMaxStamina = enemyStamina;
		enemyDamage = 5;
		getEnemyInfo();
	}
	doBattle = setInterval(function(){ 
		var newEnemyDamage = Math.floor(Math.random() * ((enemyDamage + Math.floor(enemyDamage/2)) - (enemyDamage - Math.floor(enemyDamage/2)))) + (enemyDamage - Math.floor(enemyDamage/2));
		health -= newEnemyDamage;
		selfStatsUpdate();
		enemyStatsUpdate();
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
			curLoc = locations[0];
        	curDesc = locDesc[0];
        	curActions = locActions[0];
        	health = 50;
        	stamina = 0;
        	experience = Math.floor(experience/2);
        	saveGame();
        	chatMessage('You gasp for air as you are pulled away from death\'s embrace. You suddenly remember the serum that the Party injected into every worker. Looking down, you see that your wounds are already fading. Time to work again.');
		} else if (enemyHealth < 1) {
			clearInterval(doBattle);
			clearBattle();
			saveGame();
			if (curLoc = locations[0]) {
				experience += 25;
				if (experience >= reqExp[level]) {
                    levelUp();
                }
			}
			document.getElementById('combatResults').innerHTML = 'You have slain the enemy. <button class="blankButton" id="exitCombat">[exit]</button>';
		}
	}, 3000);
}

function getEnemyInfo() {
	$("#enemyImageContainer").show();
	document.getElementById('enemyName').innerHTML = enemyName;
	document.getElementById('enemyImage').innerHTML = '<img src="img/rat.png" class="img-fluid rounded mx-auto d-block" style="max-height:300px !important;" />';
	document.getElementById('enemyCombatHP').innerHTML = 'Enemy Health: <div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" aria-valuenow="' + enemyHealth + '" aria-valuemin="0" aria-valuemax="' + enemyMaxHealth + '" style="width: ' + (enemyHealth/enemyMaxHealth)*100 + '%"></div></div><br />';
	document.getElementById('enemyCombatSP').innerHTML = 'Enemy Stamina: <div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="' + enemyStamina + '" aria-valuemin="0" aria-valuemax="' + enemyMaxStamina + '" style="width: ' + (enemyStamina/enemyMaxStamina)*100 + '%"></div></div><br />';
	document.getElementById('combatButtons').innerHTML = '<button id="combatButton1" align="center">Normal Attack</button>&nbsp; <button id="combatButton2" align="center">Power Attack</button>';
}

function enemyStatsUpdate() {
	document.getElementById('enemyCombatHP').innerHTML = 'Enemy Health: <div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" aria-valuenow="' + enemyHealth + '" aria-valuemin="0" aria-valuemax="' + enemyMaxHealth + '" style="width: ' + (enemyHealth/enemyMaxHealth)*100 + '%"></div></div><br />';
	document.getElementById('enemyCombatSP').innerHTML = 'Enemy Stamina: <div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="' + enemyStamina + '" aria-valuemin="0" aria-valuemax="' + enemyMaxStamina + '" style="width: ' + (enemyStamina/enemyMaxStamina)*100 + '%"></div></div><br />';
}

function selfStatsUpdate() {
	document.getElementById('playerCombatHP').innerHTML = 'Your Health: <div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" aria-valuenow="' + health + '" aria-valuemin="0" aria-valuemax="' + maxHealth + '" style="width: ' + (health/maxHealth)*100 + '%"></div></div><br />';
	document.getElementById('playerCombatSP').innerHTML = 'Your Stamina: <div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="' + stamina + '" aria-valuemin="0" aria-valuemax="' + maxStamina + '" style="width: ' + (stamina/maxStamina)*100 + '%"></div></div><br />';
}

function charPageUpdate() {
	document.getElementById('stats').innerHTML = '<li class="list-group-item">Level: ' + level + ' (' + experience + '/' + reqExp[level] + ')</li><li class="list-group-item">Health: ' + health + '/' + maxHealth + '</li><li class="list-group-item">Stamina: ' + stamina + '/' + maxStamina + '</li><li class="list-group-item">Damage: ' + damage + '</li>';
    document.getElementById('equipments').innerHTML = '<li class="list-group-item">Weapon: ' + yourWeapon + '</li><li class="list-group-item">Armor: ' + yourArmor + '</li>';
}

function doChat() {
	var chatContent = document.getElementById('chatSequence').innerHTML;
	if (check1 == 1) {
		chatMessage('placeHolder');
	} else {
		chatMessage('Logical error.');
	}
	document.getElementById('chatSequence').value = "";
}

function levelUp() {
	level++;
	experience = 0;
	maxHealth += 100;
	health = maxHealth;
	stamina = maxStamina;
	damage += 5;
	silentSaveGame();
	charPageUpdate();
	chatMessage('You feel refreshed and more powerful.');
}
/* https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format */
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function clearBattle() {
	document.getElementById('yourName').innerHTML = '';
	document.getElementById('enemyName').innerHTML = '';
	document.getElementById('playerImage').innerHTML = '';
	$("#playerImageContainer").hide();
	document.getElementById('enemyImage').innerHTML = '';
	$("#enemyImageContainer").hide();
	document.getElementById('playerCombatHP').innerHTML = '';
	document.getElementById('playerCombatSP').innerHTML = '';
	document.getElementById('enemyCombatHP').innerHTML = '';
	document.getElementById('enemyCombatSP').innerHTML = '';
	document.getElementById('combatButtons').innerHTML = '';
}

function chatMessage(arg) {
	$($.parseHTML('<li class="list-group-item"><b>[' + formatAMPM(new Date) + ']</b> ' + arg + '</li><br />')).hide().prependTo("#story").fadeIn(1000);
	tStories++;
	if (tStories > 5) {
    	$('#story li:last').remove();
    	tStories--;
    }
}

function successChatMessage(arg) {
	$('<li class="list-group-item bg-success"><b>[' + formatAMPM(new Date) + ']</b> ' + arg + '</li><br />').hide().prependTo("#story").fadeIn(1000);
	tStories++;
	if (tStories > 5) {
    	$('#story li:last').remove();
    	tStories--;
    }
}

function dangerChatMessage(arg) {
	$('<li class="list-group-item bg-danger"><b>[' + formatAMPM(new Date) + ']</b> ' + arg + '</li><br />').hide().prependTo("#story").fadeIn(1000);
	tStories++;
	if (tStories > 5) {
    	$('#story li:last').remove();
    	tStories--;
    }
}