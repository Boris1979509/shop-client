export default async (url, config = null) => {
    config = config || {method: 'get'}; // default value

    /**
     * State
     * @type {{response: null, fetching: boolean, errors: null}}
     */
    const state = {
        response: null,
        errors: null,
        fetching: true
    };
    /**
     * Fetch data
     * @returns {Promise<{response: null, fetching: boolean, errors: null}>}
     */
    const fetch = async () => {
        try {
            state.response = await axios.request({
                url,
                ...config
            });
        } catch (errors) {
            if (errors.response.status === 422) { // Validation errors
                state.errors = errors.response.data.errors
            }
            if (errors.response.status === 429) { // Too Many Attempts
                state.errors = errors.response.data.message
            }
        } finally {
            state.fetching = false
        }
        return state;
    };
    return await fetch();
};
