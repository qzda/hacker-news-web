import { useParams } from "react-router";
import Item from "../components/Item";

export default function ItemPage() {
  const { id = "" } = useParams();

  return (
    <>
      <Item id={id} />
    </>
  );
}
