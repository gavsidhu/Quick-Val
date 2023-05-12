import DataCard from "@/components/app/DataCard";
import Layout from "@/components/app/Layout";
import LineChart from "@/components/app/LineChart";
import { pageNavigation } from "@/constants/navigation";
import { fetchIpAddressAndCountry } from "@/utils/helpers";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function LandingPageHome() {
  const router = useRouter();
  const { id } = router.query;
  const navigation = pageNavigation(parseInt(id as string));

  return (
    <Layout title='Landing page title' navigation={navigation}>
      <div>
        <DataCard />
        <LineChart />
      </div>
    </Layout>
  );
}
