import { HARD_SKILLS } from "~/constants/skills"
import { date, MONTH } from "~/utils/date"

export type TExperience = {
  company: string
  title: string
  description: string
  skills: string[]
  from: Date
  to?: Date
}

export type TExperienceGrouped = {
  company: string
  experiences: Omit<TExperience, "company">[]
}

const MORAY_EXPERIENCE = {
  company: "moray.ai",
  title: "Frontend Software Engineer",
  description:
    "Spearheaded frontend innovation at Moray by modernizing interfaces, slashing load times by 40%, cutting costs with Docker optimizations (~96% smaller), and driving cross-functional collaboration to deliver scalable AI solutions for agriculture, while elevating team talent and code reliability through strategic leadership and performance-first practices.",
  skills: [
    HARD_SKILLS.REACT,
    HARD_SKILLS.VUE,
    HARD_SKILLS.JAVA_SCRIPT,
    HARD_SKILLS.TYPE_SCRIPT,
    HARD_SKILLS.MAPBOX,
    HARD_SKILLS.AWS,
    HARD_SKILLS.DOCKER,
    HARD_SKILLS.CI_CD,
  ],
  from: date(2023, MONTH.JUNE),
  to: undefined,
} as const satisfies TExperience

export const EXPERIENCES = [MORAY_EXPERIENCE]
