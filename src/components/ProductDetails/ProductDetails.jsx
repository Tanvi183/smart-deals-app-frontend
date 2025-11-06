import React, { use, useEffect, useRef, useState } from "react";
import { Link, useLoaderData } from "react-router";
import { AtuhContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const {
    _id: productId,
    title,
    image,
    price_min,
    price_max,
    category,
    description,
    status,
  } = useLoaderData();
  //   console.log(product);
  const bidModalRef = useRef(null);
  const { user } = use(AtuhContext);
  const [bids, setBids] = useState([]);

  // bids loads from databse
  useEffect(() => {
    fetch(`http://localhost:3000/product/bids/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setBids(data);
      });
  }, [productId]);

  const handleBidModalOpen = () => {
    bidModalRef.current.showModal();
  };

  // Bid submit and send to database
  const handleBidSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = e.target.bid.value;
    // console.log(name, email, bid, productId)
    const newBid = {
      product: productId,
      buyer_name: name,
      buyer_email: email,
      buyer_image: user?.photoURL,
      bid_price: bid,
      status: "pending",
    };

    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("Bids Place Successfully ", data);
        if (data.insertedId) {
          bidModalRef.current.close();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your bid has been placed.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        // add the new bid to the state
        newBid._id = data.insertedId;
        const newBids = [...bids, newBid];
        newBids.sort((a, b) => b.bid_price - a.bid_price);
        setBids(newBids);
      });
  };

  return (
    <div>
      {/* product info */}
      <div>
        <div className=" bg-gray-50 flex justify-center items-center py-10 px-4">
          <div className="bg-white rounded-lg shadow-md w-full max-w-7xl grid md:grid-cols-2 gap-6 p-6">
            {/* Left Section - Image & Description */}
            <div>
              {/* Image Placeholder */}
              <div className="w-full h-72 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                {image ? (
                  <img src={image} alt="" />
                ) : (
                  <span className="text-gray-400 text-sm">Product Image</span>
                )}
              </div>

              {/* Product Description */}
              <div className="bg-gray-50 rounded-md p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Product Description
                </h2>
                <div className="flex items-center justify-between text-sm mb-2">
                  <p>
                    <span className="font-semibold text-purple-600">
                      Condition:
                    </span>{" "}
                    New
                  </p>
                  <p>
                    <span className="font-semibold text-purple-600">
                      Usage Time:
                    </span>{" "}
                    3 Months
                  </p>
                </div>
                <p>{description}</p>
              </div>
            </div>

            {/* Right Section - Product Info */}
            <div className="flex flex-col justify-between">
              <div>
                <Link
                  to="/"
                  className="text-sm text-gray-600 hover:text-purple-600 mb-2"
                >
                  &larr; Back To Products
                </Link>

                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  {title}
                </h1>
                <span className="inline-block bg-purple-100 text-purple-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {category}
                </span>

                <p className="text-green-600 text-2xl font-bold mb-2">
                  ${price_min} - {price_max}
                </p>
                <p className="text-gray-500 text-sm mb-6">Price starts from</p>

                {/* Product Details */}
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Product Details
                  </h3>
                  <p className="text-sm text-gray-600">
                    Product ID: <span className="font-mono">{productId}</span>
                  </p>
                  <p className="text-sm text-yellow-600 font-semibold mt-2">
                    Status : {status}
                  </p>
                  {/* <p className="text-sm text-gray-600">Posted: {created_at}</p> */}
                </div>

                {/* Seller Information */}
                {/* <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Seller Information
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">
                        Sara Chen
                      </p>
                      <p className="text-xs text-gray-500">
                        crafts.by.sara@shop.net
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Location: Los Angeles, CA
                  </p>
                  <p className="text-sm text-gray-600">
                    Contact: sara.chen_contact
                  </p>
                </div> */}
              </div>

              {/* Buy Button */}
              <button onClick={handleBidModalOpen} className="btn btn-primary">
                I Want Buy This Product
              </button>
            </div>
          </div>
        </div>

        {/* bids model */}
        <div>
          <dialog
            ref={bidModalRef}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Give the best offer!</h3>
              <p className="py-4">Offer something seller can not resist</p>
              <form onSubmit={handleBidSubmit}>
                <fieldset className="fieldset">
                  <label className="label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="input"
                    readOnly
                    defaultValue={user?.displayName}
                  />
                  {/* email */}
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input"
                    name="email"
                    readOnly
                    defaultValue={user?.email}
                  />
                  {/* bid amount */}
                  <label className="label">Bid</label>
                  <input
                    type="text"
                    name="bid"
                    className="input"
                    placeholder="Your Bid"
                  />
                  <button className="btn btn-neutral mt-4">
                    Please your bid
                  </button>
                </fieldset>
              </form>

              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Cancel</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>

      {/* bids for this product */}
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl">
          Bids for this Product:{" "}
          <span className="text-primary">{bids.length}</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>SL No.</th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Bid Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {bids.map((bid, index) => (
                <tr>
                  <th>{index + 1} </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          {bid.buyer_image ? (
                            <img
                              src={bid.buyer_image}
                              alt={bid.buyer_name}
                            />
                          ) : (
                            <img
                              src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                              alt="Avatar Tailwind CSS Component"
                            />
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{bid.buyer_name}</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>{bid.buyer_email}</td>
                  <td>{bid.bid_price}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              ))}
              {/* row 2 */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
