import { PrismaClient } from "@prisma/client";
import "server-only"; // Importing a module named "server-only", presumably containing server-specific logic or configurations.

// Extending the global Node.js object to add a cachedPrisma property to it.
declare global {
  var cachedPrisma: PrismaClient;
}

export let prisma: PrismaClient; // Declaration for re-exporting prisma.

// If we are in a non-production environment, create a new PrismaClient instance every time.
if (process.env.NODE_ENV !== "production") {
  prisma = new PrismaClient();
} else {
  // In production, check if there's a cached client.
  // If not, create a new instance and cache it in the global object.
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }

  // Use the cached prisma instance.
  prisma = global.cachedPrisma;
}
