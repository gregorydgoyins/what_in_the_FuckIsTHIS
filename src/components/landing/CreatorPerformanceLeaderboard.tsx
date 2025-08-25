import React from 'react';
import { TrendingUp, Star, Award } from 'lucide-react';

interface CreatorData {
  id: string;
  name: string;
  avatar: string;
  performance: number;
  change: number;
  followers: number;
  rating: number;
}

const mockCreatorData: CreatorData[] = [
  {
    id: '1',
    name: 'Stan Lee',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
    performance: 94.5,
    change: 12.3,
    followers: 2500000,
    rating: 4.9
  },
  {
    id: '2',
    name: 'Jack Kirby',
    avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
    performance: 89.2,
    change: 8.7,
    followers: 1800000,
    rating: 4.8
  },
  {
    id: '3',
    name: 'Alan Moore',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
    performance: 86.1,
    change: -2.1,
    followers: 1200000,
    rating: 4.7
  },
  {
    id: '4',
    name: 'Frank Miller',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
    performance: 82.4,
    change: 5.4,
    followers: 950000,
    rating: 4.6
  },
  {
    id: '5',
    name: 'Neil Gaiman',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
    performance: 79.8,
    change: 3.2,
    followers: 800000,
    rating: 4.5
  }
];

export function CreatorPerformanceLeaderboard() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Top Performing Creators</h2>
        <div className="flex items-center text-blue-600">
          <Award className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">This Week</span>
        </div>
      </div>

      <div className="space-y-4">
        {mockCreatorData.map((creator, index) => (
          <div
            key={creator.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <span className={`
                  text-lg font-bold w-6 h-6 flex items-center justify-center rounded-full text-white
                  ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-600' : 'bg-blue-500'}
                `}>
                  {index + 1}
                </span>
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800">{creator.name}</h3>
                <p className="text-sm text-gray-600">
                  {(creator.followers / 1000000).toFixed(1)}M followers
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(creator.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{creator.rating}</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-bold text-gray-800">
                  {creator.performance}%
                </div>
                <div className={`
                  flex items-center text-sm font-medium
                  ${creator.change >= 0 ? 'text-green-600' : 'text-red-600'}
                `}>
                  <TrendingUp className={`w-4 h-4 mr-1 ${creator.change < 0 ? 'rotate-180' : ''}`} />
                  {Math.abs(creator.change)}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Performance based on stock price movement, volume, and sentiment</span>
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            View All Rankings →
          </button>
        </div>
      </div>
    </div>
  );
}