import { useState } from "react";
import { Search, MapPin, Phone, Clock, CheckCircle, XCircle } from "lucide-react";

export function FindMedicines() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState<string | null>(null);

  const medicines = [
    { id: "1", name: "Paracetamol 500mg", category: "Pain Relief" },
    { id: "2", name: "Amoxicillin 250mg", category: "Antibiotic" },
    { id: "3", name: "Cough Syrup", category: "Cold & Flu" },
    { id: "4", name: "Ibuprofen 400mg", category: "Pain Relief" },
    { id: "5", name: "Vitamin C Tablets", category: "Supplements" },
    { id: "6", name: "Cetirizine 10mg", category: "Allergy" },
  ];

  const pharmacies = [
    {
      id: "1",
      name: "Care Pharmacy",
      distance: "0.5 km",
      contact: "+91 98765 43210",
      hours: "8 AM - 10 PM",
      availability: true,
      address: "Main Market Road, Near Bus Stand",
    },
    {
      id: "2",
      name: "Health Plus Medical Store",
      distance: "1.2 km",
      contact: "+91 98765 43211",
      hours: "24/7",
      availability: true,
      address: "Station Road, Opposite Post Office",
    },
    {
      id: "3",
      name: "Wellness Chemist",
      distance: "2.0 km",
      contact: "+91 98765 43212",
      hours: "9 AM - 9 PM",
      availability: false,
      address: "Gandhi Chowk, First Floor",
    },
    {
      id: "4",
      name: "MedLife Pharmacy",
      distance: "3.5 km",
      contact: "+91 98765 43213",
      hours: "8 AM - 8 PM",
      availability: true,
      address: "Civil Lines, Near District Hospital",
    },
  ];

  const filteredMedicines = medicines.filter((med) =>
    med.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-2xl md:text-3xl lg:text-4xl text-[#1E293B] mb-3"
            style={{ fontWeight: 700 }}
          >
            Find Medicines
          </h1>
          <p className="text-lg text-[#64748B]">
            Search for medicines and find nearby pharmacies with availability
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Search Medicines */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl text-[#1E293B] mb-4" style={{ fontWeight: 600 }}>
                Search Medicine
              </h2>

              {/* Search Input */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                <input
                  type="text"
                  placeholder="Type medicine name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F7DF3] text-[#1E293B]"
                />
              </div>

              {/* Medicine List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredMedicines.length > 0 ? (
                  filteredMedicines.map((medicine) => (
                    <button
                      key={medicine.id}
                      onClick={() => setSelectedMedicine(medicine.name)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        selectedMedicine === medicine.name
                          ? "border-[#4F7DF3] bg-[#4F7DF3]/5"
                          : "border-gray-200 hover:border-[#4F7DF3]/50"
                      }`}
                    >
                      <p
                        className="text-[#1E293B] mb-1"
                        style={{ fontWeight: 600 }}
                      >
                        {medicine.name}
                      </p>
                      <p className="text-sm text-[#64748B]">{medicine.category}</p>
                    </button>
                  ))
                ) : (
                  <p className="text-center text-[#64748B] py-8">
                    No medicines found
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Nearby Pharmacies */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-6">
              <h2 className="text-xl text-[#1E293B] mb-6" style={{ fontWeight: 600 }}>
                Nearby Pharmacies
                {selectedMedicine && (
                  <span className="text-[#64748B] ml-2">
                    - Showing availability for "{selectedMedicine}"
                  </span>
                )}
              </h2>

              <div className="space-y-4">
                {pharmacies.map((pharmacy) => (
                  <div
                    key={pharmacy.id}
                    className="p-6 rounded-2xl border-2 border-gray-200 hover:border-[#4F7DF3]/50 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3
                            className="text-lg text-[#1E293B]"
                            style={{ fontWeight: 600 }}
                          >
                            {pharmacy.name}
                          </h3>
                        </div>

                        <div className="space-y-2 text-sm text-[#64748B]">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span>{pharmacy.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 flex-shrink-0" />
                            <a
                              href={`tel:${pharmacy.contact}`}
                              className="hover:text-[#4F7DF3] transition-colors"
                            >
                              {pharmacy.contact}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 flex-shrink-0" />
                            <span>{pharmacy.hours}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 items-start sm:items-end">
                        <span className="px-3 py-1 bg-[#F8FAFC] text-[#64748B] rounded-full text-sm">
                          {pharmacy.distance} away
                        </span>
                        {selectedMedicine && (
                          <div className="flex items-center gap-2">
                            {pharmacy.availability ? (
                              <>
                                <CheckCircle className="w-5 h-5 text-[#A7E3C9]" />
                                <span className="text-sm text-[#A7E3C9]" style={{ fontWeight: 600 }}>
                                  Available
                                </span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-5 h-5 text-[#64748B]" />
                                <span className="text-sm text-[#64748B]" style={{ fontWeight: 600 }}>
                                  Not Available
                                </span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href={`tel:${pharmacy.contact}`}
                        className="flex-1 px-6 py-3 bg-[#4F7DF3] text-white rounded-xl hover:bg-[#3D6DE3] transition-colors text-center"
                      >
                        Call Pharmacy
                      </a>
                      <button className="flex-1 px-6 py-3 bg-white text-[#4F7DF3] border-2 border-[#4F7DF3] rounded-xl hover:bg-[#F8FAFC] transition-colors">
                        Get Directions
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
