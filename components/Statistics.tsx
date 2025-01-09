import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Student } from "@/utils/mockData"

interface StatisticsProps {
  students: Student[]
}

export function Statistics({ students }: StatisticsProps) {
  const gradeDistribution = students.reduce((acc, student) => {
    acc[student.grade] = (acc[student.grade] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const data = Object.entries(gradeDistribution).map(([grade, count]) => ({
    grade,
    count,
  }))

  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="grade" />
          <YAxis />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

