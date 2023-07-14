interface ITodoFormProps {
  value: string;
  updateText: (str: string) => void;
  handleAction: () => void;
}

export const NewTodoForm: React.FC<ITodoFormProps> = ({
  value,
  updateText,
  handleAction,
}) => {
  return (
    <label>
      <input
        placeholder="new todo"
        value={value}
        onChange={(e) => {
          updateText(e.target.value);
        }}
      />
      <button onClick={handleAction}>Add todo</button>
    </label>
  );
};
