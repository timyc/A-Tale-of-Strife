/* Save button */
function silentSave() {
    var allCMessages = document.getElementById('story').innerHTML;
    var toBeStringified = { level: level, experience: experience, health: health, maxHealth: maxHealth, stamina: stamina, maxStamina: maxStamina, damage: damage, yourWeapon: yourWeapon, yourArmor: yourArmor, b1Clicks: b1Clicks, b2Clicks: b2Clicks, b3Clicks: b3Clicks, grainR: grainR, ironR: ironR, fishR: fishR, canMine: canMine, canFish: canFish, curLoc: curLoc, curDesc: curDesc, curActions: curActions, check1: check1, check2: check2, check3: check3, check4: check4, check5: check5, allCMessages: allCMessages, tStories: tStories };
    Cookies.set('gameData', JSON.stringify(toBeStringified), { expires: 30, path: '' });
}

$(document).on("click", "#saveGameButton", function() {
    silentSave();
    successChatMessage('Game successfully saved.');
});
/* Purge button */
function purgeGame() {
	Cookies.remove('gameData');
	dangerChatMessage('Game data purged (cookie deleted). If this is mistake, please SAVE IMMEDIATELY!');
}
/* Button 1 */
$(document).on("click", "button.cooldown1", function() {
    if (curLoc == locations[0]) {
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
            switch (true) {
                case (b1Clicks <= 1):
                    chatMessage('Every day, you work in the fields. This is the meaning of life. At least that\'s what the Party tells you. How long has it been since the Liberation Party exiled the Old Ones? You cannot remember. You should not remember. Those who speak out against the Party vanish and are never seen again.');
                    break;
                case (b1Clicks == 3):
                    chatMessage('Your back aches, but you continue to harvest the grains. Anything for your comrades.');
                    break;
                case (b1Clicks == 5):
                    chatMessage('"Work is salvation" they keep telling you. You silently question the truth behind those words.');
                    break;
                case (b1Clicks == 10):
                    chatMessage('You can vaguely remember life before the Party. Thinking of it would be blasphemous. You quickly push the thoughts away.');
                    break;
                case (b1Clicks == 15):
                    chatMessage('A Guardian comes over. These are the people that protect the workers by exterminating heathens who disrupt the Balance. He hands you a small dull pickaxe and tells you to go to the local iron mine and bring back a couple ingots. ([map] -> Iron Mines -> [go there])');
                    canMine = 1;
                    $('<button class="cooldown2">Mine Iron</button>').hide().appendTo("#buttonsCol").fadeIn(1000);
                    break;
                case (b1Clicks == 18 && check3 == 1):
                    chatMessage('You can\'t stop thinking about what you saw in the mines. What other kinds of abominable creatures are there?');
                    break;
                case (b1Clicks == 23 && check3 == 1):
                    chatMessage('"Do not let your mind wander off to where it doesn\'t belong," the Party officials would tell the workers. You should obey the Party, right?');
                    break;
                case (b1Clicks == 30 && check3 == 1):
                    chatMessage('Unable to suppress your blasphemous thoughts, you look over into the distance, where you can barely make out a forest. When was the last time you had a decent meal? You begin walking towards the lake.');
                    canFish = 1;
                    $('<button class="cooldown3">Fish</button>').hide().appendTo("#buttonsCol").fadeIn(1000);
                    break;
            }
        }, 3000);
    } else {
        chatMessage('You can\'t harvest grains without being in the fields first!');
    }
});
/* Button 2 */
$(document).on("click", "button.cooldown2", function() {
    if (curLoc == locations[1]) {
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
            switch (true) {
                case (b2Clicks <= 1):
                    chatMessage('Mining iron is much harder than harvesting grains. You sweat profusely but will do anything for your comrades. Gathering five should be enough for the Guardian.');
                    break;
                case (b2Clicks == 3):
                    chatMessage('You hear a shuffling noise further down the mines. It\'s probably nothing. Just a lost field rat. But somehow you feel uneasy.');
                    break;
            }
            if (ironR == 5 && check2 == 0) {
                chatMessage('You hear a growl behind you. You look back and wish you hadn\'t. It\'s time to fight or die.');
                $(':button').prop('disabled', true);
                setTimeout(function() {
                    $(':button').prop('disabled', false);
                    $('#battle').modal({
                        backdrop: 'static',
                        keyboard: false
                    });
                    $('#battle').modal('toggle');
                    initializeCombat();
                }, 6000);
            }
        }, 6000);
    } else {
        chatMessage('You can\'t mine for iron without being in the mines first!');
    }
});
/* Button 3 */
$(document).on("click", "button.cooldown3", function() {
    if (curLoc == locations[2]) {
        b3Clicks++;
        fishR++;
        curLoc = locations[2];
        curDesc = locDesc[2];
        curActions = locActions[2];
        var btn = $(this);
        btn.prop('disabled', true);
        setTimeout(function() {
            btn.prop('disabled', false);
            if (!document.body.contains(document.getElementById('fishR'))) {
                document.getElementById('resources').innerHTML += "<li id='fishR' class='list-group-item'>Fish: <span id='fishID'>" + fishR + "</span></li>";
            } else {
                document.getElementById('fishR').innerHTML = "Fish: <span id='ironID'>" + fishR + "</span>";
            }
            switch (true) {
                case (b3Clicks <= 1):
                    chatMessage('Fishing looked much easier on television. With the amount of effort you are putting in, you\'d need at least four fish to satiate yourself.');
                    break;
                case (b3Clicks == 2):
                    chatMessage('A soft hum fills the air. You cannot locate the source of it, but you enjoy the sound. Women... they are of the Old World. The Party only allows one day a year for the Mating Ritual, exclusive to the strongest workers.');
                    break;
                case (b3Clicks == 3):
                    chatMessage('Are these voices coming from the lake? What is going on?');
                    break;
            }
            if (fishR == 4 && check4 == 0) {
                cutscene2();
            }
        }, 15000);
    } else {
        chatMessage('You can\'t fish without being near a water source first!');
    }
});
/* Battle button */
$(document).on("click", "#battleB", function() {
	$('#battle').modal({backdrop: 'static', keyboard: false});
	$('#battle').modal('toggle');
	initializeCombat();
});

$(document).on("click", "#startGameButton", function() {
    $('#startScreen').fadeTo(500, 0, function() {  
        document.getElementById('startScreen').style.display = "none";
        $('#main').fadeTo(1000, 1, function() {
            document.getElementById('main').style.display = "";
        });   
    });
});

$(document).on("click", "#combatButton1", function() {
	if (health > 1) {
        $('#noStaminaAlert').hide();
		var newDamage = Math.floor(Math.random() * ((damage + Math.floor(damage/2)) - (damage - Math.floor(damage/2)))) + (damage - Math.floor(damage/2));
		enemyHealth -= newDamage;
		selfStatsUpdate();
        enemyStatsUpdate();
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
            giveEXP();
			document.getElementById('combatResults').innerHTML = 'You have slain the enemy. <button class="blankButton" id="exitCombat">[exit]</button>';
            checkCheck2();
            checkCheck4();
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
        $('#noStaminaAlert').hide();
		var newDamage = Math.floor(Math.random() * ((damage + Math.floor(damage/2)) - (damage - Math.floor(damage/2)))) + (damage - Math.floor(damage/2));
		enemyHealth -= Math.floor(newDamage*2);
		stamina -= 25;
		selfStatsUpdate();
        enemyStatsUpdate();
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
            giveEXP();
			document.getElementById('combatResults').innerHTML = 'You have slain the enemy. <button class="blankButton" id="exitCombat">[exit]</button>';
            checkCheck2();
            checkCheck4();
        }
		var btn = $(this);
    	btn.prop('disabled', true);
    	setTimeout(function() {
        	btn.prop('disabled', false);
    	}, 8000);
	} else {
		$('#noStaminaAlert').show();
	}
});

$(document).on("click", "#exitCombat", function() {
	$('#battle').modal('hide');
	tCLogs = 0;
	document.getElementById('combatResults').innerHTML = '';
	document.getElementById('combatLog').innerHTML = '';
	charPageUpdate();
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
            charPageUpdate();
            document.getElementById('restResults').innerHTML = 'Rested! <button class="blankButton" id="exitRest">[exit]</button>';
            chatMessage('You feel rested. You quickly get up. The Party does not take laziness lightly.');
            clearInterval(incPercent);
        }
    }, 1000);
}); 

$(document).on("click", "#exitRest", function() {
    $('#restPage').modal('hide');
});

$(document).on("click", "#searchB", function() {
    chatMessage('You are searching the fields...');
    $(':button').prop('disabled', true);
    setTimeout(function() {
        $(':button').prop('disabled', false);
        if (curLoc == locations[0]) {
            var rng = Math.floor(Math.random() * 10) + 1;
            if (rng < 10 || check1 == 1) {
                chatMessage('You don\'t see anything interesting in particular. Just fields all around. Certain items have a low chance of being found.');
            } else {
                damage += 30;
                check1 = 1;
                yourWeapon = weapons[1];
                charPageUpdate();
                chatMessage('Something on the ground catches your eye. A spiked wooden club is what it appears to be. Workers are not supposed to carry weapons but you quickly shove it into your bag anyway.');
                silentSave();
            }
        }
    }, 3000);
});