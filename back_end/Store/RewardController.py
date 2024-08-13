from flask import Flask, Blueprint, request, jsonify,Response,stream_with_context

from flask_cors import CORS

reward_bp = Blueprint('reward_bp', __name__)

CORS(reward_bp)

@reward_bp.route('/rewards/<team_id>', methods=['GET'])
def get_rewards(team_id):
    from .RewardService import RewardService
    rewards = RewardService().getRewards(team_id)
    return jsonify(rewards)

@reward_bp.route('/rewards/<team_id>', methods=['POST'])
def add_reward(team_id):
    from .RewardService import RewardService
    data = request.get_json()
    RewardService().addReward(team_id, data)
    return jsonify({'message': 'Reward added successfully'})