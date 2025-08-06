import Text from "COMP/RCMP_text_VAR.01_v00.04";
import { useParams } from "react-router-dom";

export default function Index() {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div
      key={id}  // Force re-render when ID changes
      className="flex items-center justify-center flex-col gap-5 p-6 animate-fade-in"
    >
      <Text weight="extrabold">{`Sheet & data: ${id}`}</Text>
      <Text align="left">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae eveniet voluptates praesentium
        deleniti non sunt harum suscipit ad, alias ex quas ab ratione ea odio iure iusto cupiditate
        illum aliquam? Itaque sapiente voluptatem laboriosam eveniet perspiciatis est iste quas animi
        consectetur nihil. Dolorem veniam illo neque. Eos nemo porro, vel eligendi beatae odio libero
        rerum hic? Rem molestiae suscipit quos!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae eveniet voluptates praesentium
        deleniti non sunt harum suscipit ad, alias ex quas ab ratione ea odio iure iusto cupiditate
        illum aliquam? Itaque sapiente voluptatem laboriosam eveniet perspiciatis est iste quas animi
        consectetur nihil. Dolorem veniam illo neque. Eos nemo porro, vel eligendi beatae odio libero
        rerum hic? Rem molestiae suscipit quos!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae eveniet voluptates praesentium
        deleniti non sunt harum suscipit ad, alias ex quas ab ratione ea odio iure iusto cupiditate
        illum aliquam? Itaque sapiente voluptatem laboriosam eveniet perspiciatis est iste quas animi
        consectetur nihil. Dolorem veniam illo neque. Eos nemo porro, vel eligendi beatae odio libero
        rerum hic? Rem molestiae suscipit quos!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae eveniet voluptates praesentium
        deleniti non sunt harum suscipit ad, alias ex quas ab ratione ea odio iure iusto cupiditate
        illum aliquam? Itaque sapiente voluptatem laboriosam eveniet perspiciatis est iste quas animi
        consectetur nihil. Dolorem veniam illo neque. Eos nemo porro, vel eligendi beatae odio libero
        rerum hic? Rem molestiae suscipit quos!
      </Text>
    </div>
  );
}