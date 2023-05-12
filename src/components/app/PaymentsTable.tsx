import { Database } from "../../../types_db";

interface Props {
  payments: Database["public"]["Tables"]["payments"]["Row"][];
}

export default function PaymentsTable({ payments }: Props) {
  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center'></div>
      <div className='mt-8 flow-root'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <table className='min-w-full divide-y divide-gray-300'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
                  >
                    Payment ID
                  </th>
                  <th
                    scope='col'
                    className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Payment Intent ID
                  </th>
                  <th
                    scope='col'
                    className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Customer ID
                  </th>
                  <th
                    scope='col'
                    className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Amount
                  </th>
                  <th
                    scope='col'
                    className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Status
                  </th>
                  <th
                    scope='col'
                    className='relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-0'
                  >
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 bg-white'>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td className='whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0'>
                      {payment.id}
                    </td>
                    <td className='whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900'>
                      {payment.payment_intent_id}
                    </td>
                    <td className='whitespace-nowrap px-2 py-2 text-sm text-gray-900'>
                      {payment.customer_id}
                    </td>
                    <td className='whitespace-nowrap px-2 py-2 text-sm text-gray-500'>
                      ${payment.amount.toFixed(2)}
                    </td>
                    <td className='whitespace-nowrap px-2 py-2 text-sm text-gray-500'>
                      {payment.status}
                    </td>
                    {/* <td className='relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0'>
                      <a
                        href='#'
                        className='text-indigo-600 hover:text-indigo-900'
                      >
                        Edit
                        <span className='sr-only'>, {payment.id}</span>
                      </a>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
