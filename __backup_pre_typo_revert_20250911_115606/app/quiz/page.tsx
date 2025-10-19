import IntentionQuiz from "../../components/IntentionQuiz";

export const metadata = {
  title: "Find Your Intention | Ashora Quiz",
  description:
    "Answer a few gentle questions to discover your Ashora intention and build your ritual.",
};

export default function QuizPage() {
  return (
    <main>
      <IntentionQuiz />
    </main>
  );
}
