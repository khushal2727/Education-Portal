import { ContactForm } from "@/components/contact-form"

export default function ContactPage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Us</h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Have questions or feedback? We'd love to hear from you.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Get in Touch</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Fill out the form and we'll get back to you as soon as possible.
                </p>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Contact Information</h2>
                <div className="text-gray-500 dark:text-gray-400 space-y-2">
                  <p>Email: contact@educationportal.com</p>
                  <p>Phone: +1 (555) 123-4567</p>
                  <p>Address: 123 Education St, Learning City, 12345</p>
                </div>
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
