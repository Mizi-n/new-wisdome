"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, MessageSquare, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"

// Mock data for communities
const communities = [
  {
    id: "civil",
    name: "Civil Engineering",
    description: "Discuss structural analysis, construction materials, geotechnical engineering, and more.",
    members: 1245,
    questions: 856,
    trending: ["Structural Design", "Soil Mechanics", "Construction Management"],
  },
  {
    id: "mechanical",
    name: "Mechanical Engineering",
    description: "Explore thermodynamics, fluid mechanics, machine design, and manufacturing processes.",
    members: 1876,
    questions: 1243,
    trending: ["Heat Transfer", "Fluid Dynamics", "CAD Design"],
  },
  {
    id: "electrical",
    name: "Electrical Engineering",
    description: "Discuss circuits, power systems, electronics, control systems, and signal processing.",
    members: 2134,
    questions: 1567,
    trending: ["Circuit Analysis", "Power Systems", "Digital Electronics"],
  },
  {
    id: "cs",
    name: "Computer Science",
    description: "Explore algorithms, data structures, programming languages, and software engineering.",
    members: 3245,
    questions: 2876,
    trending: ["Algorithms", "Web Development", "Database Systems"],
  },
  {
    id: "ai",
    name: "Artificial Intelligence",
    description: "Discuss machine learning, neural networks, natural language processing, and AI applications.",
    members: 2567,
    questions: 1987,
    trending: ["Deep Learning", "Computer Vision", "NLP"],
  },
  {
    id: "robotics",
    name: "Robotics",
    description: "Explore robot design, control systems, sensors, actuators, and automation.",
    members: 1432,
    questions: 876,
    trending: ["Robot Kinematics", "Sensor Fusion", "Autonomous Systems"],
  },
  {
    id: "cybersecurity",
    name: "Cyber Security",
    description: "Discuss network security, cryptography, ethical hacking, and security protocols.",
    members: 1876,
    questions: 1243,
    trending: ["Penetration Testing", "Cryptography", "Network Security"],
  },
  {
    id: "ec",
    name: "Electronics & Communication",
    description: "Explore electronic circuits, communication systems, signal processing, and microelectronics.",
    members: 1654,
    questions: 1123,
    trending: ["Analog Circuits", "Digital Communication", "VLSI Design"],
  },
  {
    id: "it",
    name: "Information Technology",
    description: "Discuss IT infrastructure, networking, databases, and system administration.",
    members: 2134,
    questions: 1432,
    trending: ["Cloud Computing", "Networking", "Database Management"],
  },
  {
    id: "aids",
    name: "AI & Data Science",
    description: "Explore data analysis, statistical modeling, machine learning, and big data technologies.",
    members: 1987,
    questions: 1345,
    trending: ["Data Visualization", "Statistical Analysis", "Big Data"],
  },
]

export default function CommunitiesPage() {
  const [joinedCommunities, setJoinedCommunities] = useState(() => {
    if (typeof localStorage !== "undefined") {
      const storedCommunities = localStorage.getItem("wisdomeeJoinedCommunities")
      return storedCommunities ? JSON.parse(storedCommunities) : []
    }
    return []
  })

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("wisdomeeJoinedCommunities", JSON.stringify(joinedCommunities))
    }
  }, [joinedCommunities])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Engineering Communities</h1>

      <Tabs defaultValue="all" className="space-y-8">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="all">All Communities</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="my">My Communities</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((community) => (
              <CommunityCard
                key={community.id}
                community={community}
                joinedCommunities={joinedCommunities}
                setJoinedCommunities={setJoinedCommunities}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities
              .sort((a, b) => b.members - a.members)
              .slice(0, 6)
              .map((community) => (
                <CommunityCard
                  key={community.id}
                  community={community}
                  joinedCommunities={joinedCommunities}
                  setJoinedCommunities={setJoinedCommunities}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities
              .sort((a, b) => b.questions - a.questions)
              .slice(0, 6)
              .map((community) => (
                <CommunityCard
                  key={community.id}
                  community={community}
                  joinedCommunities={joinedCommunities}
                  setJoinedCommunities={setJoinedCommunities}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="my" className="space-y-6">
          {joinedCommunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communities
                .filter((community) => joinedCommunities.includes(community.id))
                .map((community) => (
                  <CommunityCard
                    key={community.id}
                    community={community}
                    joinedCommunities={joinedCommunities}
                    setJoinedCommunities={setJoinedCommunities}
                  />
                ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500 mb-4">You haven't joined any communities yet.</p>
                <Button asChild>
                  <Link href="#all">Browse Communities</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CommunityCard({ community, joinedCommunities, setJoinedCommunities }) {
  const isJoined = joinedCommunities.includes(community.id)

  const handleJoinCommunity = () => {
    if (!isJoined) {
      const newJoinedCommunities = [...joinedCommunities, community.id]
      setJoinedCommunities(newJoinedCommunities)
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>{community.name}</CardTitle>
        <CardDescription>{community.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-grow">
        <div className="flex space-x-4">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm text-gray-500">{community.members} members</span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm text-gray-500">{community.questions} questions</span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium flex items-center mb-2">
            <TrendingUp className="h-4 w-4 mr-2 text-blue-600" />
            Trending Topics
          </h4>
          <div className="flex flex-wrap gap-2">
            {community.trending.map((topic, index) => (
              <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {isJoined ? (
          <Button asChild className="w-full">
            <Link href={`/communities/${community.id}`}>View Community</Link>
          </Button>
        ) : (
          <Button className="w-full" onClick={handleJoinCommunity}>
            <Link href={`/communities/${community.id}`}>Join Community</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

