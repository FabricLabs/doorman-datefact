module.exports = function (Doorman) {
	return {
		commands: [
			'datefact'
		],
		'datefact': {
			usage: '<Question>',
			description: 'Gives a Random Date Fact.',
			process: (msg, suffix, isEdit, cb) => {
				request('http://numbersapi.com/random/date?json',
					function (err, res, body) {
						try {
							if (err) throw err;
							var data = JSON.parse(body);
							if (data && data.text) {
								cb({
									embed: {
										color: Doorman.Config.discord.defaultEmbedColor,
										title: 'Date Fact',
										description: data.text
									}
								}, msg);
							}
						} catch (err) {
							var msgTxt = `command date_fact failed :disappointed_relieved:`;
							if (Doorman.Config.debug) {
								msgTxt += `\n${err.stack}`;

								Doorman.logError(err);
							}
							cb(msgTxt, msg);
						}
					});
			}
		}
	}
}