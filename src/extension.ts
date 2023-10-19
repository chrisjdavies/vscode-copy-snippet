'use strict';

import * as os from 'os';
import * as path from 'path';
import * as vscode from 'vscode';

import * as copy from 'copy-paste';

const DEFAULT_INDENT = '     ';
const DEFAULT_CONTINUATION = '...';

function getFilePath(editor: vscode.TextEditor): string {
	const filePath = editor.document.fileName;
	const folders = vscode.workspace.workspaceFolders;

	if (folders) {
		return path.relative(folders[0].uri.fsPath, filePath);
	}

	return filePath;
}

function copySnippet(includePath: boolean = false) {
	const editor = vscode.window.activeTextEditor;

	if (!editor) {
		return;
	}

	const config = vscode.workspace.getConfiguration('copy-snippet');
	const indent = config.get<string>('indentation') || DEFAULT_INDENT;

	const document = editor.document;
	let body = '';

	if (includePath) {
		body += `${indent}[${getFilePath(editor)}]` + os.EOL;
	}

	const numberWidth = Math.ceil(Math.log10(document.lineCount + 1));
	const selections = Array.from(editor.selections).sort((a, b) => a.start.line - b.start.line);

	const continuation = (config.get<string>('continuationString') || DEFAULT_CONTINUATION).padStart(numberWidth);

	selections.forEach((selection, idx) => {
		if (idx > 0) {
			body += `${indent}${continuation}${os.EOL}`;
		}

		for (let n = selection.start.line; n <= selection.end.line; ++n) {
			body += `${indent}${('' + (n + 1)).padStart(numberWidth)} ${document.lineAt(n).text}${os.EOL}`;
		}
	});

	copy.copy(body);
}

export function activate(context: vscode.ExtensionContext) {
	let commands = [
		vscode.commands.registerCommand('copy-snippet.copy-with-path', () => { copySnippet(true); }),
		vscode.commands.registerCommand('copy-snippet.copy', () => { copySnippet(); })
	];

	commands.forEach((cmd) => context.subscriptions.push(cmd));
}

export function deactivate() {}