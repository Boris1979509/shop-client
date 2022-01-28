export default (price) => {
    if (!Number.isInteger(price)) {
        return;
    }
    price = (price / 100);
    return price.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB'});
}
