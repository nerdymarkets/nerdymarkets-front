import useHistoricalChangesDataStore from '@/stores/useHistoricalChangesDataStore';
import { Spinner, Table, Button } from 'reactstrap';
import { useState } from 'react';
const HistoricalChangesTable = () => {
  const { HistoricalChanges, loading } = useHistoricalChangesDataStore();
  const [selectedPortfolio, setSelectedPortfolio] = useState(
    'Low-Volatility Portfolio'
  );
  const formatDate = (fileName) => {
    const datePart = fileName.split('/').pop().split('.csv')[0];
    const [year, month, day] = datePart.split('-');
    const date = new Date(year, month - 1, day);
    return date.toLocaleString('default', { month: 'short', year: 'numeric' });
  };
  const getGroupNumber = (portfolioName) => {
    switch (portfolioName) {
      case 'Low-Volatility Portfolio':
        return '1';
      case 'Medium-Volatility Portfolio':
        return '2';
      case 'High-Volatility Portfolio':
        return '3';
      default:
        return '1';
    }
  };
  const filteredData = HistoricalChanges.map((change) => ({
    ...change,
    data: change.data.filter(
      (group) => group.Group === getGroupNumber(selectedPortfolio)
    ),
  }));

  if (loading) {
    return <Spinner className="text-customPink" />;
  }

  return (
    <div className=" bg-customBlack lg:p-5 p-4 rounded-2xl ">
      <h2 className="text-3xl text-white mb-4 text-center">
        {selectedPortfolio} - Historical Changes to Portfolio
      </h2>
      <div className="mb-4 flex justify-center  gap-4">
        <Button
          className="bg-customPink hover:bg-customPinkSecondary border-none"
          onClick={() => setSelectedPortfolio('Low-Volatility Portfolio')}
        >
          Low-Volatility Portfolio
        </Button>
        <Button
          className="bg-customPink hover:bg-customPinkSecondary border-none"
          onClick={() => setSelectedPortfolio('Medium-Volatility Portfolio')}
        >
          Medium-Volatility Portfolio
        </Button>
        <Button
          className="bg-customPink hover:bg-customPinkSecondary border-none"
          onClick={() => setSelectedPortfolio('High-Volatility Portfolio')}
        >
          High-Volatility Portfolio
        </Button>
      </div>

      <Table
        className="font-sans text-white"
        dark
        hover
        responsive
        style={{
          borderRadius: '1rem',
          overflow: 'hidden',
        }}
      >
        <thead>
          <tr>
            <th>Month</th>
            <th>Current Composition</th>
            <th>Tickers Added</th>
            <th>Tickers Removed</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 &&
            filteredData.map((change, fileIndex) =>
              change.data.map((group, groupIndex) => (
                <tr key={`${fileIndex}-${groupIndex}`}>
                  <td>{formatDate(change.fileName)}</td>
                  <td>{group.Tickers_final.join(', ')}</td>
                  <td>
                    {group['Tickers added'].length > 0
                      ? group['Tickers added'].join(', ')
                      : '-'}
                  </td>
                  <td>
                    {group['Tickers removed'].length > 0
                      ? group['Tickers removed'].join(', ')
                      : '-'}
                  </td>
                </tr>
              ))
            )}
        </tbody>
      </Table>
    </div>
  );
};

export default HistoricalChangesTable;
