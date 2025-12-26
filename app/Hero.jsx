"use client"
import { useEffect, useState } from "react";

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
    <section className="relative min-h-[70vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: "1s" }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Terminal-style intro */}
          <div className="inline-block mb-8 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border text-sm font-mono">
              <span className="text-syntax-green">●</span>
              <span className="text-muted-foreground">npm run</span>
              <span className="text-primary">thoughts</span>
            </div>
          </div>
          
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <span className="text-foreground">Hi, I'm </span>
            <span className="text-gradient-primary">Theebayo</span>
            <span className="text-primary terminal-cursor">_</span>
          </h1>
          
          {/* Typing animation subtitle */}
          <div className="h-10 mb-8 opacity-0 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <p className="text-xl md:text-2xl text-muted-foreground font-mono">
              <span className="text-syntax-purple">const</span>{" "}
              <span className="text-syntax-cyan">mission</span>{" "}
              <span className="text-muted-foreground">=</span>{" "}
              <span className="text-syntax-orange">"</span>
              <span className="text-foreground">{displayText}</span>
              <span className="text-primary terminal-cursor">|</span>
              <span className="text-syntax-orange">"</span>
              <span className="text-muted-foreground">;</span>
            </p>
          </div>
          
          {/* Description */}
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed opacity-0 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            Exploring React,Javascript, TypeScript, and modern web development. 
            Sharing lessons learned from debugging at 2am.
          </p>
          
          {/* CTA buttons */}
          <div className="flex items-center justify-center gap-4 opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <a 
              href="#posts" 
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:glow-primary transition-all hover:scale-105"
            >
              Read Posts
            </a>
            <a 
              href="#newsletter" 
              className="px-6 py-3 bg-secondary text-foreground rounded-lg font-medium border border-border hover:border-primary/50 transition-all hover:scale-105"
            >
              Subscribe
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative code snippets floating */}
      <div className="absolute bottom-20 left-10 text-xs font-mono text-muted-foreground/30 hidden lg:block animate-float">
        <pre>{`function blog() {
  return <Posts />;
}`}</pre>
      </div>
      <div className="absolute top-40 right-10 text-xs font-mono text-muted-foreground/30 hidden lg:block animate-float" style={{ animationDelay: "2s" }}>
        <pre>{`// TODO: ship it 🚀
export default App;`}</pre>
      </div>
    </section>
  );
};

export default Hero;
