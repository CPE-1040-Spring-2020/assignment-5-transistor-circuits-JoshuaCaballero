let min_ave = 1023;
let max_ave = 0;
let read = 0;
let bar = 0;
let max_total = 0;
let min_total = 0;
function measure() {
    pins.digitalWritePin(DigitalPin.P12, 1);//turn on pin 12
    read = pins.analogReadPin(AnalogPin.P13);//read pin 13
    pins.digitalWritePin(DigitalPin.P12, 0);//turn off pin 12
}
input.onButtonPressed(Button.A, function () {
    for (let count = 0; count < 3; count++) {
        measure();
        max_total += read;
        basic.pause(100)
    }
    max_ave = max_total / 3;
})
input.onButtonPressed(Button.B, function () {
    for (let count = 0; count < 3; count++) {
        measure();
        min_total += read;
        basic.pause(100)
    }
    min_ave = min_total / 3;
})
basic.forever(function () {
    measure();
    bar = pins.map(read, min_ave, max_ave, 0, 4)//map reading between 0 and 4
    for (let x = 0; x <= 4; x++) {
        led.plot(x, bar)
    }
    basic.pause(1000);
})
