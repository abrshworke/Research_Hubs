"use client";

export default function About() {
  return (
    <section className="bg-white text-gray-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-700">About Us</h1>

        <p className="text-lg leading-relaxed text-gray-600">
          Welcome to <span className="font-semibold text-blue-600">MyResearchHub</span>, where groundbreaking
          ideas and scientific exploration converge. Our mission is to empower researchers to share, showcase,
          and collaborate on innovative projects that push the boundaries of knowledge.
        </p>

        <p className="text-base text-gray-500">
          Built by a passionate community of scholars, engineers, and thinkers, our platform enables seamless
          publishing, categorization, and discovery of research across disciplines — from agriculture to
          technology and everything in between.
        </p>

        <p className="italic text-gray-400">"Research is the heartbeat of progress — we just give it a voice."</p>
      </div>
    </section>
  );
}
