"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Student } from "@/utils/mockData"
import { useToast } from "@/components/ui/use-toast"

interface CSVUploadProps {
  onUpload: (students: Omit<Student, 'id'>[]) => void
}

export function CSVUpload({ onUpload }: CSVUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        const lines = text.split('\n').filter(line => line.trim() !== '')
        try {
          const newStudents: Omit<Student, 'id'>[] = lines.map((line, index) => {
            const [name, email, grade] = line.split(',').map(item => item.trim())
            if (!name || !email || !grade) {
              throw new Error(`Invalid data on line ${index + 1}`)
            }
            return { name, email, grade }
          })
          onUpload(newStudents)
          toast({
            title: "CSV Uploaded",
            description: `Successfully added ${newStudents.length} students.`,
          })
        } catch (error) {
          toast({
            title: "Error",
            description: error instanceof Error ? error.message : "Failed to parse CSV",
            variant: "destructive",
          })
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="space-y-4">
      <Input type="file" accept=".csv" onChange={handleFileChange} />
      <Button onClick={handleUpload} disabled={!file}>
        Upload CSV
      </Button>
    </div>
  )
}

