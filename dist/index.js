
const EDR1 = require('./EventDemoRunner');

const demoRunner = EDR1.runnerClass.build();

process.on('uncaughtException', (reason) => {
    console.log(reason);
    demoRunner.shutdown('uncaughtException');
});

process.on('unhandledRejection', (reason) => {
    console.log(reason);
    demoRunner.shutdown('unhandledRejection');
});

const test_units = [ 'Unit1a', 'Unit1b' ];

demoRunner.createUnits(test_units).then(() => {
    demoRunner.prepareAllUnits().then(() => {
        console.info('all units ready');
        demoRunner.busyWork().then(() => {
            console.info('fini');
            demoRunner.shutdown('');
        });
    });
});

/*const myUnit1 = require('./unit1.js');
myUnit1.eventEmitter.on( 'ready', () => {
    console.log('Unit 1 is ready.');
});

const myUnit2 = require('./unit2.js');
myUnit2.eventEmitter.on( 'ready', () => {
    console.log('Unit 2 is ready.');
});

const allUnits = [ myUnit1, myUnit2 ];

prepareAllUnits().then(() => {
    console.info('all units ready');
    busyWork().then(() => {
        console.log(`Unit 1: temp:${myUnit1.getTemp()} degree F, pressure:${myUnit1.getPressure()} psi`);
        console.log(`Unit 2: temp:${myUnit2.getTemp()} degree F, pressure:${myUnit2.getPressure()} psi`);
        console.info('fini');
        shutdown('');
    });
});*/


