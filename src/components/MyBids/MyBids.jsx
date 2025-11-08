import React, { useEffect, useState } from "react";
// import { AtuhContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const MyBids = () => {
  const { user } = useAuth();
  const [bids, setBids] = useState([]);

  // console.log("token", user.accessToken);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/bids?email=${user.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`, // use jwt token to verfiy
        },
      })
        .then((res) => res.json())
        .then((data) => {
          //   console.log(data);
          setBids(data);
        });
    }
  }, [user]);

  // useEffect(() => {
  //   if (user?.email) {
  //     fetch(`http://localhost:3000/bids?email=${user.email}`, {
  //       headers: {
  //         authorization: `Bearer ${user.accessToken}`, // use firebase access token to varify users
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         //   console.log(data);
  //         setBids(data);
  //       });
  //   }
  // }, [user]);

  const handleDeleteBid = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/bids/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your bid has been deleted.",
                icon: "success",
              });
              const remainingBids = bids.filter((bid) => bid._id !== _id);
              setBids(remainingBids);
            }
          });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg overflow-hidden">
        {/* Title */}
        <h1 className="text-center text-2xl md:text-3xl font-bold py-6 border-b border-gray-200">
          My Bids: <span className="text-purple-600">{bids.length}</span>
        </h1>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-800 uppercase text-xs">
              <tr>
                <th className="py-3 px-5">SL No</th>
                <th className="py-3 px-5">Product</th>
                {/* <th className="py-3 px-5">Seller</th> */}
                <th className="py-3 px-5">Bid Price</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5">Actions</th>
              </tr>
            </thead>

            <tbody>
              {bids.map((bid, index) => (
                <tr
                  key={bid._id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="py-4 px-5">{index + 1}</td>

                  {/* Product */}
                  <td className="py-4 px-5 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-md"></div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {bid.product}
                      </p>
                      {/* <p className="text-gray-500 text-xs">{bid.price}</p> */}
                    </div>
                  </td>

                  {/* Seller */}
                  {/* <td className="py-4 px-5 flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {bid.seller}
                      </p>
                      <p className="text-xs text-gray-500">{bid.email}</p>
                    </div>
                  </td> */}

                  {/* Bid Price */}
                  <td className="py-4 px-5 font-semibold text-gray-800">
                    {bid.bid_price}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-5">
                    {/* <span className="bg-yellow-400/20 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {bid.status}
                    </span> */}
                    {bid.status === "pending" ? (
                      <div className="badge badge-warning">{bid.status}</div>
                    ) : (
                      <div className="badge badge-success">{bid.status}</div>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-5">
                    <button
                      onClick={() => handleDeleteBid(bid._id)}
                      className="text-red-500 border border-red-500 text-xs font-semibold px-3 py-1 rounded-md hover:bg-red-500 hover:text-white transition"
                    >
                      Remove Bid
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBids;
