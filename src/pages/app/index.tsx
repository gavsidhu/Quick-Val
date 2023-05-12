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

type Props = {
  pages: Database["public"]["Tables"]["landing_pages"]["Row"][];
};

export default function Home({ pages }: Props) {
  const router = useRouter();
  const { id } = router.query;
  const [open, setOpen] = useState(true);
  supabase.auth.onAuthStateChange((event, session) => {
    console.log(event, session);
  });
  return (
    <main>
      <PaymentModal landingPageId={2} open={open} setOpen={setOpen} />
      <Layout title='Home' navigation={homeNavigation}>
        <div className='py-8'>
          <LandingPageList initialPages={pages} />
        </div>
      </Layout>
    </main>
  );
}
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { data } = await supabaseAdmin.auth.getSession();

  const pageData = await supabaseAdmin
    .from("landing_pages")
    .select("*")
    .eq("user_id", "bd8b316a-845c-45a0-bee7-168611a97574");
  const pages = pageData.data;
  return {
    props: { pages },
  };
}
