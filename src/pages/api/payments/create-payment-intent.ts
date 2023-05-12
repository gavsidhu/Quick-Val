import { supabaseAdmin } from '@/lib/supabaseAdmin';
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});

interface ContentData {
  price?: string | number;
  [key: string]: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  const { landingPageId } = req.body;

  try {
    const { data, error } = await supabaseAdmin
      .from('landing_pages')
      .select('content')
      .eq('id', parseInt(landingPageId));
    if (!data || data.length < 1) {
      return res.status(400).json({ message: 'Not found' });
    }
    if (error) {
      return res.status(400).json({ message: 'There was an error', error });
    }

    const user = await supabaseAdmin
      .from('landing_pages')
      .select('user_id')
      .eq('id', parseInt(landingPageId));

    if (!user.data || user.data.length < 1) {
      return res.status(400).json({ message: 'User Not found' });
    }
    if (user.error) {
      return res.status(400).json({ message: 'There was an error', error });
    }

    const amount =
      parseFloat((data[0]?.content as ContentData)?.price as string) * 100;
    console.log(amount);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        user_id: user.data[0].user_id,
        landing_page_id: parseInt(landingPageId),
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
}
