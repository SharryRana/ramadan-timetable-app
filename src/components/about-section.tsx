"use client";

import { Info, Code, LayoutDashboard, Database, Server, Star, Mail, Phone, Github } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function AboutSection() {
    return (
        <section className="mt-20 mb-12">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-purple-500/20 rounded-xl">
                    <Info className="w-5 h-5 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold">About the Creator</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative">
                <div className="absolute top-0 right-0 p-32 bg-purple-500/5 rounded-full blur-[100px] -z-10" />

                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="md:col-span-4 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col items-center text-center shadow-lg relative overflow-hidden"
                >
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500" />

                    <div className="w-24 h-24 rounded-full mb-4 flex items-center justify-center p-1 shadow-[0_0_30px_rgba(168,85,247,0.3)] bg-gradient-to-br from-purple-500 to-indigo-600 relative overflow-hidden group">
                        <Image
                            src="/profile.webp"
                            alt="Shaharyar Rana"
                            fill
                            className="object-cover rounded-full border-[3px] border-transparent group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1">Shaharyar Rana</h3>
                    <p className="text-purple-400 font-medium text-sm mb-6">Full Stack Software Engineer</p>

                    <div className="flex gap-4 mb-8 w-full">
                        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl py-3 px-2">
                            <div className="text-xl font-bold text-white mb-1">5+</div>
                            <div className="text-xs text-[#ffffff]">Years Exp.</div>
                        </div>
                        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl py-3 px-2">
                            <div className="text-xl font-bold text-white mb-1">250+</div>
                            <div className="text-xs text-[#ffffff]">Projects</div>
                        </div>
                    </div>

                    <div className="space-y-3 w-full mt-auto">
                        <a href="tel:+923057362625" className="flex items-center gap-3 w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl p-3 transition-colors group">
                            <Phone className="w-4 h-4 text-[#ffffff] group-hover:text-purple-400 transition-colors" />
                            <span className="text-sm text-slate-300">+92 305 7362625</span>
                        </a>
                        <a href="mailto:ranashaharyar625@gmail.com" className="flex items-center gap-3 w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl p-3 transition-colors group">
                            <Mail className="w-4 h-4 text-[#ffffff] group-hover:text-purple-400 transition-colors" />
                            <span className="text-sm text-slate-300 truncate max-w-[200px]">ranashaharyar625@gmail.com</span>
                        </a>
                        <a href="https://github.com/sharryrana" className="flex items-center gap-3 w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl p-3 transition-colors group">
                            <Github className="w-4 h-4 text-[#ffffff] group-hover:text-purple-400 transition-colors" />
                            <span className="text-sm text-slate-300 truncate max-w-[200px]">GitHub</span>
                        </a>
                        <a href="https://creavibe.dev/" className="flex items-center gap-3 w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl p-3 transition-colors group">
                            <Code className="w-4 h-4 text-[#ffffff] group-hover:text-purple-400 transition-colors" />
                            <span className="text-sm text-slate-300 truncate max-w-[200px]">Portfolio</span>
                        </a>
                    </div>
                </motion.div>

                {/* Bio content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="md:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8"
                >
                    <div className="mb-8">
                        <p className="text-slate-300 leading-relaxed mb-4">
                            I architect and build enterprise-grade software solutions that drive measurable business outcomes. With over a decade of experience, I specialize in transforming complex business requirements into elegant, scalable systems that stand the test of time.
                        </p>
                        <p className="text-slate-300 leading-relaxed p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl">
                            <strong className="text-purple-400">My mission:</strong> Turn your business challenges into competitive advantages through custom software that your team will actually <span className="italic">love</span> using.
                        </p>
                    </div>

                    <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                        Core Expertise
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ExpertiseCard
                            icon={<LayoutDashboard className="w-5 h-5 text-indigo-400" />}
                            title="Enterprise Dashboards"
                            desc="Real-time analytics, KPI tracking, and business intelligence systems"
                        />
                        <ExpertiseCard
                            icon={<Code className="w-5 h-5 text-pink-400" />}
                            title="Workflow Automation"
                            desc="Sales, inventory, CRM, and operational process automation"
                        />
                        <ExpertiseCard
                            icon={<Database className="w-5 h-5 text-emerald-400" />}
                            title="Backend Architecture"
                            desc="Scalable APIs, microservices, and database optimization"
                        />
                        <ExpertiseCard
                            icon={<Server className="w-5 h-5 text-blue-400" />}
                            title="Cloud Infrastructure"
                            desc="AWS, Azure deployment, DevOps, and CI/CD pipelines"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function ExpertiseCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 hover:border-slate-700 transition-colors group">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-slate-900 rounded-lg group-hover:scale-110 transition-transform">
                    {icon}
                </div>
                <h5 className="font-semibold text-slate-200">{title}</h5>
            </div>
            <p className="text-sm text-[#ffffff] leading-relaxed pl-1">{desc}</p>
        </div>
    );
}
