const inventory = [
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

const status = {
  default: 'Please enter a code to order an item',
  noChange: 'No change available. Cannot accept order.',
  invalidCode: 'Invalid code.',
  itemNoStock: 'Sorry, the item is out of stock',
  itemSelected: 'Item selected. Insert coins to pay.',
  noAcceptCoins: 'Cannot accept coins. Please select an item first.',
  orderFinished: 'Successfully paid! Please collect your item',
  orderCancelled: 'Order canceled.'
}

class VendingMachine {
  constructor() {
    this.inventory = inventory
    this.availableChange = 20
    this.basket = []
  }

  getStockedItems() {}
}

module.exports = VendingMachine
