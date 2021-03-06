// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const gulp = require("gulp");
const imagemin = require("gulp-imagemin");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "imagemin" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "imagemin.compress",
    async function (uri) {
      // The code you place here will be executed every time your command is executed
      await gulp
        .src(`${uri.fsPath}/*.{jpg,png,gif,svg}`)
        .pipe(
          imagemin([
            imagemin.mozjpeg({ quality: 95, progressive: true }),
            imagemin.pngquant({
              quality: [0.65, 0.9],
              speed: 4,
            }),
            // imagemin.optipng({ optimizationLevel: 5}),
            imagemin.gifsicle({ interlaced: true }),
            imagemin.svgo({
              plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
            })
          ])
        )
        .pipe(gulp.dest(`${uri.fsPath}/../img`));
      // .pipe(vscode.window.showInformationMessage("Hello World from imagemin!"));

      // Display a message box to the user
      //vscode.window.showInformationMessage("Compress Finish!");
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
