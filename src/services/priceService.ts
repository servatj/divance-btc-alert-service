
const getCurrentPrice  = async (symbol: string) => {
    const getProviderApi = (symbol: string) => {
        if (symbol.includes('BTC')) {
            return 'coindesk';
        } else {
            return 'coingecko';
        }
    }
}
