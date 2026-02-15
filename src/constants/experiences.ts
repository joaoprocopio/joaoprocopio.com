import { HARD_SKILLS } from "~/constants/skills"
import { date, MONTH, PRESENT } from "~/utils/date"

export type TExperience = {
  company: string
  title: string
  description: string
  skills: string[]
  from: Date
  to?: Date | typeof PRESENT
}

export type TExperienceGrouped<
  CompanyKey extends keyof TExperience = "company",
> = {
  company: string
  experiences: Omit<TExperience, CompanyKey>[]
}

export const VILLAFACT_EXPERIENCE = {
  company: "Villafact",
  title: "Senior Full Stack Software Engineer",
  description: "",
  skills: [HARD_SKILLS.VUE, HARD_SKILLS.FIREBASE, HARD_SKILLS.PWA],
  from: date(2025, MONTH.MARCH),
  to: date(2026, MONTH.JANUARY),
} as const satisfies TExperience

export const MORAY_EXPERIENCE = {
  company: "Moray",
  title: "Frontend Software Engineer",
  description:
    "Spearheaded frontend innovation at Moray by modernizing interfaces, slashing load times by 40%, cutting costs with Docker optimizations (~96% smaller), and driving cross-functional collaboration to deliver scalable AI solutions for agriculture, while elevating team talent and code reliability through strategic leadership and performance-first practices.",
  skills: [
    HARD_SKILLS.JAVA_SCRIPT,
    HARD_SKILLS.TYPE_SCRIPT,
    HARD_SKILLS.REACT,
    HARD_SKILLS.VUE,
    HARD_SKILLS.MAPBOX,
    HARD_SKILLS.AWS,
    HARD_SKILLS.DOCKER,
    HARD_SKILLS.CI_CD,
  ],
  from: date(2023, MONTH.JUNE),
  to: date(2025, MONTH.MARCH),
} as const satisfies TExperience

export const BUSER_EXPERIENCE = {
  company: "Buser",
  title: "Full Stack Software Engineer",
  description:
    "I joined the team responsible for the Driver's mobile app, a hybrid application with a native shell for Flutter API access (e.g., background geolocation) and a Nuxt-based PWA handling business logic. I participated in agile ceremonies, implemented driver-focused features, refactored the CSS system for better reusability, and fixed user-impacting bugs.",
  skills: [
    HARD_SKILLS.PYTHON,
    HARD_SKILLS.JAVA_SCRIPT,
    HARD_SKILLS.DART,
    HARD_SKILLS.POSTGRES,
    HARD_SKILLS.DJANGO,
    HARD_SKILLS.FLUTTER,
    HARD_SKILLS.VUE,
    HARD_SKILLS.NUXT,
    HARD_SKILLS.DOCKER,
    HARD_SKILLS.RABBIT_MQ,
    HARD_SKILLS.CELERY,
    HARD_SKILLS.PWA,
    HARD_SKILLS.DBT,
    HARD_SKILLS.AIRFLOW,
    HARD_SKILLS.DATABRICKS,
    HARD_SKILLS.METABASE,
    HARD_SKILLS.SQL,
    HARD_SKILLS.AWS,
    HARD_SKILLS.LINUX,
    HARD_SKILLS.HTML,
    HARD_SKILLS.CSS,
    HARD_SKILLS.NGINX,
  ],
  from: date(2022, MONTH.OCTOBER),
  to: date(2023, MONTH.JUNE),
} as const satisfies TExperience

export const EXPERIENCES = [
  VILLAFACT_EXPERIENCE,
  MORAY_EXPERIENCE,
  BUSER_EXPERIENCE,
]
