import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Sparkles,
  ArrowLeft,
  Building2,
  MapPin,
  DollarSign,
  Briefcase,
  Clock,
  CheckCircle2,
  Award,
  Upload,
  FileText,
  X,
} from "lucide-react";

// This will eventually come from your backend/database
const dummyJobDetails = {
  1: {
    id: 1,
    jobTitle: "Senior Frontend Developer",
    companyName: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120k - $160k",
    employmentType: "Full-time",
    experienceLevel: "Senior Level",
    postedDate: "2024-01-10",
    description: "We are looking for a Senior Frontend Developer to join our dynamic team. You will be responsible for building and maintaining high-quality web applications using modern frameworks and technologies.",
    responsibilities: [
      "Develop and maintain responsive web applications using React and TypeScript",
      "Collaborate with designers and backend developers to implement features",
      "Write clean, maintainable, and well-documented code",
      "Participate in code reviews and mentor junior developers",
      "Optimize application performance and ensure cross-browser compatibility",
    ],
    requirements: [
      "5+ years of experience in frontend development",
      "Strong proficiency in React, JavaScript/TypeScript, and CSS",
      "Experience with state management (Redux, Context API)",
      "Familiarity with RESTful APIs and modern build tools",
      "Excellent problem-solving and communication skills",
    ],
    skills: ["React", "TypeScript", "JavaScript", "CSS/SASS", "Redux", "Git", "Webpack", "REST API"],
    benefits: [
      "Competitive salary and equity package",
      "Health, dental, and vision insurance",
      "Flexible work hours and remote options",
      "Professional development budget",
      "Gym membership and wellness programs",
    ],
    companyDescription: "TechCorp Inc. is a leading technology company focused on building innovative solutions for businesses worldwide. We pride ourselves on our collaborative culture and commitment to excellence.",
  },
  2: {
    id: 2,
    jobTitle: "Full Stack Engineer",
    companyName: "StartupXYZ",
    location: "Remote",
    salary: "$100k - $140k",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    postedDate: "2024-01-08",
    description: "Join our fast-growing startup as a Full Stack Engineer. You'll work on cutting-edge projects and have the opportunity to shape our technology stack.",
    responsibilities: [
      "Build scalable web applications from front-end to back-end",
      "Design and implement RESTful APIs",
      "Work with databases and optimize queries",
      "Deploy and monitor applications in cloud environments",
      "Collaborate with product team to define features",
    ],
    requirements: [
      "3+ years of full stack development experience",
      "Proficiency in JavaScript/Node.js and a modern framework (React, Vue, or Angular)",
      "Experience with SQL and NoSQL databases",
      "Knowledge of cloud platforms (AWS, GCP, or Azure)",
      "Strong understanding of software development best practices",
    ],
    skills: ["Node.js", "React", "MongoDB", "PostgreSQL", "AWS", "Docker", "Express", "GraphQL"],
    benefits: [
      "Stock options in a growing startup",
      "100% remote work flexibility",
      "Unlimited PTO policy",
      "Learning and development stipend",
      "Latest tech equipment provided",
    ],
    companyDescription: "StartupXYZ is revolutionizing the way businesses operate with our SaaS platform. We're a team of passionate builders creating the future of work.",
  },
};

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [jobDetails, setJobDetails] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // In a real app, fetch job details from your backend
    const job = dummyJobDetails[jobId];
    if (job) {
      setJobDetails(job);
      // Check if user has already applied (check from backend/localStorage)
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const appliedJobs = userData.appliedJobs || [];
      setHasApplied(appliedJobs.some(app => app.jobId === parseInt(jobId)));
    }
  }, [jobId]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type (PDF, DOC, DOCX)
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a PDF or DOC file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should not exceed 5MB');
        return;
      }

      setSelectedFile(file);
      simulateUpload(file);
    }
  };

  const simulateUpload = (file) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleApply = async () => {
    if (!selectedFile) {
      alert('Please upload your resume before applying');
      return;
    }

    if (isUploading) {
      alert('Please wait for the resume upload to complete');
      return;
    }

    setIsApplying(true);
    
    // Simulate API call
    setTimeout(() => {
      // Save application to localStorage (in real app, send to backend)
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const appliedJobs = userData.appliedJobs || [];
      
      appliedJobs.push({
        jobId: parseInt(jobId),
        jobTitle: jobDetails.jobTitle,
        companyName: jobDetails.companyName,
        appliedDate: new Date().toISOString().split('T')[0],
        resumeFileName: selectedFile.name,
        status: 'applied',
        atsScore: Math.floor(Math.random() * 30) + 70, // Random score 70-100
      });
      
      userData.appliedJobs = appliedJobs;
      localStorage.setItem("userData", JSON.stringify(userData));
      
      setHasApplied(true);
      setIsApplying(false);
      
      // Show success message
      alert('Application submitted successfully!');
      
      // Optionally redirect to dashboard after a delay
      setTimeout(() => {
        navigate('/user/dashboard');
      }, 2000);
    }, 1500);
  };

  if (!jobDetails) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Job not found</p>
          <button
            onClick={() => navigate("/user/dashboard")}
            className="btn-primary mt-4"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold text-foreground">
                AI<span className="text-gradient">Match</span>
              </span>
            </Link>
            <button
              onClick={() => navigate("/user/dashboard")}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl pb-32">
        {/* Job Header */}
        <div className="glass-card rounded-xl p-8 mb-6 animate-slide-up">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl gradient-accent flex items-center justify-center text-foreground font-semibold text-2xl">
                {jobDetails.companyName.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-display font-bold text-foreground mb-2">
                  {jobDetails.jobTitle}
                </h1>
                <p className="text-lg text-muted-foreground flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  {jobDetails.companyName}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{jobDetails.location}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm">{jobDetails.salary}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm">{jobDetails.employmentType}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm">
                Posted {new Date(jobDetails.postedDate).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Resume Upload Section */}
          {!hasApplied && (
            <div className="mb-6 p-6 bg-primary/5 border border-primary/20 rounded-xl">
              <div className="flex items-start gap-3 mb-4">
                <Upload className="w-5 h-5 text-primary mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">
                    Upload Your Resume
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Please upload your resume to apply for this position. Accepted formats: PDF, DOC, DOCX (Max 5MB)
                  </p>
                </div>
              </div>

              {!selectedFile ? (
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-secondary w-full flex items-center justify-center gap-2"
                  >
                    <FileText className="w-5 h-5" />
                    Choose Resume File
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg mb-3">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(selectedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={removeFile}
                      className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  {isUploading && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Uploading...</span>
                        <span className="font-medium text-primary">{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {uploadProgress === 100 && !isUploading && (
                    <div className="flex items-center gap-2 text-success text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Resume uploaded successfully!</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Apply Button */}
          <button
            onClick={handleApply}
            disabled={hasApplied || isApplying || isUploading || !selectedFile}
            className={`btn-primary w-full ${
              (hasApplied || !selectedFile || isUploading) ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isApplying ? (
              "Submitting Application..."
            ) : hasApplied ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Already Applied
              </>
            ) : !selectedFile ? (
              "Upload Resume to Apply"
            ) : isUploading ? (
              "Uploading Resume..."
            ) : (
              "Submit Application"
            )}
          </button>
        </div>

        {/* Job Description */}
        <div className="glass-card rounded-xl p-8 mb-6 animate-slide-up delay-100">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">
            About the Role
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {jobDetails.description}
          </p>
        </div>

        {/* Responsibilities */}
        <div className="glass-card rounded-xl p-8 mb-6 animate-slide-up delay-200">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">
            Responsibilities
          </h2>
          <ul className="space-y-3">
            {jobDetails.responsibilities.map((responsibility, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{responsibility}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Requirements */}
        <div className="glass-card rounded-xl p-8 mb-6 animate-slide-up delay-300">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">
            Requirements
          </h2>
          <ul className="space-y-3">
            {jobDetails.requirements.map((requirement, index) => (
              <li key={index} className="flex items-start gap-3">
                <Award className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{requirement}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Skills */}
        <div className="glass-card rounded-xl p-8 mb-6 animate-slide-up delay-400">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">
            Required Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {jobDetails.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="glass-card rounded-xl p-8 mb-6 animate-slide-up delay-500">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">
            Benefits
          </h2>
          <ul className="space-y-3">
            {jobDetails.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Info */}
        <div className="glass-card rounded-xl p-8 animate-slide-up delay-600">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">
            About {jobDetails.companyName}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {jobDetails.companyDescription}
          </p>
        </div>
      </main>

      {/* Sticky Bottom Apply Bar (Mobile) */}
      {!hasApplied && (
        <div className="fixed bottom-0 left-0 right-0 p-4 glass-card border-t border-border/50 md:hidden z-40">
          <button
            onClick={handleApply}
            disabled={isApplying || isUploading || !selectedFile}
            className={`btn-primary w-full ${
              (!selectedFile || isUploading) ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isApplying ? "Submitting..." : !selectedFile ? "Upload Resume First" : "Submit Application"}
          </button>
        </div>
      )}
    </div>
  );
};

export default JobDetails;