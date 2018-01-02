var path = require('path');
var tl = require('vso-task-lib');

var echo = new tl.ToolRunner(tl.which('echo', true));

var msg = tl.getInput('msg', true);
echo.arg(msg);

var cwd = tl.getPathInput('cwd', false);

// will error and fail task if it doesn't exist
tl.checkPath(cwd, 'cwd');
tl.cd(cwd);

//rj
var vars = tl.getVariables();
for (var i = 0; i < vars.length; i++) {
  var v = vars[i];
  tl.debug('Publishing variable: ' + v.name);
}

echo.exec({ failOnStdErr: false})
.then(function(code) {
    tl.exit(code);
})
.fail(function(err) {
    console.error(err.message);
    tl.debug('taskRunner fail');
    tl.exit(1);
})
