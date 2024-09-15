/* eslint-disable react/no-unescaped-entities */

const Portfolio = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-gray-500">Total Balance</h3>
          <p className="text-3xl font-bold">$12,345.67</p>
          <p className="text-sm text-gray-500">+2.5% from last month</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-gray-500">Investments</h3>
          <p className="text-3xl font-bold">$8,765.43</p>
          <p className="text-sm text-gray-500">+4.2% overall return</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-gray-500">Monthly Spending</h3>
          <p className="text-3xl font-bold">$2,345.67</p>
          <p className="text-sm text-gray-500">+2.5% from last month</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-gray-500">Credit Score</h3>
          <p className="text-3xl font-bold">785</p>
          <p className="text-sm text-gray-500">Excellent</p>
        </div>
      </div>

      {/* Recent Transactions and Investment Portfolio */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold mb-4">Recent Transactions</h3>
          <ul>
            <li className="flex justify-between mb-2 text-red-500">
              <span>Grocery Store</span>
              <span>-82.66</span>
            </li>
            <li className="flex justify-between mb-2 text-green-500">
              <span>Salary Deposit</span>
              <span>+3500.00</span>
            </li>
            <li className="flex justify-between mb-2 text-red-500">
              <span>Electric Bill</span>
              <span>-124.79</span>
            </li>
            <li className="flex justify-between text-red-500">
              <span>Online Shopping</span>
              <span>-65.99</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold mb-4">Investment Portfolio</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between">
                <span>Stocks</span>
                <span>60%</span>
              </div>
              <div className="h-2 bg-gray-300 rounded">
                <div className="h-full bg-black w-3/5"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span>Bonds</span>
                <span>25%</span>
              </div>
              <div className="h-2 bg-gray-300 rounded">
                <div className="h-full bg-black w-1/4"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span>Real Estate</span>
                <span>10%</span>
              </div>
              <div className="h-2 bg-gray-300 rounded">
                <div className="h-full bg-black w-1/10"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span>Cash</span>
                <span>5%</span>
              </div>
              <div className="h-2 bg-gray-300 rounded">
                <div className="h-full bg-black w-1/20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Overview, Financial Goals, Financial Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Budget Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold mb-4">Budget Overview</h3>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between">
                <span>Housing</span>
                <span>$1200 / $1500</span>
              </div>
              <div className="h-2 bg-gray-300 rounded">
                <div className="h-full bg-black w-4/5"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span>Food</span>
                <span>$450 / $500</span>
              </div>
              <div className="h-2 bg-gray-300 rounded">
                <div className="h-full bg-black w-9/10"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span>Transportation</span>
                <span>$200 / $300</span>
              </div>
              <div className="h-2 bg-gray-300 rounded">
                <div className="h-full bg-black w-2/3"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span>Entertainment</span>
                <span>$150 / $200</span>
              </div>
              <div className="h-2 bg-gray-300 rounded">
                <div className="h-full bg-black w-3/4"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Goals */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold mb-4">Financial Goals</h3>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between">
                <span>Emergency Fund</span>
                <span>$5000 / $10000</span>
              </div>
              <div className="h-2 bg-gray-300 rounded">
                <div className="h-full bg-black w-1/2"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span>Vacation Savings</span>
                <span>$2000 / $5000</span>
              </div>
              <div className="h-2 bg-gray-300 rounded">
                <div className="h-full bg-black w-2/5"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span>New Car</span>
                <span>$15000 / $30000</span>
              </div>
              <div className="h-2 bg-gray-300 rounded">
                <div className="h-full bg-black w-1/2"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Tips */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold mb-4">Financial Tips</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Consider increasing your emergency fund contributions.</li>
            <li>You're under budget in transportation. Allocate it elsewhere.</li>
            <li>Your investment portfolio is well-diversified. Keep up the good work!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
