"use client"

import { useState } from "react"
import {
  Menu,
  ArrowRight,
  Shield,
  Layout,
  Move,
  RefreshCw,
  Lock,
  Sparkles
} from "lucide-react"

export default function Page() {

  const [open, setOpen] = useState(false)

  const features = [
    { icon: Shield, title: "Authentication", desc: "Secure login and registration using JWT." },
    { icon: Layout, title: "Task Management", desc: "Create, edit, and delete tasks easily." },
    { icon: Move, title: "Drag & Drop Board", desc: "Move tasks across columns seamlessly." },
    { icon: RefreshCw, title: "Realtime Sync", desc: "Board updates instantly with latest tasks." },
    { icon: Lock, title: "Creator Permissions", desc: "Only creators can edit or delete tasks." },
    { icon: Sparkles, title: "Clean UI", desc: "Minimal modern interface built with Tailwind." }
  ]

  const columns = ["To Do", "In Progress", "Done"]

  const steps = [
    { title: "Sign Up", desc: "Create your secure account." },
    { title: "Create Tasks", desc: "Add tasks with description and status." },
    { title: "Move Tasks", desc: "Drag tasks between columns." }
  ]

  const stack = [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "Express",
    "MongoDB",
    "JWT Authentication"
  ]

  const highlights = [
    "Full stack architecture",
    "REST API with proper status codes",
    "Protected routes using JWT",
    "Password hashing with bcrypt",
    "Modular backend structure",
    "Clean component based frontend"
  ]

  return (
    <main className="bg-[#0b0b0f] text-white overflow-hidden">

      {/* NAVBAR */}

      <nav className="sticky top-0 z-50 backdrop-blur border-b border-white/10 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
            CollabBoard
          </h1>

          <div className="hidden md:flex gap-8 text-sm text-gray-300">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#how" className="hover:text-white">How it Works</a>
            <a href="#tech" className="hover:text-white">Tech</a>
            <a href="#">GitHub</a>
          </div>

          <div className="hidden md:flex gap-3">

            <button className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition">
              <a href="/login">Login</a>
            </button>

            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90">
              <a href="/register">Get Started</a>
            </button>

          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden">
            <Menu />
          </button>

        </div>
      </nav>


      {/* HERO */}

      <section className="py-32 relative">

        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 blur-3xl opacity-40" />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center relative">

          <div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Collaborate.
              <br />
              Track.
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
                Deliver Faster
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-400 max-w-lg">
              A modern collaboration board to organize tasks,
              boost productivity and manage your team workflow.
            </p>

            <div className="flex gap-4 mt-10">

              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition">
                Try Demo
                <ArrowRight size={16} />
              </button>

              <button className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition">
                View Source
              </button>

            </div>

          </div>


          {/* HERO BOARD */}

          <div className="grid grid-cols-3 gap-5">

            {columns.map((col) => (
              <div
                key={col}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4"
              >

                <h3 className="font-medium mb-4 text-gray-200">
                  {col}
                </h3>

                <div className="space-y-3">

                  <div className="bg-white/10 p-3 rounded-lg hover:bg-white/20 transition">
                    <p className="text-sm font-medium">
                      Design Landing Page
                    </p>
                    <p className="text-xs text-gray-400">
                      UI draft
                    </p>
                  </div>

                  <div className="bg-white/10 p-3 rounded-lg hover:bg-white/20 transition">
                    <p className="text-sm font-medium">
                      Setup API
                    </p>
                    <p className="text-xs text-gray-400">
                      Node backend
                    </p>
                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>



      {/* FEATURES */}

      <section id="features" className="py-28">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-20">
            Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {features.map((f, i) => {

              const Icon = f.icon

              return (
                <div
                  key={i}
                  className="group p-6 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-400 transition"
                >

                  <Icon className="mb-4 text-indigo-400 group-hover:scale-110 transition" />

                  <h3 className="font-semibold mb-2">
                    {f.title}
                  </h3>

                  <p className="text-sm text-gray-400">
                    {f.desc}
                  </p>

                </div>
              )

            })}

          </div>

        </div>

      </section>



      {/* HOW IT WORKS */}

      <section id="how" className="py-28 bg-white/5">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-20">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            {steps.map((step, i) => (

              <div key={i} className="text-center">

                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
                  {i + 1}
                </div>

                <h3 className="font-semibold">
                  {step.title}
                </h3>

                <p className="text-sm text-gray-400 mt-2">
                  {step.desc}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>



      {/* TECH STACK */}

      <section id="tech" className="py-28">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold mb-14">
            Tech Stack
          </h2>

          <div className="flex flex-wrap justify-center gap-4">

            {stack.map((tech) => (

              <span
                key={tech}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm hover:border-indigo-400 transition"
              >
                {tech}
              </span>

            ))}

          </div>

        </div>

      </section>



      {/* HIGHLIGHTS */}

      <section className="py-28 bg-white/5">

        <div className="max-w-5xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-16">
            Project Highlights
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {highlights.map((item) => (

              <div
                key={item}
                className="p-5 rounded-lg border border-white/10 bg-white/5 hover:border-indigo-400 transition"
              >
                {item}
              </div>

            ))}

          </div>

        </div>

      </section>



      {/* CTA */}

      <section className="py-28 text-center">

        <div className="max-w-3xl mx-auto px-6">

          <h2 className="text-4xl font-bold mb-6">
            Ready to try CollabBoard?
          </h2>

          <p className="text-gray-400 mb-10">
            Manage projects and collaborate with your team easily.
          </p>

          <div className="flex justify-center gap-4">

            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition">
              Live Demo
            </button>

            <button className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition">
              GitHub Repo
            </button>

          </div>

        </div>

      </section>



      {/* FOOTER */}

      <footer className="border-t border-white/10 py-12 text-center text-gray-500">

        <h3 className="text-white font-semibold text-lg">
          CollabBoard
        </h3>

        <p className="text-sm mt-2">
          Built with Next.js, Node.js and MongoDB.
        </p>

        <p className="text-xs mt-6">
          © {new Date().getFullYear()} CollabBoard
        </p>

      </footer>

    </main>
  )
}