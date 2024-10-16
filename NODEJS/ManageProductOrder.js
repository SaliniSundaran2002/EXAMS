// Create a Node.js application to manage product orders using a Map to store order details. Implement the following functionalities using the readline module for input:

// a. Add an order with a unique order ID, product name, quantity, and customer name. If the order ID already exists, print an error message. (5 marks)

// b. Remove an order using its ID. If the order is not found, print an error message. (5 marks)

// c. Search for orders by product name, customer name, or order ID and print the matching results. (5 marks)

// d. Update the product name, quantity, and/or customer name for an order using its ID. If the order is not found, print an error message. (5 marks)

// e. Print a summary report of all orders in the system, displaying their order ID, product name, quantity, and customer name. (5 marks)

// f. Implement an option to exit the system cleanly after completing the required operations. (5 marks)


const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const product = new Map()

function askCommands() {
    console.log('Welcome to Product Orders Management!');
    console.log('Available commands : add, remove, search, uppdate, summary, exit');
    rl.question('Enter the command: ', function (command) {
        switch (command.trim().toLowerCase()) {
            case 'add':
                addCommand()
                break;
            case 'remove':
                removeCommand()
                break;
            case 'search':
                searchCommand()
                break;
            case 'update':
                updateCommand()
                break;
            case 'summary':
                summary()
                askCommands()
                break;
            case 'exit':
                rl.close()
                break;
            default:
                console.log('Please enter a avaialable commands!')
                askCommands()
        }
    })
}

// add

function addCommand() {
    rl.question('Enter the order id:  ', function (id) {
        rl.question('Enter the product name: ', function (name) {
            rl.question('Enter the quantity: ', function (quantity) {
                rl.question('Enter the customer name: ', function (customer_Name) {
                    addProduct(id, name, parseInt(quantity), customer_Name)
                    askCommands()
                })
            })
        })
    })
}

function addProduct(id, name, quantity, customer_Name) {
    if (product.has(id)) {
        console.log(`${id} is already exist`)
    } else {
        product.set(id, { name, quantity, customer_Name })
        console.log(`ID: ${id} , Name: ${name} , Quantity: ${quantity}, Customer Name: ${customer_Name} is successfully added!`)
    }
}

// remove

function removeCommand() {
    rl.question('Enter the order ID: ', function (id) {
        removeOrder(id)
        askCommands()
    })
}

function removeOrder(id) {
    if (product.has(id)) {
        product.delete(id)
        console.log(`Successfully id ${id} removed!`)
    } else {
        console.log('No items found!')
    }
}

// search

function searchCommand() {
    rl.question('Enter the search item: ', function (search) {
        searchOrder(search);
        askCommands();
    })
}

function searchOrder(search) {
    const results = []
    for (const [id, orders] of product) {
        if (id.includes(search) || orders.name.includes(search) || orders.parseInt(quantity).includes(search) || orders.customer_Name.includes(search)) {
            results.push({ id, ...orders })
        }
    }
    if (results.length > 0) {
        console.log(`Search items: `, results)
    } else {
        console.log('No found search item!')
    }
}

// update

function updateCommand() {
    rl.question('Enter the order id: ', function (id) {
        rl.question('Enter the product name: ', function (newName) {
            rl.question('Enter the quantity: ', function (newQuantity) {
                rl.question('Enter the customer name: ', function (newCustomerName) {
                    updateOrder(id, newName, newQuantity ? parseInt(newQuantity) : undefined, newCustomerName)
                    askCommands();
                })
            })
        })
    })
}

function updateOrder(id, newName, newQuantity, newCustomerName) {
    if (product.has(id)) {
        const item = product.get(id)
        item.name = newName || item.name;
        item.quantity = newQuantity !== undefined ? newQuantity : item.quantity
        item.customer_Name = newCustomerName || item.customer_Name
        product.set(id,item)
    console.log('Updated Items!')
    console.log(`id: ${id} name: ${newName} quantity: ${newQuantity} customer name: ${newCustomerName}`)
    } else{
        console.log(`${id} is not found!`)
    }

}

function summary() {
    if (product.size > 0) {
        console.log('Product Orders Summary!')
        for(const[id,oredrs] of product){
            console.log(`id: ${id} | name: ${oredrs.name} | quantity: ${oredrs.quantity} | customer name: ${oredrs.customer_Name}`)
        }
        
    } else {
        console.log('No items found!')
    }
}

askCommands()