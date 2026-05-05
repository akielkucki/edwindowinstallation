"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { fadeUp, inView, staggerContainer } from "../lib/animations";
import { projects, type Project } from "../lib/content";

/*
 * Projects
 *
 * Data-driven gallery — to add a project, push to the `projects` array
 * in app/lib/content.ts. The grid stays balanced at 1 / 2 / 3 columns
 * regardless of count.
 */

export function Projects() {
  return (
    <section id="projects" className="bg-stone-100 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end"
        >
          <div className="max-w-2xl">
            <motion.span
              variants={fadeUp}
              className="text-xs font-medium tracking-[0.22em] text-accent-600 uppercase"
            >
              Recent Projects
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-display text-4xl leading-tight font-semibold tracking-tight text-slate-900 sm:text-5xl"
            >
              The work, in plain sight.
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="max-w-md font-serif text-base leading-relaxed text-stone-700"
          >
            A small, honest sample. Every home shown here was lived in
            during the install — we&apos;d rather work around your life than
            move you out of it.
          </motion.p>
        </motion.div>

        <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }} // Triggers when just 5% is visible
            className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-stone-200 pt-10 sm:flex-row sm:items-center"
        >
          <p className="font-serif text-base text-stone-700">
            Want to see something specific — historic restoration,
            whole-house, custom shapes? Ask, and we&apos;ll send you the
            relevant photos and references.
          </p>
          <a
            href="#quote"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-accent-600"
          >
            Start a conversation
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      variants={fadeUp}
      className="group relative flex flex-col overflow-hidden rounded-sm border border-stone-200 bg-white shadow-sm transition-opacity duration-500 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.location}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/40 to-transparent" />
        <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-stone-50/95 px-3 py-1 text-xs font-medium tracking-tight text-slate-900 shadow-sm backdrop-blur">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg font-semibold tracking-tight text-slate-900">
            {project.title}
          </h3>
          <span className="font-display text-sm text-stone-400">
            {project.year}
          </span>
        </div>
        <p className="mt-1 text-sm text-stone-500">{project.location}</p>
        <p className="mt-4 font-serif text-sm leading-relaxed text-stone-700">
          {project.description}
        </p>
        <p className="mt-5 border-t border-stone-200 pt-4 text-xs font-medium tracking-tight text-stone-500">
          {project.scope}
        </p>
      </div>
    </motion.article>
  );
}
