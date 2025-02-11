
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { WalletIcon, ArrowUpCircle, ArrowDownCircle } from "lucide-react";

const Dashboard = () => {
  const { toast } = useToast();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        {/* Balance Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <WalletIcon className="w-12 h-12 mx-auto mb-4 text-[#9b87f5]" />
          <h2 className="text-2xl font-medium text-gray-600 mb-2">Current Balance</h2>
          <p className="text-4xl font-bold text-gray-900">$0.00</p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            onClick={() => toast({ title: "Coming soon", description: "Deposit functionality will be available shortly." })}
            className="bg-[#9b87f5] hover:bg-[#8a76f4] h-16 text-lg"
          >
            <ArrowUpCircle className="mr-2 h-6 w-6" /> Deposit
          </Button>
          <Button
            onClick={() => toast({ title: "Coming soon", description: "Withdrawal functionality will be available shortly." })}
            className="bg-[#9b87f5] hover:bg-[#8a76f4] h-16 text-lg"
          >
            <ArrowDownCircle className="mr-2 h-6 w-6" /> Withdraw
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
