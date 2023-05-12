import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser, useSupabaseClient, User } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Link from "next/link";
import { getAppURL, getURL } from "@/utils/helpers";
import { GetServerSidePropsContext } from "next";
import {
  createBrowserSupabaseClient,
  createServerSupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../types_db";
import { url } from "@/utils/url";

type Props = {
  user: User;
};
const login = () => {
  const router = useRouter();
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user]);

  if (!user)
    return (
      <div className='flex justify-center height-screen-helper py-12'>
        <div className='flex flex-col justify-between max-w-lg p-3 m-auto w-80 '>
          <div className='flex justify-center'>
            <Link href='/'>
              <h1 className='text-3xl text-black font-heading font-black'>
                Quick Val
              </h1>
              <p className='text-sm py-2 text-center'>Login or Sign up</p>
            </Link>
          </div>
          <p className='text-white text-sm py-4'></p>
          <div className='flex flex-col space-y-4'>
            <Auth
              providers={[]}
              supabaseClient={supabaseClient}
              redirectTo={getAppURL()}
              magicLink={false}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: "#000",
                      brandAccent: "#52525b",
                    },
                    fonts: {
                      buttonFontFamily: "inter",
                    },
                  },
                },
              }}
              theme='default'
              localization={{
                variables: {
                  sign_in: {
                    email_label: "Your email address",
                    password_label: "Your strong password",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    );
};

export default login;
