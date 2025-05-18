
import React from "react";
import Layout from "@/components/Layout";
import Resource from "@/components/Resource";
import Module from "@/components/Module";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Science = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Science</h1>
          <p className="text-lg text-gray-700">
            Discover the wonders of science through our interactive content.
          </p>
        </div>

        <Tabs defaultValue="modules" className="w-full mb-10">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="modules">Learning Modules</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="modules" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Module
                id="science-life"
                title="Life Science Basics"
                description="Introduction to living organisms and ecosystems"
                lessons={5}
                content={
                  <div className="space-y-3">
                    <p>This module explores the basics of life science:</p>
                    <ul className="list-disc list-inside space-y-1 pl-4">
                      <li>Cell structure and function</li>
                      <li>Plant and animal systems</li>
                      <li>Genetics and inheritance</li>
                      <li>Ecosystems and environments</li>
                      <li>Human biology</li>
                    </ul>
                  </div>
                }
              />

              <Module
                id="science-physical"
                title="Physical Science Fundamentals"
                description="Understanding matter, energy and forces"
                lessons={6}
                content={
                  <div className="space-y-3">
                    <p>This module covers essential physical science concepts:</p>
                    <ul className="list-disc list-inside space-y-1 pl-4">
                      <li>Properties of matter</li>
                      <li>Chemical reactions</li>
                      <li>Energy forms and transfers</li>
                      <li>Forces and motion</li>
                      <li>Electricity and magnetism</li>
                      <li>Light and sound</li>
                    </ul>
                  </div>
                }
              />

              <Module
                id="science-earth"
                title="Earth and Space Sciences"
                description="Exploring our planet and the universe"
                lessons={4}
                content={
                  <div className="space-y-3">
                    <p>This module explores Earth and space sciences:</p>
                    <ul className="list-disc list-inside space-y-1 pl-4">
                      <li>Earth's structure and materials</li>
                      <li>Weather and climate</li>
                      <li>The solar system</li>
                      <li>Stars, galaxies and the universe</li>
                    </ul>
                  </div>
                }
              />

              <Module
                id="science-method"
                title="Scientific Method and Experimentation"
                description="Learn how to think and work like a scientist"
                lessons={3}
                content={
                  <div className="space-y-3">
                    <p>This module covers the process of scientific inquiry:</p>
                    <ul className="list-disc list-inside space-y-1 pl-4">
                      <li>Steps of the scientific method</li>
                      <li>Designing experiments</li>
                      <li>Analyzing data and drawing conclusions</li>
                    </ul>
                  </div>
                }
              />
            </div>
          </TabsContent>
          
          <TabsContent value="resources" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Resource
                id="science-experiments"
                title="Home Science Experiments"
                description="Experiments you can do with household items"
                type="document"
                content="Science is best learned through hands-on experience. This resource includes 20 safe and simple experiments that can be conducted using materials commonly found at home. Each experiment includes a materials list, step-by-step instructions, expected results, and scientific explanations. The experiments cover various topics in physics, chemistry, and biology, helping students observe scientific principles in action. Safety guidelines are provided for each experiment."
              />
              
              <Resource
                id="plant-biology"
                title="Plant Biology Guide"
                description="Understanding the world of plants"
                type="document"
                content="Plants are essential for life on Earth. This resource explores the structure and function of plants, from cells to complex systems. Students will learn about photosynthesis, plant reproduction, growth, and adaptation to different environments. The guide pays special attention to South African indigenous plants and their unique adaptations. Colorful diagrams, photographs, and activities help make plant biology engaging and accessible."
              />
              
              <Resource
                id="chemistry-everyday"
                title="Chemistry in Everyday Life"
                description="How chemistry surrounds us"
                type="document"
                content="Chemistry isn't just in laboratories—it's everywhere! This resource connects chemical concepts to everyday experiences, showing how chemistry is involved in cooking, cleaning, medicine, and more. Students will learn about atoms, elements, compounds, mixtures, and reactions through familiar examples. The resource includes interesting facts about the chemical processes behind common phenomena and simple activities that demonstrate chemical principles using safe, household materials."
              />
              
              <Resource
                id="renewable-energy"
                title="Renewable Energy Resources"
                description="Understanding sustainable energy sources"
                type="document"
                content="Renewable energy is crucial for a sustainable future. This resource explores different forms of renewable energy including solar, wind, hydroelectric, and biomass energy. Students will learn how each type works, their advantages and limitations, and their relevance to South Africa's energy landscape. The resource includes case studies of renewable energy projects in South Africa and discusses how individual actions can contribute to energy conservation."
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-muted p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Science in South Africa</h2>
          <p className="mb-4">
            South Africa has a rich scientific heritage and continues to make important contributions to fields like astronomy, paleontology, and biodiversity research.
          </p>
          <p>
            Our science resources highlight South African scientific achievements and natural phenomena, connecting global scientific principles to local contexts.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Science;
