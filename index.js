#! /usr/bin/env node
import inquirer from 'inquirer';
//In this first we define games variables
let enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"];
let maxEnemyHealth = 75;
let enemyAttackDamageToHero = 25;
//In this we define player variables
let heroHealth = 100;
let attackDamageToEnemy = 50;
let numHealthPortions = 3;
let healthPortionHealAmount = 30;
let healthPortionDropChance = 50;
//So first we start While loop for the game
let gameRunning = true;
console.log("Welcome to the DeadZone !");
Game: while (gameRunning) {
    let enemyHealth = Math.floor(Math.random() * maxEnemyHealth + 1); //random enemy health
    let enemyIndex = Math.floor(Math.random() * enemies.length); //random enemy ayenge 
    let enemy = enemies[enemyIndex];
    console.log(`# ${enemy} has appeared! #\n`);
    while (enemyHealth > 0) {
        console.log(`Your HP: ${heroHealth}`);
        console.log(`${enemy}'s HP: ${enemyHealth}`);
        let options = await inquirer.prompt([{
                name: "ans",
                type: "list",
                message: "What would you like to do?",
                choices: ["1. Attack", "2. Drink Health Portion", "3. Run"]
            }
        ]);
        if (options.ans === "1. Attack") {
            let attackDamageToEnemy = 50;
            let damageToEnemy = Math.floor(Math.random() * attackDamageToEnemy + 1);
            let damageToHero = Math.floor(Math.random() * enemyAttackDamageToHero + 1);
            enemyHealth -= damageToEnemy;
            heroHealth -= damageToHero;
            console.log(`You Strike the ${enemy} for ${damageToEnemy}`); // mene kitna damage dia ha enemy ko 
            console.log(`${enemy} strike you for ${damageToHero} damage.`); //enemy ne kitna damage dia ha mujhe
            if (heroHealth < 1) {
                console.log("You have taken too much damage, you are too weak to go on!");
                break;
            }
        }
        else if (options.ans === "2. Drink Health Portion") {
            if (numHealthPortions > 0) {
                heroHealth += healthPortionHealAmount;
                numHealthPortions--;
                console.log(`You drink a health portion, healing yourself for ${healthPortionHealAmount}`);
                console.log(`You now have ${heroHealth} HP.`);
                console.log(`You have ${numHealthPortions} health portions left.\n`);
            }
            else {
                console.log("You have no health portions left! Kill an enemy to get a chance to get a health portion!");
            }
        }
        else if (options.ans === "3. Run") {
            console.log(`You run away from the ${enemy}!`);
            continue Game;
        }
    }
    if (heroHealth < 1) {
        console.log("You are out from the battle, you are too weak.");
        break;
    }
    console.log((`${enemy} was defeated!`));
    console.log(`You have ${heroHealth} health`);
    //jab ap enemy ko kill karden or apki health 50 se kam ha or random no bhi 50 se kam ajaye jab apko health mila gi
    let randomChance = Math.floor(Math.random() * 100 + 1);
    if (randomChance < healthPortionDropChance) {
        numHealthPortions++;
        console.log(`Enemy give u a health portion!`);
        console.log(`Your Health is ${heroHealth}`);
        console.log(`You now have ${numHealthPortions} health portion's.`);
    }
    let userOption = await inquirer.prompt([{
            name: "ans",
            type: "list",
            message: "What would you like to do now?",
            choices: ["1. Continue Fighting", "2. Exit Game"]
        }]);
    if (userOption.ans === "1. Continue Fighting") {
        console.log("You are Continue on your adventure");
    }
    else {
        console.log("You exit from the game");
        break;
    }
    console.log("Thank You for playing this.\n");
}
