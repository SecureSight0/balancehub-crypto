
import { motion } from "framer-motion";

const BalanceHistory = () => {
  // Sample balance history data
  const history = [
    {
      id: 1,
      type: "income",
      transactionId: "TXN001",
      amount: 1000,
      description: "Deposit via TRC-20",
      initiatedAt: "2024-03-20",
      completedAt: "2024-03-20",
    },
    {
      id: 2,
      type: "expense",
      transactionId: "TXN002",
      amount: -500,
      description: "Withdrawal to Team Member",
      initiatedAt: "2024-03-21",
      completedAt: "2024-03-21",
    },
    // Add more sample history items as needed
  ];

  const groupedHistory = history.reduce((groups, item) => {
    const type = item.type;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(item);
    return groups;
  }, {} as Record<string, typeof history>);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-8"
      >
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Balance History</h2>

          {Object.entries(groupedHistory).map(([type, items]) => (
            <div key={type} className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 capitalize">
                {type} Transactions
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="px-6 py-3">Type</th>
                      <th className="px-6 py-3">Transaction ID</th>
                      <th className="px-6 py-3">Amount</th>
                      <th className="px-6 py-3">Description</th>
                      <th className="px-6 py-3">Initiated</th>
                      <th className="px-6 py-3">Completed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item.type === "income" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }`}>
                            {item.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">{item.transactionId}</td>
                        <td className="px-6 py-4">${Math.abs(item.amount)}</td>
                        <td className="px-6 py-4">{item.description}</td>
                        <td className="px-6 py-4">{item.initiatedAt}</td>
                        <td className="px-6 py-4">{item.completedAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default BalanceHistory;
