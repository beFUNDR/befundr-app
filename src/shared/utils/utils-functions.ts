export function delay(duration: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export function concatAddress(address: string | undefined) {
  if (address) {
    return `${address.substring(0, 4)}...${address.substring(address.length - 3)}`;
  }
}

export function concatEmail(email: string | undefined): string {
  if (email) {
    const atIndex = email.indexOf("@");
    if (atIndex === -1) {
      throw new Error("Adresse e-mail invalide");
    }

    const localPart = email.substring(0, atIndex);
    const domainPart = email.substring(atIndex);

    if (localPart.length > 6) {
      return `${localPart.substring(0, 6)}...${domainPart}`;
    }

    return email;
  } else {
    return "no email";
  }
}

export function formatDateToDDMMYYYY(date: Date): string {
  const formattedDate = date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return formattedDate;
}

/**
 * Truncate a string to a specified length and append "..." if it exceeds that length.
 * @param str - The string to truncate.
 * @param maxLength - The maximum length of the truncated string including the ellipsis.
 * @returns The truncated string with "..." appended if necessary.
 */
export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength - 3) + "...";
}

/**
 * Capitalize the first letter of a string
 * @param string - The string to capitalize
 * @returns The string with the first letter capitalized
 */
export function capitalizeFirstLetter(string: string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export const formatDate = (
  date: string | { seconds: number; nanoseconds: number }
) => {
  if (typeof date === "string") {
    return new Date(date);
  }
  const milliseconds = date.seconds * 1000 + date.nanoseconds / 1000000;
  return new Date(milliseconds);
};
