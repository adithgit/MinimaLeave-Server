exports.checkAdmin = (req, res, next)=>{
    try{
        if(req.session.user.type != 'admin') throw new Error();
        next();
    }
    catch(e){
        res.status(401).send({message: 'access denied'});
    }
}
exports.checkParent = (req, res, next)=>{
    try{
        if(req.session.user.type != 'parent') throw new Error();
        next();
    }
    catch(e){
        res.status(401).send({message: 'access denied'});
    }
}
exports.checkStudent = (req, res, next)=>{
    try{
        if(req.session.user.type != 'student') throw new Error();
        next();
    }
    catch(e){
        console.log("access denied");
        res.status(401).send({message: 'access denied'});
    }
}
exports.checkHod = (req, res, next)=>{
    try{
        if(req.session.user.type != 'hod') throw new Error();
        next();
    }
    catch(e){
        res.status(401).send({message: 'access denied'});
    }
}