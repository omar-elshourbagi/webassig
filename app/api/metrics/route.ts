// This is the MODEL and CONTROLLER in MVC
// Model: Generates the server metrics data
// Controller: Handles the API endpoint and sends data to the view

export const dynamic = "force-dynamic"

// Simulate server metrics (in real app, you'd get actual system metrics)
function generateMetrics() {
  return {
    cpu: Math.random() * 100,
    memory: 50 + Math.random() * 40,
    network: Math.random() * 150,
    requests: 50 + Math.random() * 200,
    timestamp: Date.now(),
  }
}

export async function GET() {
  // Create a readable stream for Server-Sent Events
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      // Send metrics every 1 second
      const interval = setInterval(() => {
        const metrics = generateMetrics()
        const data = `data: ${JSON.stringify(metrics)}\n\n`
        controller.enqueue(encoder.encode(data))
      }, 1000)

      // Cleanup on close
      return () => {
        clearInterval(interval)
      }
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}
