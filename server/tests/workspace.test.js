// src/add.test.js
import { describe, it, expect } from 'vitest';
import loadDir from '../src/loadDir';
import path from "node:path";

describe('load workspace', () => {
    it('loads workspace', async () => {
        const workspacePath = path.join(process.cwd(), 'workspace');
        const result = await loadDir(workspacePath);
        console.log(JSON.stringify(result));
    });
});