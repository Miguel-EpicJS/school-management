"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StudentList } from "./StudentList"
import { AddStudentForm } from "./AddStudentForm"
import { Statistics } from "./Statistics"
import { CSVUpload } from "./CSVUpload"
import { Student } from "@/utils/mockData"
import { Toaster } from "@/components/ui/toaster"

export function Dashboard() {
  const [students, setStudents] = useState<Student[]>([])

  useEffect(() => {
    const storedStudents = localStorage.getItem('students')
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents))
    }
  }, [])

  const updateStudents = (newStudents: Student[]) => {
    setStudents(newStudents)
    localStorage.setItem('students', JSON.stringify(newStudents))
  }

  const handleAddStudent = (newStudent: Omit<Student, 'id'>) => {
    const studentWithId = { ...newStudent, id: Date.now().toString() }
    const updatedStudents = [...students, studentWithId]
    updateStudents(updatedStudents)
  }

  const handleRemoveStudent = (id: string) => {
    const updatedStudents = students.filter(student => student.id !== id)
    updateStudents(updatedStudents)
  }

  const handleCSVUpload = (newStudents: Omit<Student, 'id'>[]) => {
    const studentsWithIds = newStudents.map(student => ({
      ...student,
      id: `csv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }))
    const updatedStudents = [...students, ...studentsWithIds]
    updateStudents(updatedStudents)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Student Management Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Student List</CardTitle>
          </CardHeader>
          <CardContent>
            <StudentList students={students} onRemoveStudent={handleRemoveStudent} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Add New Student</CardTitle>
          </CardHeader>
          <CardContent>
            <AddStudentForm onAddStudent={handleAddStudent} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upload CSV</CardTitle>
          </CardHeader>
          <CardContent>
            <CSVUpload onUpload={handleCSVUpload} />
          </CardContent>
        </Card>
        <Card className="col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <Statistics students={students} />
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </div>
  )
}

