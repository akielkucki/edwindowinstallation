import { motion } from "framer-motion";
import { Star } from "lucide-react"; // Assuming you are using lucide-react

// 1. Define the variants outside the component to prevent recreation on every render
const containerVariants = {
    hidden: { opacity: 0, y: 10 }, // Assuming your fadeUp does something like this
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.05, // Automatically staggers every child by 0.05s
            delayChildren: 0.1,
        },
    },
};

const childVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.33, ease: "easeInOut" }
    },
};

export default function RatingBadge() {
    const text = "rated by our customers";

    return (
        <motion.span
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            // Accessibility label so screen readers read it nicely
            aria-label={`5 stars, ${text}`}
            className="inline-flex items-center justify-center gap-0.5 rounded-full px-4 py-1.5 text-xs font-medium tracking-[0.18em] text-stone-200 uppercase"
        >
            {/* Stars */}
            {Array.from({ length: 5 }).map((_, i) => (
                /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                //@ts-ignore
                <motion.span key={`star-${i}`} variants={childVariants} aria-hidden="true">
                    <Star className="fill-yellow-400 text-transparent" size={16} />
                </motion.span>
            ))}

            <span className="ml-1" aria-hidden="true">&nbsp;</span>

            {/* Text */}
            {text.split("").map((char, i) => (
                <motion.span
                    key={`char-${i}`}
                    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                    //@ts-ignore
                    variants={childVariants}
                    aria-hidden="true"
                    className={"tracking-tighter"}
                >
                    {char.match(/\s/) ? <>&nbsp;</> : char}
                </motion.span>
            ))}
        </motion.span>
    );
}