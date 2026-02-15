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
  description:
    "Third engineer at an early-stage startup, working directly with the CEO to translate business vision into technical solutions with full end-to-end ownership. Architected a Vue component system, built a hybrid mobile app with Capacitor and real-time data sync via Firebase, and led product UI/UX decisions across web and mobile.",
  skills: [
    HARD_SKILLS.VUE,
    HARD_SKILLS.NODE,
    HARD_SKILLS.FIREBASE,
    HARD_SKILLS.CAPACITOR,
  ],
  from: date(2025, MONTH.MARCH),
  to: date(2026, MONTH.JANUARY),
} as const satisfies TExperience

export const MORAY_EXPERIENCE = {
  company: "Moray",
  title: "Frontend Software Engineer",
  description:
    "Second frontend engineer at a joint venture building AI-driven agricultural platforms. Built an offline-first React Native app for crop monitoring across remote areas with unreliable connectivity, led the Nuxt to React migration, and optimized infrastructure — cutting load times by 40% and Docker image sizes by 96%.",
  skills: [
    HARD_SKILLS.TYPE_SCRIPT,
    HARD_SKILLS.REACT,
    HARD_SKILLS.REACT_NATIVE,
    HARD_SKILLS.NUXT,
    HARD_SKILLS.TANSTACK_QUERY,
    HARD_SKILLS.DJANGO,
    HARD_SKILLS.DOCKER,
    HARD_SKILLS.NGINX,
    HARD_SKILLS.CI_CD,
    HARD_SKILLS.AWS,
  ],
  from: date(2023, MONTH.JUNE),
  to: date(2025, MONTH.MARCH),
} as const satisfies TExperience

export const BUSER_EXPERIENCE = {
  company: "Buser",
  title: "Full Stack Software Engineer",
  description:
    "Delivered full stack features across a hybrid mobile application, backend services, and data pipelines for one of Brazil's largest intercity bus travel platforms. Built Airflow DAGs, optimized reporting pipelines on Databricks, and partnered with operations to fix critical bugs and improve daily workflows.",
  skills: [
    HARD_SKILLS.PYTHON,
    HARD_SKILLS.FLUTTER,
    HARD_SKILLS.NUXT,
    HARD_SKILLS.DJANGO,
    HARD_SKILLS.AIRFLOW,
    HARD_SKILLS.DBT,
    HARD_SKILLS.SQL,
    HARD_SKILLS.DATABRICKS,
    HARD_SKILLS.PWA,
  ],
  from: date(2022, MONTH.OCTOBER),
  to: date(2023, MONTH.JUNE),
} as const satisfies TExperience

export const EXPERIENCES = [
  VILLAFACT_EXPERIENCE,
  MORAY_EXPERIENCE,
  BUSER_EXPERIENCE,
]
