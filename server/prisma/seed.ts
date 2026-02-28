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
      published: false
    },
    {
      name: 'Kotlin',
      category: Category.LANGUAGES_AND_FRAMEWORKS,
      ring: Ring.ADOPT,
      description: 'Moderner Standard für Android-Entwicklung und Backend-Services.',
      justification: 'Bietet bessere Typsicherheit und Ergonomie als Java.',
      published: false
    },
    {
      name: 'Rust',
      category: Category.LANGUAGES_AND_FRAMEWORKS,
      ring: Ring.TRIAL,
      description: 'Systemsprache mit Fokus auf Sicherheit und Performance.',
      justification: 'Vielversprechend für performance-kritische Komponenten.',
      published: true,
      publishedAt: new Date('2024-03-01')
    },
    {
      name: 'TypeScript',
      category: Category.LANGUAGES_AND_FRAMEWORKS,
      ring: Ring.ADOPT,
      description: 'Typsichere Erweiterung von JavaScript für große Frontends und Node-Services.',
      justification: 'Verbessert Wartbarkeit und Developer Experience im gesamten Stack.',
      published: true,
      publishedAt: new Date('2024-02-15')
    },
    {
      name: 'Go',
      category: Category.LANGUAGES_AND_FRAMEWORKS,
      ring: Ring.ASSESS,
      description: 'Einfache, schnelle Sprache für Services und CLIs.',
      justification: 'Gute Wahl für Cloud-native Services mit geringem Footprint.',
      published: false
    },
    {
      name: 'WebAssembly',
      category: Category.LANGUAGES_AND_FRAMEWORKS,
      ring: Ring.ASSESS,
      description: 'Binary-Format für Near-Native-Performance im Browser und auf Edge-Plattformen.',
      justification: 'Eröffnet neue Performance-Szenarien, aber Tooling noch unreif.',
      published: false
    },

    // TOOLS
    {
      name: 'GitHub Copilot',
      category: Category.TOOLS,
      ring: Ring.ADOPT,
      description: 'KI-gestützte Code-Vervollständigung.',
      justification: 'Signifikante Steigerung der Entwicklerproduktivität.',
      published: true,
      publishedAt: new Date('2024-04-05')
    },
    {
      name: 'Docker',
      category: Category.TOOLS,
      ring: Ring.ADOPT,
      description: 'Plattform zur Containerisierung von Anwendungen.',
      justification: 'Standard für konsistente Umgebungen von Entwicklung bis Produktion.',
      published: true,
      publishedAt: new Date('2023-12-10')
    },
    {
      name: 'Terraform',
      category: Category.TOOLS,
      ring: Ring.TRIAL,
      description: 'Infrastructure as Code für Multi-Cloud-Setups.',
      justification: 'Deklarative Provisionierung reduziert Drift und vereinfacht Audits.',
      published: true,
      publishedAt: new Date('2024-05-20')
    },
    {
      name: 'Cypress',
      category: Category.TOOLS,
      ring: Ring.TRIAL,
      description: 'E2E-Testing-Framework für Web-Anwendungen.',
      justification: 'Starke DX für UI-Tests, insbesondere in SPAs.',
      published: false
    },
    {
      name: 'Grafana',
      category: Category.TOOLS,
      ring: Ring.ADOPT,
      description: 'Visualisierung und Alerting für Metriken und Traces.',
      justification: 'Zentraler Baustein für Observability-Plattformen.',
      published: true,
      publishedAt: new Date('2024-01-12')
    },
    {
      name: 'Jenkins',
      category: Category.TOOLS,
      ring: Ring.HOLD,
      description: 'Ältere CI/CD-Plattform mit großer Plugin-Landschaft.',
      justification: 'Legacy-Pipelines weiter betreiben, aber Migration zu moderneren Alternativen prüfen.',
      published: false
    },

    // PLATFORMS
    {
      name: 'Vercel',
      category: Category.PLATFORMS,
      ring: Ring.TRIAL,
      description: 'Optimale Plattform für Next.js und Frontend-Deployments.',
      justification: 'Setzt Maßstäbe in Sachen Developer Experience und Performance.',
      published: true,
      publishedAt: new Date('2024-03-15')
    },
    {
      name: 'Kubernetes',
      category: Category.PLATFORMS,
      ring: Ring.ADOPT,
      description: 'Orchestrierungssystem für Container-Cluster.',
      justification: 'De-facto-Standard für Cloud-native Infrastrukturen.',
      published: true,
      publishedAt: new Date('2023-11-30')
    },
    {
      name: 'AWS Lambda',
      category: Category.PLATFORMS,
      ring: Ring.ADOPT,
      description: 'Serverless Compute für Event-getriebene Anwendungen.',
      justification: 'Skaliert automatisch, senkt Betriebsaufwand für viele Workloads.',
      published: true,
      publishedAt: new Date('2024-02-28')
    },
    {
      name: 'Supabase',
      category: Category.PLATFORMS,
      ring: Ring.TRIAL,
      description: 'Open-Source Backend-as-a-Service auf Postgres-Basis.',
      justification: 'Schneller MVP-Start mit Auth, Storage und Realtime-Features.',
      published: true,
      publishedAt: new Date('2024-04-10')
    },
    {
      name: 'Azure Container Apps',
      category: Category.PLATFORMS,
      ring: Ring.ASSESS,
      description: 'Serverless Container-Runtime auf Azure für Microservices.',
      justification: 'Geringer Plattformbetrieb, aber noch Limitierungen bei Feature-Parität.',
      published: false
    },
    {
      name: 'Cloudflare Workers',
      category: Category.PLATFORMS,
      ring: Ring.TRIAL,
      description: 'Edge-Compute-Plattform nahe am Nutzer.',
      justification: 'Niedrige Latenz für globale Apps, API-Ökosystem wird reifer.',
      published: false
    },

    // TECHNIQUES
    {
      name: 'GraphQL',
      category: Category.TECHNIQUES,
      ring: Ring.TRIAL,
      description: 'Abfragesprache für APIs für präzisen Datentransfer.',
      justification: 'Reduziert Overfetching und verbessert die Effizienz im Frontend.',
      published: true,
      publishedAt: new Date('2024-02-10')
    },
    {
      name: 'TDD',
      category: Category.TECHNIQUES,
      ring: Ring.ADOPT,
      description: 'Test-Driven Development als Kern-Entwicklungsprozess.',
      justification: 'Sorgt für hohe Testabdeckung und wartbaren Code von Beginn an.',
      published: true,
      publishedAt: new Date('2023-10-05')
    },
    {
      name: 'Domain-Driven Design',
      category: Category.TECHNIQUES,
      ring: Ring.ADOPT,
      description: 'Fokus auf Domänenmodellierung und Bounded Contexts.',
      justification: 'Hilft komplexe Fachlichkeit zu strukturieren und zu kommunizieren.',
      published: true,
      publishedAt: new Date('2023-09-01')
    },
    {
      name: 'Event Sourcing',
      category: Category.TECHNIQUES,
      ring: Ring.ASSESS,
      description: 'Zustand als Ereignisstrom statt als aktuelle Snapshot-Row.',
      justification: 'Ermöglicht Auditability und Replays, benötigt aber Reife im Team.',
      published: false
    },
    {
      name: 'Chaos Engineering',
      category: Category.TECHNIQUES,
      ring: Ring.TRIAL,
      description: 'Gezielte Störungs-Experimente zur Erhöhung der Resilienz.',
      justification: 'Deckt Schwachstellen in Infrastruktur und Prozessen früh auf.',
      published: true,
      publishedAt: new Date('2024-06-01')
    },
    {
      name: 'Micro Frontends',
      category: Category.TECHNIQUES,
      ring: Ring.HOLD,
      description: 'Zerlegung großer Frontends in unabhängige Vertical Slices.',
      justification: 'Starker organisatorischer Nutzen, aber erhöhtes Laufzeit- und DX-Overhead.',
      published: false
    },
    {
      name: 'Continuous Discovery',
      category: Category.TECHNIQUES,
      ring: Ring.TRIAL,
      description: 'Regelmäßige Produkt- und Nutzerhypothesen validieren.',
      justification: 'Reduziert Fehlinvestitionen, braucht aber Disziplin im Team.',
      published: false
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