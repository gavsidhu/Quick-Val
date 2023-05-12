import { supabase } from "@/lib/supabaseClient";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { Database } from "../../../../types_db";
import PhysicalProductTemplate from "@/components/templates/PhysicalProductTemplate";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { useEffect, useState } from "react";
import { fetchIpAddressAndCountry } from "@/utils/helpers";
import axios from "axios";
import PaymentModal from "@/components/app/PaymentModal";

interface SiteParams extends ParsedUrlQuery {
  site: string;
}

interface SiteProps {
  data: Database["public"]["Tables"]["landing_pages"]["Row"];
}

interface Props {
  data: Database["public"]["Tables"]["landing_pages"]["Row"];
}
export default function index({ data }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let recordId: number | null = null;

    (async () => {
      if (!data) {
        return;
      }

      // Send the initial data
      recordId = await sendAnalyticsData();

      const handleVisibilityChange = () => {
        if (document.visibilityState === "hidden" && recordId !== null) {
          updateAnalyticsData(recordId, true);
        }
      };

      window.addEventListener("visibilitychange", handleVisibilityChange);
      window.addEventListener("beforeunload", handleVisibilityChange);

      return () => {
        if (recordId !== null) {
          updateAnalyticsData(recordId);
        }

        window.removeEventListener("visibilitychange", handleVisibilityChange);
        window.removeEventListener("beforeunload", handleVisibilityChange);
      };
    })();
  }, [data]);

  async function sendAnalyticsData() {
    // Collect the required data
    const { ip_address, country } = await fetchIpAddressAndCountry();
    const page = window.location.href;
    const device = /Mobi/i.test(navigator.userAgent) ? "mobile" : "desktop";
    const visit_time = new Date().toISOString();
    const http_referer = document.referrer;

    const requestData = {
      landing_page_id: data.id,
      page,
      device,
      ip_address,
      visit_time,
      country,
      http_referer,
      user_id: data.user_id,
    };

    try {
      const response = await axios.post("/api/analytics", requestData);

      if (response.status !== 200) {
        console.error(response.data.error);
        return null;
      }

      // Return the ID of the inserted record
      return response.data.id;
    } catch (error) {
      console.error("Error sending analytics data:", error);
      return null;
    }
  }

  async function updateAnalyticsData(id: number, isVisibilityChange = false) {
    const requestData = {
      end_time: new Date().toISOString(),
    };

    if (isVisibilityChange && navigator.sendBeacon) {
      // Use sendBeacon for visibilitychange event
      const headers = { "Content-Type": "application/json" };
      const blob = new Blob([JSON.stringify(requestData)], {
        type: "application/json",
      });

      navigator.sendBeacon(`/api/analytics/${id}`, blob);
    } else {
      // Send the update using axios
      try {
        const response = await axios.put(`/api/analytics/${id}`, requestData);

        if (response.status !== 200) {
          console.error(response.data.error);
        }
      } catch (error) {
        console.error("Error updating analytics data:", error);
      }
    }
  }
  return (
    <>
      {data?.id && (
        <PaymentModal landingPageId={data?.id} open={open} setOpen={setOpen} />
      )}

      {data?.content && (
        <PhysicalProductTemplate setOpen={setOpen} data={data?.content} />
      )}
    </>
  );
}

export const getStaticPaths: GetStaticPaths<SiteParams> = async () => {
  // Fetch subdomains and custom domains from your database
  const { data } = await supabase
    .from("landing_pages")
    .select("subdomain, custom_domain");
  if (!data) {
    throw new Error("could not get data");
  }

  // Generate paths for subdomains and custom domains
  const subdomains = data
    .filter((site) => site.subdomain)
    .map((site) => site.subdomain);
  const domains = data
    .filter((site) => site.custom_domain)
    .map((site) => site.custom_domain);

  // Combine all paths and filter out any null values
  const allPaths = [...subdomains, ...domains].filter((path) => path !== null);

  // Return the paths in the required format
  return {
    paths: allPaths.map((path) => {
      return { params: { site: path as string } };
    }),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<SiteProps, SiteParams> = async ({
  params,
}) => {
  if (!params) {
    return { notFound: true, revalidate: 10 };
  }

  const { site } = params;
  const isCustomDomain = site.includes(".");
  const eq = isCustomDomain ? "custom_domain" : "subdomain";

  // Fetch site data based on subdomain or custom domain
  const { data: siteData } = await supabaseAdmin
    .from("landing_pages")
    .select("*")
    .eq(eq, site);

  // If the site is not found or siteData is null, return notFound property
  if (!siteData || siteData.length === 0) {
    return { notFound: true, revalidate: 10 };
  }
  // Return the site data as props
  return {
    props: {
      data: siteData[0],
    },
    revalidate: 10,
  };
};
