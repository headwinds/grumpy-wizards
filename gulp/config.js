module.exports = exports = {
    destination: {
        directory: 'public'
    },
    source: {
        server: [ 'server/**/*.js' ],
        client: {
            files: {
                copy: [
                    'client/src/**/*.html'
                ],
                javascript: [
                    'client/src/**/*.js',
                    'client/src/**/*.jsx'
                ],
                stylesheet: [
                    'client/src/**/*.scss'
                ]
            },
            entry: {
                javascript: 'client/src/app.jsx',
                stylesheet: 'client/src/app.scss'
            }
        }
    },
    test: {
        server: [ 'server/test/**/*.js' ],
        client: [ 'client/test/**/*.js' ]
    },

    options: {
        autoprefixer: {
            browsers: [ '> 5%', 'last 2 versions' ],
            cascade: false
        },
        minifycss: {
            compatibility: '*'
        },
        mocha: {
            reporter: 'spec',
            ui: 'bdd'
        }
    }
};
