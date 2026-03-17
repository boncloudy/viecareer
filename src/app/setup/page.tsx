"use client";

import React, { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { TopNavbar } from "@/components/top-navbar";
import { UploadDropzone } from "@/components/upload-dropzone";
import { CircularScore } from "@/components/circular-score";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useApp } from "@/lib/app-context";
import {
  userProfile,
  jobRequirements,
  atsMatchScore,
} from "@/lib/mock-data";
import { Lock, ShieldCheck, ArrowRight, Sparkles, CheckCircle2, Loader2 } from "lucide-react";

export default function SetupPage() {
  const router = useRouter();
  const app = useApp();

  const [cvUploading, setCvUploading] = useState(false);
  const [cvUploaded, setCvUploaded] = useState(false);
  const [cvFileName, setCvFileName] = useState("");

  const [jdUploading, setJdUploading] = useState(false);
  const [jdUploaded, setJdUploaded] = useState(false);
  const [jdFileName, setJdFileName] = useState("");

  const [isExtracting, setIsExtracting] = useState(false);
  const [showExtraction, setShowExtraction] = useState(false);

  // Track if both files are ready so we can start extraction
  const jdUploadedRef = useRef(false);
  const cvUploadedRef = useRef(false);

  const startExtraction = useCallback(() => {
    if (cvUploadedRef.current && jdUploadedRef.current && !showExtraction) {
      setIsExtracting(true);
      // Simulate AI extraction processing for 2 seconds
      setTimeout(() => {
        setIsExtracting(false);
        setShowExtraction(true);
        app.setExtractionVisible(true);
      }, 2000);
    }
  }, [showExtraction, app]);

  const handleCvFile = useCallback((file: File) => {
    setCvUploading(true);
    setCvFileName(file.name);
    // Simulate upload processing
    setTimeout(() => {
      setCvUploading(false);
      setCvUploaded(true);
      cvUploadedRef.current = true;
      app.setCvUploaded(true);
      app.setCvFileName(file.name);
      // Check if JD is also uploaded to start extraction
      if (jdUploadedRef.current) {
        setIsExtracting(true);
        setTimeout(() => {
          setIsExtracting(false);
          setShowExtraction(true);
          app.setExtractionVisible(true);
        }, 2000);
      }
    }, 1500);
  }, [app]);

  const handleJdFile = useCallback((file: File) => {
    setJdUploading(true);
    setJdFileName(file.name);
    // Simulate upload processing
    setTimeout(() => {
      setJdUploading(false);
      setJdUploaded(true);
      jdUploadedRef.current = true;
      app.setJdUploaded(true);
      app.setJdFileName(file.name);
      // Check if CV is also uploaded to start extraction
      if (cvUploadedRef.current) {
        setIsExtracting(true);
        setTimeout(() => {
          setIsExtracting(false);
          setShowExtraction(true);
          app.setExtractionVisible(true);
        }, 2000);
      }
    }, 1500);
  }, [app]);

  const handleRescan = useCallback(() => {
    setCvUploaded(false);
    setCvUploading(false);
    setCvFileName("");
    cvUploadedRef.current = false;

    setJdUploaded(false);
    setJdUploading(false);
    setJdFileName("");
    jdUploadedRef.current = false;

    setShowExtraction(false);
    setIsExtracting(false);

    app.setCvUploaded(false);
    app.setJdUploaded(false);
    app.setCvFileName("");
    app.setJdFileName("");
    app.setExtractionVisible(false);
  }, [app]);

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Context Setup
          </h1>
          <p className="text-gray-500 text-lg">
            Upload your profile and the job description to begin the AI-powered
            interview simulation.
          </p>
        </div>

        {/* Upload Zones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <UploadDropzone
            title="Upload CV/Resume"
            subtitle="Drag and drop your PDF or Docx here"
            isUploading={cvUploading}
            isUploaded={cvUploaded}
            fileName={cvFileName}
            onFileSelected={handleCvFile}
            variant="cv"
          />
          <UploadDropzone
            title="Upload Job Description (JD)"
            subtitle="Drag and drop the JD PDF or Docx here"
            isUploading={jdUploading}
            isUploaded={jdUploaded}
            fileName={jdFileName}
            onFileSelected={handleJdFile}
            variant="jd"
          />
        </div>

        {/* Extraction Loading */}
        {isExtracting && (
          <Card className="p-12 text-center border border-gray-200 mb-8 animate-fade-in-up">
            <Loader2 className="w-10 h-10 text-teal-500 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              AI is analyzing your documents...
            </h3>
            <p className="text-sm text-gray-500">
              Extracting profile data and matching against job requirements
            </p>
          </Card>
        )}

        {/* AI Preview & Extraction */}
        {showExtraction && (
          <Card className="p-8 animate-fade-in-up border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-500" />
                <h2 className="text-xl font-bold text-gray-900">
                  AI Preview & Extraction
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-500" />
                <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider">
                  Valid Condition: Structured CV & JD Detected
                </span>
              </div>
            </div>

            {/* Uploaded Files Info */}
            <div className="flex gap-4 mb-6">
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 text-sm">
                <CheckCircle2 className="w-4 h-4 text-teal-500" />
                <span className="text-gray-600">CV:</span>
                <span className="font-medium text-gray-800">{cvFileName}</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 text-sm">
                <CheckCircle2 className="w-4 h-4 text-teal-500" />
                <span className="text-gray-600">JD:</span>
                <span className="font-medium text-gray-800">{jdFileName}</span>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left: Extracted Profile */}
              <div className="space-y-5">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  AI Extracted Profile
                </h3>
                <div>
                  <label className="text-xs font-semibold text-teal-600 uppercase tracking-wider">
                    Full Name
                  </label>
                  <p className="mt-1 text-base text-gray-800 bg-gray-50 px-4 py-2.5 rounded-lg border border-gray-100">
                    {userProfile.fullName}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-teal-600 uppercase tracking-wider">
                    Target Position
                  </label>
                  <p className="mt-1 text-base text-gray-800 bg-gray-50 px-4 py-2.5 rounded-lg border border-gray-100">
                    {userProfile.targetPosition}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-teal-600 uppercase tracking-wider">
                    Technical Stack
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {userProfile.techStack.slice(0, 3).map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-sm px-3 py-1 border-gray-300 text-gray-700"
                      >
                        {tech}
                      </Badge>
                    ))}
                    <Badge
                      variant="outline"
                      className="text-sm px-3 py-1 border-gray-300 text-gray-400"
                    >
                      +
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Center: Score */}
              <div className="flex items-center justify-center">
                <CircularScore
                  score={atsMatchScore}
                  label="INITIAL MATCH"
                  sublabel=""
                  size={140}
                  strokeWidth={8}
                  color="#0F172A"
                />
              </div>

              {/* Right: Job Requirements */}
              <div className="space-y-5">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Extracted Job Requirements
                </h3>
                <div>
                  <label className="text-xs font-semibold text-teal-600 uppercase tracking-wider">
                    Must-Have Skills
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {jobRequirements.mustHaveSkills.map((skill) => (
                      <Badge
                        key={skill}
                        className="bg-teal-50 text-teal-700 border border-teal-200 px-3 py-1 text-sm"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-teal-600 uppercase tracking-wider">
                    Education Level
                  </label>
                  <p className="mt-1 text-base text-gray-800 font-medium">
                    {jobRequirements.educationLevel}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-teal-600 uppercase tracking-wider">
                    Key Responsibilities
                  </label>
                  <ul className="mt-2 space-y-2">
                    {jobRequirements.keyResponsibilities.map((resp, i) => (
                      <li key={i} className="text-sm text-gray-600 leading-relaxed">
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 mt-10 pt-6 border-t border-gray-100">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-800 text-base"
                onClick={handleRescan}
              >
                Re-scan Documents
              </Button>
              <Button
                onClick={() => {
                  app.setCurrentFlow("interview");
                  router.push("/interview");
                }}
                className="bg-[#0F172A] hover:bg-[#1E293B] text-white px-8 py-3 text-base h-auto rounded-lg"
              >
                Proceed to Interview
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {/* Footer */}
        <div className="flex items-center justify-center gap-6 mt-16 text-sm text-gray-400">
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4" />
            Secure SSL Encryption
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            Data Privacy Guaranteed
          </div>
        </div>
      </main>
    </div>
  );
}
