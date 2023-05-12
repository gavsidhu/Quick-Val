import LandingPageList from "@/components/app/LandingPageList";
import Layout from "@/components/app/Layout";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { supabase } from "@/lib/supabaseClient";
import { GetServerSidePropsContext } from "next";
import { Database } from "../../../types_db";
import { homeNavigation } from "@/constants/navigation";
import PaymentModal from "@/components/app/PaymentModal";
import { useState } from "react";
import { useRouter } from "next/router";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

type Props = {
  pages: Database["public"]["Tables"]["landing_pages"]["Row"][];
};

export default function Home({ pages }: Props) {
  return (
    <main>
      <Layout title='Home' navigation={homeNavigation}>
        <div className='py-8'>
          <LandingPageList initialPages={pages} />
        </div>
      </Layout>
    </main>
  );
}
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
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

  const pageData = await supabaseAdmin
    .from("landing_pages")
    .select("*")
    .eq("user_id", session.user.id);
  const pages = pageData.data;
  return {
    props: { pages },
  };
}
