export default function AboutPage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Our Platform</h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Learn more about our mission and how we're transforming educational management.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Our Mission</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  We aim to simplify educational administration and enhance the learning experience for students through
                  our comprehensive platform.
                </p>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Our Vision</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  To become the leading platform for educational institutions, providing seamless management tools and
                  resources.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">About This Demo</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  This demonstration showcases a fully functional education portal that operates entirely using your
                  browser's localStorage. It simulates a complete system with:
                </p>
                <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
                  <li>User authentication (Admin and Student roles)</li>
                  <li>Role-based access control</li>
                  <li>Course and notice management</li>
                  <li>Student inquiries</li>
                  <li>Activity tracking</li>
                </ul>
                <p className="text-gray-500 dark:text-gray-400 mt-4">
                  All data is stored locally in your browser and persists between sessions. No external database is
                  used.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
