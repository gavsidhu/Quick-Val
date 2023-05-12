import { Session } from "@/types/global";
import { Database } from "../../../types_db";

interface Props {
  analytics: Database["public"]["Tables"]["analytics"]["Row"][];
  payments: Database["public"]["Tables"]["payments"]["Row"][];
}

export default function DataCard({ analytics, payments }: Props) {
  function calculatePaymentStats(
    payments: Database["public"]["Tables"]["payments"]["Row"][]
  ) {
    let totalPayments = payments.length;
    let totalRevenue = 0;
    let totalRevenueToday = 0;
    const today = new Date().setHours(0, 0, 0, 0);

    for (let payment of payments) {
      if (payment.amount) {
        totalRevenue += payment.amount;
        if (
          new Date(payment.created_at as string).setHours(0, 0, 0, 0) === today
        ) {
          totalRevenueToday += payment.amount;
        }
      }
    }

    return [
      { name: "Total Payments", value: totalPayments },
      { name: "Total Revenue", value: `$${totalRevenue.toFixed(2)}` },
      {
        name: "Total Revenue Today",
        value: `$${totalRevenueToday.toFixed(2)}`,
      },
    ];
  }

  function calculateStats(
    sessions: Database["public"]["Tables"]["analytics"]["Row"][]
  ) {
    let totalSessions = sessions.length;
    let mobileSessions = 0;
    let uniqueSessions: Set<string> = new Set();

    for (let session of sessions) {
      if (session.device === "mobile") {
        mobileSessions++;
      }
      uniqueSessions.add(session.user_id as string);
    }

    const percentageMobile = (mobileSessions / totalSessions) * 100;
    const uniqueSessionsCount = uniqueSessions.size;

    return [
      { name: "Total Sessions", value: totalSessions },
      { name: "Mobile Devices", value: percentageMobile.toFixed(2) + "%" },
      { name: "Unique Sessions", value: uniqueSessionsCount },
    ];
  }

  const statsData = [
    ...calculateStats(analytics),
    ...calculatePaymentStats(payments),
  ];

  return (
    <div className='bg-white py-6'>
      <div className='mx-auto max-w-7xl'>
        <div className='grid grid-cols-1 gap-3 bg-white/5 sm:grid-cols-2 lg:grid-cols-3'>
          {statsData.map((stat, i) => (
            <div
              key={stat.name}
              className={`border border-black px-4 py-6 sm:px-6 lg:px-8 `}
            >
              <p className='text-sm font-medium leading-6 text-gray-700'>
                {stat.name}
              </p>
              <p className='mt-2 flex items-baseline gap-x-2'>
                <span className='text-4xl font-semibold tracking-tight text-black'>
                  {stat.value}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
