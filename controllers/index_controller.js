exports.index = function(err, req, res, next) {
	console.error(err);
	res.render('pages/index');
}