export interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
}

export const mockStudents: Student[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', grade: 'A' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', grade: 'B' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', grade: 'C' },
  { id: '4', name: 'Diana Ross', email: 'diana@example.com', grade: 'A' },
  { id: '5', name: 'Ethan Hunt', email: 'ethan@example.com', grade: 'B' },
];

