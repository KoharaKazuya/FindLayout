const fs = require('fs');

// 対象ディレクトリがなければ終了
if (!fs.existsSync('build')) {
  process.exit();
}

const targetRemoveFiles = fs.readdirSync('build');
targetRemoveFiles.forEach(file => {
  fs.unlinkSync(`build/${file}`);
});

fs.rmdirSync('build');
