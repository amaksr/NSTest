const formatCurrency = (amt: number) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
}).format(amt)

export { formatCurrency }