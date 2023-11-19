import { useState, useEffect } from 'react';
import { currencyPairNames, currencyFlags } from '../constants/currency';
import { Table, Thead, Tbody, Tr, Th, Td } from './ui/Table';

export default function AvgCurrencyPrices() {
  const [avgPriceList, setAvgPriceList] = useState([]);

  useEffect(() => {
    fetch('/exchanges/avg/currencypairs')
      .then(res => res.json())
      .then(data => setAvgPriceList(data.data))
      .catch(error => console.log(error));
  }, []);

  const getTdStyle = index => {
    return index === avgPriceList.length - 1 ? lastTdStyle : tdStyle;
  };

  return (
    <div>
      <Table style={tableStyle}>
        <Thead>
          <Tr>
            <Th style={thStyle}>Name</Th>
            <Th style={thStyle}>Sell</Th>
            <Th style={thStyle}>Buy</Th>
          </Tr>
        </Thead>
        <Tbody>
          {avgPriceList.map((item, index) => (
            <Tr key={item._id}>
              <Td style={getTdStyle(index)}>
                {`${currencyPairNames[item.currencyPair]} ${
                  currencyFlags[item.currencyPair.split('-')[0]]
                } / ${currencyFlags[item.currencyPair.split('-')[1]]}`}
              </Td>
              <Td style={getTdStyle(index)}>{item.price.sellPrice}</Td>
              <Td style={getTdStyle(index)}>{item.price.buyPrice}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

const tableStyle = {
  width: '100%',
  marginBottom: '10px',
  marginTop: '10px',
  border: '1px solid gray',
  borderRadius: '10px',
  borderSpacing: '0',
  padding: '10px',
};

const thStyle = {
  borderBottom: '1px solid gray',
  textAlign: 'left',
};

const tdStyle = {
  textAlign: 'left',
  paddingTop: '10px',
  borderBottom: '1px solid #a9a9a9',
};

const lastTdStyle = {
  textAlign: 'left',
  paddingTop: '10px',
};
