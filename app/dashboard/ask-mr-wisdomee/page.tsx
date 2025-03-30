"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, Send, User, RefreshCw } from "lucide-react"

export default function AskMrWisdomee() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm Mr. Wisdomee, your engineering knowledge assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("User")

  useEffect(() => {
    // Check if user is logged in
    const loggedInStatus = localStorage.getItem("wisdomeeLoggedIn")
    if (loggedInStatus === "true") {
      setIsLoggedIn(true)

      // Get user email to personalize the experience
      const email = localStorage.getItem("wisdomeeEmail")
      if (email) {
        const name = email.split("@")[0]
        setUserName(name.charAt(0).toUpperCase() + name.slice(1))
      }
    }

    // Scroll to bottom of messages
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      generateResponse(input)
    }, 1000)
  }

  const generateResponse = (userInput) => {
    // More sophisticated rule-based responses with engineering knowledge
    let response = ""
    const lowerInput = userInput.toLowerCase()

    // Civil Engineering
    if (lowerInput.includes("beam") || lowerInput.includes("bending moment")) {
      response =
        "In structural engineering, the bending moment in a simply supported beam with a uniformly distributed load (w) can be calculated using the formula M(x) = (wx/2)(L-x), where L is the beam length and x is the distance from the support. The maximum bending moment occurs at the center (x=L/2) and equals wL²/8. This is crucial for designing beams that can withstand expected loads without failure."
    } else if (lowerInput.includes("foundation") || lowerInput.includes("soil")) {
      response =
        "Foundations are critical structural elements that transfer loads from buildings to the ground. The main types include:\n\n1. Shallow foundations (spread footings, strip footings, and mat foundations) - used when suitable soil is near the surface\n\n2. Deep foundations (piles, drilled shafts) - used when suitable soil is at greater depths\n\n3. Special foundations (caissons, floating foundations) - used for specific challenging conditions\n\nThe choice depends on soil conditions, structural loads, and economic considerations."
    }

    // Computer Science
    else if (lowerInput.includes("algorithm") || lowerInput.includes("sort")) {
      response =
        "Sorting algorithms are fundamental in computer science. Here's a comparison of common ones:\n\n- Quicksort: Average O(n log n), worst-case O(n²). Uses divide-and-conquer with a pivot element. Very efficient in practice.\n\n- Mergesort: Consistent O(n log n) performance. Stable sort that uses divide-and-conquer by splitting, sorting, and merging.\n\n- Heapsort: O(n log n) performance. Uses a binary heap data structure.\n\n- Bubble sort: O(n²) performance. Simple but inefficient for large datasets.\n\nThe choice depends on data characteristics, stability requirements, and memory constraints."
    } else if (lowerInput.includes("data structure") || lowerInput.includes("tree") || lowerInput.includes("graph")) {
      response =
        "Data structures are specialized formats for organizing and storing data. Key structures include:\n\n- Arrays: Contiguous memory with O(1) access but O(n) insertion/deletion\n\n- Linked Lists: Non-contiguous with O(1) insertion/deletion but O(n) access\n\n- Trees: Hierarchical structures (Binary Search Trees, AVL, Red-Black) with O(log n) operations when balanced\n\n- Graphs: Networks of nodes connected by edges, useful for representing relationships\n\n- Hash Tables: Key-value pairs with O(1) average case operations\n\nChoosing the right data structure significantly impacts algorithm efficiency."
    }

    // Electrical Engineering
    else if (lowerInput.includes("circuit") || lowerInput.includes("ohm") || lowerInput.includes("current")) {
      response =
        "Ohm's Law is a fundamental principle in electrical engineering, stating that current (I) through a conductor is directly proportional to voltage (V) and inversely proportional to resistance (R): I = V/R.\n\nThis relationship forms the basis for circuit analysis along with Kirchhoff's Laws:\n\n1. Kirchhoff's Current Law (KCL): The sum of currents entering a node equals the sum leaving it\n\n2. Kirchhoff's Voltage Law (KVL): The sum of voltages around any closed loop equals zero\n\nThese principles allow engineers to analyze complex circuits systematically."
    } else if (
      lowerInput.includes("power system") ||
      lowerInput.includes("transformer") ||
      lowerInput.includes("generation")
    ) {
      response =
        "Power systems engineering involves the generation, transmission, and distribution of electrical power. Key components include:\n\n- Generators: Convert mechanical energy to electrical energy (typically 3-phase AC)\n\n- Transformers: Change voltage levels for efficient transmission (high voltage) and safe distribution (low voltage)\n\n- Transmission lines: Carry power over long distances, typically at 138kV to 765kV\n\n- Substations: Connect transmission and distribution systems with protection equipment\n\n- Distribution networks: Deliver power to end users at usable voltages (residential: 120/240V)\n\nModern power systems also incorporate renewable sources, smart grid technologies, and sophisticated control systems."
    }

    // Mechanical Engineering
    else if (lowerInput.includes("thermodynamics") || lowerInput.includes("heat") || lowerInput.includes("entropy")) {
      response =
        "Thermodynamics governs energy transfer and transformation. The four laws are:\n\n- Zeroth Law: If two systems are in thermal equilibrium with a third system, they are in thermal equilibrium with each other\n\n- First Law (Conservation of Energy): Energy cannot be created or destroyed, only transferred or converted\n\n- Second Law: Entropy of an isolated system always increases; heat flows naturally from hot to cold\n\n- Third Law: As temperature approaches absolute zero, entropy approaches a constant minimum\n\nThese principles are essential for designing engines, refrigeration systems, power plants, and understanding efficiency limits."
    } else if (lowerInput.includes("fluid") || lowerInput.includes("bernoulli") || lowerInput.includes("flow")) {
      response =
        "Fluid mechanics studies the behavior of liquids and gases. Bernoulli's equation is a fundamental principle stating that for an inviscid flow, an increase in fluid velocity occurs with a simultaneous decrease in pressure or potential energy: P + ½ρv² + ρgh = constant\n\nThis explains phenomena like lift on airplane wings and the venturi effect. Other important concepts include:\n\n- Reynolds number: Determines flow regime (laminar vs. turbulent)\n\n- Navier-Stokes equations: Describe fluid motion with conservation of mass, momentum, and energy\n\n- Boundary layer theory: Explains fluid behavior near surfaces\n\nThese principles are crucial for designing pumps, turbines, aircraft, and hydraulic systems."
    }

    // AI and Machine Learning
    else if (
      lowerInput.includes("machine learning") ||
      lowerInput.includes("ai") ||
      lowerInput.includes("neural network")
    ) {
      response =
        "Machine learning is a subset of AI focused on building systems that learn from data. Key paradigms include:\n\n- Supervised Learning: Training with labeled data (classification, regression)\n\n- Unsupervised Learning: Finding patterns in unlabeled data (clustering, dimensionality reduction)\n\n- Reinforcement Learning: Learning through interaction with an environment\n\nNeural networks, especially deep learning architectures, have revolutionized the field with:\n\n- Convolutional Neural Networks (CNNs): Excelling at image processing\n\n- Recurrent Neural Networks (RNNs) and Transformers: Handling sequential data like text\n\n- Generative models like GANs and diffusion models: Creating new content\n\nApplications span computer vision, natural language processing, robotics, and scientific discovery."
    }

    // Cybersecurity
    else if (lowerInput.includes("cybersecurity") || lowerInput.includes("security") || lowerInput.includes("hack")) {
      response =
        "Cybersecurity protects systems, networks, and data from digital attacks. Key concepts include:\n\n- CIA Triad: Confidentiality, Integrity, and Availability as core security objectives\n\n- Defense in Depth: Multiple security layers rather than a single protection mechanism\n\n- Common attack vectors: Phishing, malware, SQL injection, cross-site scripting, DDoS\n\n- Protection mechanisms: Encryption, authentication, access control, firewalls, IDS/IPS\n\n- Security frameworks: NIST Cybersecurity Framework, ISO 27001, MITRE ATT&CK\n\nBest practices include regular updates, strong authentication, principle of least privilege, security awareness training, and incident response planning."
    }

    // General engineering concepts
    else if (lowerInput.includes("material") || lowerInput.includes("strength") || lowerInput.includes("stress")) {
      response =
        "Materials engineering studies the properties and applications of materials. Key concepts include:\n\n- Stress and strain: Measures of force per unit area and resulting deformation\n\n- Young's modulus: Measure of material stiffness in elastic deformation\n\n- Yield strength: Point at which material begins plastic (permanent) deformation\n\n- Ultimate tensile strength: Maximum stress before failure\n\n- Fatigue: Progressive damage under cyclic loading\n\n- Creep: Time-dependent deformation under constant load\n\nMaterial selection balances mechanical properties, environmental resistance, manufacturability, and cost for specific applications."
    }

    // Conversational responses
    else if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
      response = `Hello ${userName}! I'm Mr. Wisdomee, your engineering knowledge assistant. I can help with questions about civil, mechanical, electrical, computer engineering, and more. What would you like to learn about today?`
    } else if (lowerInput.includes("thank")) {
      response =
        "You're welcome! Engineering is a fascinating field with so much to explore. Feel free to ask if you have any other questions. I'm here to help with your learning journey."
    } else if (lowerInput.includes("who are you") || lowerInput.includes("about you")) {
      response =
        "I'm Mr. Wisdomee, an AI assistant specialized in engineering knowledge. I'm designed to help students and professionals with questions across various engineering disciplines including civil, mechanical, electrical, computer science, and more. My goal is to make engineering concepts more accessible and support your learning journey."
    } else {
      // Default response for unrecognized questions
      response =
        "That's an interesting question about " +
        userInput.split(" ").slice(0, 3).join(" ") +
        "... \n\nIn engineering, it's important to approach this systematically. I'd recommend breaking this down into fundamental principles and considering the relevant equations and constraints. Could you provide more specific details about what aspect you're trying to understand? I'd be happy to explore this topic further with you."
    }

    // Add AI response
    setMessages((prev) => [...prev, { role: "assistant", content: response }])
    setIsLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: `Hello ${userName}! I'm Mr. Wisdomee, your engineering knowledge assistant. How can I help you today?`,
      },
    ])
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>MW</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>Ask Mr. Wisdomee</CardTitle>
              <CardDescription>Your AI engineering knowledge assistant</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 h-[500px] overflow-y-auto p-4 bg-gray-50 rounded-md">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${
                    message.role === "assistant" ? "" : "flex-row-reverse space-x-reverse"
                  }`}
                >
                  <Avatar className="mt-0.5">
                    {message.role === "assistant" ? (
                      <>
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </>
                    ) : (
                      <>
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  <div
                    className={`p-3 rounded-lg ${
                      message.role === "assistant" ? "bg-white border border-gray-200" : "bg-blue-600 text-white"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-[80%]">
                  <Avatar className="mt-0.5">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="flex items-center w-full space-x-2">
            <Button variant="outline" size="icon" onClick={clearChat} title="Clear chat">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Type your engineering question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <Button onClick={handleSendMessage} disabled={!input.trim() || isLoading} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 text-center">
            Mr. Wisdomee can answer questions about various engineering topics including civil, mechanical, electrical,
            computer science, and more.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

