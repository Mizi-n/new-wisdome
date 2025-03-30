"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Folder, File, MoreVertical, Plus, Upload, Download, Trash2, Edit, Search } from "lucide-react"

// Mock data for folders and files
const initialItems = [
  {
    id: 1,
    name: "Civil Engineering",
    type: "folder",
    items: [
      { id: 11, name: "Structural Analysis", type: "folder", items: [] },
      { id: 12, name: "Fluid Mechanics", type: "folder", items: [] },
      { id: 13, name: "Concrete Design Notes.pdf", type: "file" },
    ],
  },
  {
    id: 2,
    name: "Computer Science",
    type: "folder",
    items: [
      { id: 21, name: "Algorithms", type: "folder", items: [] },
      { id: 22, name: "Data Structures.pdf", type: "file" },
      { id: 23, name: "Programming Basics.docx", type: "file" },
    ],
  },
  {
    id: 3,
    name: "Electrical Engineering",
    type: "folder",
    items: [
      { id: 31, name: "Circuit Theory.pdf", type: "file" },
      { id: 32, name: "Power Systems.pptx", type: "file" },
    ],
  },
  { id: 4, name: "Semester Project.docx", type: "file" },
  { id: 5, name: "Study Schedule.xlsx", type: "file" },
]

export default function NotesPage() {
  const [items, setItems] = useState(initialItems)
  const [currentPath, setCurrentPath] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [newItemName, setNewItemName] = useState("")
  const [newItemType, setNewItemType] = useState("folder")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // Get current folder items based on path
  const getCurrentItems = () => {
    let currentItems = items

    for (const pathId of currentPath) {
      const folder = currentItems.find((item) => item.id === pathId)
      if (folder && folder.items) {
        currentItems = folder.items
      } else {
        return []
      }
    }

    // Filter by search query if present
    if (searchQuery) {
      return currentItems.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    return currentItems
  }

  // Navigate to a folder
  const navigateToFolder = (folderId) => {
    setCurrentPath([...currentPath, folderId])
  }

  // Navigate up one level
  const navigateUp = () => {
    if (currentPath.length > 0) {
      setCurrentPath(currentPath.slice(0, -1))
    }
  }

  // Create a new item (folder or file)
  const createNewItem = () => {
    if (!newItemName) return

    const newItem = {
      id: Date.now(),
      name: newItemName + (newItemType === "file" ? ".txt" : ""),
      type: newItemType,
      items: newItemType === "folder" ? [] : undefined,
    }

    if (currentPath.length === 0) {
      // Add to root
      setItems([...items, newItem])
    } else {
      // Add to current folder
      const updateNestedItems = (items, path, depth = 0) => {
        return items.map((item) => {
          if (item.id === path[depth]) {
            if (depth === path.length - 1) {
              // We're at the target folder
              return {
                ...item,
                items: [...item.items, newItem],
              }
            } else {
              // We need to go deeper
              return {
                ...item,
                items: updateNestedItems(item.items, path, depth + 1),
              }
            }
          }
          return item
        })
      }

      setItems(updateNestedItems(items, currentPath))
    }

    setNewItemName("")
    setIsCreateDialogOpen(false)
  }

  // Delete an item
  const deleteItem = (itemId) => {
    if (currentPath.length === 0) {
      // Delete from root
      setItems(items.filter((item) => item.id !== itemId))
    } else {
      // Delete from current folder
      const updateNestedItems = (items, path, depth = 0) => {
        return items.map((item) => {
          if (item.id === path[depth]) {
            if (depth === path.length - 1) {
              // We're at the target folder
              return {
                ...item,
                items: item.items.filter((subItem) => subItem.id !== itemId),
              }
            } else {
              // We need to go deeper
              return {
                ...item,
                items: updateNestedItems(item.items, path, depth + 1),
              }
            }
          }
          return item
        })
      }

      setItems(updateNestedItems(items, currentPath))
    }
  }

  // Handle file upload
  const handleFileUpload = () => {
    // Create a file input element
    const fileInput = document.createElement("input")
    fileInput.type = "file"

    // Add event listener for when a file is selected
    fileInput.addEventListener("change", (e) => {
      const files = e.target.files
      if (!files || files.length === 0) return

      const file = files[0]
      const newItem = {
        id: Date.now(),
        name: file.name,
        type: "file",
        size: formatFileSize(file.size),
        lastModified: new Date().toISOString(),
      }

      if (currentPath.length === 0) {
        // Add to root
        setItems([...items, newItem])
      } else {
        // Add to current folder
        const updateNestedItems = (items, path, depth = 0) => {
          return items.map((item) => {
            if (item.id === path[depth]) {
              if (depth === path.length - 1) {
                // We're at the target folder
                return {
                  ...item,
                  items: [...item.items, newItem],
                }
              } else {
                // We need to go deeper
                return {
                  ...item,
                  items: updateNestedItems(item.items, path, depth + 1),
                }
              }
            }
            return item
          })
        }

        setItems(updateNestedItems(items, currentPath))
      }
    })

    // Trigger the file input click
    fileInput.click()
  }

  // Add this helper function to format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  // Get breadcrumb path
  const getBreadcrumb = () => {
    const path = [{ id: null, name: "My Notes" }]

    let currentItems = items
    for (const pathId of currentPath) {
      const folder = currentItems.find((item) => item.id === pathId)
      if (folder) {
        path.push({ id: folder.id, name: folder.name })
        currentItems = folder.items || []
      }
    }

    return path
  }

  // Add file opening functionality
  // Add this function to handle file opening
  const openFile = (item) => {
    if (item.type === "file") {
      // Create a modal or dialog to show file content
      alert(
        `Opening file: ${item.name}\n\nIn a real application, this would open the file content in a viewer or editor.`,
      )
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">My Notes</h1>

        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex space-x-4">
                  <Button
                    variant={newItemType === "folder" ? "default" : "outline"}
                    onClick={() => setNewItemType("folder")}
                    className="flex-1"
                  >
                    <Folder className="h-4 w-4 mr-2" />
                    Folder
                  </Button>
                  <Button
                    variant={newItemType === "file" ? "default" : "outline"}
                    onClick={() => setNewItemType("file")}
                    className="flex-1"
                  >
                    <File className="h-4 w-4 mr-2" />
                    File
                  </Button>
                </div>
                <Input
                  placeholder={`Enter ${newItemType} name`}
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button onClick={createNewItem}>Create</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" onClick={handleFileUpload}>
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
      </div>

      {/* Breadcrumb navigation */}
      <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-2">
        {getBreadcrumb().map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && <span className="mx-2 text-gray-400">/</span>}
            <Button
              variant="ghost"
              className="h-auto p-1"
              onClick={() => {
                if (index === 0) {
                  setCurrentPath([])
                } else {
                  setCurrentPath(currentPath.slice(0, index - 1))
                }
              }}
            >
              {item.name}
            </Button>
          </div>
        ))}
      </div>

      {/* Files and folders grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentPath.length > 0 && (
          <Card className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={navigateUp}>
            <CardContent className="p-4 flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-3">
                <Folder className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-grow">
                <p className="font-medium">...</p>
                <p className="text-sm text-gray-500">Go up</p>
              </div>
            </CardContent>
          </Card>
        )}

        {getCurrentItems().map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center">
              <div
                className={`p-3 rounded-full mr-3 ${item.type === "folder" ? "bg-blue-100" : "bg-green-100"}`}
                onClick={() => {
                  if (item.type === "folder") {
                    navigateToFolder(item.id)
                  }
                }}
                style={{ cursor: item.type === "folder" ? "pointer" : "default" }}
              >
                {item.type === "folder" ? (
                  <Folder className="h-6 w-6 text-blue-600" />
                ) : (
                  <File className="h-6 w-6 text-green-600" />
                )}
              </div>
              <div
                className="flex-grow"
                onClick={() => {
                  if (item.type === "folder") {
                    navigateToFolder(item.id)
                  } else {
                    openFile(item)
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <p className="font-medium truncate">{item.name}</p>
                <p className="text-sm text-gray-500 capitalize">{item.type}</p>
                {item.size && <p className="text-xs text-gray-500">{item.size}</p>}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Rename
                  </DropdownMenuItem>
                  {item.type === "file" && (
                    <DropdownMenuItem>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => deleteItem(item.id)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

