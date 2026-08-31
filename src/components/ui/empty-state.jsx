import { ArchiveBoxIcon } from "@phosphor-icons/react/dist/ssr";

export default function EmptyState({ title, description, action }) {
  return (
    <div className="empty-state">
      <div className="empty-state-content">
        <span className="empty-state-icon" aria-hidden="true">
          <ArchiveBoxIcon size={22} />
        </span>
        <h2>{title}</h2>
        <p>{description}</p>
        {action}
      </div>
    </div>
  );
}
