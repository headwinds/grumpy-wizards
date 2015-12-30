var OFF = 0, WARN = 1, ERROR = 2;

module.exports = exports = {
    env: {
        'es6': true,
        'browser': true
    },
    ecmaFeatures: {
        'jsx': true,
        'modules': true
    },
    plugins: [
        'react'
    ],
    rules: {
        'jsx-quotes': [ WARN, 'prefer-double' ],
        'react/display-name': [ WARN, { acceptTranspilerName: true } ],
        'react/forbid-prop-types': WARN,
        'react/jsx-boolean-value': [ WARN, 'always' ],
        'react/jsx-closing-bracket-location': [ WARN, 'tag-aligned' ],
        'react/jsx-curly-spacing': [ ERROR, 'never' ],
        'react/jsx-handler-names': [ ERROR, { eventHandlerPrefix: 'on' } ],
        'react/jsx-indent-props': [ WARN, 4 ],
        'react/jsx-key': ERROR,
        'react/jsx-max-props-per-line': [ WARN, 4 ],
        'react/jsx-no-bind': ERROR,
        'react/jsx-no-duplicate-props': [ ERROR, { ignoreCase: true }],
        'react/jsx-no-literals': WARN,
        'react/jsx-no-undef': ERROR,
        'react/jsx-pascal-case': ERROR,
        'react/jsx-sort-prop-types': [ WARN, { callbacksLast: true, ignoreCase: true } ],
        'react/jsx-sort-props': OFF,
        'react/jsx-uses-react': WARN,
        'react/jsx-uses-vars': WARN,
        'react/no-danger': ERROR,
        'react/no-deprecated': ERROR,
        'react/no-did-mount-set-state': [ WARN, 'allow-in-func' ],
        'react/no-did-update-set-state': [ WARN, 'allow-in-func' ],
        'react/no-direct-mutation-state': ERROR,
        'react/no-is-mounted': ERROR,
        'react/no-multi-comp': ERROR,
        'react/no-set-state': OFF,
        'react/no-string-refs': ERROR,
        'react/no-unknown-property': ERROR,
        'react/prefer-es6-class': [ ERROR, 'always' ],
        'react/prop-types': ERROR,
        'react/react-in-jsx-scope': WARN,
        'react/require-extension': OFF,
        'react/self-closing-comp': WARN,
        'react/sort-comp': WARN,
        'react/wrap-multilines': WARN
    }
};
