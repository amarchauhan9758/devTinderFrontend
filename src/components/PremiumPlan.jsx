import axios from "axios";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utils/globalApi";

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="h-4 w-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12.75l6 6 9-13.5"
    />
  </svg>
);

const StarIcon = ({ size = 14 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className="drop-shadow"
    style={{ width: size, height: size }}
  >
    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.868 1.48 8.269L12 18.896l-7.416 4.547 1.48-8.269L0 9.306l8.332-1.151z" />
  </svg>
);

const CrownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className="h-6 w-6"
  >
    <path d="M5 16l-3-9 5 3 5-7 5 7 5-3-3 9H5z" />
  </svg>
);

const SparklesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className="h-4 w-4"
  >
    <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2zM5 20l.75 2.25L8 23l-2.25.75L5 26l-.75-2.25L2 23l2.25-.75L5 20zm14-2l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
  </svg>
);

const Perk = ({ children }) => (
  <div className="flex items-center gap-2 text-sm md:text-base">
    <CheckIcon />
    <span>{children}</span>
  </div>
);

function PremiumPlan() {
  const [isUserPremium, setIsUserPremium] = useState(false);
  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });

    if (res?.data?.isPremium) {
      setIsUserPremium(true);
    }
  };

  const handlePayment = async (type) => {
    try {
      const response = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true }
      );

      const { orderId, amount, currency, notes } = response.data;

      // Open Razorpay Checkout
      const options = {
        key: "rzp_test_R5ZVQ81Am4moZQ", // Replace with your Razorpay key_id
        amount,
        currency,
        name: "Dev Tinder",
        description: "Test Transaction",
        order_id: orderId, // This is the order_id created in the backend

        prefill: {
          name: notes?.firstName + " " + notes?.lastName,
          email: notes?.emailId,
          contact: "9999999999",
        },
        theme: {
          color: "#C564CF",
        },
        handler: function (response) {
          console.log("Payment success response from Razorpay:", response);
          verifyPremiumUser(); // call your verification API
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen text-purple-600  w-full bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-6xl">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Memberships
          </h1>
          <p className="mt-2 text-slate-600 md:text-lg">
            Choose the plan that fits you best. Both cards are responsive and
            look cool 😎
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="relative rounded-3xl p-[2px] bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600 shadow-xl">
            <div className="relative rounded-3xl h-full bg-white/90 backdrop-blur p-6 md:p-8">
              <StarBorder />
              <div className="flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-200 to-amber-500">
                  <CrownIcon />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                    Premium Gold
                  </h2>
                  <div className="flex items-center gap-2 text-amber-700">
                    <SparklesIcon />
                    <span className="text-sm md:text-base font-medium">
                      Top-tier perks & priority support
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="text-3xl md:text-4xl font-bold">
                    ₹999
                    <span className="text-base font-semibold text-slate-500">
                      /mo
                    </span>
                  </div>
                  <p className="text-slate-600 mt-1">Best for power users</p>
                </div>
                <button
                  onClick={() => handlePayment("gold")}
                  className="group relative inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold text-slate-900 transition-transform active:scale-95"
                >
                  <span className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-600" />
                  <span className="relative rounded-[14px] bg-gradient-to-b from-amber-200 to-yellow-200 px-5 py-2.5 shadow">
                    Get Gold
                  </span>
                </button>
              </div>
              <div className="mt-6 grid gap-3 md:gap-4">
                <Perk>Priority customer support</Perk>
                <Perk>Unlimited access to premium features</Perk>
                <Perk>Early access to new releases</Perk>
                <Perk>Exclusive gold-only discounts</Perk>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl p-[2px] bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500 shadow-xl">
            <div className="rounded-3xl h-full bg-white p-6 md:p-8">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-200 to-slate-400">
                  <SparklesIcon />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                    Silver Membership
                  </h2>
                  <div className="text-slate-600 text-sm md:text-base">
                    Solid essentials for everyday users
                  </div>
                </div>
              </div>
              <div className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="text-3xl md:text-4xl font-bold">
                    ₹499
                    <span className="text-base font-semibold text-slate-500">
                      /mo
                    </span>
                  </div>
                  <p className="text-slate-600 mt-1">
                    Great value starter plan
                  </p>
                </div>
                <button
                  onClick={() => handlePayment("silver")}
                  className="rounded-2xl px-6 py-3 font-semibold bg-slate-800 text-white shadow transition-transform active:scale-95"
                >
                  Get Silver
                </button>
              </div>
              <div className="mt-6 grid gap-3 md:gap-4">
                <Perk>Standard support</Perk>
                <Perk>Access to core features</Perk>
                <Perk>Community updates</Perk>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PremiumPlan;

function StarBorder() {
  const positions = [
    { top: 8, left: 8, size: 14 },
    { top: 8, right: 8, size: 14 },
    { bottom: 8, left: 8, size: 14 },
    { bottom: 8, right: 8, size: 14 },
    { top: 8, left: "50%", size: 12, translateX: "-50%" },
    { bottom: 8, left: "50%", size: 12, translateX: "-50%" },
    { left: 8, top: "50%", size: 12, translateY: "-50%" },
    { right: 8, top: "50%", size: 12, translateY: "-50%" },
  ];
  return (
    <div className="pointer-events-none absolute inset-0">
      {positions.map((pos, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            ...("top" in pos ? { top: pos.top } : {}),
            ...("bottom" in pos ? { bottom: pos.bottom } : {}),
            ...("left" in pos ? { left: pos.left } : {}),
            ...("right" in pos ? { right: pos.right } : {}),
            transform: `${
              pos.translateX ? `translateX(${pos.translateX})` : ""
            } ${pos.translateY ? ` translateY(${pos.translateY})` : ""}`,
          }}
        >
          <StarIcon size={pos.size} />
        </div>
      ))}
    </div>
  );
}
