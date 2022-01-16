import * as vscode from 'vscode';

let on = true;
let count = 1;

function activate(context: vscode.ExtensionContext) {
  console.log('mouse-trap activated!');

  let disposable = vscode.commands.registerCommand('mouse-trap.toggle', () => {
    on = !on;
    vscode.window.showInformationMessage(`Toggled ${on ? 'On' : 'Off'}`);
  });

  vscode.window.onDidChangeTextEditorSelection((event) => {
    if (on) {
      mouseTrackerCallback(event);
    }
  });

  context.subscriptions.push(disposable);
}

function deactivate() {
  console.log('mouse-trap deactivated!');
}

function mouseTrackerCallback(event: vscode.TextEditorSelectionChangeEvent) {
  if (event.kind === vscode.TextEditorSelectionChangeKind.Mouse) {
    vscode.window.showInformationMessage(
      `Really, mouse again? (failure count: ${count})`
    );
    count++;
  }
}

export { activate, deactivate };
