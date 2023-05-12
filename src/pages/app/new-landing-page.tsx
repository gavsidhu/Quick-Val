import NewLandingPageForm from "@/components/app/NewLandingPageForm";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../types_db";
import { GetServerSidePropsContext } from "next";

export default function NewLandingpage() {
  return <NewLandingPageForm />;
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
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

  return {
    props: {
      user: session.user,
    },
  };
};
