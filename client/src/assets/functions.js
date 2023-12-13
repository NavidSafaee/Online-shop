import {jwtDecode} from 'jwt-decode'

const Multiplier = (num, c) => {
    return num * c
}

const isTokenExpired = (token) => {
    if (!token) {
        return true;
    }

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decodedToken.exp < currentTime;
}

const calcDiscountedPrice = product => {
    if (product.discount) {
        product.newPrice = (product.price * (1 - product.discount)).toFixed(2)
        return product.newPrice
    } else {
        return product.price
    }
}

export { Multiplier, isTokenExpired, calcDiscountedPrice }