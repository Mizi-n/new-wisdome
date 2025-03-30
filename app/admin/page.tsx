"use client"

import { Switch } from "@/components/ui/switch"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Trash2, UserX, AlertTriangle, BarChart3, Users, MessageSquare } from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Mock data for users
const usersData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    department: "Computer Science",
    joinDate: "2023-01-15",
    status: "active",
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    department: "Civil Engineering",
    joinDate: "2023-02-20",
    status: "active",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.b@example.com",
    department: "Mechanical Engineering",
    joinDate: "2023-03-10",
    status: "inactive",
  },
  {
    id: 4,
    name: "Emily Zhang",
    email: "emily.z@example.com",
    department: "Electrical Engineering",
    joinDate: "2023-04-05",
    status: "active",
  },
  {
    id: 5,
    name: "David Chen",
    email: "david.c@example.com",
    department: "Computer Science",
    joinDate: "2023-05-12",
    status: "active",
  },
]

// Mock data for posts/questions
const postsData = [
  {
    id: 1,
    title: "How to calculate the bending moment in a simply supported beam?",
    author: "Alex Johnson",
    community: "Civil Engineering",
    date: "2023-06-10",
    status: "approved",
  },
  {
    id: 2,
    title: "What's the time complexity of quicksort in the worst case?",
    author: "David Chen",
    community: "Computer Science",
    date: "2023-06-15",
    status: "approved",
  },
  {
    id: 3,
    title: "How to implement a balanced binary search tree?",
    author: "Emily Zhang",
    community: "Computer Science",
    date: "2023-06-20",
    status: "flagged",
  },
  {
    id: 4,
    title: "What are the different types of foundations used in construction?",
    author: "Sarah Williams",
    community: "Civil Engineering",
    date: "2023-06-25",
    status: "approved",
  },
  {
    id: 5,
    title: "How to analyze fluid flow in a pipe system?",
    author: "Thomas Anderson",
    community: "Mechanical Engineering",
    date: "2023-07-01",
    status: "pending",
  },
]

export default function AdminPage() {
  const [users, setUsers] = useState(usersData)
  const [posts, setPosts] = useState(postsData)
  const [userSearchQuery, setUserSearchQuery] = useState("")
  const [postSearchQuery, setPostSearchQuery] = useState("")
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [isDeleteUserDialogOpen, setIsDeleteUserDialogOpen] = useState(false)
  const [isDeletePostDialogOpen, setIsDeletePostDialogOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(userSearchQuery.toLowerCase()),
  )

  // Filter posts based on search query
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(postSearchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(postSearchQuery.toLowerCase()) ||
      post.community.toLowerCase().includes(postSearchQuery.toLowerCase()),
  )

  // Handle user deletion
  const handleDeleteUser = () => {
    if (!selectedUser) return

    setUsers(users.filter((user) => user.id !== selectedUser.id))
    setIsDeleteUserDialogOpen(false)

    toast({
      title: "User deleted",
      description: `${selectedUser.name}'s account has been deleted.`,
    })
  }

  // Handle post deletion
  const handleDeletePost = () => {
    if (!selectedPost) return

    setPosts(posts.filter((post) => post.id !== selectedPost.id))
    setIsDeletePostDialogOpen(false)

    toast({
      title: "Post deleted",
      description: "The post has been deleted successfully.",
    })
  }

  // Handle password reset
  const handleResetPassword = () => {
    if (!selectedUser) return

    setIsResetPasswordDialogOpen(false)

    toast({
      title: "Password reset",
      description: `A password reset link has been sent to ${selectedUser.email}.`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage users, posts, and platform settings</p>
        </div>
        <Badge className="bg-red-600">Admin Access</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<Users className="h-8 w-8 text-blue-600" />} title="Total Users" value="1,245" />
        <StatCard icon={<MessageSquare className="h-8 w-8 text-green-600" />} title="Total Posts" value="3,872" />
        <StatCard icon={<AlertTriangle className="h-8 w-8 text-yellow-600" />} title="Flagged Content" value="24" />
        <StatCard icon={<BarChart3 className="h-8 w-8 text-purple-600" />} title="Active Communities" value="10" />
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage user accounts</CardDescription>
              <div className="mt-4 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === "active" ? "default" : "secondary"}>
                            {user.status === "active" ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedUser(user)
                                setIsResetPasswordDialogOpen(true)
                              }}
                            >
                              Reset Password
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                setSelectedUser(user)
                                setIsDeleteUserDialogOpen(true)
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        No users found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="posts">
          <Card>
            <CardHeader>
              <CardTitle>Post Management</CardTitle>
              <CardDescription>View and manage posts and questions</CardDescription>
              <div className="mt-4 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search posts..."
                  value={postSearchQuery}
                  onChange={(e) => setPostSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Community</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell>
                          <p className="font-medium truncate max-w-[250px]">{post.title}</p>
                        </TableCell>
                        <TableCell>{post.author}</TableCell>
                        <TableCell>{post.community}</TableCell>
                        <TableCell>{new Date(post.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              post.status === "approved"
                                ? "default"
                                : post.status === "flagged"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                setSelectedPost(post)
                                setIsDeletePostDialogOpen(true)
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        No posts found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
              <CardDescription>Configure platform-wide settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Security Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SettingCard
                    title="Two-Factor Authentication"
                    description="Require 2FA for admin accounts"
                    defaultEnabled={true}
                  />
                  <SettingCard
                    title="Password Policy"
                    description="Enforce strong password requirements"
                    defaultEnabled={true}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Content Moderation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SettingCard
                    title="Auto-Flagging"
                    description="Automatically flag potentially inappropriate content"
                    defaultEnabled={true}
                  />
                  <SettingCard
                    title="Content Approval"
                    description="Require approval for new posts"
                    defaultEnabled={false}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">User Management</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SettingCard
                    title="Email Verification"
                    description="Require email verification for new accounts"
                    defaultEnabled={true}
                  />
                  <SettingCard
                    title="Account Lockout"
                    description="Lock accounts after failed login attempts"
                    defaultEnabled={true}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Reset Password Dialog */}
      <Dialog open={isResetPasswordDialogOpen} onOpenChange={setIsResetPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset User Password</DialogTitle>
            <DialogDescription>This will send a password reset link to the user's email address.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedUser && (
              <div className="flex items-center space-x-3 mb-4">
                <Avatar>
                  <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                  <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedUser.name}</p>
                  <p className="text-sm text-gray-500">{selectedUser.email}</p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResetPasswordDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleResetPassword}>Send Reset Link</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={isDeleteUserDialogOpen} onOpenChange={setIsDeleteUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User Account</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The user account and all associated data will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedUser && (
              <div className="flex items-center space-x-3 mb-4">
                <Avatar>
                  <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                  <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedUser.name}</p>
                  <p className="text-sm text-gray-500">{selectedUser.email}</p>
                </div>
              </div>
            )}
            <div className="bg-red-50 p-4 rounded-md flex items-start space-x-3">
              <UserX className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <p className="font-medium text-red-600">Warning</p>
                <p className="text-sm text-red-600">
                  This will delete the user account and all associated data, including posts, comments, and notes.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteUserDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Post Dialog */}
      <Dialog open={isDeletePostDialogOpen} onOpenChange={setIsDeletePostDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The post and all associated comments will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedPost && (
              <div className="mb-4">
                <p className="font-medium">{selectedPost.title}</p>
                <p className="text-sm text-gray-500">
                  Posted by {selectedPost.author} in {selectedPost.community}
                </p>
              </div>
            )}
            <div className="bg-red-50 p-4 rounded-md flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <p className="font-medium text-red-600">Warning</p>
                <p className="text-sm text-red-600">
                  This will delete the post and all associated comments permanently.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeletePostDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeletePost}>
              Delete Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function StatCard({ icon, title, value }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-full">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function SettingCard({ title, description, defaultEnabled }) {
  const [enabled, setEnabled] = useState(defaultEnabled)

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-medium">{title}</h4>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
          <div className="ml-4">
            <Switch checked={enabled} onCheckedChange={setEnabled} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

