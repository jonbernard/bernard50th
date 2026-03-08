"use client";

import { useRef, useState } from "react";
import {
  ActionIcon,
  Button,
  Group,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

const inputStyles = {
  label: {
    fontFamily: "var(--font-cormorant)",
    fontSize: "1rem",
    color: "var(--brown)",
    fontWeight: 600,
    letterSpacing: "0.05em",
  },
  input: {
    fontFamily: "var(--font-cormorant)",
    fontSize: "1.1rem",
    borderColor: "var(--brown-light)",
    backgroundColor: "white",
  },
};

export function RsvpForm() {
  const [names, setNames] = useState<string[]>([""]);
  const [dietary, setDietary] = useState("");
  const [nameErrors, setNameErrors] = useState<string[]>([""]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const updateName = (index: number, value: string) => {
    setNames((prev) => prev.map((n, i) => (i === index ? value : n)));
    setNameErrors((prev) => prev.map((e, i) => (i === index ? "" : e)));
  };

  const addGuest = () => {
    setNames((prev) => {
      const next = [...prev, ""];
      // Focus the new input after React re-renders
      setTimeout(() => inputRefs.current[next.length - 1]?.focus(), 0);
      return next;
    });
    setNameErrors((prev) => [...prev, ""]);
  };

  const removeGuest = (index: number) => {
    setNames((prev) => prev.filter((_, i) => i !== index));
    setNameErrors((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const errors = names.map((n) =>
      n.trim().length === 0 ? "Please enter a name" : ""
    );
    setNameErrors(errors);
    return errors.every((e) => e === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ names, dietary }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      notifications.show({
        title: "Something went wrong",
        message: "Please try again or contact us directly.",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "24px 0" }}>
        <Text
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "1.5rem",
            color: "var(--brown)",
            marginBottom: 12,
          }}
        >
          We&apos;ll see you there!
        </Text>
        <Text
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1.1rem",
            fontStyle: "italic",
            color: "var(--brown-medium)",
          }}
        >
          Thank you for your RSVP. We look forward to celebrating with you.
        </Text>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="md">
        {/* Attendee name list */}
        <div>
          <Text
            component="label"
            style={{
              ...inputStyles.label,
              display: "block",
              marginBottom: 8,
            }}
          >
            Attendee Names
          </Text>
          <Stack gap="xs">
            {names.map((name, index) => (
              <Group key={index} gap="xs" align="flex-start">
                <TextInput
                  ref={(el) => { inputRefs.current[index] = el; }}
                  placeholder={index === 0 ? "Your name" : `Guest ${index + 1}`}
                  value={name}
                  onChange={(e) => updateName(index, e.currentTarget.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addGuest();
                    }
                  }}
                  error={nameErrors[index] || undefined}
                  size="md"
                  style={{ flex: 1 }}
                  styles={{ input: inputStyles.input }}
                  aria-label={`Attendee ${index + 1}`}
                />
                {names.length > 1 && (
                  <ActionIcon
                    onClick={() => removeGuest(index)}
                    variant="subtle"
                    color="brown"
                    size="lg"
                    mt={4}
                    aria-label="Remove guest"
                    style={{ color: "var(--brown-light)" }}
                  >
                    ×
                  </ActionIcon>
                )}
              </Group>
            ))}
          </Stack>
          <Button
            onClick={addGuest}
            variant="subtle"
            size="sm"
            mt="xs"
            color="brown"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1rem",
              fontStyle: "italic",
              letterSpacing: "0.04em",
              paddingLeft: 0,
            }}
          >
            + Add another guest
          </Button>
        </div>

        {/* Dietary restrictions */}
        <Textarea
          label="Dietary Restrictions / Notes"
          placeholder="Any allergies or dietary needs? (optional)"
          size="md"
          autosize
          minRows={2}
          styles={inputStyles}
          value={dietary}
          onChange={(e) => setDietary(e.currentTarget.value)}
        />

        <Button
          type="submit"
          loading={loading}
          size="md"
          color="brown"
          style={{
            fontFamily: "var(--font-playfair)",
            letterSpacing: "0.12em",
            fontWeight: 600,
          }}
        >
          SEND RSVP
        </Button>
      </Stack>
    </form>
  );
}
