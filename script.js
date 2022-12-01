// === ! CREATING THE VARIABLES AND SETTING UP CANVAS ! === \\
const canvas = document.querySelector('#canvas')
canvas.setAttribute('height', getComputedStyle(canvas)['height'])
canvas.setAttribute('width', getComputedStyle(canvas)['width'])
const ctx = canvas.getContext('2d')


// == ! CREATION OF ALL OBJECTS IN THE GAME ! == \\
class Character {
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

// == ! Starting the Game ! == \\
const gameRuntimeInterval = setInterval(gameRuntime, 60)

// == ! Creation of Player and Mobs ! == \\
const player = new Character(90, 55, 25, 25, 'lightgrey')
const boss = new Character(1000, 200, 50, 76, 'white')

// == ! Creation of Walls ! == \\
const floorMain = new Environment(0, 0, 350, 500, 'gray')
const wallStart = new Environment(200, 300, 35, -300, 'black')
const wallBack = new Environment(0, 0, 200, 35, 'black')
const wallSide = new Environment(0, 0, 35, 500, 'black')


// == ! SETTING UP OF FUNCTIONS ! == \\
// == ! Movement Function ! == \\
const pressedKeys = {}
function characterMovement(speed) {
    if (pressedKeys.w) {
        player.y -= speed
    }
    if (pressedKeys.s) {
        player.y += speed
    }
    if (pressedKeys.a) {
        player.x -= speed
    }
    if (pressedKeys.d) {
        player.x += speed
    }
    if (pressedKeys.c) {
        player.x += speed + 50
        player.y -= speed + 50
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

// == ! GAMELOOP LOGIC ! == \\
function gameRuntime() {
    // == ! clearing canvas ! == \\
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // == ! Game Logic for Interacting with Environments ! == \\

    if (detectHit(player, wallStart)) {
        characterMovement(-5)
    } else {
        characterMovement(5)
    }
    // == ! Defining Game Logic for Winning/Losing ! == \\
    if (detectHit(player, boss)) {
        boss.alive = false
        console.log('You have slain ME!!! You have won the game!!!')
    }

    // == ! Rendering of Objects ! == \\
    floorMain.render()
    wallStart.render()
    wallBack.render()
    wallSide.render()
    if (boss.alive) {
        boss.render()
    }
    if (player.alive) {
        player.render()
    }

}

