import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';


const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=57c0a2a7b77f205b4356726d44dc208e'

function App() {

  const [currencyOptions, setCurrencyOptions ] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate  
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
    fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {
      const FirstCurrency = Object.keys(data.rates)[0]
      setCurrencyOptions([data.base, ...Object.keys(data.rates)])
      setFromCurrency(data.base)
      setToCurrency(FirstCurrency)
      setExchangeRate(data.rates[FirstCurrency])
  })
}, [])


useEffect(() => {
  if (fromCurrency != null && toCurrency != null) {
    fetch("http://api.exchangeratesapi.io/v1/latest?access_key=57c0a2a7b77f205b4356726d44dc208e")
    .then(res => res.json())
    .then(data => setExchangeRate(data.rates[toCurrency]))
  }
}, [fromCurrency, toCurrency]) 


  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
 // <div style={{ backgroundImage: "url(/img/background.jpg)"}}>
   <>
    <h1>Converter</h1>
    <CurrencyRow
    currencyOptions = {currencyOptions}
    selectedCurrency = {fromCurrency}
    onChangeCurrency = {e => setFromCurrency(e.target.value)}
    onChangeAmount = {handleFromAmountChange}
    amount = {fromAmount}
    />
    <div className="equals">=</div>
    <CurrencyRow
    currencyOptions = {currencyOptions}
    selectedCurrency = {toCurrency}
    onChangeCurrency = {e => setToCurrency(e.target.value) }
    onChangeAmount = {handleToAmountChange}
    amount = {toAmount}
    />
    </>

   // </div>
  );


}

export default App;
