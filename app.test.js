import {add, subtract, multiply, divide} from "./app.js"

it('adds 1 + 2 to equal 3', () =>{
    expect(add(1,2)).toBe(3);
});

it('subtracts 10 - 5', () => {
    expect(subtract(10,5)).toBe(5);
});

it('multiplies 3 * 6', () =>{
    expect(multiply(3,6)).toBe(18);
});

it('divides 20 / 5', () => {
    expect(divide(20,5)).toBe(4)
})