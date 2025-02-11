
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Withdraw = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Coming Soon",
      description: "Withdrawal functionality will be available shortly.",
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Withdraw Funds</h2>

          <Tabs defaultValue="wallet" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="wallet">To Wallet</TabsTrigger>
              <TabsTrigger value="team">To Team</TabsTrigger>
            </TabsList>

            <TabsContent value="wallet">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    TRC-20 Wallet Address
                  </label>
                  <Input placeholder="Enter wallet address" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (USD)
                  </label>
                  <Input type="number" placeholder="Enter amount" min="0" />
                </div>
                <Button type="submit" className="w-full bg-[#9b87f5] hover:bg-[#8a76f4]">
                  Withdraw to Wallet
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="team">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipient's Login
                  </label>
                  <Input placeholder="Enter recipient's login" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (USD)
                  </label>
                  <Input type="number" placeholder="Enter amount" min="0" />
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
