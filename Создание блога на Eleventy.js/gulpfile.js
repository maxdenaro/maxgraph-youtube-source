const {src, dest} = require('gulp');
const ftp = require('vinyl-ftp');


const deploy = () => {
	let conn = ftp.create({
		host: 'your_host',
		user: 'your_user',
		password: 'your_pass',
		parallel: 10,
	});

	let globs = [
		'_site/**'
	];

	return src(globs, {
		base: './_site',
		buffer: false
	})
		.pipe(conn.dest('your_path'));
};

exports.deploy = deploy;
