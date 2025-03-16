type AttemptVisualizerProps = {
  attempts: string[];
  correctAnswer: string;
  max: number;
};

export default function AttemptVisualizer({
  attempts,
  correctAnswer,
  max,
}: AttemptVisualizerProps) {
  const getColor = (attempt: string | null | undefined): string => {
    if (attempt === correctAnswer) return "bg-purple-600"; // Purple (Correct)
    if (!attempt || attempt.trim() === "") return "bg-purple-300"; // Gray (Empty)
    return "bg-red-600"; // Red (Incorrect)
  };

  const attemptColors = attempts.map(getColor);

  // Fill remaining slots with white
  while (attemptColors.length < max) {
    attemptColors.push("bg-stone-300");
  }

  return (
    <div className="flex gap-2 p-4">
      {attemptColors.map((color, index) => (
        <div
          key={index}
          className={`w-8 h-4 rounded-sm ${color}`}
        />
      ))}
    </div>
  );
}
