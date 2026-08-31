const statusMap = {
  active: { label: "Aktif", tone: "success" },
  published: { label: "Yayında", tone: "success" },
  draft: { label: "Taslak", tone: "warning" },
  inactive: { label: "Pasif", tone: "neutral" },
  suspended: { label: "Askıda", tone: "danger" },
  admin: { label: "Yönetici", tone: "success" },
  editor: { label: "Editör", tone: "neutral" },
};

export default function StatusBadge({ status }) {
  const config = statusMap[status] || {
    label: status || "Belirsiz",
    tone: "neutral",
  };

  return <span className={`badge badge-${config.tone}`}>{config.label}</span>;
}
