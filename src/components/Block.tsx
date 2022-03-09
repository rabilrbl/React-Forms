export default function Block(props: { children: React.ReactNode, textColor?: string, backgroundColor?: string }) {
    const textColor = props.textColor || "text-sky-600";
  return (
    <div className={`bg-white shadow-lg rounded-xl p-4 w-[35rem] ${textColor} ${props.backgroundColor}`}>
      {props.children}
    </div>
  );
}