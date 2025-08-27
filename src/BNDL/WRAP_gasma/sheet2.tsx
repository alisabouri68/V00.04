import Text from "../../WIDG/RWID_text_V00.04/index";
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
        isLoading={false}
        shimmerType="single"
        shimmerColor="#f0f0f0"
        shimmerToColor="#e5e5e5"
        shimmerHeight="1.5em"
        className="w-64 text-center mb-4"
      >
        {`Sheet & data: ${id}`}
      </Text>


      <Text
        as="p"
        align="center"
        isLoading={false}
        shimmerType="paragraph"
        shimmerColor="#f5f5f5"
        shimmerToColor="#eaeaea"
        shimmerHeight="1.2em"
        className="w-full"
      >
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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae eveniet voluptates praesentium
        deleniti non sunt harum suscipit ad, alias ex quas ab ratione ea odio iure iusto cupiditate
        illum aliquam? Itaque sapiente voluptatem laboriosam eveniet perspiciatis est iste quas animi
        consectetur nihil. Dolorem veniam illo neque. Eos nemo porro, vel eligendi beatae odio libero
        rerum hic? Rem molestiae suscipit quos!
      </Text>
    </div>
  );
}