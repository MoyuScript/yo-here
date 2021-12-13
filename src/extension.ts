
import * as vscode from 'vscode';
import * as path from 'path';
import * as yeoman from 'yeoman-environment';

export function activate(context: vscode.ExtensionContext) {
	
	vscode.commands.registerCommand('yo-here.create', async (arg) => {
		const env = yeoman.createEnv([], {}, );
		const cwd = path.dirname(arg.path);
		process.chdir(cwd);
		
		env.lookup({
			packagePatterns: ['generator-snippet-*']
		});

		const generators = env.getGeneratorNames();
		
		const pick = await vscode.window.showQuickPick(generators, {
			title: 'Choose a generator'
		});

		if (!pick) {
			return;
		}

		env.run(pick, () => {});
	});
}

