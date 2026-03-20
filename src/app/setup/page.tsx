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

  const jdUploadedRef = useRef(false);
  const cvUploadedRef = useRef(false);

  const startExtraction = useCallback(() => {
    if (cvUploadedRef.current && jdUploadedRef.current && !showExtraction) {
      setIsExtracting(true);
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
    setTimeout(() => {
      setCvUploading(false);
      setCvUploaded(true);
      cvUploadedRef.current = true;
      app.setCvUploaded(true);
      app.setCvFileName(file.name);
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
    setTimeout(() => {
      setJdUploading(false);
      setJdUploaded(true);
      jdUploadedRef.current = true;
      app.setJdUploaded(true);
      app.setJdFileName(file.name);
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
    <div className="min-h-screen bg-white">
      <TopNavbar />

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#191A23] mb-2">
            Context Setup
          </h1>
          <p className="text-[#191A23]/60 text-lg">
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
          <Card className="p-12 text-center border-2 border-[#191A23] shadow-[4px_4px_0_#191A23] mb-8 animate-fade-in-up bg-white rounded-2xl">
            <Loader2 className="w-10 h-10 text-[#5378EF] animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#191A23] mb-1">
              AI is analyzing your documents...
            </h3>
            <p className="text-sm text-[#191A23]/60">
              Extracting profile data and matching against job requirements
            </p>
          </Card>
        )}

        {/* AI Preview & Extraction */}
        {showExtraction && (
          <Card className="p-8 animate-fade-in-up border-2 border-[#191A23] shadow-[4px_4px_0_#191A23] bg-white rounded-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#5378EF]" />
                <h2 className="text-xl font-bold text-[#191A23]">
                  AI Preview & Extraction
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5378EF]" />
                <span className="text-xs font-semibold text-[#5378EF] uppercase tracking-wider">
                  Valid Condition: Structured CV & JD Detected
                </span>
              </div>
            </div>

            {/* Uploaded Files Info */}
            <div className="flex gap-4 mb-6">
              <div className="flex items-center gap-2 bg-[#F3F3F3] px-3 py-2 rounded-lg border-2 border-[#191A23] text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#5378EF]" />
                <span className="text-[#191A23]/60">CV:</span>
                <span className="font-medium text-[#191A23]">{cvFileName}</span>
              </div>
              <div className="flex items-center gap-2 bg-[#F3F3F3] px-3 py-2 rounded-lg border-2 border-[#191A23] text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#5378EF]" />
                <span className="text-[#191A23]/60">JD:</span>
                <span className="font-medium text-[#191A23]">{jdFileName}</span>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left: Extracted Profile */}
              <div className="space-y-5">
                <h3 className="text-xs font-bold text-[#191A23]/50 uppercase tracking-widest">
                  AI Extracted Profile
                </h3>
                <div>
                  <label className="text-xs font-semibold text-[#5378EF] uppercase tracking-wider">
                    Full Name
                  </label>
                  <p className="mt-1 text-base text-[#191A23] bg-[#F3F3F3] px-4 py-2.5 rounded-lg border-2 border-[#191A23]/20">
                    {userProfile.fullName}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#5378EF] uppercase tracking-wider">
                    Target Position
                  </label>
                  <p className="mt-1 text-base text-[#191A23] bg-[#F3F3F3] px-4 py-2.5 rounded-lg border-2 border-[#191A23]/20">
                    {userProfile.targetPosition}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#5378EF] uppercase tracking-wider">
                    Technical Stack
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {userProfile.techStack.slice(0, 3).map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-sm px-3 py-1 border-2 border-[#191A23] text-[#191A23]"
                      >
                        {tech}
                      </Badge>
                    ))}
                    <Badge
                      variant="outline"
                      className="text-sm px-3 py-1 border-2 border-[#191A23]/30 text-[#191A23]/50"
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
                  color="#191A23"
                />
              </div>

              {/* Right: Job Requirements */}
              <div className="space-y-5">
                <h3 className="text-xs font-bold text-[#191A23]/50 uppercase tracking-widest">
                  Extracted Job Requirements
                </h3>
                <div>
                  <label className="text-xs font-semibold text-[#5378EF] uppercase tracking-wider">
                    Must-Have Skills
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {jobRequirements.mustHaveSkills.map((skill) => (
                      <Badge
                        key={skill}
                        className="bg-[#5378EF]/10 text-[#5378EF] border border-[#5378EF]/30 px-3 py-1 text-sm"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#5378EF] uppercase tracking-wider">
                    Education Level
                  </label>
                  <p className="mt-1 text-base text-[#191A23] font-medium">
                    {jobRequirements.educationLevel}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#5378EF] uppercase tracking-wider">
                    Key Responsibilities
                  </label>
                  <ul className="mt-2 space-y-2">
                    {jobRequirements.keyResponsibilities.map((resp, i) => (
                      <li key={i} className="text-sm text-[#191A23]/70 leading-relaxed">
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 mt-10 pt-6 border-t border-[#191A23]/10">
              <Button
                variant="ghost"
                className="text-[#191A23]/60 hover:text-[#191A23] text-base rounded-full"
                onClick={handleRescan}
              >
                Re-scan Documents
              </Button>
              <Button
                onClick={() => {
                  app.setCurrentFlow("interview");
                  router.push("/interview");
                }}
                className="bg-[#191A23] hover:bg-[#5378EF] text-white px-8 py-3 text-base h-auto rounded-full transition-colors"
              >
                Proceed to Interview
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {/* Footer */}
        <div className="flex items-center justify-center gap-6 mt-16 text-sm text-[#191A23]/40">
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
