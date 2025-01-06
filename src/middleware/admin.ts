import { Request, Response, NextFunction } from "express";

function checkAdmin(req : Request, res : Response, next : NextFunction) {
    if (req.body.adminPin === "110703") {
        next(); 
        return;
    }
    res.status(403).json({ message: "Access denied. Invalid admin PIN." }); 
    return;
}

export default checkAdmin