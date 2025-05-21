
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Building2, Users, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { api } from "@/services/api";
import { toast } from "sonner";

interface Resume {
  id: number;
  userId: number;
  skills: string[];
  experience: string;
  education: string;
}

interface Job {
  id: number;
  companyId: number;
  title: string;
  description: string;
  requirements: string[];
  salary: number;
}

interface Application {
  id: number;
  jobId: number;
  userId: number;
  status: string;
  job?: Job;
}

const Dashboard: React.FC = () => {
  const { userRole } = useAuth();
  const [resume, setResume] = useState<Resume | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (userRole === "JOB_SEEKER") {
          // Fetch job seeker data
          try {
            const resumeResponse = await api.get<Resume>("/resume/my");
            if (resumeResponse.status === "OK" && resumeResponse.data) {
              setResume(resumeResponse.data);
            }
          } catch (error) {
            console.log("No resume found");
          }

          const applicationsResponse = await api.get<Application[]>("/application/my");
          if (applicationsResponse.status === "OK" && applicationsResponse.data) {
            setApplications(applicationsResponse.data);
          }
        } else if (userRole === "COMPANY") {
          // Fetch company data
          const jobsResponse = await api.get<Job[]>("/job/my");
          if (jobsResponse.status === "OK" && jobsResponse.data) {
            setJobs(jobsResponse.data);
          }
        }
      } catch (error) {
        toast.error("Ma'lumotlarni yuklashda xatolik yuz berdi");
      } finally {
        setLoading(false);
      }
    };

    if (userRole) {
      fetchData();
    }
  }, [userRole]);

  const JobSeekerDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Rezume holati</CardTitle>
            <FileText className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {resume ? "Mavjud" : "Mavjud emas"}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {resume
                ? `${resume.skills.length} ko'nikma, ${resume.education ? "ta'lim" : ""}, ${
                    resume.experience ? "tajriba" : ""
                  }`
                : "Rezume hali yaratilmagan"}
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to={resume ? "/resume/edit" : "/resume/create"}>
                {resume ? "Rezumeni tahrirlash" : "Rezume yaratish"}
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Arizalarim</CardTitle>
            <Briefcase className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.length}</div>
            <p className="text-xs text-muted-foreground mt-2">
              {applications.filter(a => a.status === "PENDING").length} ko'rib chiqilmoqda
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/my-applications">
                Arizalarni ko'rish <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Yangi ishlar</CardTitle>
            <Briefcase className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100+</div>
            <p className="text-xs text-muted-foreground mt-2">
              So'nggi 7 kunda yangi ishlar
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/jobs">
                Ishlarni ko'rish <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6">So'nggi arizalarim</h2>
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : applications.length > 0 ? (
        <div className="space-y-4">
          {applications.slice(0, 3).map((application) => (
            <Card key={application.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{application.job?.title || "Ish nomi"}</h3>
                    <p className="text-muted-foreground">{application.status}</p>
                  </div>
                  <Button asChild variant="outline" className="mt-4 md:mt-0">
                    <Link to={`/applications/${application.id}`}>Batafsil</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Siz hali hech qanday arizalar topshirmadingiz</p>
            <Button asChild className="mt-4 bg-brand-500 hover:bg-brand-600">
              <Link to="/jobs">Ishlarni ko'rish</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );

  const CompanyDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">E'lonlarim</CardTitle>
            <Briefcase className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobs.length}</div>
            <p className="text-xs text-muted-foreground mt-2">
              {jobs.length > 0 ? "Faol e'lonlar" : "Hali e'lonlar yo'q"}
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-brand-500 hover:bg-brand-600">
              <Link to="/company/post-job">
                + Yangi ish e'lon qilish
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Nomzodlar</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-2">
              Ko'rib chiqish uchun yangi arizalar
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/company/applications">
                Arizalarni ko'rish <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Kompaniya profili</CardTitle>
            <Building2 className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65%</div>
            <p className="text-xs text-muted-foreground mt-2">
              Profil to'ldirilgan
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/company/profile">
                Profilni to'ldirish <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6">Mening e'lonlarim</h2>
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : jobs.length > 0 ? (
        <div className="space-y-4">
          {jobs.slice(0, 3).map((job) => (
            <Card key={job.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    <p className="text-muted-foreground">{job.salary.toLocaleString()} UZS</p>
                  </div>
                  <div className="flex items-center gap-3 mt-4 md:mt-0">
                    <Button asChild variant="outline">
                      <Link to={`/jobs/${job.id}/applications`}>Arizalar (15)</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to={`/company/jobs/${job.id}/edit`}>Tahrirlash</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Sizda hali ishlar e'lon qilinmagan</p>
            <Button asChild className="mt-4 bg-brand-500 hover:bg-brand-600">
              <Link to="/company/post-job">Ish e'lon qilish</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        {userRole === "JOB_SEEKER" && <JobSeekerDashboard />}
        {userRole === "COMPANY" && <CompanyDashboard />}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
