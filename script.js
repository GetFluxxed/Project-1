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
    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}
