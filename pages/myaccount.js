import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const MyAccount = ({}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const [user, setUser] = useState({ value: null });
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("myuser"));
    // console.log(localStorage.getItem("token"));
    console.log(user);
    if (!user) {
      router.push("/");
    }
    // if (user && user.token) {
    //   setName(user.name);
    //   setEmail(user.email);
    // }
    if (user && user.token) {
      setName(user.name);
      setEmail(user.email);
    }
    console.log(user);
  }, []);
  const handleChange = async (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
      // if (e.target.value.length == 6) {
      //   let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
      //   let pinJson = await pins.json();
      //   // console.log(pinJson);
      //   if (Object.keys(pinJson).includes(e.target.value)) {
      //     setCity(pinJson[e.target.value][0]);
      //     setState(pinJson[e.target.value][1]);
      //   }
      // } else {
      //   setState("");
      //   setCity("");
      // }
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "cpassword") {
      setCpassword(e.target.value);
    }
    // setTimeout(() => {
    //   if (
    //     name.length > 3 &&
    //     email.length > 3 &&
    //     phone.length > 3 &&
    //     address.length > 3 &&
    //     pincode.length > 3
    //   ) {
    //     setDisabled(false);
    //   } else {
    //     setDisabled(true);
    //   }
    // }, 1000);
  };
  return (
    <>
      <div className="container mx-auto my-9">
        <h1 className="text-xl text-center font-bold">Update Your Accouunt</h1>
        <div>
          <h2 className="font-bold text-xl">1.Delivery Details</h2>
          <div className="mx-auto flex my-2">
            <div className="px-2 w-1/2">
              <div className=" mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Name
                </label>
                <input
                  onChange={handleChange}
                  value={name}
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="px-2 w-1/2">
              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                {user && user.token ? (
                  <input
                    value={user.email}
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                ) : (
                  <input
                    onChange={handleChange}
                    value={email}
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="px-2 w-full">
            <div className="mb-4">
              <label
                htmlFor="address"
                className="leading-7 text-sm text-gray-600"
              >
                Address
              </label>
              <textarea
                name="address"
                onChange={handleChange}
                value={address}
                id="address"
                cols="30"
                rows="2"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
          </div>

          <div className="mx-auto flex my-2">
            <div className="px-2 w-1/2">
              <div className=" mb-4">
                <label
                  htmlFor="phone"
                  className="leading-7 text-sm text-gray-600"
                >
                  Phone
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  value={phone}
                  id="phone"
                  name="phone"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="px-2 w-1/2">
              <div className="relative mb-4">
                <label
                  htmlFor="pincode"
                  className="leading-7 text-sm text-gray-600"
                >
                  Pincode
                </label>
                <input
                  type="pincode"
                  onChange={handleChange}
                  value={pincode}
                  id="pincode"
                  name="pincode"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
          </div>
          <div className="mx-2">
            <Link href="">
              <button className=" flex mt-2 text-white bg-pink-500 border-0 py-2 px-12 focus:outline-none hover:bg-pink-300 rounded text-sm">
                {/* <BsFillBagCheckFill className="m-2" /> */}
                Submit
              </button>
            </Link>
          </div>
          <div>
            <h2 className="font-bold text-xl">2.Change password</h2>
            <div className="mx-auto flex my-2">
              <div className="px-2 w-1/2">
                <div className=" mb-4">
                  <label
                    htmlFor="password"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Password
                  </label>
                  <input
                    onChange={handleChange}
                    value={password}
                    type="password"
                    id="password"
                    name="password"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="px-2 w-1/2">
                <div className="relative mb-4">
                  <label
                    htmlFor="cpassword"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Confrim Password
                  </label>
                  <input
                    onChange={handleChange}
                    value={cpassword}
                    type="password"
                    id="cpassword"
                    name="cpassword"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
            </div>
            <div className="mx-2">
              <Link href="">
                <button className=" flex mt-2 text-white bg-pink-500 border-0 py-2 px-12 focus:outline-none hover:bg-pink-300 rounded text-sm">
                  {/* <BsFillBagCheckFill className="m-2" /> */}
                  Submit
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
