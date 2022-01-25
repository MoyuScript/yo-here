
import * as vscode from 'vscode';
import * as path from 'path';
import * as yeoman from 'yeoman-environment';

export function activate(context: vscode.ExtensionContext) {
	
	let cachedGeneratorNames: string[] | null = null;

	const cmd = async (noCache: boolean = false, ...arg: any) => {
		const cwd = path.dirname(arg.fsPath);

		if (noCache || !cachedGeneratorNames) {
			const env = yeoman.createEnv();
			env.lookup();
			cachedGeneratorNames = env.getGeneratorNames();
		}

		const pick = await vscode.window.showQuickPick(cachedGeneratorNames, {
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
	}

	vscode.commands.registerCommand('yo-here.create', cmd);
	vscode.commands.registerCommand('yo-here.createNoCache', cmd);
}

