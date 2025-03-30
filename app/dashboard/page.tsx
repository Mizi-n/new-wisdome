import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Settings, FolderOpen, Bot } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-blue-600" />
              Communities
            </CardTitle>
            <CardDescription>Ask questions and share knowledge</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Join engineering communities to ask questions, share insights, and collaborate with peers.
            </p>
            <Button asChild>
              <Link href="/communities">Browse Communities</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <FolderOpen className="mr-2 h-5 w-5 text-blue-600" />
              My Notes
            </CardTitle>
            <CardDescription>Organize your study materials</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Access your organized notes and study materials in our Google Drive-like interface.
            </p>
            <Button asChild>
              <Link href="/dashboard/notes">Go to Notes</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Bot className="mr-2 h-5 w-5 text-blue-600" />
              Ask Mr. Wisdomee
            </CardTitle>
            <CardDescription>AI-powered engineering assistant</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Get instant answers to your engineering questions from our AI assistant.
            </p>
            <Button asChild>
              <Link href="/dashboard/ask-mr-wisdomee">Chat with AI</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Settings className="mr-2 h-5 w-5 text-blue-600" />
              Settings
            </CardTitle>
            <CardDescription>Manage your account</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Update your profile, change password, and manage account settings.
            </p>
            <Button asChild>
              <Link href="/dashboard/settings">Go to Settings</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Your question in Computer Science was answered</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      John Doe answered your question about algorithms. Check it out!
                    </p>
                    <div className="mt-2">
                      <Link href="/communities/cs/question/123" className="text-blue-600 text-sm hover:underline">
                        View Answer
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

