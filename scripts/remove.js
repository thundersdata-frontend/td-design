/**
 * 删除build之后lib文件夹下的所有md文件，以减少npm体积
 */
const glob = require('glob');
const fs = require('fs');

function remove(dir) {
  glob(dir, (err, files) => {
    if (err) throw err;
    files.forEach(filename => {
      fs.unlink(filename, err => {
        if (err) throw err;
        console.log('成功删除:' + filename);
      });
    });
  });
}

remove('packages/*/lib/**/*.md');
remove('packages/*/lib/**/*.js.map');
