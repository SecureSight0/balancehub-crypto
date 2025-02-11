
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const Withdraw = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState<number>(0);
  const [recipientLogin, setRecipientLogin] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  
  // Mock data - in a real app, this would come from your backend
  const currentBalance = 1000;
  const withdrawalFee = 0.01; // 1%

  const validateWithdrawal = (amount: number) => {
    if (amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount greater than 0.",
        variant: "destructive",
      });
      return false;
    }

    const totalWithFee = amount * (1 + withdrawalFee);
    if (totalWithFee > currentBalance) {
      toast({
        title: "Insufficient Balance",
        description: `You need ${totalWithFee.toFixed(2)} USD (including ${(withdrawalFee * 100)}% fee) but your balance is ${currentBalance} USD.`,
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleWalletWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateWithdrawal(amount)) return;

    if (!walletAddress.trim()) {
      toast({
        title: "Invalid Address",
        description: "Please enter a valid TRC-20 wallet address.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Withdrawal Initiated",
      description: `${amount} USD will be sent to ${walletAddress}`,
    });
  };

  const handleTeamTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateWithdrawal(amount)) return;

    if (!recipientLogin.trim()) {
      toast({
        title: "Invalid Recipient",
        description: "Please enter a valid recipient login.",
        variant: "destructive",
      });
      return;
    }

    // Mock recipient validation - in real app, this would check against your backend
    if (recipientLogin !== "demo") {
      toast({
        title: "Recipient Not Found",
        description: "The specified recipient login was not found.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Transfer Initiated",
      description: `${amount} USD will be transferred to ${recipientLogin}`,
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Withdraw Funds</h2>
          <p className="text-sm text-gray-600 mb-6">Current Balance: ${currentBalance}</p>

          <Tabs defaultValue="wallet" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="wallet">To Wallet</TabsTrigger>
              <TabsTrigger value="team">To Team</TabsTrigger>
            </TabsList>

            <TabsContent value="wallet">
              <form onSubmit={handleWalletWithdraw} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    TRC-20 Wallet Address
                  </label>
                  <Input 
                    placeholder="Enter wallet address" 
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (USD)
                  </label>
                  <Input 
                    type="number" 
                    placeholder="Enter amount" 
                    min="0"
                    value={amount || ""}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required
                  />
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-yellow-800 text-sm">
                    A {withdrawalFee * 100}% fee will be applied to this withdrawal.
                    Final amount to be received: ${amount ? (amount * (1 - withdrawalFee)).toFixed(2) : "0.00"}
                  </p>
                </div>
                <Button type="submit" className="w-full bg-[#9b87f5] hover:bg-[#8a76f4]">
                  Withdraw to Wallet
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="team">
              <form onSubmit={handleTeamTransfer} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipient's Login
                  </label>
                  <Input 
                    placeholder="Enter recipient's login" 
                    value={recipientLogin}
                    onChange={(e) => setRecipientLogin(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (USD)
                  </label>
                  <Input 
                    type="number" 
                    placeholder="Enter amount" 
                    min="0"
                    value={amount || ""}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required
                  />
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-yellow-800 text-sm">
                    A {withdrawalFee * 100}% fee will be applied to this transfer.
                    Final amount to be received: ${amount ? (amount * (1 - withdrawalFee)).toFixed(2) : "0.00"}
                  </p>
                </div>
                <Button type="submit" className="w-full bg-[#9b87f5] hover:bg-[#8a76f4]">
                  Transfer to Team
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
};

export default Withdraw;
