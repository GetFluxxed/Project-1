// === ! CREATING THE VARIABLES AND SETTING UP CANVAS ! === \\
const canvas = document.querySelector('canvas')
canvas.setAttribute('height', getComputedStyle(canvas)['height'])
canvas.setAttribute('width', getComputedStyle(canvas)['width'])
const ctx = canvas.getContext('2d')


// == ! CREATION OF ALL OBJECTS IN THE GAME ! == \\
class Object {
    constructor(x, y, width, height, name, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.name = name
        this.color = color
    }
    // == ! RENDERING OF OBJECTS METHOD ! == \\
    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

// == ! SETTING UP OF FUNCTIONS ! == \\
// == ! Movement Function ! == \\
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
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

