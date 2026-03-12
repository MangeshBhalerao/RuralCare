import { useState } from "react";
import { FileText, Upload, AlertCircle, Download, Trash2, Eye, Image as ImageIcon } from "lucide-react";

export function HealthRecords() {
  const [selectedTab, setSelectedTab] = useState<"records" | "ai-diagnosis">("records");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showAIResults, setShowAIResults] = useState(false);

  const records = [
    {
      id: "1",
      type: "Prescription",
      title: "General Checkup - Dr. Priya Sharma",
      date: "March 10, 2026",
      file: "prescription_march_2026.pdf",
    },
    {
      id: "2",
      type: "Lab Report",
      title: "Blood Test Results",
      date: "February 28, 2026",
      file: "blood_test_feb_2026.pdf",
    },
    {
      id: "3",
      type: "Prescription",
      title: "Fever Treatment - Dr. Rajesh Kumar",
      date: "February 15, 2026",
      file: "prescription_feb_2026.pdf",
    },
    {
      id: "4",
      type: "X-Ray",
      title: "Chest X-Ray",
      date: "January 20, 2026",
      file: "xray_jan_2026.jpg",
    },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setShowAIResults(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeImage = () => {
    if (uploadedImage) {
      // Simulate AI analysis
      setTimeout(() => {
        setShowAIResults(true);
      }, 1500);
    }
  };

  const handleResetAI = () => {
    setUploadedImage(null);
    setShowAIResults(false);
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
            Health Records
          </h1>
          <p className="text-lg text-[#64748B]">
            Manage your medical history and get AI-based image analysis
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl p-2 shadow-sm mb-6 inline-flex gap-2">
          <button
            onClick={() => setSelectedTab("records")}
            className={`px-6 py-3 rounded-xl transition-colors ${
              selectedTab === "records"
                ? "bg-[#4F7DF3] text-white"
                : "text-[#64748B] hover:bg-[#F8FAFC]"
            }`}
          >
            My Records
          </button>
          <button
            onClick={() => setSelectedTab("ai-diagnosis")}
            className={`px-6 py-3 rounded-xl transition-colors ${
              selectedTab === "ai-diagnosis"
                ? "bg-[#4F7DF3] text-white"
                : "text-[#64748B] hover:bg-[#F8FAFC]"
            }`}
          >
            AI Image Diagnosis
          </button>
        </div>

        {/* Content */}
        {selectedTab === "records" ? (
          <>
            {/* Upload New Record */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-6">
              <h2 className="text-xl text-[#1E293B] mb-4" style={{ fontWeight: 600 }}>
                Upload New Record
              </h2>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-[#4F7DF3] transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-[#64748B] mx-auto mb-4" />
                <p className="text-[#1E293B] mb-2" style={{ fontWeight: 600 }}>
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-[#64748B]">
                  PDF, JPG, PNG up to 10MB
                </p>
              </div>
            </div>

            {/* Records List */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl text-[#1E293B] mb-6" style={{ fontWeight: 600 }}>
                My Medical Records
              </h2>

              <div className="space-y-4">
                {records.map((record) => (
                  <div
                    key={record.id}
                    className="p-5 rounded-2xl border-2 border-gray-200 hover:border-[#4F7DF3]/50 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#4F7DF3]/10 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-[#4F7DF3]" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3
                                className="text-lg text-[#1E293B]"
                                style={{ fontWeight: 600 }}
                              >
                                {record.title}
                              </h3>
                              <span className="px-2 py-1 bg-[#A7E3C9] text-[#1E293B] rounded-lg text-xs">
                                {record.type}
                              </span>
                            </div>
                            <p className="text-sm text-[#64748B]">{record.date}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          <button className="flex items-center gap-2 px-4 py-2 bg-[#4F7DF3] text-white rounded-xl hover:bg-[#3D6DE3] transition-colors text-sm">
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 bg-white text-[#4F7DF3] border-2 border-[#4F7DF3] rounded-xl hover:bg-[#F8FAFC] transition-colors text-sm">
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 bg-white text-red-500 border-2 border-red-200 rounded-xl hover:bg-red-50 transition-colors text-sm">
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* AI Image Diagnosis */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-6">
              <h2 className="text-xl text-[#1E293B] mb-4" style={{ fontWeight: 600 }}>
                Upload Medical Image for AI Analysis
              </h2>

              {!uploadedImage ? (
                <label className="block border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-[#4F7DF3] transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <ImageIcon className="w-16 h-16 text-[#64748B] mx-auto mb-4" />
                  <p className="text-[#1E293B] mb-2" style={{ fontWeight: 600 }}>
                    Click to upload medical image
                  </p>
                  <p className="text-sm text-[#64748B]">
                    Supported: X-Ray, MRI, CT Scan, Skin images (JPG, PNG)
                  </p>
                </label>
              ) : (
                <div className="space-y-6">
                  {/* Image Preview */}
                  <div className="relative rounded-2xl overflow-hidden border-2 border-gray-200">
                    <img
                      src={uploadedImage}
                      alt="Uploaded medical image"
                      className="w-full h-auto max-h-96 object-contain bg-gray-50"
                    />
                  </div>

                  {!showAIResults ? (
                    <div className="flex gap-4">
                      <button
                        onClick={handleAnalyzeImage}
                        className="flex-1 px-8 py-4 bg-[#4F7DF3] text-white rounded-2xl hover:bg-[#3D6DE3] transition-colors"
                      >
                        Analyze with AI
                      </button>
                      <button
                        onClick={handleResetAI}
                        className="px-8 py-4 bg-white text-[#64748B] border-2 border-gray-200 rounded-2xl hover:bg-[#F8FAFC] transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* AI Results */}
                      <div className="space-y-4">
                        <div className="p-5 rounded-xl bg-[#4F7DF3]/10 border border-[#4F7DF3]/30">
                          <h3
                            className="text-lg text-[#1E293B] mb-3"
                            style={{ fontWeight: 600 }}
                          >
                            AI Analysis Results
                          </h3>

                          <div className="space-y-3">
                            <div className="p-4 bg-white rounded-xl">
                              <p className="text-sm text-[#64748B] mb-1">Suggested Condition</p>
                              <p className="text-[#1E293B]" style={{ fontWeight: 600 }}>
                                Normal Chest X-Ray
                              </p>
                            </div>

                            <div className="p-4 bg-white rounded-xl">
                              <p className="text-sm text-[#64748B] mb-1">Confidence Level</p>
                              <div className="flex items-center gap-3">
                                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-[#A7E3C9] rounded-full"
                                    style={{ width: "78%" }}
                                  />
                                </div>
                                <span className="text-[#1E293B]" style={{ fontWeight: 600 }}>
                                  78%
                                </span>
                              </div>
                            </div>

                            <div className="p-4 bg-white rounded-xl">
                              <p className="text-sm text-[#64748B] mb-2">Recommendation</p>
                              <p className="text-[#1E293B]">
                                No immediate concerns detected. However, please consult with a
                                radiologist for professional interpretation.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Disclaimer */}
                        <div className="p-5 rounded-xl bg-[#FFD6A5]/20 border border-[#FFD6A5]">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="w-6 h-6 text-[#1E293B] flex-shrink-0" />
                            <div>
                              <p className="text-sm text-[#1E293B] mb-1" style={{ fontWeight: 600 }}>
                                Important Disclaimer
                              </p>
                              <p className="text-sm text-[#64748B]">
                                This AI suggestion is not a medical diagnosis. Please consult a
                                doctor for proper medical advice and professional interpretation
                                of medical images.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <button
                            onClick={handleResetAI}
                            className="flex-1 px-8 py-4 bg-white text-[#4F7DF3] border-2 border-[#4F7DF3] rounded-2xl hover:bg-[#F8FAFC] transition-colors"
                          >
                            Analyze Another Image
                          </button>
                          <button
                            onClick={() => (window.location.href = "/talk-to-doctor")}
                            className="flex-1 px-8 py-4 bg-[#4F7DF3] text-white rounded-2xl hover:bg-[#3D6DE3] transition-colors"
                          >
                            Consult a Doctor
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
