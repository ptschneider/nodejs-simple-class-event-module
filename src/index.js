
const EDR1 = require('./EventDemoRunner');
const {builtinModules: builtin} = require("node:module");

const demoRunner = EDR1.runnerClass.build();

process.on('uncaughtException', (reason) => {
    console.log(reason);
    demoRunner.shutdown('uncaughtException');
});

process.on('unhandledRejection', (reason) => {
    console.log(reason);
    demoRunner.shutdown('unhandledRejection');
});

// demoRunner.showMyEnv();

const test_units = [ 'Unit1a', 'Unit1b', 'Unit2a', 'Unit2b' ];

demoRunner.createUnits(test_units).then(() => {
    demoRunner.AwaitAllUnitsReadyEvent().then(() => {
        console.info('all units ready');
        demoRunner.busyWork().then(() => {

            // Commander is a CLI library for Node.js

            const { Command } = require('commander');
            const program = new Command();

            program.name('simple04')
                .description('simple demo')
                .version('0.0.1');

            program.command('whatunits')
                .description('show unit names')
                .action((options,command) => {
                    console.info('----------------------------------------');
                    console.info(`command:whatunits`);
                    console.info(`${demoRunner.allUnitNames}`);
                    //console.info('----------------------------------------');
                });

            program.parseAsync().then(() => {
                //console.info('fini');
                demoRunner.shutdown('');
            });

        });
    });
});

/*setTimeout(() => {
    console.info('----------------------------------------');
    console.info(`__filename=[${__filename}]`);
    console.info(`__dirname=[${__dirname}]`);
    console.info('require.main:');
    console.info(require.main);
    //const {builtinModules: builtin} = require("node:module");
    const builtin = require('node:module').builtinModules;

    console.info(`module.builtinModules=[${builtin}]`);
    console.info(`module.filename=[${module.filename}]`);
    console.info(`module.id=[${module.id}]`);
    console.info('----------------------------------------');
}, 5 );*/


