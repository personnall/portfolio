import React, { useState, Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import './index.css'

import Layout from './layouts/Layout.jsx'
import BootSequence from './components/BootSequence.jsx'
import { ErrorBoundary } from './components/ErrorBoundary.jsx'
import { SettingsProvider } from './store/SettingsContext.jsx'
import { AchievementProvider } from './store/AchievementContext.jsx'
import EasterEggs from './components/EasterEggs.jsx'
import SystemLoading from './components/SystemLoading.jsx'

const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Projects = lazy(() => import('./pages/Projects.jsx'))
const ProjectDetails = lazy(() => import('./pages/ProjectDetails.jsx'))
const Skills = lazy(() => import('./pages/Skills.jsx'))
const Experience = lazy(() => import('./pages/Experience.jsx'))
const Education = lazy(() => import('./pages/Education.jsx'))
const Certificates = lazy(() => import('./pages/Certificates.jsx'))
const Resume = lazy(() => import('./pages/Resume.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Settings = lazy(() => import('./pages/Settings.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))

const AdminLayout = lazy(() => import('./admin/AdminLayout.jsx'))
const AdminOverview = lazy(() => import('./admin/AdminOverview.jsx'))
const AdminProjects = lazy(() => import('./admin/AdminProjects.jsx'))
const AdminSkills = lazy(() => import('./admin/AdminSkills.jsx'))
const AdminActivities = lazy(() => import('./admin/AdminActivities.jsx'))
const AdminProfile = lazy(() => import('./admin/AdminProfile.jsx'))
const AdminExperience = lazy(() => import('./admin/AdminExperience.jsx'))
const AdminEducation = lazy(() => import('./admin/AdminEducation.jsx'))
const AdminCertificates = lazy(() => import('./admin/AdminCertificates.jsx'))

const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } } });

function Root() {
  const [booted, setBooted] = useState(false);
  if (!booted) return <BootSequence onComplete={() => setBooted(true)} />;
  return (
    <ErrorBoundary>
      <SettingsProvider>
        <AchievementProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <EasterEggs />
              <Suspense fallback={<SystemLoading />}>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="about" element={<About />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="projects/:id" element={<ProjectDetails />} />
                    <Route path="skills" element={<Skills />} />
                    <Route path="experience" element={<Experience />} />
                    <Route path="education" element={<Education />} />
                    <Route path="certificates" element={<Certificates />} />
                    <Route path="resume" element={<Resume />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                  <Route path="/login" element={<Login />} />
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminOverview />} />
                    <Route path="projects" element={<AdminProjects />} />
                    <Route path="skills" element={<AdminSkills />} />
                    <Route path="activities" element={<AdminActivities />} />
                    <Route path="profile" element={<AdminProfile />} />
                    <Route path="experience" element={<AdminExperience />} />
                    <Route path="education" element={<AdminEducation />} />
                    <Route path="certificates" element={<AdminCertificates />} />
                    <Route path="settings" element={<Settings />} />
                  </Route>
                </Routes>
              </Suspense>
              <Toaster position="top-right" />
            </BrowserRouter>
          </QueryClientProvider>
        </AchievementProvider>
      </SettingsProvider>
    </ErrorBoundary>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><Root /></React.StrictMode>)
