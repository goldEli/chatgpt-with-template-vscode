import * as copyPaste from "copy-paste";
import * as vscode from 'vscode';
import * as fs from 'fs';

export function readFileContent(filePath: string): string | undefined {
    try {
        // 使用同步方式读取文件内容
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return fileContent;
    } catch (error) {
        vscode.window.showErrorMessage(`Error reading file: ${error}`);
        return undefined;
    }
}

export const getClipboardText = () => copyPaste.paste();


