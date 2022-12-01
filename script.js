// === ! CREATING THE VARIABLES AND SETTING UP CANVAS ! === \\
const canvas = document.querySelector('#canvas')
canvas.setAttribute('height', getComputedStyle(canvas)['height'])
canvas.setAttribute('width', getComputedStyle(canvas)['width'])
const ctx = canvas.getContext('2d')


// == ! CREATION OF ALL OBJECTS IN THE GAME ! == \\
class Object {
    constructor(x, y, width, height, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
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
const player = new Object(90, 55, 25, 25, 'lightgrey')
const boss = new Object(1000, 200, 50, 76, 'white')

// == ! Creation of Walls ! == \\
const wallStart = new Object(200, 300, 35, -300, 'black')
const wallBack = new Object(0, 0, 200, 35, 'black')
const wallSide = new Object(0, 0, 35, 500)

console.log(player, boss, wallStart)
// == ! SETTING UP OF FUNCTIONS ! == \\
// == ! Movement Function ! == \\
const pressedKeys = {}
function objectMovement(speed) {
    if (pressedKeys.w) {
        hero.y -= speed
    }
    if (pressedKeys.s) {
        hero.y += speed
    }
    if (pressedKeys.a) {
        hero.x -= speed
    }
    if (pressedKeys.d) {
        hero.x += speed
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

    // == ! Defining Game Logic for Winning/Losing ! == \\

    // == ! Rendering of Objects ! == \\
    wallStart.render()
    wallBack.render()
    wallSide.render()
    boss.render()
    player.render()

}

