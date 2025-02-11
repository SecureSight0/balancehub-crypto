
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

const Requisites = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Coming Soon",
      description: "Requisites functionality will be available shortly.",
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Requisites</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Owner's Name
              </label>
              <Input placeholder="Enter owner's name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tag
              </label>
              <Input placeholder="Enter tag" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <Input placeholder="Enter phone number" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank
              </label>
              <Input placeholder="Enter bank name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Details
              </label>
              <Input placeholder="Enter account details" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <Input placeholder="Enter country" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <Input placeholder="Enter currency" />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="status" />
              <label
                htmlFor="status"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Completed
              </label>
            </div>

            <Button type="submit" className="w-full bg-[#9b87f5] hover:bg-[#8a76f4]">
              Save Requisites
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Requisites;
