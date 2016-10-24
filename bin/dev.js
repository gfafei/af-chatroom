//使用时无法杀死进程，不知道是不是因为操作系统的关系
'use strict'

const path = require('path');
const cp = require('child_process');
const chokidar = require('chokidar');

const watcher = chokidar.watch(path.join(__dirname, '../server/'));

let appIns = cp.fork(path.join(__dirname, '../server/app.js'));
appIns.on('exit', code => {
    if (code === 10601) {
        console.log('main applicatiton connect database fail');
        process.exit(0);
    }
});

function reload(app) {
    app.kill('SIGINT');
    return cp.fork(require('path').join(__dirname, '../server/app.js'));
}

watcher.on('ready', () => {
    watcher.on('change', () => {
        console.log('<---- watched file change, restart server ---->');
        appIns = reload(appIns);
    });

    watcher.on('add', () => {
        console.log('<---- watched new file add, restart server ---->');
        appIns = reload(appIns);
    });

    watcher.on('unlink', () => {
        console.log('<---- watched file remove, do something ---->');
        appIns = reload(appIns);
    });
});

process.on('SIGINT', () => {
    process.exit(0);
});
