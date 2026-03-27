"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Tag, SpotlightCard, RotatingCardStack } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Gift } from "lucide-react";
import featureData from "@/data/feature.json";

interface ChatMessageProps {
  sender: string;
  message: string;
  isAssistant?: boolean;
  isRight?: boolean;
  delay?: number;
}

function ChatMessage({ sender, message, isAssistant = false, isRight = false, delay = 0 }: ChatMessageProps) {
  const alignment = isRight ? "items-end" : "items-start";
  const bubbleMargin = isRight ? "mr-8" : "ml-8";
  const flexDir = isRight ? "flex-row-reverse" : "flex-row";

  return (
    <motion.div className={`flex flex-col gap-1 ${alignment}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: delay * 0.1 }}>
      <div className={`flex items-center gap-2 ${flexDir}`}>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold leading-none ${isAssistant ? "bg-linear-to-br from-violet-500 to-cyan-400" : isRight ? "bg-linear-to-br from-[oklch(69.4%_0.173_244.6)] to-cyan-300" : "bg-linear-to-br from-purple-400 to-purple-600"}`}>{isAssistant ? "✨" : sender.charAt(0)}</div>
        <span className="text-xs font-bw-gradual text-black/60">{sender}</span>
      </div>
      <div className={`rounded-md px-4 py-3 max-w-[85%] ${bubbleMargin} ${isAssistant ? "bg-neutral-800 border border-white/10" : isRight ? "border border-cyan-400/20" : "bg-neutral-500/50"}`} style={isRight && !isAssistant ? { background: "oklch(69.4% 0.173 244.6)" } : undefined}>
        <p className="text-sm text-white/90 leading-relaxed">{message}</p>
        {isAssistant && (
          <div className="flex flex-wrap gap-2 mt-3">
            {featureData.chat.buttons.map((btn, i) => (
              <button key={i} className="px-3 py-1.5 text-xs rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition-colors flex items-center gap-1">
                <span className="text-violet-400">🔗</span>
                {btn}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Product preview card styled like phone-right mockup
function ProductPreviewCard({ product, sender, delay = 0 }: { product: { title: string; description: string; price: string; icons: string[] }; sender: string; delay: number }) {
  return (
    <motion.div className="flex flex-col gap-1 items-end" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: delay * 0.1 }}>
      <div className="flex items-center gap-2 flex-row-reverse">
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold leading-none bg-linear-to-br from-[oklch(69.4%_0.173_244.6)] to-cyan-300">{sender.charAt(0)}</div>
        <span className="text-xs font-bw-gradual text-black/60">{sender}</span>
      </div>
      <div className="rounded-md overflow-hidden w-[75%] mr-8 bg-[oklch(96%_0.005_240)] border border-black/5 shadow-sm">
        {/* Horizontal image gallery with cut-off 4th image */}
        <div className="flex gap-1 p-1.5 pb-0 overflow-hidden">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex-1 min-w-0 rounded-sm bg-black/30 aspect-4/5" />
          ))}
          {/* 4th image with "more" overlay */}
          <div className="shrink-0 rounded-sm bg-black/10 w-[12%] aspect-4/5 relative">
            <div className="absolute rounded-sm inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white text-[9px] font-semibold">+3</span>
            </div>
          </div>
        </div>
        {/* Product info */}
        <div className="px-2.5 pt-1.5 pb-2">
          <p className="text-xs font-semibold text-black/80 leading-tight">{product.title}</p>
          <p className="text-[10px] text-black/50 mt-0.5">{product.description}</p>
          <div className="flex items-center justify-between mt-1.5">
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-medium text-black/70 bg-black/5 px-2 py-0.5 rounded-full border border-black/10">See product</span>
              <span className="w-5.5 h-5.5 rounded-full bg-black/5 border border-black/10 flex items-center justify-center">
                <Gift className="w-3 h-3 text-black/50" strokeWidth={1.5} />
              </span>
            </div>
            <span className="text-xs font-semibold text-black/70">{product.price}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Chat illustration component
function ChatIllustration() {
  const messageCount = featureData.chat.messages.length;

  return (
    <div className="relative w-full rounded-2xl bg-white/80 p-4">
      <div className="flex flex-col gap-3">
        {featureData.chat.messages.map((msg, index) => {
          if ((msg as any).type === "product-preview" && (msg as any).product) {
            return <ProductPreviewCard key={index} product={(msg as any).product} sender={msg.sender} delay={index} />;
          }
          return <ChatMessage key={index} sender={msg.sender} message={(msg as any).message || ""} isAssistant={(msg as any).isAssistant} isRight={msg.isRight} delay={index} />;
        })}

        {featureData.insight && (
          <motion.div className="flex items-center justify-center py-3 mt-1" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: messageCount * 0.1 }}>
            <span className="text-xs text-black/50 font-medium flex flex-col md:flex-row items-center gap-0.5 md:gap-1.5 px-2 text-center">
              <span className="italic">{featureData.insight.text}</span>
              <span className="font-semibold italic text-black/70">{featureData.insight.textEnd}</span>
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function Feature() {
  const carouselItems =
    featureData.cards[1].carousel?.map((item, index) => ({
      id: index,
      icon: item.icon,
      title: item.title,
      iconBg: item.iconBg || "oklch(51.1% 0.230 277.0)",
      cardBg: item.cardBg || "oklch(92.5% 0.017 301.2)",
    })) || [];

  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [winH, setWinH] = useState(600);

  useEffect(() => {
    setWinH(window.innerHeight);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["end end", "end start"],
  });

  const cardsY = useTransform(scrollYProgress, [0, 1], [0, winH * 0.4]);

  return (
    <section
      ref={sectionRef}
      id="why-appstract"
      className="relative z-1 w-full -mt-px"
      style={{
        background: "oklch(58.8% 0.226 281.2)",
      }}
    >
      {/* Header  */}
      <div className="w-full px-4 md:px-8 lg:px-16 flex justify-center">
        <div className="w-full max-w-7xl">
          <div className="py-12 md:py-16 flex flex-col items-center">
            <motion.div className="flex flex-col items-center max-w-3xl text-center mb-6 md:mb-12" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
              <motion.div variants={fadeInUp}>
                <Tag variant="dark">{featureData.tagline}</Tag>
              </motion.div>

              <motion.div className="mt-6" variants={fadeInUp}>
                <h2 className="font-bw-gradual font-bold leading-tight text-white" style={{ fontSize: "clamp(32px, 6vw, 64px)" }}>
                  {featureData.headline.line1}
                </h2>
                <p className="text-lg md:text-xl text-white/70 mt-4 max-w-xl mx-auto">{featureData.headline.line2}</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Cards - scroll-pinned via JS transform */}
      <div className="px-4 md:px-8 lg:px-16 flex justify-center">
        <motion.div ref={cardsRef} className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6" style={{ y: cardsY }} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}>
          {/* Left Card */}
          <motion.div variants={fadeInUp}>
            <SpotlightCard
              className="h-full"
              spotlightColor="oklch(85.9% 0.082 219.8 / 0.1)"
              style={{
                background: "linear-gradient(145deg, oklch(27.9% 0.009 285.8 / 0.6) 0%, oklch(21.6% 0.010 285.6 / 0.7) 100%)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid oklch(100% 0 0 / 0.15)",
                borderBottom: "1px solid oklch(0% 0 0 / 0.2)",
                boxShadow: `
                  0 20px 40px oklch(0% 0 0 / 0.4),
                  0 8px 16px oklch(0% 0 0 / 0.3),
                  0 2px 4px oklch(0% 0 0 / 0.2),
                  inset 0 1px 0 oklch(100% 0 0 / 0.1),
                  inset 0 -1px 0 oklch(0% 0 0 / 0.2)
                `,
              }}
            >
              {/* Top edge highlight sheen */}
              <div
                className="absolute top-0 left-8 right-8 h-px pointer-events-none z-10"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, oklch(100% 0 0 / 0.4) 20%, oklch(100% 0 0 / 0.6) 50%, oklch(100% 0 0 / 0.4) 80%, transparent 100%)",
                }}
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden"
                style={{
                  background: "linear-gradient(160deg, oklch(100% 0 0 / 0.08) 0%, oklch(100% 0 0 / 0.02) 30%, transparent 50%, oklch(0% 0 0 / 0.1) 100%)",
                }}
              />

              {/* Bottom reflection */}
              <div
                className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none rounded-b-3xl"
                style={{
                  background: "linear-gradient(to top, oklch(0% 0 0 / 0.15) 0%, transparent 100%)",
                }}
              />

              <div className="p-6 md:p-8 relative z-10">
                <div className="text-center mb-6">
                  <h3 className="text-xl md:text-2xl font-semibold font-bw-gradual! text-white mb-3">{featureData.cards[0].title}</h3>
                  <p className="text-sm md:text-base font-bw-gradual! text-white/80 leading-relaxed max-w-md mx-auto">{featureData.cards[0].description}</p>
                </div>

                {/* Chat Illustration */}
                <ChatIllustration />
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Right Card */}
          <motion.div variants={fadeInUp}>
            <SpotlightCard
              className="h-full"
              spotlightColor="oklch(85.9% 0.082 219.8 / 0.1)"
              style={{
                background: "linear-gradient(145deg, oklch(27.9% 0.009 285.8 / 0.6) 0%, oklch(21.6% 0.010 285.6 / 0.7) 100%)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid oklch(100% 0 0 / 0.15)",
                borderBottom: "1px solid oklch(0% 0 0 / 0.2)",
                boxShadow: `
                  0 20px 40px oklch(0% 0 0 / 0.4),
                  0 8px 16px oklch(0% 0 0 / 0.3),
                  0 2px 4px oklch(0% 0 0 / 0.2),
                  inset 0 1px 0 oklch(100% 0 0 / 0.1),
                  inset 0 -1px 0 oklch(0% 0 0 / 0.2)
                `,
              }}
            >
              {/* Top edge highlight sheen */}
              <div
                className="absolute top-0 left-8 right-8 h-px pointer-events-none z-10"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, oklch(100% 0 0 / 0.4) 20%, oklch(100% 0 0 / 0.6) 50%, oklch(100% 0 0 / 0.4) 80%, transparent 100%)",
                }}
              />

              {/* Gradient overlay for depth */}
              <div
                className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden"
                style={{
                  background: "linear-gradient(160deg, oklch(100% 0 0 / 0.08) 0%, oklch(100% 0 0 / 0.02) 30%, transparent 50%, oklch(0% 0 0 / 0.1) 100%)",
                }}
              />

              {/* Bottom reflection */}
              <div
                className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none rounded-b-3xl"
                style={{
                  background: "linear-gradient(to top, oklch(0% 0 0 / 0.15) 0%, transparent 100%)",
                }}
              />

              <div className="p-6 md:p-8 relative z-10 flex flex-col h-full">
                <div className="text-center mb-2">
                  <h3 className="text-xl md:text-2xl font-semibold font-bw-gradual! text-white mb-3">{featureData.cards[1].title}</h3>
                  <p className="text-sm md:text-base font-bw-gradual! text-white/80 leading-relaxed max-w-md mx-auto">{featureData.cards[1].description}</p>
                </div>

                {/* Card Stack */}
                <div className="flex flex-col items-center justify-center flex-1 py-6">
                  <RotatingCardStack items={carouselItems} autoRotate={true} rotationInterval={4000} className="w-full max-w-md" />
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll spacer */}
      <div className="h-[25vh]" aria-hidden="true" />
    </section>
  );
}
