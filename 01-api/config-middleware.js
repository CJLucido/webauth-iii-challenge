const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const sessions = require("express-session");
const KnexSessionStore = require('connect-session-knex')(sessions);


const knex = require('../data/db-config')

const sessionConfig ={
  name: "Sushi Sesh",
  secret: process.env.SECRET,
  saveUninitialized: true, //should happen on an alert allow cookies
  resave: false,


  store: new KnexSessionStore({//DO NOT FORGET THE NEW KEYWORD, because you are getting back a...?
    knex,
    tablename: 'sessions',//optional
    createtable: true, //MUST HAVE
    sidfieldname: 'sid', //MUST HAVE
    clearInterval: 1000 * 60 * 10, //clear expired sessions every 10 minutes, technically optional but control it
  }),

  cookie:{
    maxAge: 1000 * 60 * 10,
    secure: false,
    httpOnly: true
  }



}

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(cookieParser())
  server.use(sessions(sessionConfig))
};
