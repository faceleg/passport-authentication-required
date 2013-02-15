/**
 * Checks whether a user is authenticated, if they are call next.
 * Otherwise serve the appropriate content.
 *
 * @param  {Function|null} renderer A function to call when HTML is to be served.
 *                                  Called with the arguments: "401, req, res"
 */
module.exports = function authenticationRequired(renderer) {
    return function(req, res, next) {
        if (!req.isAuthenticated()) {
            res.status(401);
            if (req.accepts('html')) {
                if (renderer)  {
                    return renderer.render('401', res.send, res);
                }
                return res.send('Unauthorized');
            }
            if (req.accepts('json')) {
                res.send({ error: 'Unauthorized' });
                return;
            }
            res.type('txt').send('Unauthorized');
            return;
        }
        return next();
    };
};
