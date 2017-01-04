# grummpy-wizards

This repo explores how to build modern web applications with NodeJS, Express, Azure, and React/Redux

### why are there multiple eslintrc files?

If you have multiple .eslintrc files, the ones lower down in the directory tree inherit from above. So, you can have one main one, then one for client and one for server with separate settings (JSX in one, Node in the other, for example).

### Adding SASS Support to Webpack

After you clone the repo, make sure you checkout the sass-loader branch:

```
git fetch origin sass-loader:sass-loader 
git checkout sass-loader
```

### getting started

Once you have the sass-loader branch, you can install it:

```
npm install     
npm install sqlite3     
npm start    
```

### tutorial

[Tutorial](https://shellmonger.com/2016/01/19/adding-sass-support-to-webpack/)