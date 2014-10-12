class Panda {
    constructor(name) {
        this._name = name || Panda;
        this._happy = false;
    }

    eat(food) {
        this._happy = (food === 'bamboo');
        console.log(`${ this.getName() } ate some ${ food }`);
    }

    getName() {
        return this._name;
    }

    getStatus() {
        var kind = this._happy ? 'happy' : 'sad'
        return `${ this.getName() } is a ${ kind } panda.`;
    }
}

module.exports = Panda;
