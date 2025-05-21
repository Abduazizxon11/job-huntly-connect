
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Briefcase, Building2, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock job categories for now
const jobCategories = [
  { name: "IT va Dasturlash", count: 320, icon: "💻" },
  { name: "Marketing", count: 142, icon: "📈" },
  { name: "Dizayn", count: 97, icon: "🎨" },
  { name: "Moliya", count: 85, icon: "💰" },
  { name: "Ta'lim", count: 76, icon: "📚" },
  { name: "Savdo", count: 120, icon: "🛒" },
];

// Mock featured jobs
const featuredJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "IT Solutions",
    location: "Toshkent",
    salary: "10,000,000 - 15,000,000 UZS",
    type: "Full-time",
    logo: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    title: "Marketing Manager",
    company: "Digital Media",
    location: "Toshkent",
    salary: "8,000,000 - 12,000,000 UZS",
    type: "Full-time",
    logo: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "Creative Studio",
    location: "Samarqand",
    salary: "7,000,000 - 11,000,000 UZS",
    type: "Remote",
    logo: "https://via.placeholder.com/50",
  },
  {
    id: 4,
    title: "Backend Engineer",
    company: "Tech Innovators",
    location: "Toshkent",
    salary: "12,000,000 - 18,000,000 UZS",
    type: "Full-time",
    logo: "https://via.placeholder.com/50",
  },
];

// Mock featured companies
const featuredCompanies = [
  { id: 1, name: "Tech Innovations", jobs: 15, logo: "https://via.placeholder.com/80" },
  { id: 2, name: "Digital Solutions", jobs: 8, logo: "https://via.placeholder.com/80" },
  { id: 3, name: "Creative Studios", jobs: 12, logo: "https://via.placeholder.com/80" },
  { id: 4, name: "Finance Group", jobs: 5, logo: "https://via.placeholder.com/80" },
  { id: 5, name: "Education Hub", jobs: 7, logo: "https://via.placeholder.com/80" },
];

const Index: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-50 to-slate-100 py-16 md:py-24">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800">
              O'zingizga mos ishni <span className="text-brand-500">toping</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              HeadHunter platformasida minglab vakansiyalar va ishga oluvchilar. Karyerangizni bugun boshlang!
            </p>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
                <div className="md:col-span-3 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Ish nomi yoki kalit so'z..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="md:col-span-3 relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Joylashuv..."
                    className="pl-9"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <Button className="md:col-span-1 bg-brand-500 hover:bg-brand-600">
                  Qidirish
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-3">Ommabop qidiruvlar:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["Dasturchi", "Marketing", "Dizayner", "Remote", "Moliya", "Part-time"].map((tag) => (
                <Link
                  key={tag}
                  to={`/jobs?q=${tag}`}
                  className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm hover:bg-brand-50 hover:border-brand-200 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ish kategoriyalari</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              O'zingizga qiziq bo'lgan sohani tanlang va eng yaxshi imkoniyatlarni toping
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {jobCategories.map((category) => (
              <Link
                key={category.name}
                to={`/jobs?category=${category.name}`}
                className="flex flex-col items-center p-6 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-4xl mb-3">{category.icon}</span>
                <h3 className="font-medium text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} vakansiya</p>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button variant="outline" asChild>
              <Link to="/jobs">Barcha kategoriyalarni ko'rish &rarr;</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 bg-slate-50">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Top vakansiyalar</h2>
            <Button variant="link" asChild className="text-brand-500">
              <Link to="/jobs">Barchasini ko'rish &rarr;</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredJobs.map((job) => (
              <Link
                key={job.id}
                to={`/jobs/${job.id}`}
                className="bg-white rounded-lg border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-lg text-gray-900">
                      {job.title}
                    </h3>
                    <p className="text-gray-500 flex items-center gap-1 mt-1">
                      <Building2 className="h-3 w-3" /> {job.company}
                    </p>
                    <p className="text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" /> {job.location}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-brand-500 font-medium">{job.salary}</span>
                  <span className="bg-brand-50 text-brand-700 text-xs px-2 py-1 rounded">
                    {job.type}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Top kompaniyalar</h2>
            <Button variant="link" asChild className="text-brand-500">
              <Link to="/companies">Barchasini ko'rish &rarr;</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {featuredCompanies.map((company) => (
              <Link
                key={company.id}
                to={`/companies/${company.id}`}
                className="bg-white rounded-lg border border-gray-100 p-6 text-center hover:shadow-md transition-shadow"
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-16 h-16 mx-auto mb-4 rounded-md"
                />
                <h3 className="font-medium text-gray-900">{company.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {company.jobs} open positions
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-500">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              O'z karyerangizni bugun boshlang!
            </h2>
            <p className="text-white/80 mb-8">
              Minglab vakansiyalar va kompaniyalar o'rtasidagi eng yaxshi imkoniyatlarni toping
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-white text-brand-500 hover:bg-gray-100">
                <Link to="/register">Hoziroq boshlash</Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-brand-400">
                <Link to="/jobs">Ishlarni ko'rish</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
