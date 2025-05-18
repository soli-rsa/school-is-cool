
import React from "react";
import Layout from "@/components/Layout";
import Resource from "@/components/Resource";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MathResources = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Math Resources</h1>
          <p className="text-lg text-gray-700">
            Interactive mathematics lessons and resources for all grades.
          </p>
        </div>

        <Tabs defaultValue="primary" className="w-full mb-10">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="primary">Primary School</TabsTrigger>
            <TabsTrigger value="secondary">Secondary School</TabsTrigger>
            <TabsTrigger value="exercises">Practice Exercises</TabsTrigger>
          </TabsList>
          
          <TabsContent value="primary" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Resource
                id="math-basics"
                title="Basic Mathematics"
                description="Foundation for primary school mathematics"
                type="document"
                content="Mathematics is all around us. From counting objects to measuring distances, we use math every day. This resource introduces the basic concepts of counting, addition, subtraction, shapes, and simple measurements. Each section includes colorful diagrams and easy-to-understand examples that relate to everyday life. Students will learn through practical activities and exercises designed to build confidence and mathematical thinking skills."
              />
              
              <Resource
                id="multiplication"
                title="Multiplication Tables"
                description="Learn and practice multiplication tables"
                type="document"
                content="Multiplication is a fundamental skill that students need to master. This resource provides a step-by-step approach to learning multiplication tables from 1 to 12. It includes memory tricks, visual representations, and practice exercises. Students will start with simple concepts like repeated addition before moving to formal multiplication. The resource includes printable worksheets and games that make learning multiplication fun and engaging."
              />
              
              <Resource
                id="fractions-intro"
                title="Introduction to Fractions"
                description="Understanding fractions and their uses"
                type="document"
                content="Fractions represent parts of a whole. This resource introduces fractions using familiar examples like sharing a pizza or chocolate bar. Students will learn about numerators and denominators, equivalent fractions, and how to compare fractions. Through visual aids and hands-on activities, students will develop a strong conceptual understanding of fractions before learning procedures for adding, subtracting, multiplying, and dividing fractions."
              />
              
              <Resource
                id="math-games"
                title="Math Games and Activities"
                description="Fun ways to practice mathematical skills"
                type="document"
                content="Making math fun is essential for building positive attitudes toward the subject. This resource provides a collection of games and activities that reinforce mathematical concepts for primary school students. From number bingo to shape hunts, these activities can be done with minimal resources at home or in the classroom. Each game includes learning objectives, instructions, and variations to adapt for different skill levels."
              />
            </div>
          </TabsContent>
          
          <TabsContent value="secondary" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Resource
                id="algebra-basics"
                title="Algebra Fundamentals"
                description="Introduction to algebraic thinking"
                type="document"
                content="Algebra is the language of mathematics. This resource introduces algebraic concepts, starting with variables and expressions before moving to equations and functions. Students will learn how to solve linear equations, graph linear functions, and solve word problems using algebraic techniques. The material is presented with clear examples and practice problems that increase gradually in difficulty, building confidence along the way."
              />
              
              <Resource
                id="geometry-basics"
                title="Geometry Essentials"
                description="Understanding shapes and spatial relationships"
                type="document"
                content="Geometry helps us understand the world around us. This resource covers the properties of 2D and 3D shapes, angles, coordinate geometry, and transformations. Students will learn about the relationships between geometric figures and how to calculate perimeter, area, and volume. The resource includes interactive diagrams and practical applications to help students connect geometric concepts to real-world situations."
              />
              
              <Resource
                id="trig-intro"
                title="Trigonometry Introduction"
                description="Working with angles and triangles"
                type="document"
                content="Trigonometry deals with relationships between angles and sides of triangles. This resource introduces the three main trigonometric functions - sine, cosine, and tangent. Students will learn how to use these functions to solve problems involving right triangles and apply them to real-world situations like calculating heights and distances. The resource progresses from basic concepts to more complex applications, with plenty of examples and practice exercises."
              />
              
              <Resource
                id="data-handling"
                title="Data Handling and Statistics"
                description="Analyzing and interpreting data"
                type="document"
                content="In our information-rich world, data handling skills are essential. This resource covers the collection, organization, representation, and analysis of data. Students will learn about different types of graphs, measures of central tendency, and probability. The resource includes examples using relevant South African contexts and data sets, helping students understand how statistics are used in everyday life and decision-making."
              />
            </div>
          </TabsContent>
          
          <TabsContent value="exercises" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Resource
                id="practice-arithmetic"
                title="Arithmetic Practice Problems"
                description="Exercises on basic arithmetic operations"
                type="document"
                content="Practice makes perfect when it comes to arithmetic skills. This resource provides a comprehensive set of practice problems covering addition, subtraction, multiplication, and division with whole numbers, decimals, and fractions. The problems are organized by difficulty level and include solutions with detailed explanations. Regular practice with these exercises will build computational fluency and confidence in working with numbers."
              />
              
              <Resource
                id="practice-algebra"
                title="Algebra Worksheets"
                description="Practice problems for algebraic concepts"
                type="document"
                content="Mastering algebra requires practice. This resource provides worksheets covering different algebraic topics including expressions, equations, inequalities, and functions. Each worksheet includes a brief review of concepts followed by problems that range from straightforward to challenging. Complete solutions are provided for all problems, allowing students to check their work and understand the solving process."
              />
              
              <Resource
                id="practice-geometry"
                title="Geometry Problem Set"
                description="Exercises on geometric principles"
                type="document"
                content="Geometry involves both visual understanding and logical reasoning. This resource provides practice problems that develop both aspects through exercises on angles, triangles, quadrilaterals, circles, and 3D objects. The problems include both calculation exercises and proofs, helping students develop mathematical reasoning skills. Visual aids accompany many problems to help students visualize geometric relationships."
              />
              
              <Resource
                id="practice-word-problems"
                title="Mathematical Word Problems"
                description="Real-world application problems"
                type="document"
                content="Word problems help connect mathematics to real-world situations. This resource contains word problems organized by topic and difficulty level. The problems cover scenarios relevant to South African students and include situations involving shopping, travel, cooking, and sports. Detailed solutions show how to translate word problems into mathematical expressions and equations, teaching students a systematic approach to problem-solving."
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-muted p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Using These Resources</h2>
          <p className="mb-4">
            These math resources are designed to complement the South African curriculum and provide additional support for students at all levels. They can be used for self-study, classroom supplements, or revision.
          </p>
          <p>
            All resources can be downloaded for offline use by clicking the "Save Offline" button. Your progress will be tracked even when you don't have an internet connection.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default MathResources;
