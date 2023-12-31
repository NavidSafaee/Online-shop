/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react"
import styles from "./ShoppingCart.module.scss"
import Shopping_Cart_Item from "./Shopping_Cart_Item"
import baseURL from "../../baseURL"

function ShoppingCart() {

    const [cartProducts, setCartProducts] = useState([])
    const [isEmpty, setIsEmpty] = useState(true)

    useEffect(() => {
        setIsEmpty(false)
    }, [])

    useEffect(() => {
        fetch(`${baseURL}/products`, {
            method: "GET"
        })
            .then(res => {
                return res.json()
            })
            // .then(data => { setCartProducts(data.products) })
    }, [])

    return (
        <>
            <section className={styles.cartWrapper}>
                <div className={styles.header}>
                    <span className={styles.title}>Shopping cart</span>
                    <div className={styles.line}></div>
                </div>
                {isEmpty || !cartProducts.length ?
                    <div className={styles.empty_cart}>
                        <img src="./../../../../public/general_images/empty_cart.png" alt="empty_cart" />
                        <div className={styles.empty_message_box}>
                            <b className={styles.message_title}>Your cart is empty</b>
                            <p className={styles.message_text}>You have no items in your shopping cart.</p>
                            <p className={styles.message_text}>Let's go buy something!</p>
                            <button className={styles.shop_btn}>Shop Now</button>
                        </div>
                    </div>
                    :
                    <div className={styles.cart_body}>
                        <div className={styles.cart_list}>
                            {
                                cartProducts?.map(item => (
                                    <Shopping_Cart_Item
                                        key={item._id}
                                        img={item.imageUrl}
                                        title={item.title}
                                        rate={item.rate}
                                        price={(item.newPrice)? item.newPrice : item.price}
                                    />
                                ))
                            }
                        </div>
                        <div className={styles.checkout_box}>
                            <div className={styles.couponBox}>
                                <p className={styles.couponTitle}>Have coupon?</p>
                                <div className={styles.input_box}>
                                    <input type="text" placeholder="Coupon code" />
                                    <button className={styles.couponBtn}>Apply</button>
                                </div>
                            </div>
                            <div className={styles.facture}>
                                <div className={styles.item}>
                                    <span className={styles.itemTitle}>Total price:</span>
                                    <span className={styles.itemValue}>$125</span>
                                </div>
                                <div className={styles.item}>
                                    <span className={styles.itemTitle}>discount:</span>
                                    <span className={`${styles.itemValue} ${styles.red}`}>-$15</span>
                                </div>
                                <div className={styles.item}>
                                    <span className={styles.itemTitle}>TAX:</span>
                                    <span className={`${styles.itemValue} ${styles.green}`}>+$8</span>
                                </div>
                                <div className={styles.item}>
                                    <span className={styles.itemTitle}>Coupon:</span>
                                    <span className={`${styles.itemValue}`}>0</span>
                                </div>
                                <div className={styles.line}></div>
                                <div className={`${styles.item}`}>
                                    <span className={styles.itemTitle}>Total:</span>
                                    <span className={`${styles.itemValue} ${styles.finalValue}`}>$118</span>
                                </div>
                                <button className={styles.checkout_btn}>Checkout</button>
                            </div>
                        </div>
                    </div>
                }
            </section>
        </>
    )
}

export default ShoppingCart