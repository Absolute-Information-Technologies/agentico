'use client';

import { useState, useEffect } from 'react';

type RoiCalculatorProps = {
  dictionary: any;
  solution: string;
  industry: string;
};

export default function RoiCalculator({ dictionary, solution, industry }: RoiCalculatorProps) {
  // Default values based on solution and industry
  const getDefaultValues = () => {
    // These would be customized based on the solution and industry
    const defaults = {
      employeeCost: 25, // hourly cost per employee
      employeeHours: 160, // monthly hours per employee
      customerVolume: 1000, // monthly customer interactions
      avgOrderValue: 50, // average order value
      conversionRate: 0.2, // conversion rate (20%)
      errorRate: 0.05, // error rate (5%)
      customerSatisfaction: 3.5, // on scale of 1-5
      responseTime: 3, // minutes
    };
    
    // Adjust defaults based on industry
    switch (industry) {
      case 'restaurants':
        return { 
          ...defaults, 
          employeeCost: 18, 
          customerVolume: 2000, 
          avgOrderValue: 30,
          errorRate: 0.08,
          responseTime: 5,
          customerSatisfaction: 3.8
        };
      case 'hospitality':
        return { 
          ...defaults, 
          employeeCost: 22, 
          customerVolume: 1500, 
          avgOrderValue: 120,
          errorRate: 0.04,
          responseTime: 2,
          customerSatisfaction: 4.0
        };
      case 'healthcare':
        return { 
          ...defaults, 
          employeeCost: 35, 
          customerVolume: 800, 
          avgOrderValue: 200,
          errorRate: 0.02,
          responseTime: 1,
          customerSatisfaction: 3.7
        };
      case 'retail':
        return { 
          ...defaults, 
          employeeCost: 20, 
          customerVolume: 3000, 
          avgOrderValue: 45,
          errorRate: 0.06,
          responseTime: 4,
          customerSatisfaction: 3.6
        };
      case 'call-centers':
        return { 
          ...defaults, 
          employeeCost: 22, 
          customerVolume: 5000, 
          avgOrderValue: 40,
          errorRate: 0.07,
          responseTime: 6,
          customerSatisfaction: 3.2
        };
      default:
        return defaults;
    }
  };
  
  const defaults = getDefaultValues();
  
  // Form state
  const [employeeCost, setEmployeeCost] = useState(defaults.employeeCost);
  const [employeeHours, setEmployeeHours] = useState(defaults.employeeHours);
  const [customerVolume, setCustomerVolume] = useState(defaults.customerVolume);
  const [avgOrderValue, setAvgOrderValue] = useState(defaults.avgOrderValue);
  const [conversionRate, setConversionRate] = useState(defaults.conversionRate);
  const [errorRate, setErrorRate] = useState(defaults.errorRate);
  const [customerSatisfaction, setCustomerSatisfaction] = useState(defaults.customerSatisfaction);
  const [responseTime, setResponseTime] = useState(defaults.responseTime);
  const [activeTab, setActiveTab] = useState('basic');
  
  // Calculate ROI
  const calculateResults = () => {
    // Estimated monthly cost savings
    const employeeSavings = employeeCost * employeeHours * 0.4; // Assuming 40% reduction in staff time
    
    // Estimated monthly revenue increase
    const currentRevenue = customerVolume * avgOrderValue * conversionRate;
    const improvedConversionRate = conversionRate * 1.3; // Assuming 30% improvement in conversion
    const newRevenue = customerVolume * avgOrderValue * improvedConversionRate;
    const revenueIncrease = newRevenue - currentRevenue;
    
    // Error reduction benefits
    const currentErrorCost = customerVolume * avgOrderValue * errorRate * 0.5; // Assuming 50% of errors cost half an order value
    const newErrorRate = errorRate * 0.4; // Assuming 60% reduction in errors
    const newErrorCost = customerVolume * avgOrderValue * newErrorRate * 0.5;
    const errorReductionSavings = currentErrorCost - newErrorCost;
    
    // Customer satisfaction improvement
    const satisfactionImprovement = Math.min(5, customerSatisfaction * 1.2) - customerSatisfaction; // Max 20% improvement, capped at 5
    const satisfactionRevenue = (satisfactionImprovement / 5) * customerVolume * avgOrderValue * 0.1; // Assuming each full point in satisfaction increases revenue by 10%
    
    // Response time improvement
    const responseTimeImprovement = responseTime * 0.7; // 30% faster response time
    const responseTimeSavings = (responseTime - responseTimeImprovement) * (customerVolume / 60) * (employeeCost / 60); // Savings in labor cost
    
    // Total monthly benefit
    const totalMonthlyBenefit = employeeSavings + revenueIncrease + errorReductionSavings + satisfactionRevenue + responseTimeSavings;
    
    // Annual ROI (assuming $1000/month solution cost)
    const monthlyCost = getSolutionCost();
    const annualBenefit = totalMonthlyBenefit * 12;
    const annualCost = monthlyCost * 12;
    const roi = ((annualBenefit - annualCost) / annualCost) * 100;
    
    return {
      employeeSavings: Math.round(employeeSavings),
      revenueIncrease: Math.round(revenueIncrease),
      errorReductionSavings: Math.round(errorReductionSavings),
      satisfactionRevenue: Math.round(satisfactionRevenue),
      responseTimeSavings: Math.round(responseTimeSavings),
      totalMonthlyBenefit: Math.round(totalMonthlyBenefit),
      annualBenefit: Math.round(annualBenefit),
      monthlyCost: monthlyCost,
      annualCost: annualCost,
      roi: Math.round(roi),
      paybackMonths: Math.round((annualCost / annualBenefit) * 12),
      newCustomerSatisfaction: Math.min(5, customerSatisfaction * 1.2).toFixed(1),
      newResponseTime: (responseTime * 0.7).toFixed(1),
      newErrorRate: (errorRate * 0.4 * 100).toFixed(1) + '%',
    };
  };
  
  // Get solution cost based on industry and volume
  const getSolutionCost = () => {
    let baseCost = 1000;
    
    // Adjust for industry
    switch (industry) {
      case 'healthcare':
        baseCost = 1500;
        break;
      case 'hospitality':
        baseCost = 1200;
        break;
      case 'call-centers':
        baseCost = 2000;
        break;
      default:
        baseCost = 1000;
    }
    
    // Adjust for volume
    if (customerVolume > 5000) {
      baseCost *= 1.5;
    } else if (customerVolume > 2000) {
      baseCost *= 1.2;
    }
    
    return Math.round(baseCost);
  };
  
  const results = calculateResults();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-2">ROI Calculator</h3>
      <p className="text-gray-600 mb-6">
        Estimate your return on investment with our {solution} solution for {industry}.
      </p>
      
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('basic')}
            className={`pb-2 px-1 ${activeTab === 'basic' 
              ? 'border-b-2 border-blue-500 text-blue-600 font-medium' 
              : 'text-gray-500 hover:text-gray-700'}`}
          >
            Basic Metrics
          </button>
          <button
            onClick={() => setActiveTab('advanced')}
            className={`pb-2 px-1 ${activeTab === 'advanced' 
              ? 'border-b-2 border-blue-500 text-blue-600 font-medium' 
              : 'text-gray-500 hover:text-gray-700'}`}
          >
            Advanced Metrics
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h4 className="font-medium text-gray-900 mb-4">Business Parameters</h4>
          
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employee Hourly Cost ($)
                </label>
                <input
                  type="number"
                  min="1"
                  value={employeeCost}
                  onChange={(e) => setEmployeeCost(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Hours per Employee
                </label>
                <input
                  type="number"
                  min="1"
                  value={employeeHours}
                  onChange={(e) => setEmployeeHours(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Customer Interactions
                </label>
                <input
                  type="number"
                  min="1"
                  value={customerVolume}
                  onChange={(e) => setCustomerVolume(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Average Order Value ($)
                </label>
                <input
                  type="number"
                  min="1"
                  value={avgOrderValue}
                  onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Conversion Rate
                </label>
                <input
                  type="number"
                  min="0.01"
                  max="1"
                  step="0.01"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="text-xs text-gray-500">Enter as decimal (e.g., 0.2 for 20%)</span>
              </div>
            </div>
          )}
          
          {activeTab === 'advanced' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Error Rate
                </label>
                <input
                  type="number"
                  min="0.01"
                  max="1"
                  step="0.01"
                  value={errorRate}
                  onChange={(e) => setErrorRate(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="text-xs text-gray-500">Enter as decimal (e.g., 0.05 for 5%)</span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Customer Satisfaction (1-5)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={customerSatisfaction}
                  onChange={(e) => setCustomerSatisfaction(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Average Response Time (minutes)
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={responseTime}
                  onChange={(e) => setResponseTime(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-4">Estimated Results</h4>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Monthly Employee Savings</p>
                <p className="text-xl font-bold text-blue-600">${results.employeeSavings}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Monthly Revenue Increase</p>
                <p className="text-xl font-bold text-blue-600">${results.revenueIncrease}</p>
              </div>
            </div>
            
            {activeTab === 'advanced' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Error Reduction Savings</p>
                  <p className="text-xl font-bold text-blue-600">${results.errorReductionSavings}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Satisfaction Revenue</p>
                  <p className="text-xl font-bold text-blue-600">${results.satisfactionRevenue}</p>
                </div>
              </div>
            )}
            
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">Total Monthly Benefit</p>
              <p className="text-2xl font-bold text-blue-600">${results.totalMonthlyBenefit}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Monthly Solution Cost</p>
                <p className="text-lg font-medium text-gray-700">${results.monthlyCost}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Annual ROI</p>
                <p className="text-lg font-bold text-green-600">{results.roi}%</p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">Payback Period</p>
              <p className="text-xl font-bold text-gray-900">{results.paybackMonths} months</p>
            </div>
            
            {activeTab === 'advanced' && (
              <div className="pt-4 border-t border-gray-200">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Performance Improvements</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Customer Satisfaction</p>
                    <p className="text-sm">
                      <span className="text-gray-700">{customerSatisfaction.toFixed(1)}</span>
                      <span className="text-gray-400 mx-1">→</span>
                      <span className="text-green-600 font-medium">{results.newCustomerSatisfaction}</span>
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Response Time</p>
                    <p className="text-sm">
                      <span className="text-gray-700">{responseTime.toFixed(1)}min</span>
                      <span className="text-gray-400 mx-1">→</span>
                      <span className="text-green-600 font-medium">{results.newResponseTime}min</span>
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Error Rate</p>
                    <p className="text-sm">
                      <span className="text-gray-700">{(errorRate * 100).toFixed(1)}%</span>
                      <span className="text-gray-400 mx-1">→</span>
                      <span className="text-green-600 font-medium">{results.newErrorRate}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="text-sm text-gray-500 italic">
        Note: This calculator provides estimates based on industry averages and assumptions. Actual results may vary.
      </div>
    </div>
  );
} 