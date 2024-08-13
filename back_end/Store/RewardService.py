from Data.DataService import DataService

class RewardService():
    def getRewards(self, team_id):
        return DataService.getRewards(team_id)
    
    def addReward(self,team_id, reward):
        print("REWARD SERVICE",reward)
        DataService.addReward(team_id,reward['rewardTitle'], reward['price'])