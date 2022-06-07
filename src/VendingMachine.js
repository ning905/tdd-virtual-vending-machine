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
    this.status = status.default
    this.availableChange = 20
    this.selected = {}
    this.notAcceptCoins = true
    this.totalCoinsInserted = 0
  }

  changeIsNotAvailable() {
    if (this.availableChange === 0) {
      this.status = status.noChange
      return true
    }
    return false
  }

  findInInventory(code) {
    return this.inventory.find((item) => item.code === code)
  }

  codeIsInvalid(code) {
    if (this.findInInventory(code)) {
      return false
    }
    this.status = status.invalidCode
    return true
  }

  getStockedItems() {
    const stockedItems = []
    for (const item of this.inventory) {
      if (item.stock > 0) {
        stockedItems.push(item)
      }
    }
    return stockedItems
  }

  itemIsNotInStock(code) {
    const stockedItems = this.getStockedItems()
    if (stockedItems.find((item) => item.code === code)) {
      return false
    }
    this.status = status.itemNoStock
    return true
  }

  getItemPrice(code) {
    if (this.codeIsInvalid(code)) {
      return this.status
    }
    const item = this.findInInventory(code)
    return item.price
  }

  orderItem(code) {
    if (this.changeIsNotAvailable()) {
      return this.status
    } else if (this.codeIsInvalid(code)) {
      return this.status
    } else if (this.itemIsNotInStock(code)) {
      return this.status
    }
    this.status = status.itemSelected
    this.selected = this.findInInventory(code)
    this.notAcceptCoins = false
    return this.status
  }

  insertCoin(coin) {
    if (this.notAcceptCoins) {
      this.status = status.noAcceptCoins
      return this.status
    }

    this.totalCoinsInserted += coin
    const remaining = this.selected.price - this.totalCoinsInserted
    if (remaining > 0) {
      this.status = `£${this.totalCoinsInserted} accepted. £${remaining} more needed.`
      return this.status
    }

    this.status = status.orderFinished + '.'
    this.selected.stock--
    this.selected = {}

    const change = Math.abs(remaining)
    if (change === 0) {
      return this.status
    }
    this.status = status.orderFinished + ` and £${change} change.`
    this.availableChange -= change
    return this.status
  }

  cancelOrder() {
    this.selected = {}
    this.notAcceptCoins = true
    this.status = status.orderCancelled

    if (this.totalCoinsInserted > 0) {
      this.status += ' Please collect your coins.'
      this.totalCoinsInserted = 0
    }

    return this.status
  }

  supplyChange(coins) {
    this.availableChange += coins
  }
}

const machine = new VendingMachine()
console.log(machine.orderItem('01'))
console.log('selected item: ', machine.selected)

console.log(machine.insertCoin(1))
console.log(machine.insertCoin(1))
// console.log(machine.insertCoin(5))
console.log(machine.cancelOrder())
console.log('selected item: ', machine.selected)
console.log('Updated inventory: ', machine.inventory)

module.exports = VendingMachine
