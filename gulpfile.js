var gulp = require('gulp');
var del = require('del');
var packager = require('electron-packager');
var builder = ( require( 'electron-builder' ) ).init();
var pkg = require('./package.json');
var path = require( 'path' );

var config = {
  dist: {
    base: 'dist',
    osx: 'dist/osx',
    win: 'dist/win'
  },
  app: {
    src: 'app',
    name: 'Traktor-D-Pro-Adapter'
  }
};

gulp.task('default', ['build']);

gulp.task('clean', ['clean:osx', 'clean:win']);

gulp.task('clean:osx', function(done) {
  del([config.dist.osx + '/**'], function (err, paths) {
    console.log('Deleted ' + paths.length + ' files/folders');
    done();
  });
});

gulp.task('clean:win', function(done) {
  del([config.dist.win + '/**'], function (err, paths) {
    console.log('Deleted ' + paths.length + ' files/folders');
    done();
  });
});

gulp.task('build', ['build:osx', 'build:win']);

gulp.task('build:osx', ['clean:osx'], function(done) {
  var opts = {
    dir: config.app.src,
    name: config.app.name,
    platform: 'darwin',
    arch: 'x64',
    version: pkg.devDependencies["electron-prebuilt"],
    icon: 'assets/osx/midi.icns',
    out: config.dist.osx
  };

  packager(opts, function (error) {
    if (error) {
      throw error;
    }

    done();
  });
});

gulp.task('build:win', ['clean:win'], function(done) {
  var opts = {
    dir: config.app.src,
    name: config.app.name,
    platform: 'win32',
    arch: 'ia32',
    version: pkg.devDependencies["electron-prebuilt"],
    icon: 'assets/win/midi.ico',
    out: config.dist.win
  };

  packager(opts, function (error) {
    if (error) {
      throw error;
    }

    done();
  });
});

gulp.task('pack', ['pack:osx', 'pack:win']);

gulp.task('pack:osx', ['build:osx'], function(done) {
  var opts = {
    appPath: path.resolve(path.join(config.dist.osx, config.app.name + '-darwin-x64', config.app.name + '.app')),
    platform: 'osx',
    out: config.dist.osx,
    config: 'packager.json'
  };

  builder.build(opts, function (error) {
    if (error) {
      throw error;
    }

    done();
  });
});

gulp.task('pack:win', ['build:osx'], function(done) {
  var opts = {
    appPath: path.resolve(path.join(config.dist.win, config.app.name + '-win32-ia32')),
    platform: 'win',
    out: config.dist.win,
    config: 'packager.json'
  };

  builder.build(opts, function (error) {
    if (error) {
      throw error;
    }

    done();
  });
});
