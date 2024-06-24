import express from "express";
import request from "supertest";
import { Router } from "express";
const testRoutes = Router();

testRoutes.get('/', (req, res) => {
    res.send("Hello World");
});


export default testRoutes;