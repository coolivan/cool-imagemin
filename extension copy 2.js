// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const imagemin = require("imagemin");
const imageminPngquant = require("imagemin-pngquant");
const imageminMozjpeg = require("imagemin-mozjpeg");
// const gulp = require("gulp");
// const imagemin = require("gulp-imagemin");

// npm i imagemin imagemin-pngquant imagemin-mozjpeg

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
    "imagemin.helloWorld",

    function (uri) {
      // The code you place here will be executed every time your command is executed
      console.log(11111);
     
        min(uri).then(()=>{
          vscode.window.showInformationMessage("Hello World from imagemin!");
          console.log({ uri });
      })
      // Display a message box to the user
      //   vscode.window.showInformationMessage("Hello World from imagemin!");
        console.log({ uri },22222);
    }
  );

  context.subscriptions.push(disposable);
}

const min = async (uri) => {
  const files = await imagemin([`${uri.fsPath}/*.{jpg,png}`], {
    destination: `${uri.fsPath}/img`,
    plugins: [
      // imageminJpegtran(),
      imageminMozjpeg({ 
          quality: 75, 
          progressive: true 
        }),
      imageminPngquant({
        quality: [0.6, 0.8],
      }),
    ],
  });
  console.log({files});
}




exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
