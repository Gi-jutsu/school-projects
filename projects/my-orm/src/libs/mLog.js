import { join } from "path";
import { writeFile, existsSync, mkdirSync } from "fs";
import moment from "moment";
import mDump from './mDump';

class mLog {
	log(message) {
		const date = moment().format('YYYYMMDD');
		const filename = `${date}.morm.log`;
		const dirname = 'logs';
		const pathLogFile =`./${dirname}/${filename}`;

		if (!existsSync(dirname)){
			mkdirSync(dirname);
		}

		writeFile(pathLogFile, `${moment().format('h:mm:ss')} - ${message}\r\n`, {flag:'a'}, function(err, data) {
			if (err) console.log(err);
		});

		mDump(message);
	}
}

module.exports.logger = new mLog();
