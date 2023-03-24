export default function Question({ setIsQuestionAnswered }) {
  const handleOnChange = (e) => {
    const answer = e.target.value.toLowerCase();

    answer.split(" ").forEach((word) => {
      if (word === "javascript" || word === "js") setIsQuestionAnswered(true);
    });
  };

  return (
    <>
      <p>What do Jaguars do in their spare time?</p>
      <input
        type="text"
        placeholder="Type in your answer..."
        onChange={handleOnChange}
      />
    </>
  );
}
