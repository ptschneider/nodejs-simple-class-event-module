const EventEmitter = require('node:events');
const {builtinModules: builtin} = require("node:module");
class StubUnit{

    emitter = new EventEmitter();
    temperature = StubUnit.MIN_TEMPERATURE();
    pressure = StubUnit.MIN_PRESSURE();
    name = 'noname';

    static getRandomIntInclusive(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    }

    static MAX_TEMPERATURE () { return 1600; }
    static MIN_TEMPERATURE () { return 70; }
    static MAX_PRESSURE () { return 3000; }
    static MIN_PRESSURE () { return 0; }

    static build(name){
        const newObj = new StubUnit();
        try{
            newObj.temperature = StubUnit.getRandomIntInclusive(StubUnit.MIN_TEMPERATURE(),StubUnit.MAX_TEMPERATURE());
            newObj.pressure = StubUnit.getRandomIntInclusive(StubUnit.MIN_PRESSURE(),StubUnit.MAX_PRESSURE());
            newObj.name = name;
            setTimeout(() => {
                newObj.emitter.emit('ready');
            }, StubUnit.getRandomIntInclusive(50,3000) );
        }
        catch(ex){
            setTimeout(() => {
                newObj.emitter.emit('error');
            }, StubUnit.getRandomIntInclusive(50,3000) );
        }
        return newObj;
    }
}

module.exports = StubUnit

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
