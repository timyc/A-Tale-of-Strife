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
var yourWeapon = weapons[0];
var armors = ['Worker Rags', 'Leather Armor', 'Guardian Armor'];
var yourArmor = armors[0];
// Enemy vars
var enemyName = "";
var enemyHealth = 0;
var enemyMaxHealth = 0;
var enemyStamina = 0;
var enemyMaxStamina = 0;
var enemyDamage = 0;
// Total clicks to progress story
var b1Clicks = 0;
var b2Clicks = 0;
var b3Clicks = 0;
// Resources
var grainR = 0;
var ironR = 0;
var fishR = 0;
// Booleans
var canMine = 0;
var canFish = 0;
var doBattle;
// Locations and current
var locations = ['The Fields', 'Iron Mines', 'The Lake'];
var locDesc = ['After the establishment of the New Earth, most people were allocated to become workers who toil in the fields.', 'This mine was abandoned in the Old World due to high traces of toxic chemicals. You\'ve heard of horror stories where lost workers become feral here.', 'The lake is forbidden to everyone except the highest ranking Party members. You have heard of rumours about this place. After the Party took control, women were used as test subjects.'];
var locActions = ['<button id="battleB" class="blankButton">Battle</button> | <button id="restB" class="blankButton">Rest</button> | <button id="searchB" class="blankButton">Search</button>', '<button id="battleB" class="blankButton">Battle</button>', ''];
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