class ShoppingCart{
    constructor(){
        this.items = {};
        this.itemValue = {
            banana : 0.5,
            milk : 6.3,
            butter : 4,
            raspberry : 1,
            blueberry : 0.8
        };
    }

    addToCart(item, quantity){
        if(this.items.hasOwnProperty(item)){
            this.items[item] += quantity;
        } else{
            this.items[item] = quantity;
        }
    }

    removeFromCart(item, quantity){
        if(this.items.hasOwnProperty(item)){
            const currentQuantity = quantity;
            if(currentQuantity < quantity){
                delete this.items[item];
            } else {
                this.items[item] -= quantity;
            }
        }
    }

    calculateTotal(){
        let total = 0;
        for(const item in this.items){
            const quantity = this.items[item];
            const cost = this.itemValue[item];
            total += quantity * cost;
        }
        return total;
    }
};

module.exports = ShoppingCart;