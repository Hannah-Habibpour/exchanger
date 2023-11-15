import React, { useState, useEffect } from 'react';
import { currencyPairs } from '../constants/currency';
import '../style.css';
import { Select, Option } from './ui/Select';
import { Table, Thead, Tbody, Th, Tr, Td } from './ui/Table';

export default function SelectedCurrencyPrice() {
  const [selectedCurrency, setSelectedCurrency] = useState(
    currencyPairs[0].value
  );
  const [selectedCurrencyPriceList, setSelectedCurrencyPriceList] = useState(
    []
  );

  useEffect(() => {
    fetch(`/currency-pairs/${selectedCurrency}`)
      .then(res => res.json())
      .then(data => setSelectedCurrencyPriceList(data.data))
      .catch(error => console.log(error));
  }, [selectedCurrency]);

  const handleSelectCurrency = e => {
    setSelectedCurrency(e.target.value);
  };

  return (
    <div>
      <div>Select a Currency pair:</div>
      <div>
        <Select defaultValue={selectedCurrency} onChange={handleSelectCurrency}>
          {currencyPairs.map(currencyPair => (
            <Option key={currencyPair.value} value={currencyPair.value}>
              {currencyPair.name}
            </Option>
          ))}
        </Select>
        <Table>
          <Thead>
            <Tr>
              <Th>Exchange</Th>
              <Th>Sell</Th>
              <Th>Buy</Th>
            </Tr>
          </Thead>
          <Tbody>
            {selectedCurrencyPriceList.map(item => (
              <Tr key={item._id}>
                <Td>{item.exchangeName}</Td>
                <Td>{item.price.sellPrice}</Td>
                <Td>{item.price.buyPrice}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </div>
  );
}