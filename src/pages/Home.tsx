import Button from "../components/Button";
import Header from "../components/Header";

export default function Home(props: { fillFormCB: () => void }) {
  return (
    <>
      <Header title="Welcome to my React Project!" />
      <p>Help us by filling this form</p>
      <Button
        color="bg-red-500"
        text="Open Form"
        onClick={props.fillFormCB}
        hoverColor="bg-red-800"
      />
    </>
  );
}
