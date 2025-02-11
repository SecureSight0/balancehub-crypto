
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Deposit = () => {
  const { toast } = useToast();
  const walletAddress = "TMUPJiCuf9B6tPoFj6hhrYhJyYvTuUCkyQ";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    toast({
      title: "Address Copied",
      description: "The wallet address has been copied to your clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Deposit Funds</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (USD)
              </label>
              <Input 
                type="number"
                placeholder="Enter amount"
                min="0"
              />
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg">
              <p className="text-yellow-800 text-sm">
                If you make the transfer after the specified time, the funds may be credited to another recipient. 
                If you transfer a different amount, the funds may be credited to another recipient.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                TRC-20 Wallet Address
              </label>
              <div className="flex gap-2">
                <Input 
                  value={walletAddress}
                  readOnly
                  className="font-mono"
                />
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="icon"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Timer would be implemented with actual countdown logic */}
            <div className="text-center">
              <p className="text-sm text-gray-600">Time remaining to complete transfer:</p>
              <p className="text-2xl font-bold text-gray-900">15:00</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Deposit;
