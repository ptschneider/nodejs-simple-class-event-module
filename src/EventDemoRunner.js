const {builtinModules: builtin} = require("node:module");
const StubUnit = require('./StubUnit.js');

const mode = "console";

class EventDemoRunner{

    allUnitNames = [];
    allUnits = [];

    shutdown(key){
        let code = 0;
        if(key.length > 0){
            console.log(`shutdown invoked, key=${key}`);
            code = 1;
        }
        process.exit(code);
    }

    static waitEvent(event){
        return new Promise((resolve, reject) => {
            event.on('ready', resolve);
            event.on('error', reject);
        });
    }

    async AwaitAllUnitsReadyEvent(){
        let pendingUnits = [];
        this.allUnits.forEach( unit => {
            pendingUnits.push(EventDemoRunner.waitEvent(unit.emitter));
        });
        console.log('awaiting *ALL* unit startups before proceeding...');
        await Promise.all(pendingUnits);
    }

    async busyWork(){
        // sleep(3000)
        await new Promise(resolve => setTimeout(resolve, StubUnit.getRandomIntInclusive(750,3000) ));

        this.allUnits.forEach( unit => {
            console.log(`${unit.name}: temp:${unit.temperature} degree F, pressure:${unit.pressure} psi`);
        });
    }

    async createUnits(names){
        this.allUnitNames = names;
        for(let i = 0; i < names.length; i++){
            this.allUnits.push(StubUnit.build(names[i]));
        }
        console.info(`created StubUnits: ${names}`);
    }

    static build(){ return new EventDemoRunner(); }
}

module.exports = {
    runnerClass: EventDemoRunner,
    runnerMode: mode
}

/* Illustrates how module metadata is different on a per-file basis
  setTimeout(() => {
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
