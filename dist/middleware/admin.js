"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkAdmin(req, res, next) {
    if (req.body.adminPin === "110703") {
        next();
        return;
    }
    res.status(403).json({ message: "Access denied. Invalid admin PIN." });
    return;
}
exports.default = checkAdmin;
