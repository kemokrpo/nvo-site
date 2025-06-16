import { useEffect, useState } from "react";
import { useUnlock } from "@/pages/_app";

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [password, setPassword] = useState<string>("");
  const { isUnlocked, setUnlocked } = useUnlock();

  useEffect(() => {
    const countdownEnd = new Date("2025-06-30T12:00:00Z").getTime();
    const updateRemainingTime = () => {
      const remainingTime = countdownEnd - Date.now();
      setTimeLeft(remainingTime > 0 ? remainingTime : 0);
    };

    updateRemainingTime();

    const interval = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (password === "bestbanana") {
      setUnlocked(true);
      setPassword(""); // reset password
    }
  }, [password, setUnlocked]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const char = event.key;

      setPassword((prev) => {
        const newPassword = prev + char;

        if (!"bestbanana".startsWith(newPassword)) {
          return ""; // reset if wrong input
        }

        return newPassword;
      });
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  if (isUnlocked) return null;
  if (timeLeft === null) return null;

  const formatTime = (ms: number) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-5xl font-bold text-main-700 mb-4">Countdown Timer</h1>
      <p className="text-3xl font-mono text-main-700">{formatTime(timeLeft)}</p>
    </div>
  );
};

export default Countdown;
