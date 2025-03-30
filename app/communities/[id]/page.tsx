"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, ThumbsUp, Users, Search, Filter, PlusCircle } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for community details
const communityData = {
  civil: {
    name: "Civil Engineering",
    description: "Discuss structural analysis, construction materials, geotechnical engineering, and more.",
    members: 1245,
    questions: [
      {
        id: 1,
        title: "How to calculate the bending moment in a simply supported beam?",
        author: "Alex Johnson",
        date: "2 days ago",
        likes: 15,
        answers: 8,
        tags: ["Structural Analysis", "Mechanics"],
      },
      {
        id: 2,
        title: "What are the different types of foundations used in construction?",
        author: "Sarah Williams",
        date: "1 week ago",
        likes: 24,
        answers: 12,
        tags: ["Foundations", "Construction"],
      },
      {
        id: 3,
        title: "How to determine the water content in soil samples?",
        author: "Michael Brown",
        date: "3 days ago",
        likes: 9,
        answers: 5,
        tags: ["Soil Mechanics", "Geotechnical"],
      },
    ],
  },
  cs: {
    name: "Computer Science",
    description: "Explore algorithms, data structures, programming languages, and software engineering.",
    members: 3245,
    questions: [
      {
        id: 1,
        title: "What's the time complexity of quicksort in the worst case?",
        author: "David Chen",
        date: "1 day ago",
        likes: 32,
        answers: 15,
        tags: ["Algorithms", "Sorting", "Time Complexity"],
      },
      {
        id: 2,
        title: "How to implement a balanced binary search tree?",
        author: "Emily Zhang",
        date: "4 days ago",
        likes: 28,
        answers: 10,
        tags: ["Data Structures", "Trees", "Algorithms"],
      },
      {
        id: 3,
        title: "What are the differences between REST and GraphQL?",
        author: "James Wilson",
        date: "2 weeks ago",
        likes: 45,
        answers: 18,
        tags: ["Web Development", "API", "Backend"],
      },
    ],
  },
  mechanical: {
    name: "Mechanical Engineering",
    description: "Explore thermodynamics, fluid mechanics, machine design, and manufacturing processes.",
    members: 1876,
    questions: [
      {
        id: 1,
        title: "How to calculate the efficiency of a heat engine?",
        author: "Robert Smith",
        date: "3 days ago",
        likes: 18,
        answers: 7,
        tags: ["Thermodynamics", "Heat Transfer"],
      },
      {
        id: 2,
        title: "What are the different types of gears and their applications?",
        author: "Jennifer Lee",
        date: "1 week ago",
        likes: 29,
        answers: 14,
        tags: ["Machine Design", "Gears", "Mechanics"],
      },
      {
        id: 3,
        title: "How to analyze fluid flow in a pipe system?",
        author: "Thomas Anderson",
        date: "5 days ago",
        likes: 12,
        answers: 6,
        tags: ["Fluid Mechanics", "Hydraulics"],
      },
    ],
  },
}

// Default data for any community not in our mock data
const defaultCommunity = {
  name: "Engineering Community",
  description: "Discuss engineering topics, share knowledge, and ask questions.",
  members: 1000,
  questions: [
    {
      id: 1,
      title: "What are the best resources for learning this subject?",
      author: "John Doe",
      date: "1 week ago",
      likes: 20,
      answers: 10,
      tags: ["Learning", "Resources"],
    },
    {
      id: 2,
      title: "How to solve this engineering problem?",
      author: "Jane Smith",
      date: "3 days ago",
      likes: 15,
      answers: 7,
      tags: ["Problem Solving", "Engineering"],
    },
  ],
}

export default function CommunityPage({ params }) {
  const { id } = params
  const community = communityData[id] || defaultCommunity
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState("")
  const [filteredQuestions, setFilteredQuestions] = useState(community.questions)

  const [isJoined, setIsJoined] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showAskQuestionForm, setShowAskQuestionForm] = useState(false)
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    content: "",
    tags: [],
  })
  const [newTag, setNewTag] = useState("")
  const [userAnswers, setUserAnswers] = useState([])

  const [filterOptions, setFilterOptions] = useState({
    date: "all",
    subject: "all",
    answered: "all",
  })
  const [showFilters, setShowFilters] = useState(false)

  const applyFilters = (questions) => {
    return questions.filter((question) => {
      // Date filter
      if (filterOptions.date !== "all") {
        const questionDate = new Date(question.date.replace(" ago", ""))
        const currentDate = new Date()

        if (
          filterOptions.date === "today" &&
          !(
            questionDate.getDate() === currentDate.getDate() &&
            questionDate.getMonth() === currentDate.getMonth() &&
            questionDate.getFullYear() === currentDate.getFullYear()
          )
        ) {
          return false
        }

        if (filterOptions.date === "week" && currentDate - questionDate > 7 * 24 * 60 * 60 * 1000) {
          return false
        }

        if (filterOptions.date === "month" && currentDate - questionDate > 30 * 24 * 60 * 60 * 1000) {
          return false
        }
      }

      // Subject filter
      if (
        filterOptions.subject !== "all" &&
        !question.tags.some((tag) => tag.toLowerCase().includes(filterOptions.subject.toLowerCase()))
      ) {
        return false
      }

      // Answered filter
      if (filterOptions.answered === "answered" && question.answers === 0) {
        return false
      }

      if (filterOptions.answered === "unanswered" && question.answers > 0) {
        return false
      }

      return true
    })
  }

  useEffect(() => {
    // Check login status
    const loggedInStatus = localStorage.getItem("wisdomeeLoggedIn")
    if (loggedInStatus === "true") {
      setIsLoggedIn(true)
    }

    // Check if user has joined this community
    const joinedCommunities = localStorage.getItem("wisdomeeJoinedCommunities")
    if (joinedCommunities) {
      const communities = JSON.parse(joinedCommunities)
      setIsJoined(communities.includes(id))
    }

    // Load user's answers
    const storedAnswers = localStorage.getItem("wisdomeeUserAnswers")
    if (storedAnswers) {
      setUserAnswers(JSON.parse(storedAnswers))
    }
  }, [id])

  const handleJoinCommunity = () => {
    if (!isLoggedIn) {
      // Redirect to login if not logged in
      router.push("/auth/sign-in")
      return
    }

    const joinedCommunities = localStorage.getItem("wisdomeeJoinedCommunities")
    const communities = joinedCommunities ? JSON.parse(joinedCommunities) : []

    if (!communities.includes(id)) {
      communities.push(id)
      localStorage.setItem("wisdomeeJoinedCommunities", JSON.stringify(communities))
      setIsJoined(true)
    }
  }

  const handleAddTag = () => {
    if (newTag.trim() && !newQuestion.tags.includes(newTag.trim())) {
      setNewQuestion({
        ...newQuestion,
        tags: [...newQuestion.tags, newTag.trim()],
      })
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setNewQuestion({
      ...newQuestion,
      tags: newQuestion.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const handleSubmitQuestion = () => {
    if (!newQuestion.title.trim() || !newQuestion.content.trim() || newQuestion.tags.length === 0) {
      return
    }

    // In a real app, this would be an API call
    // For now, we'll just show a success message
    alert("Your question has been submitted successfully!")
    setShowAskQuestionForm(false)
    setNewQuestion({
      title: "",
      content: "",
      tags: [],
    })
  }

  const handleSearch = (e) => {
    const query = e.target.value
    setSearchQuery(query)

    let filtered = community.questions

    if (query.trim() !== "") {
      filtered = filtered.filter((question) => question.title.toLowerCase().includes(query.toLowerCase()))
    }

    // Apply additional filters
    filtered = applyFilters(filtered)

    setFilteredQuestions(filtered)
  }

  useEffect(() => {
    let filtered = community.questions

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((question) => question.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Apply additional filters
    filtered = applyFilters(filtered)

    setFilteredQuestions(filtered)
  }, [filterOptions, community.questions, searchQuery])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">{community.name}</h1>
          <p className="text-gray-600 mt-2">{community.description}</p>
          <div className="flex items-center mt-4 space-x-4">
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-gray-500" />
              <span className="text-gray-500">{community.members} members</span>
            </div>
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-gray-500" />
              <span className="text-gray-500">{community.questions.length} questions</span>
            </div>
          </div>
        </div>

        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button onClick={handleJoinCommunity} variant={isJoined ? "secondary" : "default"}>
            {isJoined ? "Joined Community" : "Join Community"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="questions" className="space-y-6">
        <TabsList>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="questions">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative w-full sm:w-auto flex-grow max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-10"
                />
              </div>

              <div className="flex space-x-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="flex-grow sm:flex-grow-0"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button
                  onClick={() => {
                    if (!isLoggedIn) {
                      router.push("/auth/sign-in")
                      return
                    }
                    if (!isJoined) {
                      alert("Please join the community first to ask questions.")
                      return
                    }
                    setShowAskQuestionForm(true)
                  }}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Ask Question
                </Button>
              </div>
            </div>

            {showFilters && (
              <Card className="w-full mt-4 p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="date-filter">Date</Label>
                    <Select
                      value={filterOptions.date}
                      onValueChange={(value) => setFilterOptions({ ...filterOptions, date: value })}
                    >
                      <SelectTrigger id="date-filter">
                        <SelectValue placeholder="Filter by date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All time</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="week">This week</SelectItem>
                        <SelectItem value="month">This month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subject-filter">Subject</Label>
                    <Select
                      value={filterOptions.subject}
                      onValueChange={(value) => setFilterOptions({ ...filterOptions, subject: value })}
                    >
                      <SelectTrigger id="subject-filter">
                        <SelectValue placeholder="Filter by subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All subjects</SelectItem>
                        <SelectItem value="structural">Structural</SelectItem>
                        <SelectItem value="mechanics">Mechanics</SelectItem>
                        <SelectItem value="algorithms">Algorithms</SelectItem>
                        <SelectItem value="data">Data Structures</SelectItem>
                        <SelectItem value="thermodynamics">Thermodynamics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="answered-filter">Status</Label>
                    <Select
                      value={filterOptions.answered}
                      onValueChange={(value) => setFilterOptions({ ...filterOptions, answered: value })}
                    >
                      <SelectTrigger id="answered-filter">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All questions</SelectItem>
                        <SelectItem value="answered">Answered</SelectItem>
                        <SelectItem value="unanswered">Unanswered</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFilterOptions({ date: "all", subject: "all", answered: "all" })}
                    className="mr-2"
                  >
                    Reset
                  </Button>
                  <Button size="sm" onClick={() => setShowFilters(false)}>
                    Apply Filters
                  </Button>
                </div>
              </Card>
            )}

            {showAskQuestionForm && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Ask a New Question</CardTitle>
                  <CardDescription>Provide details about your question to get better answers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="question-title">Question Title</Label>
                    <Input
                      id="question-title"
                      placeholder="e.g., How to calculate the bending moment in a beam?"
                      value={newQuestion.title}
                      onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="question-content">Question Details</Label>
                    <Textarea
                      id="question-content"
                      placeholder="Provide all the details needed to answer your question..."
                      className="min-h-[150px]"
                      value={newQuestion.content}
                      onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="question-tags">Tags</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="question-tags"
                        placeholder="Add relevant tags..."
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddTag()
                          }
                        }}
                      />
                      <Button type="button" onClick={handleAddTag}>
                        Add
                      </Button>
                    </div>

                    {newQuestion.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {newQuestion.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center"
                          >
                            {tag}
                            <button
                              className="ml-1 text-blue-800 hover:text-blue-900"
                              onClick={() => handleRemoveTag(tag)}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowAskQuestionForm(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmitQuestion}>Post Question</Button>
                </CardFooter>
              </Card>
            )}

            <div className="space-y-4">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((question) => (
                  <QuestionCard key={question.id} question={question} communityId={id} />
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-500">No questions found matching your search.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="members">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Community Members</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                      <AvatarFallback>
                        {String.fromCharCode(65 + (i % 26))}
                        {String.fromCharCode(65 + ((i + 1) % 26))}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">User {i + 1}</p>
                      <p className="text-sm text-gray-500">Member</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Community Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ResourceCard
                  title="Recommended Books"
                  description="A curated list of essential books for this field."
                />
                <ResourceCard title="Online Courses" description="Free and paid courses to enhance your knowledge." />
                <ResourceCard title="Useful Websites" description="Websites with valuable information and tools." />
                <ResourceCard title="Research Papers" description="Important research papers in this field." />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {isLoggedIn && userAnswers.filter((a) => a.communityId === id).length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Your Answers in This Community</h3>
          <div className="space-y-4">
            {userAnswers
              .filter((a) => a.communityId === id)
              .map((answer, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <h4 className="font-medium">{answer.questionTitle}</h4>
                    <p className="text-sm text-gray-600 mt-1">{answer.content.substring(0, 100)}...</p>
                    <div className="mt-2">
                      <Link
                        href={`/communities/${id}/question/${answer.questionId}`}
                        className="text-blue-600 text-sm hover:underline"
                      >
                        View Question
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

function QuestionCard({ question, communityId }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <Link href={`/communities/${communityId}/question/${question.id}`}>
          <h3 className="text-xl font-medium hover:text-blue-600 transition-colors">{question.title}</h3>
        </Link>

        <div className="flex items-center mt-4 text-sm text-gray-500">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarFallback>{question.author.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{question.author}</span>
          <span className="mx-2">•</span>
          <span>{question.date}</span>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {question.tags.map((tag, index) => (
            <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center mt-4 space-x-4">
          <div className="flex items-center">
            <ThumbsUp className="h-4 w-4 mr-1 text-gray-500" />
            <span className="text-sm text-gray-500">{question.likes} likes</span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-1 text-gray-500" />
            <span className="text-sm text-gray-500">{question.answers} answers</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ResourceCard({ title, description }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <h4 className="text-lg font-medium">{title}</h4>
        <p className="text-gray-600 mt-2">{description}</p>
        <Button variant="link" className="p-0 mt-2">
          View Resources
        </Button>
      </CardContent>
    </Card>
  )
}

