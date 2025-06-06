export const roleCheck = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user?.roleCheck

        if(!userRole) return res.status(401).json({message: 'user role not found'})

        if(!allowedRoles) return res.status(403).json({message: 'access denied'})

        next()
    }
}