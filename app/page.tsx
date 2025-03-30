import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Users, FileText } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to Wisdomee</h1>
            <p className="text-xl mb-8">The ultimate knowledge-sharing platform for engineering students</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                <Link href="/auth/sign-in">Sign In</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/auth/sign-up">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Wisdomee?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BookOpen className="h-10 w-10 text-blue-600" />}
              title="Specialized Communities"
              description="Join communities specific to your engineering branch - Civil, Mechanical, Electrical, CS, AI, Robotics, and more."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-blue-600" />}
              title="Peer Learning"
              description="Ask questions, share knowledge, and learn from peers across different engineering disciplines."
            />
            <FeatureCard
              icon={<FileText className="h-10 w-10 text-blue-600" />}
              title="Notes Organization"
              description="Organize your study materials with our Google Drive-like notes management system."
            />
          </div>
        </div>
      </section>

      {/* Communities Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Engineering Communities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              "Civil Engineering",
              "Mechanical Engineering",
              "Electrical Engineering",
              "Computer Science",
              "Artificial Intelligence",
              "Robotics",
              "Cyber Security",
              "Electronics & Communication",
              "Information Technology",
              "AI & Data Science",
            ].map((community) => (
              <div
                key={community}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <h3 className="font-medium text-gray-900">{community}</h3>
                <Link
                  href="/communities"
                  className="text-blue-600 text-sm flex items-center justify-center mt-2 hover:underline"
                >
                  Join <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to enhance your engineering journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of engineering students who are already benefiting from our platform.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
            <Link href="/auth/sign-up">Get Started Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Wisdomee</h3>
              <p className="text-gray-400">The ultimate knowledge-sharing platform for engineering students.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/communities" className="text-gray-400 hover:text-white">
                    Communities
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Communities</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/communities/cs" className="text-gray-400 hover:text-white">
                    Computer Science
                  </Link>
                </li>
                <li>
                  <Link href="/communities/mechanical" className="text-gray-400 hover:text-white">
                    Mechanical
                  </Link>
                </li>
                <li>
                  <Link href="/communities/electrical" className="text-gray-400 hover:text-white">
                    Electrical
                  </Link>
                </li>
                <li>
                  <Link href="/communities/civil" className="text-gray-400 hover:text-white">
                    Civil
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Wisdomee. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

