// === ! CREATING THE VARIABLES AND SETTING UP CANVAS ! === \\
const canvas = document.querySelector('#canvas')
canvas.setAttribute('height', getComputedStyle(canvas)['height'])
canvas.setAttribute('width', getComputedStyle(canvas)['width'])
const ctx = canvas.getContext('2d')
let gameIsRunning = true


// == ! CREATION OF ALL OBJECTS IN THE GAME ! == \\
class Character {
    constructor(x, y, width, height, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.alive = true
        this.weapon = false
        this.hasKey = false
    }
    // == ! RENDERING OF OBJECTS METHOD ! == \\
    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}



// == !! HUGE BREAKTHROUGH WITH LEARNING EXTENSION AND DRAWING IN CANVAS !! == \\
// class Winged extends Character {
//     constructor(x, y, width, height, color, x2, y2, width2, height2, x3, y3, width3, height3) {
//         super(x, y, width, height, color)
//         this.x2 = x2
//         this.y2 = y2
//         this.wingLeftW = width2
//         this.wingLeftH = height2
//         this.x3 = x3
//         this.y3 = y3
//         this.wingRightW = width3
//         this.wingRightH = height3
//     }
//     render() {
//         ctx.fillStyle = this.color
//         ctx.fillRect(this.x, this.y, this.width, this.height)
//         ctx.fillRect(this.x2, this.y2, this.wingLeftW, this.wingLeftH)
//         ctx.fillRect(this.x3, this.y3, this.wingRightW, this.wingRightH)
//     }
// }

// const experiment = new Winged(102, 102, 10, 10, 'black', 115, 102, 10, 10, 110, 110, 10, 10)

class Environment {
    constructor(x, y, width, height, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.alive = true
    }
    // == ! RENDERING OF OBJECTS METHOD ! == \\
    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

// == ! Creating Winning and Losing Text ! == \\
class Text {
    constructor(x, y, text) {
        this.x = x
        this.y = y
        this.text = text
        this.display = false
    }
    render() {
        ctx.font = '40px Cinzel'
        ctx.fillStyle = this.color
        ctx.fillText(this.text, this.x, this.y)
    }
}

class SmallText {
    constructor(x, y, text) {
        this.x = x
        this.y = y
        this.text = text
        this.display = false
    }
    render() {
        ctx.font = '25px Cinzel'
        ctx.fillStyle = this.color
        ctx.fillText(this.text, this.x, this.y)
    }
}




// == ! Starting the Game ! == \\
const gameRuntimeInterval = setInterval(gameRuntime, 60)

// == ! Creation of Player and Mobs ! == \\
const player = new Character(90, 55, 25, 45, 'lightgrey')
const skeletonOne = new Character(1900, 300, 35, 75, 'white')
const zombieOne = new Character(1100, 300, 35, 50, 'green')
// = ! Experimental creations ! = \\
// const batOne = new Character(1700, 900, 15, 10, 'black')
// const batTwo = new Character(1732, 917, 15, 10, 'black')
// const batThree = new Character(1720, 890, 15, 10, 'black')

// == ! Creation of Walls/Environment ! == \\
const floorMain = new Environment(0, 0, 395, 500, 'gray')

// = ! Walls ! = \\
const wallStart = new Environment(200, 0, 35, 300, 'black')
const wallBack = new Environment(0, 0, 200, 35, 'black')
const wallSide = new Environment(0, 0, 35, 1050, 'black')
const wallConnector = new Environment(200, 600, 35, 500, 'black')
const wallEnd = new Environment(0, 430, 235, 35, 'black')
const wallEnd2 = new Environment(0, 890, 235, 35, 'black')
const wallLever = new Environment(1300, 0, 35, 250, 'black')
const wallLeverExt = new Environment(1300, 380, 35, 400, 'black')
const wallLeverExtBot = new Environment(1300, 780, 750, 35, 'black')

// = ! Danger ! = \\
const lavaTop = new Environment(400, 0, 500, 399, "red")
const lavaBot = new Environment(400, 456, 500, 550, "red")

// = ! Misc. ! = \\
const walkway = new Environment(400, 400, 500, 55, 'brown')

// = ! Interactable Pairs(if applicable) ! = \\
const treasureChest = new Environment(90, 855, 50, 35, 'gold')
const doorStart = new Environment(200, 300, 35, 130, 'brown')

const keyChest = new Environment(35, 395, 50, 35, 'gold')
const swordChest = new Environment(200, 465, 35, 135, 'brown')

const leverOne = new Environment(1290, 245, 15, 7, 'lightgrey')
const doorEnemy = new Environment(1300, 250, 35, 130, 'brown')

// == ! Creation of Text Elements ! == \\
const objective = new Text(450, 50, 'You gotta get out')
const hint = new Text(350, 100, 'You need a weapon you fool')
const deathTxt = new Text(515, 50, 'Get Smacked')
const lavaTxt = new Text(515, 50, 'Mmm Cwispy')
const wonTxt = new Text(515, 50, 'Hey you won')
const swordTxt = new SmallText(1050, 825, 'You have a Sword')
const keyTxt = new SmallText(1050, 875, 'You have a Key')
const directTxt = new Text(330, 100, 'WASD to move, WASD + C to dash. R to restart')
// const deathText = new Text()


// == ! SETTING UP OF FUNCTIONS ! == \\
// == ! Movement Function ! == \\

function openLog() {
    if (player.weapon) {
        swordTxt.display = true
    }

    if (player.hasKey) {
        keyTxt.display = true
    }
}
function closeLog() {
    keyTxt.display = false
    swordTxt.display = false
}


const pressedKeys = {}
function characterMovement(speed) {
    if (gameIsRunning) {
        if (pressedKeys.w && pressedKeys.c) {
            player.y -= speed + 50
        }
        if (pressedKeys.w) {
            player.y -= speed
            directTxt.display = false
        }
        if (pressedKeys.s && pressedKeys.c)
            player.y += speed + 50
        if (pressedKeys.s) {
            player.y += speed
            directTxt.display = false
        }
        if (pressedKeys.a && pressedKeys.c) {
            player.x -= speed + 50
        }
        if (pressedKeys.a) {
            player.x -= speed
            directTxt.display = false
        }
        if (pressedKeys.d && pressedKeys.c) {
            player.x += speed + 50
        }
        if (pressedKeys.d) {
            player.x += speed
            directTxt.display = false
        }
        if (pressedKeys.i) {
            openLog()
        }
        if (!pressedKeys.i) {
            closeLog()
        }
        if (pressedKeys.r || !gameIsRunning) {
            gameIsRunning = true
            player.x = 90
            player.y = 55
            player.alive = true
            player.hasKey = false
            player.weapon = false
            treasureChest.alive = true
            keyChest.alive = true
            skeletonOne.alive = true
            hint.display = false
            objective.display = true
            deathTxt.display = false
            lavaTxt.display = false
            wonTxt.display = false
            directTxt.display = true
            leverOne.alive = true
            zombieOne.alive = true
            console.log('r')
        }
        if (detectHit(player, leverOne) && pressedKeys.f) {
            leverOne.alive = false
        }

    }
}

document.addEventListener('keydown', e => pressedKeys[e.key] = true)
document.addEventListener('keyup', e => pressedKeys[e.key] = false)


// == ! Hit Detection Registration ! == \\
function detectHit(objectOne, objectTwo) {
    // == ! AXIS ALIGNED BOUNDING BOX COLLISION SYSTEM HIT DETECTION ! == \\
    // == ! MAINLY CHECKING FOR OVERLAPS ! == \\
    const left = objectOne.x + objectOne.width >= objectTwo.x
    const right = objectOne.x <= objectTwo.x + objectTwo.width
    const top = objectOne.y + objectOne.height >= objectTwo.y
    const bottom = objectOne.y <= objectTwo.y + objectTwo.height
    // console.log(left, right, top, bottom)
    return left && right && top && bottom
}
objective.display = true
directTxt.display = true
// == ! GAMELOOP LOGIC ! == \\
function gameRuntime() {
    // == ! clearing canvas ! == \\
    ctx.clearRect(0, 0, canvas.width, canvas.height)


    // == ! Defining Game Logic for Winning/Losing ! == \\
    if (detectHit(player, skeletonOne)) {
        if (player.weapon) {
            skeletonOne.alive = false
            objective.display = false
            wonTxt.display = true
            // gameIsRunning = false
        } else {
            player.alive = false
            // gameIsRunning = false
            if (!player.alive) {
                objective.display = false
                hint.display = true
                deathTxt.display = true
            }
        }

    }
    if (detectHit(player, zombieOne)) {
        if (player.weapon) {
            zombieOne.alive = false
        } else {
            player.alive = false
            objective.display = false
            hint.display = true
            deathTxt.display = true
        }
    }

    // == ! Game Logic for Interacting with Environments ! == \\
    if (detectHit(player, wallStart)) {
        characterMovement(-20)
    } else {
        characterMovement(10)
    }
    if (detectHit(player, wallEnd)) {
        characterMovement(-20)
    }
    if (detectHit(player, wallConnector)) {
        characterMovement(-20)
    }
    if (detectHit(player, wallBack)) {
        characterMovement(-20)
    }
    if (detectHit(player, wallSide)) {
        characterMovement(-20)
    }
    if (detectHit(player, wallEnd2)) {
        characterMovement(-20)
    }
    if (detectHit(player, doorStart)) {
        if (!player.hasKey) {
            characterMovement(-20)
        }
    }
    if (detectHit(player, swordChest)) {
        if (!player.hasKey) {
            characterMovement(-20)
        }
    }

    if (detectHit(player, lavaTop)) {
        player.alive = false
        objective.display = false
        lavaTxt.display = true
        // gameIsRunning = false
    }
    if (detectHit(player, lavaBot)) {
        player.alive = false
        objective.display = false
        lavaTxt.display = true
        // gameIsRunning = false
    }
    if (detectHit(player, keyChest)) {
        player.hasKey = true
        keyChest.alive = false
        console.log(player.hasKey)
    }
    if (detectHit(player, treasureChest)) {
        player.weapon = true
        treasureChest.alive = false
        console.log(player.weapon)
    }
    if (detectHit(player, doorEnemy)) {
        if (leverOne.alive) {
            characterMovement(-20)
        }
    }

    // == ! Rendering of Objects ! == \\
    floorMain.render()
    wallStart.render()
    wallBack.render()
    wallSide.render()
    wallConnector.render()
    wallEnd.render()
    wallLever.render()
    lavaTop.render()
    lavaBot.render()
    walkway.render()
    doorStart.render()
    swordChest.render()
    leverOne.render()
    doorEnemy.render()
    wallLeverExt.render()
    wallLeverExtBot.render()
    // batOne.render()
    // batTwo.render()
    // batThree.render()
    // experiment.render()
    if (keyChest.alive) {
        keyChest.render()
    }
    if (treasureChest.alive) {
        treasureChest.render()
    }
    if (player.alive) {
        player.render()
    }
    if (zombieOne.alive) {
        zombieOne.render()
    }
    if (skeletonOne.alive) {
        skeletonOne.render()
    }
    if (skeletonOne.alive) {
        wallEnd2.render()
    }

    // == ! Rendering Text Elements ! == \\
    if (objective.display) {
        objective.render()
    }
    if (hint.display) {
        hint.render()
    }
    if (deathTxt.display) {
        deathTxt.render()
    }
    if (wonTxt.display) {
        wonTxt.render()
    }
    if (swordTxt.display) {
        swordTxt.render()
    }
    if (keyTxt.display) {
        keyTxt.render()
    }
    if (lavaTxt.display) {
        lavaTxt.render()
    }
    if (directTxt.display) {
        directTxt.render()
    }
}

