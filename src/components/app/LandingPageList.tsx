import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { HiEllipsisVertical, HiPlus } from "react-icons/hi2";
import axios from "axios";
import Modal from "../ui/Modal";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Database } from "../../../types_db";
import Link from "next/link";
import { useRouter } from "next/router";
import { url } from "@/utils/url";
import { supabase } from "@/lib/supabaseClient";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  initialPages: Database["public"]["Tables"]["landing_pages"]["Row"][];
};

export default function LandingPageList({ initialPages }: Props) {
  const [pages, setPages] = useState(initialPages);
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    const handlePageDelete = (payload: any) => {
      setPages(pages.filter((page) => page.id != parseInt(payload.old.id)));
    };

    const subscription = supabase
      .channel("any")
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "landing_pages" },
        handlePageDelete
      )
      .subscribe();

    return () => {
      // Unsubscribe when the component is unmounted
      subscription.unsubscribe();
    };
  }, []);
  const handleDelete = async (e: React.MouseEvent<HTMLElement>) => {
    await axios.delete(
      `${url}/api/landing-pages/${e.currentTarget.getAttribute("data-id")}`
    );
  };
  return (
    <>
      <div>
        <div className='flex flex-row justify-end text-white items-center'>
          <div className='py-4'>
            <button
              type='button'
              className='inline-flex items-center gap-x-1.5 rounded-md bg-black py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-black border border-black'
              onClick={() => router.push("/new-landing-page")}
            >
              <HiPlus className='-ml-0.5 h-5 w-5' aria-hidden='true' />
              New landing page
            </button>
          </div>{" "}
        </div>
        <ul role='list' className=' px-4 rounded-lg border border-black'>
          {pages.map((page) => (
            <li
              key={page.id}
              className='flex items-center justify-between gap-x-6 py-5'
            >
              <div className='min-w-0'>
                <div className='flex flex-col spac items-start space-y-3 gap-x-3'>
                  <p className='text-base font-semibold leading-6 text-gray-900'>
                    {page.title}
                  </p>
                  <p className='text-sm font-semibold leading-6 text-gray-500'>
                    {page.description}
                  </p>
                </div>
              </div>
              <div className='flex flex-none items-center gap-x-4'>
                <Link
                  href={`/landing-page/${page.id}`}
                  className='hidden rounded-md bg-white px-2.5 py-1.5 text-sm hover:bg-black hover:text-white font-semibold text-black border-black border sm:block'
                >
                  View landing page
                  <span className='sr-only'>, {page.title}</span>
                </Link>
                <Menu as='div' className='relative flex-none'>
                  <Menu.Button className='-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900'>
                    <span className='sr-only'>Open options</span>
                    <HiEllipsisVertical
                      className='h-5 w-5'
                      aria-hidden='true'
                    />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none'>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href={`/editor/${page.id}`}
                            className={classNames(
                              active ? "bg-gray-50" : "",
                              "block px-3 py-1 text-sm leading-6 text-gray-900"
                            )}
                          >
                            Edit
                            <span className='sr-only'>, {page.title}</span>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }: { active: boolean }) => (
                          <Link
                            href={`${
                              process.env.NODE_ENV === "development"
                                ? `http://${page.subdomain}.localhost:3000/`
                                : `https://${page.subdomain}.quick-val.vercel.app/`
                            }`}
                            target='_blank'
                            className={classNames(
                              active ? "bg-gray-50" : "",
                              "block px-3 py-1 text-sm leading-6 text-gray-900"
                            )}
                          >
                            Preview
                            <span className='sr-only'>, {page.title}</span>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            data-id={page.id.toString()}
                            onClick={(e) => handleDelete(e)}
                            className={classNames(
                              active ? "bg-gray-50" : "",
                              "block px-3 py-1 text-sm leading-6 text-gray-900 w-full text-left"
                            )}
                          >
                            Delete
                            <span className='sr-only'>, {page.title}</span>
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
