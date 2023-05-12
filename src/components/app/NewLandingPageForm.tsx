import { physicalProductTemplateInitialData } from "@/constants/physicalProductTemplateData";
import { supabase } from "@/lib/supabaseClient";
import { url } from "@/utils/url";
import { Listbox, RadioGroup, Transition } from "@headlessui/react";
import { useUser } from "@supabase/auth-helpers-react";
import axios from "axios";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { HiCheck, HiCheckCircle, HiChevronUpDown } from "react-icons/hi2";

const goals = [
  { title: "Generate sales", value: "sales" },
  // { title: "Generate waitlist subscribers", value: "waitlist" },
];

const templates = [
  {
    id: "1",
    title: "Default",
    goal: "sales",
    description: "A simple landing page optimized for sales.",
    content: physicalProductTemplateInitialData,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NewLandingPageForm() {
  const user = useUser();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState(goals[0]);
  const [template, setTemplate] = useState(templates[0]);
  const [landingPageData, setLandingPageData] = useState({
    title: "",
    description: "",
    subdomain: "",
  });

  const nextStep = async () => {
    switch (step) {
      case 0:
        if (
          !landingPageData.title ||
          !landingPageData.description ||
          !landingPageData.subdomain
        ) {
          return alert("Please fill in all fields.");
        }
        const response = await axios.post(
          `${url}/api/landing-pages/check-subdomain`,
          {
            subdomain: landingPageData.subdomain,
          }
        );
        if (response.data.data.length > 0) {
          return alert("Subdomain taken. Please try another one.");
        }
        return setStep(step + 1);
      case 1:
        if (!template) {
          return alert("Please select a template");
        }
        setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLandingPageData({ ...landingPageData, [e.target.name]: e.target.value });
  };

  const createLandingPage = async () => {
    try {
      const response = await axios.post("/api/landing-pages", {
        title: landingPageData.title,
        description: landingPageData.description,
        subdomain: landingPageData.subdomain,
        user_id: user?.id,
        template_type: template.goal,
        template_id: template.id,
        goal: goal.value,
        content: template.content,
      });
      router.push("/");
    } catch (error) {
      console.error("Error creating site: ", error);
    }
  };
  return (
    <div className='flex h-screen'>
      <div className='w-1/2 m-auto px-8 py-8 bg-white border border-black rounded-lg'>
        {/* Add name, description and subdomain */}
        {step === 0 && (
          <div className='w-full space-y-4'>
            <h2 className='text-2xl text-center font-heading font-black'>
              Create a new landing page
            </h2>
            <div className='space-y-4'>
              <div className=' rounded-md'>
                <input
                  type='text'
                  name='title'
                  id='title'
                  required
                  placeholder='Landing Page Title'
                  onChange={(e) => onChange(e)}
                  className='block px-2 w-full min-w-0 flex-1 rounded-md border border-gray-300 py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none'
                />
              </div>
              <div className=' rounded-md'>
                <textarea
                  name='description'
                  id='description'
                  required
                  placeholder='Description'
                  onChange={(e) => onChange(e)}
                  className='block resize-none px-2 w-full min-w-0 flex-1 rounded-md border border-gray-300 py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none'
                />
              </div>
              <div className='flex w-full rounded-md'>
                <input
                  type='text'
                  name='subdomain'
                  id='subdomain'
                  placeholder='Subdomain'
                  onChange={(e) => onChange(e)}
                  className='block px-2 w-full min-w-0 flex-1 border-r-0 rounded-r-none rounded-md border border-gray-300 py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none'
                />
                <span className='inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-3 text-gray-500 sm:text-sm'>
                  .quick-val.vercel.app
                </span>
              </div>
              <Listbox value={goal} onChange={setGoal}>
                <div className='relative mt-1'>
                  <Listbox.Button className='relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
                    <span className='block truncate'>{goal.title}</span>
                    <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                      <HiChevronUpDown
                        className='h-5 w-5 text-gray-400'
                        aria-hidden='true'
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave='transition ease-in duration-100'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                      {goals.map((goal, index) => (
                        <Listbox.Option
                          key={index}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active
                              ? "bg-amber-100 text-amber-900"
                              : "text-gray-900"
                            }`
                          }
                          value={goal}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${selected ? "font-medium" : "font-normal"
                                  }`}
                              >
                                {goal.title}
                              </span>
                              {selected ? (
                                <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                                  <HiCheck
                                    className='h-5 w-5'
                                    aria-hidden='true'
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
            <div className='mt-5 py-4 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3'></div>
          </div>
        )}
        {/* Choose landing page template */}
        {step === 1 && (
          <div className='text-center'>
            <RadioGroup value={template} onChange={setTemplate}>
              <RadioGroup.Label className='text-2xl text-center font-heading font-black'>
                Select a landing page template
              </RadioGroup.Label>

              <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4'>
                {templates
                  .filter((template) => template.goal === goal.value)
                  .map((template) => (
                    <RadioGroup.Option
                      key={template.id}
                      value={template}
                      className={({ checked, active }) =>
                        classNames(
                          checked ? "border-transparent" : "border-gray-300",
                          active ? "border-black ring-2 ring-black" : "",
                          "relative flex cursor-pointer rounded-lg border bg-white p-4 focus:outline-none"
                        )
                      }
                    >
                      {({ checked, active }) => (
                        <>
                          <span className='flex flex-1'>
                            <span className='flex flex-col space-y-3'>
                              <div className='h-[300px]'>
                                <img
                                  src='/template-mockup.png'
                                  className='max-w-full mx-auto max-h-full shadow-md'
                                />
                              </div>

                              <RadioGroup.Label
                                as='span'
                                className='block text-lg font-black text-gray-900'
                              >
                                {template.title}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as='span'
                                className='mt-1 flex items-center text-sm text-gray-500'
                              >
                                {template.description}
                              </RadioGroup.Description>
                            </span>
                          </span>

                          <span
                            className={classNames(
                              active ? "border" : "border-2",
                              checked ? "border-black" : "border-transparent",
                              "pointer-events-none absolute -inset-px rounded-lg"
                            )}
                            aria-hidden='true'
                          />
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
              </div>
            </RadioGroup>
          </div>
        )}
        <div className='mt-8 space-x-3 flex justify-end'>
          {step > 0 && (
            <button
              onClick={prevStep}
              className='rounded-md bg-black px-4 py-2.5 text-sm font-semibold text-white border border-black hover:text-black hover:bg-white'
            >
              Back
            </button>
          )}
          {step < 1 && (
            <button
              onClick={nextStep}
              className='rounded-md bg-black px-4 py-2.5 text-sm font-semibold text-white border border-black hover:text-black hover:bg-white'
            >
              Next
            </button>
          )}
          {step === 1 && (
            <button
              onClick={createLandingPage}
              className='rounded-md bg-black px-4 py-2.5 text-sm font-semibold text-white border border-black hover:text-black hover:bg-white'
            >
              Create
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
