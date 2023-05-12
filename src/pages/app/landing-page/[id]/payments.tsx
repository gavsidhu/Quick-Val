import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { Database } from "../../../../../types_db";
import { GetServerSidePropsContext } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { ParsedUrlQuery } from "querystring";
import Layout from "@/components/app/Layout";
import { pageNavigation } from "@/constants/navigation";
import { useRouter } from "next/router";
import PaymentsTable from "@/components/app/PaymentsTable";

interface Params extends ParsedUrlQuery {
  id: string;
}

interface Props {
  payments: Database["public"]["Tables"]["payments"]["Row"][];
}

export default function Payments({ payments }: Props) {
  const router = useRouter();
  const { id } = router.query;
  const navigation = pageNavigation(parseInt(id as string));
  return (
    <Layout navigation={navigation} title='Payments'>
      <PaymentsTable payments={payments} />
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

  const paymentsData = await supabaseAdmin
    .from("payments")
    .select("*")
    .eq("landing_page_id", parseInt(id))
    .eq("user_id", session.user.id);

  return {
    props: {
      payments: paymentsData.data,
    },
  };
};
