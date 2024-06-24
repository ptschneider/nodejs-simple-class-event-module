
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

demoRunner.showMyEnv();

const test_units = [ 'Unit1a', 'Unit1b', 'Unit2a', 'Unit2b' ];

demoRunner.createUnits(test_units).then(() => {
    demoRunner.AwaitAllUnitsReadyEvent().then(() => {
        console.info('all units ready');
        demoRunner.busyWork().then(() => {
            console.info('fini');
            demoRunner.shutdown('');
        });
    });
});




