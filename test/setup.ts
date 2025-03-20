import { exec } from 'child_process';
import { promisify } from 'util';
import { config } from 'dotenv';

const execPromise = promisify(exec);

config({ path: '.env.test' });                      // Get database credentials from the .env.test file

const runMigrations = async () => {
  try {
    await execPromise('npm run migrate:test');      // Run the migration script to apply migrations to the test database
    console.log('Migrations applied successfully');
  } catch (error) {
    console.error('Error applying migrations:', error);
    process.exit(1);
  }
};

// Export a function that Jest will call
export default async () => {
    await runMigrations();
};
