module.exports = exports = {
    source: {
        server: [ 'server/**/*.js' ],
    },
    test: {
        server: [ 'test/**/*.js' ]
    },

    options: {
        mocha: {
            reporter: 'spec',
            ui: 'bdd'
        }
    }
};
