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

const mantineInputStyles = {
  label: {
    fontFamily: "var(--font-cormorant)",
    fontSize: "1rem",
    color: "var(--color-brown)",
    fontWeight: 600,
    letterSpacing: "0.05em",
  },
  input: {
    fontFamily: "var(--font-cormorant)",
    fontSize: "1.1rem",
    borderColor: "var(--color-brown-light)",
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
      <div className="text-center py-6">
        <Text className="font-playfair text-[1.5rem] text-brown mb-3">
          We&apos;ll see you there!
        </Text>
        <Text className="font-cormorant text-[1.1rem] italic text-brown-medium">
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
            className="font-cormorant text-base text-brown font-semibold tracking-[0.05em] block mb-2"
          >
            Attendee Names
          </Text>
          <Stack gap="xs">
            {names.map((name, index) => (
              <Group key={index} gap="xs" align="flex-start">
                <TextInput
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
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
                  styles={{ input: mantineInputStyles.input }}
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
                    className="text-brown-light"
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
            className="font-cormorant text-base italic tracking-[0.04em] !pl-0"
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
          styles={mantineInputStyles}
          value={dietary}
          onChange={(e) => setDietary(e.currentTarget.value)}
        />

        <Button
          type="submit"
          loading={loading}
          size="md"
          color="brown"
          className="font-playfair tracking-[0.12em] font-semibold"
        >
          SEND RSVP
        </Button>
      </Stack>
    </form>
  );
}
