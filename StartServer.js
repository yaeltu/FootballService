const csvtojson = require("csvtojson");

module.exports = {
    convertCSVToJSON: async (csvPath, isUpcoming) => {
        const jsonArray = await csvtojson().fromFile(csvPath);
        jsonArray.map(object => {
                  isUpcoming?
                     object["status"]= "upcoming" :
                     object["status"]= "played";        
         })
         return jsonArray;  
    },
    
    addTeamAndTournamentIds: (allResultsJson, teamNames, tourNames) => {
        allResultsJson.map(item => {
                //Pushing all teams names to teamNames with no duplicate names
                if(!teamNames.includes(item.home_team)){
                    teamNames.push(item.home_team)
                }
                else if(!teamNames.includes(item.away_team)){
                    teamNames.push(item.away_team)
                }
                //Pushing all tournament names to tourNames with no duplicate names
                if(!tourNames.includes(item.tournament)){
                    tourNames.push(item.tournament)
                }
            })
            
        allResultsJson = allResultsJson.map( item => {
                item["home_team_id"] = teamNames.indexOf(item["home_team"])
                item["away_team_id"] = teamNames.indexOf(item["away_team"])
                item["tournament_id"] = tourNames.indexOf(item["tournament"])

            });
    },


    start: async () => {
        const resultPlayedJson = await module.exports.convertCSVToJSON("./result_played.csv",false);
        const resultUpcomingJson = await module.exports.convertCSVToJSON("./result_upcoming.csv",true);
        const allResultsJson = resultPlayedJson.concat(resultUpcomingJson);
        const teamNames = [];
        const tourNames = [];
        module.exports.addTeamAndTournamentIds(allResultsJson, teamNames, tourNames);
        return [allResultsJson, teamNames, tourNames]; 
    }
}