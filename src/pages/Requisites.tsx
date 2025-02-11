
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Search } from "lucide-react";

interface Requisite {
  id: number;
  ownerName: string;
  tag: string;
  phone: string;
  bank: string;
  accountDetails: string;
  country: string;
  currency: string;
  completed: boolean;
}

const Requisites = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Requisite>("ownerName");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
  // Mock data - in a real app, this would come from your backend
  const [requisites, setRequisites] = useState<Requisite[]>([
    {
      id: 1,
      ownerName: "John Doe",
      tag: "personal",
      phone: "+1234567890",
      bank: "Example Bank",
      accountDetails: "1234567890",
      country: "USA",
      currency: "USD",
      completed: true,
    },
  ]);

  const [formData, setFormData] = useState<Omit<Requisite, "id">>({
    ownerName: "",
    tag: "",
    phone: "",
    bank: "",
    accountDetails: "",
    country: "",
    currency: "",
    completed: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequisite = {
      id: requisites.length + 1,
      ...formData,
    };
    setRequisites([...requisites, newRequisite]);
    setFormData({
      ownerName: "",
      tag: "",
      phone: "",
      bank: "",
      accountDetails: "",
      country: "",
      currency: "",
      completed: false,
    });
    toast({
      title: "Requisite Saved",
      description: "Your requisite has been saved successfully.",
    });
  };

  const handleSort = (field: keyof Requisite) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedRequisites = requisites
    .filter(req => 
      Object.values(req).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      const aValue = String(a[sortField]);
      const bValue = String(b[sortField]);
      return sortDirection === "asc" 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-8"
      >
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search requisites..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Requisites Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  {Object.keys(formData).map((field) => (
                    <th 
                      key={field}
                      className="px-6 py-3 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort(field as keyof Requisite)}
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                      {sortField === field && (
                        <span className="ml-1">
                          {sortDirection === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedRequisites.map((requisite) => (
                  <tr key={requisite.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{requisite.ownerName}</td>
                    <td className="px-6 py-4">{requisite.tag}</td>
                    <td className="px-6 py-4">{requisite.phone}</td>
                    <td className="px-6 py-4">{requisite.bank}</td>
                    <td className="px-6 py-4">{requisite.accountDetails}</td>
                    <td className="px-6 py-4">{requisite.country}</td>
                    <td className="px-6 py-4">{requisite.currency}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        requisite.completed 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {requisite.completed ? "Completed" : "Not Completed"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add New Requisite Form */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Requisite</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Owner's Name
              </label>
              <Input 
                placeholder="Enter owner's name"
                value={formData.ownerName}
                onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tag
              </label>
              <Input 
                placeholder="Enter tag"
                value={formData.tag}
                onChange={(e) => setFormData({...formData, tag: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <Input 
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank
              </label>
              <Input 
                placeholder="Enter bank name"
                value={formData.bank}
                onChange={(e) => setFormData({...formData, bank: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Details
              </label>
              <Input 
                placeholder="Enter account details"
                value={formData.accountDetails}
                onChange={(e) => setFormData({...formData, accountDetails: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <Input 
                placeholder="Enter country"
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <Input 
                placeholder="Enter currency"
                value={formData.currency}
                onChange={(e) => setFormData({...formData, currency: e.target.value})}
                required
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="status" 
                checked={formData.completed}
                onCheckedChange={(checked) => 
                  setFormData({...formData, completed: checked as boolean})
                }
              />
              <label
                htmlFor="status"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Completed
              </label>
            </div>

            <Button type="submit" className="w-full bg-[#9b87f5] hover:bg-[#8a76f4]">
              Save Requisite
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Requisites;
