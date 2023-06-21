class ShoppingCart{
    constructor(){
        //Creates empty object for item storage
        this.items = {};
        //Defines value/cost of each item
        this.itemValue = {
            banana : 0.5,
            milk : 6.3,
            butter : 4,
            raspberry : 1,
            blueberry : 0.8
        };
    }

    addToCart(item, quantity){
        //If quantity is less than or equal to zero or not a string, hit user with error.
        if(quantity <= 0 || typeof item !== 'string'){
            throw new Error('Invalid input!');
        }
        //If the object already has an item like this, add the quantity to the existing quantity.
        if(this.items.hasOwnProperty(item)){
            this.items[item] += quantity;
        } else{
            //If this item doesn't exist yet in the object, add it with the quantity.
            this.items[item] = quantity;
        }
    }

    removeFromCart(item, quantity){
        if(quantity <= 0 || typeof item !== 'string'){
            throw new Error('Invalid input!');
        }
        // If the item exists in the object, you can remove it from the object.
        if(this.items.hasOwnProperty(item)){
            //If passed quantity is less than or equal to current quantity, decrement.
            if(quantity <= this.items[item]){
                this.items[item] -= quantity;
            } else {
                //Otherwise, delete the item from the object.
                delete this.items[item];
            }
        } else {
            //Else statement to hasOwnProperty if block
            throw new Error('Item must exist in the object to remove!');
        }
    }

    calculateTotal(){
        let total = 0;
        //Iterates through object, accessing every item
        for(const item in this.items){
            //Checks if item exists
            if(this.items.hasOwnProperty(item)){
                const quantity = this.items[item];
                //Checks if item value is defined.
                if(this.itemValue.hasOwnProperty(item)){
                    const cost = this.itemValue[item];
                    //Multiplies quantity by cost to get total price of goods
                    total += quantity * cost;             
                }
            }
        }
        return total;
    }
};

module.exports = ShoppingCart;