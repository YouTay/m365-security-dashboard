import { formatDistanceToNow, format } from "date-fns";
import { de } from "date-fns/locale";

export function formatRelativeTime(dateString: string): string {
  return formatDistanceToNow(new Date(dateString), {
    addSuffix: true,
    locale: de,
  });
}

export function formatDateTime(dateString: string): string {
  return format(new Date(dateString), "dd.MM.yyyy HH:mm", { locale: de });
}

export function formatDate(dateString: string): string {
  return format(new Date(dateString), "dd.MM.yyyy", { locale: de });
}
