const checkHex = (value) => {
    return /^(([0-9A-Fa-f]{2}){3,4}|[0-9A-Fa-f]{3,4})$/.test(value)
}

export default checkHex;