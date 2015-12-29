# Azure Mobile Apps API Directory

All javascript files in this directory are mounted on the /api endpoint.  If a file is called
_foo.js_ then the endpoint is _/api/foo_.  Follow the normal Azure Mobile Apps API Recipe

## Recipe

```
var api = {};

api.get = function (request, response, next) {
   
};
api.get.access = 'anonymous' | 'authenticated' | 'disabled';

/* repeat for any other verbs */

export default api
```

This is ES2015 code and is transpiled before being used.
