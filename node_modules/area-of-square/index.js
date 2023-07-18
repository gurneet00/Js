function areaOfSquare (side) {
    if (side < 0) { return 'side should be a positive number' }
    if (typeof side !== 'number') { return 'side should be a number' }
    return side * side
}

module.exports = areaOfSquare