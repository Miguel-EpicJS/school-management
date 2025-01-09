"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'
import { Student } from "@/utils/mockData"
import { useRouter } from "next/navigation"

interface StudentListProps {
  students: Student[]
  onRemoveStudent: (id: string) => void
}

export function StudentList({ students, onRemoveStudent }: StudentListProps) {
  const router = useRouter()

  const handleStudentClick = (id: string) => {
    router.push(`/student/${id}`)
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>
                <button
                  onClick={() => handleStudentClick(student.id)}
                  className="text-blue-600 hover:underline text-left"
                >
                  {student.name}
                </button>
              </TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.grade}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    onRemoveStudent(student.id)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

