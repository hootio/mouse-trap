import * as vscode from 'vscode';

let on = true;
let count = 1;

function getSassyMessage() {
  // we could show messages less frequently
  if (count < 10) {
    return `You have used the mouse ${count} times`;
  } else if (count < 20) {
    return `You might be a heavy mouse user, already used the mouse ${count} times.`;
  } else if (count === 20) {
    return `This isn't working. It's me, it's not you. Maybe turn it off?`;
  } else if (count < 50) {
    return `Really, mouse? Again? (failure count: ${count})`;
  } else if (count === 50) {
    return `You score is: 50! I will stop bombarding you with messages unless you hit 100, which you won't, right?`;
  } else if (count < 100) {
    return null;
  } else if (count === 100) {
    return `Used the mouse 100 times, are you even trying?`;
  } else if (count < 200) {
    return `What if you used duct tape for the mouse? (failure count: ${count})`;
  } else if (count === 300) {
    return `What if you duct taped the mouse? Just an idea ¯\_(ツ)_/¯`;
  } else {
    return `Used the mouse ${count} times`;
  }
}

function activate(context: vscode.ExtensionContext) {
  console.log('mouse-trap activated!');

  let disposable = vscode.commands.registerCommand('mouse-trap.toggle', () => {
    on = !on;
    const currentState = on ? 'On' : 'Off';
    const oppositeState = on ? 'Off' : 'On';
    const actionButton = `Turn it back ${oppositeState}`;
    const message = `Toggled ${currentState}. You can alway run "MouseTrap: Toggle On/Off"`;
    vscode.window.showInformationMessage(message, {}, actionButton).then(action => {
      action === actionButton && vscode.commands.executeCommand('mouse-trap.toggle');
    });
  });

  vscode.window.onDidChangeTextEditorSelection(event => on && mouseTrackerCallback(event));

  context.subscriptions.push(disposable);
}

function deactivate() {
  console.log('mouse-trap deactivated!');
}

function mouseTrackerCallback(event: vscode.TextEditorSelectionChangeEvent) {
  if (event.kind === vscode.TextEditorSelectionChangeKind.Mouse) {
    const sassyPopupMessage = getSassyMessage();
    if (sassyPopupMessage) {
      const popUp = vscode.window.showInformationMessage(sassyPopupMessage, {}, 'Turn Off');
      popUp.then(action => {
        if (action === 'Turn Off') {
          vscode.commands.executeCommand('mouse-trap.toggle');
        }
      });
      ``;
    }

    count++;
  }
}

export { activate, deactivate };
