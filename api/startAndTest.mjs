import { config } from 'dotenv';
import { exec } from 'child_process';

config();

const LOCAL_PORT = process.env.LOCAL_PORT;
const command = `start-server-and-test start http://127.0.0.1:${LOCAL_PORT}/items test`;

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
    }
    console.log(`Stdout: ${stdout}`);
});
