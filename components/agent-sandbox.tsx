"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Brain, Code2, Database, Server, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const CENTER = { x: 230, y: 230 };
const RING_RADIUS = 160;
const VIEWBOX = 460;
const NODE_W = 110;
const NODE_H = 36;

interface RingNode {
  id: string;
  label: string;
  Icon: LucideIcon;
  /** angle in degrees, 0 = right, 90 = top */
  angle: number;
}

const RING_NODES: RingNode[] = [
  { id: "fullstack", label: "Full Stack", Icon: Code2, angle: 90 },
  { id: "llm", label: "LLM", Icon: Brain, angle: 18 },
  { id: "data", label: "Data", Icon: Database, angle: -54 },
  { id: "devops", label: "DevOps", Icon: Server, angle: -126 },
  { id: "automation", label: "Automation", Icon: Workflow, angle: 162 },
];

function nodeCenter(angle: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: CENTER.x + RING_RADIUS * Math.cos(rad),
    y: CENTER.y - RING_RADIUS * Math.sin(rad),
  };
}

export function AgentSandbox() {
  const reduced = useReducedMotion();

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[460px]"
      aria-label="Agent sandbox: a center jenil node connected to five satellite agent nodes for Full Stack, LLM, Data, DevOps, and Automation."
      role="img"
    >
      <svg
        viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {RING_NODES.map((node, i) => {
          const c = nodeCenter(node.angle);
          return (
            <motion.line
              key={`line-${node.id}`}
              x1={CENTER.x}
              y1={CENTER.y}
              x2={c.x}
              y2={c.y}
              stroke="var(--accent-teal)"
              strokeWidth={1}
              initial={{ opacity: 0.35 }}
              animate={reduced ? { opacity: 0.5 } : { opacity: [0.3, 0.6, 0.3] }}
              transition={
                reduced
                  ? undefined
                  : {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.4,
                    }
              }
            />
          );
        })}

        <circle
          cx={CENTER.x}
          cy={CENTER.y}
          r={42}
          fill="var(--surface)"
          stroke="var(--accent-teal)"
          strokeWidth={1.25}
        />
        <text
          x={CENTER.x}
          y={CENTER.y + 4}
          textAnchor="middle"
          className="fill-foreground font-mono"
          fontSize="13"
        >
          jenil
        </text>
      </svg>

      {RING_NODES.map((node, i) => {
        const c = nodeCenter(node.angle);
        const Icon = node.Icon;
        const left = `${(c.x / VIEWBOX) * 100}%`;
        const top = `${(c.y / VIEWBOX) * 100}%`;
        return (
          <div
            key={node.id}
            className="absolute"
            style={{
              left,
              top,
              width: NODE_W,
              height: NODE_H,
              transform: "translate(-50%, -50%)",
            }}
          >
            <motion.div
              className="bg-surface border-border text-foreground flex h-full w-full items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[12px]"
              initial={{ y: 0 }}
              animate={reduced ? { y: 0 } : { y: [-3, 3, -3] }}
              transition={
                reduced
                  ? undefined
                  : {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.4,
                    }
              }
            >
              <Icon className="text-muted-foreground" size={16} strokeWidth={1.5} />
              <span className="font-medium whitespace-nowrap">{node.label}</span>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
