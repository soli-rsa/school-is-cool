
import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { dbService } from "@/services/db";

const Index = () => {
  useEffect(() => {
    // Initialize the database when the app starts
    dbService.initDB().catch(console.error);
    
    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
    }
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary/10 to-transparent py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Learn Anywhere, <span className="text-primary">Anytime</span>
              </h1>
              <p className="text-lg text-gray-700 mb-6 max-w-lg">
                School is Cool provides free educational resources for South African students that work even when you're offline.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link to="/digital-literacy">Start Learning</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-10 flex justify-center">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-40 h-40 bg-primary/20 rounded-full blur-2xl animate-pulse-slow"></div>
                <div className="absolute -bottom-8 -right-8 w-60 h-60 bg-secondary/20 rounded-full blur-2xl animate-pulse-slow"></div>
                <div className="relative bg-white rounded-xl shadow-lg p-4 w-full max-w-md">
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-3">
                        <span className="text-2xl">📚</span>
                      </div>
                      <h3 className="text-lg font-medium">Digital Literacy Training</h3>
                      <p className="text-sm text-gray-600 mt-1">Learn essential computer skills</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Learn With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Digital Literacy",
                description: "Learn essential computer and internet skills for the digital world.",
                icon: "💻",
                link: "/digital-literacy"
              },
              {
                title: "Mathematics",
                description: "Interactive math lessons from basic to advanced concepts.",
                icon: "➗",
                link: "/math-resources"
              },
              {
                title: "Science",
                description: "Explore the wonders of science with our engaging content.",
                icon: "🔬",
                link: "/science"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <Button variant="ghost" className="text-primary" asChild>
                  <Link to={feature.link}>Explore {feature.title}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offline Section */}
      <section className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow p-6 md:p-8 flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-2xl font-bold mb-3">Works Offline!</h2>
              <p className="text-gray-700 mb-4">
                Our application is designed to work without an internet connection. Once you've visited a page, it's available offline for your continued learning journey.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center mr-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <span>Save lessons for offline viewing</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center mr-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <span>Track your progress locally</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center mr-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <span>Access resources anytime, anywhere</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/3">
              <div className="bg-accent p-5 rounded-lg text-center">
                <div className="w-16 h-16 bg-secondary/20 rounded-full mx-auto flex items-center justify-center mb-4">
                  <span className="text-3xl">📱</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Get Started Now</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Start browsing our resources to make them available offline.
                </p>
                <Button asChild className="w-full">
                  <Link to="/dashboard">My Dashboard</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
