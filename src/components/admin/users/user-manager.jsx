"use client";

import {
  NotePencil,
  Plus,
  ShieldCheck,
  UserMinus,
  WarningCircle,
} from "@phosphor-icons/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import ConfirmDialog from "@/components/ui/confirm-dialog";
import EmptyState from "@/components/ui/empty-state";
import StatusBadge from "@/components/ui/status-badge";
import { clientApiRequest } from "@/lib/api/client";
import {
  createUserFormSchema,
  updateUserFormSchema,
} from "@/lib/validation/admin";

const emptyValues = {
  fullName: "",
  email: "",
  password: "",
  role: "editor",
  status: "active",
};

function toFormValues(user) {
  return {
    fullName: user.fullName || "",
    email: user.email || "",
    password: "",
    role: user.role || "editor",
    status: user.status || "active",
  };
}

function formatDate(value) {
  if (!value) {
    return "Henüz giriş yapmadı";
  }

  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function UserManager({ currentUserId, initialRecords }) {
  const [records, setRecords] = useState(initialRecords);
  const [editingUser, setEditingUser] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);
  const [message, setMessage] = useState("");
  const [isActionSubmitting, setIsActionSubmitting] = useState(false);
  const {
    clearErrors,
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateUserFormSchema),
    defaultValues: emptyValues,
  });

  async function reloadUsers() {
    const payload = await clientApiRequest(
      "/api/admin/users/list?limit=100&sortBy=createdAt&sortOrder=desc",
    );
    setRecords(payload?.data?.records || []);
  }

  function startCreating() {
    setEditingUser(null);
    clearErrors();
    reset(emptyValues);
  }

  function startEditing(user) {
    setEditingUser(user);
    setMessage("");
    clearErrors();
    reset(toFormValues(user));
  }

  async function saveUser(values) {
    setMessage("");

    if (!editingUser) {
      const createResult = createUserFormSchema.safeParse(values);

      if (!createResult.success) {
        const fieldErrors = createResult.error.flatten().fieldErrors;
        Object.entries(fieldErrors).forEach(([fieldName, messages]) => {
          if (messages?.[0]) {
            setError(fieldName, { message: messages[0] });
          }
        });
        return;
      }
    }

    const endpoint = editingUser
      ? `/api/admin/users/update/${editingUser.id}`
      : "/api/admin/users/create";
    const body = editingUser
      ? {
          fullName: values.fullName,
          email: values.email,
          role: values.role,
          status: values.status,
        }
      : {
          fullName: values.fullName,
          email: values.email,
          password: values.password,
          role: values.role,
        };

    try {
      const payload = await clientApiRequest(endpoint, {
        method: editingUser ? "PUT" : "POST",
        body,
      });
      setMessage(payload?.message || "Yönetici kullanıcı kaydedildi.");
      await reloadUsers();
      setEditingUser(null);
      reset(emptyValues);
    } catch (error) {
      setError("root", { message: error.message });
    }
  }

  async function runConfirmedAction() {
    if (!pendingAction) {
      return;
    }

    setIsActionSubmitting(true);
    setMessage("");

    try {
      const endpoint =
        pendingAction.type === "deactivate"
          ? `/api/admin/users/deactivate/${pendingAction.user.id}`
          : `/api/admin/users/reset-totp/${pendingAction.user.id}`;
      const payload = await clientApiRequest(endpoint, {
        method: "PUT",
        body: {},
      });
      setMessage(payload?.message || "Kullanıcı güvenlik bilgileri güncellendi.");
      setPendingAction(null);
      await reloadUsers();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsActionSubmitting(false);
    }
  }

  const isEditingSelf =
    editingUser && String(editingUser.id) === String(currentUserId);
  const actionDescription =
    pendingAction?.type === "deactivate"
      ? `${pendingAction.user.fullName} devre dışı bırakılacak ve mevcut oturumları geçersiz olacak.`
      : `${pendingAction?.user.fullName || "Bu kullanıcının"} iki aşamalı doğrulama kaydı ve kurtarma kodları sıfırlanacak.`;

  return (
    <div className="manager-layout">
      <section className="panel">
        <header className="panel-header">
          <h2>Yönetici kullanıcıları</h2>
          <button
            className="button button-secondary button-small"
            type="button"
            onClick={startCreating}
          >
            <Plus size={15} aria-hidden="true" /> Yeni kullanıcı
          </button>
        </header>

        {message ? (
          <div className="feedback-message feedback-info" role="status" style={{ margin: 14 }}>
            {message}
          </div>
        ) : null}

        {records.length === 0 ? (
          <EmptyState
            title="Yönetici kullanıcı bulunmuyor"
            description="İçerik yönetim ekibine ilk kullanıcıyı ekleyin."
          />
        ) : (
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Kullanıcı</th>
                  <th>Rol</th>
                  <th>Durum</th>
                  <th>2FA</th>
                  <th>Son giriş</th>
                  <th><span className="sr-only">İşlemler</span></th>
                </tr>
              </thead>
              <tbody>
                {records.map((user) => {
                  const isCurrentUser = String(user.id) === String(currentUserId);

                  return (
                    <tr key={user.id}>
                      <td>
                        <span className="table-primary">
                          {user.fullName}{isCurrentUser ? " (siz)" : ""}
                        </span>
                        <span className="table-secondary">{user.email}</span>
                      </td>
                      <td><StatusBadge status={user.role} /></td>
                      <td><StatusBadge status={user.status} /></td>
                      <td>
                        <span className={`badge badge-${user.totpEnabled ? "success" : "warning"}`}>
                          {user.totpEnabled ? "Etkin" : "Kurulmadı"}
                        </span>
                      </td>
                      <td>{formatDate(user.lastLoginAt)}</td>
                      <td>
                        <div className="table-actions">
                          <button
                            className="icon-button"
                            type="button"
                            onClick={() => startEditing(user)}
                            aria-label={`${user.fullName} kullanıcısını düzenle`}
                            title="Düzenle"
                          >
                            <NotePencil size={16} aria-hidden="true" />
                          </button>
                          <button
                            className="icon-button"
                            type="button"
                            onClick={() => setPendingAction({ type: "reset-totp", user })}
                            disabled={!user.totpEnabled}
                            aria-label={`${user.fullName} kullanıcısının iki aşamalı doğrulamasını sıfırla`}
                            title="2FA sıfırla"
                          >
                            <ShieldCheck size={16} aria-hidden="true" />
                          </button>
                          <button
                            className="icon-button"
                            type="button"
                            onClick={() => setPendingAction({ type: "deactivate", user })}
                            disabled={isCurrentUser || user.status !== "active"}
                            aria-label={`${user.fullName} kullanıcısını devre dışı bırak`}
                            title="Devre dışı bırak"
                          >
                            <UserMinus size={16} aria-hidden="true" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="panel sticky-panel">
        <header className="panel-header">
          <h2>{editingUser ? "Kullanıcıyı düzenle" : "Yeni kullanıcı"}</h2>
        </header>
        <form onSubmit={handleSubmit(saveUser)} noValidate>
          <div className="panel-body form-stack">
            {errors.root ? (
              <div className="feedback-message feedback-error" role="alert">
                <WarningCircle size={18} aria-hidden="true" /> {errors.root.message}
              </div>
            ) : null}
            <div className="form-field">
              <label className="form-label" htmlFor="user-full-name">Ad soyad</label>
              <input
                className="form-control"
                id="user-full-name"
                autoComplete="name"
                aria-invalid={Boolean(errors.fullName)}
                {...register("fullName")}
              />
              {errors.fullName ? <p className="form-error">{errors.fullName.message}</p> : null}
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="user-email">E-posta</label>
              <input
                className="form-control"
                id="user-email"
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                {...register("email")}
              />
              {errors.email ? <p className="form-error">{errors.email.message}</p> : null}
            </div>
            {!editingUser ? (
              <div className="form-field">
                <label className="form-label" htmlFor="user-password">Geçici şifre</label>
                <input
                  className="form-control"
                  id="user-password"
                  type="password"
                  autoComplete="new-password"
                  aria-invalid={Boolean(errors.password)}
                  {...register("password")}
                />
                <p className="form-hint">
                  En az 12 karakter; büyük/küçük harf, rakam ve özel karakter. UTF-8
                  olarak en fazla 72 bayt.
                </p>
                {errors.password ? <p className="form-error">{errors.password.message}</p> : null}
              </div>
            ) : null}
            <div className="form-field">
              <label
                className="form-label"
                htmlFor={isEditingSelf ? "user-role-readonly" : "user-role"}
              >
                Rol
              </label>
              {isEditingSelf ? (
                <>
                  <input type="hidden" {...register("role")} />
                  <input
                    className="form-control"
                    id="user-role-readonly"
                    value={editingUser.role === "admin" ? "Yönetici" : "Editör"}
                    readOnly
                  />
                </>
              ) : (
                <select className="form-select" id="user-role" {...register("role")}>
                  <option value="editor">Editör</option>
                  <option value="admin">Yönetici</option>
                </select>
              )}
            </div>
            {editingUser ? (
              <div className="form-field">
                <label
                  className="form-label"
                  htmlFor={isEditingSelf ? "user-status-readonly" : "user-status"}
                >
                  Durum
                </label>
                {isEditingSelf ? (
                  <>
                    <input type="hidden" {...register("status")} />
                    <input
                      className="form-control"
                      id="user-status-readonly"
                      value={editingUser.status === "active" ? "Aktif" : "Pasif"}
                      readOnly
                    />
                  </>
                ) : (
                  <select className="form-select" id="user-status" {...register("status")}>
                    <option value="active">Aktif</option>
                    <option value="inactive">Pasif</option>
                  </select>
                )}
                {isEditingSelf ? (
                  <p className="form-hint">Kendi rolünüzü veya erişim durumunuzu değiştiremezsiniz.</p>
                ) : null}
              </div>
            ) : null}
          </div>
          <footer className="panel-footer">
            {editingUser ? (
              <button className="button button-ghost" type="button" onClick={startCreating}>
                Vazgeç
              </button>
            ) : null}
            <button className="button button-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
            </button>
          </footer>
        </form>
      </section>

      <ConfirmDialog
        isOpen={Boolean(pendingAction)}
        title={pendingAction?.type === "deactivate" ? "Kullanıcıyı devre dışı bırak" : "2FA kaydını sıfırla"}
        description={actionDescription}
        confirmLabel={pendingAction?.type === "deactivate" ? "Devre dışı bırak" : "2FA sıfırla"}
        isSubmitting={isActionSubmitting}
        onCancel={() => setPendingAction(null)}
        onConfirm={runConfirmedAction}
      />
    </div>
  );
}
