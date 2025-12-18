import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  InputBase,
  Chip,
  Card,
  CardContent,
  Button,
  CircularProgress,
  BottomNavigation,
  BottomNavigationAction,
  AppBar,
  Toolbar,
  Stack,
  useTheme
} from '@mui/material';
import {
  Search as SearchIcon,
  Sync as SyncIcon,
  Business as BusinessIcon,
  Work as WorkIcon,
  TrendingUp as TrendingUpIcon,
  Person as PersonIcon
} from '@mui/icons-material';

// --- CONFIGURATION ---
// Placeholder for the actual Bayanat Resource ID.
// Developers: Replace this with the specific GUID from bayanat.ae for "Employment by Economic Activity"
const BAYANAT_RESOURCE_ID = 'YOUR_RESOURCE_GUID_HERE';
const BAYANAT_API_URL = `https://bayanat.ae/api/DatasetResources/GetDatasetResource?resourceID=${BAYANAT_RESOURCE_ID}`;

// --- SIMULATED DATA ---
// Modeled after Michael Page / Cooper Fitch 2025 Guides as requested
const SIMULATED_JOBS = [
  {id: 1, title: "AI Specialist", company: "Gov Tech", location: "Dubai", salary: 35000, visa: "Golden Visa (Specialist)", type: "Remote", sector: "Tech"},
  {id: 2, title: "Solar Project Engineer", company: "Masdar City", location: "Abu Dhabi", salary: 24000, visa: "Green Visa", type: "On-site", sector: "Energy"},
  {id: 3, title: "BIM Manager", company: "Emaar Construction", location: "Dubai", salary: 32000, visa: "Golden Visa (Skilled)", type: "On-site", sector: "Construction"},
  {id: 4, title: "Medical Coder", company: "Mediclinic", location: "Sharjah", salary: 8500, visa: "Standard Visa", type: "Hybrid", sector: "Healthcare"},
  {id: 5, title: "Cyber Security Analyst", company: "DarkMatter", location: "Abu Dhabi", salary: 28000, visa: "Golden Visa (Specialist)", type: "On-site", sector: "Tech"},
  {id: 6, title: "Sustainability Consultant", company: "KPMG", location: "Dubai", salary: 22000, visa: "Green Visa", type: "Hybrid", sector: "Consulting"},
  {id: 7, title: "Digital Marketing Manager", company: "Al Tayer Retail", location: "Dubai", salary: 18000, visa: "Standard Visa", type: "On-site", sector: "Marketing"},
  {id: 8, title: "FinTech Product Owner", company: "Careem Pay", location: "Dubai", salary: 45000, visa: "Golden Visa (Executive)", type: "Remote", sector: "Finance"},
  {id: 9, title: "Registered Nurse (ICU)", company: "Cleveland Clinic", location: "Abu Dhabi", salary: 14000, visa: "Green Visa", type: "On-site", sector: "Healthcare"},
  {id: 10, title: "Logistics Coordinator", company: "DP World", location: "Jebel Ali", salary: 6500, visa: "Standard Visa", type: "On-site", sector: "Logistics"},
  {id: 11, title: "Legal Counsel (Tech)", company: "In-House", location: "DIFC", salary: 38000, visa: "Golden Visa (Specialist)", type: "Hybrid", sector: "Legal"},
  {id: 12, title: "Sales Executive (B2B)", company: "Real Estate Co", location: "Dubai", salary: 9000, visa: "Standard Visa", type: "On-site", sector: "Sales"}
];

const UAECareerCompass = () => {
  const theme = useTheme();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [navValue, setNavValue] = useState(0);

  // --- DATA FETCHING ARCHITECTURE ---
  const fetchJobs = async () => {
    setLoading(true);
    try {
      // Attempt to fetch from real API
      // Note: This will likely fail or return 404 until a valid Resource ID is provided.
      // We use a short timeout to fail fast and fallback to simulation.
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const response = await fetch(BAYANAT_API_URL, {
        signal: controller.signal,
        headers: { 'Accept': 'application/json' }
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        // TODO: Map the Bayanat API response structure to our job format here
        // For now, we assume if it fails/returns garbage we use simulation
        // This is where the "Real Data" mapping logic would go.
        console.log("Fetched data:", data);
        // If valid data, setJobs(mappedData);
        // For this demo/skeleton, we proceed to catch block/fallback.
        throw new Error("Using simulation (API Placeholder)");
      } else {
        throw new Error("API Response not OK");
      }
    } catch (error) {
      console.log("Falling back to simulated data:", error.message);
      // Fallback to SIMULATED_JOBS
      // Simulate a small network delay for realism
      await new Promise(resolve => setTimeout(resolve, 800));
      setJobs(SIMULATED_JOBS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // --- FILTERING LOGIC ---
  const handleFilterClick = (category) => {
    setFilterCategory(category);
    setSearchQuery(''); // Clear search when switching categories
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.visa.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      filterCategory === 'All' ||
      (filterCategory === 'Golden Visa' && job.visa.includes("Golden")) ||
      job.sector === filterCategory;

    return matchesSearch && matchesCategory;
  });

  // --- UI HELPERS ---
  const getVisaBadgeStyle = (visa) => {
    if (visa.includes("Golden")) {
      return {
        background: 'linear-gradient(135deg, #FFD700 0%, #FDB931 100%)',
        color: '#000',
        fontWeight: 'bold',
        border: 'none'
      };
    }
    if (visa.includes("Green")) {
      return {
        backgroundColor: '#e6f4ea',
        color: '#1e8e3e',
        border: '1px solid #ceead6'
      };
    }
    return {
      backgroundColor: theme.palette.action.selected,
      color: theme.palette.text.secondary
    };
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      bgcolor: 'background.default',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* HEADER */}
      <AppBar position="static" color="primary" sx={{ boxShadow: 2, zIndex: 10 }}>
        <Toolbar sx={{ flexDirection: 'column', alignItems: 'stretch', py: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="h6" component="h1" fontWeight="bold">
                UAE Career
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                2025 Market Feed • Dubai/Abu Dhabi
              </Typography>
            </Box>
            <IconButton onClick={fetchJobs} color="inherit" size="small" sx={{ bgcolor: 'primary.dark' }}>
              <SyncIcon fontSize="small" className={loading ? 'fa-spin' : ''} sx={{ animation: loading ? 'spin 1s linear infinite' : 'none', '@keyframes spin': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } } }} />
            </IconButton>
          </Box>

          {/* SEARCH BAR */}
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', bgcolor: 'background.paper' }}
          >
            <IconButton sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search jobs, skills, or visa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Paper>
        </Toolbar>
      </AppBar>

      {/* FILTERS (Scrollable) */}
      <Box sx={{
        py: 1.5,
        px: 2,
        bgcolor: 'background.paper',
        borderBottom: `1px solid ${theme.palette.divider}`,
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar
        scrollbarWidth: 'none'
      }}>
        <Stack direction="row" spacing={1}>
          {['All', 'Golden Visa', 'Tech', 'Construction', 'Healthcare', 'Energy', 'Finance'].map((cat) => (
            <Chip
              key={cat}
              label={cat === 'Golden Visa' ? '🌟 Golden Visa' : (cat === 'All' ? cat : `${cat}`)}
              onClick={() => handleFilterClick(cat)}
              color={filterCategory === cat ? "primary" : "default"}
              variant={filterCategory === cat ? "filled" : "outlined"}
              sx={{
                cursor: 'pointer',
                ...(cat === 'Golden Visa' && filterCategory !== 'Golden Visa' ? { borderColor: '#FFD700', color: '#FFD700' } : {})
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* JOB LIST */}
      <Box sx={{
        flex: 1,
        overflowY: 'auto',
        p: 2,
        pb: 10, // Space for bottom nav
        bgcolor: theme.palette.mode === 'dark' ? '#121212' : '#f3f4f6'
      }}>
        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 200, color: 'text.secondary' }}>
            <CircularProgress size={40} sx={{ mb: 2 }} />
            <Typography variant="body2">Fetching 2025 Opportunities...</Typography>
          </Box>
        ) : filteredJobs.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 4, color: 'text.secondary' }}>
            <Typography>No jobs found.</Typography>
          </Box>
        ) : (
          <Stack spacing={2}>
            {filteredJobs.map((job) => (
              <Card key={job.id} sx={{ borderRadius: 3, boxShadow: 1 }}>
                <CardContent sx={{ pb: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>{job.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                        <BusinessIcon sx={{ fontSize: 14, mr: 0.5 }} /> {job.company}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="subtitle1" color="primary" fontWeight="bold">
                        AED {job.salary.toLocaleString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {job.location}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    <Chip size="small" label={job.visa} sx={getVisaBadgeStyle(job.visa)} />
                    <Chip size="small" label={job.sector} variant="outlined" color="primary" />
                    <Chip size="small" label={job.type} sx={{ bgcolor: theme.palette.action.hover }} />
                  </Box>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button variant="contained" fullWidth size="small" sx={{ bgcolor: 'primary.light', color: 'primary.contrastText', boxShadow: 0, '&:hover': { bgcolor: 'primary.main' } }}>
                    View Details
                  </Button>
                </Box>
              </Card>
            ))}
          </Stack>
        )}
      </Box>

      {/* BOTTOM NAV */}
      <Paper sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTop: `1px solid ${theme.palette.divider}` }} elevation={3}>
        <BottomNavigation
          showLabels
          value={navValue}
          onChange={(event, newValue) => {
            setNavValue(newValue);
          }}
        >
          <BottomNavigationAction label="Jobs" icon={<WorkIcon />} />
          <BottomNavigationAction label="Trends" icon={<TrendingUpIcon />} />
          <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
        </BottomNavigation>
      </Paper>

    </Box>
  );
};

export default UAECareerCompass;
