export default {
    toStr(number) {
        if (!Number.isInteger(number) || number.toString().length !== 10) {
            return;
        }
        return number.toString().replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "+7 ($1) $2 $3 $4");
    },
    toNumber(string) {
        return (string.replace(/[^0-9]/g, '')).substr(1);
    }
};
