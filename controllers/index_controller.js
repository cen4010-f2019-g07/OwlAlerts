// Home page for Index
exports.index = function(err, req, res, next) {
	if(err)
		next(err);
	res.render('pages/index');
};