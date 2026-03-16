"use client";

import { motion } from "framer-motion";
import { Tag, SpotlightCard, RotatingCardStack } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import featureData from "@/data/feature.json";

// Chat message component
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
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${isAssistant ? "bg-linear-to-br from-violet-500 to-cyan-400" : isRight ? "bg-linear-to-br from-cyan-400 to-cyan-600" : "bg-linear-to-br from-purple-400 to-purple-600"}`}>{isAssistant ? "✨" : sender.charAt(0)}</div>
        <span className="text-xs text-black/60">{sender}</span>
      </div>
      <div className={`rounded-2xl px-4 py-3 max-w-[85%] ${bubbleMargin} ${isAssistant ? "bg-neutral-800 border border-white/10" : isRight ? "bg-cyan-600/30 border border-cyan-400/20" : "bg-neutral-700/50"}`}>
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

// Chat illustration component
function ChatIllustration() {
  return (
    <div className="relative w-full rounded-2xl bg-white/50 p-4">
      <div className="flex flex-col gap-3">
        {featureData.chat.messages.map((msg, index) => (
          <ChatMessage key={index} sender={msg.sender} message={msg.message} isAssistant={msg.isAssistant} isRight={msg.isRight} delay={index} />
        ))}
      </div>
    </div>
  );
}

export default function Feature() {
  // Create carousel items from feature data
  const carouselItems =
    featureData.cards[1].carousel?.map((item, index) => ({
      id: index,
      icon: item.icon,
      title: item.title,
      iconBg: item.iconBg || "#4F46E5",
      cardBg: item.cardBg || "#E8E4F0",
    })) || [];

  return (
    <section
      id="why-appstract"
      className="relative w-full py-8 md:py-12 px-4 md:px-8 lg:px-16 flex justify-center -mt-px"
      style={{
        background: "#6D5EFC",
      }}
    >
      <div className="w-full max-w-7xl flex flex-col items-center">
        {/* Header */}
        <motion.div className="flex flex-col items-center max-w-3xl text-center mb-12 md:mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
          {/* Tag */}
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

        {/* Cards */}
        <motion.div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}>
          {/* Left Card */}
          <motion.div variants={fadeInUp}>
            <SpotlightCard
              className="h-full"
              spotlightColor="rgba(146, 222, 246, 0.1)"
              style={{
                background: "rgba(30, 30, 30, 0.3)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="p-6 md:p-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{featureData.cards[0].title}</h3>
                  <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-md mx-auto">{featureData.cards[0].description}</p>
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
              spotlightColor="rgba(146, 222, 246, 0.1)"
              style={{
                background: "rgba(30, 30, 30, 0.3)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="p-6 md:p-8">
                <div className="text-center mb-8">
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{featureData.cards[1].title}</h3>
                  <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-md mx-auto">{featureData.cards[1].description}</p>
                </div>

                {/* Card Stack */}
                <div className="flex flex-col items-center justify-center pb-8">
                  <RotatingCardStack items={carouselItems} autoRotate={true} rotationInterval={4000} className="w-full max-w-sm" />
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
