type CalorieDisplayProps = {
    calories: number,
    text: string
}

const CalorieDisplay = ({calories, text}: CalorieDisplayProps) => {
  return (
    <p className="flex flex-col gap-2 rounded-full text-4xl font-bold">
      {calories}
      <span className="font-bold text-sm">{text}</span>
    </p>
  );
};

export default CalorieDisplay;
