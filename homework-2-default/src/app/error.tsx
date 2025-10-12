'use client'

export default function Error({ error }: { error: Error }) {
  return (
      <div className="text-lg text-center text-blue-700">
          Error - {error.message}
      </div>
  )
}
