const routeGuard = (accessMatrix) => {
    return (req, res, next) => {

        if (req.authInfo.roles === undefined) {
            return res.status(403).json({error: 'No roles claim found!'});
        } else {
            const roles = req.authInfo['roles'];

            if (req.path === accessMatrix.radicarMedida.path) {
                if (accessMatrix.radicarMedida.methods.includes(req.method)) {

                    let intersection = accessMatrix.radicarMedida.roles
                        .filter(role => roles.includes(role));

                    if (intersection.length < 1) {
                        return res.status(403).json({error: 'User does not have the role'});
                    }
                } else {
                    return res.status(403).json({error: 'Method not allowed'});
                }
            } else if (req.path === accessMatrix.someterMedida.path) {
                if (accessMatrix.someterMedida.methods.includes(req.method)) {

                    let intersection = accessMatrix.someterMedida.roles
                        .filter(role => roles.includes(role));

                    if (intersection.length < 1) {
                        return res.status(403).json({error: 'User does not have the role'});
                    }   
                } else {
                    return res.status(403).json({error: 'Method not allowed'});
                }
            } else {
                return res.status(403).json({error: 'Unrecognized path'});
            }
        }
    
        next();
    }
}