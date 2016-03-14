
**Setup**

  $ npm install
  $ npm install watchify -g
  $ npm install live-server -g

**Livereload**

  $ watchify index.js -t babelify -o public/bundle.js

  $ live-server public/
