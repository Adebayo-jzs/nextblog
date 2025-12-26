import { Calendar, Clock, ArrowRight } from "lucide-react";

 
const tagColors = {
  react: "bg-syntax-cyan/15 text-syntax-cyan border-syntax-cyan/30",
  typescript: "bg-syntax-purple/15 text-syntax-purple border-syntax-purple/30",
  javascript: "bg-syntax-orange/15 text-syntax-orange border-syntax-orange/30",
  css: "bg-syntax-pink/15 text-syntax-pink border-syntax-pink/30",
  performance: "bg-syntax-green/15 text-syntax-green border-syntax-green/30",
  tutorial: "bg-primary/15 text-primary border-primary/30",
};

const PostCard = ({ title, excerpt, date, readTime, tags, slug, featured }) => {
  return (
    <article 
      className={`group relative rounded-xl bg-card border border-border p-6 transition-all duration-300 hover:border-primary/40 card-glow ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className={`syntax-tag border ${tagColors[tag.toLowerCase()] || "bg-muted text-muted-foreground border-border"}`}
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Title */}
        <h3 className={`font-bold mb-3 group-hover:text-primary transition-colors ${featured ? "text-2xl md:text-3xl" : "text-xl"}`}>
          <a href={`/post/${slug}`} className="block">
            {title}
          </a>
        </h3>
        
        {/* Excerpt */}
        <p className={`text-muted-foreground mb-4 leading-relaxed ${featured ? "text-base" : "text-sm"}`}>
          {excerpt}
        </p>
        
        {/* Meta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {readTime}
            </span>
          </div>
          
          {/* <a 
            href={`/post/${slug}`}
            className="flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0"
          >
            Read more
            <ArrowRight className="h-4 w-4" />
          </a> */}
        </div>
      </div>
    </article>
  );
};

export default PostCard;
