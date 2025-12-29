import { Calendar, Clock, ArrowRight } from "lucide-react";

 
const tagColors = {
  react: "bg-[#00e5ff]/15 text-[#00e5ff] border-[#00e5ff]/30 px-1 rounded",
  css: "bg-[#00e5ff]/15 text-[#00e5ff] border-[#00e5ff]/30 px-1 rounded",
  typescript: "bg-[#b366ff]/15 text-[#b366ff] border-[#b366ff]/30 px-1 rounded",
  code: "bg-[#382b22] text-[#ff9933] border-[#ff9933]/30 px-1 rounded",
  javascript: "bg-[#382b22] text-[#ff9933] border-[#ff9933]/30 px-1 rounded",
  design: "bg-[#ff66b3]/15 text-[#ff66b3] border-[#ff66b3]/30  px-1 rounded",
  performance: "bg-[#1b3a23] text-[#3dff3d] border-[#3dff3d]/30 px-1 rounded", 
};

const PostCard = ({ title, excerpt, date, readTime, tags, slug, featured }) => {
  return (
    <article 
      className={`group relative rounded-xl bg-[#15181e] border border-[#2d323c] p-6 transition-all duration-300 hover:border-[#00e6ff] card-glow ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4 font-mono">
          {/* {tags.split(',').map((tag, index) => ( */}
           {tags.map((tag) => (
            <span 
              key={tag} 
              style={{fontSize:"12px"}}
              className={`syntax-tag border ${tagColors[tag.toLowerCase()] || "p-0.5 rounded bg-[#272c35] text-[#7b899d] border-[#2d323c]"}`}
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Title */}
        <h3 className={`font-bold text-white mb-3 group-hover:text-[#00e6ff] transition-colors ${featured ? "text-2xl md:text-3xl" : "text-xl"}`}>
          <a href={`/posts/${slug}`} className="block">
            {title}
          </a>
        </h3>
        
        {/* Excerpt */}
        <p className={`text-[#7b899d] mb-4 leading-relaxed ${featured ? "text-base" : "text-sm"}`}>
          {excerpt}
        </p>
        
        {/* Meta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-[#7b899d]">
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
