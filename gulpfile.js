var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var run = require('gulp-run');
var appDev = 'client/app/';
var appProd = 'client/public/js/app/';
var vendor = 'client/public/js/vendor';
var mongoose = require('mongoose');
var db = require('./config').db;
var createUser = require('./dbscripts/createUser');

/* JS & TS */
var typescript = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');

var tsProject = typescript.createProject('tsconfig.json');

gulp.task('build-ts', function () {
    return gulp.src(appDev + '**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(appProd));
});

gulp.task('build-copy', function () {
    return gulp.src([appDev + '**/*.html', appDev + '**/*.htm', appDev + '**/*.css'])
        .pipe(gulp.dest(appProd));
});

function print() {
    return {
        next:function (entry) {
            console.log(entry.name);
        }
    };
}

gulp.task('print', function() {
    return gulp.src(appDev + '**/*.ts').pipe(print());
});

gulp.task('vendor', function() {

    // Angular 2 Framework
    gulp.src('node_modules/@angular/**')
        .pipe(gulp.dest(vendor + '/@angular'));

    //ES6 Shim
    gulp.src('node_modules/es6-shim/**')
        .pipe(gulp.dest(vendor + '/es6-shim/'));

    //reflect metadata
    gulp.src('node_modules/reflect-metadata/**')
        .pipe(gulp.dest(vendor + '/reflect-metadata/'));

    //rxjs
    gulp.src('node_modules/rxjs/**')
        .pipe(gulp.dest(vendor + '/rxjs/'));

    //systemjs
    gulp.src('node_modules/systemjs/**')
        .pipe(gulp.dest(vendor + '/systemjs/'));

    //zonejs
    return gulp.src('node_modules/zone.js/**')
        .pipe(gulp.dest(vendor + '/zone.js/'));
});

gulp.task('dist', function () {
    gulp.src('client/public/**/*')
        .pipe(gulp.dest('../dist/client/public'));

    gulp.src('client/app/**/*')
        .pipe(gulp.dest('../dist/client/app'));

    gulp.src('server/bin/**/*')
        .pipe(gulp.dest('../dist/server/bin'));

    gulp.src('server/models/**/*')
        .pipe(gulp.dest('../dist/server/models'));

    gulp.src('server/routes/**/*')
        .pipe(gulp.dest('../dist/server/routes'));

    gulp.src('server/*.js')
        .pipe(gulp.dest('../dist/server'));

    gulp.src('client/views/**/*')
        .pipe(gulp.dest('../dist/client/views'));

    gulp.src('client/*.json')
        .pipe(gulp.dest('../dist/client'));
    
    gulp.src('common/*.js')
        .pipe(gulp.dest('../dist/common'));
    
    gulp.src('*.json')
        .pipe(gulp.dest('../dist'));
    
    gulp.src('config.js')
        .pipe(gulp.dest('../dist'));

    gulp.src('typings.d.ts')
        .pipe(gulp.dest('../dist'));
    
    return gulp.src('server/index.js')
        .pipe(gulp.dest('../dist/server'));

});

gulp.task('watch', function () {
    gulp.watch(appDev + '**/*.ts', ['build-ts']);
    gulp.watch(appDev + '**/*.{html,htm,css}', ['build-copy']);
});

gulp.task('mongostart', function() {
    return run('start mongod --dbpath D:/mongo').exec(function () {
        setTimeout(function () {
            mongoose.connection.on('connected', function () {
                console.log('Mongoose default connection open to ' + db);
            });

            mongoose.connection.on('error',function (err) {
                console.log('Mongoose default connection error: ' + err);
            });

            mongoose.connect(db, function (error) {
                console.log('connect ' + db);
                if(error)
                    throw error;
                createUser();
            });
        }, 1000);
    });
});

gulp.task('tests', function() {
    gulp.src('tests/*')
        .pipe(jasmine());
    gulp.src('common/tests/*')
        .pipe(jasmine());
});

gulp.task('gulp', ['build-ts', 'build-copy', 'mongostart']);
gulp.task('build', ['vendor', 'gulp', 'dist']);
gulp.task('build-sub', ['vendor', 'build-ts', 'build-copy']);
