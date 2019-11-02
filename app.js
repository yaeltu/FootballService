
const express = require("express");
const app = express();
const APIFunctions = require("./APIFunctions");
const startServer = require("./StartServer");

var allResultsJson = [];
var teams = [];
var tours = [];

app.get("/", function(req,res){
    res.send("Welcome to my Football Service!");
})

app.get("/matches/teams", function(req,res){
    res.json(teams);
})

app.get("/matches/tours", function(req,res){
    res.json(tours);
})

app.get("/matches/team/:team", function(req,res){
    const team = req.params.team;
    res.json(APIFunctions.getMatchesByTeam(team, allResultsJson));
})

app.get("/matches/team/:team/:status", function(req,res){
    const team = req.params.team;
    const status = req.params.status;
    res.json(APIFunctions.getMatchesByTeamFilteredByStatus(team , status, allResultsJson));
})

app.get("/matches/tour/:tour", function(req,res){
    const tour = req.params.tour;
    res.json(APIFunctions.getMatchesByTournament(tour , allResultsJson));
})

app.get("/matches/tour/:tour/:status", function(req,res){
    const tour = req.params.tour;
    const status = req.params.status;
    res.json(APIFunctions.getMatchesByTournamentFilteredByStatus(tour , status, allResultsJson));
})

app.get("*", function(req,res){
    res.send("Page does not exist");
})

app.listen(3000, () => {
    startServer.start().then( result => {
        allResultsJson = result[0];
        teams = result[1];
        tours = result[2];
        console.log("server is listening!");
    });
    
})


