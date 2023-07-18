const areaOfSquare = require('./index')

describe ( 'area of a square', () => {

    test ( 'should calculate the area of a square', () => {
        const actual = areaOfSquare(2)
        const expected = 4

        expect(actual).toBe(expected)
    })

    test ( 'side should be a positive number', () => {
        const actual = areaOfSquare(-2)
        const expected = 'side should be a positive number'

        expect(actual).toBe(expected)
    })

    test ( 'side should not be a string', () => {
        const actual = areaOfSquare('2')
        const expected = 'side should be a number'

        expect(actual).toBe(expected)
    })

    test ( 'side should be a number', () => {

        const actual = areaOfSquare('xyz')
        const expected = 'side should be a number'

        expect(actual).toBe(expected)
    }) 
  


        
})