"use client"
import { useEffect, useState } from "react";
import "./Hero.css";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Building things for the web";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section bg-[#0d1519]">
      {/* Background glow effects */}
      <div className="glow-blob blob-primary" />
      <div className="glow-blob blob-accent" />
      
      <div className="hero-container">
        <div className="hero-content">
          
          <div className="terminal-badge">
            <span className="dot-green">●</span>
            <span className="text-muted">npm run</span>
            <span className="text-primary">thoughts</span>
          </div>
          
          <h1 className="hero-title">
            Hi, I'm <span className="text-primary">Theebayo</span>
            <span className="cursor-main">_</span>
          </h1>
          
          <div className="typing-subtitle">
            <p className="font-mono">
              <span className="syntax-purple">const</span>{" "}
              <span className="syntax-cyan">mission</span>{" "}
              <span className="text-muted">=</span>{" "}
              <span className="syntax-orange">"</span>
              <span className="text-white">{displayText}</span>
              <span className="cursor-sub">|</span>
              <span className="syntax-orange">"</span>
              <span className="text-muted">;</span>
            </p>
          </div>
          
          <p className="hero-description">
            Exploring React, Javascript, TypeScript, and modern web development. 
            Sharing lessons learned from debugging at 2am.
          </p>
          
          <div className="hero-actions">
            <a href="#posts" className="btn-primary">Read Posts</a>
            <a href="#newsletter" className="btn-secondary">Subscribe</a>
          </div>
        </div>
      </div>

      {/* Floating Decorative Snippets */}
      <div className="floating-code code-left">
        <pre>{`function blog() {\n  return <Posts />;\n}`}</pre>
      </div>
      <div className="floating-code code-right">
        <pre>{`// TODO: ship it 🚀\nexport default App;`}</pre>
      </div>
    </section>
  );
};

export default Hero;