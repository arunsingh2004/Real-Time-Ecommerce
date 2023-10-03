import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import LoadingBar from "react-top-loading-bar";
import Footer from "../components/Footer";
export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setsubTotal] = useState(0);
  const [user, setuser] = useState({ value: null });
  const [key, setkey] = useState();
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    //router chnage start
    router.events.on("routeChangeStart", () => setProgress(40));
    router.events.on("routeChangeStart", () => setProgress(100));
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }
    const token = localStorage.getItem("token");
    if (token) {
      setuser({ value: token });
      setkey(Math.random());
    }
  }, [router.query]);

  const logout = () => {
    localStorage.removeItem("token");
    setuser({ value: null });
    setkey(Math.random());
    router.push("/");
  };

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setsubTotal(subt);
    // console.log(subTotal);
    //console.log(setsubTotal);
  };

  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, variant };
    }
    setCart(newCart);
    saveCart(newCart);
    //setsubTotal(subTotal + qty * price);
  };

  const clearCart = () => {
    // request to react not immediate happen
    setCart({});
    saveCart({});
    setsubTotal(0);
  };
  const buyNow = (itemCode, qty, price, name, size, variant) => {
    //clearCart();
    // addToCart(slug, 1, 499, product.tittle, size, color);
    let newCart = { itemCode: { qty: 1, price, name, size, variant } };

    setCart(newCart);
    saveCart(newCart);
    console.log(newCart);
    router.push("/checkout");
  };

  const removeToCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (newCart[itemCode]) {
      newCart[itemCode].qty -= qty;
    }
    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
    // setsubTotal(subTotal + qty * price);
  };
  return (
    <>
      <LoadingBar
        color="red"
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />

      <Navbar
        logout={logout}
        user={user}
        key={key}
        cart={cart}
        addToCart={addToCart}
        removeToCart={removeToCart}
        saveCart={saveCart}
        clearCart={clearCart}
        subTotal={subTotal}
      />

      <Component
        cart={cart}
        addToCart={addToCart}
        removeToCart={removeToCart}
        saveCart={saveCart}
        clearCart={clearCart}
        subTotal={subTotal}
        buyNow={buyNow}
        {...pageProps}
      />
      <Footer />
    </>
  );
}
