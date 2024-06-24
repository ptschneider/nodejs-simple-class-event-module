const {builtinModules: builtin} = require("node:module");
const StubUnit = require('./StubUnit.js');

const mode = "console";

class EventDemoRunner{

    allUnits = [];
    showMyEnv(){
        console.info(`__filename=[${__filename}]`);
        console.info(`__dirname=[${__dirname}]`);
        console.info('require.main:');
        console.info(require.main);
        //const {builtinModules: builtin} = require("node:module");
        const builtin = require('node:module').builtinModules;

        console.info(`module.builtinModules=[${builtin}]`);
        console.info(`module.filename=[${module.filename}]`);
        console.info(`module.id=[${module.id}]`);
    }

    shutdown(key){
        console.log(`shutdown invoked, key=${key}`);
        const code = key.length > 0 ? 1 : 0;
        process.exit(code);
    }

    static waitEvent(event){
        return new Promise((resolve, reject) => {
            event.on('ready', resolve);
            event.on('error', reject);
        });
    }

    async prepareAllUnits(){
        let pendingUnits = [];
        this.allUnits.forEach( unit => {
            pendingUnits.push(EventDemoRunner.waitEvent(unit.eventEmitter));
        });
        console.log('awaiting unit startups before proceeding...');
        await Promise.all(pendingUnits);
    }

    async busyWork(){
        // sleep(3000)
        await new Promise(resolve => setTimeout(resolve, 3000));

        this.allUnits.forEach( unit => {
            console.log(`${unit.name}: temp:${unit.temperature} degree F, pressure:${unit.pressure} psi`);
        });
    }

    async createUnits(names){
/*        const unit1a = require('./unit1');
        unit1a.setName('unit1a');
        this.allUnits.push(unit1a);

        const unit1b = require('./unit1');
        unit1b.setName('unit1b');
        this.allUnits.push(unit1b);*/

        for(let i = 0; i < names.length; i++){
            this.allUnits.push(StubUnit.build(names[i]));
        }

    }

    static build(){ return new EventDemoRunner(); }
}

module.exports = {
    runnerClass: EventDemoRunner,
    runnerMode: mode
}
