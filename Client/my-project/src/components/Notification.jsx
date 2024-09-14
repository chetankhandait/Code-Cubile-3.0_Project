import { RxCross1 } from 'react-icons/rx';

const StockNotification = ({ stockName, currentPrice, previousPrice, percentageChange, onClose }) => {
  const isPriceUp = currentPrice > previousPrice;

  const getPriceColor = () => {
    return isPriceUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
  };

  const getArrowIcon = () => {
    return isPriceUp ? '🔼' : '🔽'; // Upward or downward arrow
  };

  const getChangeColor = () => {
    return isPriceUp ? 'text-green-700' : 'text-red-700';
  };

  return (
    <div className={`flex items-center p-4 rounded-lg shadow-md ${getPriceColor()} mb-4`}>
      <div className="flex-1">
        <h3 className="font-bold text-lg">{stockName}</h3>
        <p>
          Current Price: <span className="font-semibold">{currentPrice}</span> {getArrowIcon()}
        </p>
        <p className={`text-sm ${getChangeColor()}`}>
          {isPriceUp ? 'Up' : 'Down'} {percentageChange}% from previous price of {previousPrice}
        </p>
      </div>
      <button onClick={onClose} className="ml-4 text-gray-500 hover:text-gray-700">
        <RxCross1/>
      </button>
    </div>
  );
};

export default StockNotification;
