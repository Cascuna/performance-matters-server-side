# performance-matters-server-side

## Scope of project

## Requirements
`npm` version tested: `v5.7.1`  
`node` version tested: `v8.9.4`  
[node-gyp](https://github.com/nodejs/node-gyp) version tested: `v3.6.2`

## How to setup
1. `` npm -v && node -v && node-gyp -v `` to ensure you have the requirements
1. `` npm install `` 
  * If you experience the fsevents bug, try `` npm install -no-optional ``
1. `` npm start `` 

## Tooling
As tooling i've used `browserify`, `js-uglify` && `nodemon`  
Browserify to bundle the client-side javascript  
js-uglify to compress this bundle  
Nodemon as a change watcher  
'npm' to orchestrate the script calling, making it possible to run them with 1 command.

## Performance
### Setup
For the testing i've used Chrome and it's developer tools, especially the audit tool.
### Results
Firstly I converted my css to critical css. Since the css is fairly small & everything is needed, i went ahead and added all css to [main.html](templates/main.html). However, I would love to look into [automating](https://github.com/addyosmani/critical) this step, together with [css minifying](https://www.npmjs.com/package/css-minify)   
which improved the first render (picture) by .2 seconds
