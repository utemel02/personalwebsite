/**
 * Utility functions for client and server
 */

/**
 * Sanitizes a string to be used as a valid file/directory name
 * - Converts to lowercase
 * - Replaces spaces with hyphens
 * - Removes special characters
 * - Ensures the name is valid for filesystem use
 */
export function sanitizeFileName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^a-z0-9-_]/g, "") // Remove special characters
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Joins path components ensuring there's exactly one separator between them
 */
export function joinPaths(...paths: string[]): string {
  return paths
    .filter(Boolean)
    .map((p) => p.replace(/\/+$/, "")) // Remove trailing slashes
    .join("/");
}
