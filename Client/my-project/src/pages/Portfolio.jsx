/* eslint-disable react/no-unescaped-entities */

const Portfolio = () => {
  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="text-2xl font-bold mb-6">Investment Portfolio</div>

      {/* Investment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-gray-500">Total Investments</h3>
          <p className="text-3xl font-bold">$124,567.89</p>
          <p className="text-sm text-gray-500">+5.25% from initial investment</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-gray-500">Today's Change</h3>
          <p className="text-3xl font-bold text-green-500">+ $1,234.56</p>
          <p className="text-sm text-gray-500">+1.02% today</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-gray-500">Annual Return</h3>
          <p className="text-3xl font-bold">8.75%</p>
          <p className="text-sm text-gray-500">+2.25% vs S&P 500</p>
        </div>
      </div>

      {/* Asset Allocation and Recent Transactions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Asset Allocation */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold mb-4">Asset Allocation</h3>
          <div className="mb-2">
            <p className="flex justify-between"><span>Stocks</span><span>60%</span></p>
            <div className="h-2 bg-gray-300 rounded">
              <div className="h-full bg-black w-3/5"></div>
            </div>
          </div>
          <div className="mb-2">
            <p className="flex justify-between"><span>Bonds</span><span>25%</span></p>
            <div className="h-2 bg-gray-300 rounded">
              <div className="h-full bg-black w-1/4"></div>
            </div>
          </div>
          <div className="mb-2">
            <p className="flex justify-between"><span>Real Estate</span><span>10%</span></p>
            <div className="h-2 bg-gray-300 rounded">
              <div className="h-full bg-black w-1/10"></div>
            </div>
          </div>
          <div className="mb-2">
            <p className="flex justify-between"><span>Cash</span><span>5%</span></p>
            <div className="h-2 bg-gray-300 rounded">
              <div className="h-full bg-black w-1/20"></div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold mb-4">Recent Transactions</h3>
          <div>
            <div className="flex justify-between mb-2">
              <span>2023-05-15</span>
              <span>Buy</span>
              <span>$1,000.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>2023-05-10</span>
              <span>Sell</span>
              <span>$750.50</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>2023-06-05</span>
              <span>Dividend</span>
              <span>$25.75</span>
            </div>
            <div className="flex justify-between">
              <span>2023-05-01</span>
              <span>Buy</span>
              <span>$500.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="font-bold mb-4">Performance Chart</h3>
        <div className="flex justify-start mb-4 space-x-4">
          <button className="text-sm border-b-2 border-black pb-1">1M</button>
          <button className="text-sm">3M</button>
          <button className="text-sm border-b-2 border-black pb-1">6M</button>
          <button className="text-sm">1Y</button>
          <button className="text-sm">All</button>
        </div>
        <div className="h-64 bg-gray-100 flex items-center justify-center">
          Chart placeholder: 6 Months Performance
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button className="bg-black text-white py-2 px-4 rounded-lg">+ Add Funds</button>
        <button className="bg-gray-300 text-black py-2 px-4 rounded-lg">Rebalance Portfolio</button>
      </div>
    </div>
  );
}

export default Portfolio;
