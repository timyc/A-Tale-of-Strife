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
		b3Clicks = loadData.b3Clicks;
		grainR = loadData.grainR;
		ironR = loadData.ironR;
		fishR = loadData.fishR;
		canMine = loadData.canMine;
		canFish = loadData.canFish;
		curLoc = loadData.curLoc;
		curDesc = loadData.curDesc;
		curActions = loadData.curActions;
		check1 = loadData.check1;
		check2 = loadData.check2;
		check3 = loadData.check3;
		check4 = loadData.check4;
		check5 = loadData.check5;
		tStories = loadData.tStories;
		document.getElementById('story').innerHTML = loadData.allCMessages;
	}
	locationCheck();
    document.getElementById('stats').innerHTML = '<li class="list-group-item">Level: ' + level + ' (' + experience + '/' + reqExp[level] + ')</li><li class="list-group-item">Health: ' + health + '/' + maxHealth + '</li><li class="list-group-item">Stamina: ' + stamina + '/' + maxStamina + '</li><li class="list-group-item">Damage: ' + damage + '</li>';
    document.getElementById('equipments').innerHTML = '<li class="list-group-item">Weapon: ' + yourWeapon + '</li><li class="list-group-item">Armor: ' + yourArmor + '</li>';
    if (curLoc == locations[0]) {
    	chatMessage('Everywhere you look, farmland dominates your view. You should harvest some grains.');
    } else if (curLoc == locations[1]) {
    	chatMessage('The air here is musty.');
    } else if (curLoc == locations[2]) {
    	chatMessage('The lake gleams beautifully in the afternoon sunlight.');
    }
    resourceCheck();
    if (canMine == 1) {
    	$('<button class="cooldown2">Mine Iron</button>').hide().appendTo("#buttonsCol").fadeIn(1000);
    }
    if (canFish == 1) {
    	$('<button class="cooldown3">Fish</button>').hide().appendTo("#buttonsCol").fadeIn(1000);
    }
});

function initializeCombat() {
	getSelfInfo();
	selfStatsUpdate();
	if (curLoc == locations[0]) {
		setMonsterInfo("Rat", 50, 100, 5);
		getEnemyInfo();
	} else if (ironR == 5 && check2 == 0 && curLoc == locations[1]) {
		setMonsterInfo("Radioactive Wanderer", 500, 100, 35);
		getEnemyInfo();
	} else if (curLoc == locations[1]) {
		setMonsterInfo("Waste Walker", 200, 100, 20);
		getEnemyInfo();
	} else if (curLoc == locations[2] && fishR == 4) {
		setMonsterInfo("Siren", 1500, 100, 2);
		getEnemyInfo();
	}
	doBattle = setInterval(function(){ 
		var rng = Math.floor(Math.random() * 3) + 1;
		if (rng > 2 & enemyStamina >= 25) {
			var newEnemyDamage = (Math.floor(Math.random() * ((enemyDamage + Math.floor(enemyDamage/2)) - (enemyDamage - Math.floor(enemyDamage/2)))) + (enemyDamage - Math.floor(enemyDamage/2)))*2;
			health -= newEnemyDamage;
			enemyStamina -= 25;
			selfStatsUpdate();
			enemyStatsUpdate();
			$('#playerIContainer').effect('shake');
			$($.parseHTML('<li>- The ' + document.getElementById('enemyName').innerHTML + ' did ' + newEnemyDamage + ' damage to you with a power attack -</li>')).hide().prependTo("#combatLog").fadeIn(1000);
			tCLogs++;
			if (tCLogs > 5) {
    			$('#combatLog li:last').remove();
    			tCLogs--;
    		}
    	} else {
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
    	}
		if (health < 1) {
			clearInterval(doBattle);
			clearBattle();
			document.getElementById('combatResults').innerHTML = 'You died. <button class="blankButton" id="exitCombat">[exit]</button>';
			if (ironR == 5 && check2 == 0 && curLoc == locations[1]) {
				ironR--;
				resourceCheck();
			}
			if (fishR == 4 && curLoc == locations[2]) {
				fishR--;
				resourceCheck();
			}
			curLoc = locations[0];
        	curDesc = locDesc[0];
        	curActions = locActions[0];
        	locationCheck();
        	health = 50;
        	stamina = 0;
        	experience = Math.floor(experience/2);
        	chatMessage('You gasp for air as you are pulled away from death\'s embrace. You suddenly remember the serum that the Party injected into every worker. Looking down, you see that your wounds are already fading. Time to work again.');
			silentSave();
		}
	}, 3000);
}

function getSelfInfo() {
	$("#playerImageContainer").show();
	document.getElementById('yourName').innerHTML = 'You';
	document.getElementById('playerImage').innerHTML = '<img src="img/player.png" class="img-fluid rounded mx-auto d-block" style="max-height:300px !important;" />';
	document.getElementById('playerCombatHP').innerHTML = 'Your Health: <div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" aria-valuenow="' + health + '" aria-valuemin="0" aria-valuemax="' + maxHealth + '" style="width: ' + (health/maxHealth)*100 + '%" id="playerHP"></div></div><br />';
	document.getElementById('playerCombatSP').innerHTML = 'Your Stamina: <div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="' + stamina + '" aria-valuemin="0" aria-valuemax="' + maxStamina + '" style="width: ' + (stamina/maxStamina)*100 + '%" id="playerSP"></div></div><br />';
}

function getEnemyInfo() {
	$("#enemyImageContainer").show();
	document.getElementById('enemyName').innerHTML = enemyName;
	document.getElementById('enemyImage').innerHTML = '<img src="img/' + enemyName + '.png" class="img-fluid rounded mx-auto d-block" style="max-height:300px !important;" />';
	document.getElementById('enemyCombatHP').innerHTML = 'Enemy Health: <div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" aria-valuenow="' + enemyHealth + '" aria-valuemin="0" aria-valuemax="' + enemyMaxHealth + '" style="width: ' + (enemyHealth/enemyMaxHealth)*100 + '%" id="enemyHP"></div></div><br />';
	document.getElementById('enemyCombatSP').innerHTML = 'Enemy Stamina: <div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="' + enemyStamina + '" aria-valuemin="0" aria-valuemax="' + enemyMaxStamina + '" style="width: ' + (enemyStamina/enemyMaxStamina)*100 + '%" id="enemySP"></div></div><br />';
	document.getElementById('combatButtons').innerHTML = '<button id="combatButton1" align="center">Normal Attack</button>&nbsp; <button id="combatButton2" align="center">Power Attack</button>';
}

function enemyStatsUpdate() {
	document.getElementById("enemyHP").style.width = (enemyHealth/enemyMaxHealth)*100 + '%';
	document.getElementById("enemySP").style.width = (enemyStamina/enemyMaxStamina)*100 + '%';
}

function selfStatsUpdate() {
	document.getElementById("playerHP").style.width = (health/maxHealth)*100 + '%';
	document.getElementById("playerSP").style.width = (stamina/maxStamina)*100 + '%';
}

function charPageUpdate() {
	document.getElementById('stats').innerHTML = '<li class="list-group-item">Level: ' + level + ' (' + experience + '/' + reqExp[level] + ')</li><li class="list-group-item">Health: ' + health + '/' + maxHealth + '</li><li class="list-group-item">Stamina: ' + stamina + '/' + maxStamina + '</li><li class="list-group-item">Damage: ' + damage + '</li>';
    document.getElementById('equipments').innerHTML = '<li class="list-group-item">Weapon: ' + yourWeapon + '</li><li class="list-group-item">Armor: ' + yourArmor + '</li>';
}

function doChat() {
	var chatContent = document.getElementById('chatSequence').value;
	if (check2 == 1 && check3 == 0 && ironR >= 5 && chatContent.indexOf('iron') !== -1 && curLoc == locations[0]) {
		chatMessage('You give the Guardian the five ingots and tell him about the creature you saw. He smirks but goes into a nearby building and comes back with what appeared to be leather armor. He hands it to you and tells you to get back to working on the fields.');
		setTimeout(function() {
			ironR -= 5;
			maxHealth += 100;
			check3++;
			yourArmor = armors[1];
			b1Clicks = 15;
			charPageUpdate();
			resourceCheck();
			silentSave();
		}, 1000);
	} else {
		chatMessage('Logical error.');
	}
	document.getElementById('chatSequence').value = "";
}

function setMonsterInfo(arg1, arg2, arg3, arg4) {
	enemyName = arg1;
	enemyHealth = arg2;
	enemyMaxHealth = enemyHealth;
	enemyStamina = arg3;
	enemyMaxStamina = enemyStamina;
	enemyDamage = arg4;
}

function levelUp() {
	level++;
	experience = 0;
	maxHealth += 100;
	health = maxHealth;
	stamina = maxStamina;
	damage += 5;
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
	$('#noStaminaAlert').hide();
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
	$($.parseHTML('<li class="list-group-item" style="border-radius:0 !important; border:none !important;"><b>[' + formatAMPM(new Date) + ']</b> <span class="font-italic">' + arg + '</span></li>')).hide().prependTo("#story").fadeIn(1000);
	tStories++;
	if (tStories > 5) {
    	$('#story li:last').remove();
    	tStories--;
    }
}

function successChatMessage(arg) {
	$('<li class="list-group-item bg-success" style="border-radius:0 !important; border:none !important;"><b>[' + formatAMPM(new Date) + ']</b> ' + arg + '</li>').hide().prependTo("#story").fadeIn(1000);
	tStories++;
	if (tStories > 5) {
    	$('#story li:last').remove();
    	tStories--;
    }
}

function dangerChatMessage(arg) {
	$('<li class="list-group-item bg-danger" style="border-radius:0 !important; border:none !important;"><b>[' + formatAMPM(new Date) + ']</b> ' + arg + '</li>').hide().prependTo("#story").fadeIn(1000);
	tStories++;
	if (tStories > 5) {
    	$('#story li:last').remove();
    	tStories--;
    }
}

function checkCheck2() {
	if (ironR == 5 && check2 == 0 && curLoc == locations[1]) {
		check2 = 1;
		$('#battle').modal('hide');
		tCLogs = 0;
		document.getElementById('combatResults').innerHTML = '';
		document.getElementById('combatLog').innerHTML = '';
		charPageUpdate();
		chatMessage('With a final strike, the <i>thing</i> falls and moves no more. You cannot believe such horrors can exist. You should probably head back to the field and give the Guardian the iron ingots.');
		$(':button').prop('disabled', true);
		setTimeout( function() {
			$(':button').prop('disabled', false);
			cutscene1();
		}, 6000);
	}
}

function checkCheck4() {
	if (fishR == 4 && check4 == 0 && curLoc == locations[2]) {
		check4 = 1;
		document.getElementById('combatResults').innerHTML = '';
		document.getElementById('combatLog').innerHTML = '';
		$('#battle').modal('hide');
		$(':button').prop('disabled', true);
		setTimeout( function() {
			$(':button').prop('disabled', false);
			cutscene3();
		}, 6000);
	}
}

function resourceCheck() {
	document.getElementById('resources').innerHTML = "";
	if (grainR > 0) {
    	document.getElementById('resources').innerHTML += "<li id='grainR' class='list-group-item'>Grains: <span id='grainID'>" + grainR + "</span></li>";
    }
    if (ironR > 0) {
    	document.getElementById('resources').innerHTML += "<li id='ironR' class='list-group-item'>Iron ingots: <span id='ironID'>" + ironR + "</span></li>";
    }
    if (fishR > 0) {
    	document.getElementById('resources').innerHTML += "<li id='fishR' class='list-group-item'>Fish: <span id='fishID'>" + fishR + "</span></li>";
    }
}

function locationCheck() {
	document.getElementById('placeName').innerHTML = "";
	document.getElementById('placeDesc').innerHTML = "";
	document.getElementById('placeActions').innerHTML = "";
	$($.parseHTML(curLoc)).appendTo("#placeName");
	$($.parseHTML(curDesc)).appendTo("#placeDesc");
	$($.parseHTML(curActions)).appendTo("#placeActions");
}

function gotoLocation(arg) {
	if (arg == 1 && canMine == 0) {
		$('#lockedAlert').show();
		return;
	} else if (arg == 2 && canFish == 0) {
		$('#lockedAlert').show();
		return;
	}
	$('#lockedAlert').hide();
	curLoc = locations[arg];
	curDesc = locDesc[arg];
	curActions = locActions[arg];
	locationCheck();
	chatMessage('You have arrived at ' + curLoc.toLowerCase() + '.');
	$('#worldMap').modal('hide');
}

function giveEXP() {
	if (curLoc == locations[0]) {
		experience += 25;
		if (experience >= reqExp[level]) {
            levelUp();
        }
	} else if (curLoc == locations[1]) {
		experience += 45;
		if (experience >= reqExp[level]) {
            levelUp();
        }
	} else if (curLoc == locations[2]) {
		experience += 100;
		if (experience >= reqExp[level]) {
			levelUp();
		}
	}
}

function cutscene1() {
	$('#main').fadeTo(500, 0, function() {  
        document.getElementById('main').style.display = "none";
        $('#cutscenes').fadeTo(500, 1, function() {
            document.getElementById('cutscenes').style.display = "";
            setTimeout(function() { 
            	$('#cutsceneText').fadeTo(500, 1, function() {
            		$($.parseHTML('<span class="font-weight-bold" style="font-size: 2em">17 years ago</span>')).hide().prependTo("#cutsceneText").fadeIn(1000);
        		});
        		setTimeout(function() { 
            		$('#cutsceneText').fadeTo(500, 0, function() {
            			document.getElementById('cutsceneText').innerHTML = "";
            		});
            		setTimeout(function() { 
            			$('#cutsceneText').fadeTo(500, 1, function() {
            				$($.parseHTML('<span class="font-italic" style="font-size: 1.5em">It was an ordinary day for Jared. He had just come home from work.</span>')).hide().prependTo("#cutsceneText").fadeIn(1000);
            			});
            			setTimeout(function() {
            				$('#cutsceneText').fadeTo(500, 0, function() {
            					document.getElementById('cutsceneText').innerHTML = "";
            				});
            				setTimeout(function() {
            					$('#cutsceneText').fadeTo(500, 1, function() {
            						$($.parseHTML('<span class="font-italic" style="font-size: 1.5em">Like every other ordinary American, he turned on his TV as he sat on his couch eating dinner.</span>')).hide().prependTo("#cutsceneText").fadeIn(1000);
            					});
            					setTimeout(function() {
            						$('#cutsceneText').fadeTo(500, 0, function() {
            							document.getElementById('cutsceneText').innerHTML = "";
            						});
            						setTimeout(function() {
            							$('#cutsceneText').fadeTo(500, 1, function() {
            								$($.parseHTML('<span class="font-italic" style="font-size: 1.5em">That day was not like any of the others.</span>')).hide().prependTo("#cutsceneText").fadeIn(1000);
            							});
            							setTimeout(function() {
            								$('#cutsceneText').fadeTo(1000, 0, function() {
            									document.getElementById('cutsceneText').innerHTML = "";
            									document.getElementById('cutscenes').style.display = "none";
            									$('#main').fadeTo(3000, 1, function() {
            										document.getElementById('main').style.display = "";
            									});
            								});
            							}, 7500);
            						}, 1000);
            					}, 7500);
            				}, 1000);
            			}, 7500);
        			}, 1000);
        		}, 3500);
        	}, 1000);
        });   
    });
    silentSave();
}

function cutscene2() {
	$('#main').fadeTo(500, 0, function() {  
        document.getElementById('main').style.display = "none";
        $('#cutscenes').fadeTo(500, 1, function() {
            document.getElementById('cutscenes').style.display = "";
            setTimeout(function() { 
            	$('#cutsceneText').fadeTo(500, 1, function() {
            		$($.parseHTML('<span class="font-italic" style="font-size: 1.5em">They came and slaughtered my dog.</span>')).hide().prependTo("#cutsceneText").fadeIn(1000);
        		});
        		setTimeout(function() { 
            		$('#cutsceneText').fadeTo(500, 0, function() {
            			document.getElementById('cutsceneText').innerHTML = "";
            		});
            		setTimeout(function() { 
            			$('#cutsceneText').fadeTo(500, 1, function() {
            				$($.parseHTML('<span class="font-italic" style="font-size: 1.5em">They took my beloved son.</span>')).hide().prependTo("#cutsceneText").fadeIn(1000);
            			});
            			setTimeout(function() {
            				$('#cutsceneText').fadeTo(500, 0, function() {
            					document.getElementById('cutsceneText').innerHTML = "";
            				});
            				setTimeout(function() {
            					$('#cutsceneText').fadeTo(500, 1, function() {
            						$($.parseHTML('<span class="font-italic" style="font-size: 1.5em">My memories are all I have left of them.</span>')).hide().prependTo("#cutsceneText").fadeIn(1000);
            					});
            					setTimeout(function() {
            						$('#cutsceneText').fadeTo(500, 0, function() {
            							document.getElementById('cutsceneText').innerHTML = "";
            						});
            						setTimeout(function() {
            							$('#cutsceneText').fadeTo(500, 1, function() {
            								$($.parseHTML('<span class="font-italic" style="font-size: 1.5em">But they will soon take them too.</span>')).hide().prependTo("#cutsceneText").fadeIn(1000);
            							});
            							setTimeout(function() {
            								$('#cutsceneText').fadeTo(1000, 0, function() {
            									document.getElementById('cutsceneText').innerHTML = "";
            									document.getElementById('cutscenes').style.display = "none";
            									$('#main').fadeTo(2000, 1, function() {
            										document.getElementById('main').style.display = "";
            										$('#battle').modal({
                        								backdrop: 'static',
                        								keyboard: false
                    								});
                    								$('#battle').modal('toggle');
                    								initializeCombat();
            									});
            								});
            							}, 7500);
            						}, 1000);
            					}, 7500);
            				}, 1000);
            			}, 7500);
        			}, 1000);
        		}, 7500);
        	}, 1000);
        });   
    });
}

function cutscene3() {
	$('#main').fadeTo(500, 0, function() {  
        document.getElementById('main').style.display = "none";
        $('#cutscenes').fadeTo(500, 1, function() {
            document.getElementById('cutscenes').style.display = "";
            setTimeout(function() { 
            	$('#cutsceneText').fadeTo(500, 1, function() {
            		$($.parseHTML('<span class="font-italic" style="font-size: 1.5em">As you deliver the killing blow to the siren, the world starts to spin.</span>')).hide().prependTo("#cutsceneText").fadeIn(1000);
        		});
        		setTimeout(function() { 
            		$('#cutsceneText').fadeTo(500, 0, function() {
            			document.getElementById('cutsceneText').innerHTML = "";
            		});
            		setTimeout(function() { 
            			$('#cutsceneText').fadeTo(500, 1, function() {
            				$($.parseHTML('<span class="font-italic" style="font-size: 1.5em">As the spinning subsides, you look back down at your bloodied hands.</span>')).hide().prependTo("#cutsceneText").fadeIn(1000);
            			});
            			setTimeout(function() {
            				$('#cutsceneText').fadeTo(500, 0, function() {
            					document.getElementById('cutsceneText').innerHTML = "";
            				});
            				setTimeout(function() {
            					$('#cutsceneText').fadeTo(500, 1, function() {
            						$($.parseHTML('<span class="font-italic font-weight-bold" style="font-size: 1.5em">What have you done?</span>')).hide().prependTo("#cutsceneText").fadeIn(1000);
            					});
            					setTimeout(function() {
            						$('#cutsceneText').fadeTo(500, 0, function() {
            							document.getElementById('cutsceneText').innerHTML = "";
            						});
            						setTimeout(function() {
            							$('#cutsceneText').fadeTo(500, 1, function() {
            								$($.parseHTML('<span class="font-italic" style="font-size: 1.5em"><img src="img/newspaper.png" style="max-height:100vh !important;" /></span>')).hide().prependTo("#cutsceneText").fadeIn(1000);
            							});
            							setTimeout(function() {
            								$('#cutsceneText').fadeTo(500, 0, function() {
            									document.getElementById('cutsceneText').innerHTML = "";
            								});
            								setTimeout(function() {
            									$('#cutsceneText').fadeTo(500, 1, function() {
            										$($.parseHTML('<span class="font-italic" style="font-size: 1.5em">Fin</span>')).hide().prependTo("#cutsceneText").fadeIn(1000);
            									});
            									setTimeout(function() {
            										$('#cutsceneText').fadeTo(1000, 0, function() {
            											document.getElementById('cutsceneText').innerHTML = "";
            											document.getElementById('cutscenes').style.display = "none";
            											$('#startScreen').fadeTo(2000, 1, function() {
            												document.getElementById('startScreen').style.display = "";
            												purgeGame();
            												location.reload();
            											});
            										});
            									}, 5000);
            								}, 1000);
            							}, 7500);
            						}, 1000);
            					}, 7500);
            				}, 1000);
            			}, 7500);
        			}, 1000);
        		}, 7500);
        	}, 1000);
        });   
    });
}