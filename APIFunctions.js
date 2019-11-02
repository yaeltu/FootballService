
module.exports = {
   
getMatchesByTeam :(team , allResultsJson) => {
    if(isNaN(team)){
        return allResultsJson.filter(item => item.home_team === team || item.away_team === team)
    }
    return allResultsJson.filter(item => item.home_team_id == team || item.away_team_id == team)
   
 },

 getMatchesByTeamFilteredByStatus:(team , status , allResultsJson) => {
    const output = module.exports.getMatchesByTeam(team , allResultsJson)
    return output.filter(item => item.status === status);
 },

 getMatchesByTournament: (tournament , allResultsJson) => {
     if(isNaN(tournament)){
        return allResultsJson.filter(item => item.tournament === tournament);
     }
     return allResultsJson.filter(item => item.tournament_id == tournament);
 },

 getMatchesByTournamentFilteredByStatus: (tournament , status, allResultsJson) => {
    const output = module.exports.getMatchesByTournament(tournament, allResultsJson);
    return output.filter(item => item.status === status);
 }
}
 