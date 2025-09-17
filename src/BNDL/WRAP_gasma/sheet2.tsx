import Text from "../../COMP/RCMP_biotext_V00.04";
import { useParams } from "react-router-dom";

export default function Index() {
  const { id } = useParams<{ id: string }>();

  return (
    <div
      key={id}
      className="flex items-center justify-center flex-col gap-5 p-3 "
    >
      <Text
        as="h1"
        size="2xl"
        weight="extrabold"
        className="w-64 text-center mb-4"
      >
        {`Sheet & data: ${id}`}
      </Text>

      <Text as="p" align="center" className="w-full">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae eveniet
        voluptates praesentium deleniti non sunt harum suscipit ad, alias ex
        quas ab ratione ea odio iure iusto cupiditate illum aliquam? Itaque
        sapiente voluptatem laboriosam eveniet perspiciatis est iste quas animi
        consectetur nihil. Dolorem veniam illo neque. Eos nemo porro, vel
        eligendi beatae odio libero rerum hic? Rem molestiae suscipit quos!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae eveniet
        voluptates praesentium deleniti non sunt harum suscipit ad, alias ex
        quas ab ratione ea odio iure iusto cupiditate illum aliquam? Itaque
        sapiente voluptatem laboriosam eveniet perspiciatis est iste quas animi
        consectetur nihil. Dolorem veniam illo neque. Eos nemo porro, vel
        eligendi beatae odio libero rerum hic? Rem molestiae suscipit quos!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae eveniet
        voluptates praesentium deleniti non sunt harum suscipit ad, alias ex
        quas ab ratione ea odio iure iusto cupiditate illum aliquam? Itaque
        sapiente voluptatem laboriosam eveniet perspiciatis est iste quas animi
        consectetur nihil. Dolorem veniam illo neque. Eos nemo porro, vel
        eligendi beatae odio libero rerum hic? Rem molestiae suscipit quos!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae eveniet
        voluptates praesentium deleniti non sunt harum suscipit ad, alias ex
        quas ab ratione ea odio iure iusto cupiditate illum aliquam? Itaque
        sapiente voluptatem laboriosam eveniet perspiciatis est iste quas animi
        consectetur nihil. Dolorem veniam illo neque. Eos nemo porro, vel
        eligendi beatae odio libero rerum hic? Rem molestiae suscipit quos!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae eveniet
        voluptates praesentium deleniti non sunt harum suscipit ad, alias ex
        quas ab ratione ea odio iure iusto cupiditate illum aliquam? Itaque
        sapiente voluptatem laboriosam eveniet perspiciatis est iste quas animi
        consectetur nihil. Dolorem veniam illo neque. Eos nemo porro, vel
        eligendi beatae odio libero rerum hic? Rem molestiae suscipit quos!
      </Text>
    </div>
  );
}
