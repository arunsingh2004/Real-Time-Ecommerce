import React from "react";
import Link from "next/link";
import mongoose from "mongoose";
import Product from "@/models/product";
import connectDb from "@/middleware/mongoose";

const Sticker = ({ products }) => {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {Object.keys(products).length === 0 && (
              <p>Sorry Currently all Sticker are out stock</p>
            )}
            {Object.keys(products).map((item) => {
              return (
                <Link
                  passHref={true}
                  key={products[item]._id}
                  href={`/product/${products[item].slug}`}
                >
                  <div className="lg:w-auto md:w-auto sm:w-52 p-12 m-6 shadow-lg ">
                    <div className="block relative rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="m-auto  md:h-[36vh] block"
                        src={products[item].img}
                      />
                    </div>
                    <div className="mt-4 text-center md:text-left">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        {products[item].slug}
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {products[item].tittle}
                      </h2>
                      <p className="mt-1">{products[item].price}</p>

                      <div>
                        <p className="mt-1">
                          {/* {products[item].color.map((color) => {
                              return (
                                <span
                                  key={color}
                                  className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-[${color}]-600 rounded-full`}
                                >
                                  {color}
                                </span>
                              );
                            })} */}
                          {products[item].size.includes("S") && (
                            <span className="border border-gray-300 px-1 mx-1">
                              S
                            </span>
                          )}
                          {products[item].size.includes("M") && (
                            <span className="border border-gray-300 px-1 mx-1">
                              M
                            </span>
                          )}
                          {products[item].size.includes("L") && (
                            <span className="border border-gray-300 px-1 mx-1">
                              L
                            </span>
                          )}
                          {products[item].size.includes("XL") && (
                            <span className="border border-gray-300 px-1 mx-1">
                              XL
                            </span>
                          )}
                          {products[item].size.includes("XXL") && (
                            <span className="border border-gray-300 px-1 mx-1">
                              XXL
                            </span>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="mt-1">
                          {products[item].color.includes("red") && (
                            <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>
                          )}
                          {products[item].color.includes("yellow") && (
                            <button className="border-2 border-gray-300 ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none"></button>
                          )}
                          {products[item].color.includes("green") && (
                            <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({ category: "Sticker" });
  let Sticker = {};
  for (let item of products) {
    if (item.tittle in Sticker) {
      if (
        !Sticker[item.tittle].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        Sticker[item.tittle].color.push(item.color);
      }
      if (
        !Sticker[item.tittle].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        Sticker[item.tittle].size.push(item.size);
      }
    } else {
      Sticker[item.tittle] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        Sticker[item.tittle].color = [item.color];
        Sticker[item.tittle].size = [item.size];
      }
    }
  }
  //console.log(JSON.parse(JSON.stringify(Sticker)));
  return { props: { products: JSON.parse(JSON.stringify(Sticker)) } };
}

export default Sticker;
