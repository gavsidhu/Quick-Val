import PhysicalProductTemplate from "@/components/templates/PhysicalProductTemplate";
import { physicalProductTemplateFields } from "@/constants/physicalProductTemplateData";
import { useState } from "react";
import { HiEye } from "react-icons/hi";
import _ from "lodash";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import axios from "axios";
import { Database } from "../../../../../types_db";

type Props = {
  landingPageData: Database["public"]["Tables"]["landing_pages"]["Row"];
};

export default function Editor({ landingPageData }: Props) {
  const [data, setData] = useState(landingPageData.content);
  const router = useRouter();
  const [filesToUpload, setFilesToUpload] = useState({});

  const id = router.query.id;

  const updateNestedData = (key: string, value: any) => {
    setData((prevData) => {
      const updatedData = { ...(prevData as object) }; // <-- use type assertion here
      _.set(updatedData, key, value);
      return updatedData;
    });
  };

  const onChange = (key: string, value: string, file?: File, url?: string) => {
    if (file) {
      setFilesToUpload((prevFiles) => ({ ...prevFiles, [key]: file }));

      if (url) {
        updateNestedData(key, url);
      }
    } else {
      updateNestedData(key, value);
    }
  };

  const saveDataToSupabase = async () => {
    const formData = new FormData();
    formData.append("id", id as string);
    formData.append("contentData", JSON.stringify(data));

    Object.entries(filesToUpload).forEach(([key, file]) => {
      // Use the 'key' value as the FormData key
      formData.append(key, file as Blob, key);
    });

    const response = await axios.post(
      "/api/landing-pages/update-content",
      formData
    );
    router.push("/app/");
  };

  const onFileChange = (
    key: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const inputId = e.target.id; // Get the input field's 'id' attribute

      setFilesToUpload((prevFiles) => ({
        ...prevFiles,
        [inputId]: selectedFile, // Use the 'inputId' as the key
      }));

      // Update the image URL in the data
      const fileUrl = URL.createObjectURL(selectedFile);
      onChange(key, "", selectedFile, fileUrl);
    }
  };

  const renderInputs = (
    fields: any[],
    data: any,
    onChange: (key: string, value: string, file?: File, url?: string) => void,
    parentKey?: string
  ) => {
    return fields.map((field) => {
      const updatedKey = parentKey ? `${parentKey}.${field.id}` : field.id;
      const inputAttributes = field.attributes ? field.attributes[0] : {};
      return (
        <div key={updatedKey} className='rounded-md shadow-sm space-y-1'>
          <label className='text-sm' htmlFor={updatedKey}>
            {field.label}:
          </label>
          {field.type === "file" ? (
            <input
              type='file'
              name={updatedKey}
              id={updatedKey}
              onChange={(e) => onFileChange(updatedKey, e)} // Pass the 'updatedKey' as the first argument
              {...inputAttributes}
              className='block w-full min-w-0 flex-1 rounded-md border border-gray-300 py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none'
            />
          ) : (
            <input
              type={field.type}
              name={updatedKey}
              id={updatedKey}
              placeholder={field.label}
              defaultValue={_.get(data, updatedKey)}
              onChange={(e) => onChange(updatedKey, e.target.value)}
              {...inputAttributes}
              className='block px-2 w-full min-w-0 flex-1 rounded-md border border-gray-300 py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none'
            />
          )}
        </div>
      );
    });
  };

  return (
    <>
      <div className='flex min-h-screen flex-col'>
        <header className='shrink-0 bg-gray-900'>
          <div className='mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8'>
            <h1 className='text-lg text-white'>{landingPageData.title}</h1>
            <div className='flex flex-row space-x-5 items-center'>
              {/* <button
                type='button'
                className='-m-2.5 p-2.5 text-gray-400 hover:text-gray-300'
              >
                <span className='sr-only'>Preview</span>
                <HiEye className='h-6 w-6' aria-hidden='true' />
              </button> */}
              <button
                type='button'
                className='rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                onClick={saveDataToSupabase}
              >
                Save & Exit
              </button>
            </div>
          </div>
        </header>

        {/* 3 column wrapper */}
        <div className='mx-auto w-full grow lg:flex'>
          {/* Main wrapper */}
          <div className='flex-1 xl:flex'>
            <div className='px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6'>
              {/* Main area */}
              <PhysicalProductTemplate data={data} />
            </div>
          </div>

          <div className='shrink-0 overflow-y-scroll border border-gray-200 px-4 py-6 sm:px-6 lg:w-96 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6'>
            {/* Right column */}
            <div className='space-y-4'>
              {renderInputs(
                physicalProductTemplateFields.fields,
                data,
                onChange
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { id } = ctx.params || {};
  if (!id) {
    return {
      notFound: true,
    };
  }

  const { data, error } = await supabaseAdmin
    .from("landing_pages")
    .select("*")
    .eq("id", parseInt(id as string));

  if (data === null) {
    return {
      notFound: true,
    };
  }
  const landingPageData = data[0];
  return {
    props: { landingPageData },
  };
}
