"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RolePill } from "@/components/role-pill";

const STORAGE_KEY = "jenil:role";

const ROLES = [
  { id: "recruiter", label: "I'm a recruiter" },
  { id: "engineer", label: "I'm an engineer" },
  { id: "founder", label: "I'm a founder" },
  { id: "curious", label: "I'm just curious" },
] as const;

type RoleId = (typeof ROLES)[number]["id"];

function isRoleId(value: string | null): value is RoleId {
  return ROLES.some((r) => r.id === value);
}

export function HomeRoles() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = React.useState<RoleId | null>(null);

  React.useEffect(() => {
    const fromQuery = searchParams.get("role");
    if (isRoleId(fromQuery)) {
      setSelected(fromQuery);
      window.localStorage.setItem(STORAGE_KEY, fromQuery);
      return;
    }
    const fromStorage = window.localStorage.getItem(STORAGE_KEY);
    if (isRoleId(fromStorage)) {
      setSelected(fromStorage);
    }
  }, [searchParams]);

  const handleSelect = (id: RoleId) => {
    setSelected(id);
    window.localStorage.setItem(STORAGE_KEY, id);
    const params = new URLSearchParams(searchParams.toString());
    params.set("role", id);
    router.replace(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <div role="radiogroup" aria-label="Who are you?" className="flex flex-wrap gap-2">
      {ROLES.map((role) => (
        <RolePill
          key={role.id}
          label={role.label}
          selected={selected === role.id}
          onSelect={() => handleSelect(role.id)}
        />
      ))}
    </div>
  );
}
