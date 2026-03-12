import { useState } from "react";
import { Search, AlertCircle, CheckCircle, Clock, Thermometer, Activity } from "lucide-react";

export function CheckSymptoms() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [duration, setDuration] = useState("");
  const [showResults, setShowResults] = useState(false);

  const commonSymptoms = [
    { id: "fever", label: "Fever", icon: Thermometer },
    { id: "cough", label: "Cough", icon: Activity },
    { id: "headache", label: "Headache", icon: Activity },
    { id: "fatigue", label: "Fatigue", icon: Activity },
    { id: "bodyache", label: "Body Ache", icon: Activity },
    { id: "cold", label: "Cold/Runny Nose", icon: Activity },
    { id: "sore-throat", label: "Sore Throat", icon: Activity },
    { id: "nausea", label: "Nausea", icon: Activity },
    { id: "diarrhea", label: "Diarrhea", icon: Activity },
    { id: "vomiting", label: "Vomiting", icon: Activity },
    { id: "rash", label: "Skin Rash", icon: Activity },
    { id: "dizziness", label: "Dizziness", icon: Activity },
  ];

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId)
        ? prev.filter((id) => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleCheckSymptoms = () => {
    if (selectedSymptoms.length > 0 && duration) {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setDuration("");
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-2xl md:text-3xl lg:text-4xl text-[#1E293B] mb-3"
            style={{ fontWeight: 700 }}
          >
            Check Your Symptoms
          </h1>
          <p className="text-lg text-[#64748B]">
            Select your symptoms and get AI-based health guidance
          </p>
        </div>

        {!showResults ? (
          <>
            {/* Select Symptoms */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-6">
              <h2 className="text-xl text-[#1E293B] mb-4" style={{ fontWeight: 600 }}>
                What symptoms are you experiencing?
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {commonSymptoms.map((symptom) => {
                  const Icon = symptom.icon;
                  const isSelected = selectedSymptoms.includes(symptom.id);
                  return (
                    <button
                      key={symptom.id}
                      onClick={() => toggleSymptom(symptom.id)}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        isSelected
                          ? "border-[#4F7DF3] bg-[#4F7DF3]/5"
                          : "border-gray-200 hover:border-[#4F7DF3]/50"
                      }`}
                    >
                      <Icon
                        className="w-6 h-6 mx-auto mb-2"
                        style={{ color: isSelected ? "#4F7DF3" : "#64748B" }}
                      />
                      <p
                        className="text-sm text-center"
                        style={{
                          fontWeight: 600,
                          color: isSelected ? "#4F7DF3" : "#1E293B",
                        }}
                      >
                        {symptom.label}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Duration */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-6">
              <h2 className="text-xl text-[#1E293B] mb-4" style={{ fontWeight: 600 }}>
                How long have you had these symptoms?
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {["Less than 1 day", "1-3 days", "4-7 days", "More than 7 days"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setDuration(option)}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      duration === option
                        ? "border-[#4F7DF3] bg-[#4F7DF3]/5"
                        : "border-gray-200 hover:border-[#4F7DF3]/50"
                    }`}
                  >
                    <Clock
                      className="w-6 h-6 mx-auto mb-2"
                      style={{ color: duration === option ? "#4F7DF3" : "#64748B" }}
                    />
                    <p
                      className="text-sm text-center"
                      style={{
                        fontWeight: 600,
                        color: duration === option ? "#4F7DF3" : "#1E293B",
                      }}
                    >
                      {option}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleCheckSymptoms}
              disabled={selectedSymptoms.length === 0 || !duration}
              className={`w-full px-8 py-4 rounded-2xl transition-colors ${
                selectedSymptoms.length === 0 || !duration
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#4F7DF3] text-white hover:bg-[#3D6DE3]"
              }`}
            >
              Check Symptoms
            </button>
          </>
        ) : (
          <>
            {/* AI Analysis Results */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-6">
              <div className="flex items-start gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#4F7DF3]/10 flex items-center justify-center flex-shrink-0">
                  <Search className="w-6 h-6 text-[#4F7DF3]" />
                </div>
                <div>
                  <h2 className="text-xl text-[#1E293B] mb-2" style={{ fontWeight: 600 }}>
                    AI Analysis Results
                  </h2>
                  <p className="text-[#64748B]">
                    Based on your symptoms: {selectedSymptoms.join(", ")} for {duration}
                  </p>
                </div>
              </div>

              {/* Possible Conditions */}
              <div className="space-y-4 mb-6">
                <div className="p-5 rounded-xl bg-[#FFD6A5]/20 border border-[#FFD6A5]">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg text-[#1E293B]" style={{ fontWeight: 600 }}>
                      Common Cold or Flu
                    </h3>
                    <span className="px-3 py-1 bg-[#FFD6A5] text-[#1E293B] rounded-full text-sm">
                      85% Match
                    </span>
                  </div>
                  <p className="text-[#64748B] mb-3">
                    Your symptoms are commonly associated with viral infections like cold or flu.
                  </p>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#A7E3C9] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-[#64748B]">
                      Usually resolves on its own with rest and hydration
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#A7E3C9]/20 border border-[#A7E3C9]">
                  <h3 className="text-lg text-[#1E293B] mb-2" style={{ fontWeight: 600 }}>
                    Recommendations
                  </h3>
                  <ul className="space-y-2 text-[#64748B]">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#A7E3C9] flex-shrink-0 mt-0.5" />
                      <span>Get adequate rest and stay hydrated</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#A7E3C9] flex-shrink-0 mt-0.5" />
                      <span>Take over-the-counter pain relievers if needed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#A7E3C9] flex-shrink-0 mt-0.5" />
                      <span>Monitor your temperature regularly</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="p-5 rounded-xl bg-[#4F7DF3]/10 border border-[#4F7DF3]/30">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-[#4F7DF3] flex-shrink-0" />
                  <div>
                    <p className="text-sm text-[#1E293B]" style={{ fontWeight: 600 }}>
                      Important Disclaimer
                    </p>
                    <p className="text-sm text-[#64748B] mt-1">
                      This AI suggestion is not a medical diagnosis. Please consult a doctor
                      for proper medical advice and treatment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleReset}
                className="flex-1 px-8 py-4 bg-white text-[#4F7DF3] border-2 border-[#4F7DF3] rounded-2xl hover:bg-[#F8FAFC] transition-colors"
              >
                Check Again
              </button>
              <button
                onClick={() => (window.location.href = "/talk-to-doctor")}
                className="flex-1 px-8 py-4 bg-[#4F7DF3] text-white rounded-2xl hover:bg-[#3D6DE3] transition-colors"
              >
                Consult a Doctor
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
