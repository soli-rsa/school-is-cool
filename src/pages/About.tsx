
import React from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">About School is Cool</h1>
          <p className="text-lg text-gray-700">
            Providing accessible education for South African students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="mb-4 text-gray-700">
              School is Cool is dedicated to bridging the digital divide in education by providing high-quality, offline-accessible educational resources to underserved communities in South Africa.
            </p>
            <p className="mb-4 text-gray-700">
              We believe that every student deserves access to quality educational materials regardless of their internet connectivity or economic circumstances. Our platform is designed to work efficiently on various devices, including older smartphones and tablets, with minimal data usage.
            </p>
            <p className="text-gray-700">
              By focusing on local-first, offline-capable technology, we ensure that students can continue learning even in areas with limited or inconsistent internet access.
            </p>
          </div>
          
          <div className="bg-muted rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-1 mr-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <div>
                  <span className="font-medium">Offline Access</span>
                  <p className="text-gray-700 text-sm">All resources are available offline once visited</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-1 mr-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <div>
                  <span className="font-medium">Low Data Usage</span>
                  <p className="text-gray-700 text-sm">Optimized for minimal data consumption</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-1 mr-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <div>
                  <span className="font-medium">Progress Tracking</span>
                  <p className="text-gray-700 text-sm">Track your learning journey even without internet</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-1 mr-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <div>
                  <span className="font-medium">Curriculum Aligned</span>
                  <p className="text-gray-700 text-sm">Content follows South African curriculum guidelines</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-1 mr-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <div>
                  <span className="font-medium">Accessible Design</span>
                  <p className="text-gray-700 text-sm">Built for all users, including those with disabilities</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg mb-12">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Our Technology</h2>
            <p className="mb-4">
              School is Cool utilizes modern web technologies to create a fast, reliable, and offline-capable learning platform:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-bold mb-2">Service Worker</h3>
                <p className="text-sm text-gray-700">
                  Enables offline functionality by caching resources for later use without an internet connection.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-bold mb-2">IndexedDB</h3>
                <p className="text-sm text-gray-700">
                  Client-side database that stores your progress and downloaded resources locally on your device.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-bold mb-2">Responsive Design</h3>
                <p className="text-sm text-gray-700">
                  Optimized for all screen sizes, from basic feature phones to tablets and desktop computers.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-accent rounded-lg p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Join Our Mission</h2>
          <p className="max-w-2xl mx-auto mb-6">
            School is Cool is always looking for volunteers, content contributors, and partners who share our vision of accessible education for all South African students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contribute">How to Contribute</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
