import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, LogOut, Users, ArrowUpDown, UserCheck, 
  Calendar, Search, Filter, MoreVertical, FileText,
  TrendingUp, Clock, CheckCircle2
} from 'lucide-react';

// Dummy candidate data
const dummyCandidates = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    resumeTitle: 'Senior Frontend Developer',
    experience: '5 years',
    skills: ['React', 'TypeScript', 'Node.js'],
    atsScore: 92,
    appliedDate: '2024-01-15',
    status: 'new',
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.c@email.com',
    resumeTitle: 'Full Stack Engineer',
    experience: '4 years',
    skills: ['Python', 'Django', 'React'],
    atsScore: 88,
    appliedDate: '2024-01-14',
    status: 'shortlisted',
  },
  {
    id: 3,
    name: 'Emily Davis',
    email: 'emily.d@email.com',
    resumeTitle: 'Backend Developer',
    experience: '3 years',
    skills: ['Java', 'Spring Boot', 'AWS'],
    atsScore: 75,
    appliedDate: '2024-01-13',
    status: 'interview',
  },
  {
    id: 4,
    name: 'James Wilson',
    email: 'james.w@email.com',
    resumeTitle: 'DevOps Engineer',
    experience: '6 years',
    skills: ['Docker', 'Kubernetes', 'CI/CD'],
    atsScore: 85,
    appliedDate: '2024-01-12',
    status: 'new',
  },
  {
    id: 5,
    name: 'Anna Martinez',
    email: 'anna.m@email.com',
    resumeTitle: 'UI/UX Designer & Developer',
    experience: '4 years',
    skills: ['Figma', 'React', 'CSS'],
    atsScore: 67,
    appliedDate: '2024-01-11',
    status: 'rejected',
  },
  {
    id: 6,
    name: 'David Kim',
    email: 'david.k@email.com',
    resumeTitle: 'Machine Learning Engineer',
    experience: '5 years',
    skills: ['Python', 'TensorFlow', 'PyTorch'],
    atsScore: 94,
    appliedDate: '2024-01-10',
    status: 'shortlisted',
  },
];

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState(dummyCandidates);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('atsScore');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleLogout = () => {
    localStorage.removeItem('companyAuth');
    localStorage.removeItem('companyData');
    navigate('/');
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const updateStatus = (id, newStatus) => {
    setCandidates(candidates.map(c => 
      c.id === id ? { ...c, status: newStatus } : c
    ));
  };

  const getAtsScoreClass = (score) => {
    if (score >= 80) return 'ats-high';
    if (score >= 60) return 'ats-medium';
    return 'ats-low';
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      new: 'bg-primary/10 text-primary',
      shortlisted: 'bg-success/10 text-success',
      interview: 'bg-warning/10 text-warning',
      rejected: 'bg-destructive/10 text-destructive',
    };
    return statusClasses[status] || statusClasses.new;
  };

  const filteredAndSortedCandidates = candidates
    .filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           c.resumeTitle.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || c.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      const modifier = sortOrder === 'asc' ? 1 : -1;
      if (sortBy === 'atsScore') return (a.atsScore - b.atsScore) * modifier;
      if (sortBy === 'name') return a.name.localeCompare(b.name) * modifier;
      if (sortBy === 'appliedDate') return new Date(a.appliedDate).getTime() - new Date(b.appliedDate).getTime() * modifier;
      return 0;
    });

  const stats = [
    { label: 'Total Candidates', value: candidates.length, icon: Users, color: 'primary' },
    { label: 'Shortlisted', value: candidates.filter(c => c.status === 'shortlisted').length, icon: UserCheck, color: 'success' },
    { label: 'Interviews', value: candidates.filter(c => c.status === 'interview').length, icon: Calendar, color: 'warning' },
    { label: 'Avg ATS Score', value: Math.round(candidates.reduce((sum, c) => sum + c.atsScore, 0) / candidates.length), icon: TrendingUp, color: 'accent' },
  ];

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

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden md:block">
                Company Dashboard
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-destructive bg-destructive/10 rounded-lg hover:bg-destructive/20 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Welcome Back! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your recruitment pipeline
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`card-interactive p-6 animate-slide-up delay-${(index + 1) * 100}`}
            >
              <div className={`w-12 h-12 rounded-xl bg-${stat.color}/10 flex items-center justify-center mb-4`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}`} />
              </div>
              <div className="text-2xl font-display font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters & Search */}
        <div className="glass-card rounded-xl p-4 mb-6 animate-slide-up delay-300">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-12 w-full"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="input-field pr-10"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="interview">Interview</option>
                <option value="rejected">Rejected</option>
              </select>
              <button
                onClick={() => handleSort('atsScore')}
                className="btn-secondary flex items-center gap-2"
              >
                <ArrowUpDown className="w-4 h-4" />
                Sort by ATS
              </button>
            </div>
          </div>
        </div>

        {/* Candidates List */}
        <div className="space-y-4">
          {filteredAndSortedCandidates.map((candidate, index) => (
            <div
              key={candidate.id}
              className={`card-interactive p-6 animate-slide-up delay-${Math.min((index + 4) * 100, 500)}`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Avatar & Basic Info */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-lg">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">
                      {candidate.name}
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      {candidate.resumeTitle}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {candidate.experience} experience
                    </p>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map(skill => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ATS Score */}
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className={`ats-score ${getAtsScoreClass(candidate.atsScore)}`}>
                      {candidate.atsScore}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">ATS Score</p>
                  </div>

                  {/* Status Badge */}
                  <div className="text-center">
                    <span className={`status-badge capitalize ${getStatusBadge(candidate.status)}`}>
                      {candidate.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {candidate.status !== 'shortlisted' && candidate.status !== 'rejected' && (
                      <button
                        onClick={() => updateStatus(candidate.id, 'shortlisted')}
                        className="p-2 rounded-lg bg-success/10 text-success hover:bg-success/20 transition-colors"
                        title="Shortlist"
                      >
                        <UserCheck className="w-5 h-5" />
                      </button>
                    )}
                    {candidate.status !== 'interview' && candidate.status !== 'rejected' && (
                      <button
                        onClick={() => updateStatus(candidate.id, 'interview')}
                        className="p-2 rounded-lg bg-warning/10 text-warning hover:bg-warning/20 transition-colors"
                        title="Schedule Interview"
                      >
                        <Calendar className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAndSortedCandidates.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No candidates found matching your criteria</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CompanyDashboard;
