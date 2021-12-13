
import * as vscode from 'vscode';
import * as path from 'path';
import * as yeoman from 'yeoman-environment';

export function activate(context: vscode.ExtensionContext) {
	
	vscode.commands.registerCommand('yo-here.create', async (arg) => {
		const cwd = path.dirname(arg.fsPath);
		
		const env = yeoman.createEnv();
		env.lookup();

		const generators = env.getGeneratorNames();
		
		const pick = await vscode.window.showQuickPick(generators, {
			title: 'Choose a generator'
		});

		if (!pick) {
			return;
		}

		let terminal = vscode.window.terminals.find((v) => v.name === 'yo');

		if (terminal) {
			terminal.dispose();
		}
		terminal = vscode.window.createTerminal({
			name: 'yo',
			cwd
		});
		
		terminal.show(false);
		terminal.sendText(`yo ${pick}`);
	});
}

