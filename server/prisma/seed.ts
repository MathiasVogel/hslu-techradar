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
    // LANGUAGES_AND_FRAMEWORKS
    {
      name: 'React',
      category: Category.LANGUAGES_AND_FRAMEWORKS,
      ring: Ring.ADOPT,
      description: 'Die meistgenutzte Library für Web-Frontends.',
      justification: 'Industriestandard mit riesigem Ökosystem und hoher Stabilität.',
      active: true
    },
    {
      name: 'Kotlin',
      category: Category.LANGUAGES_AND_FRAMEWORKS,
      ring: Ring.ADOPT,
      description: 'Moderner Standard für Android-Entwicklung und Backend-Services.',
      justification: 'Bietet bessere Typsicherheit und Ergonomie als Java.',
      active: true
    },
    {
      name: 'Rust',
      category: Category.LANGUAGES_AND_FRAMEWORKS,
      ring: Ring.TRIAL,
      description: 'Systemsprache mit Fokus auf Sicherheit und Performance.',
      justification: 'Vielversprechend für performance-kritische Komponenten.',
      active: true
    },

    // TOOLS
    {
      name: 'GitHub Copilot',
      category: Category.TOOLS,
      ring: Ring.ADOPT,
      description: 'KI-gestützte Code-Vervollständigung.',
      justification: 'Signifikante Steigerung der Entwicklerproduktivität.',
      active: true
    },
    {
      name: 'Docker',
      category: Category.TOOLS,
      ring: Ring.ADOPT,
      description: 'Plattform zur Containerisierung von Anwendungen.',
      justification: 'Standard für konsistente Umgebungen von Entwicklung bis Produktion.',
      active: true
    },

    // PLATFORMS
    {
      name: 'Vercel',
      category: Category.PLATFORMS,
      ring: Ring.TRIAL,
      description: 'Optimale Plattform für Next.js und Frontend-Deployments.',
      justification: 'Setzt Maßstäbe in Sachen Developer Experience und Performance.',
      active: true
    },
    {
      name: 'Kubernetes',
      category: Category.PLATFORMS,
      ring: Ring.ADOPT,
      description: 'Orchestrierungssystem für Container-Cluster.',
      justification: 'De-facto-Standard für Cloud-native Infrastrukturen.',
      active: true
    },

    // TECHNIQUES
    {
      name: 'GraphQL',
      category: Category.TECHNIQUES,
      ring: Ring.TRIAL,
      description: 'Abfragesprache für APIs für präzisen Datentransfer.',
      justification: 'Reduziert Overfetching und verbessert die Effizienz im Frontend.',
      active: true
    },
    {
      name: 'TDD',
      category: Category.TECHNIQUES,
      ring: Ring.ADOPT,
      description: 'Test-Driven Development als Kern-Entwicklungsprozess.',
      justification: 'Sorgt für hohe Testabdeckung und wartbaren Code von Beginn an.',
      active: true
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