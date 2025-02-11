
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Search } from "lucide-react";

const TransactionHistory = () => {
  // Sample transaction data
  const transactions = [
    {
      id: 1,
      type: "deposit",
      method: "TRC-20",
      status: "Completed",
      originalAmount: 1000,
      finalAmount: 1000,
      createdAt: "2024-03-20",
      completedAt: "2024-03-20",
    },
    {
      id: 2,
      type: "withdrawal",
      method: "TRC-20",
      status: "Pending",
      originalAmount: 500,
      finalAmount: 495,
      createdAt: "2024-03-21",
      completedAt: "",
    },
    // Add more sample transactions as needed
  ];

  const [filter, setFilter] = useState({
    dateFrom: "",
    dateTo: "",
    type: "",
    status: "",
  });

  const filteredTransactions = transactions.filter(transaction => {
    const matchesDate = (!filter.dateFrom || transaction.createdAt >= filter.dateFrom) &&
                       (!filter.dateTo || transaction.createdAt <= filter.dateTo);
    const matchesType = !filter.type || transaction.type === filter.type;
    const matchesStatus = !filter.status || transaction.status === filter.status;
    
    return matchesDate && matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-8"
      >
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Transaction History</h2>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Input
              type="date"
              placeholder="From Date"
              value={filter.dateFrom}
              onChange={(e) => setFilter({...filter, dateFrom: e.target.value})}
            />
            <Input
              type="date"
              placeholder="To Date"
              value={filter.dateTo}
              onChange={(e) => setFilter({...filter, dateTo: e.target.value})}
            />
            <Select value={filter.type} onValueChange={(value) => setFilter({...filter, type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="deposit">Deposit</SelectItem>
                <SelectItem value="withdrawal">Withdrawal</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filter.status} onValueChange={(value) => setFilter({...filter, status: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Method</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Original Amount</th>
                  <th className="px-6 py-3">Final Amount</th>
                  <th className="px-6 py-3">Created</th>
                  <th className="px-6 py-3">Completed</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{transaction.id}</td>
                    <td className="px-6 py-4 capitalize">{transaction.type}</td>
                    <td className="px-6 py-4">{transaction.method}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === "Completed" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">${transaction.originalAmount}</td>
                    <td className="px-6 py-4">${transaction.finalAmount}</td>
                    <td className="px-6 py-4">{transaction.createdAt}</td>
                    <td className="px-6 py-4">{transaction.completedAt || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TransactionHistory;
