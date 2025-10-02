'use client'

export default function Error({ error }: { error: Error }) {
  return (
      <div className="text-lg text-center text-teal-700">
          This Post not exist
      </div>
  )
}
