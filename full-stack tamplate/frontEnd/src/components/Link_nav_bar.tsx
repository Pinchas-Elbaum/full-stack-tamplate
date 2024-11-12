import {  useNavigate } from "react-router-dom";
interface Props {
  to: string;
  InnerText: string;
}
export default function Link_nav_bar(props: Props) {
    const navigate = useNavigate();
  return (
    <>
      <button onClick={() => { navigate(props.to) }}>{props.InnerText}</button>
    </>
  );
}