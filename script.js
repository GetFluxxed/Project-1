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
class Sprite {
    constructor(x, y, sprite) {
        this.x = x
        this.y = y
        this.sprite = sprite
        this.alive = true
        this.weapon = false
        this.hasKey = false
    }
    // == ! RENDERING OF OBJECTS METHOD ! == \\
    render() {
        ctx.drawImage(this.sprite, this.x, this.y, this.sprite.width, this.sprite.height);
    }
}
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

class Background {
    constructor() {
        this.cobblestone = new Image();
        this.cobblestone.src = './cobblestone.png'

        this.cobblestonePattern = ctx.createPattern(this.cobblestone, 'repeat')
    }
    render() {
        ctx.fillStyle = this.cobblestonePattern
        ctx.fillRect(0, 0, canvas.width, canvas.height)
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
const player = new Character(90, 55, 25, 25, 'lightgrey')
const boss = new Character(1100, 200, 50, 76, 'white')

const grimSprite = new Image();
grimSprite.src = './grim-sprite-current.png'
const bossSprite = new Sprite(1000, 200, grimSprite)

// == ! Creation of Walls/Environment ! == \\
// const floorMain = new Environment(0, 0, 395, 500, 'gray') OBSOLETE
const background = new Background
// = ! Walls ! = \\
const wallStart = new Environment(200, 0, 35, 300, 'black')
const wallBack = new Environment(0, 0, 200, 35, 'black')
const wallSide = new Environment(0, 0, 35, 1050, 'black')
const wallConnector = new Environment(200, 600, 35, 500, 'black')
const wallEnd = new Environment(0, 430, 235, 35, 'black')
const wallEnd2 = new Environment(0, 890, 235, 35, 'black')
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
            boss.alive = true
            hint.display = false
            objective.display = true
            deathTxt.display = false
            lavaTxt.display = false
            wonTxt.display = false
            console.log('r')
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
    if (detectHit(player, boss)) {
        if (player.weapon) {
            boss.alive = false
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

    // == ! Rendering of Objects ! == \\
    background.render()
    wallStart.render()
    wallBack.render()
    wallSide.render()
    wallConnector.render()
    wallEnd.render()
    wallEnd2.render()
    lavaTop.render()
    lavaBot.render()
    walkway.render()
    doorStart.render()
    swordChest.render()
    bossSprite.render()
    if (keyChest.alive) {
        keyChest.render()
    }
    if (treasureChest.alive) {
        treasureChest.render()
    }
    if (player.alive) {
        player.render()
    }
    if (boss.alive) {
        boss.render()
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

