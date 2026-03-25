import fs from 'fs/promises';
import path from 'path';

async function saveFile(filePath, folderPath, data) {
    const path = path.join(folderPath, fileName);
    try {
        await fs.writeFile(path, data);
        console.log('File saved successfully');
    } catch (err) {
        console.error('Error saving file:', err);
    }
}

export default saveFile;