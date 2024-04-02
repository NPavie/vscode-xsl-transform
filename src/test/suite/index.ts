import * as path from 'path';
import * as Mocha from 'mocha';
import { glob } from 'glob';

export function run(): Promise<void> 
{
	// Create the mocha test
	const mocha = new Mocha({ ui: 'tdd', color: true});
	const testsRoot = path.resolve(__dirname, '..');


	return new Promise(async (c, e) => 
	{
		glob('**/**.test.js', { cwd: testsRoot })
			.then(files => files.forEach(f => mocha.addFile(path.resolve(testsRoot, f))))
			.then(() => mocha.run(failures => failures > 0 ? e(new Error(`${failures} tests failed.`)) : c()))
			.catch(err => e(err));
	});
}
