// Character vars
var level = 1;
var experience = 0;
var reqExp = [0, 100, 200, 300, 500, 700, 1000, 1500, 2000, 3000, 999999999];
var health = 100;
var maxHealth = 100;
var stamina = 100;
var maxStamina = 100;
var damage = 10;
var weapons = ['Bare Fists', 'Wooden Club', 'Steel Sword'];
var weaponStats = [0, 50, 150];
var yourWeapon = weapons[0];
var yourWeaponStats = weaponStats[0];
var armors = ['Worker Rags', 'Leather Armor', 'Guardian Armor'];
var armorStats = [0, 100, 300];
var yourArmor = armors[0];
var yourArmorStats = armorStats[0];
// Enemy vars
var enemyHealth = 0;
var enemyMaxHealth = 0;
var enemyStamina = 0;
var enemyMaxStamina = 0;
var enemyDamage = 0;
// Total clicks to progress story
var b1Clicks = 0;
var b2Clicks = 0;
// Resources
var grainR = 0;
var ironR = 0;
// Booleans
var canMine = 0;
var doBattle;
// Locations and current
var locations = ['The Fields', 'Iron Mines', 'Lake'];
var locDesc = ['After the establishment of the New Earth, most people were allocated to become workers who toil in the fields.', '', ''];
var locActions = ['<button id="battleB" class="blankButton">Battle</button> | <button id="restB" class="blankButton">Rest</button>', '', ''];
var curLoc = locations[0];
var curDesc = locDesc[0];
var curActions = locActions[0];
// Total amount of messages in stories
var tStories = 0;
var tCLogs = 0;
// Checkpoints
var check1 = 0;
var check2 = 0;
var check3 = 0;
var check4 = 0;
var check5 = 0;
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