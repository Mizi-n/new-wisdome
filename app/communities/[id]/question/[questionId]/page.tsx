"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, Share2, Flag, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock question data
const questionData = {
  1: {
    title: "How to calculate the bending moment in a simply supported beam?",
    content:
      "I'm working on a structural analysis problem and need to calculate the bending moment in a simply supported beam with a uniformly distributed load. Can someone explain the formula and process? I'm particularly confused about how to handle the boundary conditions.",
    author: "Alex Johnson",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    date: "2 days ago",
    likes: 15,
    tags: ["Structural Analysis", "Mechanics"],
    answers: [
      {
        id: 1,
        content:
          "For a simply supported beam with a uniformly distributed load (w), the bending moment at any point x from the left support is given by: M(x) = (wx/2)(L-x), where L is the length of the beam. The maximum bending moment occurs at the center of the beam (x=L/2) and is equal to wL²/8.",
        author: "Emily Chen",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        date: "2 days ago",
        likes: 8,
        isAccepted: true,
      },
      {
        id: 2,
        content:
          "To add to the previous answer, you can also use the method of sections to calculate the bending moment. Cut the beam at the point of interest and use equilibrium equations to find the internal forces. For boundary conditions, remember that the bending moment is zero at the supports for a simply supported beam.",
        author: "Michael Brown",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        date: "1 day ago",
        likes: 5,
        isAccepted: false,
      },
    ],
  },
  2: {
    title: "What's the time complexity of quicksort in the worst case?",
    content:
      "I'm studying sorting algorithms and I'm confused about the time complexity of quicksort. I know it's generally O(n log n), but what about the worst case? And what conditions lead to the worst case scenario?",
    author: "David Chen",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    date: "1 day ago",
    likes: 32,
    tags: ["Algorithms", "Sorting", "Time Complexity"],
    answers: [
      {
        id: 1,
        content:
          "The worst-case time complexity of quicksort is O(n²). This occurs when the pivot selection consistently results in highly unbalanced partitions. For example, if the array is already sorted and you always choose the first or last element as the pivot, each partition will have one subarray of size n-1 and another of size 0, leading to n recursive calls with decreasing array sizes: n + (n-1) + (n-2) + ... + 1 = n(n+1)/2, which is O(n²).",
        author: "Sarah Williams",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        date: "1 day ago",
        likes: 15,
        isAccepted: true,
      },
      {
        id: 2,
        content:
          "To avoid the worst-case scenario, you can use various pivot selection strategies like choosing a random element, using the median of three elements (first, middle, last), or implementing the 'median of medians' algorithm. These approaches make the worst-case scenario much less likely to occur in practice.",
        author: "James Wilson",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        date: "12 hours ago",
        likes: 10,
        isAccepted: false,
      },
    ],
  },
}

// Default question data for any question not in our mock data
const defaultQuestion = {
  title: "Engineering Question",
  content: "This is a placeholder for a question that doesn't exist in our mock data.",
  author: "Anonymous User",
  authorAvatar: "/placeholder.svg?height=40&width=40",
  date: "1 week ago",
  likes: 5,
  tags: ["Engineering", "Question"],
  answers: [],
}

export default function QuestionPage({ params }) {
  const { questionId, id: communityId } = params
  const question = questionData[questionId] || defaultQuestion

  const [newAnswer, setNewAnswer] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("wisdomeeLoggedIn")
    if (loggedInStatus === "true") {
      setIsLoggedIn(true)
    }
  }, [])

  const handleSubmitAnswer = () => {
    if (!newAnswer.trim()) return

    if (!isLoggedIn) {
      router.push("/auth/sign-in")
      return
    }

    setIsSubmitting(true)

    // Create the answer object
    const answer = {
      questionId,
      communityId,
      questionTitle: question.title,
      content: newAnswer,
      date: new Date().toISOString(),
    }

    // Get existing answers from localStorage
    const existingAnswers = localStorage.getItem("wisdomeeUserAnswers")
    const answers = existingAnswers ? JSON.parse(existingAnswers) : []

    // Add the new answer
    answers.push(answer)

    // Save back to localStorage
    localStorage.setItem("wisdomeeUserAnswers", JSON.stringify(answers))

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setNewAnswer("")
      alert("Your answer has been submitted!")
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href={`/communities/${communityId}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Community
          </Link>
        </Button>

        <h1 className="text-2xl md:text-3xl font-bold">{question.title}</h1>

        <div className="flex flex-wrap gap-2 mt-4">
          {question.tags.map((tag, index) => (
            <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <Avatar>
              <AvatarImage src={question.authorAvatar} alt={question.author} />
              <AvatarFallback>{question.author.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-medium">{question.author}</span>
                <span className="mx-2 text-gray-500">•</span>
                <span className="text-gray-500">{question.date}</span>
              </div>

              <div className="mt-4 text-gray-800">
                <p>{question.content}</p>
              </div>

              <div className="flex items-center mt-6 space-x-4">
                <Button variant="outline" size="sm" className="flex items-center">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Like ({question.likes})
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Flag className="h-4 w-4 mr-2" />
                  Report
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">{question.answers.length} Answers</h2>

        {question.answers.length > 0 ? (
          <div className="space-y-6">
            {question.answers.map((answer) => (
              <Card key={answer.id} className={answer.isAccepted ? "border-green-500" : ""}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src={answer.authorAvatar} alt={answer.author} />
                      <AvatarFallback>{answer.author.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="font-medium">{answer.author}</span>
                        <span className="mx-2 text-gray-500">•</span>
                        <span className="text-gray-500">{answer.date}</span>
                        {answer.isAccepted && (
                          <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Accepted Answer
                          </span>
                        )}
                      </div>

                      <div className="mt-4 text-gray-800">
                        <p>{answer.content}</p>
                      </div>

                      <div className="flex items-center mt-6 space-x-4">
                        <Button variant="outline" size="sm" className="flex items-center">
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          Like ({answer.likes})
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center">
                          <Flag className="h-4 w-4 mr-2" />
                          Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">No answers yet. Be the first to answer this question!</p>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Your Answer</h2>
        </CardHeader>
        <CardContent>
          {isLoggedIn ? (
            <Textarea
              placeholder="Write your answer here..."
              className="min-h-[150px]"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
            />
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-600 mb-4">Please sign in to answer this question</p>
              <Button asChild>
                <Link href="/auth/sign-in">Sign In</Link>
              </Button>
            </div>
          )}
        </CardContent>
        {isLoggedIn && (
          <CardFooter className="flex justify-end">
            <Button onClick={handleSubmitAnswer} disabled={isSubmitting || !newAnswer.trim()}>
              {isSubmitting ? "Submitting..." : "Post Answer"}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

