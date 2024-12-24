export function formatDate(date: string, includeRelative = false): string {
    const currentDate = new Date();
    const targetDate = new Date(date.includes("T") ? date : `${date}T00:00:00`);
  
    const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
    const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
    const daysAgo = currentDate.getDate() - targetDate.getDate();
  
    let formattedDate = "";
  
    if (yearsAgo > 0) {
      formattedDate = `${yearsAgo}y ago`;
    } else if (monthsAgo > 0) {
      formattedDate = `${monthsAgo}mo ago`;
    } else if (daysAgo > 0) {
      formattedDate = `${daysAgo}d ago`;
    } else {
      formattedDate = "Today";
    }
  
    const fullDate = targetDate.toLocaleString("en-us", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  
    if (!includeRelative) {
      return fullDate;
    }
  
    return `${fullDate} (${formattedDate})`;
  }
  
  