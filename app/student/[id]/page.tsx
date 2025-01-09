"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface StudentDetails {
  id: string
  name: string
  email: string
  grade: string
  parents: string
  address: string
  contactInformation: string
  certifications: string[]
}

export default function StudentPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [student, setStudent] = useState<StudentDetails | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const storedStudents = localStorage.getItem('students')
    if (storedStudents) {
      const students = JSON.parse(storedStudents)
      const foundStudent = students.find((s: StudentDetails) => s.id === params.id)
      if (foundStudent) {
        setStudent({
          ...foundStudent,
          parents: foundStudent.parents || '',
          address: foundStudent.address || '',
          contactInformation: foundStudent.contactInformation || '',
          certifications: foundStudent.certifications || [],
        })
      } else {
        // Student not found, redirect to dashboard
        router.push('/')
      }
    }
  }, [params.id, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (student) {
      setStudent({ ...student, [e.target.name]: e.target.value })
    }
  }

  const handleCertificationsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (student) {
      setStudent({ ...student, certifications: e.target.value.split(',').map(cert => cert.trim()) })
    }
  }

  const handleSave = () => {
    if (student) {
      const storedStudents = localStorage.getItem('students')
      if (storedStudents) {
        const students = JSON.parse(storedStudents)
        const updatedStudents = students.map((s: StudentDetails) => 
          s.id === student.id ? student : s
        )
        localStorage.setItem('students', JSON.stringify(updatedStudents))
      }
      setIsEditing(false)
    }
  }

  const handleBack = () => {
    router.push('/')
  }

  if (!student) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <Button variant="outline" onClick={handleBack} className="mb-4">
        Back to Dashboard
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={student.name}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={student.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="grade">Grade</Label>
              <Input
                id="grade"
                name="grade"
                value={student.grade}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="parents">Parents</Label>
              <Input
                id="parents"
                name="parents"
                value={student.parents}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={student.address}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="contactInformation">Contact Information</Label>
              <Input
                id="contactInformation"
                name="contactInformation"
                value={student.contactInformation}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="certifications">Certifications (comma-separated)</Label>
              <Input
                id="certifications"
                name="certifications"
                value={student.certifications.join(', ')}
                onChange={handleCertificationsChange}
                disabled={!isEditing}
              />
            </div>
            {isEditing ? (
              <Button onClick={handleSave}>Save</Button>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

