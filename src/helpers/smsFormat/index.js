export const smsFormat = () => {
    /**
     *
     * @param ttl
     * @returns {number}
     */
    const getTimeLeft = ttl => {
        if (ttl && Number.isInteger(ttl)) {
            return Math.floor((ttl - new Date()) / 1000);
        }
    };

    return {getTimeLeft}
};
