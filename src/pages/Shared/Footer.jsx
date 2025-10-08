import { useState } from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import logo from "/logo.png";
import { AiFillTwitterCircle } from "react-icons/ai";
import toast from "react-hot-toast";

import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    // demo: show success and clear
    toast.success("Subscribed — check your inbox for confirmation (demo)");
    setEmail("");
  };

  return (
    <footer className="bg-indigo-500 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand + CTA */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="LearnEnglish" className="w-12 rounded-full" />
              <div>
                <div className="font-extrabold text-lg">LearnEnglish</div>
                <div className="text-sm opacity-90">Grow your English — one session at a time</div>
              </div>
            </div>

            <p className="text-sm opacity-90">Free resources, live tutoring and curated lessons to build confidence quickly.</p>

            <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
              <input
                type="email"
                aria-label="Email for newsletter"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full rounded-md px-3 py-2 text-slate-900"
              />
              <button className="bg-black/90 hover:bg-black/100 px-4 py-2 rounded-md text-white font-medium">Subscribe</button>
            </form>
          </div>

          {/* Sitemap */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold">Explore</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/90">
                <li><Link to="/" className="hover:underline">Home</Link></li>
                <li><Link to="/about" className="hover:underline">About</Link></li>
                <li><Link to="/blog" className="hover:underline">Blog</Link></li>
                <li><Link to="/resources" className="hover:underline">Resources</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Support</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/90">
                <li><Link to="/contact" className="hover:underline">Contact</Link></li>
                <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
                <li><Link to="/tutors" className="hover:underline">Find a Tutor</Link></li>
                <li><Link to="/sessionDetail/" className="hover:underline">Sessions</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact + Social */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <div className="text-sm text-white/90 space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-lg"><FaMapMarkerAlt /></div>
                <div>Remote / Distributed team</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 text-lg"><FaPhone /></div>
                <div>+1 555 123 4567</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 text-lg"><FaEnvelope /></div>
                <div>support@learnenglish.example</div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mt-2">
                <a href="#" className="p-2 rounded bg-white/10 hover:bg-white/20 transition"><FaFacebook /></a>
                <a href="#" className="p-2 rounded bg-white/10 hover:bg-white/20 transition"><AiFillTwitterCircle /></a>
                <a href="#" className="p-2 rounded bg-white/10 hover:bg-white/20 transition"><FaInstagram /></a>
                <a href="#" className="p-2 rounded bg-white/10 hover:bg-white/20 transition"><FaLinkedinIn /></a>
                <a href="#" className="p-2 rounded bg-white/10 hover:bg-white/20 transition"><FaGithub /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-sm text-white/80 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} LearnEnglish — All rights reserved.</div>
          <div className="space-x-3">
            <Link to="/terms" className="hover:underline">Terms</Link>
            <Link to="/privacy" className="hover:underline">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
