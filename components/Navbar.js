import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRef } from "react";
// import NavLogo from "../public/assets/nav.png";
import {
  AiOutlineShoppingCart,
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiFillCloseCircle,
  AiFillPlusSquare,
  AiFillMinusSquare,
  AiFillShopping,
  AiOutlineMinus,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";

const Navbar = ({ cart, addToCart, removeToCart, clearCart, subTotal }) => {
  //console.log(cart);
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };

  const ref = useRef();
  return (
    <div className="flex flex-col md:flex-row sticky top-0 bg-white z-10 justify-center md:justify-start items-center py-2 shadow-lg">
      <div className="logo mx-5">
        <Link href={"/"}>
          <Image src="/logo.png" width={100} height={40} alt="" />
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-2 md:space-x-8 font-bold md:font-normal md:text-md">
          <Link href={"/tshirt"}>
            <li>T-shirts</li>
          </Link>
          <Link href={"/hoddies"}>
            <li>Hoodies</li>
          </Link>
          <Link href={"/stickers"}>
            <li>Stickers</li>
          </Link>
          <Link href={"/mugs"}>
            <li>Mugs</li>
          </Link>
          {/* <Link href={'/'}><li>T-shirts</li></Link> */}
        </ul>
      </div>
      {/* //todo cart */}
      <div className="flex cart absolute right-0 top-4 text-3xl md:text-3xl mx-4 text-pink-500 hover:text-pink-600 cursor-pointer">
        <Link href={"/login"}>
          <MdAccountCircle className="mx-2" />
        </Link>

        <span onClick={toggleCart} className="relative inline-flex ">
          <AiOutlineShoppingCart className="" />
          {/* <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-pink-50 rounded-full -top-2 -right-2 ">{Object.keys(cart).qty}</div> */}
        </span>
      </div>

      {/* side bar */}
      <div
        ref={ref}
        className={`absolute w-72 bg-pink-100 sideCart overflow-y-scroll top-0 right-0 py-10 px-8 transform transition-transform ${
          Object.keys(cart).length !== 0 ? "translate-x-0" : "translate-x-full"
        } `}
      >
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-5 right-2 cursor-pointer text-2xl text-pink-500"
        >
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal  font-semibold">
          {Object.keys(cart).length == 0 && (
            <div className="my-4  font-semibold">Your Cart is Empty</div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-5">
                  <div className="w-2/3 font-semibold">
                    {cart[k].name}({cart[k].size}/{cart[k].variant})
                  </div>
                  <div className="w-1/3 flex items-center justify-center font-semibold ">
                    <AiFillMinusCircle
                      onClick={() => {
                        removeToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="cursor-pointer text-pink-500"
                    />
                    <span className="mx-2"> {cart[k].qty}</span>
                    <AiFillPlusCircle
                      onClick={() => {
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="cursor-pointer text-pink-500"
                    />
                  </div>
                </div>
              </li>
            );
          })}
          <div className="font-bold">SubTotal:₹{subTotal}</div>
        </ol>
        <div className="flex">
          <Link href={"/checkout"}>
            <button className="flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-300 rounded text-sm">
              <BsFillBagCheckFill className="m-2" /> CheckOut
            </button>
          </Link>
          <button
            onClick={clearCart}
            className="flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-300 rounded text-sm"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
