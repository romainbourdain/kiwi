import { faker } from "@faker-js/faker";
import type { Article, Tag, User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const predefinedSlugs = ["tech", "education", "coding", "javascript", "AI"];

async function createPredefinedTags() {
  const tags = await Promise.all(
    predefinedSlugs.map((slug) =>
      prisma.tag.create({
        data: { slug },
      })
    )
  );
  return tags;
}

// Fonction pour créer des utilisateurs avec des articles
async function createUsersWithArticles(
  numUsers: number,
  numArticlesPerUser: number,
  tags: Tag[]
) {
  return await Promise.all(
    Array.from({ length: numUsers }).map(() => {
      return prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          image: faker.image.avatar(),
          articles: {
            create: Array.from({ length: numArticlesPerUser }).map(() =>
              createFakeArticle(tags)
            ),
          },
        },
      });
    })
  );
}

// Fonction pour créer un article factice avec des tags
function createFakeArticle(tags: Tag[]) {
  const tag1 = tags[faker.number.int({ min: 0, max: tags.length - 1 })];
  const tag2 = tags[faker.number.int({ min: 0, max: tags.length - 1 })];

  return {
    slug: `${faker.lorem.slug()}-${faker.string.uuid()}`,
    title: faker.lorem.sentence(),
    description: faker.lorem.sentences(2),
    content: generateComplexMarkdownArticle(), // markdown format
    image: faker.image.url({ width: 1080, height: 720 }),
    published: faker.datatype.boolean(),
    tags: {
      connect: [{ slug: tag1.slug }, { slug: tag2.slug }],
    },
  };
}

// Fonction pour créer des articles supplémentaires
async function createAdditionalArticles(
  numArticles: number,
  users: User[],
  tags: Tag[]
) {
  return await Promise.all(
    Array.from({ length: numArticles }).map(() => {
      const articleData = createFakeArticle(tags);
      return prisma.article.create({
        data: {
          ...articleData,
          author: {
            connect: {
              id: users[faker.number.int({ min: 0, max: users.length - 1 })].id,
            },
          },
        },
      });
    })
  );
}

// Fonction pour créer des vues sur les articles
async function addViewsToArticles(articles: Article[], users: User[]) {
  return await Promise.all(
    articles.map((article) => {
      const numViews = faker.number.int({ min: 10, max: 50 }); // Entre 10 et 50 vues par article
      return Promise.all(
        Array.from({ length: numViews }).map(() => {
          const user =
            users[faker.number.int({ min: 0, max: users.length - 1 })];
          const ip = faker.internet.ip(); // Générer une IP aléatoire pour les utilisateurs non authentifiés
          const isUser = faker.datatype.boolean();
          return prisma.view.create({
            data: {
              userId: isUser ? user.id : null, // Soit un utilisateur authentifié soit une IP
              articleSlug: article.slug,
              ip: isUser ? null : ip,
            },
          });
        })
      );
    })
  );
}

// Fonction pour ajouter des likes aux articles
async function addLikesToArticles(articles: Article[], users: User[]) {
  return await Promise.all(
    articles.map((article) => {
      const numLikes = faker.number.int({ min: 5, max: 20 }); // Entre 5 et 20 likes par article
      return Promise.all(
        Array.from({ length: numLikes }).map(() => {
          const user =
            users[faker.number.int({ min: 0, max: users.length - 1 })];
          return prisma.like.create({
            data: {
              userId: user.id,
              articleSlug: article.slug,
            },
          });
        })
      );
    })
  );
}

// Fonction pour créer des commentaires pour les articles
async function createComments(
  numComments: number,
  users: User[],
  articles: Article[]
) {
  return await Promise.all(
    Array.from({ length: numComments }).map(() =>
      prisma.comment.create({
        data: {
          content: faker.lorem.sentence(),
          author: {
            connect: {
              id: users[faker.number.int({ min: 0, max: users.length - 1 })].id,
            },
          },
          articles: {
            connect: {
              slug: articles[
                faker.number.int({ min: 0, max: articles.length - 1 })
              ].slug,
            },
          },
        },
      })
    )
  );
}

// Fonction pour générer un paragraphe en Markdown
function generateParagraphs(count: number): string {
  return Array.from({ length: count })
    .map(() => faker.lorem.paragraphs(1))
    .join("\n\n");
}

// Fonction pour générer un bloc de code en Markdown
function generateCodeBlock(): string {
  const languages = ["js", "python", "bash", "html"];
  const randomLanguage = faker.helpers.arrayElement(languages);
  return `\`\`\`${randomLanguage}\n${faker.lorem.sentences(
    2
  )}\nfunction example() {\n  console.log("Example code");\n}\n\`\`\``;
}

// Fonction pour générer une liste à puces en Markdown
function generateBulletList(): string {
  return `- ${faker.lorem.words(3)}\n- ${faker.lorem.words(
    3
  )}\n- ${faker.lorem.words(3)}`;
}

// Fonction pour générer une section avec sous-parties aléatoires
function generateSection(level: number, includeSubSections = true): string {
  const titlePrefix = "#".repeat(level);
  let section = `${titlePrefix} ${faker.lorem.sentence()}\n\n`;

  // Ajouter des paragraphes
  const numParagraphs = faker.number.int({ min: 1, max: 3 });
  section += generateParagraphs(numParagraphs) + "\n\n";

  // Ajouter un bloc de code ou une liste à puces avec une probabilité aléatoire
  if (faker.datatype.boolean()) {
    section += generateCodeBlock() + "\n\n";
  } else {
    section += generateBulletList() + "\n\n";
  }

  // Ajouter des sous-sections si applicable
  if (includeSubSections && faker.datatype.boolean()) {
    const numSubSections = faker.number.int({ min: 1, max: 3 });
    for (let i = 0; i < numSubSections; i++) {
      section += generateSection(level + 1, false); // Pas de sous-sous-parties
    }
  }

  return section;
}

// Fonction pour générer un article complet avec plusieurs parties, sous-parties, paragraphes, etc.
function generateComplexMarkdownArticle(): string {
  let article = `# ${faker.lorem.sentence()}\n\n`; // Titre principal
  const numSections = faker.number.int({ min: 2, max: 5 });

  for (let i = 0; i < numSections; i++) {
    article += generateSection(2); // Générer des parties de niveau 2 (##)
  }

  return article;
}

async function main() {
  // Supprimer toutes les données précédentes
  await prisma.article.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.user.deleteMany();
  await prisma.view.deleteMany();
  await prisma.like.deleteMany();

  // Créer les tags prédéfinis
  const tags = await createPredefinedTags();

  // Créer des utilisateurs et leurs articles
  const users = await createUsersWithArticles(10, 5, tags);

  // Créer des articles supplémentaires
  const articles = await createAdditionalArticles(50, users, tags);

  // Ajouter des vues aux articles
  await addViewsToArticles(articles, users);

  // Ajouter des likes aux articles
  await addLikesToArticles(articles, users);

  // Créer des commentaires pour les articles
  await createComments(100, users, articles);

  console.log("Fake data seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
