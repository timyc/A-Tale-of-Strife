/* Save button */
function saveGame() {
	var toBeStringified = { level: level, experience: experience, health: health, maxHealth: maxHealth, stamina: stamina, maxStamina: maxStamina, damage: damage, yourWeapon: yourWeapon, yourWeaponStats: yourWeaponStats, yourArmor: yourArmor, yourArmorStats: yourArmorStats, b1Clicks: b1Clicks, b2Clicks: b2Clicks, grainR: grainR, ironR: ironR, canMine: canMine, curLoc: curLoc, curDesc: curDesc, curActions: curActions };
	Cookies.set('gameData', JSON.stringify(toBeStringified), { expires: 30 });
	$('<li class="list-group-item bg-success"><b>[' + formatAMPM(new Date) + ']</b> Game successfully saved.</li><br />').hide().prependTo("#story").fadeIn(1000);
	tStories++;
	if (tStories > 5) {
    	$('#story li:last').remove();
    	tStories--;
    }
}
/* Purge button */
function purgeGame() {
	Cookies.remove('gameData');
	$('<li class="list-group-item bg-danger"><b>[' + formatAMPM(new Date) + ']</b> Game data purged (cookie deleted). If this is mistake, please SAVE IMMEDIATELY!</li><br />').hide().prependTo("#story").fadeIn(1000);
	tStories++;
	if (tStories > 5) {
    	$('#story li:last').remove();
    	tStories--;
    }
}
/* Button Cooldown JS created by Paul Arce */
/* Button 1 */
$(document).on("click", "button.cooldown1", function() {
    b1Clicks++;
    grainR++;
    curLoc = locations[0];
	curDesc = locDesc[0];
	curActions = locActions[0];
    var btn = $(this);
    btn.prop('disabled', true);
    setTimeout(function() {
        btn.prop('disabled', false);
        if (!document.body.contains(document.getElementById('grainR'))) {
        	document.getElementById('resources').innerHTML += "<li id='grainR' class='list-group-item'>Grains: <span id='grainID'>" + grainR + "</span></li>";
    	} else {
        	document.getElementById('grainR').innerHTML = "Grains: <span id='grainID'>" + grainR + "</span>";
    	}
    	if (document.getElementById('placeName') != 'The Fields') {
    		document.getElementById('placeName').innerHTML = curLoc;
    		document.getElementById('placeDesc').innerHTML = curDesc;
    		document.getElementById('placeActions').innerHTML = curActions;
    	}
    	switch (true) {
        	case (b1Clicks <= 1):
        	    $('<li class="list-group-item"><b>[' + formatAMPM(new Date) + ']</b> Every day, you work in the fields. This is the meaning of life. At least that\'s what the Party tells you. How long has it been since the Liberation Party exiled the Old Ones? You cannot remember. You should not remember. Those who speak out against the Party vanish and are never seen again.</li><br />').hide().prependTo("#story").fadeIn(1000);
        	    tStories++;
        	    break;
        	case (b1Clicks == 3):
        	    $('<li class="list-group-item"><b>[' + formatAMPM(new Date) + ']</b> Your back aches, but you continue to harvest the grains. Anything for your comrades.</li><br />').hide().prependTo("#story").fadeIn(1000);
        	    tStories++;
       	 	    break;
        	case (b1Clicks == 5):
        	    $('<li class="list-group-item"><b>[' + formatAMPM(new Date) + ']</b> "Work is salvation" they keep telling you. You silently question the truth behind those words.</li><br />').hide().prependTo("#story").fadeIn(1000);
        	    tStories++;
        	    break;
        	case (b1Clicks == 10):
        	    $('<li class="list-group-item"><b>[' + formatAMPM(new Date) + ']</b> You can vaguely remember life before the Party. Thinking of it would be blasphemous. You quickly push the thoughts away.</li><br />').hide().prependTo("#story").fadeIn(1000);
       		    tStories++;
       		    break;
            /*case (b1Clicks == 15):
            	$('<li class="list-group-item">[' + formatAMPM(new Date) + '] Is there any more meaning to life? You are serving your comrades. You should be happy.</li><br />').hide().prependTo("#story").fadeIn(1000);
            	break;*/
        	case (b1Clicks == 15):
            	$('<li class="list-group-item"><b>[' + formatAMPM(new Date) + ']</b> A Guardian comes over. They are the people that protect the workers by exterminating heathens who threaten the Party. He hands you a pickaxe and tells you to go to the local iron mine and bring back a couple ingots.</li><br />').hide().prependTo("#story").fadeIn(1000);
            	canMine = 1;
            	tStories++;
            	$('<button class="cooldown2">Mine Iron</button>').hide().appendTo("#buttonsCol").fadeIn(1000);
            	break;
    	}
    	if (tStories > 5) {
    		$('#story li:last').remove();
    		tStories--;
    	}
    }, 3000);
});
/* Button 2*/
$(document).on("click", "button.cooldown2", function() {
    b2Clicks++;
    ironR++;
    curLoc = locations[1];
	curDesc = locDesc[1];
	curActions = locActions[1];
    var btn = $(this);
    btn.prop('disabled', true);
    setTimeout(function() {
        btn.prop('disabled', false);
        if (!document.body.contains(document.getElementById('ironR'))) {
        	document.getElementById('resources').innerHTML += "<li id='ironR' class='list-group-item'>Iron ingots: <span id='ironID'>" + ironR + "</span></li>";
    	} else {
        	document.getElementById('ironR').innerHTML = "Iron ingots: <span id='ironID'>" + ironR + "</span>";
    	}
    	if (document.getElementById('placeName') != 'Iron Mines') {
    		document.getElementById('placeName').innerHTML = curLoc;
    		document.getElementById('placeDesc').innerHTML = curDesc;
    		document.getElementById('placeActions').innerHTML = curActions;
    	}
    	switch (true) {
        	case (b2Clicks <= 1):
        	    $('<li class="list-group-item"><b>[' + formatAMPM(new Date) + ']</b> Mining iron is much harder than harvesting grains. You sweat profusely but will do anything for your comrades.</li><br />').hide().prependTo("#story").fadeIn(1000);
        	    tStories++;
        	    break;
        	case (b2Clicks == 3):
        	    $('<li class="list-group-item"><b>[' + formatAMPM(new Date) + ']</b> Your back aches, but you continue to harvest the grains. Anything for your comrades.</li><br />').hide().prependTo("#story").fadeIn(1000);
        	    tStories++;
        	    break;
        	case (b2Clicks == 5):
        	    $('<li class="list-group-item"><b>[' + formatAMPM(new Date) + ']</b> "Work is salvation" they keep telling you. You silently question the truth behind those words.</li><br />').hide().prependTo("#story").fadeIn(1000);
        	    tStories++;
        	    break;
    	}
    	if (tStories > 5) {
    		$('#story li:last').remove();
    		tStories--;
    	}
    }, 6000);
});
$(document).on("click", "#battleB", function() {
	$('#battle').modal({backdrop: 'static', keyboard: false});
	$('#battle').modal('toggle');
	if (curLoc = locations[0]) {
		console.log('Begin fields combat');
		initializeCombat();
	}
});

$(document).on("click", "#combatButton1", function() {
	if (health > 1) {
		var newDamage = Math.floor(Math.random() * ((damage + Math.floor(damage/2)) - (damage - Math.floor(damage/2)))) + (damage - Math.floor(damage/2));
		enemyHealth -= newDamage;
		document.getElementById('enemyCombatHP').innerHTML = 'Enemy Health: <div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" aria-valuenow="' + enemyHealth + '" aria-valuemin="0" aria-valuemax="' + enemyMaxHealth + '" style="width: ' + (enemyHealth/enemyMaxHealth)*100 + '%"></div></div><br />';
		document.getElementById('enemyCombatSP').innerHTML = 'Enemy Stamina: <div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="' + enemyStamina + '" aria-valuemin="0" aria-valuemax="' + enemyMaxStamina + '" style="width: ' + (enemyStamina/enemyMaxStamina)*100 + '%"></div></div><br />';
		$('#enemyIContainer').effect('shake');
		$($.parseHTML('<li>- You did ' + newDamage + ' damage to the ' + document.getElementById('enemyName').innerHTML + ' -</li>')).hide().prependTo("#combatLog").fadeIn(1000);
		tCLogs++;
		if (tCLogs >= 5) {
    		$('#combatLog li:last').remove();
    		tCLogs--;
    	}
		if (enemyHealth < 1) {
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
		var btn = $(this);
    	btn.prop('disabled', true);
    	setTimeout(function() {
        	btn.prop('disabled', false);
    	}, 3000);
	} else {
		alert('it appears that you have already died.');
	}
});
$(document).on("click", "#combatButton2", function() {
	if (health > 1 && stamina >= 25) {
		var newDamage = Math.floor(Math.random() * ((damage + Math.floor(damage/2)) - (damage - Math.floor(damage/2)))) + (damage - Math.floor(damage/2));
		enemyHealth -= Math.floor(newDamage*2);
		stamina -= 25;
		document.getElementById('enemyCombatHP').innerHTML = 'Enemy Health: <div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" aria-valuenow="' + enemyHealth + '" aria-valuemin="0" aria-valuemax="' + enemyMaxHealth + '" style="width: ' + (enemyHealth/enemyMaxHealth)*100 + '%"></div></div><br />';
		document.getElementById('playerCombatSP').innerHTML = 'Your Stamina: <div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="' + stamina + '" aria-valuemin="0" aria-valuemax="' + maxStamina + '" style="width: ' + (stamina/maxStamina)*100 + '%"></div></div><br />';
		$('#enemyIContainer').effect('shake');
		$($.parseHTML('<li>- You did ' + Math.floor(newDamage*2) + ' damage to the ' + document.getElementById('enemyName').innerHTML + ' with a power attack -</li>')).hide().prependTo("#combatLog").fadeIn(1000);
		tCLogs++;
		if (tCLogs > 5) {
    		$('#combatLog li:last').remove();
    		tCLogs--;
    	}
		if (enemyHealth < 1) {
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
		var btn = $(this);
    	btn.prop('disabled', true);
    	setTimeout(function() {
        	btn.prop('disabled', false);
    	}, 8000);
	} else {
		alert('Not enough stamina.');
	}
});
$(document).on("click", "#exitCombat", function() {
	$('#battle').modal('hide');
	tCLogs = 0;
	document.getElementById('combatResults').innerHTML = '';
	document.getElementById('combatLog').innerHTML = '';
	document.getElementById('stats').innerHTML = '<li class="list-group-item">Level: ' + level + ' (' + experience + '/' + reqExp[level] + ')</li><li class="list-group-item">Health: ' + health + '/' + maxHealth + '</li><li class="list-group-item">Stamina: ' + stamina + '/' + maxStamina + '</li><li class="list-group-item">Damage: ' + damage + '</li>';
    document.getElementById('equipments').innerHTML = '<li class="list-group-item">Weapon: ' + yourWeapon + '</li><li class="list-group-item">Armor: ' + yourArmor + '</li>';
});

$(document).on("click", "#restB", function() {
    $('#restPage').modal({backdrop: 'static', keyboard: false});
    $('#restPage').modal('toggle');
    document.getElementById('restResults').innerHTML = 'Resting...<br /> <div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="30" id="restBar"></div></div>';
    var percent = 1;
    var incPercent = setInterval(function(){
        document.getElementById("restBar").style.width = (percent*4) + '%';
        percent++;
        if(percent > 25) {
            health = maxHealth;
            stamina = maxStamina;
            document.getElementById('stats').innerHTML = '<li class="list-group-item">Level: ' + level + ' (' + experience + '/' + reqExp[level] + ')</li><li class="list-group-item">Health: ' + health + '/' + maxHealth + '</li><li class="list-group-item">Stamina: ' + stamina + '/' + maxStamina + '</li><li class="list-group-item">Damage: ' + damage + '</li>';
            document.getElementById('restResults').innerHTML = 'Rested! <button class="blankButton" id="exitRest">[exit]</button>';
            $('<li class="list-group-item"><b>[' + formatAMPM(new Date) + ']</b> You feel rested. You quickly get up. The Party does not take laziness lightly.</li><br />').hide().prependTo("#story").fadeIn(1000);
            tStories++;
            if (tStories > 5) {
                $('#story li:last').remove();
                tStories--;
            }
            clearInterval(incPercent);
        }
    }, 1000);
}); 

$(document).on("click", "#exitRest", function() {
    $('#restPage').modal('hide');
});