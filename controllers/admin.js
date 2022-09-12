const express = require("express");
const adminServices = require("../services/admin");

// Private Routes


exports.register = async (req, res)=>{
    try{
        if(!req.body.ADMIN_KEY) throw new Error();

        const key = req.body.ADMIN_KEY;
        const result = await adminServices.createAdmin(req.body, key);
        res.status(200).send({message: 'admin created', data: result});
    }
    catch(e){
        console.log(e);
        res.status(500).send({message: 'cannot create admin', data: e.toString()});
    }
}


exports.login = async (req, res)=>{
    try{
        const result = await adminServices.loginAdmin(req.body);
        req.session.user = {
            username: result.username,
            type:'admin',
        }
        res.status(200).send({message: 'admin logged in', data: result});
    }
    catch(e){
        res.status(500).send({message: 'login error', data: e});
    }
}

exports.addHod = async (req, res)=>{
    try{
        const result = await adminServices.addHod(req.body);
        res.status(200).send({message: 'Hod added', data: result});
    }
    catch(e){
        res.status(500).send({message: 'creation error', data: e});
    }
}

exports.addParent = async (req, res)=>{
    try{
        const result = await adminServices.addParent(req.body);
        res.status(200).send({message: 'parent added', data: result});
    }
    catch(e){
        res.status(500).send({message: 'creation error', data: e});
    }
}

exports.addStudent = async (req, res)=>{
    try{
        const result = await adminServices.addStudent(req.body);
        res.status(200).send({message: 'student added', data: result});
    }
    catch(e){
        res.status(500).send({message: 'creation error', data: e});
    }
}

exports.removeHod = async (req, res)=>{
    try{
        console.log(req.body)
        const result = await adminServices.removeHod(req.body);
        res.status(200).send({message: 'hod removed', data: result});
    }
    catch(e){
        res.status(500).send({message: 'removal error', data: e});
    }
}

exports.removeParent = async (req, res)=>{
    try{
        const result = await adminServices.removeParent(req.body);
        res.status(200).send({message: 'parent removed', data: result});
    }
    catch(e){
        res.status(500).send({message: 'removal error', data: e});
    }
}

exports.removeStudent = async (req, res)=>{
    try{
        const result = await adminServices.removeStudent(req.body);
        res.status(200).send({message: 'student removed', data: result});
    }
    catch(e){
        res.status(500).send({message: 'removal error', data: e});
    }
}

