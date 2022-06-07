Domain model for VendingMachine

inventory(@Object[], properties: name(@String), code(@String), price(@Number), stock(@Number))

status(@Object, key: status(@String), value: message(@String))

class VendingMachine
Properties:
    - inventory(@Object[])
    - status(status.default)
    - availableChange(@Number)
    - selected: []
    - acceptCoins: false (@Boolean)
    - totalCoinsInserted: 0

Method: changeIsAvailable()
Scenario: there is no change available
    Update this.status = status.noChange
Output: availableChange(@Number)

Method: codeIsValid(code)
Input: code
Scenario: the code is valid
Output: true(@Boolean)
Scenario: the code is invalid
    Update this.status = status.invalidCode
Output: false(@Boolean)

Method: itemIsInStock(code)
Input: code
Scenario: item is in getStockedItems()
Output: true(@Boolean)
Scenario: item is not in getStockedItems()
    Update this.status = itemNoStock
Output: false(@Boolean)

Method: findInInventory(code)
Input: code
Output: this.inventory.find(item => item.code === code)

TODO:
Method: getStockedItems()

- Input: none
- Output: stockedItems(@Object[], properties: name(@String), code(@String), price(@Number))

TODO:
Method: getItemPrice(item)

- Input: code
- Scenario: codeIsValid() is true
- Output: itemPrice(@Number)
- Scenario: codeIsValid() is false
- Output: this.status(@String)

TODO:
Method: orderItem(code)

- Input: code(@String)

- Scenario 1: changeIsAvailable() is false
- Output 1: this.status(@String)
  
- Scenario 2: changeIsAvailable() is true
  - Scenario: codeIsValid(code) is false
  - Output: this.status(@String)
  
  - Scenario: codeIsValid(code) is true
    - Scenario: itemIsInStock(code) is false
    - Output: this.status(@String)

    - Scenario: itemIsInStock(code) is true
      - Update this.selected
      - Update this.acceptCoins = true (Boolean)
      - Update this.status = itemSelected
    - Output: this.status(@String)

TODO:
Method: insertCoins(coins)

- Input: coins(@Number)

- Scenario: this.acceptCoins is false
  - Update this.status = status.noAcceptCoins
- Output: this.status(@String)

- Scenario: this.acceptCoins is true
  - Scenario: totalCoinsInserted < this.selected.price
    - Update this.status = `£${coins} accepted. £${remaining} more needed.`
    - Output: this.status(@String)
  - Scenario: totalCoinsInserted >= this.selected.price
    - Calculate change
    - Update this.availableChange
    - Update this.status = status.orderFinished + '.'
    - Update this.inventory
    - Empty this.selected
      - Scenario: If there is change
      - Update this.status += ` and £${change} change.`
  - Output: this.status(@String)

TODO:
Method: cancelOrder()

- Input: empty
- Empty this.selected
- acceptCoins = false
- Update this.status = status.orderCancelled
  - If totalCoinsInserted > 0
  - Update this.status += ` Please collect your coins.`
  - totalCoinsInserted = 0
- Output: this.status(@String)


TODO:
Method: supplyChange(coins)

- Input: coins(@Number)
- this.availableChange += coins