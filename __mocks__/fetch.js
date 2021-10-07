const mockDeFetch = jest.fn();
const mock = jest.fn().mockImplementation(() => {
    return {fetch: mockDeFetch}
})

module.exports = mock