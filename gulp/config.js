module.exports = exports = {
    destination: {
        directory: 'public'
    },
    source: {
        server: [ 'server/**/*.js' ],
        client: {
            files: {
                copy: [
                    'client/**/*.html'
                ],
                javascript: [
                    'client/**/*.js',
                    'client/**/*.jsx'
                ],
                stylesheet: [
                    'client/**/*.scss'
                ]
            },
            entry: {
                javascript: 'client/js/app.jsx',
                stylesheet: 'client/sass/app.scss'
            }
        }
    },
    test: {
        server: [ 'server/test/**/*.js' ],
        client: [ 'client/test/**/*.js' ]
    },

    options: {
        mocha: {
            reporter: 'spec',
            ui: 'bdd'
        }
    }
};
