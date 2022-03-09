export default function Button(props: {
  color: string;
  text: string;
  onClick?: () => void;
  hoverColor?: string;
  id?: string;
  size?: string;
}) {
  const hoverColor = `hover:${props.hoverColor}` || "";
  return (
    <button
      id={props.id}
      className={`text-white ${
        props.color
      } my-2 mx-1 rounded-lg ${hoverColor} ${props.size || "px-4 py-2"}`}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
