export const cartMath = () => {
    const quantity = cart => {
        return cart.reduce((acc, item) =>
            acc + item.quantity, 0);
    };
    const total = cart => {
        return cart.reduce((acc, item) =>
            acc + (item.price * item.quantity), 0);
    };
    const totalItem = item => {
        return item.price * item.quantity;
    };
    const isValidInputQuantity = input => {
        return Boolean(!Number.isInteger(input)
            || Math.sign(input) === -1
            || input === 0);
    };
    return {quantity, total, totalItem, isValidInputQuantity}
};
