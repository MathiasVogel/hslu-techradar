import { PrismaClient, Category, Ring } from '../src/generated/client/client'
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env["DATABASE_URL"]
});

const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding Tech Radar data...');

  await prisma.technology.deleteMany();

  const technologies = [
    // LANGUAGES & FRAMEWORKS
    {
      name: 'React',
      description: 'Die meistgenutzte Library für Web-Frontends.',
      category: Category.LANGUAGES_AND_FRAMEWORKS,
      ring: Ring.ADOPT,
      moved: 0,
      website: 'https://react.dev'
    },
    {
      name: 'Kotlin',
      description: 'Moderner Standard für Android-Entwicklung und Backend-Services.',
      category: Category.LANGUAGES_AND_FRAMEWORKS,
      ring: Ring.ADOPT,
      moved: 0,
      website: 'https://kotlinlang.org'
    },
    {
      name: 'Rust',
      description: 'Systemsprache mit Fokus auf Sicherheit und Performance.',
      category: Category.LANGUAGES_AND_FRAMEWORKS,
      ring: Ring.TRIAL,
      moved: 1, // Steigt auf
      website: 'https://www.rust-lang.org'
    },
    {
      name: 'Java 8',
      description: 'Veraltete Version. Teams sollten auf Java 17+ migrieren.',
      category: Category.LANGUAGES_AND_FRAMEWORKS,
      ring: Ring.HOLD,
      moved: -1, // Sinkt ab
    },

    // TOOLS
    {
      name: 'GitHub Copilot',
      description: 'KI-gestützte Code-Vervollständigung.',
      category: Category.TOOLS,
      ring: Ring.ADOPT,
      moved: 2, // Neu und wichtig
      website: 'https://github.com/features/copilot'
    },
    {
      name: 'Postman',
      description: 'Tool für API-Tests und Dokumentation.',
      category: Category.TOOLS,
      ring: Ring.ADOPT,
      moved: 0,
    },
    {
      name: 'Jenkins',
      description: 'Klassisches CI/CD Tool. Oft durch modernere Alternativen ersetzt.',
      category: Category.TOOLS,
      ring: Ring.HOLD,
      moved: -1,
    },
    {
      name: 'Terraform',
      description: 'Infrastructure as Code Standard.',
      category: Category.TOOLS,
      ring: Ring.ADOPT,
      moved: 0,
    },

    // PLATFORMS
    {
      name: 'AWS (Amazon Web Services)',
      description: 'Marktführende Cloud-Plattform.',
      category: Category.PLATFORMS,
      ring: Ring.ADOPT,
      moved: 0,
    },
    {
      name: 'Vercel',
      description: 'Optimale Plattform für Next.js und Frontend-Deployments.',
      category: Category.PLATFORMS,
      ring: Ring.TRIAL,
      moved: 1,
    },
    {
      name: 'Azure',
      description: 'Microsofts Cloud-Ökosystem, stark in Enterprise-Umgebungen.',
      category: Category.PLATFORMS,
      ring: Ring.ADOPT,
      moved: 0,
    },

    // TECHNIQUES
    {
      name: 'Microservices',
      description: 'Architekturstil zur Zerlegung komplexer Systeme.',
      category: Category.TECHNIQUES,
      ring: Ring.ADOPT,
      moved: 0,
    },
    {
      name: 'GraphQL',
      description: 'Abfragesprache für APIs als Alternative zu REST.',
      category: Category.TECHNIQUES,
      ring: Ring.TRIAL,
      moved: 0,
    },
    {
      name: 'Test Driven Development (TDD)',
      description: 'Entwicklungsprozess, bei dem Tests vor dem Code geschrieben werden.',
      category: Category.TECHNIQUES,
      ring: Ring.ADOPT,
      moved: 0,
    }
  ];

  for (const tech of technologies) {
    await prisma.technology.create({
      data: tech,
    });
  }

  console.log(`${technologies.length} new technologies added to the Tech Radar.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });