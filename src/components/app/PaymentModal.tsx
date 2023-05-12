import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "../ui/Modal";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { url } from "@/utils/url";
import { useUser } from "@supabase/auth-helpers-react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  landingPageId: string | number;
};
export default function PaymentModal({ open, setOpen, landingPageId }: Props) {
  const [clientSecret, setClientSecret] = useState("");
  const user = useUser();
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${url}/api/payments/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ landingPageId, user_id: user?.id }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <Modal showModal={open} setShowModal={setOpen}>
      <div className='mx-auto bg-white p-6 rounded-xl'>
        {clientSecret && (
          <Elements
            options={options as StripeElementsOptions}
            stripe={stripePromise}
          >
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </Modal>
  );
}
