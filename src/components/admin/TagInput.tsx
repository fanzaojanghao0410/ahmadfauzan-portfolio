// @ts-nocheck
import { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TagInputProps {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  options?: string[];
  groups?: { group: string; roles: string[] }[];
  placeholder?: string;
}

export default function TagInput({ label, value = [], onChange, options = [], groups, placeholder }: TagInputProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const flatOptions = useMemo(
    () => (groups ? groups.flatMap((g) => g.roles.map((r) => ({ group: g.group, name: r }))) : options.map((o) => ({ group: "", name: o }))),
    [groups, options]
  );

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    return flatOptions
      .filter((o) => !value.includes(o.name))
      .filter((o) => !q || o.name.toLowerCase().includes(q) || o.group.toLowerCase().includes(q))
      .slice(0, 40);
  }, [flatOptions, query, value]);

  const add = (name: string) => {
    const v = name.trim();
    if (!v || value.includes(v)) return;
    onChange([...value, v]);
    setQuery("");
  };

  const remove = (name: string) => onChange(value.filter((v) => v !== name));

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {value.map((v) => (
            <Badge key={v} variant="secondary" className="pl-2.5 pr-1 py-1 gap-1">
              {v}
              <button type="button" onClick={() => remove(v)} className="rounded-full hover:bg-destructive/15 p-0.5" aria-label={`Remove ${v}`}>
                <Icon icon="lucide:x" className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
      <div className="relative">
        <Input
          value={query}
          placeholder={placeholder ?? "Search or type to add…"}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          onKeyDown={(e) => {
            if (e.key === "Enter") { e.preventDefault(); add(query); }
            if (e.key === "Backspace" && !query && value.length) remove(value[value.length - 1]);
          }}
        />
        {focused && (
          <div className="absolute z-50 mt-1 w-full max-h-56 overflow-y-auto rounded-xl border bg-popover shadow-lg p-1">
            {query.trim() && !flatOptions.some((o) => o.name.toLowerCase() === query.trim().toLowerCase()) && (
              <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => add(query)} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-muted flex items-center gap-2">
                <Icon icon="lucide:plus" className="w-3.5 h-3.5 text-primary" /> Add “{query.trim()}”
              </button>
            )}
            {suggestions.map((o, i) => (
              <button
                key={o.name}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => add(o.name)}
                className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-muted flex items-center justify-between gap-2"
              >
                <span>{o.name}</span>
                {o.group && <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{o.group}</span>}
              </button>
            ))}
            {suggestions.length === 0 && !query.trim() && (
              <p className="px-3 py-2 text-sm text-muted-foreground">No more options</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
