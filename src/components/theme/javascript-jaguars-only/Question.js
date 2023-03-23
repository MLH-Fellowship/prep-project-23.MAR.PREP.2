export default function Question({ setAnsweredQuestion }) {
  const handleOnChange = (e) => {
    const answer = e.target.value.toLowerCase();

    answer.split(" ").forEach((word) => {
      if (word === "javascript" || word === "js") setAnsweredQuestion(true);
    });
  };

  return (
    <>
      <p>What do Jaguars do in their spare time?</p>
      <form action="">
        <input
          type="text"
          placeholder="Type in your answer..."
          onChange={handleOnChange}
        />
      </form>
    </>
  );
}
