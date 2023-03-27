const { response } = require("express")


const isAdminRole = (req, res=response, next) => {
    if(!req.user) return res.status(500).json({msg:'User does not provided a token'});
    
    const { rol, name } = req.user;
    
    if(rol!=='ADMIN_ROLE') return res.status(401).json({msg:`${name} is not admin - Not allowed`})


    next();

}

const userHasRole = ( ...roles ) => {

    return (req, res=response, next) => {

        if(!req.user) return res.status(500).json({msg:'User does not provided a token'});

        if( !roles.includes(req.user.rol) ) {
            return res.status(500).json({msg:`The service require one of this roles: ${roles}`});
        }

        console.info(roles);
        next();
    }
}

module.exports = {
    isAdminRole,
    userHasRole
}