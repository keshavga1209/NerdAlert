import schedule from 'node-schedule'
import { pingAllUsers } from '../scripts/pingUsers.js';

export const job = schedule.scheduleJob('* * * * 7', function () {
    pingAllUsers()
    // console.log('The answer to life, the universe, and everything!');
});