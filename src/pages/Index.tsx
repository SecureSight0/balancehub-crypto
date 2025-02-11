
import { useState } from "react";
import { motion } from "framer-motion";
import AuthModal from "@/components/auth/AuthModal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 pt-20 pb-32"
      >
        <div className="text-center space-y-6">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="px-4 py-1.5 text-sm font-medium text-purple-900 bg-purple-100 rounded-full"
          >
            Secure Crypto Management
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold text-gray-900"
          >
            Your Gateway to <br className="hidden sm:block" />
            Digital Assets
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="max-w-xl mx-auto text-lg text-gray-600"
          >
            Seamless deposits, withdrawals, and transfers with enterprise-grade security and intuitive interface.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
          >
            <Button
              onClick={() => setShowAuthModal(true)}
              className="bg-[#9b87f5] hover:bg-[#8a76f4] text-white px-8 py-6 rounded-lg text-lg font-medium transition-all duration-200 transform hover:scale-[1.02]"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                toast({
                  title: "Coming Soon",
                  description: "Our documentation will be available shortly.",
                });
              }}
              className="border-2 border-gray-200 hover:border-gray-300 px-8 py-6 rounded-lg text-lg font-medium transition-all duration-200"
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Auth Modal */}
      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

export default Index;
