import React, { useState } from 'react';
import { Target, ChevronRight, ChevronLeft, BarChart3, Shield, TrendingUp, Award } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface QuizQuestion {
  id: number;
  question: string;
  options: Array<{ text: string; score: number }>;
}

interface RiskProfile {
  level: 'Conservative' | 'Moderate' | 'Aggressive';
  description: string;
  allocation: Array<{ name: string; value: number; color: string }>;
  expectedReturn: number;
  volatility: number;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is your primary investment goal?",
    options: [
      { text: "Preserve capital with steady growth", score: 1 },
      { text: "Balance growth with moderate risk", score: 2 },
      { text: "Maximize returns despite higher risk", score: 3 }
    ]
  },
  {
    id: 2,
    question: "How would you react to a 20% portfolio decline?",
    options: [
      { text: "Sell immediately to prevent further losses", score: 1 },
      { text: "Hold and wait for recovery", score: 2 },
      { text: "Buy more at lower prices", score: 3 }
    ]
  },
  {
    id: 3,
    question: "What's your investment time horizon?",
    options: [
      { text: "Less than 2 years", score: 1 },
      { text: "2-5 years", score: 2 },
      { text: "More than 5 years", score: 3 }
    ]
  },
  {
    id: 4,
    question: "How familiar are you with comic book investing?",
    options: [
      { text: "Complete beginner", score: 1 },
      { text: "Some knowledge and experience", score: 2 },
      { text: "Very experienced investor", score: 3 }
    ]
  },
  {
    id: 5,
    question: "What percentage of your portfolio would you allocate to alternative investments?",
    options: [
      { text: "Less than 10%", score: 1 },
      { text: "10-25%", score: 2 },
      { text: "More than 25%", score: 3 }
    ]
  }
];

const riskProfiles: Record<string, RiskProfile> = {
  conservative: {
    level: 'Conservative',
    description: 'Focus on capital preservation with steady, predictable returns',
    allocation: [
      { name: 'Bonds', value: 50, color: '#22c55e' },
      { name: 'Golden Age Comics', value: 30, color: '#eab308' },
      { name: 'Blue Chip Publishers', value: 15, color: '#3b82f6' },
      { name: 'Cash', value: 5, color: '#6b7280' }
    ],
    expectedReturn: 8,
    volatility: 12
  },
  moderate: {
    level: 'Moderate',
    description: 'Balanced approach seeking growth with manageable risk',
    allocation: [
      { name: 'Mixed Age Comics', value: 40, color: '#3b82f6' },
      { name: 'Creator Stocks', value: 25, color: '#8b5cf6' },
      { name: 'Bonds', value: 20, color: '#22c55e' },
      { name: 'Publisher Stocks', value: 15, color: '#f59e0b' }
    ],
    expectedReturn: 12,
    volatility: 18
  },
  aggressive: {
    level: 'Aggressive',
    description: 'Maximum growth potential with higher volatility tolerance',
    allocation: [
      { name: 'Modern Age Comics', value: 35, color: '#ef4444' },
      { name: 'Creator Stocks', value: 30, color: '#8b5cf6' },
      { name: 'Options', value: 20, color: '#ec4899' },
      { name: 'Emerging Assets', value: 15, color: '#06b6d4' }
    ],
    expectedReturn: 18,
    volatility: 25
  }
};

export function RiskAssessmentQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [riskProfile, setRiskProfile] = useState<RiskProfile | null>(null);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate risk profile
      const totalScore = newAnswers.reduce((sum, score) => sum + score, 0);
      const averageScore = totalScore / newAnswers.length;
      
      let profileKey = 'moderate';
      if (averageScore <= 1.5) profileKey = 'conservative';
      else if (averageScore >= 2.5) profileKey = 'aggressive';
      
      setRiskProfile(riskProfiles[profileKey]);
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setRiskProfile(null);
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  if (showResults && riskProfile) {
    return (
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <div className="flex items-center space-x-3 mb-6">
          <Award className="h-8 w-8 text-yellow-400" />
          <div>
            <h2 className="text-2xl font-bold text-white">Your Risk Profile: {riskProfile.level}</h2>
            <p className="text-gray-400">{riskProfile.description}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recommended Allocation */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Recommended Portfolio Allocation</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskProfile.allocation}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name} ${value}%`}
                  >
                    {riskProfile.allocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${value}%`, 'Allocation']}
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: 'none',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Profile Metrics */}
          <div className="space-y-4">
            <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <h4 className="font-medium text-white">Expected Annual Return</h4>
              </div>
              <p className="text-2xl font-bold text-green-400">{riskProfile.expectedReturn}%</p>
            </div>
            
            <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
              <div className="flex items-center space-x-2 mb-2">
                <BarChart3 className="h-5 w-5 text-yellow-400" />
                <h4 className="font-medium text-white">Expected Volatility</h4>
              </div>
              <p className="text-2xl font-bold text-yellow-400">{riskProfile.volatility}%</p>
            </div>
            
            <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-indigo-400" />
                <h4 className="font-medium text-white">Risk Level</h4>
              </div>
              <p className="text-2xl font-bold text-indigo-400">{riskProfile.level}</p>
            </div>
            
            <div className="bg-indigo-900/30 p-4 rounded-lg border border-indigo-700/30">
              <h4 className="font-medium text-white mb-2">Next Steps</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Explore {riskProfile.level.toLowerCase()} investment options</li>
                <li>• Review recommended asset allocation</li>
                <li>• Start with a diversified portfolio</li>
                <li>• Monitor and rebalance quarterly</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={resetQuiz}
            className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Retake Quiz</span>
          </button>
          <button className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors">
            <span>Start Trading with This Profile</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
      <div className="flex items-center space-x-3 mb-6">
        <Target className="h-8 w-8 text-indigo-400" />
        <div>
          <h2 className="text-2xl font-bold text-white">Risk Assessment Quiz</h2>
          <p className="text-gray-400">Discover your optimal investment strategy</p>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
          <span>{Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
          />
        </div>
      </div>
      
      {/* Current Question */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-6">
          {quizQuestions[currentQuestion].question}
        </h3>
        
        <div className="space-y-3">
          {quizQuestions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.score)}
              className="w-full text-left p-4 bg-slate-700/50 rounded-lg border border-slate-600/50 hover:bg-slate-700 hover:border-indigo-500/50 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-white group-hover:text-indigo-300 transition-colors">
                  {option.text}
                </span>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-400 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={goBack}
          disabled={currentQuestion === 0}
          className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </button>
        
        <div className="text-sm text-gray-400">
          {answers.length > 0 && (
            <span>Current score: {answers.reduce((sum, score) => sum + score, 0)}/{answers.length * 3}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default RiskAssessmentQuiz;