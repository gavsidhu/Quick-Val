/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-console */
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { PaymentIntent } from '@stripe/stripe-js';
import { buffer } from 'micro';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});
export const config = {
  api: {
    bodyParser: false,
  },
};

interface Subscription extends Stripe.Subscription {
  plan?: Stripe.Plan;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const signingSecret = process.env.STRIPE_SIGNING_SECRET as string;
  const sig = req.headers['stripe-signature'] as string;
  const reqBuffer = await buffer(req);
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signingSecret);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  try {
    // Handle the event
    switch (event.type) {
      case 'payment_intent.amount_capturable_updated':
        const paymentIntentAmountCapturableUpdated = event.data.object;
        // Then define and call a function to handle the event payment_intent.amount_capturable_updated
        break;
      case 'payment_intent.canceled':
        const paymentIntentCanceled = event.data.object;
        // Then define and call a function to handle the event payment_intent.canceled
        break;
      case 'payment_intent.created':
        const paymentIntentCreated = event.data.object;
        // Then define and call a function to handle the event payment_intent.created
        break;
      case 'payment_intent.partially_funded':
        const paymentIntentPartiallyFunded = event.data.object;
        // Then define and call a function to handle the event payment_intent.partially_funded
        break;
      case 'payment_intent.payment_failed':
        const paymentIntentPaymentFailed = event.data.object;
        // Then define and call a function to handle the event payment_intent.payment_failed
        break;
      case 'payment_intent.processing':
        const paymentIntentProcessing = event.data.object;
        // Then define and call a function to handle the event payment_intent.processing
        break;
      case 'payment_intent.requires_action':
        const paymentIntentRequiresAction = event.data.object;
        // Then define and call a function to handle the event payment_intent.requires_action
        break;
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data
          .object as Stripe.PaymentIntent;
        // Then define and call a function to handle the event payment_intent.succeeded
        try {
          const landing_page_id =
            paymentIntentSucceeded.metadata.landing_page_id;
          const user_id = paymentIntentSucceeded.metadata.user_id;

          const { data, error } = await supabaseAdmin.from('payments').insert({
            amount: paymentIntentSucceeded.amount,
            client_secret: paymentIntentSucceeded.client_secret,
            customer_id: paymentIntentSucceeded.customer as string,
            landing_page_id: parseInt(landing_page_id),
            payment_intent_created: paymentIntentSucceeded.created,
            payment_intent_id: paymentIntentSucceeded.id,
            status: paymentIntentSucceeded.status,
            user_id: user_id,
          });
          console.log(data, error);
        } catch (error) {
          console.log(error);
        }
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    res.send({ recieved: true });
  } catch (error) {
    res.status(500).json({
      code: 'webhook_failed',
      error,
    });
  }
};

export default handler;
