const VendingMachine = require('../src/VendingMachine.js')

describe('VendingMachine', () => {
  it('lists all stocked items ', () => {
    // set up
    const vendingMachine = new VendingMachine()
    const expected = [
      {
        name: 'Coca Cola',
        code: '01',
        price: 5,
        stock: 3
      },
      {
        name: 'Pepsi',
        code: '02',
        price: 1,
        stock: 2
      },
      {
        name: 'Water',
        code: '03',
        price: 2,
        stock: 5
      },
      {
        name: 'Chocolate',
        code: '04',
        price: 1.5,
        stock: 2
      }
    ]
    // execute
    const result = vendingMachine.getStockedItems()
    // verify
    expect(result).toEqual(expected)
  })

  it('lists all stocked items ', () => {
    // set up
    const vendingMachine = new VendingMachine()
    const pepsi = vendingMachine.findInInventory('02')
    pepsi.stock = 0
    const expected = [
      {
        name: 'Coca Cola',
        code: '01',
        price: 5,
        stock: 3
      },
      {
        name: 'Water',
        code: '03',
        price: 2,
        stock: 5
      },
      {
        name: 'Chocolate',
        code: '04',
        price: 1.5,
        stock: 2
      }
    ]
    // execute
    const result = vendingMachine.getStockedItems()
    // verify
    expect(result).toEqual(expected)
  })

  it('can check the price of an item', () => {
    // set up
    const vendingMachine = new VendingMachine()
    const expected = 5
    // execute
    const result = vendingMachine.getItemPrice('01')
    // verify
    expect(result).toEqual(expected)
  })

  it('cannot check the price of an invalid item', () => {
    // set up
    const vendingMachine = new VendingMachine()
    const expected = 'Invalid code.'
    // execute
    const result = vendingMachine.getItemPrice('05')
    // verify
    expect(result).toEqual(expected)
  })

  it('cannot accept oder when there is no change available', () => {
    // set up
    const vendingMachine = new VendingMachine()
    vendingMachine.availableChange = 0
    const expected = 'No change available. Cannot accept order.'
    // execute
    const result = vendingMachine.orderItem('01')
    // verify
    expect(result).toEqual(expected)
  })

  it('cannot accept oder when the code is invalid', () => {
    // set up
    const vendingMachine = new VendingMachine()
    const expected = 'Invalid code.'
    // execute
    const result = vendingMachine.orderItem('05')
    // verify
    expect(result).toEqual(expected)
  })

  it('cannot accept oder when the item is out of stock', () => {
    // set up
    const vendingMachine = new VendingMachine()
    const pepsi = vendingMachine.findInInventory('02')
    pepsi.stock = 0
    const expected = 'Sorry, the item is out of stock'
    // execute
    const result = vendingMachine.orderItem('02')
    // verify
    expect(result).toEqual(expected)
  })

  it('can accept oder when the item is in stock', () => {
    // set up
    const vendingMachine = new VendingMachine()
    const expected = 'Item selected. Insert coins to pay.'
    // execute
    const result = vendingMachine.orderItem('02')
    // verify
    expect(result).toEqual(expected)
  })

  it('can not accept coins when order has not been placed', () => {
    // set up
    const vendingMachine = new VendingMachine()
    const expected = 'Cannot accept coins. Please select an item first.'
    // execute
    const result = vendingMachine.insertCoin(7)
    // verify
    expect(result).toEqual(expected)
  })

  it('can prompt for the remaining payment after each coin is provided', () => {
    // set up
    const vendingMachine = new VendingMachine()
    vendingMachine.orderItem('01')
    vendingMachine.insertCoin(1)
    const expected = '£2 accepted. £3 more needed.'
    // execute
    const result = vendingMachine.insertCoin(1)
    // verify
    expect(result).toEqual(expected)
  })

  it('can provide the item once the full amount have been paid', () => {
    // set up
    const vendingMachine = new VendingMachine()
    vendingMachine.orderItem('01')
    const expected = 'Successfully paid! Please collect your item.'
    // execute
    const result = vendingMachine.insertCoin(5)
    // verify
    expect(result).toEqual(expected)
  })

  it('provide change when I pay over the items cost', () => {
    // set up
    const vendingMachine = new VendingMachine()
    vendingMachine.orderItem('01')
    const expected =
      'Successfully paid! Please collect your item and £5 change.'
    // execute
    const result = vendingMachine.insertCoin(10)
    // verify
    expect(result).toEqual(expected)
  })

  it('cancel an order', () => {
    // set up
    const vendingMachine = new VendingMachine()
    vendingMachine.orderItem('01')
    const expected = 'Order canceled.'
    // execute
    const result = vendingMachine.cancelOrder()
    // verify
    expect(result).toEqual(expected)
  })

  it('cancel an order and have any submitted payment returned', () => {
    // set up
    const vendingMachine = new VendingMachine()
    vendingMachine.orderItem('01')
    vendingMachine.insertCoin(2)
    const expected = 'Order canceled. Please collect your coins.'
    // execute
    const result = vendingMachine.cancelOrder()
    // verify
    expect(result).toEqual(expected)
  })

  it('supply the vending machine with money to use as change', () => {
    // set up
    const vendingMachine = new VendingMachine()
    vendingMachine.supplyChange(30)
    const expected = 50
    // execute
    const result = vendingMachine.availableChange
    // verify
    expect(result).toEqual(expected)
  })
})
