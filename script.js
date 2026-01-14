import { readdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get the absolute path to the csvs folder
const csvsFolder = join(__dirname, 'csvs');

// Read all files in the csvs folder
const files = readdirSync(csvsFolder);

// Filter for CSV files and sort by sequence number
const csvFiles = files
  .filter(file => file.endsWith('.csv'))
  .sort((a, b) => {
    const seqA = parseInt(a.match(/^(\d+)_/)?.[1] || '0');
    const seqB = parseInt(b.match(/^(\d+)_/)?.[1] || '0');
    return seqA - seqB;
  });

// Generate SQL commands
const sqlCommands = csvFiles.map(file => {
  // Get absolute path
  const absolutePath = join(csvsFolder, file);
  
  // Extract table name from filename
  // Remove the leading number and underscore, then remove .csv extension
  const tableName = file.replace(/^\d+_/, '').replace('.csv', '');
  
  // Generate the \copy command
  return `\\copy ${tableName} from '${absolutePath}' WITH DELIMITER '|' CSV ENCODING 'UTF8';`;
});

// Join all commands with newlines and write to script.sql
const sqlContent = sqlCommands.join('\n') + '\n';
writeFileSync('script.sql', sqlContent);

console.log(`script.sql has been generated with ${csvFiles.length} commands`);
