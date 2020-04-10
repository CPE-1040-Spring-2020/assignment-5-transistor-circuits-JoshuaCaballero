let min = 0;
let max = 1023;
let read = 0;
let bar = 0;
function measure() {
    pins.digitalWritePin(DigitalPin.P12, 1);//turn on pin 12
    read = pins.analogReadPin(AnalogPin.P13);//read pin 13
    pins.digitalWritePin(DigitalPin.P12, 0);//turn off pin 12
}
input.onButtonPressed(Button.A, function () {
    measure()
    min = read//set minimum with A
    basic.pause(500)
})
input.onButtonPressed(Button.B, function () {
    measure()
    max = read//set maximum with B
    basic.pause(500)
})
basic.forever(function () {
    measure();
    bar = pins.map(read, min, max, 0, 4)//map reading between 0 and 4
    for (let x = 0; x <= 4; x++) {
            led.plot(x, bar)// 
    }
    basic.pause(1000);
})
