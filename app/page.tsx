'use client'

import { useQuery, useMutation } from 'convex/react'
import { api } from '../convex/_generated/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Trash2 } from 'lucide-react'

export default function Home() {
  const tasks = useQuery(api.tasks.get)
  const addTask = useMutation(api.tasks.add)
  const updateStatus = useMutation(api.tasks.updateStatus)
  const deleteTask = useMutation(api.tasks.deleteTask)

  const [text, setText] = useState('')

  async function handleAdd() {
    await addTask({ text, isCompleted: false })
    setText('')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Card className="max-w-xl w-full">
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* input */}
          <div className="flex items-center gap-2">
            <Input
              className="flex-1"
              name="text"
              type="text"
              placeholder="Add a task"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' && handleAdd()}
            />
            <Button onClick={handleAdd}>Add</Button>
          </div>
          <p>There are {tasks?.length} tasks</p>
          <ul className="divide-y divide-slate-100">
            {tasks?.map(({ _id, text, isCompleted }) => (
              <li className="py-2 flex group justify-between" key={_id}>
                <span>{text}</span>
                <div className="flex gap-2 items-center">
                  <span
                    className="cursor-pointer"
                    onClick={() =>
                      updateStatus({ id: _id, isCompleted: !isCompleted })
                    }
                  >
                    {isCompleted ? '✅' : '❌'}
                  </span>
                  <Trash2
                    size={18}
                    onClick={() => deleteTask({ id: _id })}
                    className="cursor-pointer group-hover:visible invisible"
                  />
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  )
}
