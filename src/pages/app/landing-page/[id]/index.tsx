import DataCard from "@/components/app/DataCard";
import Layout from "@/components/app/Layout";
import LineChart from "@/components/app/LineChart";
import { pageNavigation } from "@/constants/navigation";
import { fetchIpAddressAndCountry } from "@/utils/helpers";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Database } from "../../../../../types_db";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  id: string;
}

interface Props {
  analytics: Database["public"]["Tables"]["analytics"]["Row"][];
  payments: Database["public"]["Tables"]["payments"]["Row"][];
  landingPage: Database["public"]["Tables"]["landing_pages"]["Row"];
}

export default function LandingPageHome({
  analytics,
  payments,
  landingPage,
}: Props) {
  const router = useRouter();
  const { id } = router.query;
  const navigation = pageNavigation(parseInt(id as string));

  return (
    <Layout title={landingPage.title as string} navigation={navigation}>
      <div className='space-y-5'>
        <DataCard analytics={analytics} payments={payments} />
        {/* <LineChart /> */}
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.params as Params;
  const supabase = createServerSupabaseClient<Database>(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  const analyticsData = await supabaseAdmin
    .from("analytics")
    .select("*")
    .eq("landing_page_id", parseInt(id))
    .eq("user_id", session.user.id);

  const paymentsData = await supabaseAdmin
    .from("payments")
    .select("*")
    .eq("landing_page_id", parseInt(id))
    .eq("user_id", session.user.id);

  const pageData = await supabaseAdmin
    .from("landing_pages")
    .select("*")
    .eq("id", parseInt(id));

  if (pageData.data) {
    const landingPage = pageData.data[0];
    return {
      props: {
        user: session.user,
        analytics: analyticsData.data,
        payments: paymentsData.data,
        landingPage,
      },
    };
  } else {
    return {
      props: {
        user: session.user,
        analytics: analyticsData.data,
        payments: paymentsData.data,
        landingPage: {},
      },
    };
  }
};
