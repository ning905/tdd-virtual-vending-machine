Domain model for VendingMachine

inventory(@Object[], properties: name(@String), code(@String), price(@Number), stock(@Number))

status(@Object, key: status(@String), value: message(@String))

class VendingMachine
Properties:
    - inventory(@Object[])
    - status(status.default)
    - availableChange(@Number)
    - selected: []
    - notAcceptCoins: true (@Boolean)
    - totalCoinsInserted: 0

Method: changeIsAvailable()
Scenario: there is no change available
    Update this.status = status.noChange
Output: availableChange(@Number) TODO:

Method: codeIsInvalid(code)
Input: code
Scenario: the code is valid
Output: true(@Boolean)
Scenario: the code is invalid
    Update this.status = status.invalidCode
Output: false(@Boolean)

Method: itemIsNotInStock(code)
Input: code
Scenario: item is not in getStockedItems()
Output: true(@Boolean)
Scenario: item is in getStockedItems()
    Update this.status = status.itemNoStock
Output: false(@Boolean)

<!-- Method: findInInventory(code)
Input: code
Output: this.inventory.find(item => item.code === code) -->

TODO:
Method: getStockedItems()

- Input: none
- Output: stockedItems(@Object[], properties: name(@String), code(@String), price(@Number))

TODO:
Method: getItemPrice(item)

- Input: code
- Scenario: codeIsInvalid() is true
- Output: this.status(@String)
- Scenario: codeIsInvalid() is false
- Output: itemPrice(@Number)

TODO:
Method: orderItem(code)

- Input: code(@String)

- Scenario 1: changeIsNotAvailable() is true
- Output 1: this.status(@String)
  
- Scenario 2: changeIsNotAvailable() is false
  - Scenario: codeIsInvalid(code) is true
  - Output: this.status(@String)
  
  - Scenario: codeIsInvalid(code) is false
    - Scenario: itemIsNotInStock(code) is true
    - Output: this.status(@String)

    - Scenario: itemIsNotInStock(code) is false
      - Update this.selected
      - Update this.notAcceptCoins = false (Boolean)
      - Update this.status = status.itemSelected
    - Output: this.status(@String)

TODO:
Method: insertCoins(coins)

- Input: coins(@Number)

- Scenario: this.notAcceptCoins is true
  - Update this.status = status.noAcceptCoins
- Output: this.status(@String)

- Scenario: this.notAcceptCoins is false
  - Calculate remaining(@Number)

  - Scenario: remaining > 0
    - Update this.status = `£${coins} accepted. £${remaining} more needed.`
    - Output: this.status(@String)
  
  - Scenario: remaining <= 0
    - Update this.status = status.orderFinished + '.'
    - Update stock
    - Empty this.selected
  
    - Calculate change
      - Scenario: If there is no change
      - Output: this.status(@String)

      - Scenario: If there is change
      - Update this.status = status.orderFinished + ` and £${change} change.`
      - Update this.availableChange
      - Output: this.status(@String)
  
TODO:
Method: cancelOrder()

- Input: empty
- Empty this.selected
- this.notAcceptCoins = true
- Update this.status = status.orderCancelled
  - If totalCoinsInserted > 0
  - Update this.status += ` Please collect your coins.`
  - totalCoinsInserted = 0
- Output: this.status(@String)


TODO:
Method: supplyChange(coins)

- Input: coins(@Number)
- this.availableChange += coins