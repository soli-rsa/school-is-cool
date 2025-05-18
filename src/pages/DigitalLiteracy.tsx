
import React from "react";
import Layout from "@/components/Layout";
import Module from "@/components/Module";

const DigitalLiteracy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Digital Literacy</h1>
          <p className="text-lg text-gray-700">
            Learn essential digital skills to navigate today's world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Module
            id="digital-literacy-basics"
            title="Computer Basics"
            description="Learn the fundamentals of using a computer"
            lessons={5}
            content={
              <div className="space-y-3">
                <p>This module covers the essential skills needed to use a computer:</p>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li>Understanding computer components</li>
                  <li>Using a mouse and keyboard</li>
                  <li>Managing files and folders</li>
                  <li>Basic troubleshooting</li>
                  <li>Computer safety and maintenance</li>
                </ul>
              </div>
            }
          />

          <Module
            id="digital-literacy-internet"
            title="Internet Basics"
            description="Learn how to navigate and use the internet"
            lessons={4}
            content={
              <div className="space-y-3">
                <p>This module covers essential internet skills:</p>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li>Understanding what the internet is</li>
                  <li>Using web browsers effectively</li>
                  <li>Searching for information online</li>
                  <li>Internet safety and privacy</li>
                </ul>
              </div>
            }
          />

          <Module
            id="digital-literacy-email"
            title="Email Basics"
            description="Learn how to use email for communication"
            lessons={3}
            content={
              <div className="space-y-3">
                <p>This module covers important email skills:</p>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li>Creating an email account</li>
                  <li>Sending and receiving emails</li>
                  <li>Email etiquette and safety</li>
                </ul>
              </div>
            }
          />

          <Module
            id="digital-literacy-mobile"
            title="Mobile Device Skills"
            description="Learn how to use smartphones and tablets"
            lessons={4}
            content={
              <div className="space-y-3">
                <p>This module covers mobile device fundamentals:</p>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li>Navigating mobile interfaces</li>
                  <li>Installing and using apps</li>
                  <li>Mobile device security</li>
                  <li>Mobile internet connectivity</li>
                </ul>
              </div>
            }
          />
        </div>

        <div className="bg-muted p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">About Digital Literacy</h2>
          <p className="mb-4">
            Digital literacy is the ability to use information and communication technologies to find, evaluate, create, and communicate information. These skills are essential in today's increasingly digital world.
          </p>
          <p>
            Our digital literacy modules are designed specifically for South African students who may be new to technology. All content is available offline once you've visited each page, making it accessible even when internet access is limited.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default DigitalLiteracy;
