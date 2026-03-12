import { useState } from "react";
import { Video, Phone, MessageCircle, Calendar, Clock, User } from "lucide-react";

export function TalkToDoctor() {
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [consultationType, setConsultationType] = useState<"video" | "audio" | null>(null);

  const doctors = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialty: "General Physician",
      experience: "12 years",
      available: true,
      nextSlot: "Today, 2:00 PM",
      fee: "₹200",
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      specialty: "Pediatrician",
      experience: "8 years",
      available: true,
      nextSlot: "Today, 3:30 PM",
      fee: "₹250",
    },
    {
      id: 3,
      name: "Dr. Anita Desai",
      specialty: "Gynecologist",
      experience: "15 years",
      available: false,
      nextSlot: "Tomorrow, 10:00 AM",
      fee: "₹300",
    },
    {
      id: 4,
      name: "Dr. Vikram Singh",
      specialty: "Dermatologist",
      experience: "10 years",
      available: true,
      nextSlot: "Today, 4:00 PM",
      fee: "₹250",
    },
  ];

  const handleBookConsultation = () => {
    if (selectedDoctor && consultationType) {
      alert(`Booking ${consultationType} consultation with ${doctors.find(d => d.id === selectedDoctor)?.name}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-2xl md:text-3xl lg:text-4xl text-[#1E293B] mb-3"
            style={{ fontWeight: 700 }}
          >
            Talk to a Doctor
          </h1>
          <p className="text-lg text-[#64748B]">
            Connect with qualified doctors through video or audio consultation
          </p>
        </div>

        {/* Consultation Type Selection */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-6">
          <h2 className="text-xl text-[#1E293B] mb-4" style={{ fontWeight: 600 }}>
            Choose Consultation Type
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <button
              onClick={() => setConsultationType("video")}
              className={`p-6 rounded-2xl border-2 transition-all ${
                consultationType === "video"
                  ? "border-[#4F7DF3] bg-[#4F7DF3]/5"
                  : "border-gray-200 hover:border-[#4F7DF3]/50"
              }`}
            >
              <Video
                className="w-8 h-8 mx-auto mb-3"
                style={{ color: consultationType === "video" ? "#4F7DF3" : "#64748B" }}
              />
              <p
                className="text-center"
                style={{
                  fontWeight: 600,
                  color: consultationType === "video" ? "#4F7DF3" : "#1E293B",
                }}
              >
                Video Call
              </p>
            </button>

            <button
              onClick={() => setConsultationType("audio")}
              className={`p-6 rounded-2xl border-2 transition-all ${
                consultationType === "audio"
                  ? "border-[#4F7DF3] bg-[#4F7DF3]/5"
                  : "border-gray-200 hover:border-[#4F7DF3]/50"
              }`}
            >
              <Phone
                className="w-8 h-8 mx-auto mb-3"
                style={{ color: consultationType === "audio" ? "#4F7DF3" : "#64748B" }}
              />
              <p
                className="text-center"
                style={{
                  fontWeight: 600,
                  color: consultationType === "audio" ? "#4F7DF3" : "#1E293B",
                }}
              >
                Audio Call
              </p>
            </button>

            <button
              className="p-6 rounded-2xl border-2 border-gray-200 hover:border-[#4F7DF3]/50 transition-all opacity-60 cursor-not-allowed"
              disabled
            >
              <MessageCircle className="w-8 h-8 text-[#64748B] mx-auto mb-3" />
              <p className="text-center text-[#64748B]" style={{ fontWeight: 600 }}>
                Chat (Coming Soon)
              </p>
            </button>
          </div>
        </div>

        {/* Available Doctors */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-6">
          <h2 className="text-xl text-[#1E293B] mb-6" style={{ fontWeight: 600 }}>
            Available Doctors
          </h2>

          <div className="grid gap-4">
            {doctors.map((doctor) => (
              <button
                key={doctor.id}
                onClick={() => setSelectedDoctor(doctor.id)}
                className={`p-6 rounded-2xl border-2 transition-all text-left ${
                  selectedDoctor === doctor.id
                    ? "border-[#4F7DF3] bg-[#4F7DF3]/5"
                    : "border-gray-200 hover:border-[#4F7DF3]/50"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#4F7DF3]/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-8 h-8 text-[#4F7DF3]" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-lg text-[#1E293B]" style={{ fontWeight: 600 }}>
                          {doctor.name}
                        </h3>
                        <p className="text-[#64748B]">{doctor.specialty}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {doctor.available ? (
                          <span className="px-3 py-1 bg-[#A7E3C9] text-[#1E293B] rounded-full text-sm">
                            Available
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-gray-200 text-[#64748B] rounded-full text-sm">
                            Busy
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-[#64748B]">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{doctor.experience} experience</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Next: {doctor.nextSlot}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span style={{ fontWeight: 600 }}>Fee: {doctor.fee}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Book Consultation Button */}
        {selectedDoctor && consultationType && (
          <div className="bg-white rounded-2xl p-6 shadow-sm sticky bottom-4">
            <button
              onClick={handleBookConsultation}
              className="w-full px-8 py-4 bg-[#4F7DF3] text-white rounded-2xl hover:bg-[#3D6DE3] transition-colors"
            >
              Book Consultation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
